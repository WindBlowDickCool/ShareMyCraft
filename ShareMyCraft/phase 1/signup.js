function signup(){
	const username = document.querySelector('#newUsername').value;
	const password =document.querySelector('#newPassword').value;
	const confirm = document.querySelector('#confirmPassword').value;
	const p = document.getElementsByClassName('red');

	if(username.length ===0){
		p[0].innerHTML = "Username can't be empty";
		return;
	}
	for (index = 0; index < allUsers.length; index++) {
		if(username ===allUsers[index].name){
			p[0].innerHTML = "This User already exists!";
			return;
		}
	}
	if(password.length ===0 & username.length !==0){
		p[0].innerHTML = "Password Can't be Empty!";
		return;
	}
	if(confirm !==password){
		console.log("password and confirm Password not match");
		
		p[0].innerHTML = "Confirm Password does not match with the password";

	}else{
		console.log('Signing up: ', username)
		addCommonUser(username,password);
		p[0].innerHTML ="Sign up success";
		window.document.location='./index.html?username='+username
		alert("New user signed up Successfully!");
	}

}
document.addEventListener('DOMContentLoaded',function(){
	const b =document.querySelector('#subButton')
	b.addEventListener('click',signup)
})