"use strict";

const log = console.log;

const express = require('express');
const router = express.Router();

const { User } = require('../models/User')
const { Craft } = require('../models/Craft')
const { Try } = require('../models/Try')
const { Comment } = require('../models/Comment')
// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser');

// to validate object IDs
const {ObjectID} = require('mongodb');

// check if the user is admin, then list all users
router.get('/allCrafts', function (req, res) {
  Craft.find().then((crafts) => {
    //send crafts (wrapped as an object)
    res.send( crafts )
  }, (error) => {
    res.status(500).send('Internal Server Error')
  })
});

//get craft by id
router.get('/:craft_id', async function (req, res) {
    const id = req.params.craft_id;
    let thisCraft = await findCraft(res, id);
    log(thisCraft)
    if (!thisCraft) {
        res.status(404).send('Craft Not Found45');
        return;
    }

    let com = await findCommentsByCraft(res, id);
    let tr = await findTriesByCraft(res, id);
    res.send({
        _id: thisCraft._id,
        coverName:thisCraft.coverName,
        title: thisCraft.title,
        author: thisCraft.author,
        authorname: thisCraft.authorname,
        likes: thisCraft.likes,
        comments: com,
        tries: tr,
        totalLikes: thisCraft.totalLikes,
        totalComments: thisCraft.totalComments,
        totalTries: thisCraft.totalTries,
        intro: thisCraft.intro,
        supplies: thisCraft.supplies,
        tips: thisCraft.tips,
        stepPics: thisCraft.stepPics,
        steps: thisCraft.steps,
        totalSteps: thisCraft.totalSteps
    })
});

router.patch('/:craft_id', async function (req, res) {
    // log('called',77)
    const craft_id = req.params.craft_id;
    const userId = req.cookies.userId
    // const newCraft = req.body.craft;
    // const username = req.body.username;
    log(81)
    let thisCraft = await findCraft(res, craft_id);
    if (!thisCraft) {
        res.status(404).send("Craft Not Found");
        return;
    }
    let thisUser = await findUser(res, userId);
    if (!thisUser) {
        res.status(404).send("User Not Found");
        return;
    }
    if(thisUser.muted){
        res.status(401).send("You are muted");
    }
    try {
        if (thisUser.userType !== 'admin'){
            if(thisUser.likes.includes(craft_id)){
                res.send({craft: thisCraft})
                return
            }else{
                thisCraft.likes.push(userId)
                thisCraft.totalLikes=thisCraft.likes.length
                thisUser.likes.push(craft_id)
                thisUser.totalLikes=thisUser.likes.length
                const resuser=await thisUser.save()
                const rescraft = await thisCraft.save()
                res.send({craft: rescraft})
            }
        }else{
            res.status(500).send('Admin cannot like a craft')
        }
    } catch(error) {
        res.status(400).send(error);
    }
});

// delete craft and all its comments and tries
router.delete('/:craft_id', async function (req, res) {

    const id = req.params.craft_id;
    let thisCraft = await findCraft(res, id);
    let comments = await findCommentsByCraft(res, id)
    let tries = await findTriesByCraft(res, id)
    const likesUserIds = thisCraft.likes;
    const commentsIds = thisCraft.comments
    const triesIds = thisCraft.tries

    if (!thisCraft) {
        res.status(404).send('Craft Not Found');
        return;
    }
    try{

        const likesUsers = await User.find({'_id': {$in: likesUserIds}}, function (error) {
            if (error){
                res.status(500).send(error);
            }
        });
        // iterate over thisUsers to delete their likes
        likesUsers.map((user) => {
            for (let i = 0; i < user.likes.length; i++){
                if (user.likes[i] === id){
                    user.likes.splice(i, 1);
                }
            }
            user.totalLikes=user.likes.length
            user.save()   
        });

        const comments = await Comment.find({'_id': {$in: commentsIds}}, function (error) {
            if (error){
                res.status(500).send(error);
            }
        });
        // iterate over thisUsers to delete their likes
        comments.map(async (comment) => {
            const user = await findUser(res, comment.author);
            for (let i=0; i<user.comments.length; i++) {

                if (JSON.stringify(user.comments[i])===JSON.stringify(comment._id)){
                    user.comments.splice(i,1)
                }  
            }

            user.totalComments=user.comments.length
            await user.save()   
        });

        const tries = await Try.find({'_id': {$in: triesIds}}, function (error) {
            if (error){
                res.status(500).send(error);
            }
        });
        // iterate over thisUsers to delete their likes
        tries.map(async (tr) => {
            const user = await findUser(res,tr.author);
            // user.tries.forEach(function(value,index,array){
            for (let i=0; i<user.tries.length; i++) {
                if (JSON.stringify(user.tries[i])===JSON.stringify(tr._id)){
                    user.tries.splice(i,1)
                }
            }
            user.totalTries=user.tries.length
            await user.save()    
        });
        const author = await findUser(res,thisCraft.author);
        for(let i=0; i<author.crafts.length; i++) {
            if (JSON.stringify(author.crafts[i])===JSON.stringify(id)){
                author.crafts.splice(i,1)
            }
        }
        author.totalCrafts=author.crafts.length
        await author.save()   
        const result = await Craft.deleteOne({_id: id}, function (error) {
            if (error){
                res.status(500).send(error);
            }
        });
        await Comment.deleteMany({comCraft: id}, function (error) {
            if (error){
                res.status(500).send(error);
            }
        });
        await Try.deleteMany({triedCraft: id}, function (error){
            if (error){
                res.status(500).send(error);
            }
        })
        res.send(thisCraft)

    } catch(error) {
        log(error) // log server error to the console, not to the client.
            res.status(400).send(error) // 400 for bad request gets sent to client.
    }
});
//create a new craft
router.post('/addCraft', async function (req, res) {
    try {
        const thisuser = await findUser(res, req.body.author)

        if(! thisuser){
            res.status(404).send("User not found")
            return
        }
        if(thisUser.muted){
            res.status(401).send("You are muted");
        }
        if(thisuser.userType !== 'admin'){
            const thiscraft = new Craft({
                coverName: req.body.coverName,
                title: req.body.title,
                author: req.body.author,
                authorname: thisuser.username,
                intro: req.body.intro,
                supplies: req.body.supplies,
                tips: req.body.tips,
                stepPics: req.body.stepPics,
                steps: req.body.steps,
                totalSteps: req.body.steps.length
            });
            const craft = await thiscraft.save()
            thisuser.crafts.push(craft._id)
            thisuser.totalCrafts++
            const user = await thisuser.save()
            res.send({user,craft})
        }

    } catch (err) {
        res.status(400).send(err);
    }
});


router.post('/addComment', async function (req, res) {
    try {
        const comcraft = await findCraft(res, req.body.comCraft)
        const author = await findUser(res,req.body.author)
        if(!author | !comcraft){
            res.status(404).send('Resource not found')
            return;
        }
        if(author.muted){
            res.status(401).send("You are muted");
        }
        if(author.userType !== 'admin'){
            const com = new Comment({
                comMsg: req.body.comMsg,
                comCraft: req.body.comCraft,
                craftPic: comcraft.coverName,
                author:req.body.author,
                authorname:author.username
            })
            
            const comment = await com.save()
            comcraft.comments.push(comment._id)
            comcraft.totalComments++
            const craft= await comcraft.save()
            author.comments.push(comment._id)
            author.totalComments++
            const user = await author.save()
            res.send({user, craft, comment})
        }
    } catch (err) {
        res.status(400).send(err);
    }


});
router.post('/addTry', async function (req, res) {

    try {
        log(318)
        const trycraft= await findCraft(res, req.body.triedCraft)
        const author = await findUser(res,req.body.author)
        if(!author | !trycraft){
            res.status(404).send('Resource not found')
            return;
        }
        if(author.muted){
            res.status(401).send("You are muted");
        }
        if(author.userType !== 'admin'){
            const newtry = new Try({
                comMsg: req.body.comMsg,
                triedCraft: req.body.triedCraft,
                author:req.body.author,
                tryPic: req.body.tryPic,
                authorname: author.username
            })
            const tr = await newtry.save()
            trycraft.tries.push(tr._id)
            trycraft.totalTries++
            const craft= await trycraft.save()
            author.tries.push(tr._id)
            author.totalTries++
            const user = await author.save()
            res.send({user,craft,try: tr})
        }
    } catch (err) {
        log(err)
        res.status(400).send(err);
    }


});

//get all craftes comments and tries of the user with user id
router.get('/detailsbyUser/:user_id', async function (req, res) {
    const user_id = req.params.user_id;
    if (!ObjectID.isValid(user_id)) {
        res.status(404).send()  
        return;  
    }
    try{
        const user = await User.findById(user_id)
        if (!user) {
            res.status(404).send("User Not Found");
            return
        } 
        const crafts=await findCraftsByUser(res, user_id)
        const comments=await findCommentsByUser(res, user_id)
        const tries=await findTriesByUser(res, user_id)
        let likes = []
        log(user.likes)
        for(const value of user.likes){
            const l = await findCraft(res, value)
                likes.push(l)
        }
        const details = {
            _id: user_id,
            crafts,
            comments,
            tries,
            likes,
            totalCrafts: user.totalCrafts,
            totalComments: user.totalComments,
            totalTries: user.totaltries,
            totalLikes:user.totalLikes,
            profilePic: user.profilePic,
            bannerPic: user.bannerPic,
            username: user.username
        }
        res.send(details)
    }catch(error) {
        res.status(500).send('Internal Server Error')  // server error
    }

});

// Helpper functions (async functinons)

async function findUser(res, id) {
    if (!ObjectID.isValid(id)) {
        res.status(404).send("Invalid id");
        return;
    }
    const users = await User.find({_id: id}, function (error) {
        if (error)
            res.status(404).send('User not found')
    });
    // log(users)
    return users[0];
}
// find the craft by craft id
async function findCraft(res, id) {
    if (!ObjectID.isValid(id)) {
        res.status(404).send("Invalid id");
        return;
    }
    const crafts = await Craft.find({_id: id}, function (error) {
        if (error)
            res.status(404).send('Comment not found')
    });
    // log(crafts)
    return crafts[0];
}
async function findCraftsByUser(res, id) {
    if (!ObjectID.isValid(id)) {
        res.status(404).send("Invalid id");
        return;
    }
    const crafts = await Craft.find({author: id}, function (error) {
        if (error)
            res.status(404).send('Comment not found')
    });
    return crafts;
}
//find comments by craft id
async function findCommentsByCraft(res, id) {
    if (!ObjectID.isValid(id)) {
        res.status(404).send("Invalid id");
        return;
    }
    const comments = await Comment.find({comCraft: id}, function (error) {
        if (error)
            res.status(404).send('Comment not found')
    });
    return comments;
}

async function findCommentsByUser(res, id) {
    if (!ObjectID.isValid(id)) {
        res.status(404).send("Invalid id");
        return;
    }
    const comments = await Comment.find({author: id}, function (error) {
        if (error)
            res.status(404).send('Comment not found')
    });
    return comments;
}
//find tries by craft id
async function findTriesByCraft(res, id) {
    if (!ObjectID.isValid(id)) {
        res.status(404).send("Invalid id");
        return;
    }
    const tries = await Try.find({triedCraft: id}, function (error) {
        if (error)
            res.status(404).send('Try not found')
    });
    return tries;
}

async function findTriesByUser(res, id) {
    if (!ObjectID.isValid(id)) {
        res.status(404).send("Invalid id");
        return;
    }
    const tries = await Try.find({author: id}, function (error) {
        if (error)
            res.status(404).send('Comment not found')
    });
    return tries;
}

module.exports = router;
