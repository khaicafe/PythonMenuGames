////////////////////////////////////////////////////////////////////////////////////////////
const url = 'https://script.google.com/macros/s/AKfycbyvhJU56RfOvbePo45F6aQQrF-ECdTkUY-K-ewmeBYPq9_6o6i8tLTDpv0IzipMCvptwQ/exec'
// var ipserver = location.host;
//   link__down[0].href='#'
//   link__down[0].writeAttribute('onclick','');
  // link__down.onclick = null;
// console.log(show__user[0]);
var login = false;

//////////////// Xử lý Token //////////////////////////

axios.defaults.params = {};
// xu ly data truoc khi gui len server
axios.interceptors.request.use( async config => {              
  console.log('truoc khi request!!!')
  document.getElementById("popuploadingmain").style.visibility="visible";  
  if (config.url.indexOf('Login') >=0){
        // nhung router khong can send token
        return config;
    }
    // add them value truoc khi gui di
    const token = await axios.getLocalAccessToken();
    config.params['token'] = token;    
    return config;
  }, err => {
    return Promise.reject(err)
})
// xu ly data sau khi response
axios.interceptors.response.use( (response) =>{
  console.log('sau khi response!!!')
  const config = response.config;
  document.getElementById("popuploadingmain").style.visibility="hidden";
  if (config.url.indexOf('Login') >=0 || config.url.indexOf('refeshtoken') >=0){
      // nhung router khong can check token
      return response;
  }
  const code = response.data.status;
  if (code && code === 'The token has expired'){
      
      console.log('token hết hạn')
      const New_accessToken = response.data.token.accessToken
      console.log('lay lai Token mới', New_accessToken)
      axios.setLocalAccessToken(New_accessToken)

      return response
  }else if (code && code === 'Invalid Signature'){
    // Truong hop loi token clear token lỗi
    console.log('Token Error')
    window.localStorage.clear();
    return Promise.reject(err)
  }
  console.log('token còn hạn')
  return response;
}, err => {
  return Promise.reject(err)
})

/////////// FUNCTION ///////////////////////////////////

const btn_login = document.getElementById('_login')
if (btn_login){
  btn_login.addEventListener('click', async () =>{
      const status = await logina();
      const data = status.data
    
      const accessToken = data.token.accessToken
      // console.log(accessToken)
      console.table(data)
      if (data.status == 'create-token'){
          await axios.setLocalAccessToken(accessToken)
      }
  })
}
const btn_getlist = document.getElementById('_getlist');
if (btn_getlist){
    btn_getlist.addEventListener('click', async () =>{
        const status = await getuser();
        // console.log(status.data)
        const data = status.data
        console.table(data)
        
        })
    }
async function logina(){
  const url = 'https://script.google.com/macros/s/AKfycbyvhJU56RfOvbePo45F6aQQrF-ECdTkUY-K-ewmeBYPq9_6o6i8tLTDpv0IzipMCvptwQ/exec'
  var search_params = new URLSearchParams(); 
  // append parameters
  search_params.append('event_key', 'Login');
  search_params.append('Date-Create', 'Date_Create');
  search_params.append('ID', 464646);
  search_params.append('HoTen', 'HoTen');
  search_params.append('Birthday', 'Birthday');
  // query string
  var data = search_params.toString();
  // var data = new URLSearchParams({app: 'Dangky', ID: 464646, HoTen: 'HoTen', Birthday: 'Birthday'}).toString()
  // return await axios.get(url + '?username=jsmith&age=21')
  return await axios.get(url + '?'+data)

}
async function getuser(){
const url = 'https://script.google.com/macros/s/AKfycbyvhJU56RfOvbePo45F6aQQrF-ECdTkUY-K-ewmeBYPq9_6o6i8tLTDpv0IzipMCvptwQ/exec'
// const token = await axios.getLocalAccessToken();
var search_params = new URLSearchParams(); 
// append parameters
search_params.append('event_key', 'Get_user');
// query string
var data = search_params.toString();
// var data = new URLSearchParams({app: 'Dangky', ID: 464646, HoTen: 'HoTen', Birthday: 'Birthday'}).toString()
// return await axios.get(url + '?username=jsmith&age=21')
return await axios.get(url + '?'+data)

}



async function login_begin(ID,HoTen,Photo,Birthday,Email,Social) {
  console.log('login....');
  // var Photo = `=IMAGE("${Photo}",1)`
  // photo = await getBase64FromUrl(Photo)
  // var Photo = Photo
  var Date_Create = new Date().toLocaleString("vi-VN", {timeZone: "Asia/Ho_Chi_Minh"});
  var search_params = new URLSearchParams(); 
  // append parameters
  search_params.append('event_key', 'Login');
  search_params.append('Date_Create', Date_Create);
  search_params.append('ID', ID);
  search_params.append('HoTen', HoTen);
  search_params.append('Photo', Photo);
  search_params.append('Birthday', Birthday);
  search_params.append('Email', Email);
  search_params.append('Social', Social);
  // query string
  var query_string = search_params.toString();
  return await axios.get(url + '?'+ query_string)
}
async function refeshToken(){
  const url = 'https://script.google.com/macros/s/AKfycbyvhJU56RfOvbePo45F6aQQrF-ECdTkUY-K-ewmeBYPq9_6o6i8tLTDpv0IzipMCvptwQ/exec'
  var search_params = new URLSearchParams(); 
  // append parameters
  search_params.append('app', 'refeshToken');
  // query string
  var data = search_params.toString();
  // var data = new URLSearchParams({app: 'Dangky', ID: 464646, HoTen: 'HoTen', Birthday: 'Birthday'}).toString()
  // return await axios.get(url + '?username=jsmith&age=21')
  return await axios.get(url + '?'+data)

}

// var search_params = new URLSearchParams(); 
// // append parameters
// search_params.append('app', 'Dangky');
// search_params.append('Date-Create', 'Date_Create');
// search_params.append('ID', 464646);
// search_params.append('HoTen', 'HoTen');
// search_params.append('Birthday', 'Birthday');
// // query string
// var data = search_params.toString();
// // var data = {app: 'Dangky', ID: 464646, HoTen: 'HoTen', Birthday: 'Birthday'}
// axios.post('https://script.google.com/macros/s/AKfycbyvhJU56RfOvbePo45F6aQQrF-ECdTkUY-K-ewmeBYPq9_6o6i8tLTDpv0IzipMCvptwQ/exec',
// data
// )
// .then(function (response) {
//     console.log(response);
// });

axios.setLocalAccessToken = async (token) => {
    window.localStorage.setItem('accessToken', token)
}
axios.getLocalAccessToken = async (token) => {
    const accessToken = window.localStorage.getItem('accessToken')
    return accessToken
}
// END FUNCTION


const checktoken = async function () {
  var token = window.localStorage.getItem('accessToken');
  // document.cookie = 'cookie='+ token +' ;expires=Fri, 31 Dec 9999 12:00:00 UTC; path=/';
  //// check Token //////
  if (token){
    const status = await refeshToken();
    var data = status.data;
    console.table(data);
    document.getElementById("func").removeAttribute("onclick");
    document.getElementById("func").href='https://localhost/Dashboard.html'
    document.getElementById("func").onclick = null;

    var avata = window.localStorage.getItem('avata-user');
    var username= window.localStorage.getItem('username');
    const photo = document.getElementsByClassName("nav__img");// show photousername
    const show__user = document.getElementById("login");// show name user
    const link__down = document.getElementById("func");
    if (avata !== '' && avata !== null)
      photo[0].src=avata;
    if (username !== '' && username !== null){
      show__user.innerHTML = username;
      // link__down.href='#'
      // link__down.onclick = null;
      // document.getElementById("func").href='https://localhost/Dashboard.html'
      // document.getElementById("func").onclick = null;
      // link__down.removeAttribute("onclick");
      }

    return status
  }
  window.localStorage.clear();
}
var data = checktoken();



////////////////// Facebook login with JavaScript SDK //////////////////////
window.fbAsyncInit = function() {
  // FB JavaScript SDK configuration and setup
  FB.init({
      appId      : '2976178016014497', // FB App ID
      cookie     : true,  // enable cookies to allow the server to access the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v15.0' // use graph api version 2.8
  });
  
  FB.getLoginStatus(function(response) {
          if (response.status === 'connected') {
              // logged in
              login = true;
              console.log('FB logged in');  
              console.log('hixkhix')
          } else {
              login = false;
              console.log('Begin login FB')
              // console.log('hixkhix')
          }
          
      });
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function fbLogin() {
    // deleteAllCookies();
    FB.login(function (response) {
        getFbUserData();
    }, {scope: 'public_profile,email'});

  //   if (login===true) {
  //     if (typeof token !== 'undefined' && token!==null){
  //         // Any scope
  //         GetData('/show_user')
  //             .then(data => {
  //                 // console.log(data); // JSON data parsed by `data.json()` call
  //                 if(data['username'] === 'Could not validate credentials'){
  //                     // Get and display the user profile data
  //                     getFbUserData();
  //                 } else{
  //                     console.log('ready FB')
  //                     window.location.href="/Dashboard";
  //                 }
  //             });
  //     } else {
  //         // Get and display the user profile data
  //         getFbUserData();
  //     }
  //   } else{
  //       FB.login(function (response) {
  //           if (response.authResponse) {
  //               if (typeof token !== 'undefined' && token!==null){
  //                   // Any scope
  //                   GetData('/show_user')
  //                       .then(data => {
  //                           // console.log(data); // JSON data parsed by `data.json()` call
  //                           if(data['username'] === 'Could not validate credentials'){
  //                               // Get and display the user profile data
  //                               getFbUserData();
  //                           } else{
  //                               console.log('ready FB')
  //                               // window.location.href="/Dashboard";
  //                           }
  //                       });
  //               } else {
  //                   // Get and display the user profile data
  //                   getFbUserData();
  //               }

  //           } else {
  //               alert('User cancelled login or did not fully authorize.');
  //           }
            
    
  //   }, {scope: 'email'});
  // }
  }

// Fetch the user profile data from facebook
function getFbUserData(){
    FB.api('/me', {locale: 'en_US', fields: 'id,first_name,last_name,name,birthday,age_range,email,link,gender,locale,picture'},
    async function (response) {
        console.log('login fb');        
        let avata = response.picture.data.url;
        avata = await getBase64FromUrl(avata)
        let Social = "Facebook"   
        let ID = response.id;
        let FullName= response.name;
        let Birthday= response.birthday;
        let Email= response.email;
        let FBProfile= response.link;
        if (typeof FBProfile === 'undefined'){
          FBProfile = ''
        } // Any scope
            

        /////// set token localstore //////////
        const status = await login_begin(ID,FullName,avata,Birthday,Email,Social)
        const data = status.data
        const accessToken = data.token.accessToken
        console.table(data)
        if (data.status == 'create-token'){
          await axios.setLocalAccessToken(accessToken)
        }
        window.localStorage.setItem('avata-user', avata);
        window.localStorage.setItem('username', FullName);
        // window.localStorage.setItem('ID_KL', ID);
        
        const show__user = document.getElementById("login");// show name user
        var link__down = document.getElementById("func");
        const photo = document.getElementsByClassName("nav__img");// show photousername
        photo[0].src=avata;
        show__user.innerHTML = FullName;
        link__down.removeAttribute("onclick");
        link__down.href='https://localhost/Dashboard.html'
        link__down.onclick = null;
        
    });
}

// Logout from facebook
function fbLogout() {
    FB.logout(function() {
        console.log('logout fb');
        window.location.href="/";
    });
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
    
///////////// hàm hide debug ///////////////////////

// eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(3(){(3 a(){8{(3 b(2){7((\'\'+(2/2)).6!==1||2%5===0){(3(){}).9(\'4\')()}c{4}b(++2)})(0)}d(e){g(a,f)}})()})();',17,17,'||i|function|debugger|20|length|if|try|constructor|||else|catch||5000|setTimeout'.split('|'),0,{}))

////////////////////// Google Login ///////////////////

////////////////////// Decode base64 /////////////////////

const getBase64FromUrl = async (url) => {
	const data = await fetch(url);
	const blob = await data.blob();
	return new Promise((resolve) => {
	  const reader = new FileReader();
	  reader.readAsDataURL(blob); 
	  reader.onloadend = () => {
		const base64data = reader.result;   
		resolve(base64data);
    // return base64data;
	  }
	});
  }
  
  var teet = getBase64FromUrl('https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1598176793917341&height=50&width=50&ext=1670681008&hash=AeSAHi3TqOs-4sr2f0Yhttps://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1598176793917341&height=50&width=50&ext=1670681008&hash=AeSAHi3TqOs-4sr2f0Y')
  // .then(console.log)
 

/////////////////// hàm chưa dùng //////////////////////

async function connection (socket, timeout = 10000) {
  const isOpened = () => (socket.readyState === WebSocket.OPEN)

  if (socket.readyState !== WebSocket.CONNECTING) {
    return isOpened()
  }
  else {
    const intrasleep = 100
    const ttl = timeout / intrasleep // time to loop
    let loop = 0
    while (socket.readyState === WebSocket.CONNECTING && loop < ttl) {
      await new Promise(resolve => setTimeout(resolve, intrasleep))
      loop++
    }
    return isOpened()
  }
}


// var client_ida = Date.now()
// const wss = new WebSocket(`ws://localhost:8000/ws/${client_ida}`);
// const opened = await connection(wss)
// ws.onmessage = function(e) {
//     // Receives a message.
//     alert(e.data);
//   };
// console.log(opened)
// if (opened) {
//   websocket.send('hello')
// }
// else {
//   console.log("the socket is closed OR couldn't have the socket in time, program crashed");
// }
// // sleep time expects milliseconds
// function sleepFor(sleepDuration){
//     var now = new Date().getTime();
//     while(new Date().getTime() < now + sleepDuration){ 
//         /* Do nothing */ 
//         console.log("haiz, JavaScript sleep!");
//     }
// }

// function sleepThenAct(){
//     sleepFor(2000);
//     console.log("Hello, JavaScript sleep!");
// }


async function postData(url = '', data = {}) {
// Default options are marked with *
const response = await fetch(url, {
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, *cors, same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
    'Content-Type': 'application/json',
    "Authorization":'Bearer '+ token // Here you can add your token,
  },
  redirect: 'follow', // manual, *follow, error
  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  body: JSON.stringify(data) // body data type must match "Content-Type" header
  
})
.catch((error) => {
  alert(error)
  console.log(error)
});
if (response.status === 403) alert("Token hết hạn");
if (response.ok) {
  return response.json(); // parses JSON response into native JavaScript objects
}
// return response.json(); // parses JSON response into native JavaScript objects

}

async function GetData(url = '', data = {}) {
  // console.log('token: '+token)
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      "Authorization":'Bearer ' + token // Here you can add your token,
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // body: JSON.stringify(data) // body data type must match "Content-Type" header
    
  })
  .catch((error) => {
    alert(error)
    console.log(error)
});
  // if (response.status === 403) alert("Vui lòng đăng nhập lại");
  if (response.ok) {
    return response.json(); // parses JSON response into native JavaScript objects
  } else {
      // Dang nhap lai
    //   window.location.href="/";
  }
  
}
