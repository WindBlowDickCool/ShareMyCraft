var allUsers
var allCrafts
const log = console.log

// load the crafts in the allCrafts to the board
function getCraft(e){
	e.preventDefault();
	const craftSheet = document.getElementById("Sheet");
	$('#Sheet').empty();
	fetch("/crafts/allCrafts")
    .then((res) => { 
        if (res.status === 200) {
           return res.json() 
       } else {
            alert('Could not get crafts')
       }                
    })
    .then((json) => {  // the resolved promise with the JSON body
    	$('#board').empty();
    	allCrafts = json
		const crafttitle = document.createElement("div");
		crafttitle.innerHTML = "<b>Craft title</b>";
		const deletetitle = document.createElement("div");
		deletetitle.innerHTML = "<b>Delete craft</b>";
		const craftContainertitle = document.createElement("li");
		craftContainertitle.append(crafttitle);
		craftContainertitle.append(deletetitle);
		craftSheet.append(craftContainertitle);
    	for (var i = 0; i < allCrafts.length; i++){
    		const c = allCrafts[i];
    		// const index = i
			const craftname = document.createElement("div");
			craftname.innerHTML = "<p>" + c.title +" (id:"+c._id+")</p>";
			const deleteButton = document.createElement("div");
			deleteButton.innerHTML = "<button class='actions'>Delete</button>";
			const craftContainer = document.createElement("li");
			craftContainer.append(craftname);
			craftContainer.append(deleteButton);
			craftSheet.append(craftContainer);   
			deleteButton.addEventListener('click', e => {
				const updateURL ='/crafts/' + c._id 
		        const updateRequest = new Request(updateURL, {
					method: 'delete',
					headers: {
					'Accept': 'application/json, text/plain, */*',
					'Content-Type': 'application/json'
					}
		        })

		        fetch(updateRequest)
				.then((res) => {
					if (res.status === 200) {
					  log('Successfully updated changed state!')
					  return res.json();
					} else {
					  log('Failed')
					}
				}).then((user)=>{
					const rmItem=deleteButton.parentElement.parentElement.children[0].children[0].innerHTML
					for(var j = 0; j < allCrafts.length; j++){
						if(allCrafts[j].title == rmItem){
							allCrafts.splice(j, 1)
						}
					}
					// allUsers.splice(index, 1);
					deleteButton.parentElement.parentElement.remove();					
				})
				.catch((error) => {
				log(error)
				})
			}) 		
	    }
    }).catch((error) => {
        log(error)
    })
	 
}

// load users in the allUsers to the board
function getUser(e){
	e.preventDefault();
	console.log('setting')	
	const url='/users/'
    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
           return res.json() 
       } else {
            alert('Could not get users')
       }                
    })
    .then((json) => {  // the resolved promise with the JSON body
    	allUsers=json
    	log(allUsers)
		const userSheet = document.getElementById("Sheet");
		$('#Sheet').empty();
		const usertitle = document.createElement("div");
		usertitle.innerHTML = "<b>User Names</b>";
		const buttontitle = document.createElement("div");
		buttontitle.innerHTML = '<b>Muted</b>';
		const userContainertitle = document.createElement("li");
		userContainertitle.append(usertitle);
		userContainertitle.append(buttontitle);
		userSheet.append(userContainertitle);
		for (var i=0; i<allUsers.length; i++) {
			if(allUsers[i].username !=='admin'){

				const u = allUsers[i]
				const username = document.createElement("div");
				username.innerHTML = "<p>" + u.username + " (id:"+u._id+")</p>";
				const button = document.createElement("div");
				button.innerHTML = `<button class='actions'>${u.muted}</button>`;
				button.style.fontSize='16px;'
				const userContainer = document.createElement("li");
				userContainer.append(username);
				userContainer.append(button);
				userSheet.append(userContainer);
				button.addEventListener('click',e=>{
					const updateURL ='/users/mute/' + u._id 
					const muted= !u.muted
			        const updateRequest = new Request(updateURL, {
						method: 'put',
						headers: {
						'Accept': 'application/json, text/plain, */*',
						'Content-Type': 'application/json'
						},
						body: JSON.stringify({ 'mute': muted })
			        })

			        fetch(updateRequest)
					.then((res) => {
						if (res.status === 200) {
						  log('Successfully updated changed state!')
						  return res.json();
						} else {
						  log('Failed')
						}
					}).then((user)=>{
						u.muted=user.muted
						button.innerHTML = `<button class='actions''>${u.muted}</button>`;
					})
					.catch((error) => {
					log(error)
					})
				})
			}
		}
    }).catch((error) => {
        log(error)
    })	
	 
}
function changesetting(e){
	e.preventDefault();
	console.log('changing settings')
	const nPass = document.querySelector('#nPass').value
	const ncPass = document.querySelector('#ncPass').value
	const id = document.getElementById("#id").value;	
	if(nPass !== '' | ncPass !== ''){
		if(nPass===ncPass){
			const url = '/password/'+ id;
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
}
function changeUserPas(e){
	e.preventDefault();
	$('#board').empty();
	const container=document.getElementById("Sheet");
	container.style="width: 60%; margin:auto; margin-top: 30px;"
	const old=document.createElement('input')
	old.id="id"
	old.type="text"
	old.placeholder="User id"
	old.style="height:25px; display: inline-block; margin-left: 20%; margin-top: 30px; border-radius: 30px; width:60%;"

	const oldPass=document.createElement('input')
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
	container.appendChild(old)
		container.appendChild(oldPass)
	container.appendChild(newPass)
	container.appendChild(submit)
	$('#board').append(container)
	$('#submit').bind('click',changesetting)
	 
}
function loadUserDiv(){
    const userDiv=document.querySelector( "#userDiv")
	const signDiv=document.querySelector( "#signoutDiv" )
    fetch('/users/current')
    .then((res) => { 
        // const user = res.json()
        // log(161,user._id,user)
        if (res.status === 200) {
            return res.json()
        } else {
            alert('Error occurred. Try again!')
        }                
    }).then((user) => {

        if( user._id !== undefined){
            currentUser=user
            userDiv.innerHTML='Welcome! '+ user.username
            if(JSON.stringify(user.userType)==='user'){
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
 
    })
    .catch((error) => {
        log(error)
    })
}

// load back home button
function loadBackHome(){
    log(389)
    const backHome=document.querySelector("#backHome")
    backHome.innerHTML = 'Back to Home'
    backHome.addEventListener('click', e => {
        const name= (currentUser === undefined) ? '' : currentUser.name
        window.location.href ='/index'
    })
}

function setDoms() {
	loadUserDiv()
	loadBackHome()
	const u=document.querySelector("#uList")
	u.addEventListener('click',getUser)
	const c=document.querySelector("#cList")
	c.addEventListener('click',getCraft)
	const uc=document.querySelector("#ucList")
	uc.addEventListener('click',changeUserPas)
}
document.addEventListener('DOMContentLoaded',setDoms)
