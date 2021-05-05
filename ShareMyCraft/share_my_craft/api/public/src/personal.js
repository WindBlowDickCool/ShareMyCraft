const log = console.log
var thisUser;
var browsUser;
// load DOMs to the board when the user click addCraft
function loadaddCraft() {
	$('#board').empty();

	// The DOM that contains all the elements
	const container=document.createElement('div');
	container.style="width: 60%; margin:auto; margin-top: 30px;"

	// title board
	const title=document.createElement('input');
	title.id="title"
	title.type="text"
	title.placeholder="(required) Title..."
	title.style="height:25px; display: inline-block; margin-left: 20%; margin-top: 30px; border-radius: 30px; width:60%;"


	// cover board
	const msg=document.createElement('p');
	msg.appendChild(document.createTextNode("(required) Choose cover picture:"))
	msg.style="margin-left:20%;"

	const picPrev=document.createElement('img');
	picPrev.style="width: 20%; height: 20%; margin-left:20%;"
	picPrev.id="cover"
	const selector=document.createElement('input');
	selector.type="file" 
	selector.accept="image/*"
	selector.id="bannerSelector"
	selector.style="margin-left:20%;"
	const reader = new FileReader();
	reader.onload = e => {
	  picPrev.src = e.target.result;
	}
	selector.addEventListener('change', e => {
	  const f = e.target.files[0];
	  reader.readAsDataURL(f);
	})

	const selecontain = document.createElement('label');
    selecontain.className='custom-file-upload'
    const selecbtn=document.createElement('button')
    selecbtn.addEventListener('click', e => {
        selector.click()
    })
    selecbtn.innerHTML='Choose from file'
    selecbtn.style="width:130px;height:20px; margin-left:20%;margin-top:8px; border: None; background:#a3cfce; border-radius: 10px 10px 10px 10px;  text-align: center; color:white;"
    selecontain.appendChild(selector)
    selecontain.appendChild(selecbtn)
	// instruction board
	const instr=document.createElement('input');
	instr.id="instruction"
	instr.type="text"
	instr.placeholder="Instruction..."
	instr.style="height:25px; display: inline-block; margin-left: 20%; margin-top: 30px; border-radius: 30px; width:60%;"

	// supply board
	const supply=document.createElement('input');
	supply.id="supply"
	supply.type="text"
	supply.placeholder="Supplies..."
	supply.style="height:25px; display: inline-block; margin-left: 20%; margin-top: 30px; border-radius: 30px; width:60%;"

	// step board
	const stepContainer=document.createElement('div');
	stepContainer.id="stepContainer"
	const addButton = document.createElement('button')
	addButton.id='addButton'
	addButton.style="width:60%;height:20px; margin-left:20%;margin-top:30px; border: None; background:#a3cfce; border-radius: 10px 10px 10px 10px;  text-align: center; color:white;"
	addButton.appendChild(document.createTextNode('Add Step'))
	addButton.addEventListener('click', addStepBox)

	// tips board
	const tips=document.createElement('input');
	tips.id="tips"
	tips.type="text"
	tips.placeholder="Tips..."
	tips.style="height:25px; display: inline-block; margin-left: 20%; margin-top: 30px; border-radius: 30px; width:60%;"
	const subButton = document.createElement('button')
	subButton.id='subButton'
	subButton.style="width:60%;height:20px; margin-left:20%;margin-top:30px; border: None; background:#a3cfce; border-radius: 10px 10px 10px 10px;  text-align: center; color:white;"
	subButton.appendChild(document.createTextNode('Submit'))
	subButton.addEventListener('click', submitCraft)
	
	// append children
	container.append(title)
	container.append(msg)
	container.append(picPrev)
	container.append(selecontain)
	container.append(instr)
	container.append(supply)
	container.append(stepContainer)
	container.append(addButton)
	container.append(tips)
	container.append(subButton)
	$('#board').append(container)

}

//  called when the user click submit to ad a craft
async function submitCraft() {
	if(currentUser._id !== thisUser._id){
		log(currentUser._id,thisUser._id)
		return
	}
	const title = document.querySelector('#title').value
	var instr = document.querySelector('#instruction').value
	var supply = document.querySelector('#supply').value
	const stepContainer = document.querySelector('#stepContainer')
	const coverSrc = document.querySelector('#cover').src
	var tips = document.querySelector('#tips').value
	if(title.length<1 | coverSrc.length<1){
		alert('The title and the cover picture can not be empty')
		return;
	}
	if(instr.length<1){
		instr = "The author is lazy."
	}
	if(supply.length<1){
		supply= "The author is lazy."
	}
	if(tips.length<1){
		tips = "The author is lazy."
	}
	
	let step_pic=[]
	let step_msg = []

	pics=stepContainer.getElementsByTagName('img') 
	steps=stepContainer.getElementsByClassName('stepMsg')
	// pics.forEach(function (val, i, array){
	for(i=0; i<pics.length;i++) {
		if(pics[i].src.length>=1 & steps[i].value.length>=1){
			const p =await saveImg(pics[i].src)
			step_pic.push(p)
			step_msg.push(steps[i].value)
		}else{
			alert('Something went wrong.')
			return
		}
	}
	const coverurl = await saveImg(coverSrc)
	const newCraft = {
		coverName: coverurl,
		title,
		author: currentUser._id,
		authorname: currentUser.username,
		intro: instr,
		supplies: supply,
		tips,
		stepPics: step_pic,
		steps: step_msg,
		totalSteps: pics.length
	}
	const url = '/crafts/addCraft';
    const request = new Request(url, {
        method: 'post', 
        body: JSON.stringify(newCraft),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });

    // Send the request with fetch()
    fetch(request)
    .then(function(res) {
        if (res.status === 200) {
            console.log('Added craft')
            return res.json();
        } else {
        	alert('Something went wrong, try again!')
        }
    }).then((result)=>{
    	thisUser.crafts.push(result.craft);
    	loadaddCraft()
    })
    .catch((error) => {
        log(error)
    })
}
async function saveImg(pic){
    const cloudinaryURL = "https://api.cloudinary.com/v1_1/dwrelgysk/image/upload"
    const formData = new FormData();
    formData.append('file', pic)
    formData.append('upload_preset', 'tttxwur4')
    const uploadRequest = new Request(cloudinaryURL, {
        method: "post",
        body: formData
    })
    return fetch(uploadRequest)
    .then((res) => {
        if (res.status === 200) {
            log('Successfully uploaded image!')
            return res.json()
        } else {
            log('Failed uploading image.')
        }
    }).then((data) => {
        const coverURL = data.url
        return coverURL
    }).catch((error) => {
        log(error)
    })
}
// called when the user wants to add a new step to the craft 
function addStepBox() {
	const stepMsg=document.createElement('input');
	stepMsg.type="text"
	stepMsg.className="stepMsg"
	stepMsg.placeholder="Step..."
	stepMsg.style="height:25px; display: inline-block; margin-left: 20%; margin-top: 30px; border-radius: 30px; width:60%;"
	const msg=document.createElement('p');
	msg.appendChild(document.createTextNode("Choose step picture:"))
	msg.style="margin-left:20%;"
	const picPrev=document.createElement('img');
	picPrev.style="width: 20%; height: 20%; margin-left:20%;"
	const selector=document.createElement('input');
	selector.type="file" 
	selector.accept="image/*"
	selector.id="bannerSelector"
	selector.style="margin-left:20%;"
	const reader = new FileReader();
	reader.onload = e => {
	  picPrev.src = e.target.result;
	}
	selector.addEventListener('change', e => {
	  const f = e.target.files[0];
	  reader.readAsDataURL(f);
	})
	const selecontain = document.createElement('label');
    selecontain.className='custom-file-upload'
    const selecbtn=document.createElement('button')
    selecbtn.addEventListener('click', e => {
        selector.click()
    })
    selecbtn.innerHTML='Choose from file'
    selecbtn.style="width:130px;height:20px; margin-left:20%;margin-top:8px; border: None; background:#a3cfce; border-radius: 10px 10px 10px 10px;  text-align: center; color:white;"
    selecontain.appendChild(selector)
    selecontain.appendChild(selecbtn)
	$('#stepContainer').append(stepMsg)
	$('#stepContainer').append(msg)
	$('#stepContainer').append(picPrev)
	$('#stepContainer').append(selecontain)
}

// called when the user click the mySettings to change setting
function loadSettings(){
	if(currentUser._id !== thisUser._id){
		return
	}
	$('#board').empty();
	const container=document.createElement('div');
	container.style="width: 60%; margin:auto; margin-top: 30px;"
	const bMsg=document.createElement('p');
	bMsg.appendChild(document.createTextNode("Choose banner picture:"))
	bMsg.style="margin-left:20%;"
	const bannerPrev=document.createElement('img');
	bannerPrev.id="bannerPrev"
	bannerPrev.style="width: 20%; height: 20%; margin-left:20%;"
	const bannerSelector=document.createElement('input');
	bannerSelector.type="file" 
	bannerSelector.accept="image/*"
	bannerSelector.id="bannerSelector"
	bannerSelector.style="margin-left:20%;"
	const bcontain = document.createElement('label');
    bcontain.className='custom-file-upload'
    const bbtn=document.createElement('button')
    bbtn.addEventListener('click', e => {
        bannerSelector.click()
    })
    bbtn.innerHTML='Choose from file'
    bbtn.style="width:130px;height:20px; margin-left:20%;margin-top:8px; border: None; background:#a3cfce; border-radius: 10px 10px 10px 10px;  text-align: center; color:white;"
    bcontain.appendChild(bannerSelector)
    bcontain.appendChild(bbtn)
	const pMsg=document.createElement('p');
	pMsg.appendChild(document.createTextNode("Choose profile picture:"))
	pMsg.style="margin-left:20%;"
	const profilePrev=document.createElement('img');
	profilePrev.id="profilePrev"
	profilePrev.style="width: 20%; height: 20%; margin-left:20%; margin-top: 30px;"
	const profileSelector=document.createElement('input');
	profileSelector.type="file" 
	profileSelector.accept="image/*"
	profileSelector.id="profileSelector"
	profileSelector.style="margin-left:20%;"
	const selecontain = document.createElement('label');
    selecontain.className='custom-file-upload'
    const selecbtn=document.createElement('button')
    selecbtn.addEventListener('click', e => {
        profileSelector.click()
    })
    selecbtn.innerHTML='Choose from file'
    selecbtn.style="width:130px;height:20px; margin-left:20%;margin-top:8px; border: None; background:#a3cfce; border-radius: 10px 10px 10px 10px;  text-align: center; color:white;"
    selecontain.appendChild(profileSelector)
    selecontain.appendChild(selecbtn)
	const oldPass=document.createElement('input');
	oldPass.id="nPass"
	oldPass.type="text"
	oldPass.placeholder="New password"
	oldPass.style="height:25px; display: inline-block; margin-left: 20%; margin-top: 30px; border-radius: 30px; width:60%;"
	const newPass=document.createElement('input');
	newPass.id="ncPass"
	newPass.type="text"
	newPass.placeholder="Confirm password"
	newPass.style="height:25px; display: inline-block; margin-left: 20%; margin-top: 30px; border-radius: 30px; width:60%;"
	const submit=document.createElement('button');
	submit.appendChild(document.createTextNode("Save Changes"))
	submit.id="submit"
	submit.style="width:60%;height:20px; margin-left:20%;margin-top:30px; border: None; background:#a3cfce; border-radius: 10px 10px 10px 10px;  text-align: center; color:white;"
	container.appendChild(bMsg)
	container.appendChild(bannerPrev)
	container.appendChild(bcontain)
	container.appendChild(pMsg)
	container.appendChild(profilePrev)
	container.appendChild(selecontain)
	container.appendChild(oldPass)
	container.appendChild(newPass)
	container.appendChild(submit)
	$('#board').append(container)
	$('#submit').bind('click',changesetting)
	const bannerReader = new FileReader();
	bannerReader.onload = e => {
	  bannerPrev.src = e.target.result;
	}
	bannerSelector.addEventListener('change', e => {
	  const f = e.target.files[0];
	  bannerReader.readAsDataURL(f);
	})
	const profileReader = new FileReader();
	profileReader.onload = e => {
	  profilePrev.src = e.target.result;
	}
	profileSelector.addEventListener('change', e => {
	  const f = e.target.files[0];
	  profileReader.readAsDataURL(f);
	})
}

// called when the user clicks the submit to change setting 
async function changesetting(e){
	if(currentUser._id !== thisUser._id){
		return
	}
	e.preventDefault();
	console.log('changing settings')
	const nPass = document.querySelector('#nPass').value
	const ncPass = document.querySelector('#ncPass').value
	const bannerPic = document.getElementById("bannerPrev");	
	const profilePic = document.getElementById("profilePrev");
	if(nPass !== '' | ncPass !== ''){
		if(nPass===ncPass){
			const url = '/password/'+ currentUser._id;
			const request = new Request(url, {
				method: 'put',
				headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
				},
				body: JSON.stringify({ 'password': ncPass })				
			})
	        fetch(request)
			.then((res) => {
				if (res.status === 200) {
				  log('Successfully updated password!')
				  // return res.json();
				} else {
				  log('Failed')
				}
			})
			.catch((error) => {
			log(error)
			})			
		}
	}
	// currentUser.changePassword(newPass,oldPass)
	// var bannerurl
	// var profileurl 
	if(bannerPic.src!== ""){
		bannerurl= await saveImg(bannerPic.src);
        const updateURL ='/users/bannerPic/' + currentUser._id 
        const updateRequest = new Request(updateURL, {
			method: 'put',
			headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
			},
			body: JSON.stringify({ 'bannerPic': bannerurl })
        })

        fetch(updateRequest)
		.then((res) => {
			if (res.status === 200) {
			  log('Successfully updated banner picture!')
			  return res.json();
			} else {
			  log('Failed')
			}
		}).then((user)=>{
			thisUser.bannerPic=user.bannerPic
			$('#bannerPic').attr("src",bannerPic.src);
		})
		.catch((error) => {
		log(error)
		})

		// currentUser.changeBannerPic(bannerPic.src)
		// $('#bannerPic').attr("src",bannerPic.src);
		// console.log('banner changed')
	}
	if(profilePic.src!== ""){
		profileurl= await saveImg(profilePic.src);
        const updateURL2 ='/users/profilePic/' + currentUser._id 
        const updateRequest2 = new Request(updateURL2, {
			method: 'put',
			headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
			},
			body: JSON.stringify({ 'profilePic':profileurl })
        })

        fetch(updateRequest2)
		.then((res) => {
			if (res.status === 200) {
			  log('Successfully updated banner picture!')
			  return res.json();
			} else {
			  log('Failed')
			}
		}).then((user)=>{
			thisUser.profilePic=user.profilePic
			$('#profilePicCircle').attr("src",profilePic.src)
		})
		.catch((error) => {
			log(error)
		})
	}
}

// called when the user click to see its tries
function loadTries(e){
	e.preventDefault();
	console.log('loading tries...')
	$('#board').empty();
	// const cg = new CraftGenerator()
	for(i =0; i<thisUser.tries.length; i++){
		const cr = thisUser.tries[i];
		const msg=truncate(cr.comMsg,40)
		const c = document.createElement('div')
		c.style="width: 28%; height:280px; border-radius: 30px; border-bottom: solid; margin-left: 4%; margin-top:4%; background-color: #a3cfce; float: left;  display: inline-block; text-align: center;"
		const c1=document.createElement('a')
		// c1.herf=""
		const c11=document.createElement('img')
		c11.src=cr.tryPic
		c11.style="height:200px; object-fit: cover; display: inline-block; margin-left: auto; margin-right: auto; border-radius: 30px; width:100%;"
		c1.appendChild(c11)
		const c2=document.createElement('p')
		c2.innerHTML=msg
		c.appendChild(c1)
		c.appendChild(c2)
		// this.craftTags.push(c)
		$('#board').append(c)
		c.addEventListener('click', e => {
		    const url = '/craft/'+cr.triedCraft;
		    window.location.href = url		
		})
	}
}

// called when the user click to see crafts
function loadCrafts(e){
	e.preventDefault();
	console.log('loading crafs...')
	$('#board').empty();
	// const cg = new CraftGenerator()
	for(i =0; i<thisUser.crafts.length;i++){
		makeTag(thisUser.crafts[i])
	}
}

// called when the user click to see likes
function loadLikes(e){
	e.preventDefault();
	console.log('loading likes...')
	$('#board').empty();
	// const cg = new CraftGenerator()
	for(i =0; i<thisUser.likes.length;i++){
		makeTag(thisUser.likes[i])
	}
}

// called when the user click to see its comment history
function loadComments(e){
	e.preventDefault();
	console.log('loading comments...')
	$('#board').empty();
	// const cg = new CraftGenerator()
	for(i =0; i<thisUser.comments.length;i++){
		const cr = thisUser.comments[i];
		const msg=truncate(cr.comMsg,40)
		const c = document.createElement('div')
		c.style="width: 28%; height:280px; border-radius: 30px; border-bottom: solid; margin-left: 4%; margin-top:4%; background-color: #a3cfce; float: left;  display: inline-block; text-align: center;"
		const c1=document.createElement('a')
		// c1.herf=""
		const c11=document.createElement('img')
		c11.src=cr.craftPic
		c11.style="height:200px; object-fit: cover; display: inline-block; margin-left: auto; margin-right: auto; border-radius: 30px; width:100%;"
		c1.appendChild(c11)
		const c2=document.createElement('p')
		c2.innerHTML=msg
		c.appendChild(c1)
		c.appendChild(c2)
		// this.craftTags.push(c)
		$('#board').append(c)
		c.addEventListener('click', e => {
		    const url = '/craft/'+cr.comCraft;
		    window.location.href = url		
		})
	}
}
function loadUser(thisuser_id){
	const userDiv=document.querySelector( "#userDiv")
	const signDiv=document.querySelector( "#signoutDiv" )

	// loadCurrentUser(Uname)current
	fetch('/users/current')
    .then((res) => { 
        if (res.status === 200) {
        	return res.json()
        } else {
        	alert('Error occurred. Try again!')
        }                
    }).then((user) => {

		if( user._id !== undefined){
            currentUser=user
            userDiv.innerHTML='Welcome! '+ user.username
            if(user.userType==='user'){
                userDiv.addEventListener('click', function(){
                    const url = '/personal/'+user._id;
                    window.location.href = url
                })              
            }else{
                userDiv.addEventListener('click', function(){
                    const url = '/admin'
                    window.location.href = url
                })              
            }
            signDiv.innerHTML="Sign out"
            signDiv.addEventListener('click', function(){
            	fetch('/users/logout')
			    .then((res) => { 
			        if (res.status === 200) {
				        window.location.href ='/index'
			           return res.json() 
			       } else {
			            alert('Sign out failed!')
			       }                
			    }).catch((error) => {
			        log(error)
			    })

            })
        } else {
            userDiv.innerHTML='Log in'
            userDiv.addEventListener('click', function(){
                const url = '/login';
                window.location.href = url
            })
            signDiv.innerHTML=""
            
        }
   		if(thisuser_id===currentUser._id){
			const list=document.getElementById('sidebar').children[0]
			list.innerHTML=list.innerHTML+"<li><button id='addCraft' class='sidebarElm'> Add Craft</button> </li> <li><button id='mySettings' class='sidebarElm'>My Settings</button></li>"
			$('#addCraft').bind('click',loadaddCraft);
			$('#mySettings').bind('click',loadSettings);
		}
    })
    .catch((error) => {
        log(error)
    })
    url='/crafts/detailsbyUser/'+thisuser_id
	fetch(url)
    .then((res) => { 
        if (res.status === 200) {
        	return res.json()
        } else {
        	alert('Error occurred. Try again!')
        }                
    }).then((user) => {
    	log(489,user)
    	thisUser=user
		$('#myTries').bind('click',loadTries);
		$('#myCrafts').bind('click',loadCrafts);
		$('#myComments').bind('click',loadComments);
		$('#myLikes').bind('click',loadLikes);
		const profilePic=document.getElementById('profilePicCircle');
		profilePic.src=thisUser.profilePic;
		const bannerPic=document.getElementById('bannerPic');
		bannerPic.src=thisUser.bannerPic;	
		const n=document.getElementById('profileName');
		n.innerHTML=thisUser.username 
		log(thisUser)
    })
    .catch((error) => {
        log(error)
    })
}
function truncate(str, n){
  return (str.length > n) ? str.substr(0, n-1) + '...' : str;
};
function makeTag(cr){
	const msg=truncate(cr.title,40)+"<br>by: "+cr.authorname+"<br>Tries: "+cr.totalTries+" Likes: "+cr.totalLikes
	const c = document.createElement('div')
	c.style="width: 28%; height:280px; border-radius: 30px; border-bottom: solid; margin-left: 4%; margin-top:4%; background-color: #a3cfce; float: left;  display: inline-block; text-align: center;"
	const c1=document.createElement('a')
	// c1.herf=""
	const c11=document.createElement('img')
	c11.src=cr.coverName
	c11.style="height:200px; object-fit: cover; display: inline-block; margin-left: auto; margin-right: auto; border-radius: 30px; width:100%;"
	c1.appendChild(c11)
	const c2=document.createElement('p')
	c2.innerHTML=msg
	c.appendChild(c1)
	c.appendChild(c2)
	// this.craftTags.push(c)
	$('#board').append(c)
	c.addEventListener('click', e => {
	    const url = '/craft/'+cr._id;
	    window.location.href = url		
	})
}
function loadBackHome(){
    log(389)
    const backHome=document.querySelector("#backHome")
    backHome.innerHTML = 'Back to Home'
    backHome.addEventListener('click', e => {
        const name= (currentUser === undefined) ? '' : currentUser.name
        window.location.href ='/index'
    })
}
function setClicks(){
    const str = window.location.pathname
    // use regular expression to select keys
    const id=str.replace(/^.*?(personal)\//,'')
    loadUser(id)
    loadBackHome()
}

setClicks()
