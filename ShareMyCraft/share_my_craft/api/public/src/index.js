const allCrafts=[];
const log = console.log
// Set the search button
function setSearch() {
	const btn=document.querySelector('#searchbtn');
	btn.addEventListener('click', searchCraft);
	const bar = document.querySelector('#searchbar');
	bar.addEventListener("keyup", function(event) {
    if (event.key === "Enter"|event.keyCode === 13) {
        searchCraft(event);
	    }
	});
}

// load all crafts to the home page
function loadAllCrafts(){
	
	fetch("/crafts/allCrafts")
    .then((res) => { 
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
           return res.json() 
       } else {
            alert('Could not get crafts')
       }                
    })
    .then((json) => {  // the resolved promise with the JSON body
    	$('#board').empty();
    	json.forEach(function (value, index, array) {
    		allCrafts.push(value);
    		makeTag(value)
	        // 
    	})
    }).catch((error) => {
        log(error)
    })
}

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
// If the title/name of the tag is too long truncate it
function truncate(str, n){
  return (str.length > n) ? str.substr(0, n-1) + '...' : str;
};
// search for a craft using the search bar
function searchCraft(e) {
	e.preventDefault();
	const searchItem = document.querySelector('#searchbar').value;
	console.log('Searching: '+searchItem)
	relatedCrafts=[]
	allCrafts.forEach(function (value, index, array){
		if( value.title.includes(searchItem) | value.authorname.includes(searchItem)) {
			relatedCrafts.push(value)
		
		}
	})
	// empty the board, load craft tags that contains the search key
	$('#board').empty();
	// const cg = new CraftGenerator()
	relatedCrafts.forEach(function (value, index, array) {
		makeTag(value)
	});
}

// load the login button on the top right corner
function loadUserDiv(){
	const userDiv=document.querySelector( "#userDiv")
	const signDiv=document.querySelector( "#signoutDiv" )
	fetch('/users/current')
    .then((res) => { 
        if (res.status === 200) {
        	return res.json()
        } else {
        	alert('Error occurred. Try again!')
        }                
    }).then((user) => {

    	if( user._id !== undefined){
    		userDiv.innerHTML='Welcome! '+ user.username
    		if(user.userType==='user'){
	        	userDiv.addEventListener('click', function(){
		        	const url = '/personal/'+user._id;
		        	window.location.href = url
		        })    			
    		}else{
	        	userDiv.addEventListener('click', function(){
		        	const url = '/admin/'
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
    	}
 
    })
    .catch((error) => {
        log(error)
    })
}
function loadBackHome(){
    const backHome=document.querySelector("#backHome")
    backHome.innerHTML = 'Back to Home'
    backHome.addEventListener('click', e => {
        const name= (currentUser === undefined) ? '' : currentUser.name
        window.location.href ='/index'
    })
}
function setDoms() {
	loadAllCrafts()
	setSearch()
	loadUserDiv()
	loadBackHome()
}
setDoms()
