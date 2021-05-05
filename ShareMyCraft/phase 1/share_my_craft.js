const allUsers=[];
const allCrafts=[];
var currentUser;
var currentCraft;

// The admin class
class Admin {
	constructor(name, password) {
		this.name = name;
		this.password = password;		
	}
}

// The common user class
class CommonUser {
	constructor(name, password) {
		this.name = name;
		this.password = password;
		this.crafts = [];
		this.likes = []; 
		this.comments=[];
		this.tries=[];
		this.bannerPic=null;
		this.profilePic=null;
		this.totalCrafts=0;
		this.totalLikes = 0; 
		this.totalComments=0;
		this.totalTries=0;
		this.index=allUsers.length;
	}
	setAttributes(){
		// Set the bannerPic, profilePic, totalCrafts, totalLikes,totalComments and totalTries by the data downloaded from the server
		// code in this function requires sever call
	}
	changePassword(newPass, oldPass){
		// Upload changes of the password to the server
		// code below requires server call
		const self = this;
		if(newPass!== null & oldPass!== null &(self.password===oldPass)){
			self.password=newPass;
		}
	}
	changeProfilePic(newPic){
		// Upload changes of the profile picture to the server
		// code below requires server call
		const self=this;
		if(newPic!== null){
			self.profilePic=newPic;	
		}
	}
	changeBannerPic(newPic){
		// Upload changes of the banner picture to the server
		// code below requires server call
		const self=this;
		if(newPic!== null){
			self.bannerPic=newPic;	
		}
	}
	addCraft(coverName,title){
		// Upload new craft to the server
		// code below requires server call
		const self=this;
		if(coverName!== null & title!== null){
			const newCraft=new Craft(title,self,coverName);	
			self.crafts.push(newCraft);
			allCrafts.push(newCraft);
			newCraft.index=self.totalCrafts;
			self.totalCrafts++;		
		}
	}
	addLikes(likedCraft){
		// Upload new likes to the server
		// code below requires server call
		const self=this;
		if(likedCraft!== null){
			self.totalLikes++;
			self.likes.push(likedCraft);
			likedCraft.likes.push(self);
			likedCraft.totalLikes++;
		}
	}
	addComment(comMsg, comCraft){
		// Upload comments to the server
		// code below requires server call
		const self=this;
		if(comMsg.length>0 & comCraft!== null){
			self.totalComments++;
			const newCom=new Comment(comMsg,comCraft,self);
			self.comments.push(newCom);
			comCraft.addnewComment(newCom,self);
		}
	}
	addTry(comMsg, triedCraft,tryPic){
		// Upload try to the server
		// code below requires server call
		const self=this;
		if(comMsg.length>0 & triedCraft!== null & tryPic.length>0){
			self.totalTries++;
			const newTry=new Try(comMsg,triedCraft,self,tryPic);
			self.tries.push(newTry);
			triedCraft.addnewTry(newTry,self);
		}		
	}
}

// The try
class Try{
	constructor(comMsg,triedCraft,author,tryPic){
		this.comMsg=comMsg;
		this.triedCraft=triedCraft;
		this.author=author;		
		this.tryPic=tryPic;
	}
}

// The comment
class Comment{
	constructor(comMsg,comCraft,author){
		this.comMsg=comMsg;
		this.comCraft=comCraft;
		this.author=author;
	}
}

// The craft
class Craft{
	constructor(title,author,coverName){
		this.coverName=coverName;
		this.title=title;
		this.author=author;
		this.comments=[];
		this.likes=[];
		this.tries=[];
		this.totalLikes=0;
		this.totalComments=0;
		this.totalTries=0;
		this.intro=null;
		this.supplies=null;
		this.tips=null;
		this.stepPics=[];
		this.steps=[];
		this.totalSteps=0;
		this.index=null;		
	}
	addnewComment(comment,user){
		// code below requires server call
		const self=this;
		if(comment!== null & user!== null){
			self.comments.push(comment);
			self.totalComments++;	
		}
	}
	setIntro(msg){
		// code below requires server call
		const self=this;
		if(msg!== null){
			self.intro=msg;
		}
	}
	setSupplies(msg){
		// code below requires server call
		const self=this;
		if(msg!== null){
			self.supplies=msg;
		}		
	}
	setTips(msg){
		// code below requires server call
		const self=this;
		if(msg!== null){
			self.tips=msg;
		}
	}
	addStep(stepPic, stepMsg){
		// code below requires server call
		const self=this;
		if(stepPic!== null & stepMsg!== null){
			self.stepPics.push(stepPic);
			self.steps.push(stepMsg);
			self.totalSteps++;
		}
	}
	addnewTry(newTry,user){		
		// code below requires server call
		const self=this;
		if(newTry!== null&user!== null){
			self.tries.push(newTry);
			self.totalTries++;	
		}		
	}
}

// Add new user to server
function addCommonUser(name, password) {

	// code below requires server call
	const u=new CommonUser(name,password)
	allUsers.push(u)
}

// Remove a craft from server
function removeCraftbyIndex(i) {
	
	// code below requires server call
	allCrafts[i].author.crafts.splice(allCrafts[i].index,1)
	allCrafts[i].author.totalCrafts--
	for(j=i;j<allCrafts[i].author.crafts.length;j++){
		allCrafts[i].author.crafts[j].index--;
	}
	allCrafts.splice(i, 1);
	console.log('removed craft')

}

// Remove a craft from server
function removeUserbyIndex(i) {
	
	// code below requires server call
	for(j=i;j<allUsers.length;j++){
		allUsers[j].index--;
	}
	allUsers.splice(i, 1);
	console.log('removed user')

}

// Get data from server
function allDataCallBack() {
	
	// code below requires server call
	const admin=new Admin('admin','admin')
	allUsers.push(admin)
	addCommonUser('user','user')
	const a=allUsers[1]
	a.changeBannerPic('./images/banner.jpg')
	a.changeProfilePic('./images/profilepic.jpg')
	a.addCraft('./images/craft1.jpg','Acraft1')
	a.addCraft('./images/craft2.jpg','Acraft2')
	a.addCraft('./images/food.jpg','Acraft3: I tried the oil painting for the first time! This is the craft must try because its easy and ecofriendly! Please ask me questions if you have some!')
	addCommonUser('user2','user2')
	const b=allUsers[2]
	b.changeBannerPic('./images/banner2.jpg')
	b.changeProfilePic('./images/profilepic2.jpg')
	b.addCraft('./images/craft3.jpg','Bcraft1')
	a.addLikes(b.crafts[0])
	a.addComment('Looks good!',b.crafts[0])
	a.addTry('Its easy!',b.crafts[0],'./images/food.jpg')
	b.addLikes(a.crafts[0])
	b.addLikes(a.crafts[2])
	b.addComment('want to try!',a.crafts[1])
	b.addComment('Looks good!',a.crafts[0])
	b.addComment('Looks nice!',a.crafts[0])
	b.addTry('Its easy!',a.crafts[0],'./images/food.jpg')
	b.addTry('I tried it!',a.crafts[0],'./images/profilepic.jpg')
	b.addTry('Be careful with the knife when you cut!',a.crafts[0],'./images/profilepic.jpg')
	b.addTry('I tried it!',a.crafts[0],'./images/craft1.jpg')
	b.addTry('I tried it!',a.crafts[0],'./images/craft2.jpg')
	b.addTry('I tried it!',a.crafts[0],'./images/craft3.jpg')
	b.addTry('I tried it!',a.crafts[0],'./images/craft2.jpg')
	a.crafts[0].setIntro('This is a craft made by A')
	a.crafts[0].setSupplies('pen * 1 paper * 1')
	a.crafts[0].setTips('It would be better to use a pensil.')
	a.crafts[0].addStep('./images/craft3.jpg', 'step 1')
	a.crafts[0].addStep('./images/craft2.jpg', 'step 2')
	console.log('----loaded data----')
	console.log(allUsers)
	console.log(allCrafts)
} 

// Load the user that is current browsing the page
function loadCurrentUser(name) {
	if(name!==null){
		allUsers.forEach(function (value, index, array){
			if(value.name===name){
				currentUser=value
			}
		})
	}
}

// Load the craft that is being browsed
function loadCurrentCraft(title) {
	if(title!==null){
		allCrafts.forEach(function (value, index, array){
			if(value.title===title){
				currentCraft=value
			}
		})
	}
}

// Generate tags for a craft, add onclick function to the tag
function CraftGenerator() {
	this.craftTags=[]
} 

CraftGenerator.prototype = {
	makeTag(craft, msg, element){
		console.log('now making tag of ',craft)
		const c = document.createElement('div')
		c.classList.add('craftCard')
		c.style="width: 28%; height:280px; border-radius: 30px; border-bottom: solid; margin-left: 4%; margin-top:4%; background-color: #a3cfce; float: left;  display: inline-block; text-align: center;"
		const c1=document.createElement('a')
		c1.herf=""
		const c11=document.createElement('img')
		c11.src=craft.coverName
		c11.style="height:200px; object-fit: cover; display: inline-block; margin-left: auto; margin-right: auto; border-radius: 30px; width:100%;"
		c1.appendChild(c11)
		const c2=document.createElement('p')
		c2.innerHTML=msg
		c.appendChild(c1)
		c.appendChild(c2)
		this.craftTags.push(c)
		$(element).append(c)
		c.addEventListener('click', e => {
			const name= (currentUser === undefined) ? '' : currentUser.name 
		 	window.document.location='./craft.html?currentUser='+name+',currentCraft='+craft.title
		})
	}
}

// If the title/name of the tag is too long truncate it
function truncate(str, n){
  return (str.length > n) ? str.substr(0, n-1) + '...' : str;
};

allDataCallBack()

