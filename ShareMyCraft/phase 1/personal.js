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
	title.placeholder="Title..."
	title.style="width: 60%; margin-left:20%; margin-top: 30px;"

	// cover board
	const msg=document.createElement('p');
	msg.appendChild(document.createTextNode("Choose cover picture:"))
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

	// instruction board
	const instr=document.createElement('input');
	instr.id="instruction"
	instr.type="text"
	instr.placeholder="Instruction..."
	instr.style="width: 60%; margin-left:20%; margin-top: 30px;"

	// supply board
	const supply=document.createElement('input');
	supply.id="supply"
	supply.type="text"
	supply.placeholder="Supplies..."
	supply.style="width: 60%; margin-left:20%; margin-top: 30px;"

	// step board
	const stepContainer=document.createElement('div');
	stepContainer.id="stepContainer"
	const addButton = document.createElement('button')
	addButton.id='addButton'
	addButton.style="width: 60%; margin-left:20%; margin-top: 30px;"
	addButton.appendChild(document.createTextNode('Add Step'))
	addButton.addEventListener('click', addStepBox)

	// tips board
	const tips=document.createElement('input');
	tips.id="tips"
	tips.type="text"
	tips.placeholder="Tips..."
	tips.style="width: 60%; margin-left:20%; margin-top: 30px;"
	const subButton = document.createElement('button')
	subButton.id='subButton'
	subButton.style="width: 60%; margin-left:20%; margin-top: 30px;"
	subButton.appendChild(document.createTextNode('Submit'))
	subButton.addEventListener('click', submitCraft)
	
	// append children
	container.append(title)
	container.append(msg)
	container.append(picPrev)
	container.append(selector)
	container.append(instr)
	container.append(supply)
	container.append(stepContainer)
	container.append(addButton)
	container.append(tips)
	container.append(subButton)
	$('#board').append(container)

}

//  called when the user click submit to ad a craft
function submitCraft() {
	const title = document.querySelector('#title').value
	const instr = document.querySelector('#instruction').value
	const supply = document.querySelector('#supply').value
	const stepContainer = document.querySelector('#stepContainer')
	const coverSrc = document.querySelector('#cover').src
	const tips = document.querySelector('#tips').value
	if(title.length<1 | coverSrc.length<1){
		return;
	}
	
	thisUser.addCraft(coverSrc,title)
	newCraft=thisUser.crafts[thisUser.totalCrafts-1]
	pics=stepContainer.getElementsByTagName('img') 
	steps=stepContainer.getElementsByClassName('stepMsg')
	for(i=0; i<pics.length;i++) {
		if(pics[i].src.length>=1 & steps[i].value.length>=1){
			newCraft.addStep(pics[i].src,steps[i].value)
		}
	}
	newCraft.setIntro(instr)
	newCraft.setSupplies(supply)
	newCraft.setTips(tips)
	console.log('Submitted: ', newCraft)
	loadaddCraft()
}

// called when the user wants to add a new step to the craft 
function addStepBox() {
	const stepMsg=document.createElement('input');
	stepMsg.type="text"
	stepMsg.className="stepMsg"
	stepMsg.placeholder="Step..."
	stepMsg.style="width: 60%; margin-left:20%; margin-top: 30px;"
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
	$('#stepContainer').append(stepMsg)
	$('#stepContainer').append(msg)
	$('#stepContainer').append(picPrev)
	$('#stepContainer').append(selector)
}

// called when the user click the mySettings to change setting
function loadSettings(){
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
	const oldPass=document.createElement('input');
	oldPass.id="oldPass"
	oldPass.type="text"
	oldPass.placeholder="Old password"
	oldPass.style="width: 60%; margin-left:20%; margin-top: 30px;"
	const newPass=document.createElement('input');
	newPass.id="newPass"
	newPass.type="text"
	newPass.placeholder="New password"
	newPass.style="width: 60%; margin-left:20%; margin-top: 30px;"
	const submit=document.createElement('button');
	submit.appendChild(document.createTextNode("Submit"))
	submit.id="submit"
	submit.style="width: 60%; margin-left:20%; margin-top: 30px;"
	container.appendChild(bMsg)
	container.appendChild(bannerPrev)
	container.appendChild(bannerSelector)
	container.appendChild(pMsg)
	container.appendChild(profilePrev)
	container.appendChild(profileSelector)
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
function changesetting(e){
	e.preventDefault();
	console.log('changing settings')
	const oldPass = document.querySelector('#oldPass').value
	const newPass = document.querySelector('#newPass').value
	const bannerPic = document.getElementById("bannerPrev");	
	const profilePic = document.getElementById("profilePrev");
	currentUser.changePassword(newPass,oldPass)
	if(bannerPic.src!== ""){
		currentUser.changeBannerPic(bannerPic.src)
		$('#bannerPic').attr("src",bannerPic.src);
		console.log('banner changed')
	}
	if(profilePic.src!== ""){
		currentUser.changeProfilePic(profilePic.src)
		$('#profilePicCircle').attr("src",profilePic.src)
		console.log('profile picture changed')
	}
}

// called when the user click to see its tries
function loadTries(e){
	e.preventDefault();
	console.log('loading tries...')
	$('#board').empty();
	const cg = new CraftGenerator()
	for(i =0; i<thisUser.totalTries;i++){
		cg.makeTag(thisUser.tries[i].triedCraft,truncate(thisUser.tries[i].comMsg,35),'#board');
	}
}

// called when the user click to see crafts
function loadCrafts(e){
	e.preventDefault();
	console.log('loading crafs...')
	$('#board').empty();
	const cg = new CraftGenerator()
	for(i =0; i<thisUser.totalCrafts;i++){
		cg.makeTag(thisUser.crafts[i],truncate(thisUser.crafts[i].title,35),'#board');
	}
}

// called when the user click to see likes
function loadLikes(e){
	e.preventDefault();
	console.log('loading likes...')
	$('#board').empty();
	const cg = new CraftGenerator()
	for(i =0; i<thisUser.totalLikes;i++){
		cg.makeTag(thisUser.likes[i],truncate(thisUser.likes[i].title,35),'#board');
	}
}

// called when the user click to see its comment history
function loadComments(e){
	e.preventDefault();
	console.log('loading comments...')
	$('#board').empty();
	const cg = new CraftGenerator()
	for(i =0; i<thisUser.totalComments;i++){
		cg.makeTag(thisUser.comments[i].comCraft,truncate(thisUser.comments[i].comMsg,35),'#board');
	}
}

function setClicks(){
	const u=document.location.search.replace(/^.*?\=/,'')
    const Uname= u.replace(/[,].*$/,'')
    const Cname=u.replace(/^.*?\=/,'')
	loadCurrentUser(Uname)
	if(Cname.length<1 | Cname===Uname){
	    console.log(Uname,'is viewing ',Uname)
		loadCurrentUser(Uname)
		thisUser=currentUser
		const list=document.getElementById('sidebar').children[0]
		list.innerHTML=list.innerHTML+"<li><button id='addCraft' class='sidebarElm'> Add Craft</button> </li> <li><button id='mySettings' class='sidebarElm'>My Settings</button></li>"
		$('#addCraft').bind('click',loadaddCraft);
		$('#mySettings').bind('click',loadSettings);
	}else{
	    console.log(Uname,'is viewing ',Cname)
		loadCurrentUser(Uname)
		allUsers.forEach(function (value, index, array){
			if(value.name===Cname){
				thisUser=value
				console.log(index)
			}
		})
	}
	$('#myTries').bind('click',loadTries);
	$('#myCrafts').bind('click',loadCrafts);
	$('#myComments').bind('click',loadComments);
	$('#myLikes').bind('click',loadLikes);
	const profilePic=document.getElementById('profilePicCircle');
	profilePic.src=thisUser.profilePic;
	const bannerPic=document.getElementById('bannerPic');
	bannerPic.src=thisUser.bannerPic;	
	const n=document.getElementById('profileName');
	n.innerHTML=thisUser.name

}

setClicks()
