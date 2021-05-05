// Set the search button
function setSearch() {
	const btn=document.querySelector('#searchbtn');
	btn.addEventListener('click', searchCraft);
}

// load all crafts to the home page
function loadAllCrafts(){
	$('#board').empty();
	const cg = new CraftGenerator()
	allCrafts.forEach(function (value, index, array) {
		const msg=truncate(value.title,40)+"<br>by: "+value.author.name+"<br>Tries: "+value.totalTries+" Likes: "+value.totalLikes
		cg.makeTag(value,msg,'#board');
	});
}

// search for a craft using the search bar
function searchCraft(e) {
	e.preventDefault();
	const searchItem = document.querySelector('#searchbar').value;
	console.log('Searching: '+searchItem)
	relatedCrafts=[]
	allCrafts.forEach(function (value, index, array){
		if(value.author.name.includes(searchItem) | value.title.includes(searchItem)){
			relatedCrafts.push(value)
		}
	})
	// empty the board, load craft tags that contains the search key
	$('#board').empty();
	const cg = new CraftGenerator()
	relatedCrafts.forEach(function (value, index, array) {
		const msg=truncate(value.title,40)+"<br>by: "+value.author.name+"<br>Tries: "+value.totalTries+" Likes: "+value.totalLikes
		cg.makeTag(value,msg,'#board');
	});
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

function setDoms() {
	loadAllCrafts()
	setSearch()
	const Uname= document.location.search.replace(/^.*?\=/,'')
	loadUserDiv(Uname)
}
setDoms()
