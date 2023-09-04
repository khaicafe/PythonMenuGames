/*===== EXPANDER MENU  =====*/ 
const showMenu = (toggleId, navbarId, bodyId, containmenuId, bannerId)=>{
  const toggle = document.getElementById(toggleId),
  navbar = document.getElementById(navbarId),
  bodypadding = document.getElementById(bodyId)
  contai = document.getElementById(containmenuId)
  banner = document.getElementById(bannerId)
  if(toggle && navbar){
    toggle.addEventListener('click', ()=>{
      navbar.classList.toggle('expander')
	  contai.classList.toggle('body-pd')
	  banner.classList.toggle('body-pd')
      //bodypadding.classList.toggle('body-pd')
	  document.getElementById('slider').classList.toggle('silderoff')

    document.getElementsByClassName('hinh-kl1')[0].classList.toggle('silderoff')
    document.getElementsByClassName('version')[0].classList.toggle('silderoff')
    document.getElementsByClassName('nav__logo')[0].classList.toggle('silderoff')


	  const densang = document.querySelectorAll("[id^='densang']")
	  densang.forEach(l=> l.classList.toggle('densangoff'))
	  //document.getElementById('densang').classList.toggle('densangoff')
	  document.getElementById('searchtext').classList.toggle('searchoff')
	  //document.getElementById('searchtext').style.visibility = "hidden";
    })
  }
}
showMenu('nav-toggle','navbar','body-pd', 'containmenu', 'banner')

/*===== LINK ACTIVE  =====*/ 
const linkColor = document.querySelectorAll('.nav__link')
function colorLink(){
  linkColor.forEach(l=> l.classList.remove('active'))
  this.classList.add('active')
}
linkColor.forEach(l=> l.addEventListener('click', colorLink))


/*================= COLLAPSE MENU  ===============*/ 
const linkCollapse = document.getElementsByClassName('collapse__link')
var i
for(i=0;i<linkCollapse.length;i++){
  linkCollapse[i].addEventListener('click', function(){
    const collapseMenu = this.nextElementSibling
    collapseMenu.classList.toggle('showCollapse')
	
    const rotate = collapseMenu.previousElementSibling
    rotate.classList.toggle('rotate')
  })
}
console.log('test')

const nav_link = document.getElementsByClassName('nav__link')
var i
for(i=0;i<nav_link.length;i++){
  nav_link[i].addEventListener('click', function(){
    try{
      const collapseMenu = this.childNodes[1].nextElementSibling.nextElementSibling.nextElementSibling
      collapseMenu.classList.toggle('showCollapse')

      const rotate = collapseMenu.previousElementSibling
      rotate.classList.toggle('rotate')
    }catch{}
    
	
    
  })
}

/*================ hàm MENU  ===================*/ 

// add hovered
    
const list = document.querySelectorAll(".list");
console.log(list.length);
function activeLink(){
	list.forEach((item) =>
	item.classList.remove("active"));
	this.classList.add("active");
}
list.forEach((item) =>
item.addEventListener("click",activeLink));
	
/*================ Get Name PC	==================*/
function getvals(){
    return fetch("/data", {
    method: "POST",
    body: JSON.stringify({
                            ID: "1",
                            call: "SendNamePC"}),
    headers: {"Content-type": "application/json; charset=UTF-8"},})
    .then((response) => response.json())
    .then((responseData) => {
    console.log(responseData);
    
    //Thay text element cách 1
    //const main = document.getElementById("test");
    //main.innerHTML = responseData;
    
    //Thay text element cách 2
    var element = document.getElementById('test');
    while (element.firstChild) {
    element.removeChild(element.firstChild);
    }
    element.appendChild(document.createTextNode(responseData));
    return responseData;
    })
    .catch(error => console.warn(error));
  }
 
 
var url = window.location.href;  
// console.log(url);  
getvals().then(response => console.log(response));

/*================= get gameonline offline ============*/
function sumitt(id){
    return fetch("/data", {
    method: "POST",
    body: JSON.stringify({
                            ID: id,
                            call: "SendName"}),
    headers: {"Content-type": "application/json; charset=UTF-8"},})
    .then((response) => response.json())
    .then((responseData) => {
    //console.log(responseData);
    //Thay text element cách 1
    const main = document.getElementById('noidung');
	main.innerHTML = "";
    main.innerHTML = responseData;
    //Thay text element cách 2
   
}).catch(error => console.warn(error));}
sumitt('gameonline').then(response => console.log(response));


/*================== event Listen sumit element ==============*/

document.getElementById('searchgame').addEventListener('submit', function(evt){
   evt.preventDefault();
    //document.getElementById('searchgame') = '';
	const searchgame=document.getElementById('searchgame')
	const searchtext=document.getElementById('searchtext')
    //console.log('oki');
	fetch("/1", {
        method: "POST",
        body: new FormData(searchgame),
      })
	  .then((response) => response.text())
	  .then((responseData) => {
		//console.log(responseData);
		//Thay text element cách 1
		const main = document.getElementById('noidung');
		main.innerHTML = "";
		main.innerHTML = responseData;
		searchtext.value = "";
		//console.log(responseData);
		})
		.catch(error => console.warn(error));})


/*====================== fuction call ===============*/
function call(str){
	console.log(str);
	
}
      

/*=================== Changeline Popup ================*/
let popup = document.getElementById("popup");
var $ = function (id)
  {
      return document.getElementById(id);
  }
  
function openPopup(id, gateway, dns1, dns2){{
	let checkboxid = document.querySelectorAll(".checkbox");
	console.log('changegateway',gateway,dns1,dns2)
	
	checkboxid.forEach((item) =>
	item.checked = false);
	
	$(id,'','','').checked = true;
	$(id,'','','').checked = 'checked';
	
	popup.classList.add("open-popup");
	document.getElementById("navbar").style.pointerEvents = "none";
	document.getElementById("cardinternet").style.pointerEvents = "none";
}}
function closePopup(){{
	popup.classList.remove("open-popup");
	document.getElementById("cardinternet").style.pointerEvents = "All";
	document.getElementById("navbar").style.pointerEvents = "All";
}}


/*============== Get gateway pc ==============*/
var findIP = new Promise(r=>{var w=window,a=new (w.RTCPeerConnection||w.mozRTCPeerConnection||w.webkitRTCPeerConnection)({iceServers:[]}),b=()=>{};a.createDataChannel("");a.createOffer(c=>a.setLocalDescription(c,b,b),b);a.onicecandidate=c=>{try{c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r)}catch(e){}}})
/*Usage example*/
findIP.then(ip => 
console.log(ip))
	.catch(e => console.error(e))

//})
//const box = document.getElementById("box");


//const searchgame=document.getElementById('searchgame')
//searchgame.onsubmit = async (e) => {
//      e.preventDefault();
//      let res = await fetch("http://192.168.1.220:8100/1", {
 //       method: "POST",
 //       body: new FormData(searchgame),
//      });

//      if (res.ok) {
//        let result = await res.text();
//		const main = document.getElementById('noidung');
//        main.innerHTML = "";
//		main.innerHTML = result;
//		console.log('oki');
//      } else {
//		const main = document.getElementById('noidung');
//        main.innerHTML = `<h style="color: white;"> Response error: ${res.status}</h>`;
//      };
//    };*/


/*============== message system ========================
alert("This is an alert message box.");  // display string message

alert('This is a numer: ' + 100); // display result of a concatenation

alert(100); // display number

alert(Date()); // display current date


var userPreference;

if (confirm("Do you want to save changes?") == true) {
    userPreference = "Data saved successfully!";
} else {
    userPreference = "Save Cancelled!";
}

var tenure = prompt("Please enter preferred tenure in years", "15");
    
if (tenure != null) {
    alert("You have entered " + tenure + " years" );
}

//if (url.indexOf('?') > -1){
//   url += '&param=1'
//}else{
//   url += '?param=1'
//}
//const user = "Eric"
//const userId = 1
//const product = "bananadddd"
//const domain = "something"
//const isPassed = false
//window.location.search = `${user}?
//myuserid=${userId}&product=${product}&domain=${domain}&isPassed=${isPassed}`
console.log('oki');*/


/*//var formid = document.createElement('form');
//createform("2")//tạo form
//document.querySelector("form").addEventListener("submit", function(e){
//    if(!isValid){
//        e.preventDefault();    //stop form from submitting
 //   }
//});*/

 /*=========================== hàm test  ======================================*/ 
 function createform(id){
    var formid = document.createElement('form');
    //myForm.setAttribute('action', url);
    formid.setAttribute('method', 'post');
    formid.setAttribute('hidden', 'true');
    var myInput = document.createElement('input');
    myInput.setAttribute('type', 'text');
    myInput.setAttribute('name', 'num');
    myInput.setAttribute('value', id);
    formid.appendChild(myInput);
    document.body.appendChild(formid);
	formid.submit();
};

function sumitta(id)//hàm gọi gameonline
{
	createform(id)//tạo form
}
/*==================== ham test may in ==========================*/
//window.print();
//console.log("printed");

