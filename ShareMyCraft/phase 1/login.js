function login(){
	const username = document.querySelector('#name').value;
	const password = document.querySelector('#password').value;
	const msg = document.getElementsByTagName('h1');

	for(var i = 0; i < allUsers.length; i++){
		if(allUsers[i].name === username & allUsers[i].name ==="admin" & allUsers[i].password === password){
			console.log('Logging: ', username)
			window.document.location='./admin.html'
		}else if(allUsers[i].name === username & allUsers[i].password === password){
			console.log('Logging: ', username)
			window.document.location='./index.html?username='+username
  		}
	 }
	 msg[0].innerHTML ="Wrong Password or ID!"
}

document.addEventListener('DOMContentLoaded',function(){
	const b =document.querySelector('#subButton')
	b.addEventListener('click',login)
})

