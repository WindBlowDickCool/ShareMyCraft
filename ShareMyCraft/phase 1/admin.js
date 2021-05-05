// remove craft from the allCrafts
function removeCraft(buttonObj){
	const rmItem=buttonObj.parentElement.parentElement.children[0].children[0].innerHTML
	console.log("removing " + rmItem);
	for(var i = 0; i < allCrafts.length; i++){
		if(allCrafts[i].title == rmItem){
			removeCraftbyIndex(i)
		}
	}
	buttonObj.parentElement.parentElement.remove();

}

// remove user from the allUsers
function removeUser(buttonObj){
	const rmItem=buttonObj.parentElement.parentElement.children[0].children[0].innerHTML
	console.log("removing " + rmItem);
	for(var i = 0; i < allUsers.length; i++){
		if(allUsers[i].name == rmItem){
			removeUserbyIndex(i)

		}
	}
	buttonObj.parentElement.parentElement.remove();
}

// load the crafts in the allCrafts to the board
function getCraft(e){
	e.preventDefault();
	const craftSheet = document.getElementById("Sheet");
	$('#Sheet').empty();
	allCrafts.forEach(function (value, index, array){
		const craftname = document.createElement("div");
		craftname.innerHTML = "<b>" + value.title + "</b>";
		const deleteButton = document.createElement("div");
		deleteButton.innerHTML = "<button class='actions' onclick='removeCraft(this)'>Delete</button>";
		const craftContainer = document.createElement("li");
		craftContainer.append(craftname);
		craftContainer.append(deleteButton);
		craftSheet.append(craftContainer);
	})
	 
}

// load users in the allUsers to the board
function getUser(e){
	e.preventDefault();
	console.log('setting')	
	const userSheet = document.getElementById("Sheet");
	$('#Sheet').empty();
	allUsers.forEach(function (value, index, array){
		if(value.name=='admin'){
			return
		}
		const username = document.createElement("div");
		username.innerHTML = "<b>" + value.name + "</b>";
		const deleteButton = document.createElement("div");
		deleteButton.innerHTML = "<button class='actions' onclick='removeUser(this)'>Delete</button>";
		const userContainer = document.createElement("li");
		userContainer.append(username);
		userContainer.append(deleteButton);
		userSheet.append(userContainer);
	})	 
}

function setDoms() {

	const u=document.querySelector("#uList")
	u.addEventListener('click',getUser)
	const c=document.querySelector("#cList")
	c.addEventListener('click',getCraft)
}
document.addEventListener('DOMContentLoaded',setDoms)
