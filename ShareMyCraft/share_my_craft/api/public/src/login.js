const log = console.log
function login(){
	const username = document.querySelector('#name').value;
	const password = document.querySelector('#password').value;
	const msg = document.getElementsByTagName('h1')[0];


	const url = '/users/login';

    // The data we are going to send in our request
    let data = {
        username: username,
        password: password
    }
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'post', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });

    // Send the request with fetch()
    fetch(request)
    .then(function(res) {
        log(res) 
        // Handle response we get from the API.
        // Usually check the error codes to see what happened.
        if (res.status === 200) {
        	return res.json();
        } else {
           msg.innerHTML ="Wrong Password or ID!"
     
        }
         // log the result in the console for development purposes,
                          //  users are not expected to see this.
    }).then((user) =>{
		if(user.userType==='admin'){
			// window.location.href='/admin'
		}else{
			window.location.href = '/index'
		}
    })
    .catch((error) => {
        log(error)
    })
}

document.addEventListener('DOMContentLoaded',function(){
	const b =document.querySelector('#subButton')
	b.addEventListener('click',login)
})

