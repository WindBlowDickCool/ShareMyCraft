"use strict";

const log = console.log;

const express = require('express');
var cors = require('cors');
const router = express.Router();

const { ObjectID } = require('mongodb')

// import models
const { User } = require('../models/User')
const { Craft } = require('../models/Craft')
const { Try } = require('../models/Try')
const { Comment } = require('../models/Comment')

router.options('*', cors({ origin: 'http://localhost:3000', credentials: true }))

// authorizer, check if the current user is a valid user
const userChecker = (req, res, next) => {
  // user cookies to get current user
  const userId = req.cookies.userId

  if (!userId) { //check if the userId is valid
    res.status(404).send('Resource not found') 
  } else {
    // Find a user by id 
    User.findOne({ _id: userId }).then((user) => {
      if (!user) {
        return Promise.reject()
      } else {
        req.user = user
        next()
      }
    }).catch((error) => {
      res.status(500).send('Internal Server Error')
    })
  }
};

// check if the user is admin
const adminChecker = (req, res, next) => {
  // use cookies to get current user

  const userId = req.cookies.userId

  if (!userId) {//check if the userId is valid
    res.status(404).send('Resource not found')
  } else {
    // FInd user by id
    User.findOne({ _id: userId }).then((user) => {
      if (!user) {
        return Promise.reject()
      } else {
        if (user.userType !== 'admin') {
          return Promise.reject()
        } else {
          req.user = user
          next()
        }
      }
    }).catch((error) => {
      res.status(500).send('Internal Server Error')
    })
  }
};


// check if the user is admin, then list all users
router.get('/', adminChecker, function (req, res) {
  User.find().then((users) => {
    res.send(users)
  }, (error) => {
    res.status(500).send('Internal Server Error')
  })
});


// user sign up
router.post('/', function (req, res) {
  // create a new user

  const thisuser = new User({
    username: req.body.username,
    password: req.body.password,
    userType: req.body.userType
  })

  // save the user
  thisuser.save().then((user) => {
      res.cookie('userId', user._id.toString(), { expires: new Date(Date.now() + 1200000), httpOnly: true})
      res.cookie('username', user.username, { expires: new Date(Date.now() + 1200000), httpOnly: true})
      res.cookie('userType', user.userType, { expires: new Date(Date.now() + 1200000), httpOnly: true})
      res.send(user)
  }, (error) => {
    res.status(500).send(error)//** error msg
  })
});

// sign in
router.post('/login', function (req, res) {
  const username = req.body.username
  const password = req.body.password

  User.findUserByPassword(username, password).then((user) => {
    if (!user) {
      res.status(404).send('Resource not found') 
    } else {//set up cookies, allow cookies to stay for 20 minutes
      res.cookie('userId', user._id.toString(), { expires: new Date(Date.now() + 1200000), httpOnly: true})
      res.cookie('username', user.username, { expires: new Date(Date.now() + 1200000), httpOnly: true})
      res.cookie('userType', user.userType, { expires: new Date(Date.now() + 1200000), httpOnly: true})
      //send with cookies to client
      res.send(user)
    }
  }).catch((error) => {
    res.status(500).send('Internal Server Error')
  })
});

// get user by userId
router.get('/current', function (req, res) {
  if(!req.cookies | !req.cookies.userId) {
    res.send({})

    return
  }
  const userId= req.cookies.userId
  // check if userId is valid
	if (!ObjectID.isValid(userId)) {
		res.status(404).send('Resource not found')
		return;
  }
  
  // find user by id
  User.findOne({ _id: userId }).then((user) => {
    if (!user) {
      res.status(404).send("Resource Not Found")
    } else {
      res.send(user)
    }
  }).catch((error) => {
    res.status(500).send('Internal Server Error')
  })
});


// if the user is admin, delete user by username
router.delete('/:userId', adminChecker, function (req, res) {
  const userId = req.params.userId

  // check if userId is valid
	if (!ObjectID.isValid(userId)) {
		res.status(404).send('Resource not found') 
		return;
  }

  //delete user
  User.findOneAndDelete({ _id: userId }).then((user) => {
    if (!user) {
      res.status(404).send('Resource not found')
    } else {

      res.send(user)
    }
  }).catch((error) => {
    res.status(500).send('Internal Server Error')
  })
});

router.put('/mute/:userId', adminChecker, function (req, res) {
  const userId = req.params.userId
  const mute = req.body.mute
  const currentUser = req.user

  // check if userId is valid
  if (!ObjectID.isValid(userId)) {
    res.status(404).send('Resource not found')
    return;
  }

  // check if id is valid and check if caller is the current user/admin
  if (!req.user) {
    res.status(404).send('Resource not found')
    return
  } 

  //update password
  User.findOneAndUpdate({ _id: userId }, {$set: { muted: mute } }, { new: true }).then((user) => {
      if (!user) {
        res.status(404).send('Resource not found')
      } else {
        res.send(user)
      }
    }
  ).catch((error) => {
    res.status(500).send('Internal Server Error')
  })  
})
// update user password, for users to check his/her password
router.put('/password/:userId', userChecker, function (req, res) {
  const userId = req.params.userId
  const password = req.body.password
  const currentUser = req.user

  // check if userId is valid
	if (!ObjectID.isValid(userId)) {
		res.status(404).send('Resource not found')
		return;
  }

  // check if id is valid and check if caller is the current user/admin
  if (!req.user) {
    res.status(404).send('Resource not found')
    return
  } else {
    if (currentUser._id != userId && currentUser.userType !== 'admin') {
      res.status(401).send('Unauthorized')
      return
    }
  }

  //update password
  User.findOneAndUpdate({ _id: userId }, {$set: { password: password } }, { new: true }).then((user) => {
      if (!user) {
        res.status(404).send('Resource not found')
      } else {
        res.send(user)
      }
    }
  ).catch((error) => {
    res.status(500).send('Internal Server Error')
  })
});


// update user bannerPic
router.put('/bannerPic/:userId', userChecker, function (req, res) {
  const userId = req.params.userId
  const bannerPic = req.body.bannerPic
  const currentUser = req.user

  // check if userId is valid
	if (!ObjectID.isValid(userId)) {
		res.status(404).send('Resource not found')
		return;
  }

  // check if caller is the current user
  if (!req.user) {
    res.status(404).send('Resource not found')
    return;
  } else {
    if (currentUser._id != userId) {
      res.status(401).send('Unauthorized')
      return;
    }
  }

  // update bannerPic
  User.findOneAndUpdate({_id: userId}, {$set: {bannerPic: bannerPic}}, {new: true}).then((user) => {
      if (!user) {
        res.status(404).send('Resource not found')
      } else {
        res.send(user)
      }
    }
  ).catch((error) => {
    res.status(500).send('Internal Server Error')
  })
});
 
// update user profilePic
router.put('/profilePic/:userId', userChecker, function (req, res) {
  const userId = req.params.userId
  const profilePic = req.body.profilePic
  const currentUser = req.user

  // check if userId is valid
  if (!ObjectID.isValid(userId)) {
    res.status(404).send('Resource not found')
    return;
  }

  // check if caller is the current user
  if (!req.user) {
    res.status(404).send('Resource not found')
    return;
  } else {
    if (currentUser._id != userId) {
      res.status(401).send('Unauthorized')
      return;
    }
  }

  // update profilePic
  User.findOneAndUpdate({ _id: userId }, { $set: { profilePic: profilePic } }, { new: true }).then(
    (user) => {
      if (!user) {
        res.status(404).send()
      } else {
        res.send(user)
      }
    }
  ).catch((error) => {
    res.status(500).send('Internal Server Error')
  })
});
router.get('/logout', (req, res) => {
  try{
    res.clearCookie('userId')
    res.clearCookie('username')
    res.clearCookie('userType')
    res.status(200).send()
  } catch(error) {
    res.status(500).send(error)
  }
})
module.exports = router;
