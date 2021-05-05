function loadCraft(){
    $('#board').empty();
    const c = document.createElement('div')
    c.style="width: 90%; border-radius: 30px; border-bottom: solid; margin-left: 4%; margin-top:4%; background-color: #a3cfce; float: left;  display: inline-block; text-align: center;"

    // load cover pic
    const c1=document.createElement('a')
    const cover=document.createElement('img')
    cover.src=currentCraft.coverName
    cover.style="object-fit: cover; display: inline-block; margin-left: auto; margin-right: auto; border-radius: 30px; width:100%; height:400px;"
    c1.appendChild(cover)

    // load Title
    const c2=document.createElement('p')
    c2.appendChild(document.createTextNode(currentCraft.title))
    c2.style="font-size:250%;font-weight: bold;text-align: left;margin-left: 10%; margin-right: 10%;"

    const c3=document.createElement('div')
    c3.style="width:100%; display: inline-block;text-align: right; "

    // load auther name and likes
    const c30=document.createElement('button')
    c30.appendChild(document.createTextNode('By '+currentCraft.author.name))
    c30.style="font-size:100%; color: black;  outline:none; overflow: hidden; border: none; cursor:pointer; background-color: Transparent;  background-repeat:no-repeat; margin-right: 5px; padding-bottom:15px;"
    c30.addEventListener('click',function(){
        window.document.location='./personal.html?currentUser='+currentUser.name+',other='+currentCraft.author.name
    })

    const c31=document.createElement('button')
    c31.id='likes'
    c31.innerHTML = 'Likes: ' + currentCraft.totalLikes
    c31.addEventListener('click', addLikes)
    c31.style="font-size:100%; color: black;  outline:none; overflow: hidden; border: none; cursor:pointer; background-color: Transparent;  background-repeat:no-repeat; padding-right: 10%; padding-bottom:15px;float:right;"

    c3.append(c31)
    c3.append(c30)

    // subtitle of introduction
    const c4=document.createElement('p')
    loadSubTitle('Introduction',c4)

    // load introduction
    const c5=document.createElement('p')
    loadText(currentCraft.intro,c5)

    // subtitle of supplies
    const c6=document.createElement('p')
    loadSubTitle('Supplies',c6)

    // load supplies
    const c7=document.createElement('p')
    loadText(currentCraft.supplies,c7)

    // subtitle of steps
    const c8=document.createElement('p')
    loadSubTitle('Steps',c8)

    // load steps
    const c9=document.createElement('div')
    for(var a = 0; a < currentCraft.totalSteps; a++){
        // subtitle of each step
        const s1 = document.createElement('p')
        s1.appendChild(document.createTextNode('Step'+(a+1)))
        s1.style="font-size:150%;font-weight: bold;text-align: left;margin-left: 10%;"
        c9.appendChild(s1)

        // load text of each step
        const s2 = document.createElement('p')
        s2.appendChild(document.createTextNode(currentCraft.steps[a]))
        s2.style="font-size:100%;text-align: left;font-weight: lighter;margin-left: 15%;"
        c9.appendChild(s2)

        // load picture of each step
        const s3 = document.createElement('img')
        s3.src=currentCraft.stepPics[a]
        s3.style="object-fit: cover; display: inline-block; margin-left: auto; margin-right: auto; border-radius: 30px; width:80%;"
        c9.appendChild(s3)
    }
    c9.style='margin-bottom:35px;'

    // subtitle of tips
    const c10=document.createElement('p')
    loadSubTitle('Tips',c10)

    // load tips
    const c11=document.createElement('p')
    loadText(currentCraft.tips,c11)

    // subtitle of comments
    const c12=document.createElement('p')
    loadSubTitle('Comments',c12)

    // load comments
    const c13=document.createElement('p')
    for(var a = 0; a < currentCraft.totalComments; a++){
        const comment = document.createElement('p')
        // comment.style='display: inline-block;'
        loadText(currentCraft.comments[a].author.name + ': ' + currentCraft.comments[a].comMsg,comment)
        c13.appendChild(comment)
    }

    // add comments
    const commentBoxText= (currentUser === undefined) ? 'Login to leave your comment!' : 'Comment...'
    const buttonText= (currentUser === undefined) ? 'Login': 'Submit'

    const c14=document.createElement('p')
    c14.appendChild(document.createTextNode("Add comment:"))
    c14.style="font-size:130%;font-weight: bold;text-align: left; margin-top:0px; padding-top:20px; padding-left: 10%; border-top: solid white; border-width: 1px;"
    const c141=document.createElement('input')
    c141.id='commentBox'
    c141.type="text"
    c141.placeholder = commentBoxText
    c141.style="height:40px; display: inline-block; margin-left: auto; margin-right: auto; border-radius: 30px; width:80%;"
    const c142=document.createElement('button')
    c142.id='commentSub'
    c142.innerHTML = buttonText
    c142.style="width:30%;height:30px; margin-bottom:35px; margin-top:8px; border: None; background:white; border-radius: 10px 10px 10px 10px;  font-size: 20px;  text-align: center; color:#a3cfce;"

    if (currentUser!== undefined){
        c142.addEventListener('click',addUserComment)
    }else{
        c142.addEventListener('click',function(){
            window.document.location='./login.html'
        })
    }

    // subtitle of tries
    const c15=document.createElement('p')
    loadSubTitle('Tries',c15)
    const c151=document.createElement('div')
    c151.style="width:100%;display: inline-block;"

    // add tries
    const c16=document.createElement('p');
    c16.appendChild(document.createTextNode("Add try:"))
    c16.style="font-size:130%;font-weight: bold;text-align: left; margin-top:0px; padding-top:20px; padding-left: 10%; border-top: solid white; border-width: 1px;"
    const c17=document.createElement('img');
    c17.style="width: 20%; height: 20%; margin-left:15%;"
    c17.id="cover"
    const c18=document.createElement('input');
    c18.type="file" 
    c18.accept="image/*"
    c18.id="bannerSelector"
    c18.style="margin-left:20%; margin-bottom:50px;"
    const reader = new FileReader();
    reader.onload = e => {
      c17.src = e.target.result;
    }
    c18.addEventListener('change', e => {
      const f = e.target.files[0];
      reader.readAsDataURL(f);
    })

    const tryBoxText= (currentUser === undefined) ? 'Login to leave your try!' : 'Try...'
    const tbuttonText= (currentUser === undefined) ? 'Login': 'Submit'

    const c191=document.createElement('input')
    c191.id='tryBox'
    c191.type="text"
    c191.placeholder = tryBoxText
    c191.style="height:40px; display: inline-block; margin-left: auto; margin-right: auto; border-radius: 30px; width:80%;"
    const c192=document.createElement('button')
    c192.id='trySub'
    c192.innerHTML = tbuttonText
    c192.style="width:30%;height:30px; margin-bottom:35px; margin-top:8px; border: None; background:white; border-radius: 10px 10px 10px 10px;  font-size: 20px;  text-align: center; color:#a3cfce;"

    if (currentUser!== undefined){
        c192.addEventListener('click',addUserTry)
    }else{
        c192.addEventListener('click',function(){
            window.document.location='./login.html'
        })
    }

    c.appendChild(c1)
    c.appendChild(c2)
    c.appendChild(c3)
    c.appendChild(c4)
    c.appendChild(c5)
    c.appendChild(c6)
    c.appendChild(c7)
    c.appendChild(c8)
    c.appendChild(c9)
    c.appendChild(c10)
    c.appendChild(c11)
    c.appendChild(c12)
    c.appendChild(c13)
    c.appendChild(c14)
    c.appendChild(c141)
    c.appendChild(c142)
    c.appendChild(c15)
    showTries(c151)
    c.appendChild(c151)
    c.appendChild(c16)
    c.appendChild(c17)
    c.appendChild(c18)
    c.appendChild(c191)
    c.appendChild(c192)

    $('#board').append(c)

}

// helper function of loadCraft
function loadSubTitle(text,layer){
    layer.appendChild(document.createTextNode(text))
    layer.style="font-size:180%;font-weight: bold;text-align: left; margin-top:0px; padding-top:20px; padding-left: 10%; border-top: solid white; border-width: 1px;"
}

// helper function of loadCraft
function loadText(text,layer){
    if(text === null){
        layer.appendChild(document.createTextNode('None'))        
    }else{
        layer.appendChild(document.createTextNode(text))        
    }
    layer.style="width:70%; margin-left: 15%; font-size:100%;text-align: left;  "
}



// called when the user choose to add a comment to the cureent craft
function addUserComment(){
    const msg = document.querySelector('#commentBox').value
    currentUser.addComment(msg,currentCraft)
    loadCraft()
}

// called when the user choose to add a try to the cureent craft
function addUserTry(){
    const msg = document.querySelector('#tryBox').value
    const pic = document.querySelector('#cover').src
    currentUser.addTry(msg, currentCraft,pic)
    loadCraft()
}

// helper function of loadCraft
function showTries(parentLayer){
    for(var a = 0; a < currentCraft.tries.length; a++){
        const t = document.createElement('div')
        t.style="width: 25%; height:260px; border-radius: 30px; border-bottom: solid; margin-left: 6%; margin-top:2%; margin-bottom:35px; background-color: white; float: left;  display: inline-block; text-align: center;"
        const t1=document.createElement('a')
        const t11=document.createElement('img')
        t11.src=currentCraft.tries[a].tryPic
        t11.style=" display: inline-block; object-fit: cover; margin-left: auto; margin-right: auto; border-radius: 30px; width:100%; height: 200px;"
        t1.appendChild(t11)
        const t2=document.createElement('p')
        t2.innerHTML= truncate(currentCraft.tries[a].comMsg,16) +"<br>by: "+ currentCraft.tries[a].author.name+"<br>"
        t.appendChild(t1)
        t.appendChild(t2)
        parentLayer.appendChild(t)
    }
}

// load the login button on the top right corner
function loadUserDiv(Uname){
    const userDiv=document.querySelector( "#userDiv")
    loadCurrentUser(Uname)
    if (currentUser!== undefined){
        
        userDiv.innerHTML='Welcome! '+ currentUser.name
        userDiv.addEventListener('click',function(){
            window.document.location='./personal.html?currentUser='+currentUser.name+',other='
        })
    }else{
        userDiv.innerHTML='Log in'
        userDiv.addEventListener('click',function(){
            window.document.location='./login.html'
        })
    }
}

// load back home button
function loadBackHome(Uname){
    const backHome=document.querySelector("#backHome")
    backHome.innerHTML = 'Back to Home'
    backHome.addEventListener('click', e => {
        const name= (currentUser === undefined) ? '' : currentUser.name
        window.document.location='./index.html?currentUser='+ name
    })
}

// load likes number of the craft
function loadLikes(){
    const l=document.querySelector("#likes")
    l.innerHTML = 'Likes: ' + currentCraft.totalLikes
    l.addEventListener('click', addLikes)
}

// add current craft to likes
function addLikes(){
    if (currentUser === undefined){
        alert("Please log in to add likes")
    }else{
        var alreadyLike = 0
        for (var l = 0;l < currentUser.totalLikes;l++){
            if (currentUser.likes[l] === currentCraft ){
                alreadyLike = 1
            }
        }
        if(alreadyLike == 1){
            alert("You have already liked this craft")
        }else{
            currentUser.addLikes(currentCraft)
            loadLikes()
        }
    }
}

function setDoms() {
    // user regular expression to select keys
    const u=document.location.search.replace(/^.*?\=/,'')
    const Uname= u.replace(/[,].*$/,'')
    const Cname=u.replace(/^.*?\=/,'')
    console.log(Uname,Cname)
    loadCurrentCraft(Cname.replace(/(%20)/g,' '))
    loadUserDiv(Uname)
    loadBackHome(Uname)
    if(currentCraft===undefined){
        return
    }

    loadCraft()
}
setDoms()
