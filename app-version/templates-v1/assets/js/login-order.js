var Date_Create = new Date().toLocaleString("vi-VN", {timeZone: "Asia/Ho_Chi_Minh"});
var username = document.getElementById("username")
var password = document.getElementById("password")
 // icon chay ngang
 const root = document.documentElement;
 const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");
 const marqueeContent = document.querySelector("ul.marquee-content");
 root.style.setProperty("--marquee-elements", marqueeContent.children.length);
 for(let i=0; i<marqueeElementsDisplayed; i++) {
 marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
 }
//////////////// Xử lý Token //////////////////////////
const instance = axios.create({
  baseURL: 'http://127.0.0.1:8100'
})
// axios.defaults.params = {};
// xu ly data truoc khi gui len server
instance.interceptors.request.use( async config => {              
  console.log('truoc khi request!!!')
//   if (config.url.indexOf('SendChart') < 0 && config.url.indexOf('chatbox') < 0 && config.url.indexOf('Getlogo') < 0){
// 	// nhung router khong can show loading
// 	document.getElementById("popuploadingmain").style.visibility="visible";  
// 	}
// //   document.getElementById("popuploadingmain").style.visibility="visible";  
//   if (config.url.indexOf('Login') >=0){
//         // nhung router khong can send token
//         return config;
//     }
//     // add them value truoc khi gui di
//     const token = await axios.getLocalAccessToken();
//     config.params['token'] = token;    
    return config;
  }, err => {

    return Promise.reject(err)
})

// xu ly data sau khi response
instance.interceptors.response.use( (response) =>{
  console.log('sau khi response!!!')
  
  // const config = response.config;
//   document.getElementById("popuploadingmain").style.visibility="hidden";
  // if (config.url.indexOf('Login') >=0 || config.url.indexOf('refeshtoken') >=0){
  //     // nhung router khong can check token
  //     return response;
  // }
  // const code = response.data.status;
  // console.log("after Res",response.status)

  // console.log(response.data);
  // console.log(response.status);
  // console.log(response.statusText);
  // console.log(response.headers);
  // console.log(response.config);

  notifi('Login success', 'success')
  
  
//   if (code && code === 'The token has expired'){
      
//       console.log('token hết hạn')
//       const New_accessToken = response.data.token.accessToken
//     //   console.log('lay lai Token mới', New_accessToken)
//       axios.setLocalAccessToken(New_accessToken)

//       return response
//   }else if (code && code === 'Invalid Signature'){
//     // Truong hop loi token clear token lỗi
//     console.log('Token Error')
//     // window.localStorage.clear();
//     return Promise.reject(code)
//   }
//   console.log('token còn hạn')
  return response;
}, err => {
  console.log('sau khi response lỗi error!!!', err.response.status, err.response.data)
  
  notifi('Login Fail', 'danger')
  username.value = '';
  password.value = '';

  localStorage.clear()
  return Promise.reject(err)
  // return err;
})




////////////////////////// FUNCTION axios///////////////////////////////////

axios.setLocalAccessToken = async (token) => {
    window.localStorage.setItem('accessToken', token)
	}
// axios.getLocalAccessToken = async (token) => {
//     const accessToken = 
//     return accessToken
// 	}

async function refeshToken(){
	var search_params = new URLSearchParams(); 
	// append parameters
	search_params.append('app', 'refeshToken');
	// query string
	var data = search_params.toString();
	// var data = new URLSearchParams({app: 'Dangky', ID: 464646, HoTen: 'HoTen', Birthday: 'Birthday'}).toString()
	// return await axios.get(url + '?username=jsmith&age=21')
	document.getElementById("popuploadingmain").style.visibility="hidden";
	return await axios.get(url + '?'+data)
  
  	}



function deleteAllCookies(){
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++)
    deleteCookie(cookies[i].split("=")[0]);
}

function setCookie(name, value, expirydays) {
  var d = new Date();
  d.setTime(d.getTime() + (expirydays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = name + "=" + value + "; " + expires;
}

function deleteCookie(name){
 setCookie(name,"",-1);
}




function getCookie(name){
  var pattern = RegExp(name + "=.[^;]*")
  var matched = document.cookie.match(pattern)
  if(matched){
      var cookie = matched[0].split('=')
      return cookie[1]
  }
  return false
}

var cookie = getCookie('refresh_token_cookie')
if (cookie){
  console.log(cookie);
  var data_temp = new Promise((resolve) => {
    const res = instance.post('/refresh');
    resolve(res.data);
    });
    console.log(data_temp)
}
// localStorage.setItem('namelogin', 'test')
const btn_login = document.getElementById('_login')
const btn_test = document.getElementById('test_btn')
if (btn_login){
  btn_login.addEventListener('click', async () =>{
    localStorage.setItem('namelogin', username.value)
    const res = await instance.post('/login', {username: username.value, password: password.value});
    console.log(res)
    if (res){
      localStorage.setItem('namelogin', username.value)
      localStorage.setItem('photo', res.data[0].photo)
      window.location.href = 'http://127.0.0.1:8100/manager-order'
    }
  })
}





   
  /*--------------------------------------
       Notifications & Dialogs
   ---------------------------------------*/
  /*
   * Notifications
   */
function notify(message, from, align, icon, type, animIn, animOut){
    $.growl({
        icon: icon,
        title: ' [Hệ Thống] ',
        message: message,
        url: ''
    },{
        element: 'body',
        type: type,
        allow_dismiss: true,
        placement: {
            from: from,
            align: align
        },
        offset: {
            x: 30,
            y: 30
        },
        spacing: 10,
        z_index: 999999,
        delay: 3500,
        timer: 1000,
        url_target: '_blank',
        mouse_over: false,
        animate: {
            enter: animIn,
            exit: animOut
        },
        icon_type: 'class',
        template: '<div data-growl="container" class="alert" role="alert">' +
        '<button type="button" class="close" data-growl="dismiss">' +
        '<span aria-hidden="true">&times;</span>' +
        '<span class="sr-only">Close</span>' +
        '</button>' +
        '<span data-growl="icon"></span>' +
        '<span data-growl="title"></span>' +
        '<span data-growl="message"></span>' +
        '<a href="#" data-growl="url"></a>' +
        '</div>'
    });
};
// --------------- notification -----------------------//
function notifi(message, type){
  var nMessage = message
  var nFrom = 'top';
  var nAlign = 'center';
  var nIcons = $(this).attr('data-icon');
  var nType = type;
  var nAnimIn = $(this).attr('data-animation-in');
  var nAnimOut = $(this).attr('data-animation-out');
  console.log(nFrom, nAlign, nIcons, nType, nAnimIn, nAnimOut);
  notify(nMessage, nFrom, nAlign, nIcons, nType, nAnimIn, nAnimOut);
}


/*---------------------------- xử lý expired token ------------------------- */
// Easy Frontend
// Học FE đơn giản, dễ hiểu và đặc biệt phải vui ❤️
// JS NÂNG CAO - Xử lý expired token trong Javascript như thế nào?


// ❓ Chuyện gì xảy ra nếu giữa chừng token bị expired?
// Ví dụ: 3 api requests đồng thời với nhau

// TRƯỜNG HỢP 1: Token chưa expired, vẫn còn tốt chán 🤣
// --request 1-->
// --request 2-->
// --request 3-->


// TRƯỜNG HỢP 2: Token bị expired, sóng gió kéo tới 🥴
// --request 1--> refresh token 1 --> failed
// --request 2--> refresh token 2 --> failed
// --request 3--> refresh token 3 --> success





// GIẢI PHÁP
// --request 1--> (phát hiện token expired)
//               --request 2--> (những requests đến sau phải đợi token trả về)
//               --request 3--> (dù có bao nhiêu requests thì vẫn phải đợi)







// Cái này giả bộ 
// Thực tế bạn phải kiểm tra thông tin từ token 
// để biết là token có bị expired hay chưa
// còn ở đây làm video nên mình gán luôn giá trị cho lẹ

// const isTokenExpired = true;
// let token = 'Current token'; // thường lưu trong local storage

// const refreshToken = (url) => {
//   console.log('Refresh token url: ', url);
//   return new Promise(resolve => {
//     setTimeout(() => {
//       console.log('\n');
//       resolve('Yes, this is a new token 😎');
//     }, 3000);
//   });
// };

// // closure: to save the refreshTokenRequest
// let refreshTokenRequest = null;
// const requestApi = async (url) => {
//   if (isTokenExpired) {
//     console.log('requestApi: Ooops ... token expired: ', url, token);

//     refreshTokenRequest = refreshTokenRequest
//       ? refreshTokenRequest
//       : refreshToken(url);
//     // 1 --> null --> refreshToken
//     // 2 --> refreshToken --> refreshToken
//     // 3 --> refreshToken --> refreshToken

//     const newToken = await refreshTokenRequest;
//     // reset token request for the next expiration
//     refreshTokenRequest = null;

//     token = newToken; // thường update token trong localStorage
//     console.log('requestApi: Fetch data with new token: ', url, token);
//     return;
//   }

//   console.log('Fetch data: ', url, token);
// };

// // ---------------
// // MAIN LOGIC
// // ---------------
// const main = () => {
//   // ví dụ 3 requests này đến từ 3 nơi khác nhau trong app của bạn
//   // bạn không thể biết cái nào chạy trước, chạy sau 
//   // và cũng không thể biết cái nào nên đợi cái nào
//   requestApi('/me');
//   requestApi('/shops');
//   requestApi('/products');
// };
// main();

// 📝 Nhớ nè 
// - Áp dụng closure để xử lý bất đồng bộ.
// - Token phải được lưu dưới localStorage để đảm bảo sync token giữa các tabs.
// - Trong video này, mình dùng NodeJS để chạy JS, chứ hk phải browser.
// - Chắc chắn bạn sẽ gặp vấn đề này nếu bạn có xử lý expired token.

// });
