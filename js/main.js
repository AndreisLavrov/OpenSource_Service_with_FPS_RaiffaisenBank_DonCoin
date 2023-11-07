
/* Nav Icon */ 

const navBtn = document.querySelector('.nav_toggle');
const nav = document.querySelector('.nav');
const menuIcon = document.querySelector('.menu-icon');

navBtn.onclick = function () {
	nav.classList.toggle('nav--mobile')
	menuIcon.classList.toggle('menu-icon--active');
	document.body.classList.toggle('no-scroll');
};

/* Copy code of widget new button */

function CopyToClipboard(containerid) {
	console.log(document.selection)
	console.log(window.getSelection)
	
  if (document.selection) { 
	  var range = document.body.createTextRange();
	  range.moveToElementText(document.getElementById(containerid));
	  range.select().createTextRange();
	  document.execCommand("copy"); 
  
  } else if (window.getSelection) {
	  var range = document.createRange();
	   range.selectNode(document.getElementById(containerid));
	   window.getSelection().addRange(range);
	   document.execCommand("copy");
	   alert("Code copied") 
  }}

  /* Pop Up */ 

  document.querySelector("#show-login").addEventListener("click",function(){
	document.querySelector(".popup").classList.add("active");
  });
  document.querySelector(".popup .close-btn").addEventListener("click",function(){
	document.querySelector(".popup").classList.remove("active");
  });