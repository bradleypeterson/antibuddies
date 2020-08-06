function openNav() {
	document.getElementById('mySidenav').style.width = '450px';
}

/* Set the width of the side navigation to 0 */
function closeNav() {
	document.getElementById('mySidenav').style.width = '0';
}

function logout() {
	localStorage.removeItem('token-time');
	window.location.href = "login.html";
}
