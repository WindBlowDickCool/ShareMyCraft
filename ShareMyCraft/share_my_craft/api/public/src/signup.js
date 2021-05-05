const log = console.log
function signup(){
	const username = document.querySelector('#newUsername').value;
	const password =document.querySelector('#newPassword').value;
	const confirm = document.querySelector('#confirmPassword').value;
	const p = document.getElementsByClassName('red');

	if(username.length ===0){
		p[0].innerHTML = "Username can't be empty";
		return;
	}
	if(password.length ===0 & username.length !==0){
		p[0].innerHTML = "Password Can't be Empty!";
		return;
	}
	if(confirm !==password){
		console.log("password and confirm Password not match");
		
		p[0].innerHTML = "Confirm Password does not match with the password";

	}else{
		const url = '/users/'
	    const data = {
	      username: username,
	      password: password,
	      userType: 'user'
	    }

	    const request = new Request(url, {
	      method: 'post',
	      body: JSON.stringify(data),
	      headers: {
	        'Accept': 'application/json, text/plain, */*',
	        'Content-Type': 'application/json'
	      },
	    })

	    fetch(request)
	    .then((res) => {
	      if (res.status === 200) {
	        log('Successfully signed up!')
	        window.location.href = '/index'
	        // return res.json()
	      } else {
	        p[0].innerHTML ='Error occurred. Try again later!'
	      }
	    })
	    .catch((error) => {
	      log(error)
	    })
	}

}
document.addEventListener('DOMContentLoaded',function(){
	const b =document.querySelector('#subButton')
	b.addEventListener('click',signup)
})
