/* LOGIN */

let users = [];

const addUser = (ev)=>{
	ev.preventDefault();  //to stop the form submitting
	let user = {
		id: Date.now(),
		email: document.getElementById('email').value,
		password: document.getElementById('password').value
	}
	users.push(user);
	document.forms[0].reset(); // to clear the form for the next entries
	//document.querySelector('form').reset();

	//saving to localStorage
	localStorage.setItem('MyUsers', JSON.stringify(users) );
}
document.addEventListener('DOMContentLoaded', ()=>{
	document.getElementById('btn-log').addEventListener('click', addUser);
});

/* ========================================== */

