'use strict'


// ======================= event table page ========================//
	// var document_on_ready = new Array();

	// function on_ready(){
	//    for(i=0;i<document_on_ready.length;i++){
	//       document_on_ready[i].call();
	//    }
	// }
	// $(function(){
	//    on_ready();
	// });

	// var counter = 0;
	// document_on_ready.push(function(){
	//    counter++;
	//    console.log('step1: ' + counter);
	// });

	// document_on_ready.push(function(){
	//    counter++;
	//    console.log('step2: ' + counter);
	// });

	// window.setTimeout(on_ready,1000);

// ===================== func change font element ====================//

//////////////// Xử lý Token //////////////////////////
// "use strict";
/*----------------------------- load jquery -------------------- */
// var script = document.createElement("script");
// script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js'
// script.type = 'text/javascript';
// document.head.appendChild(script);
// jQuery(script).load(function () {
// console.log('page is loaded', script);

// setTimeout(function () {
// 	console.log('page is loaded and 1 minute has passed');   
// }, 60000);

// });

	let element = [
		// "http://127.0.0.1:8100/assets/scrolldate/jquery-1.12.4.js",
		// 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js',
		
		// 'http://127.0.0.1:8100/assets/scrolldate/mobiscroll_date.js',
		// 'http://127.0.0.1:8100/assets/scrolldate/mobiscroll.js',
		// 'http://127.0.0.1:8100/assets/scrolldate/mobiscroll.javascript.min.js',
		"https://code.highcharts.com/stock/highstock.js"
	]


	// for (var src = 0; src < element.length; src++) {

	// element.forEach(function(element, index){
	// 	// (function() {
	// 		// Load the script 
	// 		// var script;
	// 		function scripts(){
	// 			const script = document.createElement("script");
	// 			script.src = element//[src];
	// 			script.type = 'text/javascript';
	// 			script.async = false //quan trong ah nha
	// 			// if (element == 'http://127.0.0.1:8100/assets/scrolldate/mobiscroll_date.js')
	// 			// 	script.charset = "gb2312";
	// 			document.head.appendChild(script);
	// 			console.log('page is chua load', script);
	// 		}
			

			// document.readyState == "complete" ? scripts() : window.addEventListener("DOMContentLoaded", scripts);
			// document.addEventListener('readystatechange', event => { 
			// 	console.log(event.target.readyState)
			// 	// When HTML/DOM elements are ready:
			// 	if (event.target.readyState === "interactive") {   //does same as:  ..addEventListener("DOMContentLoaded"..
				
			// 	}
			
			// 	// When window loaded ( external resources are loaded too- `css`,`src`, etc...) 
			// 	if (event.target.readyState === "complete") {
			// 		// alert("hi 2");
			// 		// console.log(event.target.readyState)
					
			// 	}
			// });


		


	// });




// Immediately-invoked function expression 127.0.0.1:8100/manager-order
// (function() {
// 	// Load the script
// 	const script = document.createElement("script");
// 	script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js';
// 	script.type = 'text/javascript';
// 	script.addEventListener('load', () => {
// 		console.log(`jQuery ${$.fn.jquery} has been loaded successfully!`);
// 	// use jQuery below
// 	});
// 	document.head.appendChild(script);
// })();

  /*------------------------------- axios ------------------------------ */
  let refreshTokenRequest = null;
  var config_data = null
  var isTokenExpired = true
const instance = axios.create({
	baseURL: 'http://127.0.0.1:8100/'
  })
  axios.defaults.params = {};
//   xu ly data truoc khi gui len server
  instance.interceptors.request.use(config => {              
	// console.log('truoc khi request!!!')
	config_data = config.data
	// configs = config
	// console.log('request',config.data, typeof(config.data))

	//*------ show loading proccess ------- */
	let loader = document.querySelector('.theme-loader')
	if(!loader){
		let html= `<div class="theme-loader">
				<div class="ball-scale">
					<div class='contain'>
						<div class="ring">
							<div class="frame"></div>
						</div>
						<div class="ring">
							<div class="frame"></div>
						</div>
						<div class="ring">

							<div class="frame"></div>
						</div>
						<div class="ring">
							<div class="frame"></div>
						</div>
						<div class="ring">
							<div class="frame"></div>
						</div>
						<div class="ring">
							<div class="frame"></div>
						</div>
						<div class="ring">
							<div class="frame"></div>
						</div>
						<div class="ring">
							<div class="frame"></div>
						</div>
						<div class="ring">
							<div class="frame"></div>
						</div>
						<div class="ring">
							<div class="frame"></div>
						</div>
					</div>
				</div>
			</div>`
		document.querySelector('body').insertAdjacentHTML("afterbegin",html)
	}

	return config;
	}, err => {
		//console.log('sau khi request lỗi error!!!', err)
	  	return Promise.reject(err)
  })
  
  // xu ly data sau khi response
  instance.interceptors.response.use( (response) =>{
	// console.log('sau khi response!!!')
    //console.log('token còn hạn', response.status)
	isTokenExpired = true

	//*--------- off loading proccess --------- */
	sleep(100).then(() => {
		$('.theme-loader').fadeOut('slow', function() {
			$(this).remove();
		});
	});

	return response;
  }, async err => {
  	const originalRequest = err.config;
	originalRequest.data = config_data
	//console.log(err.response.status, originalRequest.data)
	if (err.response.status==422){
		
		// return new Promise(async (resolve) => {
		// 	await instance.post('/refresh');
		// 	let csrf_token = getCookie("refresh_token_cookie")
		// 	ws.close();
		// 	ws = new WebSocket(`ws://127.0.0.1:8100/ws?token=${csrf_token}`)
		// 	console.log('token hết hạn');
		// 	resolve(axios(originalRequest))
		// });

		// const token = await instance.post('/refresh');
		// return axios(originalRequest);
		  
		// console.log('requestApi: Ooops ... token expired: ');
		refreshTokenRequest = refreshTokenRequest
		? refreshTokenRequest
		: await instance.post('/refresh');
		// 1 --> null --> refreshToken
		// 2 --> refreshToken --> refreshToken
		// 3 --> refreshToken --> refreshToken

		const newToken = await refreshTokenRequest;
		// reset token request for the next expiration
		refreshTokenRequest = null;

		// let csrf_token = getCookie("refresh_token_cookie")
		// ws.close();
		// ws = new WebSocket(`ws://127.0.0.1:8100/ws?token=${csrf_token}`)

		// token = newToken; // thường update token trong localStorage
		// console.log('requestApi: Fetch data with new token: ', err.config.data);
		return await axios(originalRequest)
		
	}
	localStorage.clear()
	window.location.href = 'http://127.0.0.1:8100/login-order'
	return Promise.reject(err)
  
	
  })
	
/*////////////////////////////////////// func test server side event same websocket ///////////////////////*/
window.addEventListener('load', function () {
	const events = new EventSource("http://127.0.0.1:8100/KLMenu/stream");
	events.addEventListener("new_message", async function (event) {
			// Logic to handle status updates
			// console.log(eval(event.data)[0].total)
			// audio.muted = false; 
			// audio.play();
			// const music = document.getElementById("music");
			// music.play()
			
			console.log('nhận new mess')
			// var audio = new Audio('http://127.0.0.1:8100/assets/js/alert-order.ogg');
			// await audio.play()
	});
  })

/*================================= func websocket =========================== */

const getCookie = (name) => {
	const value = `; ${document.cookie}`;
	// console.log(document.cookie)
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}
// let csrf_token = getCookie("access_token_cookie")
// console.log(csrf_token)
// Usage!
sleep(3000).then(() => {
    // Do something after the sleep!
	// websocketfun()
	// console.log(value)
});

// const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ","&"))
// console.log(cookieObj)
// cookieObj.get("refresh_token_cookie")
// console.log(cookieObj)
// // refresh_token_cookie
// // access_token_cookie

// let cook = Cookies.get('refresh_token_cookie'); // => 'value'
// console.log(cook)

let csrf_token = getCookie("refresh_token_cookie")
// let ws = new WebSocket(`ws://127.0.0.1:8100/ws?token=${csrf_token}`)
//  ws.onmessage = (event) => {
// 	let dict_data = JSON.parse(event.data)
// 	dict_data = eval(dict_data);
// 	console.log(typeof(dict_data), dict_data)

// 	// if (dict_data.action === 'Order'){
// 	// 	return new Promise(async (resolve) => {
// 	// 		// await render_table ()
// 	// 		var audio = new Audio('http://127.0.0.1:8100/assets/js/alert-order.ogg');
// 	// 		await audio.play()
// 	// 		resolve(console.log('xong socket'))
// 	// 	});
// 	// }else{
// 	// 	// console.log('Search btn', dict_data)
// 	// 	// search_text_table(dict_data)
// 	// 	return;
// 	// }
// }
/*-------------------------------- func create Ca ------------------- */
async function create_ca(){
	var user_login = localStorage.getItem("namelogin"); // get name user login
	var date = new Date().toLocaleString("vi-VN", {timeZone: "Asia/Ho_Chi_Minh"})
	var temp = {
		date_begin: date,
		name: user_login,
	}
	const res = await instance.post('/create_ca', temp);
	let id_ca = res.data.id_ca
	localStorage.setItem('id_ca', id_ca)
}

function changeFont(element){
    element.style.fontSize="13px";
    for(var i=0; i < element.children.length; i++){
        changeFont(element.children[i]);
    }
}
/*-------- func viet hoa chu cái dau ---------- */
function titleCase(str) {
	console.log(str)
	var convertToArray = str.toLowerCase().split(' ');
	var result = convertToArray.map(function(val) {
	  return val.replace(val.charAt(0), val.charAt(0).toUpperCase());
	});
	
	return result.join(' ');
  }
/*-------------------- func replac all ---------------- */
if (typeof String.prototype.replaceAll === "undefined") {
	String.prototype.replaceAll = function (match, replace) {
	  return this.replace(new RegExp(match, 'g'), () => replace);
	}
  }

// /*----- func replace string to dig */
// ==== format number ==== //
Number.prototype.format = function(n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};
function formata(str, k) {
	str = str

		// Remove the white spaces
		.trim()

		// Replace all the special
		// characters with ""
		.replace(/[^a-zA-Z0-9]/g, "")

		// Transform the string into
		// uppercase characters
		.toUpperCase()
		 
		// Convert the string into array
		.split("");

	// Store the length of the
	// array into len
	let len = str.length;


	for (let i = len; i > 0; i = i - k) {
		if (i != len) {

			// Concatenate the string with "-"
			str[i - 1] = str[i - 1] + "-";
		}
	}

	//  Join the array to make it a string
	return str.join("");
}
/*=========== func set style css for element =============== */
function css(element, style) {
    for (const property in style)
        element.style[property] = style[property];
}

/*------------ func convert to money ---------- */
function money (number){
	return Number(number).format(0, 3, '.', ',') + '<span style="color: yellow;">₫</span>'
}
/*------- func convert to số ---------- */
function digital(tien) {
	return tien.replaceAll(/\D+/g, '')	
}
/*-------------- func quay lai --------------- */
var back_pages= 'Báo Cáo'
function back_page(){
	switch_tab(back_pages)
}

/*------------------- func convert datetime to us ------------- */
function date_us(date){
	var from = date.split("/")
	var f = new Date(from[2], from[1] - 1, from[0])
	return f
}

/*---------------func convert date-time form database to seconds new Date("2016-01-08 10:55:43").getTime() ---------- */
function get_seconds(date_begin){
	return (new Date(date_begin)).getTime()
}

/*------ func create date  yyyy-MM-dd HH:mm:ss for datebase ------------*/
function new_date() {
	var Date_tmp = new Date().toLocaleString("en-ZA", {
		// hourCycle: 'h23',
		hour12: false,
		timeZone: "Asia/Ho_Chi_Minh",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit"
	});
	// console.log(Date_tmp)
	Date_tmp = (Date_tmp.replace(',','')).replaceAll('/', '-')
	// console.log(Date_tmp)
	
	return Date_tmp
}

/*------ func covert date form database to VN ------------*/
function convert_dateToVN(date) {
	let Date_convert = date
	var dateString = Date_convert.split(' ')[0];
	var datetime_string = Date_convert.split(' ')[1];
	var dateParts = dateString.split('-').reverse().join('/');
	Date_convert = dateParts +" "+ datetime_string
	// console.log(Date_convert)
	return Date_convert
}

function convert_dateToUS(date) {
	let Date_convert = date
	var dateString = Date_convert.split(' ')[0];
	var datetime_string = Date_convert.split(' ')[1];
	var dateParts = dateString.split('/').reverse().join('-');
	Date_convert = dateParts +" "+ datetime_string
	console.log(Date_convert)
	return Date_convert
}
// test date
// let dates = new_date();
// console.log(get_seconds(dates))
// convert_dateToVN(dates);

const testCases = [
	new Date().toLocaleDateString(), // 8/19/2020
	new Date().toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', weekday:"long", hour: '2-digit', hour12: false, minute:'2-digit', second:'2-digit'}),
	new Date().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}), // 08/19/2020 (month and day with two digits)
	new Date().toLocaleDateString('en-ZA'), // 2020/08/19 (year/month/day) notice the different locale
	new Date().toLocaleDateString('en-CA'), // 2020-08-19 (year-month-day) notice the different locale
	new Date().toLocaleString("en-US", {timeZone: "America/New_York"}), // 8/19/2020, 9:29:51 AM. (date and time in a specific timezone)
	new Date().toLocaleString("en-US", {hour: '2-digit', hour12: false, timeZone: "America/New_York"}),  // 09 (just the hour)
  ]

/*--------------------- func export excel ------------------ */
function showData(data) {
	let myData = [];
	myData = data.map((d) => {
		return {
			firstName: d?.name?.first,
			lastName: d?.name?.last,
			email: d?.email,
			phone: d?.phone,
			income: `$` + (Math.random() * 1000).toFixed(2),
		};
	});
	console.log('myData', myData);
	let html =
		`<tr>
		<td>Tên</td>
		<td>Họ</td>
		<td>Email</td>
		<td>Phone</td>
		<td>Income</td>
		</tr>`;
	$.each(myData, function (key, value) {
		html += '<tr>';
		html += '<td>' + value?.firstName + '</td>';
		html += '<td>' + value?.lastName + '</td>';
		html += '<td>' + value?.email + '</td>';
		html += '<td>' + value?.phone + '</td>';
		html += '<td>' + value?.income + '</td>';
		html += '</tr>';
	});
	
	$('table tbody').html(html);
}
function exportToExcel(fileName, sheetName, table) {
	// if (myData.length === 0) {
	// 	console.error('Chưa có data');
	// 	return;
	// }
	// console.log('exportToExcel', myData);

	let wb;
	if (table && table !== '') {
		wb = XLSX.utils.table_to_book($('#' + table)[0]);
	} else {
		const ws = XLSX.utils.json_to_sheet(myData);
		// console.log('ws', ws);
		wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, sheetName);
	}
	console.log('wb', wb);
	XLSX.writeFile(wb, `${fileName}.xlsx`);
}

/*------------- time sleep ---------------- */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/*----------- func rename key json ------------*/
function renameKey ( obj, oldKey, newKey ) {
	obj[newKey] = obj[oldKey];
	delete obj[oldKey];
}
//*----------------- func loading page ---------- */
// $(document).ready(function() {
// 	let html= `<div class="theme-loader">
// 				<div class="ball-scale">
// 					<div class='contain'>
// 						<div class="ring">
// 							<div class="frame"></div>
// 						</div>
// 						<div class="ring">
// 							<div class="frame"></div>
// 						</div>
// 						<div class="ring">

// 							<div class="frame"></div>
// 						</div>
// 						<div class="ring">
// 							<div class="frame"></div>
// 						</div>
// 						<div class="ring">
// 							<div class="frame"></div>
// 						</div>
// 						<div class="ring">
// 							<div class="frame"></div>
// 						</div>
// 						<div class="ring">
// 							<div class="frame"></div>
// 						</div>
// 						<div class="ring">
// 							<div class="frame"></div>
// 						</div>
// 						<div class="ring">
// 							<div class="frame"></div>
// 						</div>
// 						<div class="ring">
// 							<div class="frame"></div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>`
// 	document.querySelector('body').insertAdjacentHTML("afterbegin",html)
// 	sleep(700).then(() => {
// 		$('.theme-loader').fadeOut('slow', function() {
// 			$(this).remove();
// 		});
// 	});
   
// });
/*================================================== Khai báo biến ==============================================*/
var language = 'vi-VN';
    //console.log(window.language);
// hàm add thêm hours new Date()
// Date.prototype.addHours= function(h){
// 	this.setHours(this.getHours()+h);
// 	return this;
// }
// ============== khai báo biến ======================//
var numPerPage = 20;// số rows trong 1 trang của table
var user_login = localStorage.getItem("namelogin"); // get name user login
var user_photo = localStorage.getItem("photo"); // get name user login
document.querySelector('.branda').innerHTML = user_login;
document.getElementById('user_photo').innerHTML = user_photo;
document.getElementById('photousername').innerHTML = user_photo;
var contain_old = null;
var contain_table_old = null;
var tab = localStorage.getItem('tab')
var id = localStorage.getItem('id')
let interval = {};
let temp_order={action: 'color'};
let color_list;
// Object.entries(interval).forEach(([key, value]) => {
// 	console.log(key, value);
//  });
/*--------------------------- begin func ----------------------- */
const main = async ()=>{
	color_list = await instance.post('/danhmuc', temp_order);
	color_list = color_list.data
	let input_search = document.querySelector('.form-group .table-search')
	input_search.addEventListener('keyup',function (evt) {search_order('MH')});
	// console.log('data', color_list)
	if (tab){switch_tab(tab,id)}
	else{switch_tab('Đơn Hàng')};
}
main()

/*================= Dashboard chuyển tab của sidebar =============*/
async function switch_tab(e, id) {
	document.querySelector('.show_btn_back').innerHTML =''
	const main = document.getElementById('main');
	/*--------------- hidde giỏ hang -------------------------- */
	main.style.paddingRight = '0';
	main.innerHTML =''
	if (typeof e.textContent !=='undefined'){e = e.textContent;}
	localStorage.setItem('tab', e, id)
	localStorage.setItem('id', id)
	document.querySelector('.MenuMain .title').innerHTML = e
	document.querySelector('.MenuMain .active').innerHTML = e
	/*------------------------- func clear timer bia ---------------- */
	Object.entries(interval).forEach(([key, value]) => {
		console.log(key, value);
		clearInterval(interval[key]);
		// interval[key] = null;
		delete(interval[key])
		console.log(interval)
	 });
	var html='',id_ca,tmp, res, value, temp_orders, sortedList,btn,nhom_MH,NL,dates, action, MH, moban, temp;
	switch (e) {
		case 'Xin Chào !':
			html += `<div class="row">
						<div class="col l-3 no_border">
							<div class="course-item" style= "color: white; margin: 10px 0;">
								<div class="img_welcome">
									<img src="/templates/images_order/welcome.png">
								</div>
								<div style="text-align: center;">
									<h1>Chào mừng bạn đến với KLMenu</h1>
									<p>Nếu bạn là nhân viên, hãy liên hệ với chủ phòng máy để được cấp quyền sử dụng KLMenu.</p>
									<br>
									<em>Vui lòng đăng xuất và đăng nhập lại sau khi được chủ phòng máy cấp quyền.</em>

									
								</div>

								<div class="img_app">
									<img src="/templates/images_order/ios-download.svg">
									<img src="/templates/images_order/android-download.svg">
								</div>
							</div>
						</div>

						<div class="col l-3 border">
							<div class="course-item" style= "color: white; margin-top: 5px;">
								<div class="header">
									<span>Thông Báo</span>
								</div>
								<div class="Thongbao_title">
									
								</div>
							</div>
						</div>
					</div>`
			html +=`<div class="lines" data-text="Tin Tức"></div>`

			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)
		break;
		case 'Máy Trạm':
			id_ca = localStorage.getItem("id_ca")
			temp = {
				action: 'info-DoanhThu',
			}
			res = await instance.post('/cashier', temp);
			value = res.data[0]
			localStorage.setItem('id_ca', value.id_ca)
				
			/*--------------- show btn thietlapca ------------------------ */
			tmp = `<div class='thietlapca'> 
						<div class="dropdown">
							<div class="drop_btn nut_dropdown"><i class="fa fa-users" aria-hidden="true"></i> Thiết Lập Ca <i class="fa fa-angle-up"></i></div>
							<div class="noidung_dropdown">
								<button class="nhan_don" onclick="nhan_don()">Nhận Đơn</button>
								<hr style="margin: 0;color: grey;">
							<button id="ket_ca" class="ket_ca" onclick="ket_ca()">Kết Thúc Ca</button>
							</div>
						</div>

						<div class="dropdown" style="margin-right: 0px;">
							<div class="drop_btn nut_dropdown" onclick="switch_tab(this, 'coban')"><i class="ti-shopping-cart" style="font-size: 20px;margin-right: 10px;margin-top: 3px;line-height:1;"></i>Tạo Đơn Hàng</div>
						</div>
					</div>`
			document.querySelector('.show_btn_back').innerHTML = tmp
			html += `<div class='flex' style="margin-bottom:15px;">`
			html += `<div class="thongtin_ca">
						<p style='font-size: 1.3rem; white-space: nowrap;'>THÔNG TIN CA HIỆN TẠI</p>
						<br>
						<p style="color: var(--red); font-weight: 600; font-size: 18px; text-align: left;" class="Nhan_don">Dừng Nhận Đơn</p>
						<br>
						<p style="font-size: 18px;"> Nhận Ca </p>
						<p class="info_ca"> ${user_login} - ${value.date_begin} </p>
					</div>`
			html += `<div style="display: flex; flex-wrap: wrap;">
					<div class='bxdoanhthu'>
						<div class="page-header-title">
							<i class="ti-harddrives" style="background: #f10075"></i>
							<div class="d-inline">
								<h4>DOANH THU DỊCH VỤ</h4>
								<span class="DTDV" style="white-space: nowrap;">${money(value.DT_dichvu)}</span>
							</div>
						</div>
						<div class="page-header-title">
							<i class="ti-harddrives" style="background: #2a2de8"></i>
							<div class="d-inline">
								<h4>DOANH THU KHÁC</h4>
								<span class="DTDVK" style="white-space: nowrap;">${money(0)}</span>
							</div>
						</div>
					</div><br>`
			html += `<div class='bxdoanhthu'>
						<div class="page-header-title">
							<i class="ti-harddrives" style="background: #41a304"></i>
							<div class="d-inline">
								<h4>THANH TOÁN VÍ ĐIỆN TỬ</h4>
								<span>${money(0)}</span>
							</div>
						</div>
						<div class="page-header-title">
							<i class="ti-harddrives"></i>
							<div class="d-inline">
								<h4>HOÀN TIỀN VÍ ĐIỆN TỬ</h4>
								<span>${money(0)}</span>
							</div>
						</div>
					</div>`
			html += `</div></div>`

			/*--------------- show content DM ----------------------- */

			html += `<div class="menu_list" style="margin-bottom: 15px; margin-top: -10px; ">
						<div class="dropdown">
							<div class="drop_btn nut_dropdown"><i class="ti-desktop"></i>Máy Trạm</div>
						</div>

						<div class="dropdown">
							<div class="drop_btn nut_dropdown"><i class="fa fa-users" aria-hidden="true" style="margin-right: -5px;"></i>Hội Viên</div>
						</div>

						<div class="dropdown">
							<div class="drop_btn nut_dropdown" ><i class="ti-pencil-alt"></i>Nhật ký hệ thống</div>
						</div>

						<div class="dropdown">
							<div class="drop_btn nut_dropdown"><i class="ti-pencil-alt"></i></i>Nhật ký giao dịch</div>
						</div>
						<div class="dropdown">
							<div class="drop_btn nut_dropdown" ><i class="ti-layout-grid2"></i>Nhóm máy</div>
						</div>
						<div class="dropdown">
							<div class="drop_btn nut_dropdown"><i class="fa fa-users" aria-hidden="true" style="margin-right: -5px;"></i>Nhóm người dùng</div>
						</div>

						<div class="dropdown">
							<div class="drop_btn nut_dropdown"><i class="ti-na"></i>Khống chế ứng dụng</div>
						</div>

						<div class="dropdown">
							<div class="drop_btn nut_dropdown"><i class="ti-na"></i>Khống chế Website</div>
						</div>

						<div class="dropdown">
							<div class="drop_btn nut_dropdown" ><i class="ti-pencil-alt"></i>Nhật ký Website</div>
						</div>

					</div>`
			
			html +='<div class="table_responsive" id="main_table">'
			// class="paginated"
			html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
			html +='	<thead>'
			html +='	<tr>'
			html +='		<th>MÁY TRẠM</th>'
			html +='		<th>TRẠNG THÁI</th>'
			html +='		<th>TÀI KHOẢN</th>'
			html +='		<th>BẮT ĐẦU</th>'
			html +='		<th>ĐÃ DÙNG</th>'
			html +='		<th>CÒN LẠI</th>'
			html +='		<th>SỐ TIỀN</th>'
			html +='		<th>NHÓM MÁY</th>'
			html +='	</tr>'
			html +='	</thead>'
			html +='	<tbody id="list_maytram">'

			

			html += 	'</tbody>'
			html += '</table>'

			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)

			await render_rows('value', 'DM_MAYTRAM')
			// render_maytram();
		break;
		case 'Bi-a':
			id_ca = localStorage.getItem("id_ca")
			temp = {action: 'info-DoanhThu'}
			res = await instance.post('/cashier', temp);
			value = res.data[0]
			localStorage.setItem('id_ca', value.id_ca)
			/*--------------- show btn thietlapca ------------------------ */
			tmp = `<div class='thietlapca'> 
						<div class="dropdown">
							<div class="drop_btn nut_dropdown"><i class="fa fa-users" aria-hidden="true"></i> Thiết Lập Ca <i class="fa fa-angle-up"></i></div>
							<div class="noidung_dropdown">
								<button class="nhan_don" onclick="nhan_don()">Nhận Đơn</button>
								<hr style="margin: 0;color: grey;">
							<button id="ket_ca" class="ket_ca" onclick="ket_ca()">Kết Thúc Ca</button>
							</div>
						</div>

						<div class="dropdown" style="margin-right: 0px;">
							<div class="drop_btn nut_dropdown" onclick="switch_tab(this, 'coban')"><i class="ti-shopping-cart" style="font-size: 20px;margin-right: 10px;margin-top: 3px;line-height:1;"></i>Tạo Đơn Hàng</div>
						</div>
					</div>`
			document.querySelector('.show_btn_back').innerHTML = tmp
			html += `<div class='flex' style="margin-bottom:15px;">`
			html += `<div class="thongtin_ca">
						<p style='font-size: 1.3rem; white-space: nowrap;'>THÔNG TIN CA HIỆN TẠI</p>
						<br>
						<p style="color: var(--red); font-weight: 600; font-size: 18px; text-align: left;" class="Nhan_don">Dừng Nhận Đơn</p>
						<br>
						<p style="font-size: 18px;"> Nhận Ca </p>
						<p class="info_ca"> ${user_login} - ${value.date_begin} </p>
					</div>`
			html += `<div style="display: flex; flex-wrap: wrap;">
					<div class='bxdoanhthu'>
						<div class="page-header-title">
							<i class="ti-harddrives" style="background: #f10075"></i>
							<div class="d-inline">
								<h4>DOANH THU DỊCH VỤ</h4>
								<span class="DTDV" style="white-space: nowrap;">${money(value.DT_dichvu)}</span>
							</div>
						</div>
						<div class="page-header-title">
							<i class="ti-harddrives" style="background: #2a2de8"></i>
							<div class="d-inline">
								<h4>DOANH THU KHÁC</h4>
								<span class="DTDVK" style="white-space: nowrap;">${money(0)}</span>
							</div>
						</div>
					</div><br>`
			html += `<div class='bxdoanhthu'>
						<div class="page-header-title">
							<i class="ti-harddrives" style="background: #41a304"></i>
							<div class="d-inline">
								<h4>THANH TOÁN VÍ ĐIỆN TỬ</h4>
								<span>${money(0)}</span>
							</div>
						</div>
						<div class="page-header-title">
							<i class="ti-harddrives"></i>
							<div class="d-inline">
								<h4>HOÀN TIỀN VÍ ĐIỆN TỬ</h4>
								<span>${money(0)}</span>
							</div>
						</div>
					</div>`
			html += `</div></div>`
			
			/*--------------- show content DM ----------------------- */
			
			html +='<div class="table_responsive" id="main_table">'
			// class="paginated"
			html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
			html +='	<thead>'
			html +='	<tr>'
			html +='		<th>THỜI GIAN</th>'
			html +='		<th>VỊ TRÍ</th>'
			html +='		<th>TÍNH GIỜ Billiards</th>'
			html +='		<th>MẶT HÀNG</th>'
			html +='		<th>SỐ LƯỢNG</th>'
			html +='		<th>TT</th>'
			html +='		<th>THAO TÁC</th>'
			html +='		<th style="max-width: 100px;">IN</th>'
			html +='		<th style="max-width: 200px;">THANH TOÁN</th>'
			html +='	</tr>'
			html +='	</thead>'
			html +='	<tbody id="list_bia">'
			html += 	'</tbody>'
			html += '</table>'

			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)
			temp = {action: 'getBia'}
			res = await instance.post('/Bi-a', temp);
			value = res.data
			await render_rows(value, 'DM_BIA')
			// render_table_bia()
		break;
		case 'Đơn Hàng':
			id_ca = localStorage.getItem("id_ca")
			temp = {action: 'info-DoanhThu'}
			res = await instance.post('/cashier', temp);
			value = res.data[0]
			localStorage.setItem('id_ca', value.id_ca)

			temp = {action: 'dropbox_search'}
			const dropbox = await instance.post('/cashier', temp);
			/*--------------- show btn thietlapca ------------------------ */
			tmp = `<div class='thietlapca'> 
						<div class="dropdown">
							<div class="drop_btn nut_dropdown"><i class="fa fa-users" aria-hidden="true"></i> Thiết Lập Ca <i class="fa fa-angle-up"></i></div>
							<div class="noidung_dropdown">
								<button class="nhan_don" onclick="nhan_don()">Nhận Đơn</button>
								<hr style="margin: 0;color: grey;">
							<button id="ket_ca" class="ket_ca" onclick="ket_ca()">Kết Thúc Ca</button>
							</div>
						</div>

						<div class="dropdown" style="margin-right: 0px;">
							<div class="drop_btn nut_dropdown" onclick="switch_tab(this, 'coban')"><i class="ti-shopping-cart" style="font-size: 20px;margin-right: 10px;margin-top: 3px;line-height:1;"></i>Tạo Đơn Hàng</div>
						</div>
					</div>`
			document.querySelector('.show_btn_back').innerHTML = tmp
			html += `<div class='flex'>`
			html += `<div class="thongtin_ca">
						<p style='font-size: 1.3rem; white-space: nowrap;'>THÔNG TIN CA HIỆN TẠI</p>
						<br>
						<p style="color: var(--red); font-weight: 600; font-size: 18px; text-align: left;" class="Nhan_don">Dừng Nhận Đơn</p>
						<br>
						<p style="font-size: 18px;"> Nhận Ca </p>
						<p class="info_ca"> ${user_login} - ${value.date_begin} </p>
					</div>`
			html += `<div style="display: flex; flex-wrap: wrap;">
					<div class='bxdoanhthu'>
						<div class="page-header-title">
							<i class="ti-harddrives" style="background: #f10075"></i>
							<div class="d-inline">
								<h4>DOANH THU DỊCH VỤ</h4>
								<span class="DTDV" style="white-space: nowrap;">${money(value.DT_dichvu)}</span>
							</div>
						</div>
						<div class="page-header-title">
							<i class="ti-harddrives" style="background: #2a2de8"></i>
							<div class="d-inline">
								<h4>DOANH THU KHÁC</h4>
								<span class="DTDVK" style="white-space: nowrap;">${money(0)}</span>
							</div>
						</div>
					</div><br>`
			html += `<div class='bxdoanhthu'>
						<div class="page-header-title">
							<i class="ti-harddrives" style="background: #41a304"></i>
							<div class="d-inline">
								<h4>THANH TOÁN VÍ ĐIỆN TỬ</h4>
								<span>${money(0)}</span>
							</div>
						</div>
						<div class="page-header-title">
							<i class="ti-harddrives"></i>
							<div class="d-inline">
								<h4>HOÀN TIỀN VÍ ĐIỆN TỬ</h4>
								<span>${money(0)}</span>
							</div>
						</div>
					</div>`
			html += `</div></div>`

			html += `<div class="order_search" style="display: flex; width:100%; gap:10px; margin-bottom: 10px;">`//padding-bottom:15px;
			
			html+=`<div class="lang-menu" id="Search_Trangthai" style="height: 50px; margin:0; margin-top:15px;">
					<div class="selected-lang" style="height: 50px; background: var(--light);border-radius: 5px;">
						<span class="sBtn-text">Trạng Thái</span>
						<i class="separator"></i>
						<span class='sBtn-close'>X</span>
						<i class="ti-angle-down"></i>
					</div>
					<ul style="padding: 0;">
						<li class="option" id="CHAPNHAN" style="padding: 5px;">CHẤP NHẬN</li>
						<li class="option" id="HUY" style="padding: 5px;">HUỶ</li>
						<li class="option" id="THUTIEN" style="padding: 5px;">THU TIỀN</li>
						<li class="option" id="HOANTHANH" style="padding: 5px;">HOÀN THÀNH</li>
					</ul>
					<i class="ti-check"></i>
					<i class="ti-alert"></i>
				</div>`
			html+=`<div class="lang-menu" id="Search_Danhmuc" style="height: 50px; margin:0; margin-top:15px;">
				<div class="selected-lang" style="height: 50px; background: var(--light);border-radius: 5px;">
					<span class="sBtn-text">Danh Mục</span>
					<i class="separator"></i>
					<span class='sBtn-close'>X</span>
					<i class="ti-angle-down"></i>
				</div>
				<ul style="padding: 0;">`
				const danhmuc = dropbox.data.danhmuc.sort((a, b) =>a.name.localeCompare(b.name));
				danhmuc.forEach(function(element, index){
					html+= `<li class="option" id="${element.id}" style="padding: 5px;">${element.name}</li>`
				})		
		    html+=`</ul>
				<i class="ti-check"></i>
				<i class="ti-alert"></i>
				</div>`
			html+=`<div class="lang-menu" id="Search_Mathang" style="height: 50px; margin:0; margin-top:15px;">
					<div class="selected-lang" style="height: 50px; background: var(--light);border-radius: 5px;">
						<span class="sBtn-text">Mặt Hàng</span>
						<i class="separator"></i>
						<span class='sBtn-close'>X</span>
						<i class="ti-angle-down"></i>
					</div>
					<ul style="padding: 0;">`
					const mathang = dropbox.data.mathang.sort((a, b) =>a.name.localeCompare(b.name));
					mathang.forEach(function(element, index){
						html+= `<li class="option" id="${element.id}" style="padding: 5px;">${element.name}</li>`
					})		
				html+=`</ul>
					<i class="ti-check"></i>
					<i class="ti-alert"></i>
				</div>`
			html+=`<div class="lang-menu" id="Search_NhomMathang" style="height: 50px; margin:0; margin-top:15px;">
					<div class="selected-lang" style="height: 50px; background: var(--light);border-radius: 5px;">
						<span class="sBtn-text">Nhóm Mặt Hàng</span>
						<i class="separator"></i>
						<span class='sBtn-close'>X</span>
						<i class="ti-angle-down"></i>
					</div>
					<ul style="padding: 0;">`
					const nhom = dropbox.data.nhom.sort((a, b) =>a.name.localeCompare(b.name));
					nhom.forEach(function(element, index){
						html+= `<li class="option" id="${element.id_nhom}" style="padding: 5px;">${element.name}</li>`
					})		
			html+=`</ul>
					<i class="ti-check"></i>
					<i class="ti-alert"></i>
				</div>`
			
			html += `</div>`
					
			html +='<div class="table_responsive" id="main_table">'
			// class="paginated"
			html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
			html +='	<thead>'
			html +='	<tr style="white-space: nowrap;">'
			html +='		<th>THỜI GIAN</th>'
			html +='		<th>VỊ TRÍ</th>'
			html +='		<th>MẶT HÀNG</th>'
			html +='		<th>SL</th>'
			html +='		<th>TT</th>'
			html +='		<th>THAO TÁC</th>'
			html +='		<th style="max-width: 100px;">IN</th>'
			html +='		<th style="max-width: 200px;">THANH TOÁN</th>'
			html +='	</tr>'
			html +='	</thead>'
			html +='	<tbody id="list_order">'
		

			html += '</tbody>'
			html += '</table>'
			html += '</div>'
			html += `  <div class="pagination">
							<ul> <!--pages or li are comes from javascript --> </ul>
						</div>`
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)
			function dropbox_trangthai(){
				var optionMenus = document.querySelectorAll(".lang-menu")
				optionMenus.forEach( optionMenu => {
					if (optionMenu){
						var selectBtn = optionMenu.querySelector(".selected-lang"),
						options = optionMenu.querySelectorAll(".option"),
						sBtn_text = optionMenu.querySelector(".sBtn-text"),
						// send_color = optionMenu.querySelector(".mathang"),
						sBtn_close = optionMenu.querySelector(".sBtn-close")
						let default_name = sBtn_text.innerText;
						/*-------------- check outsize dropbox ---------- */
						(optionMenu.parentNode.parentNode).addEventListener("click", (event) => {
							if (!optionMenu.contains(event.target)) {
								const valid = optionMenu.querySelector('.valid')
								const invalid = optionMenu.querySelector('.invalid')
								optionMenu.classList.remove("active");
								if (valid){
									selectBtn.style.borderColor = 'green';
									optionMenu.querySelector('.ti-check').style.display='block';
									optionMenu.querySelector('.ti-check').style.color = 'var(--green)';
									optionMenu.querySelector('.ti-alert').style.display='none';
								}
								if (invalid){
									selectBtn.style.borderColor = 'red';
									optionMenu.querySelector('.ti-check').style.display='none';
									optionMenu.querySelector('.ti-alert').style.display='block';
									optionMenu.querySelector('.ti-alert').style.color='red';
								}
							}
						});
						/*---------- event button clear ---------- */
						sBtn_close.addEventListener("click", async () => {
							sBtn_text.innerText = default_name;
							// send_color.style.backgroundColor= 'grey'
							sBtn_close.classList.remove("active")
							optionMenu.querySelector('.ti-check').style.display='none'
							const check = optionMenu.querySelector('.check')
							if (check){
								selectBtn.classList.add('invalid')
								selectBtn.classList.remove('valid')
							}
							//event dropbox search
							temp ={title: 'Search_all', val_search: ''}
							await createPagination(totalPages, page_table, temp)

						});     
						/*------------- event choice -------- */
						options.forEach(option =>{
							option.addEventListener("click", async ()=>{
								let selectedOption = option.innerText;
								let id = option.id
								let get_color = option.querySelector(".mathang")
								// var backgroundColor = window.getComputedStyle ? window.getComputedStyle(get_color, null).getPropertyValue("background-color") : get_color.style.backgroundColor;
								var color = $(get_color).css("background-color");
								
								// send_color.style.backgroundColor= color
								sBtn_text.innerText = selectedOption;
								sBtn_text.id = id;
								optionMenu.classList.remove("active");
								sBtn_close.classList.add("active");
				
								optionMenu.querySelector('.ti-alert').style.display='none';
								optionMenu.querySelector('.ti-check').style.display='block';
								optionMenu.querySelector('.ti-check').style.color = 'var(--green)';
								selectBtn.style.borderColor = 'green';
								const invalid = optionMenu.querySelector('.invalid')
								if (invalid){selectBtn.classList.remove('invalid')}
								selectBtn.style.lineHeight = '0';
								console.log(optionMenu.id, selectedOption)
								
								//event dropbox search
								temp ={title: optionMenu.id, val_search: option.id}
								console.log(temp)
								await createPagination(totalPages, page_table, temp)
							});
						});
				
						selectBtn.addEventListener("click", () => {
							optionMenu.classList.toggle("active")
						});
					}
				});
			
			}
			dropbox_trangthai();
			/*---------- func show table list_order -------------- */
			temp ={title: 'Search_all', val_search: ''}
			await createPagination(totalPages, page_table, temp)

			/*======= listen func dung nhận đơn kết thúc ca ===============*/ 
			var dropdownBtn = document.querySelectorAll('.drop_btn');
			var iconDrop = null;
			var lastOpened = null; //Add this for toggling dropdown
			dropdownBtn.forEach(btn => btn.addEventListener('click', function() {
				var dropCont = this.nextElementSibling;
				let icon = this.querySelector('.fa-angle-up');
				try{
					icon.classList.toggle("down");
					dropCont.classList.toggle("show");

					//Add this for toggling dropdown
					if (lastOpened && lastOpened !== dropCont)
						lastOpened.classList.remove("show");
						lastOpened = dropCont;

					if (iconDrop && iconDrop !== icon)
						iconDrop.classList.remove("down");
					iconDrop = icon;
				}catch{}
				
			}));

			/*============== listen count up bida =================== */
			document.querySelectorAll('#start').forEach(btn => btn.addEventListener('click', function() {
			this.addEventListener('click', start);	
			// console.log(this.textContent+' okikkk')
			}));

			var nhandon = document.getElementsByClassName('nhan_don')
			var ketca = document.getElementById('ket_ca')
			nhandon[0].style.color='green'
			nhandon[0].innerHTML= 'Nhận Đơn'
			ketca.disabled = false;
			ketca.style.color = "#000"
		break;
		case 'Tạo Đơn Hàng':
			contain_old = main.innerHTML
			back_pages = "Đơn Hàng"
			tmp = '<button class="btn-back" style="position: fixed; top: 90px; right: 20px;" type="button" onclick="back_page();"><i class="ti-arrow-left"> </i>Quay Lại</button>'
			document.querySelector('.show_btn_back').innerHTML = tmp
			html += `<div class="row">
						<div class="col l-3 border" style="width: 20%; padding: 15px;">
							<div id="list_danhmuc" class="list_danhmuc">

								<div class="course-item" id="TC" style= "color: white; margin: 5px 0; cursor: move;">
									<div class="headers" style="margin-bottom: 10px; border: 1px solid rgba(255, 255, 255, .2); text-transform:none;">Tất Cả</div>
								</div>

								<div class="course-item" id="1" style= "color: white; margin: 5px 0; cursor: move;">
									<div class="headers" style="margin-bottom: 10px; border: 1px solid rgba(255, 255, 255, .2); text-transform:none;">Đồ Ăn</div>
								</div>

								<div class="course-item" id="2" style= "color: white; margin: 5px 0; cursor: move;">
									<div class="headers" style="margin-bottom: 10px; border: 1px solid rgba(255, 255, 255, .2); text-transform:none;">Đồ Uống</div>
								</div>

							</div>
						</div>

						<div class="col l-3" style="border: none; width: 100vh;">
							<div class="course-item" style= "color: white; border: 1px solid rgba(255, 255, 255, .2);border-radius: 5px;
							box-shadow: rgba(255, 255, 255, 0.25) 0px 0.0625em 0.0625em, rgba(255, 255, 255, 0.25) 0px 0.125em 0.5em, rgba(0, 0, 0, 0.1) 0px 0px 0px 1px inset;">
								<div class="header">
									<span>Tất Cả</span>
								</div>
								<div class="custom_order"></div> `
			html+=	`</div></div>
					<div class="col l-3" style="border: none; width: 340px;">
						<div class="order_bars">
						<div class="course-item" style= "color: white; border-radius: 5px;">
							<!----------------------- element order dashboard order ----------------->
							
							<div class="dashboard-order">
								<h3>Giỏ Hàng <span class="countcart">(Đang trống! )</span></h3>
								<hr class="divider">
							
								<!-- element order -->
								<div class="order-wrapper">
									
								</div>
								
								<!-- <hr class="divider"> -->
								<div class="order-total">
									<div class="order-promo">
										<input class="input-promo" type="text" placeholder="Apply Voucher">
										<button class="button-promo">Find Promo</button>
									</div> 
									<!-- <hr class="divider"> -->
									<p>Thành Tiền: <span id="order-totals">70đ</span></p>
									<button class="checkout">Đặt Hàng</button>
								</div>
							</div>
						</div>
					</div>
					</div>
				</div>`
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)
			temp_order = {action: 'getMH'}
			var Show_MH = await instance.post('/mathang', temp_order);
			console.log	(Show_MH.data)
			var obj = await render_rows(Show_MH.data, 'DM_TAODONHANG')
			/*------------- show order custom --------*/
			const dashboard_thongbao = document.getElementsByClassName('dashboard-thongbao');
			const dashboard_order = document.getElementsByClassName('dashboard-order');
			const dashboard_card = document.querySelectorAll('.dashboard-card')
			const order_wrapper = document.getElementsByClassName("order-wrapper");
			order_wrapper[0].innerHTML = ''
			var order_total = document.getElementById("order-totals");
			order_total.innerHTML = 0 + `<span style="color: yellow;">₫</span>`
			const button_dathang = document.querySelector(".dashboard-order .checkout")
			button_dathang.disabled = true;
			dashboard_thongbao[0].style.visibility = 'hidden';
			dashboard_order[0].style.visibility = 'visible';
			dashboard_order[0].style.display = 'block'

			//*----------- fucn Đặt Hàng ----------- */
			button_dathang.addEventListener('click',function (evt) {
				dathang('name_KH')
			});
			//*-------------- func menu ---------*/
			let btn_search = document.querySelectorAll('.list_danhmuc .course-item')
			btn_search.forEach(el => {
				el.addEventListener('click',function (evt) {
					let name_search = el.id //.getAttribute('DM')
					const dashboard_card = document.querySelectorAll('.dashboard-card')
					const title = document.querySelector('.header span')
					dashboard_card.forEach(element => {
						let DMcha = element.getAttribute('DM')
						if (DMcha == name_search){element.style.display='none'}
						else element.style.display='';
						title.innerHTML = el.querySelector('.headers').innerText;
						console.log(el.querySelector('.headers').innerText)
					});
				});
			});
		break;
		case 'Thống Kê':
		
			/*----------------------- Thông kê Ngày ------------------------ */
			html += `<div class="Chart">
			
						<div class="Top10" style="background: #000524; width: 100%;">
							<div>
								<span>Top 10 Mặt Hàng</span>
								<div class='buttons'>
									<button id='2000'>2000</button>
									<button id='2004'>2004</button>
									<button id='2008'>2008</button>
									<button id='2012'>2012</button>
									<button id='2016'>2016</button>
									<button id='2020' class='active'>2020</button>
								</div>
								<span>Ngày</span>
							</div>
							<div id="Top10" style="width: 100%;"></div>
						</div>
			
					</div>`
			
					/*--------------------------- Tổng doanh thu ngày ---------------------------- */
			html+=`	<div class="info-data" style="margin: 20px 0;">
						<div class="card">
							<div class="head">
								<div>
									<h2 id="card_1_h2">10.000.000d</h2>
									<p>Tổng Doanh Thu</p>
								</div>
								<i class='bx bx-trending-up icon' ></i>
							</div>
							<span class="progress" id='card_1_progress' data-value="100%"></span>
							<span class="label" id='card_1_label'>40%</span>
						</div>

						<div class="card">
							<div class="head">
								<div>
									<h2 id="card_2_h2">234 H</h2>
									<p>Tiền Dịch Vụ/Ngày</p>
								</div>
								<i class='bx bx-trending-up icon' ></i>
							</div>
							<span class="progress" id='card_2_progress' data-value="60%"></span>
							<span class="label" id='card_2_label'>60%</span>
						</div>

						<div class="card">
							<div class="head">
								<div>
									<h2 id="card_3_h2">465</h2>
									<p>Tiền Nạp Giờ Chơi/Ngày</p>
								</div>
								<i class='bx bx-trending-up icon' ></i>
							</div>
							<span class="progress" id='card_3_progress' data-value="30%"></span>
							<span class="label" id='card_3_label'>30%</span>
						</div>

						<div class="card">
							<div class="head">
								<div>
									<h2 id="card_3_h2">465</h2>
									<p>Đơn Hàng/Ngày</p>
								</div>
								<i class='bx bx-trending-up icon' ></i>
							</div>
							<span class="progress" id='card_3_progress' data-value="30%"></span>
							<span class="label" id='card_3_label'>30%</span>
						</div>

					</div>`
			/*----------------------- xếp hang ------------------------------- */
			html += `<div class="Chart" >
						<div class="Hightchart" style="background: #000524; margin-bottom: 20px; width:100%;">
							<div>
								<span>Xếp Hạng</span>
								<span class="span" style="margin-left: auto;">Dịch Vụ</span>
								<span style="margin:0;">Máy sử dụng</span>
							</div>
							<div id="chart_xephang"></div>
						</div>
					</div>`
			/*----------------------- Thông kê Tháng ------------------------ */
			// style=''
			html += `<div class="Chart" >
						<div id="wrappers" class="Barchart">
							<div>
								<span>Thống Kê Doanh Thu Dịch Vụ</span>
								<span>Tháng</span>
							</div>
							<div id="chart-area" style="border: none;"></div>
							<div id="chart-bar" style="border: none;"></div>
						</div>
						
						<div class="Hightchart" style="background: #000524; margin-bottom: 20px;">
							<div>
								<span>Thống Kê Phân Bổ Dịch Vụ</span>
								<span>Tháng</span>
							</div>
							<div id="container_chart"></div>
						</div>

						<div class="Hightchart" style="background: #000524; margin-right:20px;">
							<div>
								<span>Thống Kê Giờ Chơi</span>
								<span>Tháng</span>
							</div>
							<div id="tk_giochoi"></div>
						</div>

						<div class="Hightchart" style="background: #000524;">
							<div>
								<span>Thống Kê Tài Khoản</span>
								<span>Tháng</span>
							</div>
							<div id="taikhoan_new"></div>
						</div>

					</div>`
			


			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)

			// console.log('chart: ',document.querySelector("#chart-area"))

			// var audio = new Audio('http://127.0.0.1:8100/assets/js/alert-order.ogg');
			// audio.autoplay = true
			
			
			

			/*----------------- Chart ----------------------*/
			var data1 = generateDayWiseTimeSeries(new Date("22 Apr 2017").getTime(), 115, {
				min: 30,
				max: 90
			});
			var data2 = generateDayWiseTimeSeries(new Date("22 Apr 2017").getTime(), 115, {
			min: 10,
			max: 99
			});
			var options1 = {
			series: [{
						// name: 'Number of PCs online',
						data: data1
						}, {
						// name: 'Total time pc online',
						data: data2
						}],
				legend: {
				show: false
			},
			colors: ["#008000", "#FF0000"],
			chart: {
				id: "chart2",
				type: "area",
				height: 230,
				foreColor: "#ccc",
				toolbar: {
				autoSelected: "pan",
				show: false
				},
				animations: {
					enabled: true,
					easing: 'linear',
					dynamicAnimation: {
					speed: 1000
					}
				},
				// selection: {
				//   enabled: true,
				//   fill: {
				//     color: "#fff",
				//     opacity: 0.4
				//   },
				//   xaxis: {
				//     min: new Date("27 Jul 2017 10:00:00").getTime(),
				//     max: new Date("14 Aug 2017 10:00:00").getTime()
				//   }
				// }
			},
			// colors: ["#00BAEC"],
			stroke: {
				curve: 'smooth',
				width: 1
			},
			title: {
				text: '',
				align: 'left'
			},
			grid: {
				borderColor: "#555",
				clipMarkers: false,
				yaxis: {
				lines: {
					show: false
				}
				}
			},
			dataLabels: {
				enabled: false
			},
			fill: {
				gradient: {
				enabled: true,
				opacityFrom: 0.55,
				opacityTo: 0
				}
			},
			// markers: {
			//   size: 0,
			//   colors: ["#008000","#FF0000"],
			//   strokeColor: "#00BAEC",
			//   strokeWidth: 1
			// },
			// series: [
			//   {
			//     data: data
			//   }
			// ],
			tooltip: {
				theme: "dark"
			},
			xaxis: {
				type: "datetime",//category,datetime
				// tooltip: {
				//   enabled: false
				// }
				labels: {
					datetimeFormatter: {
					year: 'yyyy',
					month: 'MMM \'yy',
					day: 'dd MMM',
					hour: 'HH:mm'
					}
				}
				
				
			},
			yaxis: {
				min: 0,
				tickAmount: 4
			}
			};
					
			var options2 = {
			chart: {
				id: "chart1",
				height: 130,
				type: "bar",
				foreColor: "#ccc",
				brush: {
				target: "chart2",
				enabled: true
				},
				selection: {
				enabled: true,
				fill: {
					color: "#fff",
					opacity: 0.4
				},
				xaxis: {
					min: new Date("27 Jul 2017 10:00:00").getTime(),
					max: new Date("14 Aug 2017 10:00:00").getTime()
				}
				}, 
				
			},
			colors: ["#008000", "#FF0000"],
			series: [
				{
				name: 'Number of PCs online',
				data: data1
				},
				{
				name: 'Number of PCs online',
				data: data2
				}
			],
			stroke: {
				
				width: 1
			},
			
			grid: {
				borderColor: "#444"
			},
			markers: {
				size: 0
			},
			xaxis: {
				type: "datetime",
				tooltip: {
				enabled: false
				}
			},
			yaxis: {
				tickAmount: 2
			}
			};

			// document.querySelector("#chart-area").innerText =''
			// document.querySelector("#chart-bar").innerText= ''
			var chart1 = new ApexCharts(document.querySelector("#chart-area"), options1);
			try {
				chart1.destroy();
			} catch (error) {
				
			}
			
			var chart1 = new ApexCharts(document.querySelector("#chart-area"), options1);
			chart1.render().then(() => chart1.ohYeahThisChartHasBeenRendered = true);
			
			
			var chart2 = new ApexCharts(document.querySelector("#chart-bar"), options2);
			
			chart2.render();
			
			/*---------------------Hight chart -------------------- */
			
			// Data retrieved from https://netmarketshare.com/
			// Radialize the colors
			Highcharts.setOptions({
				colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
					return {
						radialGradient: {
							cx: 0.5,
							cy: 0.3,
							r: 0.7
						},
						credits: {
									enabled: false
								},
						stops: [
							[0, color],
							[1, Highcharts.color(color).brighten(-0.3).get('rgb')] // darken
						]
					};
				})
			});
			
			// Build the chart
			Highcharts.chart('container_chart', {
				chart: {
				backgroundColor: null,//#000524
				borderWidth: 0,
				borderColor: '#335cad',
				width: null,
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false,
					type: 'pie'
				},
				colors: ["#3366cc","#dc3912","#ff9900","#109618","#990099","#0099c6","#dd4477","#66aa00","#b82e2e","#316395",
					"#994499","#22aa99","#aaaa11","#6633cc","#e67300","#8b0707","#651067","#329262","#5574a6","#3b3eac","#b77322",
					"#16d620","#b91383","#f4359e","#9c5935","#a9c413","#2a778d","#668d1c","#bea413","#0c5922","#743411"],
				credits: {
							enabled: false
						},
				title: {
					// text: '<b style="color: white;">Thống Kê Phân Bổ Dịch Vụ</b>',
					text: '',
					align: 'left'
				},
				legend: {
						itemStyle: {
							fontSize:'20px',
							font: '20pt Trebuchet MS, Verdana, sans-serif',
							color: '#A0A0A0'
						},
						itemHoverStyle: {
							color: '#FFF'
						},
						itemHiddenStyle: {
							color: '#444'
						}
			
					},
				tooltip: {
					pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
				},
				accessibility: {
				// announceNewData: {
				//       enabled: true
				//   },
					point: {
						valueSuffix: '%'
					},
					enabled: false
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						dataLabels: {
							enabled: true,
							format: '<b>{point.name}</b><br> {point.percentage:.1f} %<br>',
							// connectorColor: 'silver'
							connectorWidth: 1,
							style: {
								fontSize: '14px',
								fontWeight: "100",
								}
						},
						
					}
				},
				series: [{
					name: 's',
					// stacking: 'normal',
					borderWidth: 0,
					// colorByPoint: true,
					data: [
						{ name:'Đồ Ăn Thêm', y: 13.24, color: 'yellow' },
						{ name: 'Đồ Uống', y: 12.93 },
						{ name: 'Firefox', y: 4.73 },
						{ name: 'Safari', y: 2.50 },
						{ name: 'Internet Explorer', y: 1.65 },
						{ name: 'Đồ Ăn Vặt', y: 4.93 },
						{ name: 'Đồ Uống', y: 12.93 },
						{ name: 'Firefox', y: 4.73 },
						{ name: 'Safari', y: 2.50 },
						{ name: 'Internet Explorer', y: 1.65 },
						{ name: 'Đồ Ăn Vặt', y: 4.93 }
					]
				}]
			});
			
			
			/*-------------- Thống kê top 10 ----------------------- */
			const dataPrev = {
				2020: [
					['South Korea', 9],
					['Japan', 12],
					['Australia', 8],
					['Germany', 17],
					['Russia', 19],
					['China', 26],
					['Great Britain', 27],
					['United States', 46]
				],
				2016: [
					['South Korea', 13],
					['Japan', 7],
					['Australia', 8],
					['Germany', 11],
					['Russia', 20],
					['China', 38],
					['Great Britain', 29],
					['United States', 47]
				],
				2012: [
					['South Korea', 13],
					['Japan', 9],
					['Australia', 14],
					['Germany', 16],
					['Russia', 24],
					['China', 48],
					['Great Britain', 19],
					['United States', 36]
				],
				2008: [
					['South Korea', 9],
					['Japan', 17],
					['Australia', 18],
					['Germany', 13],
					['Russia', 29],
					['China', 33],
					['Great Britain', 9],
					['United States', 37]
				],
				2004: [
					['South Korea', 8],
					['Japan', 5],
					['Australia', 16],
					['Germany', 13],
					['Russia', 32],
					['China', 28],
					['Great Britain', 11],
					['United States', 37]
				],
				2000: [
					['South Korea', 7],
					['Japan', 3],
					['Australia', 9],
					['Germany', 20],
					['Russia', 26],
					['China', 16],
					['Great Britain', 1],
					['United States', 44]
				]
			};
			
			var data = {
				2020: [
					['South Korea', 6],
					['Japan', 27],
					['Australia', 17],
					['Germany', 10],
					['Russia', 20],
					['China', 38],
					['Great Britain', 22],
					['United States', 39]
				],
				2016: [
					['South Korea', 9],
					['Japan', 12],
					['Australia', 8],
					['Germany', 17],
					['Russia', 19],
					['China', 26],
					['Great Britain', 27],
					['United States', 46]
				],
				2012: [
					['South Korea', 13],
					['Japan', 7],
					['Australia', 8],
					['Germany', 11],
					['Russia', 20],
					['China', 38],
					['Great Britain', 29],
					['United States', 47]
				],
				2008: [
					['South Korea', 13],
					['Japan', 9],
					['Australia', 14],
					['Germany', 16],
					['Russia', 24],
					['China', 48],
					['Great Britain', 19],
					['United States', 36]
				],
				2004: [
					['South Korea', 9],
					['Japan', 17],
					['Australia', 18],
					['Germany', 13],
					['Russia', 29],
					['China', 33],
					['Great Britain', 9],
					['United States', 37]
				],
				2000: [
					['South Korea', 8],
					['Japan', 5],
					['Australia', 16],
					['Germany', 13],
					['Russia', 32],
					['China', 28],
					['Great Britain', 11],
					['United States', 37]
				]
			};
			
			const countries = [{
				name: 'South Korea',
				flag: 'South Korea',
				color: 'rgb(201, 36, 39)'
			}, {
				name: 'Japan',
				flag: 'jp',
				color: 'rgb(201, 36, 39)'
			}, {
				name: 'Australia',
				flag: 'au',
				color: 'rgb(0, 82, 180)'
			}, {
				name: 'Germany',
				flag: 'de',
				color: 'rgb(0, 0, 0)'
			}, {
				name: 'Russia',
				flag: 'ru',
				color: 'rgb(240, 240, 240)'
			}, {
				name: 'China',
				flag: 'Cơm Gà xối mỡ Cơm Gà xối mỡ',
				color: 'rgb(255, 217, 68)'
			}, {
				name: 'Great Britain',
				flag: 'gb',
				color: 'rgb(0, 82, 180)'
			}, {
				name: 'United States',
				flag: 'Cơm Gà xối mỡ',
				color: 'rgb(215, 0, 38)'
			}];
			
			
			const getData = data => data.map((country, i) => ({
				name: country[0],
				y: country[1],
				color: countries[i].color
			}));
			
			const chart = Highcharts.chart('Top10', {
				chart: {
					// animation: {
					// 	duration: 500
					// },
					// marginRight: 50,
					backgroundColor: null,
					
					borderColor: '#335cad',
					
					type: 'column'
				},
				title: {
					// text: 'Summer Olympics 2020 - Top 5 countries by Gold medals',
					text: '',
					align: 'left'
				},
				subtitle: {
					// text: 'Comparing to results from Summer Olympics 2016 - Source: <a ' +
					// 	'href="https://olympics.com/en/olympic-games/tokyo-2020/medals"' +
					// 	'target="_blank">Olympics</a>',
					align: 'left'
				},
				plotOptions: {

					series: {
						grouping: false,
						borderWidth: 0
					}
				},
				legend: {
					enabled: false
				},
				tooltip: {
					shared: true,
					headerFormat: '<span style="font-size: 15px">{point.point.name}</span><br/>',
					pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y} medals</b><br/>'
				},
				xAxis: {
					type: 'category',
					
					accessibility: {
						description: 'Countries'
					},
					max: 6,
					labels: {
						useHTML: true,
						animate: true,
						formatter: ctx => {
							let flag;
			
							countries.forEach(function (country) {
								if (country.name === ctx.value) {
									flag = country.flag;
								}
							});
			
							return `${flag.toUpperCase()}<br><span class="f32">
								<span class="flag ${flag}"></span>
							</span>`;
						},
						// rotation: -45,
						style: {
							fontSize: '12px',
							textAlign: 'center',
							color: 'white'
						}
					},
					// lineColor: 'transparent'
					lineColor: 'grey',
					lineWidth: 0
				},
				yAxis: [{
					// opposite: true,
					tickPixelInterval: 150,
					title: {
						text: ''
					},
					labels: {
						style: {
							color: 'white',
						}
					},
					showFirstLabel: false, 
					gridLineWidth: 0,
					minorGridLineWidth: 0,
					// lineColor: 'grey',
					// lineWidth: 0.8
				}],
				series: [{
					color: 'rgba(158, 159, 163, 0.5)',
					pointPlacement: -0.2,
					linkedTo: 'main',
					data: dataPrev[2020].slice(),
					name: '2016'
				}, {
					name: '2020',
					id: 'main',
					dataSorting: {
						enabled: true,
						matchByName: true
					},
					dataLabels: [{
						enabled: true,
						inside: true,
						style: {
							fontSize: '16px',
							
						}
					}],
					data: getData(data[2020]).slice()
				}],
				exporting: {
					allowHTML: false
				},
				credits: {
					enabled: false
				},
			});
			
			const locations = [
				{
					city: 'Tokyo',
					year: 2020
				}, {
					city: 'Rio',
					year: 2016
				}, {
					city: 'London',
					year: 2012
				}, {
					city: 'Beijing',
					year: 2008
				}, {
					city: 'Athens',
					year: 2004
				}, {
					city: 'Sydney',
					year: 2000
				}
			];
			
			locations.forEach(location => {
				btn = document.getElementById(location.year);
			
				btn.addEventListener('click', () => {
			
					document.querySelectorAll('.buttons button.active')
						.forEach(active => {
							active.className = '';
						});
					btn.className = 'active';
			
					chart.update({
						// title: {
						// 	text: 'Summer Olympics ' + location.year +
						// 		' - Top 5 countries by Gold medals'
						// },
						// subtitle: {
						// 	text: 'Comparing to results from Summer Olympics ' +
						// 		(location.year - 4) + ' - Source: <a href="https://olympics.com/en/olympic-games/' +
						// 		(location.city.toLowerCase()) + '-' + (location.year) + '/medals" target="_blank">Olympics</a>'
						// },
						series: [{
							name: location.year - 4,
							data: dataPrev[location.year].slice()
						}, {
							name: location.year,
							data: getData(data[location.year]).slice()
						}]
					}, true, false, {
						duration: 800
					});
				});
			});

			/*----------------------- Thống kê realtime -------------- */
			// window.Apex = {
			// 	chart: {
			// 	  foreColor: "#fff",
			// 	  toolbar: {
			// 		show: false
			// 	  }
			// 	},
			// 	colors: ["#FCCF31", "#17ead9", "#f02fc2"],
			// 	stroke: {
			// 	  width: 3
			// 	},
			// 	dataLabels: {
			// 	  enabled: false
			// 	},
			// 	grid: {
			// 	  borderColor: "#40475D"
			// 	},
			// 	xaxis: {
			// 	  axisTicks: {
			// 		color: "#333"
			// 	  },
			// 	  axisBorder: {
			// 		color: "#333"
			// 	  }
			// 	},
			// 	fill: {
			// 	  type: "gradient",
			// 	  gradient: {
			// 		gradientToColors: ["#F55555", "#6078ea", "#6094ea"]
			// 	  }
			// 	},
			// 	tooltip: {
			// 	  theme: "dark",
			// 	  x: {
			// 		formatter: function (val) {
			// 		  return moment(new Date(val)).format("HH:mm:ss");
			// 		}
			// 	  }
			// 	},
			// 	yaxis: {
			// 	  decimalsInFloat: 2,
			// 	  opposite: true,
			// 	  labels: {
			// 		offsetX: -10
			// 	  }
			// 	}
			//   };
			
			//   var trigoStrength = 3;
			//   var iteration = 11;
			
			//   function getRandom() {
			// 	var i = iteration;
			// 	return (
			// 	  (Math.sin(i / trigoStrength) * (i / trigoStrength) +
			// 		i / trigoStrength +
			// 		1) *
			// 	  (trigoStrength * 2)
			// 	);
			//   }
			
			//   function getRangeRandom(yrange) {
			// 	return Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
			//   }
			
			//   function generateMinuteWiseTimeSeries(baseval, count, yrange) {
			// 	var i = 0;
			// 	var series = [];
			// 	while (i < count) {
			// 	  var x = baseval;
			// 	  var y =
			// 		(Math.sin(i / trigoStrength) * (i / trigoStrength) +
			// 		  i / trigoStrength +
			// 		  1) *
			// 		(trigoStrength * 2);
			
			// 	  series.push([x, y]);
			// 	  baseval += 300000;
			// 	  i++;
			// 	}
			// 	return series;
			//   }
			
			//   function getNewData(baseval, yrange) {
			// 	var newTime = baseval + 300000;
			// 	return {
			// 	  x: newTime,
			// 	  y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
			// 	};
			//   }
			
			
			
			//   var optionsLine = {
			// 	chart: {
			// 	  height: 350,
			// 	  type: "line",
			// 	  stacked: true,
			// 	  animations: {
			// 		enabled: true,
			// 		easing: "linear",
			// 		dynamicAnimation: {
			// 		  speed: 1000
			// 		}
			// 	  },
			// 	  dropShadow: {
			// 		enabled: true,
			// 		opacity: 0.3,
			// 		blur: 5,
			// 		left: -7,
			// 		top: 22
			// 	  },
			// 	  events: {
			// 		animationEnd: function (chartCtx) {
			// 		  const newData1 = chartCtx.w.config.series[0].data.slice();
			// 		  newData1.shift();
			// 		  const newData2 = chartCtx.w.config.series[1].data.slice();
			// 		  newData2.shift();
			// 		  window.setTimeout(function () {
			// 			chartCtx.updateOptions(
			// 			  {
			// 				series: [
			// 				  {
			// 					data: newData1
			// 				  },
			// 				  {
			// 					data: newData2
			// 				  }
			// 				],
			// 				subtitle: {
			// 				  text: parseInt(getRandom() * Math.random()).toString()
			// 				}
			// 			  },
			// 			  false,
			// 			  false
			// 			);
			// 		  }, 300);
			// 		}
			// 	  },
			// 	  toolbar: {
			// 		show: false
			// 	  },
			// 	  zoom: {
			// 		enabled: false
			// 	  }
			// 	},
			// 	dataLabels: {
			// 	  enabled: false
			// 	},
			// 	stroke: {
			// 	  curve: "straight",
			// 	  width: 5
			// 	},
			// 	grid: {
			// 	  padding: {
			// 		left: 0,
			// 		right: 0
			// 	  }
			// 	},
			// 	markers: {
			// 	  size: 0,
			// 	  hover: {
			// 		size: 0
			// 	  }
			// 	},
			// 	series: [
			// 	  {
			// 		name: "Running",
			// 		data: generateMinuteWiseTimeSeries(
			// 		  new Date().getTime(),
			// 		  12,
			// 		  {
			// 			min: 30,
			// 			max: 110
			// 		  }
			// 		)
			// 	  },
			// 	  {
			// 		name: "Waiting",
			// 		data: generateMinuteWiseTimeSeries(
			// 		  new Date().getTime(),
			// 		  12,
			// 		  {
			// 			min: 30,
			// 			max: 110
			// 		  }
			// 		)
			// 	  }
			// 	],
			// 	xaxis: {
			// 	  type: "datetime",
			// 	  range: 2700000
			// 	},
			// 	title: {
			// 	  text: "Processes",
			// 	  align: "left",
			// 	  style: {
			// 		fontSize: "12px"
			// 	  }
			// 	},
			// 	subtitle: {
			// 	  text: "20",
			// 	  floating: true,
			// 	  align: "right",
			// 	  offsetY: 0,
			// 	  style: {
			// 		fontSize: "22px"
			// 	  }
			// 	},
			// 	legend: {
			// 	  show: true,
			// 	  floating: true,
			// 	  horizontalAlign: "left",
			// 	  onItemClick: {
			// 		toggleDataSeries: false
			// 	  },
			// 	  position: "top",
			// 	  offsetY: -33,
			// 	  offsetX: 60
			// 	}
			//   };
			
			//   var chartLine = new ApexCharts(
			// 	document.querySelector("#Chart_realtime"),
			// 	optionsLine
			//   );
			//   chartLine.render();
			
			
			
			//   window.setInterval(function () {
			// 	iteration++;
			// 	chartLine.updateSeries([
			// 	  {
			// 		data: [
			// 		  ...chartLine.w.config.series[0].data,
			// 		  [chartLine.w.globals.maxX + 300000, getRandom()]
			// 		]
			// 	  },
			// 	  {
			// 		data: [
			// 		  ...chartLine.w.config.series[1].data,
			// 		  [chartLine.w.globals.maxX + 300000, getRandom()]
			// 		]
			// 	  }
			// 	]);
			
				
			//   }, 1000);
			
		
				
			/*----------------------- xếp hạng --------------------- */
			const startYear = 1960,
				endYear = 2018,
				btn_a = document.getElementById('play-pause-button'),
				input = document.getElementById('play-range'),
				nbr = 20;

			let dataset, chart_xephang;


			/*
			* Animate dataLabels functionality
			*/
			// (function (H) {
			// 	const FLOAT = /^-?\d+\.?\d*$/;

			// 	// Add animated textSetter, just like fill/strokeSetters
			// 	H.Fx.prototype.textSetter = function () {
			// 		let startValue = this.start.replace(/ /g, ''),
			// 			endValue = this.end.replace(/ /g, ''),
			// 			currentValue = this.end.replace(/ /g, '');

			// 		if ((startValue || '').match(FLOAT)) {
			// 			startValue = parseInt(startValue, 10);
			// 			endValue = parseInt(endValue, 10);

			// 			// No support for float
			// 			currentValue = Highcharts.numberFormat(
			// 				Math.round(startValue + (endValue - startValue) * this.pos),
			// 				0
			// 			);
			// 		}

			// 		this.elem.endText = this.end;

			// 		this.elem.attr(this.prop, currentValue, null, true);
			// 	};

			// 	// Add textGetter, not supported at all at this moment:
			// 	H.SVGElement.prototype.textGetter = function () {
			// 		const ct = this.text.element.textContent || '';
			// 		return this.endText ? this.endText : ct.substring(0, ct.length / 2);
			// 	};

			// 	// Temporary change label.attr() with label.animate():
			// 	// In core it's simple change attr(...) => animate(...) for text prop
			// 	H.wrap(H.Series.prototype, 'drawDataLabels', function (proceed) {
			// 		const attr = H.SVGElement.prototype.attr,
			// 		chart_xephang = this.chart;

			// 		if (chart_xephang.sequenceTimer) {
			// 			this.points.forEach(point =>
			// 				(point.dataLabels || []).forEach(
			// 					label =>
			// 						(label.attr = function (hash) {
			// 							if (hash && hash.text !== undefined) {
			// 								const text = hash.text;

			// 								delete hash.text;

			// 								return this
			// 									.attr(hash)
			// 									.animate({ text });
			// 							}
			// 							return attr.apply(this, arguments);

			// 						})
			// 				)
			// 			);
			// 		}

			// 		const ret = proceed.apply(
			// 			this,
			// 			Array.prototype.slice.call(arguments, 1)
			// 		);

			// 		this.points.forEach(p =>
			// 			(p.dataLabels || []).forEach(d => (d.attr = attr))
			// 		);

			// 		return ret;
			// 	});
			// }(Highcharts));


			function getDatas(year) {
				const output = Object.entries(dataset)
					.map(country => {
						const [countryName, countryData] = country;
						return [countryName, Number(countryData[year]), random_rgba()];
					})
					.sort((a, b) => b[1] - a[1]);
				return [output[0], output.slice(1, nbr)];
			}

			function getSubtitle() {
				const population = (getDatas(input.value)[0][1] / 1000000000).toFixed(2);
				return `<span style="font-size: 80px">${input.value}</span>
					<br>
					<span style="font-size: 22px">
						Total: <b>: ${population}</b> billion
					</span>`;
			}

			

			function random_rgba() {
				var o = Math.round, r = Math.random, s = 255;
				return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
			}
			const getDatallll = data => data.map((country, i) => ({
				name: country[0],
				y: country[1],
				color: random_rgba(),
			}));

			(async () => {

				dataset = await fetch(
					'https://demo-live-data.highcharts.com/population.json'
				).then(response => response.json());
				dataset = getDatas(startYear)[1]
				dataset = getDatallll(dataset)
				console.log(dataset)
				
				$('document' ).ready(function() {
					console.log( "document loaded" );
				
				// lỗi chết ng hix do series color gây ra gán màu chó chart là hết
				chart_xephang = Highcharts.chart('chart_xephang', {
					chart: {
						type: 'bar',
						animation: {
							duration: 500
						},
						marginRight: 50,
						backgroundColor: null,
					},
					title: {
						text: '',
						align: 'left'
					},
					subtitle: {
						useHTML: true,
						// text: getSubtitle(),
						text: '',
						floating: true,
						align: 'right',
						verticalAlign: 'middle',
						y: -20,
						x: -100
					},

					legend: {
						enabled: false
					},
					xAxis: {
						type: 'category',
						gridLineWidth: 0,
						minorGridLineWidth: 0,
						labels: {
							style: {
								color: 'white',
								fontSize: '14px'
							}
						},
						lineColor: 'grey',
						lineWidth: 0.8
					},
					yAxis: {
						opposite: true,
						tickPixelInterval: 150,
						title: {
							text: null
						},
						gridLineWidth: 0,
						minorGridLineWidth: 0,
						labels: {
							style: {
								color: 'white',
								fontsize: '16px'
							}
						},
						
					},
					plotOptions: {
						series: {
							animation: false,
							groupPadding: 0,
							pointPadding: 0.1,
							borderWidth: 0,
							colorByPoint: true,
							dataSorting: {
								enabled: true,
								matchByName: true
							},
							type: 'bar',
							dataLabels: {
								enabled: true
							}
						}
					},
					series:[{
						name: '2020',
						
						data: dataset.slice()
					}],
					// responsive: {
					// 	rules: [{
					// 		condition: {
					// 			maxWidth: 550
					// 		},
					// 		chartOptions: {
					// 			xAxis: {
					// 				visible: false
					// 			},
					// 			subtitle: {
					// 				x: 0
					// 			},
					// 			plotOptions: {
					// 				series: {
					// 					dataLabels: [{
					// 						enabled: true,
					// 						y: 8
					// 					}, {
					// 						enabled: true,
					// 						format: '{point.name}',
					// 						y: -8,
					// 						style: {
					// 							fontWeight: 'normal',
					// 							opacity: 0.7
					// 						}
					// 					}]
					// 				}
					// 			}
					// 		}
					// 	}]
					// },
					credits: {
						enabled: false
					},
					accessibility: {
						enabled: false
					}
				});

				});
			})();

			/*
			* Pause the timeline, either when the range is ended, or when clicking the pause button.
			* Pausing stops the timer and resets the button to play mode.
			*/
			function pause(button) {
				button.title = 'play';
				button.className = 'fa fa-play';
				clearTimeout(chart_xephang.sequenceTimer);
				chart_xephang.sequenceTimer = undefined;
			}

			/*
			* Update the chart. This happens either on updating (moving) the range input,
			* or from a timer when the timeline is playing.
			*/
			function update(increment) {
				if (increment) {
					input.value = parseInt(input.value, 10) + increment;
				}
				if (input.value >= endYear) {
					// Auto-pause
					pause(btn_a);
				}

				chart_xephang.update(
					{
						subtitle: {
							// text: getSubtitle()
							text: ''
						}
					},
					false,
					false,
					false
				);

				chart_xephang.series[0].update({
					name: input.value,
					data: getDatas(input.value)[1]
				});
			}

			/*
			* Play the timeline.
			*/
			function play(button) {
				button.title = 'pause';
				button.className = 'fa fa-pause';
				chart_xephang.sequenceTimer = setInterval(function () {
					update(1);
				}, 500);
			}

			// btn.addEventListener('click', function () {
			// 	if (chart_xephang.sequenceTimer) {
			// 		pause(this);
			// 	} else {
			// 		play(this);
			// 	}
			// });
			/*
			* Trigger the update on the range bar click.
			*/
			// input.addEventListener('click', function () {
			// 	update();
			// });

			/*----------------- Chart Thông kê Tài khoản----------------------*/
			Highcharts.chart('taikhoan_new', {
				chart: {
					backgroundColor: null,
					type: 'area'
				},
				title: {
					// text: 'Summer Olympics 2020 - Top 5 countries by Gold medals',
					text: '',
					align: 'left'
				},
				subtitle: {
					// text: 'Comparing to results from Summer Olympics 2016 - Source: <a ' +
					// 	'href="https://olympics.com/en/olympic-games/tokyo-2020/medals"' +
					// 	'target="_blank">Olympics</a>',
					align: 'left'
				},
				xAxis: {
					type: 'category',
					// lineColor: 'transparent'
					lineColor: 'grey',
					lineWidth: 0
				},
				yAxis: [{
					// opposite: true,
					// tickPixelInterval: 150,
					title: {
						text: ''
					},
					labels: {
						style: {
							color: 'white',
						}
					},
					showFirstLabel: false, 
					gridLineWidth: 0,
					minorGridLineWidth: 0,
					// lineColor: 'grey',
					// lineWidth: 0.8
				}],
				credits: {
					enabled: false
				},
				plotOptions: {
					series: {
						pointStart: 2000
					},
					areaspline: {
						fillOpacity: 0.5
					}
				},
				series: [{
					name: 'NewTK',
					data:
						[
							38000,
							37300,
							37892,
							38564,
							36770,
							36026,
							34978,
							35657,
							35620,
							35971,
							36409,
							36435,
							34643,
							34956,
							33199,
							31136,
							30835,
							31611,
							30666,
							30319,
							31766
						],
						color: 'rgb(6, 99, 29,0.4)', // #080
						// negativeColor: 'rgba(128,0,0,0.4)', // #800
				}, {
					name: 'Deer',
					data:
						[
							22534,
							23599,
							24533,
							25195,
							25896,
							27635,
							29173,
							32646,
							35686,
							37709,
							39143,
							36829,
							35031,
							36202,
							35140,
							33718,
							37773,
							42556,
							43820,
							46445,
							50048
						],
						color: 'rgb(129, 5, 80, 0.4)', // #080
						// negativeColor: 'rgba(128,0,0,0.4)', // #800
				}]
			});

			/*----------------------- Thống kê giờ chơi --------------------- */
			Highcharts.chart('tk_giochoi', {
				chart: {
					backgroundColor: null,
					type: 'area'
				},
				title: {
					// text: 'Summer Olympics 2020 - Top 5 countries by Gold medals',
					text: '',
					align: 'left'
				},
				subtitle: {
					// text: 'Comparing to results from Summer Olympics 2016 - Source: <a ' +
					// 	'href="https://olympics.com/en/olympic-games/tokyo-2020/medals"' +
					// 	'target="_blank">Olympics</a>',
					align: 'left'
				},
				xAxis: {
					type: 'category',
					// lineColor: 'transparent'
					lineColor: 'grey',
					lineWidth: 0
				},
				yAxis: [{
					// opposite: true,
					// tickPixelInterval: 150,
					title: {
						text: ''
					},
					labels: {
						style: {
							color: 'white',
						}
					},
					showFirstLabel: false, 
					gridLineWidth: 0,
					minorGridLineWidth: 0,
					// lineColor: 'grey',
					// lineWidth: 0.8
				}],
				credits: {
					enabled: false
				},
				plotOptions: {
					series: {
						pointStart: 2000
					},
					areaspline: {
						fillOpacity: 0.5
					}
				},
				series: [{
					name: 'Deer',
					data:
						[
							22534,
							23599,
							24533,
							25195,
							25896,
							27635,
							29173,
							32646,
							35686,
							37709,
							39143,
							36829,
							35031,
							36202,
							35140,
							33718,
							37773,
							42556,
							43820,
							46445,
							50048
						],
						color: '#0051b4', // #080
						// negativeColor: 'rgba(128,0,0,0.4)', // #800
				}]
			});
		break;
		case 'Báo Cáo':
	
			back_pages = e;
			html += ` <div class="box-baocao">

						<div class="box-bc">
							<i class="ti-shopping-cart"></i>
							
							<!-- <img src="image/icon-1.png" alt=""> -->
							<h3>Đơn Hàng</h3>
							<p>Báo cáo chi tiết số lượng và doanh thu theo từng đơn hàng</p>
							<!-- <a href="#" class="btn">read more</a> -->
						</div>

						<div class="box-bc">
							<i class="ti-bag"></i>
							<h3>Mặt Hàng</h3>
							<p>Báo cáo số lượng và doanh thu trên từng mặt hàng</p>
							<!-- <a href="#" class="btn">read more</a> -->
						</div>

						<div class="box-bc">
							<i class="ti-menu-alt"></i>
							<h3>Nguyên Liệu</h3>
							<p>Báo cáo số lượng nguyên liệu đã được sử dụng</p>
							<!-- <a href="#" class="btn">read more</a> -->
						</div>

						<div class="box-bc">
							<i class="ti-time"></i>
							<h3>Giao Ca</h3>
							<p>Báo cáo lịch sử và doanh thu các lần giao ca</p>
							<!-- <a href="#" class="btn">read more</a> -->
						</div>

						<div class="box-bc">
							<i class="ti-help-alt"></i>
							<h3>Góp Ý/Yêu Cầu</h3>
							<p>Báo cáo lịch sử góp ý / yêu cầu của khách</p>
							<!-- <a href="#" class="btn">read more</a> -->
						</div>

						<div class="box-bc">
							<i class="ti-truck"></i>
							<h3>Nhập/Xuất Kho</h3>
							<p>Báo cáo lịch sử nhập kho và điều chỉnh kho nguyên liệu</p>
							<!-- <a href="#" class="btn">read more</a> -->
						</div>

						<div class="box-bc">
							<i class="ti-archive"></i>
							<h3>Tồn Kho</h3>
							<p>Báo cáo lịch sử nhập kho và điều chỉnh kho nguyên liệu</p>
							<!-- <a href="#" class="btn">read more</a> -->
						</div>

						<div class="box-bc">
							<i class="ti-download"></i>
							<h3>Xuất Báo Cáo</h3>
							<p>Báo cáo lịch sử nhập kho và điều chỉnh kho nguyên liệu</p>
							<!-- <a href="#" class="btn">read more</a> -->
						</div>

						<div class="box-bc">
							<i class="ti-file"></i>
							<h3>Nhật Ký Thao Tác</h3>
							<p>Nhật ký thao tác của nhân viên</p>
							<!-- <a href="#" class="btn">read more</a> -->
						</div>

					</div>
				`
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)

			/* ========= listen event click after inner ========= */
			var Btn = document.querySelectorAll('.box-bc');
			Btn.forEach(btn => btn.addEventListener('click', function() {
				console.log(btn.querySelector('h3').innerText)
				tmp = 'BC_'+btn.querySelector('h3').innerText
				switch_tab(tmp)
			}));
		break;		
		case 'BC_Đơn Hàng':
			
			document.querySelector('.date-form button').addEventListener('click',function (evt) {
				loc_list('BC_Đơn Hàng');
			});
			tmp = '<button class="btn-back" type="button" onclick="back_page();"><i class="ti-arrow-left"> </i>Quay Lại</button>'
			document.querySelector('.show_btn_back').innerHTML = tmp

			temp = {action: 'popup-mathang'}
			res = await instance.post('/all-order', temp);

			temp_order = {
				action: 'getMH'
			}
			MH = await instance.post('/mathang', temp_order);

			temp_NV = {
				action: 'getNV'
			}
			NV = await instance.post('/all-order', temp_NV);

			html +='<div class="table_responsive" id = "main_table">'
			html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
			html +=`	<caption style="text-align: left;">
							<h3>BÁO CÁO ĐƠN HÀNG</h3>
							<p>Lịch sử chi tiết các đơn hàng đã được bán ra theo thời điểm. Mặc định hiển thị danh sách đơn hàng trong ngày.</p>

							<div class='bxdoanhthu' style="padding: 10px 0;">
								<div class="page-header-title">
									<i class="ti-harddrives" style="background: #f10075"></i>
									<div class="d-inline">
										<h4>TỔNG DOANH THU</h4>
										<span class="DTDV" style="white-space: nowrap;">10000</span>
									</div>
								</div>
							</div>
							<p style="color: red; font-size: 18px;font-style: italic; padding-bottom: 10px;">* Lọc trạng thái [Tất Cả] sẽ hiện tổng doanh thu của cả đơn Hoàn Thành và đơn Hủy.</p>
							<div class="date-form">
								<label>Từ Ngày</label>
								<input id="date_begin" type="text" autocomplete="off">
								<label>Đến Ngày</label>
								<input id="date_end" type="text" autocomplete="off">
								<button type="button"><i class="ti-check-box"> </i>ÁP DỤNG</button>
							</div>`

							/* Bộ lọc */

			html +=`		<div class="order_search" style="display: flex; width:100%; -webkit-flex-wrap: wrap; flex-wrap: wrap;">

								<div class="dropbox_old" id="search_action" style="margin: 15px 5px 15px 0;">
										<select>
											<option>HOÀN THÀNH</option>
											<option>TẤT CẢ</option>
											<option>HỦY</option>
										</select>
										<i class="ti-angle-down"></i>
										<i class="ti-check"></i>
										<i class="ti-alert"></i>
									</div>
					
									
								<div class="dropbox_old" id="search_DM" style="margin: 15px 5px;">
										<select>
											<option>Danh Mục</option>`
											/*-------------- sort Alphabetically xắp sếp ----------- */
											sortedList = res.data.danhmuc.sort((a, b) =>
											a.name.localeCompare(b.name));
												// console.log(sortedList);

												sortedList.forEach(function(element, index){
												const name = element.name
												html+= `<option>${name}</option>`
												
											});								
				html +=`				</select>
										<i class="ti-angle-down"></i>
										<i class="ti-check"></i>
										<i class="ti-alert"></i>
									</div>

								<div class="dropbox_old" id="search_MH" style="margin: 15px 5px;">
										<select>
											<option>Mặt Hàng</option>`
											/*-------------- sort Alphabetically xắp sếp ----------- */
											sortedList_MH = MH.data.sort((a, b) =>
												a.name.localeCompare(b.name));
											// console.log(sortedList);
											sortedList_MH.forEach(function(element, index){
												const name = element.name
												html+= `<option>${name}</option>`
												
											});			
			html+=` 					</select>
										<i class="ti-angle-down"></i>
										<i class="ti-check"></i>
										<i class="ti-alert"></i>
									</div>

								<div class="dropbox_old" id="search_NV" style="margin: 15px 5px;">
										<select>
											<option>Nhân Viên</option>`
											/*-------------- sort Alphabetically xắp sếp ----------- */
											sortedList_NV = NV.data.sort((a, b) =>
												a.UserName.localeCompare(b.UserName));
											// console.log(sortedList);
											sortedList_NV.forEach(function(element, index){
												const name = element.UserName
												html+= `<option>${name}</option>`
												
											});			
			html+=` 					</select>
										<i class="ti-angle-down"></i>
										<i class="ti-check"></i>
										<i class="ti-alert"></i>
								</div>

								<div class="dropbox_old" id="search_LoaiTT" style="margin: 15px 0px 15px 5px;">
										<select>
											<option>Thanh Toán</option>
											<option>Tiền Mặt</option>
											<option>Ví Điện Tử</option>
										</select>
										<i class="ti-angle-down"></i>
										<i class="ti-check"></i>
										<i class="ti-alert"></i>
								</div>

								<input class="tenkh" id="search_custom" type="Text" placeholder="Tên Khách Hàng">
							</div>
							
							

						</caption>`
			html +='	<thead style="background: none;">'
			html +='	<tr>'
			html +='		<th>STT</th>'
			html +='		<th>THỜI GIAN</th>'
			html +='		<th>KHÁCH HÀNG</th>'
			html +='		<th>NHÂN VIÊN</th>'
			html +='		<th>MẶT HÀNG</th>'
			html +='		<th>DANH MỤC</th>'
			html +='		<th>SL</th>'
			html +='		<th>ĐƠN GIÁ</th>'
			html +='		<th>THÀNH TIỀN</th>'
			html +='		<th>THANH TOÁN</th>'
			html +='		<th>LÝ DO</th>'
			html +='	</tr>'
			html +='	</thead>'
			html +='	<tbody id="list_order">'

			html += '</tbody>'
			html += '</table>'
			html += '</div>'

			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)

			loc_list('BC_Đơn Hàng');

			
			
			/*---------- set date current ------------- */
			var datetimes = new Date()
			dates = datetimes.toLocaleDateString("vi-VN",{ year: 'numeric', month: '2-digit', day: '2-digit' }, {timeZone: "Asia/Ho_Chi_Minh"});		
			// $(function () {
			var currYear = datetimes.getFullYear();
			var opt={};
			opt.date = {preset : 'date',dateOrder: 'dMyy',};
			opt.datetime = {preset : 'datetime'};
			opt.time = {preset : 'time'};
			opt.default = {
				theme: 'android-ics light', //皮肤样式
				display: 'modal', //显示方式
				mode: 'scroller', //日期选择模式
				dateFormat: 'dd/mm/yyyy',
				lang: 'en-US',
				showNow: true,
				showLabel: false,
				nowText: '',
				setText: 'ĐẶT',
				cancelText: 'HỦY BỎ',
				startYear: currYear-60, //开始年份
				endYear: currYear + 10 //结束年份
			};

			var input_dates = document.querySelectorAll('.date-form input')
			input_dates.forEach(function(element, index){
				setTimeout(function(){
					element.placeholder=dates
					element.style.textAlign = 'center';
					$(element).mobiscroll($.extend(opt['date'], opt['default']));
				}, 1);
			});

			/*--------------- set width el ----------------- */
			let el = document.querySelectorAll('.dropbox_old')
			el.forEach(element => {
				element.style.width = 'calc(100% / 5.15)';
			});
			/*----------------- search --------------- */
			action = document.querySelectorAll('.dropbox_old select')
			action.forEach(element => {
				element.addEventListener('change',function (evt) {
					loc_list('BC_Đơn Hàng');
				});
			});
			document.querySelector('input#search_custom').addEventListener('keyup',function (evt) {
				loc_list('BC_Đơn Hàng');
			});
		break;
		case 'BC_Mặt Hàng':
			tmp = '<button class="btn-back" type="button" onclick="back_page();"><i class="ti-arrow-left"> </i>Quay Lại</button>'
			document.querySelector('.show_btn_back').innerHTML = tmp

			temp = {action: 'popup-mathang'}
			res = await instance.post('/all-order', temp);

			temp_order = {
				action: 'getMH'
			}
			MH = await instance.post('/mathang', temp_order);

			temp_NV = {
				action: 'getNV'
			}
			NV = await instance.post('/all-order', temp_NV);

			html +='<div class="table_responsive" id = "main_table">'
			html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
			html +=`	<caption style="text-align: left;">
							<h3>BÁO CÁO MẶT HÀNG</h3>
							<p>Báo cáo số lượng các mặt hàng đã được bán ra theo thời điểm được lựa chọn. Mặc định báo cáo sẽ hiển thị trong ngày.</p>

							<div class='bxdoanhthu' style="padding: 10px 0;">
								<div class="page-header-title">
									<i class="ti-harddrives" style="background: #f10075"></i>
									<div class="d-inline">
										<h4>TỔNG DOANH THU</h4>
										<span class="DTDV" style="white-space: nowrap;">10000</span>
									</div>
								</div>
							</div>
							<div class="date-form">
								<label>Từ Ngày</label>
								<input id="date_begin" type="text" autocomplete="off">
								<label>Đến Ngày</label>
								<input id="date_end" type="text" autocomplete="off">
								<button class="" type="button"><i class="ti-check-box"> </i>ÁP DỤNG</button>
							</div>`

							/* Bộ lọc */

			html +=`		<div class="order_search" style="display: flex; width:100%; -webkit-flex-wrap: wrap; flex-wrap: wrap;">

								<div class="dropbox_old" id="search_DM" style="margin: 15px 5px 15px 0px;">
										<select>
											<option>Danh Mục</option>`
											/*-------------- sort Alphabetically xắp sếp ----------- */
											sortedList = res.data.danhmuc.sort((a, b) =>
											a.name.localeCompare(b.name));
												// console.log(sortedList);

												sortedList.forEach(function(element, index){
												const name = element.name
												html+= `<option>${name}</option>`
												
											});								
				html +=`				</select>
										<i class="ti-angle-down"></i>
										<i class="ti-check"></i>
										<i class="ti-alert"></i>
									</div>

								<div class="dropbox_old" id="search_MH" style="margin: 15px 5px;">
										<select>
											<option>Mặt Hàng</option>`
											/*-------------- sort Alphabetically xắp sếp ----------- */
											sortedList_MH = MH.data.sort((a, b) =>
												a.name.localeCompare(b.name));
											// console.log(sortedList);
											sortedList_MH.forEach(function(element, index){
												const name = element.name
												html+= `<option>${name}</option>`
												
											});			
			html+=` 					</select>
										<i class="ti-angle-down"></i>
										<i class="ti-check"></i>
										<i class="ti-alert"></i>
									</div>						
							</div>					
						</caption>`

			html +='	<thead style="background: none;">'
			html +='	<tr>'
			html +='		<th>STT</th>'
			html +='		<th>MẶT HÀNG</th>'
			html +='		<th>DANH MỤC</th>'
			html +='		<th>SL</th>'
			html +='		<th>ĐƠN GIÁ</th>'
			html +='		<th>THÀNH TIỀN</th>'
			html +='	</tr>'
			html +='	</thead>'
			html +='	<tbody id="list_order">'

			html += '</tbody>'
			html += '</table>'
			html += '</div>'

			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)

			loc_list('BC_Mặt Hàng');

			/*---------- set date current ------------- */
			var datetimes = new Date()
			dates = datetimes.toLocaleDateString("vi-VN",{ year: 'numeric', month: '2-digit', day: '2-digit' }, {timeZone: "Asia/Ho_Chi_Minh"});		
			// $(function () {
			var currYear = datetimes.getFullYear();
			var opt={};
			opt.date = {preset : 'date',dateOrder: 'dMyy',};
			opt.datetime = {preset : 'datetime'};
			opt.time = {preset : 'time'};
			opt.default = {
				theme: 'android-ics light', //皮肤样式
				display: 'modal', //显示方式
				mode: 'scroller', //日期选择模式
				dateFormat: 'dd/mm/yyyy',
				lang: 'en-US',
				showNow: true,
				showLabel: false,
				nowText: '',
				setText: 'ĐẶT',
				cancelText: 'HỦY BỎ',
				startYear: currYear-60, //开始年份
				endYear: currYear + 10 //结束年份
			};

			var input_dates = document.querySelectorAll('.date-form input')
			input_dates.forEach(function(element, index){
				// var today = moment().format('YYYY-MM-DD');
				element.placeholder=dates
				element.style.textAlign = 'center';
				$(element).mobiscroll($.extend(opt['date'], opt['default']));
			});

			/*----------------- search --------------- */
			action = document.querySelectorAll('.dropbox_old select')
			action.forEach(element => {
				element.addEventListener('change',function (evt) {
					loc_list('BC_Mặt Hàng');
				});
			});
			document.querySelector('.date-form button').addEventListener('click',function (evt) {
				loc_list('BC_Mặt Hàng');
			});
		break;
		case 'BC_Nguyên Liệu':
			tmp = '<button class="btn-back" type="button" onclick="back_page();"><i class="ti-arrow-left"> </i>Quay Lại</button>'
			document.querySelector('.show_btn_back').innerHTML = tmp

			temp = {action: 'popup-mathang'}
			res = await instance.post('/all-order', temp);
			temp_order = {
				action: 'getMH'
			}
			MH = await instance.post('/mathang', temp_order);
			html +='<div class="table_responsive" id = "main_table">'
			html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
			html +=`	<caption style="text-align: left;">
							<h3>BÁO CÁO NGUYÊN LIỆU</h3>
							<p>Báo cáo số lượng các nguyên liệu đã được sử dụng theo thời điểm. Mặc định báo cáo sẽ hiển thị trong ngày.</p>

							</br>
							<div class="date-form">
								<label>Từ Ngày</label>
								<input id="date_begin" type="text" autocomplete="off">
								<label>Đến Ngày</label>
								<input id="date_end" type="text" autocomplete="off">
								<button type="button"><i class="ti-check-box"> </i>ÁP DỤNG</button>
							</div>`

							/* Bộ lọc */

			html +=`		<div class="order_search" style="display: flex; width:100%; -webkit-flex-wrap: wrap; flex-wrap: wrap;">		
									
								<div class="dropbox_old" id="search_DM" style="margin: 15px 5px 15px 0px;">
										<select>
											<option>Danh Mục</option>`
											/*-------------- sort Alphabetically xắp sếp ----------- */
											sortedList = res.data.danhmuc.sort((a, b) =>
											a.name.localeCompare(b.name));
												// console.log(sortedList);

												sortedList.forEach(function(element, index){
												const name = element.name
												html+= `<option>${name}</option>`
												
											});								
				html +=`				</select>
										<i class="ti-angle-down"></i>
										<i class="ti-check"></i>
										<i class="ti-alert"></i>
									</div>

								<div class="dropbox_old" id="search_MH" style="margin: 15px 5px;">
										<select>
											<option>Mặt Hàng </option>`
											/*-------------- sort Alphabetically xắp sếp ----------- */
											sortedList_MH = MH.data.sort((a, b) =>
												a.name.localeCompare(b.name));
											// console.log(sortedList);
											sortedList_MH.forEach(function(element, index){
												const name = element.name
												html+= `<option>${name}</option>`
												
											});			
			html+=` 					</select>
										<i class="ti-angle-down"></i>
										<i class="ti-check"></i>
										<i class="ti-alert"></i>
									</div>							
							</div>				
						</caption>`

			html +='	<thead style="background: none;">'
			html +='	<tr>'
			html +='		<th style="text-align: left;">STT</th>'
			html +='		<th style="text-align: left;">NGUYÊN LIỆU</th>'
			html +='		<th>SỐ LƯỢNG</th>'
			html +='	</tr>'
			html +='	</thead>'
			html +='	<tbody id="list_order">'

			html += '</tbody>'
			html += '</table>'
			html += '</div>'

			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)

			loc_list('BC_Nguyên Liệu');

			/*---------- set date current ------------- */
			var datetimes = new Date()
			dates = datetimes.toLocaleDateString("vi-VN",{ year: 'numeric', month: '2-digit', day: '2-digit' }, {timeZone: "Asia/Ho_Chi_Minh"});		
			// $(function () {
			var currYear = datetimes.getFullYear();
			var opt={};
			opt.date = {preset : 'date',dateOrder: 'dMyy',};
			opt.datetime = {preset : 'datetime'};
			opt.time = {preset : 'time'};
			opt.default = {
				theme: 'android-ics light', //皮肤样式
				display: 'modal', //显示方式
				mode: 'scroller', //日期选择模式
				dateFormat: 'dd/mm/yyyy',
				lang: 'en-US',
				showNow: true,
				showLabel: false,
				nowText: '',
				setText: 'ĐẶT',
				cancelText: 'HỦY BỎ',
				startYear: currYear-60, //开始年份
				endYear: currYear + 10 //结束年份
			};

			var input_dates = document.querySelectorAll('.date-form input')
			input_dates.forEach(function(element, index){
				// var today = moment().format('YYYY-MM-DD');
				element.placeholder=dates
				element.style.textAlign = 'center';
				$(element).mobiscroll($.extend(opt['date'], opt['default']));
			});

			/*----------------- search --------------- */
			action = document.querySelectorAll('.dropbox_old select')
			action.forEach(element => {
				element.addEventListener('change',function (evt) {
					loc_list('BC_Nguyên Liệu');
				});
			});
			document.querySelector('.date-form button').addEventListener('click',function (evt) {
				loc_list('BC_Nguyên Liệu');
			});	
		break;
		case 'BC_Giao Ca':
			tmp = '<button class="btn-back" type="button" onclick="back_page();"><i class="ti-arrow-left"> </i>Quay Lại</button>'
			document.querySelector('.show_btn_back').innerHTML = tmp
			temp = {
				action: 'info-DoanhThu',
			}
			res = await instance.post('/cashier', temp);
			value = res.data.reverse()
			
			
			html +='<div class="table_responsive" id = "main_table">'
			html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
			html +=`	<caption style="text-align: left;">
							<h3>BÁO CÁO GIAO CA</h3>
							<p>Báo cáo doanh thu theo từng ca</p>
						</caption>`
			html +='	<thead style="background: none;">'
			html +='	<tr>'
			html +='		<th>STT</th>'
			html +='		<th>BẮT ĐẦU</th>'
			html +='		<th>NV.BẮT ĐẦU</th>'
			html +='		<th>KẾT THÚC</th>'
			html +='		<th>NV.KẾT THÚC</th>'
			html +='		<th>DOANH THU</th>'
			html +='		<th>DT.DỊCH VỤ</th>'
			html +='		<th>DT.KHÁC</th>'
			html +='		<th>TT.ĐIỆN TỬ</th>'
			html +='		<th>HOÀN TIỀN</th>'
			html +='		<th>CHI TIẾT</th>'
			html +='	</tr>'
			html +='	</thead>'
			html +='	<tbody id="list_order">'

			let STT =0
			value.forEach(function(element, index){
				let date_begin = element.date_begin
				let nv_begin =element.name
				let date_end =element.date_end
				let DT =money(element.DoanhThu)
				let nv_end =element.name
				let DT_DV =money(element.DT_dichvu)
				let DT_KHAC =money(element.DT_khac)
				let TT_DT =money(element.TT_dientu)
				let HT =money(element.Hoantien)


				html += `<tr>`
				
				html += `<td data-label="STT" style="text-align: center;">${STT}</td>`
				html += `<td data-label="BẮT ĐẦU" style="white-space: nowrap;">${date_begin}</td>`
				html += `<td data-label="NV.BẮT ĐẦU" style="text-align: center;">${nv_begin}</td>`
				html += `<td data-label="KẾT THÚC" style="white-space: nowrap;">${date_end}</td>`
				html += `<td data-label="NV.KẾT THÚC" style="text-align: center;">${nv_end}</td>`
				html += `<td data-label="DOANH THU" style="text-align: right;">${DT}</td>`
				html += `<td data-label="DT.DỊCH VỤ" style="text-align: right;">${DT_DV}</td>`
				html += `<td data-label="DT.KHÁC" style="text-align: right;">${DT_KHAC}</td>`
				html += `<td data-label="TT.ĐIỆN TỬ" style="text-align: right;">${TT_DT}</td>`
				html += `<td data-label="HOÀN TIỀN" style="text-align: right;">${HT}</td>`
				html += `<td data-label="CHI TIẾT">
							<div class="dropdown" style="background: none; border: 1px solid rgba(255, 255, 255, 0.5);">
								<div class="drop_btn nut_dropdown"><i class="ti-receipt"></i><i class="fa fa-angle-up"></i></div>
								<div class="noidung_dropdown" style="width: 150px; overflow: inherit; right: 0;">
									<button class="nhan_don" style="text-align: left; font-size: 16px;">Mặt Hàng</button>
									<button class="nhan_don" style="text-align: left; font-size: 16px;">Nguyên Liệu</button>
									<button class="nhan_don" style="text-align: left; font-size: 16px;">Đơn Hàng</button>
								</div>
							</div>
				</td>`

				html += '</tr>'
			});

			html += '</tbody>'
			html += '</table>'
			html += '</div>'

			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)
		break;
		case 'BC_Góp Ý/Yêu Cầu':
			tmp = '<button class="btn-back" type="button" onclick="back_page();"><i class="ti-arrow-left"> </i>Quay Lại</button>'
			document.querySelector('.show_btn_back').innerHTML = tmp

			html +='<div class="table_responsive" id = "main_table">'
			html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
			html +=`	<caption style="text-align: left;">
							<h3>GÓP Ý / YÊU CẦU</h3>
							<p>Lịch sử các góp ý / yêu cầu từ khách. Mặc định hiển thị dữ liệu trong 7 ngày gần nhất.</p>
							</br>
							<div class="date-form">
								<label>Từ Ngày</label>
								<input id="date_begin" type="text" autocomplete="off">
								<label>Đến Ngày</label>
								<input id="date_end" type="text" autocomplete="off">
								<button class="" type="button"><i class="ti-check-box"> </i>ÁP DỤNG</button>
							</div>
						</caption>`

			html +='	<thead style="background: none;">'
			html +='	<tr>'
			html +='		<th>STT</th>'
			html +='		<th>THỜI GIAN</th>'
			html +='		<th>KHÁCH HÀNG</th>'
			html +='		<th>GÓP Ý</th>'
			html +='		<th>CHI TIẾT</th>'
			html +='	</tr>'
			html +='	</thead>'
			html +='	<tbody id="list_order">'

			html += '</tbody>'
			html += '</table>'
			html += '</div>'

			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)

			loc_list('BC_Góp Ý / Yêu Cầu');

			/*---------- set date current ------------- */
			var datetimes = new Date()
			dates = datetimes.toLocaleDateString("vi-VN",{ year: 'numeric', month: '2-digit', day: '2-digit' }, {timeZone: "Asia/Ho_Chi_Minh"});		
			// $(function () {
			var currYear = datetimes.getFullYear();
			var opt={};
			opt.date = {preset : 'date',dateOrder: 'dMyy',};
			opt.datetime = {preset : 'datetime'};
			opt.time = {preset : 'time'};
			opt.default = {
				theme: 'android-ics light', //皮肤样式
				display: 'modal', //显示方式
				mode: 'scroller', //日期选择模式
				dateFormat: 'dd/mm/yyyy',
				lang: 'en-US',
				showNow: true,
				showLabel: false,
				nowText: '',
				setText: 'ĐẶT',
				cancelText: 'HỦY BỎ',
				startYear: currYear-60, //开始年份
				endYear: currYear + 10 //结束年份
			};

			var input_dates = document.querySelectorAll('.date-form input');
			
			input_dates.forEach(function(element, index){
				setTimeout(function(){
					element.placeholder=dates
					element.style.textAlign = 'center';
					$(element).mobiscroll($.extend(opt['date'], opt['default']));
				}, 1);
			});

			/*----------------- search --------------- */
			action = document.querySelectorAll('.dropbox_old select')
			action.forEach(element => {
				element.addEventListener('change',function (evt) {
					loc_list('BC_Góp Ý / Yêu Cầu');
				});
			});
			document.querySelector('.date-form button').addEventListener('click',function (evt) {
				loc_list('BC_Đơn Hàng');
			});	
		break;
		case 'BC_Nhập/Xuất Kho':
			tmp = '<button class="btn-back" type="button" onclick="back_page();"><i class="ti-arrow-left"> </i>Quay Lại</button>'
			document.querySelector('.show_btn_back').innerHTML = tmp

			temp = {action: 'popup-mathang'}
			res = await instance.post('/all-order', temp);

			temp_orders = {
				id: '',
				name: '',
				mota: '',
				sl: '',
				action: 'getNL',
				donvi: ''
			}
			NL = await instance.post('/inventory', temp_orders);

			temp_NV = {
				action: 'getNV'
			}
			NV = await instance.post('/all-order', temp_NV);

			html +='<div class="table_responsive" id = "main_table">'
			html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
			html +=`	<caption style="text-align: left;">
							<h3>Báo Cáo Nhập/Xuất Kho</h3>
							<p>Báo cáo nhập kho và điều chỉnh kho cho từng loại nguyên liệu theo thời điểm.</p>
							</br>
							<div class="date-form">
								<label>Từ Ngày</label>
								<input id="date_begin" type="text" autocomplete="off">
								<label>Đến Ngày</label>
								<input id="date_end" type="text" autocomplete="off">
								<button class="" type="button"><i class="ti-check-box"> </i>ÁP DỤNG</button>
							</div>
							</br>`

							/* Bộ lọc */

			html +=`		<div class="order_search" style="display: flex; width:100%; -webkit-flex-wrap: wrap; flex-wrap: wrap;">

								<div class="dropbox_old" id="search_NV" style="margin: 15px 5px 15px 0px;">
									<select>
										<option>Nhân Viên</option>`
										/*-------------- sort Alphabetically xắp sếp ----------- */
										sortedList = NV.data.sort((a, b) =>
										a.UserName.localeCompare(b.UserName));
										sortedList.forEach(function(element, index){
											const name = element.UserName
											html+= `<option>${name}</option>`
											
										});								
			html +=`				</select>
									<i class="ti-angle-down"></i>
									<i class="ti-check"></i>
									<i class="ti-alert"></i>
								</div>

								<div class="dropbox_old" id="search_NL" style="margin: 15px 5px;">
									<select>
										<option>Nguyên Liệu</option>`
										/*-------------- sort Alphabetically xắp sếp ----------- */
										var sortedList_NL = NL.data.sort((a, b) =>
											a.name.localeCompare(b.name));
										sortedList_NL.forEach(function(element, index){
											const name = element.name
											html+= `<option>${name}</option>`
											
										});			
		html+=` 					</select>
									<i class="ti-angle-down"></i>
									<i class="ti-check"></i>
									<i class="ti-alert"></i>
								</div>

								<div class="dropbox_old" id="search_Thaotac" style="margin: 15px 5px;">
									<select>
										<option>Thao Tác</option>
										<option>Nhập Kho</option>
										<option>Điều Chỉnh</option>
									</select>
									<i class="ti-angle-down"></i>
									<i class="ti-check"></i>
									<i class="ti-alert"></i>
								</div>												
							</div>					
						</caption>`

			html +='	<thead style="background: none;">'
			html +='	<tr>'
			html +='		<th>STT</th>'
			html +='		<th>THỜI GIAN</th>'
			html +='		<th>NHÂN VIÊN</th>'
			html +='		<th>NGUYÊN LIỆU</th>'
			html +='		<th>THAO TÁC</th>'
			html +='		<th>SỐ LƯỢNG</th>'
			html +='		<th>TỒN KHO TRƯỚC</th>'
			html +='		<th>TỒN KHO SAU</th>'
			html +='		<th>GIÁ NHẬP</th>'
			html +='		<th>TỔNG</th>'
			html +='	</tr>'
			html +='	</thead>'
			html +='	<tbody id="list_order">'

			html += '</tbody>'
			html += '</table>'
			html += '</div>'

			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)

			loc_list('BC_Nhập/Xuất Kho');

			/*---------- set date current ------------- */
			var datetimes = new Date()
			dates = datetimes.toLocaleDateString("vi-VN",{ year: 'numeric', month: '2-digit', day: '2-digit' }, {timeZone: "Asia/Ho_Chi_Minh"});		
			// $(function () {
			var currYear = datetimes.getFullYear();
			var opt={};
			opt.date = {preset : 'date',dateOrder: 'dMyy',};
			opt.datetime = {preset : 'datetime'};
			opt.time = {preset : 'time'};
			opt.default = {
				theme: 'android-ics light', //皮肤样式
				display: 'modal', //显示方式
				mode: 'scroller', //日期选择模式
				dateFormat: 'dd/mm/yyyy',
				lang: 'en-US',
				showNow: true,
				showLabel: false,
				nowText: '',
				setText: 'ĐẶT',
				cancelText: 'HỦY BỎ',
				startYear: currYear-60, //开始年份
				endYear: currYear + 10 //结束年份
			};

			var input_dates = document.querySelectorAll('.date-form input')
			input_dates.forEach(function(element, index){
				// var today = moment().format('YYYY-MM-DD');
				element.placeholder=dates
				element.style.textAlign = 'center';
				$(element).mobiscroll($.extend(opt['date'], opt['default']));
			});

			/*----------------- search --------------- */
			action = document.querySelectorAll('.dropbox_old select')
			action.forEach(element => {
				element.addEventListener('change',function (evt) {
					loc_list('BC_Nhập/Xuất Kho');
				});
			});
			document.querySelector('.date-form button').addEventListener('click',function (evt) {
				loc_list('BC_Nhập/Xuất Kho');
			});	
		break;
		case 'BC_Tồn Kho':
			tmp = '<button class="btn-back" type="button" onclick="back_page();"><i class="ti-arrow-left"> </i>Quay Lại</button>'
			document.querySelector('.show_btn_back').innerHTML = tmp

			temp = {action: 'popup-mathang'}
			res = await instance.post('/all-order', temp);

			temp_order = {
				action: 'getMH'
			}
			MH = await instance.post('/mathang', temp_order);

			temp_orders = {
				id: '',
				name: '',
				mota: '',
				sl: '',
				action: 'getNL',
				donvi: ''
			}
			NL = await instance.post('/inventory', temp_orders);

			html +='<div class="table_responsive" id = "main_table">'
			html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
			html +=`	<caption style="text-align: left;">
							<h3>Báo Cáo Tồn Kho</h3>
							<p>Báo cáo tồn kho cho từng loại nguyên liệu theo thời điểm.</p>

							</br>
							`

							/* Bộ lọc */

			html +=`		<div class="order_search" style="display: flex; width:100%; -webkit-flex-wrap: wrap; flex-wrap: wrap;">

								<div class="dropbox_old" id="search_DM" style="margin: 15px 5px 15px 0px;">
										<select>
											<option>Danh Mục</option>`
											/*-------------- sort Alphabetically xắp sếp ----------- */
											sortedList = res.data.danhmuc.sort((a, b) =>
												a.name.localeCompare(b.name));
											sortedList.forEach(function(element, index){
												const name = element.name
												html+= `<option>${name}</option>`
												
											});								
				html +=`				</select>
										<i class="ti-angle-down"></i>
										<i class="ti-check"></i>
										<i class="ti-alert"></i>
									</div>

								<div class="dropbox_old" id="search_MH" style="margin: 15px 5px;">
										<select>
											<option>Mặt Hàng</option>`
											/*-------------- sort Alphabetically xắp sếp ----------- */
											sortedList_MH = MH.data.sort((a, b) =>
												a.name.localeCompare(b.name));
											// console.log(sortedList);
											sortedList_MH.forEach(function(element, index){
												const name = element.name
												html+= `<option>${name}</option>`
												
											});			
			html+=` 					</select>
										<i class="ti-angle-down"></i>
										<i class="ti-check"></i>
										<i class="ti-alert"></i>
									</div>
								<div class="dropbox_old" id="search_NL" style="margin: 15px 5px;">
										<select>
											<option>Nguyên Liệu</option>`
											/*-------------- sort Alphabetically xắp sếp ----------- */
											sortedList_NL = NL.data.sort((a, b) =>
												a.name.localeCompare(b.name));
											sortedList_NL.forEach(function(element, index){
												const name = element.name
												html+= `<option>${name}</option>`
												
											});			
			html+=` 					</select>
										<i class="ti-angle-down"></i>
										<i class="ti-check"></i>
										<i class="ti-alert"></i>
								</div>						
							</div>					
						</caption>`

			html +='	<thead style="background: none;">'
			html +='	<tr>'
			html +='		<th>STT</th>'
			html +='		<th style="text-align: left;">NGUYÊN LIỆU</th>'
			html +='		<th>TỒN KHO</th>'
			html +='		<th style="text-align: right;">GIÁ NHẬP TRUNG BÌNH</th>'
			html +='		<th style="text-align: right;">TỔNG</th>'
			html +='	</tr>'
			html +='	</thead>'
			html +='	<tbody id="list_order">'

			html += '</tbody>'
			html += '</table>'
			html += '</div>'

			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)

			loc_list('BC_Tồn Kho');

			
			/*----------------- search --------------- */
			action = document.querySelectorAll('.dropbox_old select')
			action.forEach(element => {
				element.addEventListener('change',function (evt) {
					loc_list('BC_Tồn Kho');
				});
			});
		break;
		case 'BC_Xuất Báo Cáo':
			tmp = '<button class="btn-back" type="button" onclick="back_page();"><i class="ti-arrow-left"> </i>Quay Lại</button>'
			document.querySelector('.show_btn_back').innerHTML = tmp

			html +='<div class="table_responsive" id = "main_table">'
			html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
			html +=`	<caption style="text-align: left;">
							<h3>Xuất Báo Cáo</h3>
							<p>Để xuất báo cáo, vui lòng vào từng trang báo cáo muốn xuất (chọn các tiêu chí nếu cần) và nhấn Xuất Báo Cáo cuối trang. Kết quả báo cáo có thể tải về sẽ hiển thị dưới đây.</p>						
						</caption>`

			html +='	<thead style="background: none;">'
			html +='	<tr>'
			html +='		<th>STT</th>'
			html +='		<th style="text-align: left;">LOẠI BÁO CÁO</th>'
			html +='		<th>NHÂN VIÊN YÊU CẦU</th>'
			html +='		<th>TRẠNG THÁI</th>'
			html +='		<th >THỜI GIAN</th>'
			html +='	</tr>'
			html +='	</thead>'
			html +='	<tbody id="list_order">'

					html += `<tr>`
					html += `<td data-label="STT" style="text-align: center;">1</td>`
					html += `<td data-label="LOẠI BÁO CÁO" style="white-space: nowrap;text-align: left;">Giao Ca</td>`
					html += `<td data-label="NHÂN VIÊN YÊU CẦU" style="text-align: center; width:80px;">${user_login}</td>`
					html += `<td data-label="TRẠNG THÁI" style="text-align: center;">Sẵn Sàng</td>`
					html += `<td data-label="THỜI GIAN" style="white-space: nowrap;text-align: center;">${Date_tmp}</td>`
					html += `<td data-label="" style="text-align: center;"><i class="ti-download BC"></i></td>`
					html += '</tr>'

					html += `<tr>`
					html += `<td data-label="STT" style="text-align: center;">2</td>`
					html += `<td data-label="LOẠI BÁO CÁO" style="white-space: nowrap;text-align: left;">Tồn Kho</td>`
					html += `<td data-label="NHÂN VIÊN YÊU CẦU" style="text-align: center; width:80px;">${user_login}</td>`
					html += `<td data-label="TRẠNG THÁI" style="text-align: center;">Sẵn Sàng</td>`
					html += `<td data-label="THỜI GIAN" style="white-space: nowrap;text-align: center;">${Date_tmp}</td>`
					html += `<td data-label="" style="text-align: center;"><i class="ti-download BC"></i></td>`
					html += '</tr>'

					html += `<tr>`
					html += `<td data-label="STT" style="text-align: center;">3</td>`
					html += `<td data-label="LOẠI BÁO CÁO" style="white-space: nowrap;text-align: left;">Bán Hàng Tổng Hợp(Mặt Hàng)</td>`
					html += `<td data-label="NHÂN VIÊN YÊU CẦU" style="text-align: center; width:80px;">${user_login}</td>`
					html += `<td data-label="TRẠNG THÁI" style="text-align: center;">Sẵn Sàng</td>`
					html += `<td data-label="THỜI GIAN" style="white-space: nowrap;text-align: center;">${Date_tmp}</td>`
					html += `<td data-label="" style="text-align: center;"><i class="ti-download BC"></i></td>`
					html += '</tr>'

					html += `<tr>`
					html += `<td data-label="STT" style="text-align: center;">4</td>`
					html += `<td data-label="LOẠI BÁO CÁO" style="white-space: nowrap;text-align: left;">Bán Hàng Tổng Hợp(Nguyên Liệu)</td>`
					html += `<td data-label="NHÂN VIÊN YÊU CẦU" style="text-align: center; width:80px;">${user_login}</td>`
					html += `<td data-label="TRẠNG THÁI" style="text-align: center;">Sẵn Sàng</td>`
					html += `<td data-label="THỜI GIAN" style="white-space: nowrap;text-align: center;">${Date_tmp}</td>`
					html += `<td data-label="" style="text-align: center;"><i class="ti-download BC"></i></td>`
					html += '</tr>'

					html += `<tr>`
					html += `<td data-label="STT" style="text-align: center;">5</td>`
					html += `<td data-label="LOẠI BÁO CÁO" style="white-space: nowrap;text-align: left;">Bán Hàng Tổng Hợp(Đơn Hàng)</td>`
					html += `<td data-label="NHÂN VIÊN YÊU CẦU" style="text-align: center; width:80px;">${user_login}</td>`
					html += `<td data-label="TRẠNG THÁI" style="text-align: center;">Sẵn Sàng</td>`
					html += `<td data-label="THỜI GIAN" style="white-space: nowrap;text-align: center;">${Date_tmp}</td>`
					html += `<td data-label="" style="text-align: center;"><i class="ti-download BC"></i></td>`
					html += '</tr>'

					html += `<tr>`
					html += `<td data-label="STT" style="text-align: center;">6</td>`
					html += `<td data-label="LOẠI BÁO CÁO" style="white-space: nowrap;text-align: left;">Góp Ý/Yêu Cầu</td>`
					html += `<td data-label="NHÂN VIÊN YÊU CẦU" style="text-align: center; width:80px;">${user_login}</td>`
					html += `<td data-label="TRẠNG THÁI" style="text-align: center;">Sẵn Sàng</td>`
					html += `<td data-label="THỜI GIAN" style="white-space: nowrap;text-align: center;">${Date_tmp}</td>`
					html += `<td data-label="" style="text-align: center;"><i class="ti-download BC"></i></td>`
					html += '</tr>'

			html += '</tbody>'
			html += '</table>'
			html += '</div>'

			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)

			var print = document.querySelectorAll('table .ti-download')
			print.forEach(function(element, index){
				let text = element.parentNode.parentNode.children[1].innerText;
				element.addEventListener('click',function (evt) {
					ExportData(text);
				});
			});
		break;
		case 'BC_Nhật Ký Thao Tác':
			tmp = '<button class="btn-back" type="button" onclick="back_page();"><i class="ti-arrow-left"> </i>Quay Lại</button>'
			document.querySelector('.show_btn_back').innerHTML = tmp
	
			html +='<div class="table_responsive" id = "main_table">'
			html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
			html +=`	<caption style="text-align: left;">
							<h3>Nhật Ký Thao Tác</h3>
							<p>Lịch sử thao tác của nhân viên. Mặc định hiển thị dữ liệu trong ngày.</p>
							</br>
							<div class="date-form">
								<label>Từ Ngày</label>
								<input id="date_begin" type="text" autocomplete="off">
								<label>Đến Ngày</label>
								<input id="date_end" type="text" autocomplete="off">
								<button class="" type="button"><i class="ti-check-box"> </i>ÁP DỤNG</button>
							</div>
							</br>
						</caption>`
	
			html +='	<thead style="background: none;">'
			html +='	<tr>'
			html +='		<th>STT</th>'
			html +='		<th>THỜI GIAN</th>'
			html +='		<th>TÀI KHOẢN</th>'
			html +='		<th>THAO TÁC</th>'
			html +='		<th>ĐỐI TƯỢNG</th>'
			html +='		<th></th>'
			html +='	</tr>'
			html +='	</thead>'
			html +='	<tbody id="list_order">'
	
			html += '</tbody>'
			html += '</table>'
			html += '</div>'
	
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)
	
			loc_list('BC_Nhật Ký Thao Tác');
	
			/*---------- set date current ------------- */
			var datetimes = new Date()
			dates = datetimes.toLocaleDateString("vi-VN",{ year: 'numeric', month: '2-digit', day: '2-digit' }, {timeZone: "Asia/Ho_Chi_Minh"});		
			// $(function () {
			var currYear = datetimes.getFullYear();
			var opt={};
			opt.date = {preset : 'date',dateOrder: 'dMyy',};
			opt.datetime = {preset : 'datetime'};
			opt.time = {preset : 'time'};
			opt.default = {
				theme: 'android-ics light', //皮肤样式
				display: 'modal', //显示方式
				mode: 'scroller', //日期选择模式
				dateFormat: 'dd/mm/yyyy',
				lang: 'en-US',
				showNow: true,
				showLabel: false,
				nowText: '',
				setText: 'ĐẶT',
				cancelText: 'HỦY BỎ',
				startYear: currYear-60, //开始年份
				endYear: currYear + 10 //结束年份
			};
	
			var input_dates = document.querySelectorAll('.date-form input')
			input_dates.forEach(function(element, index){
				// var today = moment().format('YYYY-MM-DD');
				element.placeholder=dates
				element.style.textAlign = 'center';
				$(element).mobiscroll($.extend(opt['date'], opt['default']));
			});
	
			/*----------------- search --------------- */
			document.querySelector('.date-form button').addEventListener('click',function (evt) {
				loc_list('BC_Nhật Ký Thao Tác');
			});
		break;
		case 'Cơ Bản':
			html +=`<div class="lines" data-text="Logo phòng máy"></div>`

			html += `<div class="row">
						<div class="col l-3 border" style="width:100%;">
							<div class="course-item" style= "color: white; margin: 10px 0;">
								<!-- ------------- html upload ---------------- -->
								<div class="page-upload">

									<div class="header">
										<span>Cài đặt Logo Phòng Máy</span>
									</div>
									<input type="file" id="file_input" class="upload-box popup-input photo_MH" accept="image/gif, image/jpeg, image/png" onchange="readURL(this)" hidden=""/>
									<div class="box">
										<div class="content-upload">
											<label for="file_input">
												<img id="blah" alt="Chọn Ảnh Mặt Hàng" src="images_order/no-image.jpg"/>
											</label>                                        
										</div>
									</div>
								</div>
								<small style="color: grey; margin:0 20px; font-size: 16px;">Logo sẽ được hiển thị trên KLMenu tại các máy trạm. Chấp nhận các định dạng: <code>.gif, .jpg, .jpeg, .png</code>. Dung lượng file <code>≤2MB</code>.</small>
							</div>
						</div>
					</div>
					`
			html +=`<div class="lines" data-text="Tích Hợp csm/gcafe"></div>`

			html += `<div class="row">
						<div class="col l-3 border">
							<div class="course-item" style= "color: white; margin: 10px 0;">
								<div class="header">
									<span>Tích hợp csm/gcafe</span>
								</div>
								<div class="importan-note" style="border-radius: 0; margin:10px; padding: 10px;">
									<span>Kết nối dữ liệu CSM/GCafe với KLMenu để có thể theo dõi tình hình hoạt động phòng máy từ xa (tình trạng máy online, doanh thu tiền nạp, ...).</span>
								</div>
								<div class="input-field">
									<input type="text" required spellcheck="false" class="popup-input price_MH" id="number-input" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);"> 
									<label style="color: grey;">Nhập Mật Khẩu MySql CSM</label>
									<i class="ti-check"></i>
									<i class="ti-alert"></i>
								</div>
							</div>
						</div>

						<div class="col l-3 border">
							<div class="course-item" style= "color: white; margin-top: 5px;">
								<div class="header">
									<span>Backup Data KLMenu</span>
								</div>
								<div class="importan-note" style="border-radius: 0; margin:10px; padding: 10px;">
									<span>Dữ liệu  cũ của phòng máy sẽ mất nếu thay đổi thiết lập . Để tránh mất mát dữ liệu, hãy liên hệ với chúng tôi để thao tác đổi  Id.</span>
								</div>
								

							</div>
						</div>
					</div>
					`

			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)
		break;
		case 'Máy In':
			
			tmp = `
			<div class='thietlapca'> 
				<div class="dropdown">
				<div class="drop_btn nut_dropdown" onclick="call_popup(this)"><i class="ti-plus"> THÊM MÁY IN</i></div>
				</div>
			</div>`
			document.querySelector('.show_btn_back').innerHTML = tmp

			html +=`<div class="grid wide container_nv">
						<div class="row">
							<div class="col l-1">
								<div class="course-item" style= "background: var(--light); padding: 20px; color: grey; margin-top: 5px;border-radius: 5px;">
									<h1 style="color: white;">Tính Năng Từ Xa</h1>
									<p>Tính năng <strong>in từ xa</strong> giúp nhân viên phòng máy có thể linh hoạt in đơn từ bất cứ thiết bị nào (điện thoại, PC, laptop), ở bất cứ đâu (không cần dùng chung một mạng LAN), chỉ cần tài khoản nhân viên có quyền xủ lý đơn hàng đều có thể thực hiện lệnh in.</p>
									<p class="mb-0">Để sử dụng tính năng <strong>in từ xa</strong>, máy tính đã cài đặt máy in (<strong>Host</strong>) phải mở <strong>KLMenu Client</strong> để tiếp nhận lệnh in. Bạn cần đảm bảo rằng KLMenu Client luôn được mở trên máy tính có kết nối tới máy in để tính năng in không bị gián đoạn. Ngoài ra bạn cần cập nhật lại thiết lập của máy in để cung cấp chính xác <strong>Computer Name</strong>.</p>
								</div>
							</div> 

							<div class="col l-2">
								<div class="course-item">`
						
			// html += `
			// <div class='thietlapca'> 
			// 	<div class="dropdown">
			// 		<div class="drop_btn nut_dropdown" onclick="switch_tab(this, 'coban')"><i class="ti-plus"> THÊM MÁY IN</i> </div>
			// 	</div>
			// </div>`
			html +='<div class="table_responsive" id = "main_table">'
			// class="paginated"
			html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated">'
			html += `<caption style="padding: 10px;border: 1px solid rgba(255, 255, 255, 0.1); text-align: left;"><h2>DANH SÁCH MÁY IN</h2></caption>`
			html +='	<thead>'
			html +='	<tr>'
			html +='		<th>NHÃN</th>'
			html +='		<th>MÁY IN</th>'
			html +='		<th>HOST</th>'
			html +='		<th>IN GIỎ HÀNG</th>'
			html +='		<th>IN 2 LIÊN</th>'
			html +='		<th>THAO TÁC</th>'
			html +='	</tr>'
			html +='	</thead>'
			html +='	<tbody>'
			
			html += '<tr>'
			html += '<td data-label="NHÃN" class="time" style="white-space: nowrap;">In Bar/Bếp</td>'
			html += `<td data-label="MÁY IN" class="time">`
						for (var n = 0; n < 2; n++) {
							html +=`<p class="danhmuc">${'58 Printer '+n}</p>`
						}
			html += `</td>`
			html += '<td data-label="HOST" class="time">192.168.1.6</td>'
			html += `<td data-label="IN GIỎ HÀNG">
						<label for="a" class="toggle_checkbox"> 
						<input type="checkbox" id='a' class="toggle_input" hidden=""/>
						<div class="toggle_bar">
							<div class="toggle_spin"></div>
						</div>
					</td>`
			html += `<td data-label="IN 2 LIÊN">
						<label for="b" class="toggle_checkbox"> 
						<input type="checkbox" id='b' class="toggle_input" hidden=""/>
						<div class="toggle_bar">
							<div class="toggle_spin"></div>
						</div>
					</td>`
			html += '<td data-label="THAO TÁC"><div class="danhmuc_thaotac"><i class="far fa-edit"></i> <i class="far fa-trash-alt"></i>'
			html += `
							<div class="dropdown" style="background: none;">
								<div class="drop_btn_2 nut_dropdown_2" style="padding: 3px;"><i class="ti-printer"></i><i class="fa fa-angle-up" style="style="float: right;"></i></div>
								<div class="noidung_dropdown" style="width: 150px; overflow: inherit; right: 0;">
									<!-- <button class="nhan_don" style="text-align: left; font-size: 16px;">58 Printer</button> -->
									
								</div>
							</div>
					</div></td>`
			html += '</tr>'

			html += '<tr>'
			html += '<td data-label="NHÃN" class="time" style="white-space: nowrap;">In Bill</td>'
			html += `<td data-label="MÁY IN" class="time">`
						for (var n = 0; n < 2; n++) {
							html +=`<p class="danhmuc">${'58 Printer '+n}</p>`
						}
			html += `</td>`
			html += '<td data-label="HOST" class="time">192.168.1.6</td>'
			html += `<td data-label="IN GIỎ HÀNG">
						<label for="a" class="toggle_checkbox"> 
						<input type="checkbox" id='a' class="toggle_input" hidden=""/>
						<div class="toggle_bar">
							<div class="toggle_spin"></div>
						</div>
					</td>`
			html += `<td data-label="IN 2 LIÊN">
						<label for="b" class="toggle_checkbox"> 
						<input type="checkbox" id='b' class="toggle_input" hidden=""/>
						<div class="toggle_bar">
							<div class="toggle_spin"></div>
						</div>
					</td>`
			html += '<td data-label="THAO TÁC"><div class="danhmuc_thaotac"><i class="far fa-edit"></i> <i class="far fa-trash-alt"></i>'
			html += `
							<div class="dropdown" style="background: none;">
								<div class="drop_btn_2 nut_dropdown_2" style="padding: 3px;"><i class="ti-printer"></i><i class="fa fa-angle-up" style="style="float: right;"></i></div>
								<div class="noidung_dropdown" style="width: 150px; overflow: inherit; right: 0;">
									<!-- <button class="nhan_don" style="text-align: left; font-size: 16px;">58 Printer</button> -->
									
								</div>
							</div>
					</div></td>`
			html += '</tr>'

			html += '<tr>'
			html += '<td data-label="NHÃN" class="time" style="white-space: nowrap;">In Tem</td>'
			html += `<td data-label="MÁY IN" class="time">`
						for (var n = 0; n < 2; n++) {
							html +=`<p class="danhmuc">${'58 Printer '+n}</p>`
						}
			html += `</td>`
			html += '<td data-label="HOST" class="time">192.168.1.6</td>'
			html += `<td data-label="IN GIỎ HÀNG">
						<label for="a" class="toggle_checkbox"> 
						<input type="checkbox" id='a' class="toggle_input" hidden=""/>
						<div class="toggle_bar">
							<div class="toggle_spin"></div>
						</div>
					</td>`
			html += `<td data-label="IN 2 LIÊN">
						<label for="b" class="toggle_checkbox"> 
						<input type="checkbox" id='b' class="toggle_input" hidden=""/>
						<div class="toggle_bar">
							<div class="toggle_spin"></div>
						</div>
					</td>`
			html += '<td data-label="THAO TÁC"><div class="danhmuc_thaotac"><i class="far fa-edit"></i> <i class="far fa-trash-alt"></i>'
			html += `
							<div class="dropdown" style="background: none;">
								<div class="drop_btn_2 nut_dropdown_2" style="padding: 3px;"><i class="ti-printer"></i><i class="fa fa-angle-up" style="style="float: right;"></i></div>
								<div class="noidung_dropdown" style="width: 150px; overflow: inherit; right: 0;">
									<!-- <button class="nhan_don" style="text-align: left; font-size: 16px;">58 Printer</button> -->
									
								</div>
							</div>
					</div></td>`
			html += '</tr>'


			html += '</tbody>'
			html += '</table>'
			html += '</div>'


			html += `</div></div>
					</div>
					</div>`
					
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)
			

			// let print_tmp = document.querySelectorAll('.noidung_dropdown')
			//     print_tmp.forEach(element => {
			//         html = `<button class="nhan_don" style="text-align: left; font-size: 16px;">58 Printerss</button>`
			//         element.insertAdjacentHTML("afterbegin",html)
			//     });


			/*----------------- search --------------- */
			action = document.querySelectorAll('.danhmuc_thaotac i')
			action.forEach(element => {
				element.addEventListener('click',function (evt) {
					console.log(this.className)
					console.log('print_bill');
					// if (this.className==='ti-plus'){
					// 	chinhsua_show_popup(this, this.className)
					// }else if (this.className==='far fa-edit'){

					// }else if (this.className==='far fa-trash-alt'){

					// }
				});
			});

			console.log('add_may_in');
			console.log(JSON.stringify({'may in': 'abcd'}))
		break;
		case 'Nhân Viên':
			tmp = `
			<div class='thietlapca'> 
				<div class="dropdown">
					<div class="drop_btn nut_dropdown" onclick="call_popup('DM_NHANVIEN','add_nv')"><i class="fa fa-users" aria-hidden="true"></i>Thêm Nhân Viên</div>
				</div>
			</div>`
			document.querySelector('.show_btn_back').innerHTML = tmp
			html += `<div class="nv_container">`
			//add vitri hoac ten khach hang ten nv
			temp = {action: 'get_user',}
			res = await instance.post('/user', temp);
			value = res.data
			console.log(value)
			for (let index = 0; index < value.length; index++) {
				const element = value[index];
				let name = element.name;
				let photo = element.photo;
				html+= `<div class="profile-box">
							<i class="ti-settings menu-icon"></i>
							<i class="ti-trash setting-icon"></i>
							<div class="avatar_photo">${photo}</div>
							<h3> ${name}</h3>
							<p>Chủ phòng máy</p>
							<button type="button" class="phanquyen">Quyền Hạn</button>
							<div class="profile-bottom">
								<p>Tất cả các quyền thao tác trên KLMenu</p>
								<h5 class='kichhoat'>Đã kích hoat</h5>
								<div class="quyenhan">
									
								</div>
							</div>
						</div>`
				
			}
			html += `</div>`
			let htmldd = `<div class="nv_container">
						<div class="profile-box">
							<img src="images/menu.png" class="menu-icon">
							<img src="images_order/thungrac.png" class="setting-icon" onclick="call()">
							<img src="images/profile-pic.png" class="profile-pic">
							<h3> Nhân viên Tèo</h3>
							<p>Chủ phòng máy</p>
							<button type="button">Quyền Hạn</button>
							<div class="profile-bottom">
								<p>Tất cả các quyền thao tác trên KLMenu</p>
								<h5 class='kichhoat'>Đã kích hoat</h5>
								<div class="quyenhan">
									
								</div>
								<!-- <img src="images/arrow.png"> -->
							</div>
						</div>
						
						<div class="profile-box">
							<img src="images/menu.png" class="menu-icon">
							<img src="images/setting.png" class="setting-icon" onclick="call()">
							<img src="images/profile-pic.png" class="profile-pic">
							<h3> Nhân viên Tèo</h3>
							<p>Chủ phòng máy</p>
							<button type="button">Quyền Hạn</button>
							<div class="profile-bottom">
								<!-- <p>Tất cả các quyền thao tác trên KLMenu</p> -->
								<h5 class='kichhoat'>Đã kích hoat</h5>
								<div class="quyenhan">
									<h5>Trạng thái Đơn Hàng</h5>
									<h5>Trạng thái Đơn Hàng</h5>
									<h5>Trạng thái Đơn Hàng</h5>
									<h5>Trạng thái Đơn Hàng</h5>
									<h5>Trạng thái Đơn Hàng</h5>
									<h5>Đơn Hàng</h5>
									<h5>Báo Cáo</h5>
									<h5>Ca</h5>
								</div>
								<!-- <img src="images/arrow.png"> -->
							</div>
						</div>
					
						<div class="profile-box">
							<img src="images/menu.png" class="menu-icon">
							<img src="images/setting.png" class="setting-icon" onclick="call()">
							<img src="images/profile-pic.png" class="profile-pic">
							<h3> Nhân viên Tèo</h3>
							<p>Chủ phòng máy</p>
							<button type="button">Quyền Hạn</button>
							<div class="profile-bottom">
								<p>Tất cả các quyền thao tác trên KLMenu</p>
								<h5 class='kichhoat'>Đã kích hoat</h5>
								<div class="quyenhan">
									<h5>Trạng thái Đơn Hàng</h5>
									<h5>Trạng thái Đơn Hàng</h5>
									<h5>Trạng thái Đơn Hàng</h5>
									<h5>Trạng thái Đơn Hàng</h5>
									<h5>Trạng thái Đơn Hàng</h5>
									<h5>Đơn Hàng</h5>
									<h5>Báo Cáo</h5>
									<h5>Ca</h5>
								</div>
								<!-- <img src="images/arrow.png"> -->
							</div>
						</div>
					
						
					
					</div>`
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)

			let phanquyen = document.querySelectorAll('.nv_container .phanquyen')
			phanquyen.forEach(element => {
				element.addEventListener('click', function (event) {
					console.log('dd')
					call_popup('DM_NHANVIEN','phanquyen_nv', this);
				})
			});

			let del_account = document.querySelectorAll('.nv_container .setting-icon')
			del_account.forEach(element => {
				element.addEventListener('click', function (event) {
					console.log('dd')
					call_popup('DM_NHANVIEN','phanquyen_nv', this);
				})
			});

			let chinhsua = document.querySelectorAll('.nv_container .menu-icon')
			chinhsua.forEach(element => {
				element.addEventListener('click', function (event) {
					console.log('dd')
					// call_popup('DM_NHANVIEN','phanquyen_nv', this);
				})
			});


		break;
		case 'Danh Mục':
			tmp = `
			<div class='thietlapca'> 
				<div class="dropdown">
					<div class="drop_btn nut_dropdown" onclick="call_popup('DM_DANHMUC','create')"><i class="ti-plus"> THÊM DANH MỤC</i> </div>
				</div>
			</div>`
			document.querySelector('.show_btn_back').innerHTML = tmp
			html +='<div class="table_responsive" id = "main_table">'
			html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
			html += `<caption style="padding: 10px;border: 1px solid rgba(255, 255, 255, 0.1); text-align: left; color:grey;"><h3>DANH SÁCH DANH MỤC</h2></caption>`
			html +='	<thead>'
			html +='	<tr>'
			html +='		<th>TÊN</th>'
			html +='		<th>MÔ TẢ</th>'
			html +='		<th>DANH MỤC CHA</th>'
			html +='		<th>DOANH THU KHÁC</th>'
			html +='		<th>MỞ BÁN</th>'
			html +='		<th>THAO TÁC</th>'
			html +='	</tr>'
			html +='	</thead>'
			html +='	<tbody>'
			temp_order = {action: 'getDM'}
			var DM = await instance.post('/danhmuc', temp_order);
			temp_order={action: 'color'};
			/*-------------- sort Alphabetically xắp sếp ----------- */
			sortedList = DM.data.sort((a, b) =>
				a.name.localeCompare(b.name));
			html += await render_rows(sortedList, 'DM_DANHMUC')

			html += '</tbody>'
			html += '</table>'
			html += '</div>'
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)
			/* func btn in table */
			btn = main.querySelectorAll('i')
			btn.forEach((el, i) => {
				el.addEventListener('click',function (evt) {
					xuly_before_call_popup(el);
				});
			});

			/*----------- func check mobanDM ------------ */
			moban = main.querySelectorAll('.toggle_input')
			moban.forEach((el, i) => {
				el.addEventListener('change',async function (evt) {
					let id = el.id.replace('a','')
					let temp_order = {
						id: id,
						mobanDM: (el.checked?'checked':'unchecked'),
						action: 'mobanDM',
					}
					let mobanDM = await instance.post('/danhmuc', temp_order);
				});
			});
			break;
		case 'Mặt Hàng':
			tmp = `
			<div class='thietlapca'> 
				<div class="dropdown">
					<div class="drop_btn nut_dropdown" onclick="call_popup('DM_MATHANG','create')"><i class="ti-plus"> THÊM MẶT HÀNG</i> </div>
				</div>
			</div>`
			document.querySelector('.show_btn_back').innerHTML = tmp
			html +='<div class="table_responsive" id = "main_table">'
			// class="paginated"
			html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
			html += `<caption style="padding: 10px;border: 1px solid rgba(255, 255, 255, 0.1); text-align: left; color:grey;">
						<div style=" display: flex; width:100%;justify-content: space-between; margin: 10px 0 20px 0; align-items: center;">
							<h2>DANH SÁCH MẶT HÀNG</h2>
							<div style="display: flex; align-items: center;">
								<label style="font-weight: 400; color: var(--white_text);">MỞ BÁN</label>
								<div class="dropbox_old">
									<select class="popup-input search_moban">
										<option value='TC'>Tất Cả</option>
										<option value=true>Đang Mở Bán</option>
										<option value=false>Tắt Mở Bán</option>
									</select>
									<i class="ti-angle-down"></i>
									<i class="ti-check"></i>
									<i class="ti-alert"></i>
								</div>
							</div>
						</div>
					</caption>`
			html +='	<thead>'
			html +='	<tr>'
			html +='		<th>STT</th>'
			html +='		<th>ẢNH</th>'
			html +='		<th>TÊN</th>'
			html +='		<th>ĐƠN GIÁ</th>'
			html +='		<th>TỒN KHO</th>'
			html +='		<th>DANH MỤC</th>'
			html +='		<th>MỞ BÁN</th>'
			html +='		<th>KHÓA</th>'
			html +='		<th>HẸN GIỜ</th>'
			html +='		<th>THAO TÁC</th>'
			html +='	</tr>'
			html +='	</thead>'
			html +='	<tbody>'
			
			temp_order = {action: 'getMH'}
			let MH = await instance.post('/mathang', temp_order);
			console.table(MH.data)
			/*-------------- sort Alphabetically xắp sếp ----------- */
			sortedList = MH.data.sort((a, b) =>a.name.localeCompare(b.name));
			html += await render_rows(sortedList, 'DM_MATHANG')
			html += '</tbody>'
			html += '</table>'
			html += '</div>'		
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)

			/*-------- func search_moban --------- */
			let search_mb = document.querySelector('.popup-input.search_moban')
			search_mb.addEventListener('click',async function (evt) {
				console.log(this.value)
				search_order('moban', this.value)
			});

			/* func btn in table */
			btn = main.querySelectorAll('i')
			btn.forEach((el, i) => {
				el.addEventListener('click',function (evt) {
					xuly_before_call_popup(el);
				});
			});

			/*----------- func check mobanDM ------------ */
			moban = main.querySelectorAll('.toggle_input')
			moban.forEach((el, i) => {
				el.addEventListener('click',async function (evt) {
					let parent = el.parentNode.parentNode.parentNode
					let lock = parent.childNodes[7].querySelector('.ti-lock').style.display
					// console.log(parent.childNodes[7])
					if(lock=='block'){
						let id = el.id.replace('a','')
						let temp_order = {
							id: id,
							mobanMH: (el.checked?'checked':'unchecked'),
							action: 'mobanMH',
						}
						let mobanDM = await instance.post('/mathang', temp_order);

					}else{
						el.checked= false;
					}
					
				});
			});
			
			/*--------- func chẵn lẻ ----------- */
			var even = 'even'
			var tmp;
			$('tbody').find('tr.has-rowspan').each(function() { 
				try {
					const src = this.children[0].textContent + this.children[1].textContent
					// console.log(src)
					if (tmp != src){
						
						tmp = src
						if (even=='even'){
							even = ''
						}else{even='even'}
					}
					this.setAttribute("class", even);
				} catch (error) {
					console.log(error, this)
				} 
			});
		break;
		case 'Nguyên Liệu':
			tmp = `
			<div class='thietlapca'> 
				<div class="dropdown">
					<div class="drop_btn nut_dropdown" onclick="call_popup('DM_NGUYENLIEU','create');"><i class="ti-plus"> THÊM NGUYÊN LIỆU</i> </div>
				</div>
			</div>`
			document.querySelector('.show_btn_back').innerHTML = tmp

			html +='<div class="table_responsive" id = "main_table">'
			// class="paginated"
			html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
			html += `<caption style="padding: 10px;border: 1px solid rgba(255, 255, 255, 0.1); text-align: left; color:grey;"><h3>DANH SÁCH NGUYÊN LIỆU</h2></caption>`
			html +='	<thead>'
			html +='	<tr>'
			html +='		<th>STT</th>'
			html +='		<th>TÊN</th>'
			html +='		<th>MÔ TẢ</th>'
			html +='		<th>ĐƠN VỊ</th>'
			html +='		<th style="text-align: right;">TỒN KHO</th>'
			html +='		<th>THAO TÁC</th>'
			html +='	</tr>'
			html +='	</thead>'
			html +='	<tbody>'

			temp_order = {
				action: 'getNL'
			}
			// console.log(temp_order)
			NL = await instance.post('/inventory', temp_order);
			console.log('data', NL.data)
			/*-------------- sort Alphabetically xắp sếp ----------- */
			sortedList = NL.data.sort((a, b) =>
				a.name.localeCompare(b.name));
			var lastRowIndex = 0;
			sortedList.forEach(function(element, index){
				lastRowIndex +=1
				const id = element.id
				const tenNL = element.name
				const mota = element.mota
				const donvi = element.donvi
				const sl = element.Tonkho

				html += `<tr id='${id}'>`
				html += `<td data-label="STT">${lastRowIndex}</td>`
				html += `<td data-label="TÊN" style="min-width: 270px; font-weight:600;">${tenNL}</td>`
				html += `<td data-label="MÔ TẢ" style="font-style:italic; color: grey;">${mota}</td>`
				html += `<td data-label="ĐƠN VỊ" style="width: 70px;">${donvi}</td>`
				html += `<td data-label="TỒN KHO" style="text-align: right;">${sl}</td>`
				html += `<td data-label="THAO TÁC"><div class="danhmuc_thaotac" titles="DM_NGUYENLIEU"><i class="far fa-edit" item='edit'></i>  <i class="ti-support" item='add'></i> <i class="far fa-trash-alt" item='del'></i></td>`
				html += '</tr>'

			})
			html += '</tbody>'
			html += '</table>'
			html += '</div>'
			
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)
			btn = main.querySelectorAll('i')
			btn.forEach((el, i) => {
				el.addEventListener('click',function (evt) {
					xuly_before_call_popup(el);
				});
			});
		break;
		case 'Nhóm Mặt Hàng':
			tmp = `
			<div class='thietlapca'> 
				<div class="dropdown">
					<div class="drop_btn nut_dropdown" onclick="call_popup('DM_NHOMMATHANG','create')"><i class="ti-plus"> THÊM NHÓM MẶT HÀNG</i> </div>
				</div>
			</div>`
			document.querySelector('.show_btn_back').innerHTML = tmp
			html +='<div class="table_responsive" id = "main_table">'
			// class="paginated"
			html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
			html += `<caption style="padding: 10px;border: 1px solid rgba(255, 255, 255, 0.1); text-align: left; color:grey;"><h3>DANH SÁCH NHÓM MẶT HÀNG</h2></caption>`
			html +='	<thead>'
			html +='	<tr>'
			html +='		<th style=" text-align: left;">TÊN</th>'
			html +='		<th style=" text-align: left;">MÔ TẢ</th>'
			html +='		<th style=" text-align: left;">HIỂN THỊ</th>'
			html +='		<th style=" text-align: left;">NHÃN</th>'
			html +='		<th style=" text-align: left;">THAO TÁC</th>'
			html +='	</tr>'
			html +='	</thead>'
			html +='	<tbody>'
			temp_order = {action: 'get_nhom'}
			nhom_MH = await instance.post('/nhomMH', temp_order);
			// console.table(nhom_MH.data)
			sortedList = nhom_MH.data.sort((a, b) => a.name.localeCompare(b.name));
			html += await render_rows(sortedList, 'DM_NHOMMATHANG')
			html += '</tbody>'
			html += '</table>'
			html += '</div>'
			
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)

			btn = main.querySelectorAll('i')
			btn.forEach((el, i) => {
				el.addEventListener('click',function (evt) {
					xuly_before_call_popup(el);
				});
			});
		break;
		case 'Khuyến Mại':
			tmp = `
			<div class='thietlapca'> 
				<div class="dropdown">
					<div class="drop_btn nut_dropdown" onclick="call_popup('DM_KHUYENMAI','create')"><i class="ti-plus"> THÊM KHUYẾN MẠI</i> </div>
				</div>
			</div>`
			document.querySelector('.show_btn_back').innerHTML = tmp
			html +='<div class="table_responsive" id = "main_table">'
			// class="paginated"
			html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
			html += `<caption style="padding: 10px;border: 1px solid rgba(255, 255, 255, 0.1); text-align: left; color:grey;"><h3>DANH SÁCH KHUYẾN MÃI</h2></caption>`
			html +='	<thead>'
			html +='	<tr>'
			html +='		<th style=" text-align: left;">CHƯƠNG TRÌNH KHUYẾN MẠI</th>'
			html +='		<th style=" text-align: left;">ÁP DỤNG CHO</th>'
			html +='		<th style=" text-align: left;">PHẦN TRĂM</th>'
			html +='		<th style=" text-align: left;">LOẠI GIẢM GIÁ</th>'
			html +='		<th style=" text-align: left;">BẮT ĐẦU</th>'
			html +='		<th style=" text-align: left;">KẾT THÚC</th>'
			html +='		<th style=" text-align: left;">THAO TÁC</th>'
			html +='	</tr>'
			html +='	</thead>'
			html +='	<tbody>'
			temp_order = {action: 'get_KM'}
			let nhom_KM = await instance.post('/khuyenmai', temp_order);
			sortedList = nhom_KM.data.sort((a, b) => a.name_KM.localeCompare(b.name_KM));
			console.table(sortedList)
			html += await render_rows(sortedList, 'DM_KHUYENMAI')
			html += '</tbody>'
			html += '</table>'
			html += '</div>'
			
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)

			btn = main.querySelectorAll('i')
			btn.forEach((el, i) => {
				el.addEventListener('click',function (evt) {
					xuly_before_call_popup(el);
				});
			});
		break;
		case 'Tạo Mã':
			temp_order = {
				id_KM: id,
				action: 'get_Magiam'
			}
			var magiam = await instance.post('/magiamgia', temp_order);
			magiam = magiam.data
			console.table(magiam)
			tmp = `
			<div class='thietlapca'> 
				<div class="dropdown">
					<div class="drop_btn nut_dropdown" id="${id}" onclick="call_popup('DM_TAOMA','create')"><i class="ti-plus"> TẠO MÃ</i> </div>
				</div>
			</div>`
			document.querySelector('.show_btn_back').innerHTML = tmp

			
			if(magiam==''){
				html +='<div class="table_responsive" id = "main_table">'
				// class="paginated"
				html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
				html += `<caption style="padding: 10px;border: 1px solid rgba(255, 255, 255, 0.1); text-align: left; color:grey;"><h3>DANH SÁCH MÃ KHUYẾN MÃI</h2></caption>`
				html +='	<thead>'
				html +='	<tr class="title_maKM">'
				html +='		<th style=" text-align: left;">MÃ</th>'
				html +='		<th style=" text-align: left;">SỐ LẦN SỬ DỤNG</th>'
				html +='		<th style=" text-align: left;">SỐ LẦN/TÀI KHOẢN</th>'
				html +='		<th style=" text-align: left;">ĐÃ SỬ DỤNG</th>'
				html +='		<th style=" text-align: left;">THAO TÁC</th>'
				html +='	</tr>'
				html +='	</thead>'
				html +='	<tbody>'
						
				html += '	</tbody>'
				html += '</table>'
				html += '</div>'
					html +=`<div class="thongbao" style="background: #ccf1f6; padding: 20px; color: #00606e;border-radius:5px;">
					<h1>Chưa có mã !</h1>
					<p style="font-size: 17px;">Bạn có thể tạo bằng cách click vào nút Tạo Mã.</p>`
					html += '</div>'
			}else{
				html +='<div class="table_responsive" id = "main_table">'
				// class="paginated"
				html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
				html += `<caption style="padding: 10px;border: 1px solid rgba(255, 255, 255, 0.1); text-align: left; color:grey;"><h3>DANH SÁCH MÃ KHUYẾN MÃI</h2></caption>`
				html +='	<thead>'
				html +='	<tr>'
				html +='		<th style=" text-align: left;">MÃ</th>'
				html +='		<th style=" text-align: left;">SỐ LẦN SỬ DỤNG</th>'
				html +='		<th style=" text-align: left;">SỐ LẦN/TÀI KHOẢN</th>'
				html +='		<th style=" text-align: left;">ĐÃ SỬ DỤNG</th>'
				html +='		<th style=" text-align: left;">THAO TÁC</th>'
				html +='	</tr>'
				html +='	</thead>'
				html +='	<tbody>'
				sortedList = (magiam).sort((a, b) => a.maKM.localeCompare(b.maKM));
				html += await render_rows(sortedList, 'DM_TAOMA')
				html += '</tbody>'
				html += '</table>'
				html += '</div>'
			}
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)
			btn = main.querySelectorAll('i')
			/* func btn in table */
			btn.forEach((el, i) => {
				el.addEventListener('click',function (evt) {
					xuly_before_call_popup(el);
				});
			});

			var hidden_title = document.querySelector('.title_maKM')
			if (hidden_title){
				hidden_title.style.visibility= 'hidden';
			}
		break;
		case 'Menu Dịch Vụ':
			//Thiết lập menu dịch vụ cho phép bạn sắp xếp thứ tự hiển thị của danh mục và mặt hàng trên launcher tại máy trạm.
			html += `<div class="importan-note" style="border-radius: 0;padding: 15px; font-size:18px; border-radius: 5px;">
						<span>Thiết lập menu dịch vụ cho phép bạn sắp xếp thứ tự hiển thị của danh mục và mặt hàng trên KLMenu tại máy trạm.</span>
					</div>
					<div class="row">
						<div class="col l-3 border" style="width: 300px; padding: 20px;">
							<div id="list_danhmuc">
								<div class="course-item" id="1" style= "color: white; margin: 10px 0; cursor: move;">
									<div class="header" style="margin-bottom: 20px; border: 1px solid rgba(255, 255, 255, .2); text-transform:none;">Đồ Ăn</div>
								</div>

								<div class="course-item" id="2" style="color: white; margin: 10px 0; cursor: move;">
									<div class="header" style="margin-bottom: 20px; border: 1px solid rgba(255, 255, 255, .2); text-transform:none;">Đồ Uống</div>
								</div>
							</div>
						</div>

						<div class="col l-3" style="border: none; width: 80%;">
							<div class="course-item" style= "color: white; border: 1px solid rgba(255, 255, 255, .2);border-radius: 5px;
							box-shadow: rgba(255, 255, 255, 0.25) 0px 0.0625em 0.0625em, rgba(255, 255, 255, 0.25) 0px 0.125em 0.5em, rgba(0, 0, 0, 0.1) 0px 0px 0px 1px inset;">
								<div class="header">
									<span>Đồ Ăn</span>
								</div>
								
								<div id="list_sort_doan" style="padding:20px;">
									<!--- -->`
						html+=	`</div></div>`
						html +=	`<div class="course-item" style= "color: white; margin-top: 5px; border: 1px solid rgba(255, 255, 255, .2); border-radius: 5px; margin-top: 20px;
									box-shadow: rgba(255, 255, 255, 0.25) 0px 0.0625em 0.0625em, rgba(255, 255, 255, 0.25) 0px 0.125em 0.5em, rgba(0, 0, 0, 0.1) 0px 0px 0px 1px inset;">
								<div class="header">
									<span>Đồ Uống</span>
								</div>
								
								<div id="list_sort_douong" style="padding:20px;">`
									
			html+=		 		`</div>
							</div>
						</div>
					</div>
					`
			// `box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;`
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)

			//render table row
			temp_order = {action: 'getMH'}
			Show_MH = await instance.post('/mathang', temp_order);
			await render_rows(Show_MH.data, 'DM_MENUDICHVU')
			
			// sắp xếp đồ ăn
			$(()=>{
				let sort=[];
				const wrapper = $("#list_sort_doan")[0]
				Sortable.create(wrapper, {
					onEnd: async function(ev, ui) {
						//Get the updated positions by calling refreshPositions and then .children on the resulting object.
						var children = $('#list_sort_doan').sortable('refreshPositions').children();
						console.log('Positions: ');
						sort=[];
						//Loopp through each item in the children array and print out the text.
						$.each(children, function() {
							console.log($(this).text().trim(),this.id);
							sort.push(Number(this.id))
						});
						temp_order ={
							id: '2',
							name: 'sort_DA',
							sort: JSON.stringify(sort),
							action: 'update_sort'
						}
						let tmps = await instance.post('/sortlist', temp_order);
						console.log(sort)
					  }
				});
				
			})

			// sắp xếp đồ uống
			$(()=>{
				let sort=[];
				const wrapper = $("#list_sort_douong")[0]
				Sortable.create(wrapper, {
					onEnd: async function(ev, ui) {
						//Get the updated positions by calling refreshPositions and then .children on the resulting object.
						var children = $('#list_sort_douong').sortable('refreshPositions').children();
						console.log('Positions: ');
						sort=[];
						//Loopp through each item in the children array and print out the text.
						$.each(children, function() {
							console.log($(this).text().trim(),this.id);
							sort.push(Number(this.id))
						});
						temp_order ={
							id: '3',
							name: 'sort_DU',
							sort: JSON.stringify(sort),
							action: 'update_sort'
						}
						let tmps = await instance.post('/sortlist', temp_order);
						// console.log(sort, ev, ui)
					  }
				});
			})

			// sắp xếp danh mục
			$(()=>{
				let sort=[];
				const wrapper = $("#list_danhmuc")[0]
				Sortable.create(wrapper, {
					onEnd: async function(ev, ui) {
						//Get the updated positions by calling refreshPositions and then .children on the resulting object.
						var children = $('#list_danhmuc').sortable('refreshPositions').children();
						console.log('Positions: ');
						sort=[];
						//Loopp through each item in the children array and print out the text.
						$.each(children, function() {
							console.log($(this).text().trim(),this.id);
							sort.push(Number(this.id))
						});
						temp_order ={
							id: '1',
							name: 'sort_DM',
							sort: JSON.stringify(sort),
							action: 'update_sort'
						}
						let tmps = await instance.post('/sortlist', temp_order);
						console.log(sort)
					  }
				});
			})
		break;			
		case 'Bảng Tin':
				html += `<div class="row">
							<div class="col l-3" style="width: 100%;">
								<div class="course-item" style= "color: white; margin-top: 5px; width: 100%;">

									<div class="header" style="margin-bottom: 20px; border: 1px solid rgba(255, 255, 255, .2); text-transform:none; border-radius: 5px;
									box-shadow: rgba(255, 255, 255, 0.25) 0px 0.0625em 0.0625em, rgba(255, 255, 255, 0.25) 0px 0.125em 0.5em, rgba(0, 0, 0, 0.1) 0px 0px 0px 1px inset;">

										<div class="checkbox-toggle" style="padding-bottom: 20px;">
											<label for="checkbox1" class="toggle_checkbox"> 
												<input type="checkbox" id="checkbox1" class="toggle_input popup-input price_tuychon" hidden=""/>
												<div class="toggle_bar">
													<div class="toggle_spin"></div>
												</div>
												<p>Hiển thị số tồn kho</p>
											</label>
										</div>

									</div>

									<div class="header" style="margin-bottom: 20px; border: 1px solid rgba(255, 255, 255, .2);  text-transform:none; border-radius: 5px;
									box-shadow: rgba(255, 255, 255, 0.25) 0px 0.0625em 0.0625em, rgba(255, 255, 255, 0.25) 0px 0.125em 0.5em, rgba(0, 0, 0, 0.1) 0px 0px 0px 1px inset;">

										<div class="checkbox-toggle" style="padding-bottom: 20px;">
											<label for="checkbox2" class="toggle_checkbox"> 
												<input type="checkbox" id="checkbox2" class="toggle_input popup-input price_tuychon" hidden=""/>
												<div class="toggle_bar">
													<div class="toggle_spin"></div>
												</div>
												<p>Hiển thị Menu Dịch Vụ</p>
											</label>
										</div>

									</div>

									<div class="header" style="margin-bottom: 20px; border: 1px solid rgba(255, 255, 255, .2);  text-transform:none; border-radius: 5px;
									box-shadow: rgba(255, 255, 255, 0.25) 0px 0.0625em 0.0625em, rgba(255, 255, 255, 0.25) 0px 0.125em 0.5em, rgba(0, 0, 0, 0.1) 0px 0px 0px 1px inset;">

										<div class="checkbox-toggle" style="padding-bottom: 20px;">
											<label for="checkbox3" class="toggle_checkbox"> 
												<input type="checkbox" id="checkbox3" class="toggle_input popup-input price_tuychon" hidden=""/>
												<div class="toggle_bar">
													<div class="toggle_spin"></div>
												</div>
												<p>Hiển thị Menu Game</p>
											</label>
										</div>

									</div>

									<div class="header" style="margin-bottom: 20px; border: 1px solid rgba(255, 255, 255, .2);  text-transform:none; border-radius: 5px;
									box-shadow: rgba(255, 255, 255, 0.25) 0px 0.0625em 0.0625em, rgba(255, 255, 255, 0.25) 0px 0.125em 0.5em, rgba(0, 0, 0, 0.1) 0px 0px 0px 1px inset;">

										<div class="checkbox-toggle" style="padding-bottom: 20px;">
											<label for="checkbox4" class="toggle_checkbox"> 
												<input type="checkbox" id="checkbox4" class="toggle_input popup-input price_tuychon" hidden=""/>
												<div class="toggle_bar">
													<div class="toggle_spin"></div>
												</div>
												<p>Chọn Menu Game làm menu mặc định được chọn khi mở máy. Mặc định là Menu Dịch Vụ được chọn.</p>
											</label>
										</div>

									</div>
									
								</div>
							</div>
						</div>`

				main.innerHTML = '';
				main.insertAdjacentHTML("afterbegin",html)
		break;
		case 'Tùy chỉnh':
			html += `<div class="row Tuychinh">
						<div class="col l-3" style="width: 100%;">
							<div class="course-item" style= "color: white; margin-top: 5px; width: 100%;">

								<div class="header" style="margin-bottom: 20px; border: 1px solid rgba(255, 255, 255, .2); text-transform:none; border-radius: 5px;
								box-shadow: rgba(255, 255, 255, 0.25) 0px 0.0625em 0.0625em, rgba(255, 255, 255, 0.25) 0px 0.125em 0.5em, rgba(0, 0, 0, 0.1) 0px 0px 0px 1px inset;">

									<div class="checkbox-toggle" style="padding-bottom: 20px;">
										<label for="hienthitonkho" class="toggle_checkbox"> 
											<input type="checkbox" id="hienthitonkho" class="toggle_input popup-input hienthitonkho" hidden=""/>
											<div class="toggle_bar">
												<div class="toggle_spin"></div>
											</div>
											<p>Hiển thị số tồn kho</p>
										</label>
									</div>

								</div>

								<div class="header" style="margin-bottom: 20px; border: 1px solid rgba(255, 255, 255, .2);  text-transform:none; border-radius: 5px;
								box-shadow: rgba(255, 255, 255, 0.25) 0px 0.0625em 0.0625em, rgba(255, 255, 255, 0.25) 0px 0.125em 0.5em, rgba(0, 0, 0, 0.1) 0px 0px 0px 1px inset;">

									<div class="checkbox-toggle" style="padding-bottom: 20px;">
										<label for="hienthimenu_dichvu" class="toggle_checkbox"> 
											<input type="checkbox" id="hienthimenu_dichvu" class="toggle_input popup-input hienthimenu_dichvu" hidden=""/>
											<div class="toggle_bar">
												<div class="toggle_spin"></div>
											</div>
											<p>Hiển thị Menu Dịch Vụ</p>
										</label>
									</div>

								</div>

								<div class="header" style="margin-bottom: 20px; border: 1px solid rgba(255, 255, 255, .2);  text-transform:none; border-radius: 5px;
								box-shadow: rgba(255, 255, 255, 0.25) 0px 0.0625em 0.0625em, rgba(255, 255, 255, 0.25) 0px 0.125em 0.5em, rgba(0, 0, 0, 0.1) 0px 0px 0px 1px inset;">

									<div class="checkbox-toggle" style="padding-bottom: 20px;">
										<label for="hienthi_menugame" class="toggle_checkbox"> 
											<input type="checkbox" id="hienthi_menugame" class="toggle_input popup-input hienthi_menugame" hidden=""/>
											<div class="toggle_bar">
												<div class="toggle_spin"></div>
											</div>
											<p>Hiển thị Menu Game</p>
										</label>
									</div>

								</div>

								<div class="header" style="margin-bottom: 20px; border: 1px solid rgba(255, 255, 255, .2);  text-transform:none; border-radius: 5px;
								box-shadow: rgba(255, 255, 255, 0.25) 0px 0.0625em 0.0625em, rgba(255, 255, 255, 0.25) 0px 0.125em 0.5em, rgba(0, 0, 0, 0.1) 0px 0px 0px 1px inset;">

									<div class="checkbox-toggle" style="padding-bottom: 20px;">
										<label for="default_menu" class="toggle_checkbox"> 
											<input type="checkbox" id="default_menu" class="toggle_input popup-input default_menu" hidden=""/>
											<div class="toggle_bar">
												<div class="toggle_spin"></div>
											</div>
											<p>Chọn Menu Game làm menu mặc định được chọn khi mở máy. Mặc định là Menu Dịch Vụ được chọn.</p>
										</label>
									</div>

								</div>
								
							</div>
						</div>
					</div>`

			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)
			temp_order={action: 'get_tuychinh'}
			res= await instance.post('/tuychinh', temp_order);
			console.log(res.data)
			value = res.data[0]
			
			const checkboxs= document.querySelectorAll('.Tuychinh input')
			checkboxs.forEach(element => {
				// console.log(value[`${element.id}`])
				// show checked
				value[`${element.id}`] =='checked'? element.checked = true: element.checked==false;
				element.addEventListener('change', async function(e) {
					const checked = element.checked ? 'checked': 'unchecked'
					temp_order={checked: checked, action: element.id}
					await instance.post('/tuychinh', temp_order);
				  });
			});

		break;
	}
}

/*------------------ func render table order --------------------*/
async function loc_list(BC){
	console.log(BC)
	let new_list=[]
	if (BC === 'BC_Đơn Hàng'){
		const action = document.querySelector('#search_action select').value
		const DM = document.querySelector('#search_DM select').value
		const MH = document.querySelector('#search_MH select').value
		const NV = document.querySelector('#search_NV select').value
		const custom = document.querySelector('#search_custom').value
		const LoaiTT = document.querySelector('#search_LoaiTT select').value
		
		/*---------------- loc date --------------------------------- */
		let date_begin = document.querySelector('#date_begin').value
		// console.log(action)
		if (date_begin===''){
			date_begin = new Date(new Date().toLocaleDateString({ year: 'numeric', month: '2-digit', day: '2-digit' }, {timeZone: "Asia/Ho_Chi_Minh"}));
			console.log('date_begin',date_begin)
		}else{date_begin = date_us(date_begin)}
		
		let date_end = document.querySelector('#date_end').value
		if (date_end===''){
			date_end = new Date();
			// console.log(date_end)
		}else{date_end = date_us(date_end)}


		temp = {action: 'list-order'}
		const res = await instance.post('/all-order', temp);
		let values = res.data.reverse()
	
		new_list = values.filter((el) => {
			// console.log(el.Date)
			let date = (el.Date).split(" ")[1]
			date = date_us(date)
			return date_begin <= date && date <= date_end && el.Price !== ''
		});

		// console.log(new_list)
		/*---------------- loc action --------------------------------- */
		new_list = await new_list.filter((el) => {
			console.log(el.Action, action)
			if(action === "TẤT CẢ"){
				return el.Action === "HOÀN THÀNH" || (el.Action).indexOf('(')!== -1
			}else if (action === "HỦY"){
				return (el.Action).indexOf('(')!== -1
			}
			return el.Action === action
		});
	
		/*---------------- loc DM --------------------------------- */
		new_list = await new_list.filter((el) => {
			console.log(el.Danhmuc, action)
			if(DM !== "Danh Mục"){
				return el.Danhmuc === DM
			}
			return new_list
		});
		/*---------------- loc MH --------------------------------- */
		new_list = await new_list.filter((el) => {
			console.log('mathang',el.Name, MH)
			if(MH !== "Mặt Hàng"){
				return el.Name === MH
			}
			return new_list
		});
		/*---------------- loc NV --------------------------------- */
		new_list = await new_list.filter((el) => {
			console.log('nhanvien',el.NvOrder, NV)
			if(NV !== "Nhân Viên"){
				return el.NvOrder === NV
			}
			return new_list
		});
	
		/*---------------- loc Custom --------------------------------- */
		new_list = await new_list.filter((el) => {
			console.log('custom',el.Custom, custom)
			if(custom !== ""){
				return el.Custom === custom
			}
			return new_list
		});
	
		/*---------------- loc LoaiTT --------------------------------- */
		new_list = await new_list.filter((el) => {
			console.log('custom',el.LoaiTT, LoaiTT)
			if(LoaiTT !== "Thanh Toán"){
				return el.LoaiTT === LoaiTT
			}
			return new_list
		});
	
	
	}else if(BC === 'BC_Mặt Hàng'){
		const DM = document.querySelector('#search_DM select').value
		const MH = document.querySelector('#search_MH select').value

		/*---------------- loc date --------------------------------- */
		let date_begin = document.querySelector('#date_begin').value
		// console.log(date_begin)
		if (date_begin===''){
			date_begin = new Date(new Date().toLocaleDateString({ year: 'numeric', month: '2-digit', day: '2-digit' }, {timeZone: "Asia/Ho_Chi_Minh"}));
			console.log('date_begin',date_begin)
		}else{date_begin = date_us(date_begin)}
		
		let date_end = document.querySelector('#date_end').value
		if (date_end===''){
			date_end = new Date();
			console.log(date_end)
		}else{date_end = date_us(date_end)}
		
		
		temp = {action: 'list-order'}
		const res = await instance.post('/all-order', temp);
		let values = res.data.reverse()
	
		new_list = values.filter((el) => {
			let date = (el.Date).split(" ")[1]
			date = date_us(date)
			return date_begin <= date && date <= date_end && el.Price !== ''
		});
		/*---------------- loc DM --------------------------------- */
		new_list = await new_list.filter((el) => {
			//console.log(el.Danhmuc, DM)
			if(DM !== "Danh Mục"){
				return el.Danhmuc === DM
			}
			return new_list
		});
		/*---------------- loc MH --------------------------------- */
		new_list = await new_list.filter((el) => {
			//console.log('mathang',el.Name, MH)
			if(MH !== "Mặt Hàng"){
				return el.Name === MH
			}
			return new_list
		});
	}else if(BC === 'BC_Nguyên Liệu'){
		const DM = document.querySelector('#search_DM select').value
		const MH = document.querySelector('#search_MH select').value

		/*---------------- loc date --------------------------------- */
		let date_begin = document.querySelector('#date_begin').value
		//console.log(date_begin)
		if (date_begin===''){
			date_begin = new Date(new Date().toLocaleDateString({ year: 'numeric', month: '2-digit', day: '2-digit' }, {timeZone: "Asia/Ho_Chi_Minh"}));
			//console.log('date_begin',date_begin)
		}else{date_begin = date_us(date_begin)}
		
		let date_end = document.querySelector('#date_end').value
		if (date_end===''){
			date_end = new Date();
			//console.log(date_end)
		}else{date_end = date_us(date_end)}
		
		
		temp = {action: 'getNL'}
		const res = await instance.post('/all-order', temp);
		let values = res.data.reverse()
	
		new_list = values.filter((el) => {
			let date = (el.Date).split(" ")[1]
			date = date_us(date)
			return date_begin <= date && date <= date_end && el.Price !== ''
		});
		/*---------------- loc DM --------------------------------- */
		new_list = await new_list.filter((el) => {
			//console.log(el.Danhmuc, DM)
			if(DM !== "Danh Mục"){
				return el.Danhmuc === DM
			}
			return new_list
		});
		/*---------------- loc MH --------------------------------- */
		new_list = await new_list.filter((el) => {
			//console.log('mathang',el.Name, MH)
			if(MH !== "Mặt Hàng"){
				return el.Name === MH
			}
			return new_list
		});

		/*------------------ func group by sum array ------------- */
		// console.table(new_list)
		new_list = Object.values(new_list.reduce(function(r, e) {
			var key = e.nameNL;
			if (!r[key]) {
				r[key] = e;
			}else {
			  r[key].SL_NL_dadung += e.SL_NL_dadung
			}
			return r;
		  }, {}))
		//   console.table(new_list)

	}else if(BC === 'BC_Góp Ý/Yêu Cầu'){
		/*---------------- loc date --------------------------------- */
		let date_begin = document.querySelector('#date_begin').value
		// console.log(action)
		if (date_begin===''){
			date_begin = new Date(new Date().toLocaleDateString({ year: 'numeric', month: '2-digit', day: '2-digit' }, {timeZone: "Asia/Ho_Chi_Minh"}));
			console.log('date_begin',date_begin)
		}else{date_begin = date_us(date_begin)}
		
		let date_end = document.querySelector('#date_end').value
		if (date_end===''){
			date_end = new Date();
			// console.log(date_end)
		}else{date_end = date_us(date_end)}


		temp = {action: 'list-order'}
		const res = await instance.post('/all-order', temp);
		let values = res.data.reverse()
	
		new_list = values.filter((el) => {
			// console.log(el.Date)
			let date = (el.Date).split(" ")[1]
			date = date_us(date)
			return date_begin <= date && date <= date_end && el.Price == ''
		});
		
	}else if(BC === 'BC_Nhập/Xuất Kho'){
		const Thaotac = document.querySelector('#search_Thaotac select').value
		NV = document.querySelector('#search_NV select').value
		NL = document.querySelector('#search_NL select').value	

		/*---------------- loc date --------------------------------- */
		let date_begin = document.querySelector('#date_begin').value
		if (date_begin===''){
			date_begin = new Date(new Date().toLocaleDateString({ year: 'numeric', month: '2-digit', day: '2-digit' }, {timeZone: "Asia/Ho_Chi_Minh"}));
			console.log('date_begin',date_begin)
		}else{date_begin = date_us(date_begin)}
		
		let date_end = document.querySelector('#date_end').value
		if (date_end===''){
			date_end = new Date();
		}else{date_end = date_us(date_end)}

		let temp_orders = {
			id: '',
			name: '',
			mota: '',
			sl: '',
			action: 'getLog_kho',
			donvi: ''
		}
		const res = await instance.post('/inventory', temp_orders);
		let values = res.data.reverse()
		console.table(values)
	
		new_list = values.filter((el) => {
			// console.log(el.Date)
			let date = (el.Date).split(" ")[1]
			date = date_us(date)
			return date_begin <= date && date <= date_end && el.Price !== ''
		});

		/*---------------- loc NV --------------------------------- */
		new_list = await new_list.filter((el) => {
			if(NV !== "Nhân Viên"){
				return el.Person === NV
			}
			return new_list
		});
		/*---------------- loc NL --------------------------------- */
		new_list = await new_list.filter((el) => {
			if(NL !== "Nguyên Liệu"){
				return el.name === NL
			}
			return new_list
		});
		/*---------------- loc Thaotac --------------------------------- */
		new_list = await new_list.filter((el) => {
			if(Thaotac !== "Thao Tác"){
				return el.action === Thaotac
			}
			return new_list
		});

		console.table(new_list)
		
	}else if(BC === 'BC_Tồn Kho'){
		DM = document.querySelector('#search_DM select').value
		MH = document.querySelector('#search_MH select').value
		NL = document.querySelector('#search_NL select').value		

		let temp_orders = {
			id: '',
			name: '',
			mota: '',
			sl: '',
			action: 'getNL_MH',
			donvi: ''
		}
		res = await instance.post('/inventory', temp_orders);
		new_list = res.data
		/*---------------- loc DM --------------------------------- */
		var new_list_idMH =[]
		new_list = await new_list.filter((el) => {
			console.log(DM, el.Danhmuc)
			if(DM !== "Danh Mục"){
				return el.Danhmuc === DM
			}
			return new_list
		});
		/*---------------- loc MH --------------------------------- */
		new_list = await new_list.filter((el) => {
			if(MH !== "Mặt Hàng"){
				return el.NameMH === MH
			}
			return new_list
		});
		/* chỉ lấy id MH */
		if(DM !=="Danh Mục" || MH !=="Mặt Hàng"){
			Object.values(new_list.reduce(function(r, e) {
				var key = e.nameNL;
				if (!r[key]) {
					r[key] = e;
					new_list_idMH.push(e.NguyenLieu_ID);
				}
				return r;
			  }, {}))
		}

		let temp_order = {
			id: '',
			name: '',
			mota: '',
			sl: '',
			action: 'getNL',
			donvi: ''
		}
		const NLs = await instance.post('/inventory', temp_order);
		new_list = NLs.data.sort((a, b) =>
			a.name.localeCompare(b.name));

		new_list = await new_list.filter((el) => {
			if(NL !== "Nguyên Liệu"){
				return el.name === NL
			}
			return new_list
		});

		let data=[]
		if(DM !=="Danh Mục" || MH !=="Mặt Hàng"){
			new_list = await new_list.filter((el) => {
				for (var i=0; i<new_list_idMH.length; i++ ){
					if (el.id === new_list_idMH[i])
						data.push(el)
				}
			});
			new_list = data
		}		
	}else if(BC === 'BC_Xuất Báo Cáo'){
		// ExportData()

		return;
	}else if(BC === 'BC_Nhật Ký Thao Tác'){
		/*---------------- loc date --------------------------------- */
		let date_begin = document.querySelector('#date_begin').value
		if (date_begin===''){
			date_begin = new Date(new Date().toLocaleDateString({ year: 'numeric', month: '2-digit', day: '2-digit' }, {timeZone: "Asia/Ho_Chi_Minh"}));
			// console.log('date_begin',date_begin)
		}else{date_begin = date_us(date_begin)}
		
		let date_end = document.querySelector('#date_end').value
		if (date_end===''){
			date_end = new Date();
		}else{date_end = date_us(date_end)}

		let temp_orders = {
			id: '',
			name: '',
			mota: '',
			sl: '',
			action: 'getLog_action',
			donvi: ''
		}
		const res = await instance.post('/inventory', temp_orders);
		let values = res.data.reverse()
		// console.table(values)
	
		new_list = values.filter((el) => {
			let date = (el.Date).split(" ")[1]
			date = date_us(date)
			return date_begin <= date && date <= date_end && el.Price !== ''
		});
	}

	show_search(BC, new_list);
}
function show_search(BC, new_list){
	// console.log(new_list)
	if (BC === 'BC_Đơn Hàng'){
		if (new_list){
			let Total = 0;
			let html= '';
			let STT =0
			new_list.forEach(function(element, index){
				STT+=1
				let date_time = element.Date
				let custom =element.Custom
				let NV = element.NvOrder
				let MH =element.Name
				let DM =element.Danhmuc
				let SL =element.SL
				let price =money(element.Price)
				let TT =money(element.ThanhToan)
				let Thanhtoan = element.LoaiTT
				let LD =element.Action
				let Topping_list_order = element.Topping
				Total += element.ThanhToan
				let color='green'
				if (LD !=="HOÀN THÀNH"){
					color='red'
					LD= "HỦY: "+LD
				}

				html += `<tr>`
				html += `<td data-label="STT" style="text-align: center;">${STT}</td>`
				html += `<td data-label="THỜI GIAN" style="white-space: nowrap;">${date_time}</td>`
				html += `<td data-label="KHÁCH HÀNG" style="text-align: center;">${custom}</td>`
				html += `<td data-label="NHÂN VIÊN" style="text-align: center;">${NV}</td>`
				html += `<td data-label="MẶT HÀNG" style="white-space: nowrap;">${MH}`
				if (Topping_list_order.length > 0){
					html +=         `<span>
									<table cellspacing="0" cellpadding="0" id="MHtoppings" class="table-popup" style="margin-top: 10px; display: block; font-size: 18px; width:100%;">
										<thead>
											<tr style="background-color:var(--yellow_low);">
												<th style="font-size: 16px;">TOPPING</th>
												<th style="font-size: 16px;">SL</th>
												<th style="font-size: 16px;">Đơn Giá</th>									
											</tr>
										</thead>
										<tbody id="list_order">`
					for (var n = 0; n < Topping_list_order.length; n++) {	
								html += `<tr>
											<td data-label="TÊN" style="width:100%;"><span class="MHtopping" style="">${Topping_list_order[n].NameTopping}</span></td>
											<td data-label="SL" style="max-width: 50px; text-align: center;"><input type="text" disabled="disabled" value="${Topping_list_order[n].SL}" style="border: none; background: transparent; width: 100%; "/></td>
											<td data-label="ĐG" style="min-width: 100px; text-align: center;"><span class="MHtopping" style="float: right;">${Number(Topping_list_order[n].Topping_DG).format(0, 3, '.', ',')} <span style="color: yellow;"> ₫</span></span></td>
										</tr>`	
											
					}	
					html +=				`</tbody>
									</table>
								</span></td>`
				}
				
				html += `<td data-label="DANH MỤC" style="text-align: center;">${DM}</td>`
				html += `<td data-label="SỐ LƯỢNG" style="text-align: right;">${SL}</td>`
				html += `<td data-label="ĐƠN GIÁ" style="text-align: right;">${price}</td>`
				html += `<td data-label="THÀNH TIỀN" style="text-align: right;">${TT}</td>`
				html += `<td data-label="THANH TOÁN" style="text-align: right;">${Thanhtoan}</td>`
				html += `<td data-label="LÝ DO" style="text-align: right; color: ${color}"> ${LD}</td>`
				html += '</tr>'
			});
			let main = document.querySelector("#list_order")
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)
			document.querySelector('.DTDV').innerHTML = money(Total)
		};
	}else if(BC === 'BC_Mặt Hàng'){
		if (new_list){
			let Total = 0;
			let html= '';
			let STT =0
			new_list.forEach(function(element, index){
				STT+=1
				let date_time = element.Date
				let custom =element.Custom
				let NV = element.NvOrder
				let MH =element.Name
				let DM =element.Danhmuc
				let SL =element.SL
				let price =money(element.Price)
				let TT =money(element.ThanhToan)
				let Thanhtoan = element.LoaiTT
				let LD =element.Action
				let Topping_list_order = element.Topping
				Total += element.ThanhToan
				let color='green'
				if (LD !=="HOÀN THÀNH"){
					color='red'
					LD= "HỦY: "+LD
				}

				html += `<tr>`
				html += `<td data-label="STT" style="text-align: center;">${STT}</td>`
				html += `<td data-label="MẶT HÀNG" style="white-space: nowrap;">${MH}`
				if (Topping_list_order.length > 0){
					html +=         `<span>
									<table cellspacing="0" cellpadding="0" id="MHtoppings" class="table-popup" style="margin-top: 10px; display: block; font-size: 18px; width:100%;">
										<thead>
											<tr style="background-color:var(--yellow_low);">
												<th style="font-size: 16px;">TOPPING</th>
												<th style="font-size: 16px;">SL</th>
												<th style="font-size: 16px;">Đơn Giá</th>									
											</tr>
										</thead>
										<tbody id="list_order">`
					for (var n = 0; n < Topping_list_order.length; n++) {	
								html += `<tr>
											<td data-label="TÊN" style="width:100%;"><span class="MHtopping" style="">${Topping_list_order[n].NameTopping}</span></td>
											<td data-label="SL" style="max-width: 50px; text-align: center;"><input type="text" disabled="disabled" value="${Topping_list_order[n].SL}" style="border: none; background: transparent; width: 100%; "/></td>
											<td data-label="ĐG" style="min-width: 100px; text-align: center;"><span class="MHtopping" style="float: right;">${Number(Topping_list_order[n].Topping_DG).format(0, 3, '.', ',')} <span style="color: yellow;"> ₫</span></span></td>
										</tr>`	
											
					}	
					html +=				`</tbody>
									</table>
								</span></td>`
				}
				
				html += `<td data-label="DANH MỤC" style="text-align: center;">${DM}</td>`
				html += `<td data-label="SỐ LƯỢNG" style="text-align: right;">${SL}</td>`
				html += `<td data-label="ĐƠN GIÁ" style="text-align: right;">${price}</td>`
				html += `<td data-label="THÀNH TIỀN" style="text-align: right;">${TT}</td>`
				html += '</tr>'
			});
			let main = document.querySelector("#list_order")
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)
			document.querySelector('.DTDV').innerHTML = money(Total)
			
		};
	}else if(BC === 'BC_Nguyên Liệu'){
		if (new_list){
			let Total = 0;
			let html= '';
			let STT =0
			new_list.forEach(function(element, index){
				STT+=1
				let NL = element.nameNL
				let SL =element.SL_NL_dadung
				html += `<tr>`
				html += `<td data-label="STT" style="text-align: left; width:150px;">${STT}</td>`
				html += `<td data-label="NGUYÊN LIỆU" style="white-space: nowrap; text-align: left;">${NL}`
				html += `<td data-label="SỐ LƯỢNG" style="text-align: right;width:50px;">${SL}</td>`
				html += '</tr>'
			});
			let main = document.querySelector("#list_order")
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)
			// document.querySelector('.DTDV').innerHTML = money(Total)
		};
	}else if(BC === 'BC_Góp Ý/Yêu Cầu'){
		if (new_list){
			let html= '';
			let STT =0
			new_list.forEach(function(element, index){
				STT+=1
				let date_time = element.Date
				let custom =element.Custom
				let Gopy = element.Name
				let Chitiet =element.Ghichu
				html += `<tr>`
				html += `<td data-label="STT" style="text-align: center;">${STT}</td>`
				html += `<td data-label="THỜI GIAN" style="white-space: nowrap;">${date_time}</td>`
				html += `<td data-label="KHÁCH HÀNG" style="text-align: center;">${custom}</td>`
				html += `<td data-label="NHÂN VIÊN" style="text-align: center;">${Gopy}</td>`
				html += `<td data-label="MẶT HÀNG" style="white-space: nowrap;">${Chitiet}</td>`			
				html += '</tr>'
			});
			let main = document.querySelector("#list_order")
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)
			// document.querySelector('.DTDV').innerHTML = money(Total)
		};
	}else if(BC === 'BC_Nhập/Xuất Kho'){
		let html= '';
		let STT =0
		new_list.forEach(function(element, index){
			STT+=1
			let NL = element.NameNL
			let Before =element.Tonkho_before
			let after = element.Tonkho_after
			let SL = element.SL
			let action = element.action
			let Gianhap = element.Price_import
			let date = element.Date
			let NV = element.Person
			let Total =Number(Gianhap)*Number(SL)
			html += `<tr>`
			html += `<td data-label="STT" style="text-align: center;">${STT}</td>`
			html += `<td data-label="THỜI GIAN" style="white-space: nowrap;text-align: left;">${date}</td>`
			html += `<td data-label="NHÂN VIÊN" style="text-align: center; width:80px;">${NV}</td>`
			html += `<td data-label="NGUYÊN LIỆU" style="text-align: right;">${NL}</td>`
			html += `<td data-label="THAO TÁC" style="white-space: nowrap;text-align: right;">${action}</td>`		
			html += `<td data-label="SỐ LƯỢNG" style="text-align: center;">${SL}</td>`
			html += `<td data-label="TỒN KHO TRƯỚC" style="white-space: nowrap;text-align: left;">${Before}</td>`
			html += `<td data-label="TỒN KHO SAU" style="text-align: center; width:80px;">${after}</td>`
			html += `<td data-label="GIÁ NHẬP" style="text-align: right;">${money(Gianhap)}</td>`
			html += `<td data-label="TỔNG" style="white-space: nowrap;text-align: right;">${money(Total)}</td>`		
			html += '</tr>'
		});
		let main = document.querySelector("#list_order")
		main.innerHTML = '';
		main.insertAdjacentHTML("afterbegin",html)
		
	}else if(BC === 'BC_Tồn Kho'){
		// if (new_list){
			let html= '';
			let STT =0
			new_list.forEach(function(element, index){
				STT+=1
				let NL = element.name
				let TonKho =element.Tonkho
				let Gianhap = element.price
				let Total =Number(TonKho)*Number(Gianhap)
				html += `<tr>`
				html += `<td data-label="STT" style="text-align: center;">${STT}</td>`
				html += `<td data-label="NGUYÊN LIỆU" style="white-space: nowrap;text-align: left;">${NL}</td>`
				html += `<td data-label="TỒN KHO" style="text-align: center; width:80px;">${TonKho}</td>`
				html += `<td data-label="GIÁ NHẬP TRUNG BÌNH" style="text-align: right;">${money(Gianhap)}</td>`
				html += `<td data-label="TỔNG" style="white-space: nowrap;text-align: right;">${money(Total)}</td>`		
				html += '</tr>'
			});
			let main = document.querySelector("#list_order")
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)
		// };
	}else if(BC === 'BC_Xuất Báo Cáo'){
		return;
	}else if(BC === 'BC_Nhật Ký Thao Tác'){
		// if (new_list){
			let html= '';
			let STT =0
			new_list.forEach(function(element, index){
				STT+=1
				let date = element.Date
				let action =element.Thaotac
				let account = element.Account
				let doituong = element.Doituong
				let mota = element.mota
				html += `<tr>`
				html += `<td data-label="STT" style="text-align: center;">${STT}</td>`
				html += `<td data-label="THỜI GIAN" style="white-space: nowrap;text-align: center;">${date}</td>`
				html += `<td data-label="TÀI KHOẢN" style="text-align: center; width:80px;">${account}</td>`
				html += `<td data-label="THAO TÁC" style="text-align: center;">${action}</td>`
				html += `<td data-label="ĐỐI TƯỢNG" style="white-space: nowrap;text-align: center;">${doituong}</td>`	
				html += `<td data-label="" style="white-space: nowrap;text-align: right;">${mota}</td>`	
				html += '</tr>'
			});
			let main = document.querySelector("#list_order")
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)
		// };
	}
	exportToExcel(BC, 'sheetName', 'table_order')
}
async function ExportData(e){
	let filename='reports.xlsx';
	let data;
	tmp = 'Giao Ca, Tồn Kho, Bán Hàng Tổng Hợp(Mặt Hàng), Bán Hàng Tổng Hợp(Nguyên Liệu), Bán Hàng Tổng Hợp(Đơn Hàng), Góp Ý/Yêu Cầu'

	temp = {action: 'getNL'}
	const res = await instance.post('/all-order', temp);
	data = res.data.reverse()
	console.table( data );
	/*------------------ func group by sum array ------------- */
	// console.table(new_list)
	data = Object.values(data.reduce(function(r, e) {
		var key = e.nameNL;
		if (!r[key]) {
			r[key] = e;
		}else {
		  r[key].SL_NL_dadung += e.SL_NL_dadung
		}
		return r;
	  }, {}))

	
	// const tmp_title = ['NGUYÊN LIỆU','TỒN KHO','GIÁ NHẬP TRUNG BÌNH','TỔNG'] ton kho
	// const tmp_title = ['MẶT HÀNG','DANH MỤC','SỐ LƯỢNG','ĐƠN GIÁ', 'THÀNH TIỀN'] mathang
	// const tmp_title = ['THỜI GIAN','KHÁCH HÀNG','NHÂN VIÊN','MẶT HÀNG', 'DANH MỤC', SL, ĐƠN GIÁ,THÀNH TIỀN, THANH TOÁN, LÝ DO] donhang
	const tmp_title = ['DATE','NGUYÊN LIỆU','SỐ LƯỢNG'] //nguyenlieu
	// const tmp_title = [BẮT ĐẦU	NV.BẮT ĐẦU	KẾT THÚC NV.KẾT THÚC	DOANH THU	DT.DỊCH VỤ	DT.KHÁC	TT.ĐIỆN TỬ	HOÀN TIỀN]giao ca
	// const tmp_title = [THỜI GIAN	KHÁCH HÀNG	GÓP Ý	CHI TIẾT]gopy

	const tmp_remove = ['id_MatHang', 'id_NL','id_Listorder', 'Name', 'Danhmuc']
	tmp_remove.forEach(async (item) =>{
		data.forEach( obj => {
			Object.entries(obj).forEach(([key, value]) => {
				if(key === item){
					delete(obj[key])
				}
			})
		});
	});
	console.table( data );


	const arr = data
	data =[]
	var i = 0;
	var count = 0;
	arr.forEach( obj => {
		var i = 0;
		Object.entries(obj).forEach(([key, value]) => {
			renameKey( obj, key, tmp_title[i] )
			i++
		})
		// add STT in dict //
		// obj.STT = count
		count++

		/*-------- func move position key ------ */
		// obj = Object.entries(obj)
		// const swap = (arr, i, j) => {
		// 	;[arr[i], arr[j]] = [arr[j], arr[i]]
		// }
		// swap(obj, 0, 3)
		// swap(obj, 1, 3)
		// obj = Object.fromEntries(obj)
		// data.push(obj)
		
	});
	data = arr;
	console.table( data );
	
	
	/*------------- func export excel form json ----------- */
	var ws = XLSX.utils.json_to_sheet(data);
	var wb = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(wb, ws, "People");
	XLSX.writeFile(wb,filename);
}
/*----------------- func render rows table ------------------ */
async function render_rows(sortedList, title) {
	let html = '';
	switch (title) {
		case "DM_XINCHAO":
		break;
		case "DM_MAYTRAM":
			var value = [{
				id_may: '1',
				Maytram : 'M-001',
				ip:	'192.168.0.101',
				cpu: '22% 46°',
				gpu: '22% 46°',
				trangthai: 'Đang sử dụng',
				tk: 'KHAICAFE',
				begin: '20/03/2023 18:50:45',
				dadung: '18:50',
				conlai: '24:00',
				phi: '7000',
				group: 'Máy Thường',
		
			}, {
				id_may: '2',
				Maytram : 'M-002',
				ip:	'192.168.0.102',
				cpu: '22% 46°',
				gpu: '22% 46°',
				trangthai: 'Đã Tắt',
				tk: 'KHAICAFE',
				begin: '20/03/2023 18:50:45',
				dadung: '18:50',
				conlai: '24:00',
				phi: '7000',
				group: 'Máy Vip 1',
		
			}, {
				id_may: '3',
				Maytram : 'M-003',
				ip:	'192.168.0.103',
				cpu: '22% 46°',
				gpu: '22% 46°',
				trangthai: 'Sẵn sàng',
				tk: 'KHAICAFE',
				begin: '20/03/2023 18:50:45',
				dadung: '18:50',
				conlai: '24:00',
				phi: '7000',
				group: 'Máy Vip 1',
		
			}]
			console.table(value)
			html='';
			for (let index = 0; index < value.length; index++) {
				/*-------- parameter bia ------------ */
				let id_may = value[index].id_may
				let Maytram = value[index].Maytram
				let ip = value[index].ip
				let cpu = value[index].cpu
				let gpu = value[index].gpu
				let trangthai = value[index].trangthai
				let tk = value[index].tk
				let begin = value[index].begin
				let dadung = value[index].dadung
				let conlai = value[index].conlai
				let phi = value[index].phi
				let group = value[index].group
		
				// style
				let color_trangthai= '#0080ff';
				if (trangthai=='Đã Tắt'){
					color_trangthai = 'grey';
				}else if(trangthai =='Sẵn sàng'){
					color_trangthai = 'var(--bggreen)';
				}
		
				html += `<tr class="may_tram" id="${id_may}" style="font-size: 18px; texl-align: left;">`
						html += `<td data-label="MÁY TRẠM" class="rowspan_order" style="white-space: nowrap;">
									<div>
										<span class= 'maytram'>${Maytram}</span> <span class='ip'>[${ip}]</span>
										<p></p>
										<span class= 'cpu'>CPU: ${cpu}</span> <span class= 'gpu'>GPU: ${gpu}</span>
										
									</div>
								</td>`
						html += `<td data-label="TRẠNG THÁI">
									<p class="danhmuc" style="background: ${color_trangthai}; font-weight:600;font-size:17px; cursor: pointer;">${trangthai}</p>
								</td>`
						html += `<td data-label="TÀI KHOẢN">
									<div>
										<p class='tk'>${tk}</p>
										<p class="nhomTK">Hội Viên</p>
									</div>
								</td>`
		
						html += `<td data-label="BẮT ĐẦU" style="font-size: 17px;">${begin}</td>`
						html += `<td data-label="ĐÃ DÙNG">${dadung}</td>`
						html += `<td data-label="CÒN LẠI">${conlai}</td>`
						html += `<td data-label="SỐ TIỀN" style="text-align: right;">${money(phi)}</td>`
						html += `<td data-label="NHÓM MÁY" style="white-space: nowrap; color: white; font-weight: 600;text-align: right;">
									<p class="danhmuc" style="background: grey; font-weight:600;font-size:17px; cursor: pointer;">${group}</p>
								</td>`
						
				html += '</tr>'
				
			}
			var main = document.querySelector('#list_maytram');
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)
		
			let menu_row = document.querySelectorAll('tr');
			menu_row.forEach((el, i) => {
				el.addEventListener('contextmenu', function(e) {
					console.log(el.querySelector('.maytram').innerText)
					let namepc = el.querySelector('.maytram').innerText
					call_popup("Menu_maytram", namepc, el)
					e.preventDefault();
				  }, false);
			});
		
		break;
		case "DM_BIA":
			var value = sortedList
			for (let index = 0; index < value.length; index++) {
				/*-------- parameter bia ------------ */
				let id_table = value[index].id_table
				let name_bia = value[index].name
				let price_bia = value[index].price
				let Group_bia = value[index].Group
				let date_begin = value[index].date_begin
				// let date_end = value[index].date_end
				let trangthai = value[index].trangthai
				let btn_name = trangthai
				trangthai =''
				
				const list_order = value[index].list_order
				// const rowspan = list_order.length
		
				var date_now = new_date()
				const timestamp_seconds = get_seconds(date_now)/ 1000;		
				let date_begin_second = get_seconds(date_begin)/ 1000;	
				let Seconds = timestamp_seconds - date_begin_second
				// Seconds = 1000
		
				let hrs = Math.floor(Seconds / 3600);
				let mins = Math.floor((Seconds - (hrs*3600)) / 60);
				let secs = Seconds % 60;
			
				let sophut = Seconds/60;
				let gia_motphut = Math.floor(50000/60);
				let TTien = sophut*gia_motphut
				
				if (secs < 10) secs = '0' + secs;
				if (mins < 10) mins = '0' + mins;
				if (hrs < 10) hrs = '0' + hrs;
				
				date_begin = convert_dateToVN(date_begin)
				
				// ban bia
				let background_bia = 'green'	
				let opacity = '0.1';
				var TongTT = 0;
				let TT_frist;
				// dang lỗi chạy thời gian sai do đây kkkk
				if (btn_name == 'TÍNH TIỀN'){
					trangthai ='Đang sử dụng'
					background_bia = 'red';
					opacity = '1'
				}else if (btn_name =="DỌN BÀN"){
					background_bia = 'orange';
				}
				
				if (list_order.length>0){
					for (let j = 0; j < list_order.length; j++) {
						// list_order.forEach(function(element, index){
							let element = list_order[j]
							// console.log('rows', element)
							const date = convert_dateToVN(element.date_new)
							const name = element.Name
							const price = element.Price
							const sl = element.SL
							const ghichu = element.Ghichu
							var action = element.Action
							var Thaotac = element.Thaotac;
							const custom = element.Custom
							const nv = element.NvOrder
							const print = element.Print
							const color_name = element.color
							// console.log(color_name)
							const Topping_list_order = element.Topping
							// console.table(Topping_list_order)
							const id = element.Id
							var total = element.ThanhToan
							TongTT = Number(total) + Number(TongTT)
							console.log(TongTT)
				
							let color ='#ffffff'
							let background = 'green'
							let width = '95px'
							let border = 'none'
							let visibility = 'visible'
							let display = ''
							let disabled = null
							let name_nvthungan = nv
							let visibility_nvthungan = 'hidden'
							let display_nvthungan = 'none'
							let huy_visibility = 'visible'
							let huy_display = ''
							let huy_background = 'red'
							let huy_color = '#ffffff'
							let huy_action = 'HỦY'
							let huy_width = '50px'
							let huy_padding = '5px';
							let huy_disabled= null
							let display_print = '';
							let visibility_print= 'hidden';
		
							let remove_el = '';
							let rowspan = 0;
							let id_start='';
							if(j == 0){
								rowspan = list_order.length;
								id_start = 'start';
								TT_frist = 'TTfrist';
							}else{
								remove_el = 'rowspan-remove';
								btn_name = '';
							}
							if (j == list_order.length-1){
								value[index].Tong_TT = TongTT
							}
				
							if (action == 'HOANTHANH'){
								background = 'None';
								width = '125px';
								border = '1px solid green';
								color = 'green';
								visibility = 'hidden'
								display = 'none'
								disabled = 'disabled'
								visibility_nvthungan = 'visible';
								display_nvthungan = ''
								display_print = '';
								visibility_print = 'hidden';
								
							}else if (action == 'THUTIEN') {
								background = "orange";
								// color = 'black';
								// show name thu ngan
								visibility_nvthungan = 'visible';
								display_nvthungan = ''
								display_print = 'block';
								visibility_print = 'visible';
							}else if (action == 'HUY'){
								huy_visibility = 'hidden';
								huy_display = 'none'
								huy_background = 'none'
								huy_color = 'red'
								huy_action = Thaotac
								action = 'HOÀN THÀNH'
								huy_width = '100%'
								huy_disabled = 'disabled'
								visibility_nvthungan = 'visible';
								display_nvthungan = ''
								huy_padding = '0';
								// display_print = 'block';
								// visibility_print = 'visible';
							}
			
							html += `<tr class="has-rowspan" id="${id_table}" style="font-size: 18px;">`
								html += `<td data-label="THỜI GIAN" class="rowspan_order ${remove_el}" rowspan='${rowspan}' style=""><span class="date_order">${date_begin}</span></td>`
								html += `<td data-label="VỊ TRÍ" rowspan='${rowspan}' class="${remove_el}">
											<div class='bida'>
												<p>${name_bia}</p>
												<p>${money(price_bia)}/giờ</p>
												<img class="ban_bida" style="margin-top: 10px; opacity: ${opacity}" src="images_order/bida1.jpg">
											</div>
										</td>`
								html += `<td data-label="TÍNH GIỜ Billiards" rowspan='${rowspan}' class="${remove_el}" style="max-width: 400px; text-align: left; font-size: 14px; white-space: nowrap;">
											<p id='time_bida'>Bắt Đầu: ${date_begin}</p>
											<p id='time_bida_kt'>Kết Thúc: ${trangthai}</p>
											<p id='time_bida_sudung'>Thời Gian Thuê: </p>
											<p id='TTien' style='color: var(--yellow);'>Tạm Tính: ${money(TTien)}</p>
											<div class="counter">
												<div class="time">${hrs}:${mins}:${secs}</div>
												<div class="controls">
													<button id="${id_start}" style="background: ${background_bia};font-weight:600;">${btn_name}</button>
													
												</div>
											</div>
											
										</td>`
			
								html += `<td data-label="MẶT HÀNG" style="text-align: left; width:100%; min-width: 180px;">
											<div class="row" style="margin:0; position: relative;">
												<div style="width: 65%;">
													<a class="mathang" style="background-color: ${color_name};"></a>
													<span class="nameMH" style="font-size: 18px;">${name}</span>
												</div>
												<div style="">
													<span class="priceMH" style="font-size: 18px; position: absolute; right:5px; align-items: center;">${Number(price).format(0, 3, '.', ',')} <span style="color: yellow;">₫</span>
													</span>
												</div>
											</div>`
				
											if (Topping_list_order.length > 0){
												html +=         `<span>
																<table cellspacing="0" cellpadding="0" id="MHtoppings" class="table-popup" style="margin-top: 10px; display: block; font-size: 18px; width:100%;">
																	<thead>
																		<tr style="background-color:var(--yellow_low);">
																			<th style="font-size: 16px; text-align: left; font-size: 14px;">Topping</th>
																			<th style="font-size: 16px; text-align: center; font-size: 14px;">Số Lượng</th>
																			<th style="font-size: 16px; text-align: right; font-size: 14px;">Đơn Giá</th>									
																		</tr>
																	</thead>
																	<tbody id="list_order">`
												for (var n = 0; n < Topping_list_order.length; n++) {	
															html += `<tr>
																		<td data-label="TÊN" style="width:100%;font-size: 16px;"><span class="MHtopping" style="">${Topping_list_order[n].NameTopping}</span></td>
																		<td data-label="SL" style="max-width: 50px; text-align: center;"><span style="width: 100%; "/>${Topping_list_order[n].SL}</span></td>
																		<td data-label="ĐG" style="min-width: 100px; text-align: right;"><span class="MHtopping" style="float: right;">${Number(Topping_list_order[n].Topping_DG).format(0, 3, '.', ',')} <span style="color: yellow;"> ₫</span></span></td>
																	</tr>`	
																		
												}	
												html +=				`</tbody>
																</table>
															</span>`
							
											}
											
											// ghi chú
											if (ghichu){
												html += '<p style="margin-top:5px; float:left; font-size: 16px; color: red;min-width: 200px;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--dark)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg><i> '+ghichu+'</i></p>'
											}
							html += `</td>`
							html += '<td data-label="SL" style="text-align: center;">'+ sl +'</td>'
							// html += '<p style="margin-top:5px; float:left; font-size: 16px; color: red;min-width: 200px;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--dark)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg><i> '+ghichu+'</i></p></td>'
							html += '<td data-label="TT" style="white-space: nowrap; font-size: 18px; text-align: right;">'+ Number(total).format(0, 3, '.', ',') + '<span style="color: yellow;">₫</span></td>'
							html += '<td data-label="THAO TÁC" style="min-width: 180px;">'
							// min-width:265px;
							html += `<button type='button' ${disabled} style='cursor: pointer; visibility: ${huy_visibility}; display: ${huy_display}; color: ${color}; border-radius: 5px;border: ${border};width: ${width}; font-size: .9rem; min-height: 0px; background: ${background}; padding: ${huy_padding}; margin-right:5px; margin-bottom: 0px; font-weight: 600;' onclick='call(this);'>`+ Thaotac +`</button>`
							html += `<button type='button' ${huy_disabled} style='cursor: pointer; visibility: ${visibility}; display: ${display}; color: ${huy_color}; border-radius: 5px;border: none;width: ${huy_width}; font-size: .9rem; min-height: 0px; background: ${huy_background}; padding: ${huy_padding}; margin-right:10px; margin-bottom: 0px; font-weight: 600;' onclick='call(this)'>`+ huy_action +`</button>` 
							html += `<br><span style="visibility: ${visibility_nvthungan}; display: ${display_nvthungan}; color: green;">`
							html += '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>'
							html += `${name_nvthungan}</span>`
							html += '</td>'
			
							// console.log(print)
							if (print){
								html += `<td data-label="IN" class="rowspan_order ${remove_el}" rowspan='${rowspan}' style="white-space: nowrap;">`
								html += `<i class="ti-printer" style='display: ${display_print}; visibility: ${visibility_print}; cursor: pointer; color: green; border-radius: 5px;border: 1px solid green; font-size: 1.5rem; min-height: 35px; background: None; padding: 10px 15px;' class='inhoadon' onclick='call_print(this)'></i>`
								html += '</td>'
							}else{
								html += `<td data-label="IN" class="rowspan_order ${remove_el}" rowspan='${rowspan}' style="white-space: nowrap;">`
								html += `<i class="ti-printer" style="display: ${display_print}; visibility: ${visibility_print}; cursor: pointer; color: var(--dark); border-radius: 5px;border: 1px solid var(--border); font-size: 1.5rem; min-height: 35px; background: None; padding: 10px 15px;" class='inhoadon' onclick='call_print(this)'></i>`
								html += '</td>'
							}
			
							html += `<td data-label="THANH TOÁN" rowspan='${rowspan}' class="${remove_el} ${TT_frist}" style="max-width: 250px;font-size: 1.5rem;">${money(TongTT)}</td>`
							html += '</tr>'
						};
				}else{
					html += `<tr class="has-rowspan" id="${id_table}" style="font-size: 18px;">`
						html += `<td data-label="THỜI GIAN" class="rowspan_order" style=""><span class="date_order">${date_begin}</span></td>`
						html += `<td data-label="VỊ TRÍ">
									<div class='bida'>
										<p>${name_bia}</p>
										<p>${money(price_bia)}/giờ</p>
										<img class="ban_bida" style="margin-top: 10px; opacity: ${opacity}" src="images_order/bida1.jpg">
									</div>
								</td>`
						html += `<td data-label="TÍNH GIỜ Billiards" style="max-width: 400px; text-align: left; font-size: 14px; white-space: nowrap;">
									<p id='time_bida'>Bắt Đầu: ${date_begin}</p>
									<p id='time_bida_kt'>Kết Thúc: ${trangthai}</p>
									<p id='time_bida_sudung'>Thời Gian Thuê: </p>
									<p id='TTien' style='color: var(--yellow);'>Tạm Tính: ${money(TTien)}</p>
									<div class="counter">
										<div class="time">${hrs}:${mins}:${secs}</div>
										<div class="controls">
											<button id="start" style="background: ${background_bia};font-weight:600;">${btn_name}</button>
											
										</div>
									</div>
									
								</td>`
		
						html += `<td data-label="MẶT HÀNG" style="text-align: left; width:100%; min-width: 180px;"></td>`
						html += '<td data-label="SL"></td>'
						html += '<td data-label="TT" style="white-space: nowrap; font-size: 18px; text-align: right;"></td>'
						html += '<td data-label="THAO TÁC" style="min-width: 180px;"></td>'
						html += '<td data-label="IN" class="rowspan_order" style="white-space: nowrap;"></td>'
						html += `<td data-label="THANH TOÁN" style="max-width: 250px;font-size: 1.5rem;"></td>`
					html += '</tr>'
				}
				
			}
			main = document.querySelector('#list_bia');
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)
		
			/*--------------------- func auto count time ------------- */
			const elements = document.querySelectorAll('#start')
			TongTT = document.querySelectorAll('.TTfrist')
			for (let i = 0; i < elements.length; i++) {
				const el = elements[i];
				let row_table = el.parentNode.parentNode.parentNode.parentNode;
				el.addEventListener('click',function (evt) {
					start(row_table, value[i])
				});
				let btn_tinhtien = el.innerText
				if (btn_tinhtien ==='TÍNH TIỀN'){
					setCounter(row_table, value[i])
					if(TongTT[i])
						TongTT[i].innerHTML = money(value[i].Tong_TT);
					// console.table(value)
				}
			}
					
			function setCounter(element, value){
				let count = 0
				interval[value.id_table]= setInterval(() => {timers(element, value)}, 1000)	
			}
		
			function timers(element, value){
				let id_table = value.id_table
				let name_bia = value.name
				let price_bia = value.price
				// let Group_bia = value.Group
				let date_begin = value.date_begin
				// let date_end = value[index].date_end
				// let trangthai = value[index].trangthai
				// let btn_name = 'Bắt Đầu'
				
				// 
				var date_now = new_date()
				const timestamp_seconds = get_seconds(date_now)/ 1000;
		
				// var TZ='Asia/Ho_Chi_Minh'; //Target timezone from server
				// var date = new Date();       //Init this to a time if you don't want current time
				// date=new Date(Date.parse(date.toLocaleString("en-US", {timeZone: TZ})));
				// console.log(date)
		
				// const currentDate = new Date();
				// const timestamp_seconds = date.getTime();
			
				let date_begin_second = get_seconds(date_begin)/ 1000
				// let date_end_second = get_seconds(date_end)/ 1000
				let Seconds = timestamp_seconds - date_begin_second
				
		
				let hrs = Math.floor(Seconds / 3600);
				let mins = Math.floor((Seconds - (hrs*3600)) / 60);
				let secs = Seconds % 60;
			
				let sophut = Seconds/60;
				let gia_motphut = Math.floor(Number(price_bia)/60);
				let TTien = sophut*gia_motphut
				
				if (secs < 10) secs = '0' + secs;
				if (mins < 10) mins = '0' + mins;
				if (hrs < 10) hrs = '0' + hrs;
		
				let time_el = element.querySelector('.counter .time')
				let start_btn = element.querySelector('#start')
				// stop_btn = document.getElementById('stop')
				// reset_btn = document.getElementById('reset')
				let TTienbida = element.querySelector('#TTien')
				// time_bida = document.getElementById('time_bida')
				// time_bida_kt = document.getElementById('time_bida_kt')
				// time_bida_sudung = document.getElementById('time_bida_sudung')
				let ban_bida = element.querySelector('.ban_bida')
		
				if (time_el){
					time_el.innerText = `${hrs}:${mins}:${secs}`;
					TTienbida.style.color = 'var(--yellow)'
					TTienbida.innerHTML = 'Tạm Tính: '+ money(TTien);
					start_btn.style.background = 'red';
					start_btn.innerHTML = 'TÍNH TIỀN';
					// var Date_Create = new Date().toLocaleString("vi-VN", {timeZone: "Asia/Ho_Chi_Minh"});
					// time_bida.innerText ='Bắt Đầu: '+ Date_Create
					// TTienbida.innerText = 'Tạm Tính: 0 ₫'
					ban_bida.style.opacity = "1";
					// ban_bida.style.filter  = 'alpha(opacity=100)';
				}
			}
		
			async function start (element, value){
				let dateofrow = element.children[0]
				var id_row = element.getAttribute('id');
				// console.log(id_row)
				let bia_MH = element.children[3]
				let bia_SL= element.children[4]
				let bia_TT= element.children[5]
				let bia_Thaotac= element.children[6]
				let bia_print = element.children[7]
				let bia_thanhtoan = element.children[8]
				
				let time_el = element.querySelector('.counter .time')
				let start_btn = element.querySelector('#start')
				let stop_btn = element.querySelector('#stop')
				let reset_btn = element.querySelector('#reset')
				let TTienbida = element.querySelector('#TTien')
				let time_bida = element.querySelector('#time_bida')
				let time_bida_kt = element.querySelector('#time_bida_kt')
				let time_bida_sudung = element.querySelector('#time_bida_sudung')
				let ban_bida = element.querySelector('.ban_bida')
				
				
				if (start_btn.innerText=='BẮT ĐẦU'){
					value.date_begin = new_date();
					interval[value.id_table]= setInterval(() => {timers(element, value)}, 1000)		
					start_btn.style.background = 'red';
					start_btn.innerHTML = 'TÍNH TIỀN';
				
					var Date_Create = convert_dateToVN(new_date());
					if (dateofrow){dateofrow.innerText = Date_Create}
					time_bida.innerText ='Bắt Đầu: '+ Date_Create
					TTienbida.innerText = 'Tạm Tính: 0 ₫'
					ban_bida.style.opacity = "1";
					//   ban_bida.style.filter  = 'alpha(opacity=100)';
					time_bida_kt.innerText ='Kết Thúc: Đang sử dụng'
					time_bida_sudung.innerText = `Thời Gian Thuê: `
		
				}else if (start_btn.innerHTML=='TÍNH TIỀN'){
					clearInterval(interval[value.id_table]);
					delete(interval[value.id_table])
					start_btn.style.background = 'orange';
					// time_el.innerText = '00:00:00';
					start_btn.innerHTML = 'DỌN BÀN';
					var Date_Create = convert_dateToVN(new_date())
					
					TTienbida.innerText = TTienbida.innerText.replace('Tạm Tính','Tiền Giờ');
					ban_bida.style.opacity = ".1";
					time_bida_kt.innerText ='Kết Thúc: '+ Date_Create
					time_bida_sudung.innerText = `Thời Gian Thuê: ${time_el.innerText}`
					/*------------------ Tính tổng bill ---------------- */
					let Tong = Number((bia_thanhtoan.innerText).replaceAll(/\D+/g, '')) + Number(TTienbida.innerText.replaceAll(/\D+/g, ''))
					bia_thanhtoan.innerHTML = money(Tong)
		
					
				}else if (start_btn.innerHTML=='DỌN BÀN'){
					// start_btn.style.background = 'green';
					// start_btn.innerHTML = 'BẮT ĐẦU';
					// bia_MH.innerText = ''
					// bia_SL.innerText= ''
					// bia_TT.innerText= ''
					// bia_Thaotac.innerText= '' 
					// bia_print.innerText = ''
					// bia_thanhtoan.innerText = ''
					// time_el.innerText = "00:00:00"
					// time_bida.innerText ='Bắt Đầu:'
					// time_bida_kt.innerText ='Kết Thúc: '
					// time_bida_sudung.innerText = `Thời Gian Thuê:`
					// TTienbida.innerText = `Tiền Giờ: 0₫`
					// if (dateofrow){dateofrow.innerText = ''}
					let temp = {action: 'getBia',}
					const res = await instance.post('/Bi-a', temp);
					let values = res.data
					await render_rows(values, 'DM_BIA');
					// // const delet_tr = document.querySelectorAll(`tr#'${id_row}'`)
					// // delet_tr.forEach((element, index, array) => {
					// // 					element.classList.remove('active');
					// // 			})
					// let table = document.querySelector('table')
					// let count_tr=0;
					// for (let index = 0; index < table.rows.length; index++) {
					// 	let id = table.rows[index].id
					// 	if (id === id_row){
					// 		if(count_tr!==0){
					// 			table.deleteRow(index);
					// 		}
					// 		count_tr++;
					// 	}
					// 	console.log()
					// 	// table.deleteRow(0);
					// 	// .getAttribute('id')
					// }
				}
				
				
			}
		
		break;
		case "DM_DONHANG":
			// list_table = list_table_temp
			main = document.getElementById('list_order');
			if (main){
				main.innerHTML = '';
				html=''
				// const value_table = list_table
				for (let index = 0; index < sortedList.length; index++) {
					const element = sortedList[index];			
					const date = convert_dateToVN(element.date_new)
					const name = element.Name
					const price = element.Price
					const sl = element.SL
					const ghichu = element.Ghichu
					const Thaotac = element.Thaotac
					var action = element.Action
					const custom = element.Custom
					const nv = element.NvOrder
					const print = element.Print
					var color_name = await get_color(color_list, element.color)
					color_name = color_name.color
					const Topping_list_order = element.Topping
					const id = element.Id
					var total = element.ThanhToan

					let color ='#ffffff'
					let background = 'green'
					let width = '95px'
					let border = 'none'
					let visibility = 'visible'
					let display = ''
					let disabled = null
					let name_nvthungan = nv
					let visibility_nvthungan = 'hidden'
					let display_nvthungan = 'none'
					let huy_visibility = 'visible'
					let huy_display = ''
					let huy_background = 'red'
					let huy_color = '#ffffff'
					let huy_action = 'HỦY'
					let huy_width = '50px'
					let huy_padding = '5px';
					let huy_disabled= null
					let display_print = '';
					let visibility_print= 'hidden';

					switch (action) {
						case 'HOANTHANH':
							background = 'None';
							width = '125px';
							border = '1px solid green';
							color = 'green';
							visibility = 'hidden'
							display = 'none'
							disabled = 'disabled'
							visibility_nvthungan = 'visible';
							display_nvthungan = ''
							display_print = '';
							visibility_print = 'hidden';
						break;
						case 'CHAPNHAN':
						break;
						case 'THUTIEN':
							background = "orange";
							// color = 'var(--white_text)';
							// show name thu ngan
							visibility_nvthungan = 'visible';
							display_nvthungan = ''
							display_print = 'block';
							visibility_print = 'visible';
						break;
						case 'HUY':
							huy_visibility = 'hidden';
							huy_display = 'none'
							huy_background = 'none'
							huy_color = 'red'
							huy_action = Thaotac
							action = 'HOÀN THÀNH'
							huy_width = '100%'
							huy_disabled = 'disabled'
							visibility_nvthungan = 'visible';
							display_nvthungan = ''
							huy_padding = '0';
						break;
						// display_print = 'block';
						// visibility_print = 'visible';
					}
					if (price){
						html += `<tr class="has-rowspan" id="${id}" style="font-size: 18px;">`
						html += '<td data-label="THỜI GIAN" class="rowspan_order" style=""><span class="date_order">'+ date +'</span></td>'
						html += `<td data-label="VỊ TRÍ" class="rowspan_order"><span class="custom_order" style='color: #3bccd6; white-space: nowrap;'>`+ custom +`</span></td>`
						html += `<td data-label="MẶT HÀNG" style="text-align: left; width:100%; min-width: 180px;">
									<div class="row" style="margin:0; position: relative;">
										<div style="width: 65%;">
											<a class="mathang" style="background-color: ${color_name};"></a>
											<span class="nameMH" style="font-size: 18px;">${name}</span>
										</div>
										<div style="">
											<span class="priceMH" style="font-size: 18px; position: absolute; right:5px; align-items: center;">${Number(price).format(0, 3, '.', ',')} <span style="color: yellow;">₫</span>
											</span>
										</div>
									</div>`
						if (Topping_list_order.length > 0){
							html +=         `<span>
											<table cellspacing="0" cellpadding="0" id="MHtoppings" class="table-popup" style="margin-top: 10px; display: block; font-size: 18px; width:100%;">
												<thead>
													<tr style="background-color:var(--yellow_low);">
														<th style="font-size: 16px; text-align: left; font-size: 14px;">Topping</th>
														<th style="font-size: 16px; text-align: center; font-size: 14px;">Số Lượng</th>
														<th style="font-size: 16px; text-align: right; font-size: 14px;">Đơn Giá</th>									
													</tr>
												</thead>
												<tbody id="list_order">`
							for (var n = 0; n < Topping_list_order.length; n++) {	
										html += `<tr>
													<td data-label="TÊN" style="width:100%;font-size: 16px;"><span class="MHtopping" style="">${Topping_list_order[n].NameTopping}</span></td>
													<td data-label="SL" style="max-width: 50px; text-align: center;"><span style="width: 100%; "/>${Topping_list_order[n].SL}</span></td>
													<td data-label="ĐG" style="min-width: 100px; text-align: right;"><span class="MHtopping" style="float: right;">${Number(Topping_list_order[n].Topping_DG).format(0, 3, '.', ',')} <span style="color: yellow;"> ₫</span></span></td>
												</tr>`	
													
							}	
							html +=				`</tbody>
											</table>
										</span>`

						}
						// ghi chú
						if (ghichu){
							html += '<p style="margin-top:5px; float:left; font-size: 16px; color: red;min-width: 200px;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--dark)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg><i> '+ghichu+'</i></p></td>'
						}
						html += '<td data-label="SL">'+ sl +'</td>'
						html += '<td data-label="TT" style="white-space: nowrap; font-size: 18px; text-align: right;">'+ Number(total).format(0, 3, '.', ',') + '<span style="color: yellow;">₫</span></td>'
						html += '<td data-label="THAO TÁC" style="min-width: 180px;">'
						html += `<button type='button' ${disabled} style='cursor: pointer; visibility: ${huy_visibility}; display: ${huy_display}; color: ${color}; border-radius: 5px;border: ${border};width: ${width}; font-size: .9rem; min-height: 0px; background: ${background}; padding: ${huy_padding}; margin-right:5px; margin-bottom: 0px; font-weight: 600;' titles="DM_DONHANG" item="${action}">`+ Thaotac +`</button>`//onclick='call(this);'
						html += `<button type='button' ${huy_disabled} style='cursor: pointer; visibility: ${visibility}; display: ${display}; color: ${huy_color}; border-radius: 5px;border: none;width: ${huy_width}; font-size: .9rem; min-height: 0px; background: ${huy_background}; padding: ${huy_padding}; margin-right:10px; margin-bottom: 0px; font-weight: 600;' titles="DM_DONHANG" item="HUY">`+ huy_action +`</button>` //onclick='call(this);'
						html += `<br><span style="visibility: ${visibility_nvthungan}; display: ${display_nvthungan}; color: green;">`
						html += '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>'
						html += ` ${name_nvthungan}</span>`
						html += '</td>'
						if (print){
							html += '<td data-label="IN" class="rowspan_order" style="white-space: nowrap;">'
							html += `<i class="ti-printer" style='display: ${display_print}; visibility: ${visibility_print}; cursor: pointer; color: green; border-radius: 5px;border: 1px solid green; font-size: 1.5rem; min-height: 35px; background: None; padding: 10px 15px;' class='inhoadon' titles="DM_DONHANG" item="PRINT"></i>`
							html += '</td>'
						}else{
							html += '<td data-label="IN" class="rowspan_order" style="white-space: nowrap;">'
							html += `<i class="ti-printer" style="display: ${display_print}; visibility: ${visibility_print}; cursor: pointer; color: var(--dark); border-radius: 5px;border: 1px solid var(--border); font-size: 1.5rem; min-height: 35px; background: None; padding: 10px 15px;" class='inhoadon' titles="DM_DONHANG" item="PRINT"></i>`// onclick='call_print(this)'
							html += '</td>'
						}
						html += `<td data-label="THANH TOÁN" style="max-width: 250px;font-size: 1.5rem; white-space: nowrap; text-align: right;" class="rowspan_order">`+ Number(total).format(0, 3, '.', ',') + '<span style="color: yellow;">₫</span></td>'
						html += '</tr>'
					}else{
						/*------------------------ yêu cầu & góp ý ------------- */ 
						html += `<tr class="has-rowspan" id="${id}" style="background: #99d32524;">`
						html += '<td data-label="THỜI GIAN" class="time"><span class="date_order">'+ date +'</span></td>'
						html += `<td data-label="VỊ TRÍ" class="rowspan_order">`+custom+`</td>`
						// html += '<td data-label="MẶT HÀNG" style="text-align: leftmax-width:200px;"><a class="mathang">'+ name +'</a></span>'s
						html += '<td data-label="MẶT HÀNG" style="text-align: left; max-width: 250px;"><a class="mathangs"></a><span class="nameMH">'+ name +'</span>'
						
						// ghi chú
						if (ghichu){
							html += '<br><p style="margin-top:5px;float:left; font-size: .9rem; color: red;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--dark)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg><i><i> '+ghichu+'</i></p></td>'
						}
						html += '<td data-label="SL"></td>'
						html += '<td data-label="TT"></td>'
						html += '<td data-label="THAO TÁC"></td>'
						html += '<td data-label="IN"></td>'
						html += `<td data-label="THANH TOÁN"></td>`
						html += '</tr>'
					}			
				};
				
				main.innerHTML = '';
				main.insertAdjacentHTML("afterbegin",html)
				/*-------- func gộp rows ---------------- */
				await clearRowspan(jQuery('table'), 0);
				/*--------- func event btn click --------- */
				let btn_click = document.querySelectorAll('#list_order button')
				for (let index = 0; index < btn_click.length; index++) {
					const element = btn_click[index];
					element.addEventListener('click', function(e) {
						if(element.getAttribute('item')!=='HUY')
							save_popup(this)
						else{
							call_popup("DM_DONHANG", "HUY", this)
						}
					});
				}
				/** func print */
				let btn_print = document.querySelectorAll('#list_order .ti-printer')
				for (let index = 0; index < btn_print.length; index++) {
					const element = btn_print[index];
					element.addEventListener('click', function(e) {
						if (element.getAttribute('item')=='PRINT'){
							save_popup(this)
						}
					});
				}
				/*--------- func chẵn lẻ ----------- */
				var even = 'even'
				var tmp;
				$('tbody').find('tr.has-rowspan').each(function() { 
					try {
						const src = this.children[0].textContent + this.children[1].textContent
						if (tmp != src){
							tmp = src
							if (even=='even'){
								even = ''
							}else{even='even'}
						}
						this.setAttribute("class", even);
					} catch (error) {
						console.log(error, this)
					} 
				});
			}
		break;
		case "DM_TAODONHANG":
			var arry_list = [];
			for (let index = 0; index < sortedList.length; index++){
				const element = sortedList[index];
				// console.log(element)
				const id = element.id
				const photo = element.photo
				const ten_MH = element.name
				const danhmuc_MH = element.Danhmuc
				var price = element.price
				var show_price = 'hidden';
				var price_KM = price
				const nguyenlieu_MH = element.NguyenLieu
				const Topping_MH = element.Topping
				const min_tonkho = min_max(nguyenlieu_MH, 'Tonkho').min
				const KhuyenMai = element.KhuyenMai;
				const timer = element.timer;
				const OpenHengio = element.OpenHengio;
				var timer_sale = '00:00-24:00'
				const moban_MH = element.moban;
				const lock_chinhsua = element.lock;
				element.Tonkho = min_tonkho
				element.sl = 1
				element.Ghichu = ''
				element.action = 'CHẤP NHẬN'
				element.Thaotac = 'CHAPNHAN';
				element.photo = null
				element.Custom = '**Khách Vãng Lai**'//document.querySelector('#tenmay').innerHTML
				const SL_mathang = document.querySelectorAll('.order-card .order-soluong')
				element.id_MH = SL_mathang.length
				const DM_parent = (element.tree_DM).substring(0,1);
				
				if (price !== 'Tuỳ Chọn'){
					for (let index = 0; index < KhuyenMai.length; index++) {
						const item = KhuyenMai[index];
						let id_loaiKM = item.id_loaiKM
						if (id_loaiKM == 1){
							price_KM = Number(price)-((Number(price)*Number(item.phantramKM))/100)
							show_price = 'visible';
							element.price =price_KM;
							//tính giá xong convert string luôn
							price_KM = money(price_KM)	
						}
					}
					price_KM = money(price_KM)
					price = money(price)
				}else{price_KM = `<span style="color: yellow;">${price_KM}</span>`}
				
				//check hiển thị tồn kho chưa làm

				let show_mathang= '';
				let timer_moban=true;

				//check lock chinh sua
				if (lock_chinhsua=='checked'){
					//check mo bán từng Mặt hàng
					moban_MH == 'checked' ? show_mathang ='': show_mathang = 'none'
					//check giờ bán giờ ngừng
					if (OpenHengio=="checked"){
						if (timer.length >0){
							for (let index = 0; index < timer.length; index++) {
								const element = timer[index];
								var time_current = new_date().split(' ')[1]
								timer_sale= `${element.gioban}-${element.giongung}`

								let ti_cur =  time_current.split(':');
								let ti_moban =  element.gioban.split(':');
								let Se_cur = parseInt(ti_cur[0] * 3600 + ti_cur[1] * 60 + ti_cur[0]);
								let Se_moban = parseInt(ti_moban[0] * 3600 + ti_moban[1] * 60 + ti_moban[0]);
								let ti_ngungban =  element.giongung.split(':');
								let Se_ngungban = parseInt(ti_ngungban[0] * 3600 + ti_ngungban[1] * 60 + ti_ngungban[0]);
								if (Se_cur >= Se_moban){
									// console.log('bat dau')
									Se_ngungban >= Se_cur ? timer_moban = true: timer_moban = false
								}else timer_moban = false
								timer_moban == true ? show_mathang ='': show_mathang = 'none'
							}
						}
					}
				}else{
					//dang chinh sua
					show_mathang = 'none'
				}

				//check không phải là topping thì cho show
				if (danhmuc_MH != "Topping"){
					if (min_tonkho===0){
						html +=`<div class="dashboard-card" id='${index}' DM=${DM_parent} style="display: ${show_mathang};">`
						html +=     `<img class="card-image" src="${photo}" onerror="this.onerror=null;this.src='/images_order/no-image.jpg';">`
						html +=      `<div class="card-detail">`
						html +=         `<h4 class="card-name"><b style="color: red; font: var(--body-font);">[Hết] </b>${ten_MH}</h4>`
					}else{
						// html +=`<div class="dashboard-card" id=${id} onclick="order(this, '${book}')">`
						html +=`<div class="dashboard-card" id='${index}' DM=${DM_parent} style="display: ${show_mathang};">`
						html +=     `<img class="card-image" src="${photo}" onerror="this.onerror=null;this.src='/images_order/no-image.jpg';">`
						html +=      `<div class="card-detail">`
						html +=         `<h4 class="card-name"><b style="color: var(--xanhla); font: var(--body-font);">[${min_tonkho}] </b>${ten_MH}</h4>`
					}
						html +=         `<div class="price-old" style="display: flex; justify-content: flex-end; visibility: ${show_price};">
											<h3><span class="card-price-old">${price}</span></h3>
										</div>
										<div style="display: flex; justify-content: flex-end; position: relative;">
											<p class="card-time"><span class="fas fa-clock"></span> ${timer_sale}</p>
											<h3><span class="card-price">${price_KM}</span></h3>
										</div>`
						html +=       `</div>`
						html +=       `<div class='overlay-order'><span class="fas fa-shopping-cart"><p>Thêm Vào Giỏ</p></span></div>`
						html +=`</div>`
				}
				arry_list.push(element)
			};
			var custom_order = document.querySelector(".custom_order");
			custom_order.insertAdjacentHTML("afterbegin",html)
			/*------------- add event btn ---------------- */
			const dashboard_card = document.querySelectorAll('.dashboard-card')
			for (let index = 0; index < dashboard_card.length; index++) {
				const element = dashboard_card[index];
				element.addEventListener('click',function (evt) {
					const obj_tmp =  arry_list[index]
					order(element, JSON.stringify(obj_tmp))
					// console.log(list_giohang)
				});			
			}
			// const result= {html: html, dict: arry_list};
			/*---test css ---- */
			// for(i=0; i<5; i++) {
			// 	html +=`<div class="dashboard-card">`
			// 	html +=     `<img class="card-image" src="/KLMENU/images_order/images2.jpg" onerror="this.onerror=null;this.src='/images_order/no-image.jpg';">`
			// 	html +=      `<div class="card-detail">`
			// 	html +=         `<h4 class="card-name">
			// 	<b style="color: var(--xanhla); font: var(--body-font);">[${1}] </b>Bún bánh bèo nhèo + cơm sườn trứng 2 trái + Bún bánh bèo nhèo</h4>`
			
			// 	html +=         `<div class="price-old" style="display: flex; justify-content: flex-end;">
			// 						<h3><span class="card-price-old">${Number(10000).format(0, 3, '.', ',')}<span style="color: yellow;">₫</span></span></h3>
			// 					</div>
			// 					<div style="display: flex; justify-content: flex-end; position: relative;">
			// 						<p class="card-time"><span class="fas fa-clock"></span> 5-15 mins</p>
			// 						<h3><span class="card-price">${Number(10000).format(0, 3, '.', ',')}<span style="color: yellow;">₫</span></span></h3>
			// 					</div>`
								
			// 	html +=       `</div>`
			// 	html +=       `<div class='overlay-order'><span class="fas fa-shopping-cart"><p>Thêm Vào Giỏ</p></span></div>`
			// 	html +=`</div>`
			// }
			return
		break;
		case "DM_THONGKE":
		break;
		case "DM_BAOCAO":
		break;
		case "DM_COBAN":
		break;
		case "DM_MAYIN":
		break;
		case "DM_NHANVIEN":
			
		break;
		case "DM_DANHMUC":
			for (let index = 0; index < sortedList.length; index++) {
				const element = sortedList[index];
				const id = element.id;
				const obj_color = await get_color(color_list, element.color)
				const id_color = element.color;
				const color = obj_color.color;
				var ten_DM = element.name
				const mota_DM = element.mota
				const moban = element.mobanDM
				
				var DTkhac = element.DTkhac
				var DMcha = element.DMcha
				let background='#0080ff';
				let fontsize = '14px';
				if(DMcha=='Không Có Danh Mục Cha'){
					DMcha ='Không có';
					background = 'transparent'
					fontsize = '17px';
				}
				
				html += `<tr id='${id}'>`
				html += `<td data-label="TÊN" id='${id_color}'><a class="mathang" style="background-color: ${color}"></a><span class="table-nameDM" style="font-size: 18px; margin-left: 5px; font-weight:600;">${ten_DM}</span></td>`
				html += `<td data-label="MÔ TẢ" style="font-style:italic; color: grey;"><i>${mota_DM}</i></td>`
				html += `<td data-label="DANH MỤC CHA"><span class="danhmuc" style="background: ${background}; font-size: ${fontsize};">${DMcha}</span></td>`
				html += `<td data-label="DOANH THU KHÁC"><i class="ti-check ${DTkhac}"></i></td>`
				html += `<td data-label="MỞ BÁN">
							<label for=${id+'a'} class="toggle_checkbox"> 
							<input type="checkbox" id=${id+'a'} class="toggle_input" ${moban} hidden=""/>
							<div class="toggle_bar">
								<div class="toggle_spin"></div>
							</div>
						</td>`
				html += `<td data-label="THAO TÁC" style="text-align: left;"><div class="danhmuc_thaotac" titles="${title}"><i class="far fa-edit" item="edit"></i>  <i class="far fa-trash-alt" item="del"></i></td>`
				html += '</tr>'
			}
			return html;
		case "DM_MATHANG":
			for (let index = 0; index < sortedList.length; index++){
				const element = sortedList[index];
				console.log(element)
				const id = element.id
				const photo = element.photo
				const ten_MH = element.name
				const danhmuc_MH = element.Danhmuc
				var price = element.price
				const nguyenlieu_MH = element.NguyenLieu
				const Topping_MH = element.Topping
				const min_tonkho = min_max(nguyenlieu_MH, 'Tonkho').min
				const moban = element.moban
				const lock = element.lock
				const timer = element.timer;
				const OpenHengio = element.OpenHengio;
				let background_timer ='grey';
				let color_timer ='black';
				OpenHengio =='checked'? background_timer ='var(--red)' : background_timer ='grey';
				OpenHengio =='checked'? color_timer ='var(--white_text)' : color_timer ='black';
				var muctoithieu = element.muctoithieu;
				var ti_lock = "block"
				var ti_unlock = "none"
				if (lock =='unchecked'){
					ti_lock = "none"
					ti_unlock = "block"
				}
				if (price=='Tuỳ Chọn'){
					price = `<span style="color: green; white-space: nowrap;">${price}</span>`
					if(muctoithieu !='0')
						muctoithieu = `<caption style="text-align: left;padding:3px;border: none; white-space: nowrap;">Chọn topping từ: ${money(muctoithieu)}</caption>`;
					else muctoithieu = ''
				}else{
					price = money(price);
					muctoithieu = '';
				}
				html += `<tr class="has-rowspan" id='${id}'>`
				html += `<td data-label="STT" style="text-align: center;">${index+1}</td>`
				html += `<td data-label="ẢNH"><img class="mathang_thietlap" src='${photo}'></td>`
				html += `<td data-label="TÊN" style="display: table; margin-top: 5px; float: left;"><span class="table-nameMH" style="margin-left: 5px; color: yellow;">${ten_MH}</span><br>`
				for (var n = 0; n < nguyenlieu_MH.length; n++) {
					html +=`<p class="danhmuc">${nguyenlieu_MH[n].nameNL}</p>`
				}
		
				if (Topping_MH.length > 0){
					html +=         `<!-- <div class="table_responsive"> -->
					
									<table cellspacing="0" cellpadding="0" id="MHtoppings" class="table-popup" style="margin-top: 0; display: block;">
										${muctoithieu}
										<thead>
											<tr>
												<th>TOPPING</th>
												<th style="text-align: right;">Đơn Giá</th>									
											</tr>
										</thead>
										<tbody id="list_order">`
					for (var n = 0; n < Topping_MH.length; n++) {	
						// console.log(Topping_MH[n].Topping_DG)
								html += `<tr>
											<td data-label="Name"><span class="MHtopping" style="user-select: none;">${Topping_MH[n].nameTopping}</span></td>
											<td data-label="ĐG" style="text-align: right;"><span class="" style="user-select: none; text-align: right;">${money(Topping_MH[n].Topping_DG)}</span></td>
										</tr>`	
											
					}	
					html +=				`</tbody>
									</table>
								<!-- </div> -->`
		
				}
	
				html += `</td>`
				html += `<td data-label="ĐƠN GIÁ"><span style="margin-left: 5px; color: red; font-size: 20px;">${price}</span></td>`
				if (min_tonkho==0){
					html += `<td data-label="TỒN KHO"><span style="margin-left: 5px; color: red; font-size: 20px;">Hết</span></td>`
				}else{
					html += `<td data-label="TỒN KHO"><span style="margin-left: 5px; color: green; font-size: 20px;">${min_tonkho}</span></td>`
				}
				
				html += `<td data-label="DANH MỤC">${danhmuc_MH}</td>`
				html += `<td data-label="MỞ BÁN">
							<label for="${id+'a'}" class="toggle_checkbox"> 
							<input type="checkbox" id="${id+'a'}" class="toggle_input" ${moban} hidden=""/>
							<div class="toggle_bar">
								<div class="toggle_spin"></div>
							</div>
						</td>`
				html += `<td data-label="KHÓA"><i class="ti-lock" style="display: ${ti_lock};"></i><i class="ti-unlock" style="display: ${ti_unlock};"></i></td>`
				html += `<td data-label="HẸN GIỜ" style="width: 50px;">
							<div>`
				for (var n = 0; n < timer.length; n++) {
					html+=`<p style="white-space: nowrap; margin: 5px; padding: 3px 6px 3px 6px; background: ${background_timer}; color: ${color_timer}; border-radius: 5px; font-size: 14px; font-weight:600;">${timer[n].gioban} - ${timer[n].giongung}</p>`
				}
				html+=		`</div>
						</td>`
				html += `<td data-label="THAO TÁC"><div class="danhmuc_thaotac" titles="${title}"><i class="far fa-edit" item="edit"></i>  <i class="far fa-clock" item="time"></i></td>`
				html += '</tr>'
			}
			return html;
		case "DM_NHOMMATHANG":
			for (let index = 0; index < sortedList.length; index++) {
				const element = sortedList[index];
				const id = element.id_nhom
				const name = element.name
				let mota_nhom = element.mota
				mota_nhom ==''? mota_nhom = 'Không có mô tả' : mota_nhom
				var hienthi = element.show
				hienthi = hienthi.trim() !=='checked' ? 'Thường' : 'Quick Link'
				let background = element.show.trim() !=='checked' ? 'grey' : 'var(--blue)'
				
				let nhan = element.label
				nhan = nhan.trim() !=='checked' ? "not_show":''
				let label = element.name_label
				var color = await get_color(color_list, element.color_nhom)
				// console.log(color.color,nhan )
				if (color){}
				html += `<tr id=${id}>`
				html += `<td data-label="TÊN" class="time">${name}</td>`
				html += `<td data-label="MÔ TẢ" style="font-style:italic; color: grey;">${mota_nhom}</td>`
				html += `<td data-label="HIỂN THỊ"><span class="danhmuc" style="background: ${background}; font-size:14px; cursor: pointer;">${hienthi}</span></td>`
				html += `<td data-label="NHÃN"><span class="danhmuc ${nhan}" style="background: ${color.color}; font-size:14px; cursor: pointer;">${label}</span></td>`
				html += '<td data-label="THAO TÁC" style="text-align: left;"><div class="danhmuc_thaotac" titles="DM_NHOMMATHANG"><i class="far fa-edit" item="edit"></i>  <i class="ti-support" item="add"></i> <i class="far fa-trash-alt" item="del"></i></td>'
				html += '</tr>'
			};
			return html;
		case "DM_KHUYENMAI":
			for (let index = 0; index < sortedList.length; index++) {
				const element = sortedList[index];
				const id_khuyenmai = element.id_khuyenmai
				const name = element.name_KM
				const nhom = element.name
				const phantram = element.phantramKM
				const id_loaiKM = element.id_loaiKM
				const loai_KM = element.loaigiamgia
				const date_begin = element.date_begin
				const date_end = element.date_end
				let background = 'var(--bgreen)'
				let taoma=`<span class="danhmuc" style="background: transparent;font-size:14px; cursor: pointer; color: #0080ff;border: 1px solid #0080ff;" onclick="switch_tab('Tạo Mã', '${id_khuyenmai}')">QUẢN LÝ MÃ</span>`;
				if (loai_KM=="Giảm Trực Tiếp"){
					background = 'var(--yellow)';
					taoma = '';
				}
			
				html += `<tr id=${id_khuyenmai}>`
				html += `<td data-label="CHƯƠNG TRÌNH" style="color: var(--bggreen);">${titleCase(name)}</td>`
				html += `<td data-label="NHÓM" style="white-space: nowrap;">
							<span class="danhmuc" style="background: grey;font-size:14px; cursor: pointer;">Nhóm</span> ${nhom}
						</td>`
				html += `<td data-label="PHẦN TRĂM" style="color: red;">${phantram}%</td>`
				html += `<td data-label="LOẠI GIẢM GIÁ" id="${id_loaiKM}">
							<span class="danhmuc" style="background: ${background};font-size:14px; cursor: pointer;">${loai_KM}</span>
						</td>`
				html += `<td data-label="BẮT ĐẦU">${date_begin}</td>`
				html += `<td data-label="KẾT THÚC">${date_end}</td>`
				html += `<td data-label="THAO TÁC" style="text-align: left;"><div class="danhmuc_thaotac" titles="DM_KHUYENMAI">
							<i class="far fa-edit" item="edit"></i> <i class="far fa-trash-alt" item="del"></i>
							${taoma}
							</td>`
				html += '</tr>'
			};
			return html;
		case "DM_TAOMA":
			for (let index = 0; index < sortedList.length; index++) {
				const element = sortedList[index];
				let name = element.maKM
				const id_magiam = element.id_magiam
				const solansudung = element.solansudung
				const solantkdung = element.solantkdung
				const dasudung = element.dasudung
					html += `<tr id=${id_magiam}>`
					html += `<td data-label="MÃ">${name}</td>`
					html += `<td data-label="SỐ LẦN SỬ DỤNG" style="color: var(--red_text);">${solansudung}</td>`
					html += `<td data-label="SỐ LẦN/TÀI KHOẢN" style="color: var(--white_text);">${solantkdung}</td>`
					html += `<td data-label="ĐÃ SỬ DỤNG" style="color: green;">${dasudung}</td>`
					html += `<td data-label="THAO TÁC" style="text-align: left;"><div class="danhmuc_thaotac" titles="${title}"><i class="far fa-edit" item="edit"></i></td>`
					html += '</tr>'
			};
			return html;
		case "DM_MENUDICHVU":
			var list_doan = [];
			var list_douong = [];
			for(let i=0; i<sortedList.length; i++) {
				let element = sortedList[i]
				const DM_cha = element.tree_DM
				if(DM_cha.substring(0,1)=='1'){
					list_doan.push(element)
				}else if(DM_cha.substring(0,1)=='2'){
					list_douong.push(element)
				}
			}
			console.log(list_douong, list_doan)
			temp_order ={
				id: '2',
				name: 'sort_DA',
				action: 'get_sort'
			}
			let res = await instance.post('/sortlist', temp_order);
			let sort_da = (res.data)[0]
			sort_da = eval(sort_da.sort)
			// console.log(res.data, sort_da, Show_MH.data)
			list_doan.sort((a, b) => sort_da.indexOf(a.id) - sort_da.indexOf(b.id));
			for(let i=0; i<list_doan.length; i++) {
				let element = list_doan[i]
				const id = element.id
				const photo = element.photo
				const ten_MH = element.name
				html +=`<div class="dashboard-card" id="${id}" style="cursor: move;">`
				html +=     `<img class="card-image" src="${photo}">`
				html +=      `<div class="card-detail">`
				html +=         `<h4 class="card-name" style="font-size: 18px; text-align: center; margin-top:10px;">${ten_MH}</h4>`
				html +=       `</div>`
				html +=`</div>`
			}
			main = document.getElementById('list_sort_doan');
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)

			html='';
			temp_order ={
				id: '3',
				name: 'sort_DU',
				action: 'get_sort'
			}
			res = await instance.post('/sortlist', temp_order);
			let sort_du = (res.data)[0]
			sort_du = eval(sort_du.sort)
			list_douong.sort((a, b) => sort_du.indexOf(a.id) - sort_du.indexOf(b.id));
			for(let i=0; i<list_douong.length; i++) {
				let element = list_douong[i]
				const id = element.id
				const photo = element.photo
				const ten_MH = element.name
				html +=`<div class="dashboard-card" id="${id}" style="cursor: move;">`
				html +=     `<img class="card-image" src="${photo}">`
				html +=      `<div class="card-detail">`
				html +=         `<h4 class="card-name" style="font-size: 18px; text-align: center; margin-top:10px;">${ten_MH}</h4>`
				html +=       `</div>`
				html +=`</div>`
			}
			main = document.getElementById('list_sort_douong');
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)
		break;
		case "DM_MENUGAME":
		break;
		case "DM_BANGTIN":
		break;
		case "DM_TUYCHINH":
		break;
	}
}

/*------------------ func button trong table ---------------- */
// xử lý btn nằm trong table trước khi gọi func popup
async function xuly_before_call_popup(e){
	const selectObject = e;
	var title = e.parentNode.getAttribute('titles');
	var dict = e.getAttribute('item');
	// console.log(dict)
	if (title)await call_popup(title, dict, selectObject);
}

// dropbox lang-menu nhớ đặt class điều ở cấp con nhé
// class valid để khỏi check điều kiện
// class invalid dùng check điều kiện trước close popup
// 	Dùng check button save
/*---------------------- Func call popup --------------------- */
async function call_popup(e, dict, selectObject){
	clickFlag = 1;
	var title= null
	if (e.textContent){
		title = (e.textContent).trim()
	}else{title = e.trim()}
	var html='';
	// func new lấy DM_DANHMUC làm chuẩn
	switch (title) {
		case "DM_XINCHAO":
		break;
		case "DM_MAYTRAM":
			if (dict=='Menu_maytram'){
				html =  `<style>
						.popup .popup-input {
							height: 50px;
						}
						
					</style>	
					<a class="close_popup" onclick='closePopup_gop_y()'>X</a>
					<p class="title_popup">Máy Trạm ${dict}</p>
					<hr style="margin: .3rem 0rem 0rem 0rem; border: 1px solid rgba(255, 255, 255, 0.3);outline: none !important;"><br>
					<div class="order-detail" style="text-align: left;">
						<div class="menu_maytrams">
						
							<div class="drop_btn nut_dropdown_2">Đăng nhập (Trả tiền sau)</div>
							<div class="drop_btn nut_dropdown_2">Tính tiền</div>
		
							<hr style="margin: .3rem 0rem 0rem 0.5rem; border: 1px solid rgba(255, 255, 255, 0.3);outline: none !important;"><br>
							<div class="dropdown" style="background: none;">
								<div class="drop_btn nut_dropdown_2">Điều Khiển máy trạm<i class="fa fa-angle-up" style="style="float: right;"></i></div>
								<div class="noidung_dropdown" style="overflow: inherit; left: 0%;">
									<button class="item_menu" >Xem các ứng dụng từ xa</button>
									<button class="item_menu" >Điều khiển từ xa</button>
								</div>
							</div>
		
							<hr style="margin: .3rem 0rem 0rem 0.5rem; border: 1px solid rgba(255, 255, 255, 0.3);outline: none !important;"><br>
							<div class="drop_btn nut_dropdown_2">Khóa máy Trạm</div>
		
							
							<div class="dropdown" style="background: none;">
								<div class="drop_btn nut_dropdown_2">Đăng nhập quyền ADMIN<i class="fa fa-angle-up" style="style="float: right;"></i></div>
								<div class="noidung_dropdown" style="overflow: inherit; left: 0%;">
									<button class="item_menu" >Máy trạm được chọn</button>
									<button class="item_menu" >Tất cả các máy trạm Sẵn sàng</button>
								</div>
							</div>
							
							<div class="dropdown" style="background: none;">
								<div class="drop_btn nut_dropdown_2">Đóng ứng dụng<i class="fa fa-angle-up" style="style="float: right;"></i></div>
								<div class="noidung_dropdown" style="overflow: inherit; left: 0%;">
									<button class="item_menu" >Máy trạm được chọn</button>
									<button class="item_menu" >Tất cả các máy</button>
								</div>
							</div>
		
							<div class="dropdown" style="background: none;">
								<div class="drop_btn nut_dropdown_2">Tắt máy<i class="fa fa-angle-up" style="style="float: right;"></i></div>
								<div class="noidung_dropdown" style="overflow: inherit; left: 0%;">
									<button class="item_menu" >Máy trạm được chọn</button>
									<button class="item_menu" >Những máy trạm Sẵn sàng</button>
									<button class="item_menu" >Tất cả các máy trạm</button>
								</div>
							</div>
		
						</div>`
				html+=`</div>`
				const show_contain = document.querySelector('#popup')
				show_contain.innerHTML = html;
			}		
		break;
		case "DM_BIA":
		break;
		case "DM_DONHANG":
			if(dict= "HUY"){
				clickFlag = 0;
				document.querySelector('.overlay').classList.add('showoverlay');
				document.querySelector('.containerpopup  .popup').classList.add('open-popup');

				let html= `<!-- <img src="image/tick.png"> -->
				<a class="close_popup" onclick='closePopup_gop_y()'>X</a>
				<p class="title_popup">Cập nhật game/phần mềm</p>
				<hr style="margin: .3rem 0rem 0rem 0rem; border: 1px solid rgba(255, 255, 255, 0.3);outline: none !important;"><br>
				<!-- <div id="alert_wrapper"></div> -->
				<!-- <input type="text" required="" placeholder="Bạn có muốn đóng góp thêm ý kiến khác?" class="popup-input"> -->
				<!-- <textarea name="Text1" cols="40" rows="5" placeholder="Bạn có muốn đóng góp thêm ý kiến khác?" class="popup-input"></textarea> -->
				<div id="id_contain_popup">
					<div class="text-field">
						<textarea name="Text1" cols="40" rows="5" class="popup-input" required></textarea>
						<label class="label_popup">Bạn có muốn đóng góp thêm ý kiến khác?</label>
					</div>
					<p style="color: #505050; text-align: left; margin-top: 5px;">Tối đa 200 ký tự</p>
					<!-- <h2>Thank You!</h2> -->
					<!-- <p>Your details has been successfully submitted. Thanks!</p> -->
				</div>
				
				<button type="button" class="button_popup" titles="DM_DONHANG" item="HUY">Gửi</button>`

				const show_contain = document.querySelector('#popup')
				show_contain.innerHTML = html;
				
				const title_popup = document.getElementsByClassName("title_popup");
				title_popup[0].innerHTML = "Xác Nhận Hủy Đơn Hàng"
				const button_popup = document.getElementsByClassName("button_popup");
				button_popup[0].innerHTML = "XÁC NHẬN"
				const label_popup = document.getElementsByClassName("label_popup");
				label_popup[0].innerHTML = "Nhập lý do hủy"
				/*------------------- func save ----------------------- */
				let btn_luu = document.querySelector('.button_popup')
				btn_luu.addEventListener('click',function (evt) {
					save_popup(this, selectObject)
				});
			}
		break;
		case "DM_TAODONHANG":
			if (dict=='add_Topping'){
				var dict = selectObject.dict
				var selectObject = selectObject.selectObject
				var topping = dict.Topping
				html =  `<style>
						.popup .popup-input {
							height: 50px;
						}
					</style>	
					<a class="close_popup" onclick='closePopup_gop_y()'>X</a>
					<p class="title_popup">Thêm Topping</p>
					<hr style="margin: .3rem 0rem 0rem 0rem; border: 1px solid rgba(255, 255, 255, 0.3);outline: none !important;"><br>
					<div class="order-detail">
						<div style="margin-top: -10px; margin-bottom: 20px; text-align: left;" class="note-toithieu">
							<i style="color: #505050;">Nếu không muốn thêm topping, có thể nhấn nút Thêm Vào Giỏ ngay để bỏ qua bước này.</i>
						</div>`
				for (var i = 0; i < topping.length; i++){
					dict.Topping[i].Topping_SL = 0 //set mặc định số lượng order topping là 0

					let nameTopping = topping[i].nameTopping
					let Topping_DG = topping[i].Topping_DG		
					const nguyenlieu_Topping = topping[i].NguyenLieu_Topping		
					const min_tonkho = min_max(nguyenlieu_Topping, 'Tonkho').min
					topping[i].Tonkho = min_tonkho
					html+=`<div class="detail_Topping" style="display: flex; justify-content: flex-end; margin:5px;">
									<div class="order-price">
										- <span class="order-nameTopping">${nameTopping}</span>
										<span class="order-priceTopping"> (${Number(Topping_DG).format(0, 3, '.', ',')}<span style="color: yellow;">₫</span>)</span>
									</div>
									
									<i class="ti-minus" onclick="giam_sl(this);"></i>
									<span class="order-soluong" onchange="soluong(this)" style="margin-right: 10px;margin-left: 10px; width: 10px; text-align:center;">0</span>
									<i class="ti-plus" onclick="tang_sl(this, ${min_tonkho});"></i>
							</div>`
				}  
			   
				html+=	`</div>
					<button type="button" class="button_popup">Thêm Vào Giỏ</button>`
				const show_contain = document.querySelector('#popup')
				show_contain.innerHTML = html;
		
				/*---- func add số lượng topping vào dict -----*/
				const detail_topping = show_contain.querySelectorAll('.detail_Topping')
				detail_topping.forEach(element => {
				   /*--- event change span ---- */
					const sl_topping = element.querySelector('.order-soluong')//MutationObserver ,
					// Bind to the DOMSubtreeModified Event
					$(sl_topping).bind('DOMSubtreeModified',function (evt) {
						const nameTopping = element.querySelector('.order-nameTopping').innerText
						for (var i = 0; i < dict.Topping.length; i++){
							if (dict.Topping[i].nameTopping == nameTopping){
								dict.Topping[i].Topping_SL = Number(sl_topping.innerText)
								break;
							}
						}
					});		
				});
				document.querySelector('.button_popup').addEventListener('click',function (evt) {
					dict.Topping = dict.Topping.filter(function(item) {
						if (item.Topping_SL !== 0){return item}
					});
					if (dict.Topping.length == 0){
						dict.Topping = []
						order(selectObject, dict);
					}else{
						order_updateTopping(selectObject, dict);
					}
					closePopup_gop_y();
				})
				// show popup
				clickFlag = 0;
				document.querySelector('.containerpopup  .popup').classList.add('open-popup');
			}else if (dict =='price_tuychon'){
				html =  `<style>
						.popup .popup-input {
							height: 50px;
						}
					</style>	
					<a class="close_popup" onclick='closePopup_gop_y()'>X</a>
					<p class="title_popup">Nhập Giá Tuỳ Chọn</p>
					<hr style="margin: .3rem 0rem 0rem 0rem; border: 1px solid rgba(255, 255, 255, 0.3);outline: none !important;"><br>

					<div class="order-detail">
						<div class="input-field nhapgiaMH">
						<input type="text" required spellcheck="false" class="popup-input price_MH invalid" onkeypress="validata_number_new(event);" onkeyup="validata_number_new(event)" onfocusout="validata_number_new(event)"> 
						<label>Nhập số tiền</label>
						<span style="float: left; font-style: italic; margin-left:7px;"></span>
						<i class="ti-check"></i>
						<i class="ti-alert"></i>
					</div>

					<div class="btn_choice">
						<button class="btn" style="" type="button">${money(10000)}</button>
						<button class="btn" style="" type="button">${money(20000)}</button>
						<button class="btn" style="" type="button">${money(50000)}</button>
					</div>
					`
				html+=`</div>
					<button type="button" class="button_popup">Thêm Vào Giỏ</button>`
				const show_contain = document.querySelector('#popup')
				show_contain.innerHTML = html;
				// show popup
				clickFlag = 0;
				let price_MH = document.querySelector('.popup .price_MH')
				price_MH.addEventListener('keyup',function (evt) {
					let price_tmp = (price_MH.value).substring(0,7)
					if(price_tmp!==''){
						let choice = document.querySelectorAll('.popup .btn_choice .btn')
						for (let index = 0; index < choice.length; index++) {
							const element = choice[index];
							element.innerHTML = money(String(Number(price_tmp)*10000000).substring(0,5+index))
							console.log(index)
						}
					}
				});
				let choice = document.querySelectorAll('.popup .btn_choice .btn')
				for (let index = 0; index < choice.length; index++) {
					const element = choice[index];
					element.addEventListener('click',function (evt) {
						price_MH.value = digital(element.innerHTML)
						price_MH.classList.remove('invalid')
						price_MH.classList.add('valid')
					});
				};
				/*------------------- func them vao gio ----------------------- */
				let btn_luu = document.querySelector('.button_popup')
				btn_luu.addEventListener('click',function (evt) {
					/*----- check invalid ---- */
					let invalid = this.parentNode.querySelectorAll('.invalid')
					if (invalid.length==0){
						const price_MH = document.querySelector('.popup .price_MH')
						selectObject.dict.price = price_MH.value
						var dict_tmp = selectObject.dict
						var selectObject_tmp = selectObject.selectObject
						// check condition have topping or muc gia toi thieu 
						if (Number(price_MH.value) < Number(dict_tmp.muctoithieu) || dict_tmp.Topping.length == 0){
							dict_tmp.Topping = []
							order(selectObject_tmp, dict_tmp);
							closePopup_gop_y()
							return;
						}else {
							call_popup("DM_TAODONHANG", "add_Topping", selectObject)
							return;
						}
					}else{
						invalid.forEach(element => {
							const elem_check = element.parentNode.querySelector('.ti-check')
							css(elem_check, {
								'display': 'none',
								'color': 'var(--green)'
							})
							const elem_alert = element.parentNode.querySelector('.ti-alert')
							css(elem_alert, {
								'display': 'block',
								'color': 'red'
							})
							element.style.borderColor = 'red';
						})
					}
					/*----- check valid ---- */
					let valid = btn_luu.parentNode.querySelectorAll('.valid')
					valid.forEach(element => {
						const elem_check = element.parentNode.querySelector('.ti-check')
						css(elem_check, {
							'display': 'block',
							'color': 'var(--green)'
						})
						const elem_alert = element.parentNode.querySelector('.ti-alert')
							css(elem_alert, {
								'display': 'none',
								'color': 'red'
							})
						element.style.borderColor = 'green';
					});
				});
			}
		break;
		case "DM_THONGKE":
		break;
		case "DM_BAOCAO":
		break;
		case "DM_COBAN":
		break;
		case "DM_MAYIN":
			if(dict=='add'){
				html =  `<style>
					.popup .popup-input {
						height: 50px;
					}
				</style>	
				<a class="close_popup" onclick='closePopup_gop_y()'>X</a>
				<p class="title_popup">Thêm Nguyên Liệu</p>
				<hr style="margin: .3rem 0rem 0rem 0rem; border: 1px solid rgba(255, 255, 255, 0.3);outline: none !important;"><br>
				<div>
					<div class="text-field">
						<textarea name="Text1" onfocusout="validateValue_str(event);" cols="40" rows="5" class="popup-input nameNL" required></textarea>
						<label class="label_popup">Nhập tên nguyên liệu</label>
					</div>

					<div class="text-field">
						<textarea name="Text1" cols="40" rows="5" class="popup-input motaNL" required></textarea>
						<label class="label_popup">Nhập mô tả nguyên liệu</label>
					</div>

					<div class="text-field">
						<textarea name="Text1" cols="40" rows="5" class="popup-input donviNL" required></textarea>
						<label class="label_popup">Nhập đơn vị nguyên liệu</label>
					</div>
				</div>

					<!-- <p style="color: #505050; text-align: left; margin-top: 5px;">Tối đa 200 ký tự</p> -->

				<button type="button" class="button_popup" onclick="luu_popup(this)">Lưu</button>`
				const show_contain = document.querySelector('#popup')
				show_contain.innerHTML = html;
				// show popup
				clickFlag = 0;
			}
		break;
		case "DM_NHANVIEN":
			if (dict=='add_nv'){
				
				html =  `<style>
							.popup .popup-input, .selected-lang, .lang-menu, .popup .button_popup {
								border-radius: 5px;
								height: 50px;
							}
							.popup{
								width: 60%;
							}

							.open-popup{
								top: 0vh;
							}	
							
						</style>`	
				html+=`	<a class="close_popup" onclick='closePopup_gop_y()'>X</a>
						<div id="avatars">
							<p class="title_popup">Thêm Nhân Viên</p>
						</div>						
						<hr style="margin: 10px -30px 0rem -30px; border: 1px solid rgba(255, 255, 255, 0.2);outline: none !important;"><br>`
				html+=	`<div class="grid wide container_nv" style="width: 100%;">

							<div class="row" style="width: 100%; margin: 0; padding-top:0;">
					
								<div class="col l-1" style="margin: 0; width:50%;padding:0px;">
								
									<div class="course-item" style="margin-bottom: 40px;">
										<div class="input-field">
											<input type="text" required spellcheck="false" class="popup-input name invalid" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);"> 
											<label>Nhập tên người dùng</label>
											<i class="ti-check"></i>
											<i class="ti-alert"></i>
										</div>
									</div>

									<div class="course-item">
										<div class="input-field">
											<input type="text" required spellcheck="false" class="popup-input pass invalid" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);"> 
											<label>Nhập Mật Khẩu</label>
											<i class="ti-check"></i>
											<i class="ti-alert"></i>
										</div>
									</div>
									
								</div> 
					
								<div class="col l-1" style="margin: 0 20px;width:50%;padding:0px;">
									<div class="course-item">
										<div class="input-field">
											<input type="text" required spellcheck="false" class="popup-input nameMH invalid" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);"> 
											<label>Nhập tên mặt hàng</label>
											<i class="ti-check"></i>
											<i class="ti-alert"></i>
										</div>
									</div>
								</div> 						
					
							</div>`
							
					html+= `<div class="row" style="width: 100%; margin: 0;">
					
								<div class="col l-1" style="margin: 0;">
									<div class="course-item">
										
									</div>
								</div> 
					
								<div class="col l-1" style="margin: 0;">
									<div class="course-item">
										
									</div>
								</div> 
					
								
							</div>
						</div>
						
					<button type="button" class="button_popup">Lưu</button>`
				const show_contain = document.querySelector('#popup')
				show_contain.innerHTML = html;	
				
				/*---------------- show avatar ------------ */
				var avatarId = CryptoJS.SHA256(''+Math.random()).toString().substring(0,20);
				// console.log(avatarId)
				var svg = multiavatar(avatarId);
				var div = document.createElement('div');
				// div.setAttribute("onclick","downloadPng('"+avatarId+"')");
				div.innerHTML = svg;
				document.getElementById('avatars').appendChild(div);
								
				document.querySelector('.button_popup').addEventListener('click',async function (evt) {
					const date_create = convert_dateToVN(new_date())
					const name = document.querySelector(".popup .name").value;
					const pass = document.querySelector(".popup .pass").value;
					const photo = svg;
					console.log(name, pass, date_create)
					let temp ={
						date_create: date_create,
						name: name,
						pass: pass,
						photo: photo,
						action: 'new_user'
					}
					const res = await instance.post('/user', temp);
				});
				// show popup
				clickFlag = 0;
			}else if(dict == 'phanquyen_nv'){
				html = `<style>
							.popup .popup-input, .selected-lang, .lang-menu, .popup .button_popup {
								border-radius: 5px;
								height: 50px;
							}
							.popup{
								width: 70%;
							}

							.open-popup{
								top: 0vh;
							}	
						</style>	
						<a class="close_popup" onclick='closePopup_gop_y()'>X</a>
						<p class="title_popup">Phân Quyền Nhân Viên</p>
						<hr style="margin: .3rem 0rem 0rem 0rem; border: 1px solid rgba(255, 255, 255, 0.3);outline: none !important;"><br>
												
						<div class="checkbox">
							<label for="mode" class="toggle_checkbox"> 
								<input type="checkbox" id="mode" class="toggle_input" checked hidden=""/>
								<div class="toggle_bar">
								<div class="toggle_spin"></div>
								</div>
								<p>Kích hoạt Nhân Viên</p>
							</label>
							<i style="color: grey; float: left;">Kích hoạt Nhân Viên</i>
						</div>
				
						
						<div class="grid wide container_nv" style="width: 100%; padding: 20px 0; margin-top: 40px; border-top: 1px solid rgba(255,255,255,0.2);border-bottom: 1px solid rgba(255,255,255,0.2);">

							<div class="row" style="width: 100%; margin: 0;">
					
								<div class="col l-4" style="margin: 0;">
								<div class="course-item">
									<div class="checkbox">
									<label for="mode1" class="toggle_checkbox"> 
										<input type="checkbox" id="mode1" class="toggle_input" checked hidden=""/>
										<div class="toggle_bar">
										<div class="toggle_spin"></div>
										</div>
										<p>Kích hoạt phần mềm</p>
									</label>
									<i style="color: grey; float: left;">Kích hoạt phần mềm</i>
									</div>
								</div>
								</div> 
					
								<div class="col l-4" style="margin: 0;">
								<div class="course-item">
									<div class="checkbox">
									<label for="mode6" class="toggle_checkbox"> 
										<input type="checkbox" id="mode6" class="toggle_input" checked hidden=""/>
										<div class="toggle_bar">
										<div class="toggle_spin"></div>
										</div>
										<p>Kích hoạt phần mềm</p>
									</label>
									<i style="color: grey; float: left;">Kích hoạt phần mềm</i>
									</div>
								</div>
								</div> 
					
								<div class="col l-4" style="margin: 0;">
								<div class="course-item">
									<div class="checkbox">
									<label for="mode2" class="toggle_checkbox"> 
										<input type="checkbox" id="mode2" class="toggle_input" checked hidden=""/>
										<div class="toggle_bar">
										<div class="toggle_spin"></div>
										</div>
										<p>Kích hoạt phần mềm</p>
									</label>
									<i style="color: grey; float: left;">Cho phép quản lý, phân quyền cho nhân viên</i>
									</div>
								</div>
								</div> 
					
							</div>
					
					
							<div class="row" style="width: 100%; margin: 0;">
					
								<div class="col l-4" style="margin: 0;">
								<div class="course-item">
									<div class="checkbox">
									<label for="mode3" class="toggle_checkbox"> 
										<input type="checkbox" id="mode3" class="toggle_input" checked hidden=""/>
										<div class="toggle_bar">
										<div class="toggle_spin"></div>
										</div>
										<p>Kích hoạt phần mềm</p>
									</label>
									<i style="color: grey; float: left;">Kích hoạt phần mềm</i>
									</div>
								</div>
								</div> 
					
								<div class="col l-4" style="margin: 0;">
									<div class="course-item">
										<div class="checkbox">
											<label for="mode4" class="toggle_checkbox"> 
												<input type="checkbox" id="mode4" class="toggle_input" checked hidden=""/>
												<div class="toggle_bar">
												<div class="toggle_spin"></div>
												</div>
												<p>Kích hoạt phần mềm</p>
											</label>
											<i style="color: grey; float: left;">Kích hoạt phần mềm</i>
										</div>
									</div>
								</div> 
					
								<div class="col l-4" style="margin: 0;">
									<div class="course-item">
										<div class="checkbox">
											<label for="mode5" class="toggle_checkbox"> 
												<input type="checkbox" id="mode5" class="toggle_input" checked hidden=""/>
												<div class="toggle_bar">
												<div class="toggle_spin"></div>
												</div>
												<p>Kích hoạt phần mềm</p>
											</label>
											<i style="color: grey; float: left;">Cho phép quản lý, phân quyền cho nhân viên</i>
										</div>
									</div>
								</div> 
							</div>
						</div>
						<button type="button" class="button_popup">Lưu</button>`
				const show_contain = document.querySelector('#popup')
				show_contain.innerHTML = html;		
				const optionMenu = document.querySelector(".lang-menu")
				// show popup
				clickFlag = 0;
			}
		break;
		case "DM_DANHMUC":
			/*---- set kich thước popup ----- */
			html =  `<style>
						.popup .popup-input, .selected-lang, .lang-menu, .popup .button_popup {
							border-radius: 5px;
							height: 50px;
						}
						.popup{
							width: 700px;
						}
					</style>`
			if(selectObject){
				const row = selectObject.parentNode.parentNode.parentNode
				var nameDM = titleCase(row.children[0].innerText)
				// console.log(nameDM)
			}
			if(dict=="create"){
				html+=	`	
					<a class="close_popup" onclick='closePopup_gop_y()'>X</a>
					<p class="title_popup">Thêm Danh Mục</p>
					<hr style="margin: 10px -30px 0rem -30px; border: 1px solid rgba(255, 255, 255, 0.2);outline: none !important;"><br>
					
					<div>
						
						<div class="input-field">
							<input type="text" required spellcheck="false" class="popup-input invalid nameDM" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);"> 
							<label>Nhập tên danh mục</label>
							<i class="ti-check"></i>
							<i class="ti-alert"></i>
						</div>
	
						<div class="input-field">
							<input type="text" required spellcheck="false" class="popup-input valid motaDM" onkeyup="validateValue_dropbox_green(event)" onfocusout="validateValue_dropbox_green(event);"> 
							<label>Nhập mô tả danh mục</label>
							<i class="ti-check"></i>
							<i class="ti-alert"></i>
						</div>
	
						<div class="dropbox_old">
							<select class="popup-input valid DMcha" onchange="validateValue_dropbox_green(event);" onfocusout="validateValue_dropbox_green(event);">
								<option>Không Có Danh Mục Cha</option>
								<option>Đồ Ăn</option>
								<option>Đồ Uống</option>
							</select>
							<i class="ti-angle-down"></i>
							<i class="ti-check"></i>
							<i class="ti-alert"></i>
						</div>
						
						<div class="lang-menu">
							<div class="selected-lang valid">
								<a class="mathang lang-option"></a>
								<span class="sBtn-text">Không chọn màu</span>
								<i class="separator"></i>
								<span class='sBtn-close'>X</span>
								<i class="ti-angle-down"></i>
							</div>
							
							<ul>`		
				color_list.forEach(function(element, index){
					let name = element.name
					let mau = element.color
					html+=`	<li class="option">
								<span class="mathang" style="background-color: ${mau};"></span>
								<a href="#" class="de option-text">${name}</a>
							</li>`
				});
	
				html+=	`	</ul>
							<i class="ti-check"></i>
							<i class="ti-alert"></i>
							<i style="color: #505050; float: left;">Khi chọn màu cho Danh Mục, các Mặt Hàng thuộc Danh Mục sẽ hiện thêm màu tương ứng tại trang Đơn Hàng.</i>
						</div>
						<div class="checkbox">
							<input type="checkbox" required spellcheck="false" id="DMtach" class="popup-input DMtach" hidden=""> 
							<label for="DMtach">Tách khỏi doanh thu dịch vụ nếu được chọn</label>
						</div>
	
						<div class="checkbox">
							<input type="checkbox" required spellcheck="false" id="mobanDM" class="popup-input mobanDM" checked hidden=""> 
							<label for="mobanDM">Hiểu thị danh mục này trên MenuKL Launcher</label>
						</div>
	
					</div>
					<button type="button" class="button_popup" titles='${title}' item="save_new">Lưu</button>
					<div id="alert_wrapper"></div>`
				
				const show_contain = document.querySelector('#popup')
				show_contain.innerHTML = html;
				dropbox_chonmau();

				// show popup
				clickFlag = 0;
				/*------------------- func save ----------------------- */
				let btn_luu = document.querySelector('.button_popup')
				btn_luu.addEventListener('click',function (evt) {
					/*----- check invalid ---- */
					let invalid = this.parentNode.querySelectorAll('.invalid')
					if (invalid.length==0){
						save_popup(this, selectObject)
					}else{
						invalid.forEach(element => {
							const elem_check = element.parentNode.querySelector('.ti-check')
							css(elem_check, {
								'display': 'none',
								'color': 'var(--green)'
							})
							const elem_alert = element.parentNode.querySelector('.ti-alert')
							css(elem_alert, {
								'display': 'block',
								'color': 'red'
							})
							element.style.borderColor = 'red';
						})
					}
					/*----- check valid ---- */
					let valid = btn_luu.parentNode.querySelectorAll('.valid')
					valid.forEach(element => {
						const elem_check = element.parentNode.querySelector('.ti-check')
						css(elem_check, {
							'display': 'block',
							'color': 'var(--green)'
						})
						const elem_alert = element.parentNode.querySelector('.ti-alert')
							css(elem_alert, {
								'display': 'none',
								'color': 'red'
							})
						element.style.borderColor = 'green';
					});
				});
			
			}else if (dict=='edit'){
				//edit check điều kiện save thì phải xoá invalid trước khi show vì đã có sẵn giá trị
				var e = selectObject;
				const row = e.parentNode.parentNode.parentNode
				let id = row.id
				html +=  `
					<a class="close_popup" onclick='closePopup_gop_y()'>X</a>
					<p class="title_popup" id=${id}>Chỉnh sửa Danh Mục <a style="color: var(--yellow);font-weight:600;">${nameDM}</a></p>
					<hr style="margin: 10px -30px 0rem -30px; border: 1px solid rgba(255, 255, 255, 0.2);outline: none !important;"><br>
					
					<div>
						
						<div class="input-field">
							<input type="text" required spellcheck="false" class="popup-input nameDM" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);"> 
							<label>Nhập tên danh mục</label>
							<i class="ti-check"></i>
							<i class="ti-alert"></i>
						</div>
	
						<div class="input-field">
							<input type="text" required spellcheck="false" class="popup-input valid motaDM" onkeyup="validateValue_dropbox_green(event)" onfocusout="validateValue_dropbox_green(event);"> 
							<label>Nhập mô tả danh mục</label>
							<i class="ti-check"></i>
							<i class="ti-alert"></i>
						</div>
	
						<div class="dropbox_old">
							<select class="popup-input valid DMcha" onchange="validateValue_dropbox_green(event);" onfocusout="validateValue_dropbox_green(event);">
								<option>Không Có Danh Mục Cha</option>
								<option>Đồ Ăn</option>
								<option>Đồ Uống</option>
							</select>
							<i class="ti-angle-down"></i>
							<i class="ti-check"></i>
							<i class="ti-alert"></i>
						</div>
						
	
						<div class="lang-menu">
							<div class="selected-lang valid">
								<a class="mathang lang-option"></a>
								<span class="sBtn-text">Không chọn màu</span>
								<i class="separator"></i>
								<span class='sBtn-close'>X</span>
								<i class="ti-angle-down"></i>
							</div>
							
							<ul>`
				color_list.forEach(function(element, index){
					let name = element.name
					let mau = element.color
					html+=`	<li class="option">
								<span class="mathang" style="background-color: ${mau};"></span>
								<a href="#" class="de option-text">${name}</a>
							</li>`
				});
				html+=`	</ul>
						<i class="ti-check"></i>
						<i class="ti-alert"></i>
						<i style="color: #505050; float: left;">Khi chọn màu cho Danh Mục, các Mặt Hàng thuộc Danh Mục sẽ hiện thêm màu tương ứng tại trang Đơn Hàng.</i>
					</div>

					<div class="checkbox">
						<input type="checkbox" required spellcheck="false" id="DMtach" class="popup-input DMtach" hidden=""> 
						<label for="DMtach">Tách khỏi doanh thu dịch vụ nếu được chọn</label>
					</div>

					<div class="checkbox">
						<input type="checkbox" required spellcheck="false" id="mobanDM" class="popup-input mobanDM" hidden=""> 
						<label for="mobanDM">Hiểu thị danh mục này trên MenuKL Launcher</label>
					</div>

				</div>
				<button type="button" class="button_popup" titles='DM_DANHMUC' item="save_edit">Lưu</button>
					<div id="alert_wrapper"></div>`
				
				const show_contain = document.querySelector('#popup')
				show_contain.innerHTML = html;

				let ten = row.children[0]
				let mota = row.children[1]
				let DMcha = row.children[2]
				let Mau = await get_color(color_list, row.children[0].id)
				let DTkhac = row.children[3]
				DTkhac = DTkhac.querySelector('i.checked')? true : false;
				let moban = row.children[4].querySelector('.toggle_input').checked
				console.log(DTkhac, moban)
				DMcha=DMcha.innerText.trim()
				if(DMcha=='Không có')DMcha='Không Có Danh Mục Cha';

				document.querySelector('.popup-input.nameDM').value= ten.innerText
				document.querySelector('.popup-input.motaDM').value= mota.innerText
				document.querySelector('.popup-input.DMcha').value= DMcha
				document.querySelector('.lang-menu .sBtn-text').innerText= Mau.name
				document.querySelector('.selected-lang .mathang').style.background = Mau.color
				document.querySelector('#DMtach').checked = DTkhac;
				document.querySelector('#mobanDM').checked = moban;

				// show popup
				clickFlag = 0;
				dropbox_chonmau();	
				/*------------------- func save ----------------------- */
				let btn_luu = document.querySelector('.button_popup')
				btn_luu.addEventListener('click',function (evt) {
					/*----- check invalid ---- */
					let invalid = this.parentNode.querySelectorAll('.invalid')
					if (invalid.length==0){
						save_popup(this, selectObject)
					}else{
						invalid.forEach(element => {
							const elem_check = element.parentNode.querySelector('.ti-check')
							css(elem_check, {
								'display': 'none',
								'color': 'var(--green)'
							})
							const elem_alert = element.parentNode.querySelector('.ti-alert')
							css(elem_alert, {
								'display': 'block',
								'color': 'red'
							})
							element.style.borderColor = 'red';
						})
					}
					/*----- check valid ---- */
					let valid = btn_luu.parentNode.querySelectorAll('.valid')
					valid.forEach(element => {
						const elem_check = element.parentNode.querySelector('.ti-check')
						css(elem_check, {
							'display': 'block',
							'color': 'var(--green)'
						})
						const elem_alert = element.parentNode.querySelector('.ti-alert')
							css(elem_alert, {
								'display': 'none',
								'color': 'red'
							})
						element.style.borderColor = 'green';
					});
				});
			}else if (dict=='add'){
			}else if (dict=='del'){
				html +=  `
				<a class="close_popup" onclick='closePopup_gop_y()'>X</a>
				<p class="title_popup">Xác Nhận</p>
				<hr style="margin: .3rem 0rem 0rem 0rem; border: 1px solid rgba(255, 255, 255, 0.3);outline: none !important;"><br>
				<div>
					<p style='color: var(--white_text); font-size: 18px;'>Bạn có muốn xóa Danh Mục <strong style='color: yellow; font-weight:600;'>${nameDM}</strong> ?</p>
				</div>
				<button style='background: red;' type="button" class="button_popup" titles="${title}" item="save_del">XÁC NHẬN</button>`
	
				const show_contain = document.querySelector('#popup')
				show_contain.innerHTML = html;
				/*------------------- func save ----------------------- */
				let btn_luu = document.querySelector('.button_popup')
				btn_luu.addEventListener('click',function (evt) {
					save_popup(this, selectObject)
				});
	
				// show popup
				clickFlag = 0;
			}
		break;
		case "DM_MATHANG":
			var id, nameMH, temp, array, table_html,moban;
			if(selectObject){
				const row = selectObject.parentNode.parentNode.parentNode
				id = row.id
				nameMH = titleCase(row.children[2].children[0].innerText)
				console.log(row.children[2].children[0], id)
			}
			if(dict=='create'){
					// console.log('insert')
				temp = {action: 'popup-mathang'}
				const res = await instance.post('/mathang', temp);
				//console.log(res.data.mathang)
				html =  `<style>
						.popup .popup-input, .selected-lang, .lang-menu, .popup .button_popup {
							border-radius: 5px;
							height: 50px;
						}
						.popup{
							width: 80%;
						}

						.open-popup{
							top: -9vh;
						}	
						code{
							color: #9b1728;
						}
					</style>`	
				html+=`	<a class="close_popup" onclick='closePopup_gop_y()'>X</a>
					<p class="title_popup">Thêm Mặt Hàng</p>
					<hr style="margin: 10px -30px 0rem -30px; border: 1px solid rgba(255, 255, 255, 0.2);outline: none !important;"><br>`
					html+=`	<div class="contents_popup">
					<div class="row">
						<div class="col l-3">
							<div class="course-item" style= "color: white; margin-top: 5px;">
								<div class="input-field">
									<input type="text" required spellcheck="false" class="popup-input nameMH invalid" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);"> 
									<label>Nhập tên mặt hàng</label>
									<i class="ti-check"></i>
									<i class="ti-alert"></i>
								</div>
				
								<div class="input-field nhapgiaMH">
									<input type="text" required spellcheck="false" class="popup-input price_MH invalid" onkeypress="validata_number_new(event);" onkeyup="validata_number_new(event)" onfocusout="validata_number_new(event)"> 
									<label>Nhập đơn giá mặt hàng</label>
									<span style="float: left; font-style: italic; margin-left:7px;"></span>
									<i class="ti-check"></i>
									<i class="ti-alert"></i>
								</div>

								<div class="checkbox-toggle" style="padding-bottom: 20px;">
									<label for="checkbox1" class="toggle_checkbox"> 
										<input type="checkbox" id="checkbox1" class="toggle_input popup-input price_tuychon" hidden=""/>
										<div class="toggle_bar">
											<div class="toggle_spin"></div>
										</div>
										<p>Giá tùy chọn</p>
									</label>
								</div>

								<div class="dropbox_old">
									<select class="popup-input danhmucMH">
										<option value='0'>Chọn danh mục cho mặt hàng</option>
										<option value='Topping' style="color: orange;">Chọn làm Topping</option>`
										/*-------------- sort Alphabetically xắp sếp ----------- */
										const sortedList = res.data.danhmuc.sort((a, b) =>
											a.name.localeCompare(b.name));
										sortedList.forEach(function(element, index){
										const name = element.name
										const id_DM = element.id
										console.log(id_DM)
										html+= `<option value="${id_DM}">${name}</option>`
										
									})
							html+=`	</select>
									<i class="ti-angle-down"></i>
									<i class="ti-check"></i>
									<i class="ti-alert"></i>
								</div>

								<!-- ------------- html upload ---------------- -->
								<div class="page-upload" style="margin-top: 20px; padding-left: 12px; padding-right: 30px;">
								<span>Chọn Ảnh Mặt Hàng</span>
									<input type="file" id="file_input" class="upload-box popup-input photo_MH" accept="image/gif, image/jpeg, image/png" onchange="readURL(this)" hidden=""/>
									<div class="box">
										<div class="content-upload">
											<label for="file_input">
												<img id="blah" alt="Chọn Ảnh Mặt Hàng" src="/images_order/no-image.jpg"/>
											</label>                                        
										</div>
									</div>
								</div>
								<small style="color: grey;">Chấp nhận <code>.gif, .jpeg, .png</code> và dung lượng <code>≤2MB</code>. Nếu không chọn hình, hệ thống sẽ tự lấy hình mặc định.</small>

								

							</div>
						</div>

						<div class="col l-3">
							<div class="course-item" style= "color: white; margin-top: 5px;">

								<div class="importan-note">
									<span>Có thể bỏ qua chọn nguyên liệu nếu không muốn áp dụng quản lý số lượng tồn kho.</span>
								</div>

								<div class="dropbox_old">
									<select class="popup-input MHnguyenlieu">
										<option value='0'>Thêm nguyên liệu cho mặt hàng</option>`
										/*-------------- sort Alphabetically xắp sếp ----------- */
										const nguyenlieu = res.data.nguyenlieu.sort((a, b) =>
											a.name.localeCompare(b.name));
										console.log(nguyenlieu);
										nguyenlieu.forEach(function(element, index){
											const name = element.name
											const id_NL = element.id
											html+= `<option value="${id_NL}" id="NL${id_NL}">${name}</option>`
										})
				html+=`				</select>
									<i class="ti-angle-down"></i>
									<i class="ti-check"></i>
									<i class="ti-alert"></i>
								</div>

								<!-- table nguyên liệu cho mặt hàng -->
								<div class="table_responsive" style="overflow-y: auto;height: 410px;">
									<table cellspacing="0" cellpadding="0" id="MHnguyenlieu" class="table-popup">
										<thead>
											<tr>
												<th>NGUYÊN_LIỆU</th>
												<th>Số Lượng</th>
												<th></th>
											
											</tr>
										</thead>
										<tbody id="list_order">
											<!-- show duoi func -->										
										</tbody>
									</table>
								</div>

							</div>
						</div>

						<div class="col l-3">
							<div class="course-item" style= "color: white; margin-top: 5px;">

								<div class="input-field giatuychonMH">
									<input type="text" required spellcheck="false" class="popup-input giatuychonMH" id="number-input" value='0' class="popup-input price_MH" onkeypress="validata_number_new(event);" onkeyup="validata_number_new(event)" onfocusout="validata_number_new(event)"> 
									<label>Mức tối thiểu</label>
									<span style="float: left; font-style: italic; margin-left:7px;"></span>
									<i class="ti-check"></i>
									<i class="ti-alert"></i>
								</div>

								<div style="margin-top: 0px; margin-bottom: 20px;text-align: center;" class="note-toithieu">
									<i style="color: #505050;">Khi đơn hàng với giá tùy chọn đạt mức tối thiểu, khách hàng sẽ được lựa chọn topping. Mặc định <strong>0₫</strong>.</i>
								</div>

								<div class="input-field max_toppingMH">
									<input type="text" required spellcheck="false" class="popup-input max_toppingMH" id="number-input" value='0' class="popup-input price_MH" onkeypress="validata_number_new(event);" onkeyup="validata_number_new(event)" onfocusout="validata_number_new(event)"> 
									<label class="max_toppingMH">Được chọn tối đa</label>
									<i class="ti-check"></i>
									<i class="ti-alert"></i>
								</div>

								<div style="margin-top: -10px; margin-bottom: 20px;">
									<i style="color: #505050;">Số lượng topping tối đa được lựa chọn. Nhập <strong>0</strong> để bỏ giới hạn.</i>
								</div>

								<div class="dropbox_old">
									<select class="popup-input MHtopping">
										<option>Thêm topping cho mặt hàng</option>`
										/*-------------- sort Alphabetically xắp sếp ----------- */
										const mathang = res.data.mathang.sort((a, b) =>
											a.name.localeCompare(b.name));
										mathang.forEach(function(element, index){
											const name = element.name
											const price = element.price
											const id = element.id
											html+= `<option value='${id}' id="${id}" DG='${price}'>${name}</option>`
											// <option>Đồ Uống</option>
										})
				html+=`				</select>
									<i class="ti-angle-down"></i>
									<i class="ti-check"></i>
									<i class="ti-alert"></i>
								</div>

								<!-- table topping cho mặt hàng -->
								<div class="table_responsive" style="overflow-y: auto;height: 350px;">
									<table cellspacing="0" cellpadding="0" id="MHtopping" class="table-popup">
										<thead>
											<tr>
												<th>TOPPING</th>
												<th>Số Lượng</th>
												<th>Đơn Giá</th>
												<th></th>
											
											</tr>
										</thead>
										<tbody id="list_order">
										
											
										</tbody>
									</table>
								</div>


							</div>
						</div>

					</div>
				</div>`
					
				html+=`<button type="button" class="button_popup" titles='${title}' item="save_new">Lưu</button>`
				const show_contain = document.querySelector('#popup')
				show_contain.innerHTML = html;			

				// /*---------- fun choose dropbox nguyen lieu show table ----------- */
				// let table_MHnguyenlieu = document.querySelector("#MHnguyenlieu");
				// let Mh_nguyenlieu = document.querySelector('.popup-input.MHnguyenlieu')
				// let Mh_nguyenlieu_Frist = Mh_nguyenlieu.value
				// if(Mh_nguyenlieu){
				// 	Mh_nguyenlieu.addEventListener("change", () => {
				// 		if(Mh_nguyenlieu.value !=Mh_nguyenlieu_Frist){//"Thêm nguyên liệu cho mặt hàng"){
				// 			var duplicate = highlightDuplicates($('#MHnguyenlieu'),'span.MHnguyenlieu', Mh_nguyenlieu.value)
				// 			if (duplicate){
				// 				table_html = `<tr>
				// 								<td data-label="TÊN"><span class="MHnguyenlieu" style="user-select: none;">${Mh_nguyenlieu.value}</span></td>
				// 								<td data-label="STT"><input type="text" min="1" value="1" style="width: 100%;text-align: center; border-color: grey;" id="number-input" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);" /></td>
				// 								<td data-label="MÔ TẢ"><i class="far fa-trash-alt" onclick="delrowtable_now(this);"></i></td>
				// 							</tr>`
				// 				$(table_MHnguyenlieu).append(table_html);
				// 				table_MHnguyenlieu.style.display = "block";

								
				// 			}
				// 		}
				// 		Mh_nguyenlieu.value = Mh_nguyenlieu_Frist 
				// 	})
				
				// }
				
				// /*---------- fun choose dropbox nguyen lieu show table ----------- */
				// let table_MHtopping = document.getElementById("MHtopping");
				// let Mh_topping = document.querySelector('.popup-input.MHtopping')
				// let Mh_topping_Frist = Mh_topping.value
				// if (Mh_topping){
				// 	Mh_topping.addEventListener("change", () => {
				// 		if(Mh_topping.value != Mh_topping_Frist){//"Thêm nguyên liệu cho mặt hàng"){
				// 			var duplicate = highlightDuplicates($('#MHtopping'),'span.MHtopping', Mh_topping.value)
				// 			if (duplicate){
				// 				var name_topping = Mh_topping.options[Mh_topping.selectedIndex].text;
								
				// 				table_html = `<tr>
				// 								<td data-label="TÊN"><span class="MHtopping" style="user-select: none;">${name_topping}</span></td>
				// 								<td data-label="SL"><input type="text" disabled="disabled" value="1" style="width: 100%;color: grey;border: none;text-align: center;" id="number-input" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);" /></td>
				// 								<td data-label="price"><input type="text" disabled="disabled" value="${Number(Mh_topping.value).format(0, 3, '.', ',')}₫" style="width: 100%; color: grey; border:none;text-align: center;" id="number-input" /></td>
				// 								<td data-label="Action"><i class="far fa-trash-alt" onclick="delrowtable_now(this);"></i></td>
				// 							</tr>`
				// 				$(table_MHtopping).append(table_html);
				// 				table_MHtopping.style.display = "block";

				// 				/*------------------ func validata number for firefox ------------- */
				// 				const input_number = document.querySelectorAll("#number-input");
				// 				// validata_number_new(input_number)
								
				// 			}
				// 		}
				// 		Mh_topping.value = Mh_topping_Frist 
				// 	})
					
				// }

				// /*---------------- func gia tuy chon event ------------------------ */
				// let price_tuychon = document.querySelector('.popup-input.price_tuychon')
				// let price_toithieu = document.querySelector('.input-field.giatuychonMH')
				// let nhap_price = document.querySelector('.input-field.nhapgiaMH')
				// let note_toithieu = document.querySelector('.note-toithieu')
				// let danhmucMH = document.querySelector('.popup-input.danhmucMH')
				// price_tuychon.addEventListener("change", () => {
				// 	if (price_tuychon.checked){
				// 		Mh_nguyenlieu.disabled = true;
				// 		Mh_nguyenlieu.style.color = 'grey';
				// 		price_toithieu.style.display = 'block';
				// 		note_toithieu.style.display = 'block';
				// 		nhap_price.style.display = 'none';
				// 		nhap_price.querySelector('.price_MH').value=''
				// 		danhmucMH.value = '0'
				// 		$("#MHnguyenlieu tbody tr").remove();
				// 		document.querySelector("#MHnguyenlieu").style.display = 'none'
				// 		table_MHtopping.parentNode.style.height= '120px'
				// 		table_MHnguyenlieu.parentNode.style.height= '330px'
				// 	}else{
				// 		Mh_nguyenlieu.disabled = false;
				// 		Mh_nguyenlieu.style.color = 'white';
				// 		price_toithieu.style.display = 'none';
				// 		note_toithieu.style.display = 'none';
				// 		nhap_price.style.display = 'block';
				// 		price_toithieu.querySelector('.giatuychonMH').value = 0;
				// 		price_toithieu.querySelector('span').innerHTML = '';
				// 		table_MHtopping.parentNode.style.height= '350px'
				// 		table_MHnguyenlieu.parentNode.style.height= '410px'
				// 	}
				// });
				// if (nhap_price.querySelector('.price_MH').value !=="Tuỳ Chọn"){
				// 	Mh_nguyenlieu.disabled = false;
				// 	Mh_nguyenlieu.style.color = 'white';
				// 	price_toithieu.style.display = 'none';
				// 	note_toithieu.style.display = 'none';
				// 	nhap_price.style.display = 'block';
				// 	price_tuychon.checked = false
				// 	table_MHtopping.parentNode.style.height= '350px'
				// 	table_MHnguyenlieu.parentNode.style.height= '410px'
				// }else{
					
				// 	Mh_nguyenlieu.disabled = true;
				// 	Mh_nguyenlieu.style.color = 'grey';
				// 	price_toithieu.style.display = 'block';
				// 	note_toithieu.style.display = 'block';
				// 	nhap_price.style.display = 'none';
				// 	nhap_price.querySelector('.price_MH').value=''
				// 	price_tuychon.checked = true
				// 	table_MHtopping.parentNode.style.height= '120px'
				// 	table_MHnguyenlieu.parentNode.style.height= '330px'
				// }


				/*--------- func show value on popup -------- */
				id = document.querySelector('.title_popup').id//id_MH
				// let table_MHnguyenlieu = document.querySelector("#MHnguyenlieu");
				// let Mh_nguyenlieu = document.querySelector('.popup-input.MHnguyenlieu')
				// let table_MHtopping = document.getElementById("MHtopping");
				// let Mh_topping = document.querySelector('.popup-input.MHtopping')

				// // /*---------- fun choose dropbox nguyen lieu show table ----------- */
				// // Mh_nguyenlieu.addEventListener("change", () => {
				// // 	let Mh_nguyenlieu_Frist = Mh_nguyenlieu.options[Mh_nguyenlieu.selectedIndex].text;
				// // 	if(Mh_nguyenlieu.value != Mh_nguyenlieu_Frist){//"Thêm nguyên liệu cho mặt hàng")
				// // 		var id = Mh_nguyenlieu.options[Mh_nguyenlieu.selectedIndex].id
				// // 		//hide option of select
				// // 		Mh_nguyenlieu[Mh_nguyenlieu.selectedIndex].setAttribute('hidden','true');
				// // 		table_html = `<tr id="NL${id}">
				// // 						<td data-label="Nguyên Liệu"><span class="MHnguyenlieu" style="user-select: none;">${Mh_nguyenlieu_Frist}</span></td>
				// // 						<td data-label="Số lượng" style="width: 100%;"><input type="text" min="1" value="1" style="border: none; width: 100%;text-align: center; border-color: grey;" id="number-input" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);" /></td>
				// // 						<td data-label="Thao Tác" style="text-align: right;"><i class="far fa-trash-alt"></i></td>
				// // 					</tr>`
				// // 		$(table_MHnguyenlieu).append(table_html);
				// // 		table_MHnguyenlieu.style.display = "block";

				// // 		let btn_del_NL = document.querySelector(`tr#NL${id}`)
				// // 		btn_del_NL.querySelector('i').addEventListener('click', async function (evt) {
				// // 			// name_option = this.parentNode.parentNode.childNodes[1].innerText
				// // 			//show option of select
				// // 			Mh_nguyenlieu[$(`.popup-input.MHnguyenlieu>option[value='${digital(id)}']`).index()].removeAttribute("hidden");
				// // 			delrowtable_now(this);
				// // 		});
						
				// // 	}
				// // 	Mh_nguyenlieu.value = '0'
				// // })
				
				// // /*---------- fun choose dropbox nguyen lieu show table ----------- */
				// // let Mh_topping_Frist = Mh_topping.value
				// // if (Mh_topping){
				// // 	Mh_topping.addEventListener("change", () => {
				// // 		if(Mh_topping.value != Mh_topping_Frist){//"Thêm nguyên liệu cho mặt hàng"){
				// // 			var duplicate = highlightDuplicates($('#MHtopping'),'span.MHtopping', Mh_topping.value)
				// // 			if (duplicate){
				// // 				var name_topping = Mh_topping.options[Mh_topping.selectedIndex].text;
				// // 				var price = (Mh_topping.options[Mh_topping.selectedIndex].getAttribute('DG'))
				// // 				var id = Mh_topping.options[Mh_topping.selectedIndex].value
				// // 				Mh_topping[Mh_topping.selectedIndex].setAttribute('hidden','true');
				// // 				table_html = `<tr id="TP${id}">
				// // 								<td data-label="TÊN"><span class="MHtopping" style="user-select: none;">${name_topping}</span></td>
				// // 								<td data-label="Số Lượng"><input type="text" disabled="disabled" value="1" style="width: 100%;color: grey;border: none;text-align: center;" id="number-input" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);" /></td>
				// // 								<td data-label="Giá" style="width: 100%;"><input type="text" disabled="disabled" value="${Number(price).format(0, 3, '.', ',')}₫" style="width: 100%; color: grey; border:none;text-align: center;" id="number-input" /></td>
				// // 								<td data-label="Thao Tác" style="text-align: right;"><i class="far fa-trash-alt"></i></td>
				// // 							</tr>`
				// // 				$(table_MHtopping).append(table_html);
				// // 				table_MHtopping.style.display = "block";		
				// // 				let btn_del_NL = document.querySelector(`tr#TP${id}`)
				// // 				btn_del_NL.querySelector('i').addEventListener('click', async function (evt) {
				// // 					// const name_option = this.parentNode.parentNode.childNodes[1].innerText
				// // 					//show option of select
				// // 					Mh_topping[$(`.popup-input.MHtopping>option[value='${digital(id)}']`).index()].removeAttribute("hidden");
				// // 					delrowtable_now(this);
				// // 				});					
				// // 			}
				// // 		}
				// // 		Mh_topping.value = Mh_topping_Frist 
				// // 	})
					
				// // }

				// // /*---------------- func gia tuy chon event ------------------------ */
				// // let price_tuychon = document.querySelector('.popup-input.price_tuychon')
				// // let price_toithieu = document.querySelector('.input-field.giatuychonMH')
				// // let nhap_price = document.querySelector('.input-field.nhapgiaMH')
				// // let note_toithieu = document.querySelector('.note-toithieu')
				// // let danhmucMH = document.querySelector('.popup-input.danhmucMH')
				// // price_tuychon.addEventListener("change", () => {
				// // 	// console.log('check', price_tuychon.checked)
				// // 	if (price_tuychon.checked){
				// // 		Mh_nguyenlieu.disabled = true;
				// // 		Mh_nguyenlieu.style.color = 'grey';
				// // 		price_toithieu.style.display = 'block';
				// // 		note_toithieu.style.display = 'block';
				// // 		nhap_price.style.display = 'none';
				// // 		nhap_price.querySelector('.price_MH').classList.remove('invalid')
				// // 		nhap_price.querySelector('.price_MH').value=''
				// // 		danhmucMH.value = '0'
				// // 		$("#MHnguyenlieu tbody tr").remove();
				// // 		document.querySelector("#MHnguyenlieu").style.display = 'none'
				// // 		table_MHtopping.parentNode.style.height= '120px'
				// // 		table_MHnguyenlieu.parentNode.style.height= '330px'
				// // 	}else{
				// // 		Mh_nguyenlieu.disabled = false;
				// // 		Mh_nguyenlieu.style.color = 'white';
				// // 		price_toithieu.style.display = 'none';
				// // 		note_toithieu.style.display = 'none';
				// // 		nhap_price.style.display = 'block';
				// // 		nhap_price.querySelector('.price_MH').classList.add('invalid')
				// // 		price_toithieu.querySelector('.giatuychonMH').value = 0;
				// // 		price_toithieu.querySelector('span').innerHTML = '';
				// // 		table_MHtopping.parentNode.style.height= '350px'
				// // 		table_MHnguyenlieu.parentNode.style.height= '410px'
				// // 	}

				// // });
				// // if (nhap_price.querySelector('.price_MH').value !=="Tuỳ Chọn"){
				// // 	Mh_nguyenlieu.disabled = false;
				// // 	Mh_nguyenlieu.style.color = 'white';
				// // 	price_toithieu.style.display = 'none';
				// // 	note_toithieu.style.display = 'none';
				// // 	nhap_price.style.display = 'block';
				// // 	nhap_price.querySelector('.price_MH').classList.remove('invalid')
				// // 	price_tuychon.checked = false
				// // 	table_MHtopping.parentNode.style.height= '350px'
				// // 	table_MHnguyenlieu.parentNode.style.height= '410px'
				// // }else{
				// // 	Mh_nguyenlieu.disabled = true;
				// // 	Mh_nguyenlieu.style.color = 'grey';
				// // 	price_toithieu.style.display = 'block';
				// // 	note_toithieu.style.display = 'block';
				// // 	nhap_price.style.display = 'none';
				// // 	nhap_price.querySelector('.price_MH').value=''
				// // 	nhap_price.querySelector('.price_MH').classList.add('invalid')
				// // 	price_tuychon.checked = true
				// // 	table_MHtopping.parentNode.style.height= '120px'
				// // 	table_MHnguyenlieu.parentNode.style.height= '330px'
				// // }


				// // /*------------------- func chon topping ----------------*/
				// // let max_topping = document.querySelector('.popup-input.max_toppingMH')
				// // let toida = max_topping.parentNode.querySelector('label.max_toppingMH')
				// // // console.log(toida)
				// // let choose_topping = document.querySelector('.popup-input.danhmucMH')
				// // choose_topping.addEventListener("change", () => {
				// // 	// console.log('check', price_tuychon.checked)
				// // 	if (choose_topping.value =='Chọn làm Topping'){
				// // 		Mh_topping.disabled = true;
				// // 		Mh_topping.style.color = 'grey';
				// // 		price_toithieu.style.display = 'none';
				// // 		note_toithieu.style.display = 'none';
				// // 		max_topping.disabled= true;
				// // 		max_topping.style.color = 'transparent';
				// // 		toida.style.color = 'grey';
				// // 		price_tuychon.checked = false;
				// // 		price_tuychon.disabled = true;
				// // 		Mh_nguyenlieu.disabled = false;
				// // 		Mh_nguyenlieu.style.color = 'white';
				// // 	}else{
				// // 		Mh_topping.disabled = false;
				// // 		Mh_topping.style.color = 'white';
				// // 		price_toithieu.style.display = 'none';
				// // 		note_toithieu.style.display = 'none';
				// // 		max_topping.disabled= false;
				// // 		max_topping.style.color = 'white';
				// // 		toida.style.color = 'white';
				// // 		price_tuychon.disabled = false;
				// // 	}

				// // });

				// // /*-------------------- func chon danh muc --------------*/
				// // let danhmuc_MH = document.querySelector('.popup-input.danhmucMH')
				// // danhmuc_MH.addEventListener("change", () => {
				// // 	document.querySelector('.popup-input.danhmucMH').style.borderColor= 'var(--blue)'
				// // 	console.log(danhmuc_MH.value)
				// // });

			
				// // /*------------------- func chon topping ----------------*/
				// // let max_topping = document.querySelector('.popup-input.max_toppingMH')
				// // let toida = max_topping.parentNode.querySelector('label.max_toppingMH')
				// // // console.log(toida)
				// // let choose_topping = document.querySelector('.popup-input.danhmucMH')
				// // choose_topping.addEventListener("change", () => {
				// // 	// console.log('check', price_tuychon.checked)
				// // 	if (choose_topping.value =='Chọn làm Topping'){
				// // 		Mh_topping.disabled = true;
				// // 		Mh_topping.style.color = 'grey';
				// // 		price_toithieu.style.display = 'none';
				// // 		note_toithieu.style.display = 'none';
				// // 		max_topping.disabled= true;
				// // 		max_topping.style.color = 'transparent';
				// // 		toida.style.color = 'grey';
				// // 		price_tuychon.checked = false;
				// // 		price_tuychon.disabled = true;
				// // 		Mh_nguyenlieu.disabled = false;
				// // 		Mh_nguyenlieu.style.color = 'white';
				// // 	}else{
				// // 		Mh_topping.disabled = false;
				// // 		Mh_topping.style.color = 'white';
				// // 		price_toithieu.style.display = 'none';
				// // 		note_toithieu.style.display = 'none';
				// // 		max_topping.disabled= false;
				// // 		max_topping.style.color = 'white';
				// // 		toida.style.color = 'white';
				// // 		price_tuychon.disabled = false;
				// // 	}

				// // });

				// // /*-------------------- func chon danh muc --------------*/
				// // let danhmuc_MH = document.querySelector('.popup-input.danhmucMH')
				// // danhmuc_MH.addEventListener("change", () => {
				// // 	document.querySelector('.popup-input.danhmucMH').style.borderColor= 'var(--blue)'
				// // 	console.log(danhmuc_MH.value)
				// // });
				
				func_enventMH();
				/*------------------- func save ----------------------- */
				let btn_luu = document.querySelector('.button_popup')
				btn_luu.addEventListener('click',function (evt) {
					/*----- check invalid ---- */
					let invalid = this.parentNode.querySelectorAll('.invalid')
					if (invalid.length==0){
						save_popup(this, selectObject)
					}else{
						invalid.forEach(element => {
							const elem_check = element.parentNode.querySelector('.ti-check')
							css(elem_check, {
								'display': 'none',
								'color': 'var(--green)'
							})
							const elem_alert = element.parentNode.querySelector('.ti-alert')
							css(elem_alert, {
								'display': 'block',
								'color': 'red'
							})
							element.style.borderColor = 'red';
						})
					}
					/*----- check valid ---- */
					let valid = btn_luu.parentNode.querySelectorAll('.valid')
					valid.forEach(element => {
						const elem_check = element.parentNode.querySelector('.ti-check')
						css(elem_check, {
							'display': 'block',
							'color': 'var(--green)'
						})
						const elem_alert = element.parentNode.querySelector('.ti-alert')
							css(elem_alert, {
								'display': 'none',
								'color': 'red'
							})
						element.style.borderColor = 'green';
					});
				});
			}else if(dict=='time'){
				html =  `<style>
							.popup{
								width: 700px;
							}
							.input-field input ~ label{
								top: 0;
								left: 15px;
								font-size: 16px;
								padding: 0 5px;
								background: var(--light);
								color: yellow;
								}
					</style>`	
				html +=  `
				<a class="close_popup" onclick='closePopup_gop_y()'>X</a>
				<p class="title_popup" id="${id}">Hẹn Giờ Mở Bán</p>
				<hr style="margin: .3rem 0rem 0rem 0rem; border: 1px solid rgba(255, 255, 255, 0.3);outline: none !important;"><br>
				<div class>
					<p style='border-radius: 5px; padding:15px; background: #856404; color: var(--white_text); font-size: 18px;'>Thêm khung giờ bán hàng và bật hẹn giờ để lên lịch bán hàng <strong style='color: yellow; font-weight:600;'>${nameMH}.</strong></p>
				</div>

				<div class="checkbox-toggle" style="padding-bottom: 20px;">
					<label for="checkbox1" class="toggle_checkbox"> 
						<input type="checkbox" id="checkbox1" class="toggle_input popup-input hengio_MH" hidden=""/>
						<div class="toggle_bar">
							<div class="toggle_spin"></div>
						</div>
						<p>Bật hẹn giờ</p>
					</label>
				</div>

				<div style="display: flex; gap:10px;">
					<div class="input-field date-form" style='flex: 2;'>
						<input class="popup-input date_begin invalid" type="text" id="myDate" style="width: 100%; margin:0;" onoutfocus="validateValue_str(event);" onchange="validateValue_str(event);">
						<label>Giờ Bán</label>
						<i class="ti-check"></i>
						<i class="ti-alert"></i>
					</div>

					<div class="input-field date-form" style='flex: 2;'>
						<input class="popup-input date_end invalid" type="text" id="myDate" style="width: 100%; margin:0;" onoutfocus="validateValue_str(event);" onchange="validateValue_str(event);">
						<label>Giờ Ngừng</label>
						<i class="ti-check"></i>
						<i class="ti-alert"></i>
					</div>
					<button style='width: 100px; margin-top: 20px; height: 50px;' type="button" class="button_popup" titles=${title} item="save_time">THÊM</button>
				</div>`
				
			html+=`<!-- table nguyên liệu cho mặt hàng -->
				<div class="table_responsive" style="margin:0;padding:0; width:100%;">
					<table cellspacing="0" cellpadding="0" id="time_order" class="table-popup" style="width:100%; padding-top: 0px; margin-top:0;">
						<thead>
							<tr>
								<th style="width:42%; text-align: left; font-size: 18px;">Giờ Bán</th>
								<th style="width:42%; text-align: left; font-size: 18px;">Giờ Ngừng</th>
								<th style="text-align: left; font-size: 18px;">Thao Tác</th>
							</tr>
						</thead>
						<tbody id="timer">
							<!-- show duoi func -->										
						</tbody>
					</table>
				</div>`
	
				const show_contain = document.querySelector('#popup')
				show_contain.innerHTML = html;
				/*---------- func event date ---------------*/
				flatpickr("#myDate", {
					noCalendar: true,
					enableTime: true,
					dateFormat: "H:i",
				});
				/*--------- func show timer ----- */
				temp_order = {id: id, action: 'getMH'}
				let MH = await instance.post('/mathang', temp_order);
				let OpenHengio = MH.data[0].OpenHengio
				let Hengio = document.querySelector('.popup .hengio_MH')
				console.log(OpenHengio)
				OpenHengio =='checked' ? Hengio.checked=true : Hengio.checked=false;
				
				let temp = {id_MH: id, action: 'get_timer'}
				let res = await instance.post('/mathang', temp);
				let array = res.data
				if (res){
					if(res.data.length>0)(Hengio.parentNode.parentNode).style.display= 'block'
					else (Hengio.parentNode.parentNode).style.display= 'none'
					for (let index = 0; index < array.length; index++) {
						const element = array[index];
						let dict = {
							id: element.id,
							gioban: element.gioban,
							giongung: element.giongung,
						}
						show_del_timer(dict);
					}
				}
				//* ------------ func hhengio_MH ------------ */ 
				let hengio_MH = document.querySelector('.popup .hengio_MH')
				hengio_MH.addEventListener('change', async function (evt) {
					let temp = {
						id_MH: id,
						OpenHengio: hengio_MH.checked ? 'checked':'unchecked',
						action: 'on_off_timer'
					}
					let res = await instance.post('/mathang', temp);
					switch_tab('Mặt Hàng')
				});

				/*------------------- func save click ----------------------- */
				let btn_luu = document.querySelector('.button_popup')
				btn_luu.addEventListener('click', async function (evt) {
					/*----- check invalid ---- */
					let invalid = this.parentNode.querySelectorAll('.invalid')
					let popup = document.querySelector('.popup')
					if (invalid.length==0){
						let temp = {
							id_MH: id,
							gioban: popup.querySelector('.date_begin').value,
							giongung: popup.querySelector('.date_end').value,
							action: 'new_timer'
						}
						let res = await instance.post('/mathang', temp);
						if (res){
							let dict = {
								id: res.data,
								gioban: popup.querySelector('.date_begin').value,
								giongung: popup.querySelector('.date_end').value,
							}
							show_del_timer(dict);
							popup.querySelector('.date_begin').value = ''
							popup.querySelector('.date_end').value = ''
							popup.querySelector('.date_begin').classList.add('invalid')
							popup.querySelector('.date_end').classList.add('invalid')
							popup.querySelector('.date_begin').classList.remove('valid')
							popup.querySelector('.date_end').classList.remove('valid')
							// popup.querySelector('.ti-alert').style.display= 'none'
							// popup.querySelector('.ti-check').style.display ='none'
							switch_tab('Mặt Hàng')
						}
					}else{
						invalid.forEach(element => {
							const elem_check = element.parentNode.querySelector('.ti-check')
							css(elem_check, {
								'display': 'none',
								'color': 'var(--green)'
							})
							const elem_alert = element.parentNode.querySelector('.ti-alert')
							css(elem_alert, {
								'display': 'block',
								'color': 'red'
							})
							element.style.borderColor = 'red';
						})
					}
					/*----- check valid ---- */
					let valid = btn_luu.parentNode.querySelectorAll('.valid')
					valid.forEach(element => {
						const elem_check = element.parentNode.querySelector('.ti-check')
						css(elem_check, {
							'display': 'block',
							'color': 'var(--green)'
						})
						const elem_alert = element.parentNode.querySelector('.ti-alert')
							css(elem_alert, {
								'display': 'none',
								'color': 'red'
							})
						element.style.borderColor = 'green';
					});
					
				});

				function show_del_timer(dict) {
					let id_time = dict.id
					let gioban = dict.gioban
					let giongung= dict.giongung
					let table = document.querySelector("#time_order");
					(document.querySelector('.popup .hengio_MH').parentNode.parentNode).style.display= 'block'
					// document.querySelector('.popup .hengio_MH').checked = true;
					let table_html = `<tr id='timer${id_time}'>
										<td data-label="Giờ Bán"><span class="timer_begin" style="user-select: none;">${gioban}</span></td>
										<td data-label="Giờ Ngừng"><span class="timer_end" style="user-select: none;">${giongung}</span></td>
										<td data-label="Action"><i class="far fa-trash-alt" item="del_timer"></i></td>
									</tr>`
					$(table).append(table_html);
					table.style.display = "block";
					let btn_del_timer = document.querySelector(`#timer${id_time}`)
					btn_del_timer.querySelector('i').addEventListener('click', async function (evt) {
						clickFlag = 0;//giữ popup
						const row = this.parentNode.parentNode
						let Hengio = document.querySelector('.popup .hengio_MH')
						console.log(Hengio.checked)
						let temp_order = {
							id_timer: digital(row.id),
							action: 'del_timer',
						}
						await instance.post('/mathang', temp_order)

						let indexrow = row.rowIndex				
						table.rows[indexrow].remove();
						if(table.rows.length==1){
							(document.querySelector('.popup .hengio_MH').parentNode.parentNode).style.display= 'none'
							document.querySelector('.popup .hengio_MH').checked = false;
							table.style.display = "none";
						}
						switch_tab('Mặt Hàng')
					});
				}
				// show popup
				clickFlag = 0;
			}else if(dict=='del'){
			}else if(dict=='edit'){
				temp = {action: 'popup-mathang'}
				var res = await instance.post('/mathang', temp);
				//console.log(res.data.mathang)
				html =  `<style>
						.popup .popup-input, .selected-lang, .lang-menu, .popup .button_popup {
							border-radius: 5px;
							height: 50px;
						}
						.popup{
							
							overflow-y: auto;
							width: 80%;
						}
						.open-popup{
							top: -9vh;
						}						
						code, strong{
							color: #9b1728;
							font-weight: 600;
						}
					</style>`	
				html+=`	<a class="close_popup" onclick='closePopup_gop_y()'>X</a>
					<p class="title_popup" id="${id}">Chỉnh Sửa Mặt Hàng <a style="color: var(--yellow);font-weight:600;">${nameMH}</a></p>
					<hr style="margin: 10px -30px 0rem -30px; border: 1px solid rgba(255, 255, 255, 0.2);outline: none !important;"><br>

					<div class="importan-note" style='text-align: left; padding: 10px 10px 10px 10px; margin-top:0;background: #e5e1c4;color: #685d18;'>
						<p>Nhằm đảm bảo dữ liệu bán hàng và báo cáo được chính xác, mặt hàng cần được khóa (không thể chỉnh sửa nguyên liệu hay xóa) trước khi mở bán. Mở khóa mặt hàng để có thể thao tác chỉnh sửa hay xóa.</p>
						<p>Thực hiện mở khóa, các đơn hàng <strong>${nameMH}</strong> chưa hoàn thành sẽ bị chuyển trạng thái <strong>HỦY</strong> và <strong>tắt mở bán</strong>.</p>
						<p class="mb-0">Khi chỉnh sửa mặt hàng xong, vui lòng khóa mặt hàng để sẵn sàng cho việc mở bán.</p>
					</div>
					<div style="display: flex;">
						<div class="checkbox-toggle" style="padding-bottom: 5px;">
							<label for="checkbox2" class="toggle_checkbox"> 
								<input type="checkbox" id="checkbox2" class="toggle_input popup-input lock" hidden=""/>
								<div class="toggle_bar">
									<div class="toggle_spin"></div>
								</div>
								<p>Mặt hàng đã mở khoá</p>
							</label>
						</div>
						<div class="del_MH" style="display: none;text-align: right; flex:2; margin: auto 0;"><i class="far fa-trash-alt" titles="${title}" item="save_del" style="padding:8px 10px;border-radius: 5px;"></i></div>
					</div>
					<hr style="margin: 10px 0px 0rem 0px; border: 1px solid rgba(255, 255, 255, 0.1);outline: none !important; padding:0 20px;">`
				html+=`	<div class="contents_popup">
						<div class="row">
							<div class="col l-3">
								<div class="course-item" style= "color: white; margin-top: 5px;">
									<div class="input-field">
										<input type="text" required spellcheck="false" class="popup-input nameMH" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);"> 
										<label>Nhập tên mặt hàng</label>
										<i class="ti-check"></i>
										<i class="ti-alert"></i>
									</div>
					
									<div class="input-field nhapgiaMH">
										<input type="text" required spellcheck="false" class="popup-input price_MH" onkeypress="validata_number_new(event);" onkeyup="validata_number_new(event)" onfocusout="validata_number_new(event)"> 
										<label>Nhập đơn giá mặt hàng</label>
										<span style="float: left; font-style: italic; margin-left:7px;"></span>
										<i class="ti-check"></i>
										<i class="ti-alert"></i>
									</div>

									<div class="checkbox-toggle" style="padding-bottom: 20px;">
										<label for="checkbox1" class="toggle_checkbox"> 
											<input type="checkbox" id="checkbox1" class="toggle_input popup-input price_tuychon" hidden=""/>
											<div class="toggle_bar">
												<div class="toggle_spin"></div>
											</div>
											<p>Giá tùy chọn</p>
										</label>
									</div>

									<div class="dropbox_old">
										<select class="popup-input danhmucMH">
											<option value='0'>Chọn danh mục cho mặt hàng</option>
											<option value='Topping' style="color: orange;">Chọn làm Topping</option>`
											/*-------------- sort Alphabetically xắp sếp ----------- */
											const sortedList = res.data.danhmuc.sort((a, b) =>
												a.name.localeCompare(b.name));
											sortedList.forEach(function(element, index){
											const name = element.name
											const id_DM = element.id
											console.log(id_DM)
											html+= `<option value="${id_DM}">${name}</option>`
											
										})
								html+=`	</select>
										<i class="ti-angle-down"></i>
										<i class="ti-check"></i>
										<i class="ti-alert"></i>
									</div>

									<!-- ------------- html upload ---------------- -->
									<div class="page-upload" style="margin-top: 20px; padding-left: 12px; padding-right: 30px;">
									<span>Chọn Ảnh Mặt Hàng</span>
										<input type="file" id="file_input" class="upload-box popup-input photo_MH" accept="image/gif, image/jpeg, image/png" onchange="readURL(this)" hidden=""/>
										<div class="box">
											<div class="content-upload">
												<label for="file_input">
													<img id="blah" alt="Chọn Ảnh Mặt Hàng" src="/images_order/no-image.jpg"/>
												</label>                                        
											</div>
										</div>
									</div>
									<small style="color: grey;">Chấp nhận <code>.gif, .jpeg, .png</code> và dung lượng <code>≤2MB</code>. Nếu không chọn hình, hệ thống sẽ tự lấy hình mặc định.</small>

									

								</div>
							</div>

							<div class="col l-3">
								<div class="course-item" style= "color: white; margin-top: 5px;">

									<div class="importan-note">
										<span>Có thể bỏ qua chọn nguyên liệu nếu không muốn áp dụng quản lý số lượng tồn kho.</span>
									</div>

									<div class="dropbox_old">
										<select class="popup-input MHnguyenlieu">
											<option value='0'>Thêm nguyên liệu cho mặt hàng</option>`
											/*-------------- sort Alphabetically xắp sếp ----------- */
											const nguyenlieu = res.data.nguyenlieu.sort((a, b) =>
												a.name.localeCompare(b.name));
											console.log(nguyenlieu);
											nguyenlieu.forEach(function(element, index){
												const name = element.name
												const id_NL = element.id
												html+= `<option value="${id_NL}" id="NL${id_NL}">${name}</option>`
											})
				html+=`					</select>
										<i class="ti-angle-down"></i>
										<i class="ti-check"></i>
										<i class="ti-alert"></i>
									</div>

									<!-- table nguyên liệu cho mặt hàng -->
									<div class="table_responsive" style="overflow-y: auto;height: 410px;">
										<table cellspacing="0" cellpadding="0" id="MHnguyenlieu" class="table-popup">
											<thead>
												<tr>
													<th>NGUYÊN_LIỆU</th>
													<th>Số Lượng</th>
													<th></th>
												
												</tr>
											</thead>
											<tbody id="list_order">
												<!-- show duoi func -->										
											</tbody>
										</table>
									</div>

								</div>
							</div>

							<div class="col l-3">
								<div class="course-item" style= "color: white; margin-top: 5px;">

									<div class="input-field giatuychonMH">
										<input type="text" required spellcheck="false" class="popup-input giatuychonMH" id="number-input" value='0' class="popup-input price_MH" onkeypress="validata_number_new(event);" onkeyup="validata_number_new(event)" onfocusout="validata_number_new(event)"> 
										<label>Mức tối thiểu</label>
										<span style="float: left; font-style: italic; margin-left:7px;"></span>
										<i class="ti-check"></i>
										<i class="ti-alert"></i>
									</div>

									<div style="margin-top: 0px; margin-bottom: 20px;text-align: center;" class="note-toithieu">
										<i style="color: #505050;">Khi đơn hàng với giá tùy chọn đạt mức tối thiểu, khách hàng sẽ được lựa chọn topping. Mặc định <strong>0₫</strong>.</i>
									</div>

									<div class="input-field max_toppingMH">
										<input type="text" required spellcheck="false" class="popup-input max_toppingMH" id="number-input" value='0' class="popup-input price_MH" onkeypress="validata_number_new(event);" onkeyup="validata_number_new(event)" onfocusout="validata_number_new(event)"> 
										<label class="max_toppingMH">Được chọn tối đa</label>
										<i class="ti-check"></i>
										<i class="ti-alert"></i>
									</div>

									<div style="margin-top: -10px; margin-bottom: 20px;">
										<i style="color: #505050;">Số lượng topping tối đa được lựa chọn. Nhập <strong>0</strong> để bỏ giới hạn.</i>
									</div>

									<div class="dropbox_old">
										<select class="popup-input MHtopping">
											<option>Thêm topping cho mặt hàng</option>`
											/*-------------- sort Alphabetically xắp sếp ----------- */
											const mathang = res.data.mathang.sort((a, b) =>
												a.name.localeCompare(b.name));
											mathang.forEach(function(element, index){
												const name = element.name
												const price = element.price
												const id = element.id
												html+= `<option value='${id}' id="${id}" DG='${price}'>${name}</option>`
												// <option>Đồ Uống</option>
											})
				html+=`					</select>
										<i class="ti-angle-down"></i>
										<i class="ti-check"></i>
										<i class="ti-alert"></i>
									</div>

									<!-- table topping cho mặt hàng -->
									<div class="table_responsive" style="overflow-y: auto;height:150px;">
										<table cellspacing="0" cellpadding="0" id="MHtopping" class="table-popup">
											<thead>
												<tr>
													<th>TOPPING</th>
													<th>Số Lượng</th>
													<th>Đơn Giá</th>
													<th></th>
												
												</tr>
											</thead>
											<tbody id="list_order">
											
												
											</tbody>
										</table>
									</div>


								</div>
							</div>

						</div>
					</div>`
					
			html+=	`<button type="button" class="button_popup" titles='${title}' item="save_edit">Lưu</button>`
				const show_contain = document.querySelector('#popup')
				show_contain.innerHTML = html;

				/*--------- func show value on popup -------- */
				id = document.querySelector('.title_popup').id//id_MH
				let table_MHnguyenlieu = document.querySelector("#MHnguyenlieu");
				let Mh_nguyenlieu = document.querySelector('.popup-input.MHnguyenlieu')
				let table_MHtopping = document.getElementById("MHtopping");
				let Mh_topping = document.querySelector('.popup-input.MHtopping')

				temp_order = {
					id: id,
					action: 'getMH'
				}
				let MH = await instance.post('/mathang', temp_order);
				// console.log(MH.data)
				const element = MH.data[0];
				if(MH){
					document.querySelector('.popup-input.nameMH').value = element.name
					document.querySelector('.popup-input.price_MH').value = element.price
					element.price !== 'Tuỳ Chọn'? document.querySelector('.input-field.nhapgiaMH span').innerHTML = money(element.price): null;
					document.querySelector('.input-field.nhapgiaMH span').style.display = 'block'
					document.querySelector('.popup-input.price_tuychon').checked = false
					document.querySelector('.popup-input.danhmucMH').value = element.id_DM
					document.querySelector('#blah').src = element.photo
					document.querySelector('.popup-input.giatuychonMH').value = element.muctoithieu
					element.muctoithieu !== '0'? document.querySelector('.input-field.giatuychonMH span').innerHTML = money(element.muctoithieu): null;
					document.querySelector('.popup-input.max_toppingMH').value = element.chontoida
					console.log(element.id_DM)
					// show nguyen lieu
					array = element.NguyenLieu
					for (let index = 0; index < array.length; index++) {
						const element = array[index];
						const name_NL = element.nameNL
						const id = element.NguyenLieu_ID
						const SL_NL = element.Soluong;
						// console.log(id)
						//hide option of select
						// let Mh_nguyenlieu = document.querySelector('.popup-input.MHnguyenlieu')
						Mh_nguyenlieu[$(`.popup-input.MHnguyenlieu>option[value='${id}']`).index()].setAttribute('hidden','true');
						table_html = `<tr id="NL${id}">
										<td data-label="Nguyên Liệu"><span class="MHnguyenlieu" style="user-select: none;">${name_NL}</span></td>
										<td data-label="Số lượng" style="width: 100%;"><input type="text" min="1" value="${SL_NL}" style="border: none; width: 100%;text-align: center; border-color: grey;" id="number-input" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);" /></td>
										<td data-label="Thao Tác" style="text-align: right;"><i class="far fa-trash-alt"></i></td>
									</tr>`
						$(table_MHnguyenlieu).append(table_html);
						table_MHnguyenlieu.style.display = "block";

						let btn_del_NL = document.querySelector(`tr#NL${id}`)
						btn_del_NL.querySelector('i').addEventListener('click', async function (evt) {
							Mh_nguyenlieu[$(`.popup-input.MHnguyenlieu>option[value='${id}']`).index()].removeAttribute("hidden");
							delrowtable_now(this);
						});
					}					
					// show Topping
					let table_MHtopping = document.getElementById("MHtopping");
					array = element.Topping
					for (let index = 0; index < array.length; index++) {
						const element = array[index];
						const name_topping = element.nameTopping;
						const id_topping = element.id;
						const SL_Topping = element.Topping_SL;
						const DG_Topping = element.Topping_DG;
						Mh_topping[$(`.popup-input.MHtopping>option[value='${id_topping}']`).index()].setAttribute('hidden','true');
						table_html = `<tr id="TP${id_topping}">
										<td data-label="TÊN"><span class="MHtopping" style="user-select: none;">${name_topping}</span></td>
										<td data-label="Số Lượng"><input type="text" disabled="disabled" value="1" style="width: 100%;color: grey;border: none;text-align: center;" id="number-input" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);" /></td>
										<td data-label="Giá" style="width: 100%;"><input type="text" disabled="disabled" value="${Number(DG_Topping).format(0, 3, '.', ',')}₫" style="width: 100%; color: grey; border:none;text-align: center;" id="number-input" /></td>
										<td data-label="Thao Tác" style="text-align: right;"><i class="far fa-trash-alt"></i></td>
									</tr>`
						$(table_MHtopping).append(table_html);
						table_MHtopping.style.display = "block";

						let btn_del_NL = document.querySelector(`tr#TP${id_topping}`)
						btn_del_NL.querySelector('i').addEventListener('click', async function (evt) {
							// console.log(id)
							Mh_topping[$(`.popup-input.MHtopping>option[value='${id_topping}']`).index()].removeAttribute("hidden");
							delrowtable_now(this);
						});
					}
				}	

				// /*---------- fun choose dropbox nguyen lieu show table ----------- */
				// Mh_nguyenlieu.addEventListener("change", () => {
				// 	let Mh_nguyenlieu_Frist = Mh_nguyenlieu.options[Mh_nguyenlieu.selectedIndex].text;
				// 	if(Mh_nguyenlieu.value != Mh_nguyenlieu_Frist){//"Thêm nguyên liệu cho mặt hàng")
				// 		var id = Mh_nguyenlieu.options[Mh_nguyenlieu.selectedIndex].id
				// 		//hide option of select
				// 		Mh_nguyenlieu[Mh_nguyenlieu.selectedIndex].setAttribute('hidden','true');
				// 		table_html = `<tr id="NL${id}">
				// 						<td data-label="Nguyên Liệu"><span class="MHnguyenlieu" style="user-select: none;">${Mh_nguyenlieu_Frist}</span></td>
				// 						<td data-label="Số lượng" style="width: 100%;"><input type="text" min="1" value="1" style="border: none; width: 100%;text-align: center; border-color: grey;" id="number-input" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);" /></td>
				// 						<td data-label="Thao Tác" style="text-align: right;"><i class="far fa-trash-alt"></i></td>
				// 					</tr>`
				// 		$(table_MHnguyenlieu).append(table_html);
				// 		table_MHnguyenlieu.style.display = "block";

				// 		let btn_del_NL = document.querySelector(`tr#NL${id}`)
				// 		btn_del_NL.querySelector('i').addEventListener('click', async function (evt) {
				// 			// name_option = this.parentNode.parentNode.childNodes[1].innerText
				// 			//show option of select
				// 			Mh_nguyenlieu[$(`.popup-input.MHnguyenlieu>option[value='${digital(id)}']`).index()].removeAttribute("hidden");
				// 			delrowtable_now(this);
				// 		});
						
				// 	}
				// 	Mh_nguyenlieu.value = '0'
				// })
				
				// /*---------- fun choose dropbox nguyen lieu show table ----------- */
				// let Mh_topping_Frist = Mh_topping.value
				// if (Mh_topping){
				// 	Mh_topping.addEventListener("change", () => {
				// 		if(Mh_topping.value != Mh_topping_Frist){//"Thêm nguyên liệu cho mặt hàng"){
				// 			var duplicate = highlightDuplicates($('#MHtopping'),'span.MHtopping', Mh_topping.value)
				// 			if (duplicate){
				// 				var name_topping = Mh_topping.options[Mh_topping.selectedIndex].text;
				// 				var price = (Mh_topping.options[Mh_topping.selectedIndex].getAttribute('DG'))
				// 				var id = Mh_topping.options[Mh_topping.selectedIndex].value
				// 				Mh_topping[Mh_topping.selectedIndex].setAttribute('hidden','true');
				// 				table_html = `<tr id="TP${id}">
				// 								<td data-label="TÊN"><span class="MHtopping" style="user-select: none;">${name_topping}</span></td>
				// 								<td data-label="Số Lượng"><input type="text" disabled="disabled" value="1" style="width: 100%;color: grey;border: none;text-align: center;" id="number-input" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);" /></td>
				// 								<td data-label="Giá" style="width: 100%;"><input type="text" disabled="disabled" value="${Number(price).format(0, 3, '.', ',')}₫" style="width: 100%; color: grey; border:none;text-align: center;" id="number-input" /></td>
				// 								<td data-label="Thao Tác" style="text-align: right;"><i class="far fa-trash-alt"></i></td>
				// 							</tr>`
				// 				$(table_MHtopping).append(table_html);
				// 				table_MHtopping.style.display = "block";		
				// 				let btn_del_NL = document.querySelector(`tr#TP${id}`)
				// 				btn_del_NL.querySelector('i').addEventListener('click', async function (evt) {
				// 					// name_option = this.parentNode.parentNode.childNodes[1].innerText
				// 					//show option of select
				// 					Mh_topping[$(`.popup-input.MHtopping>option[value='${digital(id)}']`).index()].removeAttribute("hidden");
				// 					delrowtable_now(this);
				// 				});					
				// 			}
				// 		}
				// 		Mh_topping.value = Mh_topping_Frist 
				// 	})
					
				// }

				// /*---------------- func gia tuy chon event ------------------------ */
				// let price_tuychon = document.querySelector('.popup-input.price_tuychon')
				// let price_toithieu = document.querySelector('.input-field.giatuychonMH')
				// let nhap_price = document.querySelector('.input-field.nhapgiaMH')
				// let note_toithieu = document.querySelector('.note-toithieu')
				// let danhmucMH = document.querySelector('.popup-input.danhmucMH')
				// price_tuychon.addEventListener("change", () => {
				// 	// console.log('check', price_tuychon.checked)
				// 	if (price_tuychon.checked){
				// 		Mh_nguyenlieu.disabled = true;
				// 		Mh_nguyenlieu.style.color = 'grey';
				// 		price_toithieu.style.display = 'block';
				// 		note_toithieu.style.display = 'block';
				// 		nhap_price.style.display = 'none';
				// 		nhap_price.querySelector('.price_MH').classList.remove('invalid')
				// 		nhap_price.querySelector('.price_MH').value=''
				// 		danhmucMH.value = '0'
				// 		$("#MHnguyenlieu tbody tr").remove();
				// 		document.querySelector("#MHnguyenlieu").style.display = 'none'
				// 		table_MHtopping.parentNode.style.height= '120px'
				// 		table_MHnguyenlieu.parentNode.style.height= '330px'
				// 	}else{
				// 		Mh_nguyenlieu.disabled = false;
				// 		Mh_nguyenlieu.style.color = 'white';
				// 		price_toithieu.style.display = 'none';
				// 		note_toithieu.style.display = 'none';
				// 		nhap_price.style.display = 'block';
				// 		nhap_price.querySelector('.price_MH').classList.add('invalid')
				// 		price_toithieu.querySelector('.giatuychonMH').value = 0;
				// 		price_toithieu.querySelector('span').innerHTML = '';
				// 		table_MHtopping.parentNode.style.height= '350px'
				// 		table_MHnguyenlieu.parentNode.style.height= '410px'
				// 	}

				// });
				// if (nhap_price.querySelector('.price_MH').value !=="Tuỳ Chọn"){
				// 	Mh_nguyenlieu.disabled = false;
				// 	Mh_nguyenlieu.style.color = 'white';
				// 	price_toithieu.style.display = 'none';
				// 	note_toithieu.style.display = 'none';
				// 	nhap_price.style.display = 'block';
				// 	nhap_price.querySelector('.price_MH').classList.remove('invalid')
				// 	price_tuychon.checked = false
				// 	table_MHtopping.parentNode.style.height= '350px'
				// 	table_MHnguyenlieu.parentNode.style.height= '410px'
				// }else{
				// 	Mh_nguyenlieu.disabled = true;
				// 	Mh_nguyenlieu.style.color = 'grey';
				// 	price_toithieu.style.display = 'block';
				// 	note_toithieu.style.display = 'block';
				// 	nhap_price.style.display = 'none';
				// 	nhap_price.querySelector('.price_MH').value=''
				// 	nhap_price.querySelector('.price_MH').classList.add('invalid')
				// 	price_tuychon.checked = true
				// 	table_MHtopping.parentNode.style.height= '120px'
				// 	table_MHnguyenlieu.parentNode.style.height= '330px'
				// }		

				// /*------------------- func chon topping ----------------*/
				// let max_topping = document.querySelector('.popup-input.max_toppingMH')
				// let toida = max_topping.parentNode.querySelector('label.max_toppingMH')
				// // console.log(toida)
				// let choose_topping = document.querySelector('.popup-input.danhmucMH')
				// choose_topping.addEventListener("change", () => {
				// 	// console.log('check', price_tuychon.checked)
				// 	if (choose_topping.value =='Chọn làm Topping'){
				// 		Mh_topping.disabled = true;
				// 		Mh_topping.style.color = 'grey';
				// 		price_toithieu.style.display = 'none';
				// 		note_toithieu.style.display = 'none';
				// 		max_topping.disabled= true;
				// 		max_topping.style.color = 'transparent';
				// 		toida.style.color = 'grey';
				// 		price_tuychon.checked = false;
				// 		price_tuychon.disabled = true;
				// 		Mh_nguyenlieu.disabled = false;
				// 		Mh_nguyenlieu.style.color = 'white';
				// 	}else{
				// 		Mh_topping.disabled = false;
				// 		Mh_topping.style.color = 'white';
				// 		price_toithieu.style.display = 'none';
				// 		note_toithieu.style.display = 'none';
				// 		max_topping.disabled= false;
				// 		max_topping.style.color = 'white';
				// 		toida.style.color = 'white';
				// 		price_tuychon.disabled = false;
				// 	}

				// });

				// /*-------------------- func chon danh muc --------------*/
				// let danhmuc_MH = document.querySelector('.popup-input.danhmucMH')
				// danhmuc_MH.addEventListener("change", () => {
				// 	document.querySelector('.popup-input.danhmucMH').style.borderColor= 'var(--blue)'
				// 	console.log(danhmuc_MH.value)
				// });

				func_enventMH();
				/*---------------- func Mặt hàng lock & mở bán show/hide ------------------------ */
				let lock = document.querySelector('.popup-input.lock')
				let contains = document.querySelector('.contents_popup')
				let del_MH = document.querySelector('.popup .del_MH')
				const row = selectObject.parentNode.parentNode.parentNode
				let indexrow = row.rowIndex
				const row_current = document.getElementById("table_order").rows[indexrow]
				const lock_of_table = row_current.children[7]
				const btn_lock = lock_of_table.querySelector('.ti-lock')
		
				
				const btn_unlock = lock_of_table.querySelector('.ti-unlock')
				let label = lock.parentNode.querySelector('p')
				let noidung_thongbao =  document.querySelector('.importan-note').childNodes[1].innerText
				let question = `Mở khoá mặt hàng ?`
				lock.addEventListener("change",async () => {
					let id = document.querySelector('.title_popup').id
					if (lock.checked){
						contains.style.display = 'none';
						del_MH.style.display = 'none'
						btn_lock.style.display = 'block';
						btn_unlock.style.display = 'none';
						label.innerText = 'Mặt hàng đang khoá'
						let temp_order = {
							id: id,
							moban: element.moban,
							lock: (lock.checked?'checked':'unchecked'),
							action: 'lock_MH',
						}
						await instance.post('/mathang', temp_order);
						switch_tab('Mặt Hàng');
					}else{
						// hàm callback hay ah nha
						let conf = confirm_box(noidung_thongbao, question, async function (arg) {
									console.log(arg)
									if(arg){
										contains.style.display = 'block';
										del_MH.style.display = 'block'
										btn_lock.style.display = 'none';
										btn_unlock.style.display = 'block';
										label.innerText = 'Mặt hàng đã mở khoá'
										moban = (lock.checked?'unchecked': element.moban)
										let temp_order = {
											id: id,
											moban: 'unchecked',
											lock: (lock.checked?'checked':'unchecked'),
											action: 'lock_MH',
										}
										await instance.post('/mathang', temp_order);
										switch_tab('Mặt Hàng');
									}else{
										clickFlag = 1;
										/*------------------ close popup ---------------------------- */
										document.querySelector('.overlay').classList.remove('showoverlay');
										document.querySelector('.containerpopup .popup').classList.remove('open-popup');
									}
								});
					}
					
				});
				if (btn_lock.style.display=='block'){
					contains.style.display = 'none';
					del_MH.style.display = 'none'
					lock.checked = true;
					label.innerText = 'Mặt hàng đang khoá'
				}else{
					contains.style.display = 'block';
					del_MH.style.display = 'block'
					lock.checked = false;
					label.innerText = 'Mặt hàng đã mở khoá'
				}

				// show popup
				// clickFlag = 0;
				/*------------------- func del MH ----------------------- */
				let btn_del = document.querySelector('.popup .del_MH i')
				btn_del.addEventListener('click',function (evt) {
					save_popup(this, selectObject)
				});
				/*------------------- func save ----------------------- */
				let btn_luu = document.querySelector('.button_popup')
				btn_luu.addEventListener('click',async function (evt) {
					let id = document.querySelector('.title_popup').id
					/*----------- luôn khoá MH khi save ---------- */
					let temp_order = {
						id: id,
						moban: element.moban,
						lock: 'checked',
						action: 'lock_MH',
					}
					await instance.post('/mathang', temp_order);

					/*---------- clear invalid of input price ----- */
					let tuychon = document.querySelector('.popup-input.price_tuychon').checked
					tuychon ? document.querySelector('.popup-input.price_MH').classList.remove('invalid'): null

					/*----- check invalid ---- */
					let invalid = this.parentNode.querySelectorAll('.invalid')
					if (invalid.length==0){
						save_popup(this, selectObject)
					}else{
						invalid.forEach(element => {
							const elem_check = element.parentNode.querySelector('.ti-check')
							css(elem_check, {
								'display': 'none',
								'color': 'var(--green)'
							})
							const elem_alert = element.parentNode.querySelector('.ti-alert')
							css(elem_alert, {
								'display': 'block',
								'color': 'red'
							})
							element.style.borderColor = 'red';
						})
					}
					/*----- check valid ---- */
					let valid = btn_luu.parentNode.querySelectorAll('.valid')
					valid.forEach(element => {
						const elem_check = element.parentNode.querySelector('.ti-check')
						css(elem_check, {
							'display': 'block',
							'color': 'var(--green)'
						})
						const elem_alert = element.parentNode.querySelector('.ti-alert')
							css(elem_alert, {
								'display': 'none',
								'color': 'red'
							})
						element.style.borderColor = 'green';
					});
				});
			}
		break;
		case 'DM_NGUYENLIEU':
			html +=  `<style>
					.popup .popup-input {
						height: 50px;
					}
					.popup{
						width: 700px;
					}
				</style>`
			let nameNL;
			if(selectObject){
				const row = selectObject.parentNode.parentNode.parentNode
				nameNL = titleCase(row.children[1].innerText)
			}
			if(dict=="create"){
				html +=`<a class="close_popup" onclick='closePopup_gop_y()'>X</a>
				<p class="title_popup">Thêm Nguyên Liệu</p>
				<hr style="margin: .3rem 0rem 0rem 0rem; border: 1px solid rgba(255, 255, 255, 0.3);outline: none !important;"><br>
				<div>
					
					<div class="input-field">
						<input type="text" required spellcheck="false" class="popup-input invalid nameNL" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);"> 
						<label>Nhập tên nguyên liệu</label>
						<i class="ti-check"></i>
						<i class="ti-alert"></i>
					</div>
	
					<div class="input-field">
						<input type="text" required spellcheck="false" class="popup-input valid motaNL" onkeyup="validateValue_dropbox_green(event)" onfocusout="validateValue_dropbox_green(event);">
						<label>Nhập mô tả nguyên liệu</label>
						<i class="ti-check"></i>
						<i class="ti-alert"></i>
					</div>
	
					<div class="input-field">
						<input type="text" required spellcheck="false" class="popup-input invalid donviNL" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);"> 
						<label>Nhập đơn vị nguyên liệu</label>
						<i class="ti-check"></i>
						<i class="ti-alert"></i>
					</div>
	
				</div>
	
					<!-- <p style="color: #505050; text-align: left; margin-top: 5px;">Tối đa 200 ký tự</p> -->
	
				<button type="button" class="button_popup" titles='DM_NGUYENLIEU' item="save_new">Lưu</button>`
				const show_contain = document.querySelector('#popup')
				show_contain.innerHTML = html;
				/*------------------- func save ----------------------- */
				let btn_luu = document.querySelector('.button_popup')
				btn_luu.addEventListener('click',function (evt) {
					/*----- check invalid ---- */
					let invalid = this.parentNode.querySelectorAll('.invalid')
					if (invalid.length==0){
						save_popup(this, selectObject)
					}else{
						invalid.forEach(element => {
							const elem_check = element.parentNode.querySelector('.ti-check')
							css(elem_check, {
								'display': 'none',
								'color': 'var(--green)'
							})
							const elem_alert = element.parentNode.querySelector('.ti-alert')
							css(elem_alert, {
								'display': 'block',
								'color': 'red'
							})
							element.style.borderColor = 'red';
						})
					}
					/*----- check valid ---- */
					let valid = btn_luu.parentNode.querySelectorAll('.valid')
					valid.forEach(element => {
						const elem_check = element.parentNode.querySelector('.ti-check')
						css(elem_check, {
							'display': 'block',
							'color': 'var(--green)'
						})
						const elem_alert = element.parentNode.querySelector('.ti-alert')
							css(elem_alert, {
								'display': 'none',
								'color': 'red'
							})
						element.style.borderColor = 'green';
					});
				});
				// show popup
				clickFlag = 0;
			}else if (dict=='edit'){
				html +=  `
				<a class="close_popup" onclick='closePopup_gop_y()'>X</a>
				<p class="title_popup">Chỉnh Sửa Nguyên Liệu <a style="color: var(--yellow); ">${nameNL}</a></p>
				<hr style="margin: .3rem 0rem 0rem 0rem; border: 1px solid rgba(255, 255, 255, 0.3);outline: none !important;"><br>
				<div>
					<div class="text-field">
						<textarea name="Text1" cols="40" rows="5" class="popup-input nameNL" required></textarea>
						<label class="label_popup">Nhập tên nguyên liệu</label>
					</div>
	
					<div class="text-field">
						<textarea name="Text1" cols="40" rows="5" class="popup-input motaNL" required></textarea>
						<label class="label_popup">Nhập mô tả nguyên liệu</label>
					</div>
	
					<div class="text-field">
						<textarea name="Text1" cols="40" rows="5" class="popup-input donviNL" required></textarea>
						<label class="label_popup">Nhập đơn vị nguyên liệu</label>
					</div>
				</div>	
				<button type="button" class="button_popup" titles=${title} item="save_edit">Lưu</button>`
				const show_contain = document.querySelector('#popup')
				show_contain.innerHTML = html;
				
				var e = selectObject;
				const row = e.parentNode.parentNode.parentNode
				element_popup_title = row.children[1].innerHTML
	
			
				let ten_nguyen_lieu = row.children[1]
				let mota_nguyen_lieu = row.children[2]
				let donvi_nguyen_lieu = row.children[3]
				
				document.querySelector('.popup-input.nameNL').value= ten_nguyen_lieu.innerText
				document.querySelector('.popup-input.motaNL').value= mota_nguyen_lieu.innerText
				document.querySelector('.popup-input.donviNL').value= donvi_nguyen_lieu.innerText
	
				let btn_luu = document.querySelector('.button_popup')
				btn_luu.addEventListener('click',function (evt) {
					save_popup(this,selectObject)
				});
	
				// show popup
				clickFlag = 0;
				
			}else if (dict=='add'){
				html +=  `
				<a class="close_popup" onclick='closePopup_gop_y()'>X</a>
				<p class="title_popup">Nhập Kho <a style="color: var(--yellow);">${nameNL}</a></p>
				<hr style="margin: .3rem 0rem 0rem 0rem; border: 1px solid rgba(255, 255, 255, 0.3);outline: none !important;"><br>
				<p class='thongbao_popup not_show'>Lưu ý: Tồn kho = Tồn kho hiện tại - Số lượng điều chỉnh</p>
				<div>
					<div class="dropbox_old">
						<select class="popup-input invalid editkho" onchange="validateValue_dropbox(event)" onfocusout="validateValue_dropbox(event);">
							<option value="">Vui Lòng Chọn</option>
							<option>Nhập kho</option>
							<option>Điều chỉnh tồn kho</option>
						</select>
						<i class="ti-angle-down"></i>
						<i class="ti-check"></i>
						<i class="ti-alert"></i>
					</div>
					<br>
					<div class="input-field">
						<input type="text" required spellcheck="false" class="popup-input invalid slNL" onkeypress="validata_number_new(event);" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);"> 
						<label>Nhập Số Lượng</label>
						<i class="ti-check"></i>
						<i class="ti-alert"></i>
					</div>
	
					<div class="input-field">
						<input type="text" required spellcheck="false" class="popup-input invalid priceNL" onkeypress="validata_number_new(event);" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);"> 
						<label>Giá Nhập</label>
						<span style="float: left; margin-left:10px; font-style: italic;"></span>
						<i class="ti-check"></i>
						<i class="ti-alert"></i>
					</div>
	
					<div class="text-field">
						<textarea name="Text" required spellcheck="false" cols="40" rows="5" class="popup-input valid noteNL" required></textarea>
						<label class="label_popup">Nhập ghi chú</label>
						<i class="ti-check"></i>
						<i class="ti-alert"></i>
					</div>
	
				</div>
				<button type="button" class="button_popup" titles=${title} item="save_add">Nhập Kho</button>`
	
			const show_contain = document.querySelector('#popup')
			show_contain.innerHTML = html;
			/*----------------------  func show thong bao ------------------------ */
			let option_editkho = document.querySelector('.popup-input.editkho')
			option_editkho.addEventListener('change',function (evt) {
				if(option_editkho.value=='Điều chỉnh tồn kho')
					document.querySelector('.thongbao_popup').classList.remove('not_show');
				else
					document.querySelector('.thongbao_popup').classList.add('not_show');
			});
	
			/*------------------- func save ----------------------- */
			let btn_luu = document.querySelector('.button_popup')
			btn_luu.addEventListener('click',function (evt) {
				/*----- check invalid ---- */
				let invalid = this.parentNode.querySelectorAll('.invalid')
				if (invalid.length==0){
					save_popup(this, selectObject)
				}else{
					invalid.forEach(element => {
						const elem_check = element.parentNode.querySelector('.ti-check')
						css(elem_check, {
							'display': 'none',
							'color': 'var(--green)'
						})
						const elem_alert = element.parentNode.querySelector('.ti-alert')
						css(elem_alert, {
							'display': 'block',
							'color': 'red'
						})
						element.style.borderColor = 'red';
					})
				}
				/*----- check valid ---- */
				let valid = btn_luu.parentNode.querySelectorAll('.valid')
				valid.forEach(element => {
					const elem_check = element.parentNode.querySelector('.ti-check')
					css(elem_check, {
						'display': 'block',
						'color': 'var(--green)'
					})
					const elem_alert = element.parentNode.querySelector('.ti-alert')
						css(elem_alert, {
							'display': 'none',
							'color': 'red'
						})
					element.style.borderColor = 'green';
				});
			});
	
			// show popup
			clickFlag = 0;
			}else if (dict=='del'){
				html +=  `
				<a class="close_popup" onclick='closePopup_gop_y()'>X</a>
				<p class="title_popup">Xác Nhận</p>
				<hr style="margin: .3rem 0rem 0rem 0rem; border: 1px solid rgba(255, 255, 255, 0.3);outline: none !important;"><br>
				<div>
					<p style='color: var(--white_text); font-size: 18px;'>Bạn có muốn xóa Nguyên liệu <strong style='color: yellow; font-weight:600;'>${nameNL}</strong> ?</p>
				</div>
				<button style='background: red;' type="button" class="button_popup" titles=${title} item="save_del">XÁC NHẬN</button>`
	
				const show_contain = document.querySelector('#popup')
				show_contain.innerHTML = html;
				/*------------------- func save ----------------------- */
				let btn_luu = document.querySelector('.button_popup')
				btn_luu.addEventListener('click',function (evt) {
					save_popup(this, selectObject)
				});
	
				// show popup
				clickFlag = 0;
			}
		break;
		case "DM_NHOMMATHANG":
			/*---- set kich thước popup ----- */
			html =  `<style>
						.popup .popup-input, .selected-lang, .lang-menu, .popup .button_popup {
							border-radius: 5px;
							min-height:50px;
						}
						.popup{
							width: 700px;
						}
					</style>`
			let nameNhomMH;
			let id_nhom;
			if(selectObject){
				const row = selectObject.parentNode.parentNode.parentNode
				nameNhomMH = titleCase(row.children[0].innerText)
				id_nhom = row.id
			}
			if(dict=='create'){
				html+=`	<a class="close_popup" onclick='closePopup_gop_y()'>X</a>
					<p class="title_popup">Thêm Nhóm Mặt Hàng</p>
					<hr style="margin: 10px -30px 0rem -30px; border: 1px solid rgba(255, 255, 255, 0.2);outline: none !important;"><br>
					<div class="input-field">
						<input type="text" required spellcheck="false" class="popup-input invalid nameMH" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);"> 
						<label>Nhập tên nhóm mặt hàng</label>
						<i class="ti-check"></i>
						<i class="ti-alert"></i>
					</div>

					<div class="input-field">
						<input type="text" required spellcheck="false" class="popup-input valid mota_nhomMH" id="number-input" onkeyup="validateValue_dropbox_green(event)" onfocusout="validateValue_dropbox_green(event);"> 
						<label>Nhập mô tả nhóm mặt hàng</label>
						<i class="ti-check"></i>
						<i class="ti-alert"></i>
					</div>

					<div class="checkbox-toggle" style="padding-bottom: 20px;">
						<label for="checkbox1" class="toggle_checkbox"> 
							<input type="checkbox" id="checkbox1" class="toggle_input popup-input label_nhom" hidden=""/>
							<div class="toggle_bar">
								<div class="toggle_spin"></div>
							</div>
							<p>Hiển thị nhãn trên mặt hàng</p>
						</label>
					</div>

					<div class="input-field not_show" id='hidde'>
						<input type="text" required spellcheck="false" class="popup-input tennhan_nhomMH" id="number-input"  onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);"> 
						<label>Nhập tên nhãn</label>
						<i class="ti-check"></i>
						<i class="ti-alert"></i>
					</div>

					<div class="lang-menu not_show" id='hidde'>
							<div class="selected-lang valid">
								<a class="mathang lang-option"></a>
								<span class="sBtn-text">Không chọn màu</span>
								<i class="separator"></i>
								<span class='sBtn-close'>X</span>
								<i class="ti-angle-down"></i>
							</div>
							
							<ul>`		
				color_list.forEach(function(element, index){
					let name = element.name
					let mau = element.color
					html+=`	<li class="option">
								<span class="mathang" style="background-color: ${mau};"></span>
								<a href="#" class="de option-text">${name}</a>
							</li>`
				});
	
				html+=	`	</ul>
							<i class="ti-check"></i>
							<i class="ti-alert"></i>
					</div>
					
					<div class="checkbox-toggle" style="padding-bottom: 20px;">
						<label for="checkbox2" class="toggle_checkbox"> 
							<input type="checkbox" id="checkbox2" class="toggle_input popup-input show_nhom" hidden=""/>
							<div class="toggle_bar">
								<div class="toggle_spin"></div>
							</div>
							<p>Hiển thị trên Menu Quick Link</p>
						</label>
					</div>
					<button type="button" class="button_popup" titles='DM_NHOMMATHANG' item="save_new">Lưu</button>`
				const show_contain = document.querySelector('#popup')
				show_contain.innerHTML = html;
				dropbox_chonmau();
				/*------------------- func save ----------------------- */
				let btn_luu = document.querySelector('.button_popup')
				btn_luu.addEventListener('click',function (evt) {
					/*----- check invalid ---- */
					let invalid = this.parentNode.querySelectorAll('.invalid')
					if (invalid.length==0){
						save_popup(this, selectObject)
					}else{
						invalid.forEach(element => {
							const elem_check = element.parentNode.querySelector('.ti-check')
							css(elem_check, {
								'display': 'none',
								'color': 'var(--green)'
							})
							const elem_alert = element.parentNode.querySelector('.ti-alert')
							css(elem_alert, {
								'display': 'block',
								'color': 'red'
							})
							element.style.borderColor = 'red';
						})
					}
					/*----- check valid ---- */
					let valid = btn_luu.parentNode.querySelectorAll('.valid')
					valid.forEach(element => {
						const elem_check = element.parentNode.querySelector('.ti-check')
						css(elem_check, {
							'display': 'block',
							'color': 'var(--green)'
						})
						const elem_alert = element.parentNode.querySelector('.ti-alert')
							css(elem_alert, {
								'display': 'none',
								'color': 'red'
							})
						element.style.borderColor = 'green';
					});
				});

				/*------------------ func checkbox show ------------- */
				let checkbox = document.querySelector('#checkbox1')
				checkbox.addEventListener('change',function (evt) {
					let hide = document.querySelectorAll('#hidde')
					hide.forEach(element => {
						element.classList.toggle('not_show')
						element.querySelector('.tennhan_nhomMH') ? element.querySelector('.tennhan_nhomMH').classList.toggle('invalid') : null
						if (element.classList.contains('not_show')){
							document.querySelector('.lang-menu .sBtn-text').innerHTML = ''
							document.querySelector('.tennhan_nhomMH').value=''
							document.querySelector('.tennhan_nhomMH').classList.remove('invalid')
						}
					});
				});
				
				// show popup
				clickFlag = 0;
			}else if(dict=='add'){
				temp_order = {
					id_nhom: id_nhom,
					action: 'getMH'
				}
				let list_MH = await instance.post('/nhomMH', temp_order);
				list_MH = list_MH.data
				console.log(list_MH, id_nhom)
				let show;
				list_MH.MH_of_nhom.length == 0 ? show="Chọn Mặt Hàng..." : show=""
				// <span class="chonMH ${show}" style="padding:0 10px;">Chọn Mặt Hàng... </span>
				html+=`	<a class="close_popup" onclick='closePopup_gop_y()'>X</a>
						<p class="title_popup">Thêm/Xoá Mặt Hàng</p>
						<hr style="margin: 10px -30px 0rem -30px; border: 1px solid rgba(255, 255, 255, 0.2);outline: none !important;"><br>

						<div class="lang-menu" id='hidde' style= "width:100%;">
							<div class="selected-lang" style="padding: 10px 0; justify-content: space-between; width:100%;">
								<div class="contains" style="box-sizing: inherit; display: flex; flex-flow: wrap; border-right: 1px solid rgba(255,255,255,0.2); width:100%;">`
							list_MH.MH_of_nhom.forEach(function(element, index){
								let name = element.nameMatHang
								let id = element.id_MH
								let id_nhomMH = element.id_nhomMH
								html+=`<div class='a${id}' id="${id_nhomMH}" style="display: inline-block;background: #A0522D;border-radius: 3px; margin: 5px 5px;padding:0 10px; flex-flow: wrap;">
										<span class="" style="margin-right: 10px;">${name}</span>
										<span style="cursor: pointer;z-index:100;" id='${id}' onclick="clear_el(this);">X</span>
									</div>`
							});

			html+=		`	<input type="text" class="search_MH" style="flex: 2; padding:0 10px;color: var(--white_text);font-size: 19px; background: transparent; border: none;" placeholder="${show}">
						</div>
						
						<span class='sBtn-close' >X</span>
						<i class="ti-angle-down" style="border: none; float:right;"></i>
					</div>
					<ul>`		
				
				list_MH.list_MH.forEach(function(element, index){
					let id = element.id
					let name = element.name
					let mau = element.color
					html+=`	<li class="option" id="${id}">
								<span class="mathang" style="background-color: ${mau};"></span>
								<a href="#" class="de option-text">${name}</a>
							</li>`
				});
	
				html+=	`	</ul>
							<i class="ti-check"></i>
							<i class="ti-alert"></i>

						</div>
					</div>
					`
				const show_contain = document.querySelector('#popup')
				show_contain.innerHTML = html;

				function dropbox_chonmau_todolist(){
					var optionMenu = document.querySelector(".lang-menu")
					if (optionMenu){
						var selectBtn = optionMenu.querySelector(".selected-lang .contains"),
						options = optionMenu.querySelectorAll(".option"),
						sBtn_text = optionMenu.querySelector(".sBtn-text"),
						send_color = optionMenu.querySelector(".mathang"),
						sBtn_close = optionMenu.querySelector(".sBtn-close"),
						dropboxs = optionMenu.querySelector(".ti-angle-down");
						/*-------------- func hide option ------- */
						let array = list_MH.MH_of_nhom
						// console.log(array)
						for (let index = 0; index < array.length; index++) {
							const el = array[index];
							const id_MH = el.id_MH
							options.forEach(element => {
								if (element.id == id_MH){
									element.classList.add("not_show");
									element.style.display = 'none'
								}
							});
						}
						
						/*-------------- check outsize dropbox ---------- */
						(optionMenu.parentNode.parentNode).addEventListener("click", (event) => {
							if (!optionMenu.contains(event.target)) {
								const valid = optionMenu.querySelector('.valid')
								const invalid = optionMenu.querySelector('.invalid')
								optionMenu.classList.remove("active");
								if (valid){
									selectBtn.style.borderColor = 'green';
									optionMenu.querySelector('.ti-check').style.display='block';
									optionMenu.querySelector('.ti-check').style.color = 'var(--green)';
									optionMenu.querySelector('.ti-alert').style.display='none';
								}
								if (invalid){
									selectBtn.style.borderColor = 'red';
									optionMenu.querySelector('.ti-check').style.display='none';
									optionMenu.querySelector('.ti-alert').style.display='block';
									optionMenu.querySelector('.ti-alert').style.color='red';
								}
							}
						});
						/*---------- event button clear ---------- */
						sBtn_close.addEventListener("click", () => {
							sBtn_text.innerText = 'Không chọn màu';
							send_color.style.backgroundColor= 'grey'
							sBtn_close.classList.remove("active")
							optionMenu.querySelector('.ti-check').style.display='none'
							const invalid = optionMenu.querySelector('.invalid')
							if (invalid){selectBtn.classList.add('invalid')}
						});     
						/*------------- event choice option -------- */
						options.forEach(option =>{
							option.addEventListener("click", async ()=>{
								let selectedOption = option.querySelector(".option-text").innerText;
								optionMenu.classList.remove("active");
								option.classList.add("not_show");
								option.style.display = 'none'
								optionMenu.querySelector(".selected-lang .contains .search_MH").setAttribute('placeholder', '');
								optionMenu.querySelector(".selected-lang .contains .search_MH").value='';

								let temp_order ={
									id_MH: option.id,
									id_nhom: id_nhom,
									name_nhom: nameNhomMH,
									nameMatHang: selectedOption,
									action: "import_MH_to_nhom"
								}
								let res = await instance.post('/nhomMH', temp_order);
								// console.log(res.data)
								if(res.data){
									let id_nhomMH = res.data.id_nhomMH
									let html=`<div class='a${option.id}' id="${id_nhomMH}" style="display: inline-block;background: #A0522D;border-radius: 3px; margin: 5px 5px;padding:0 10px; flex-flow: wrap;">
											<span class="name" style="margin-right: 10px;" >${selectedOption}</span>
											<span class="close" style="cursor: pointer;z-index:100;" id='${option.id}' onclick="clear_el(this);">X</span>
										</div>`
									selectBtn.insertAdjacentHTML("afterbegin",html)
								}
								
								
							});
						});
						/*-------------- event search change input--------- */
						selectBtn.querySelector(".selected-lang .contains .search_MH").addEventListener("keyup", (event) => {
							// console.log(event.target.value, 'ddsfljls')
							let item_search = event.target.value;
							Array.prototype.forEach.call(options, function(el) {
								if (el.textContent.trim().indexOf(item_search) > -1)
								  el.style.display = 'block';
								else el.style.display = 'none';
							  });
							
						});
				
						selectBtn.addEventListener("click", () => {
							optionMenu.classList.toggle("active")
						});
					}
				}
				dropbox_chonmau_todolist();
				function delobj(obj,val){
					for (let index = 0; index < obj.length; index++) {
						const element = obj[index];
						for (x in element) {
							// console.log(element[x], val)
							if(element[x] == val)
							obj.splice(index,1)	
						}						
					}
					return obj
				}
				clickFlag =0;


			}else if(dict=='del'){
				html +=  `
				<a class="close_popup" onclick='closePopup_gop_y()'>X</a>
				<p class="title_popup">Xác Nhận</p>
				<hr style="margin: .3rem 0rem 0rem 0rem; border: 1px solid rgba(255, 255, 255, 0.3);outline: none !important;"><br>
				<div>
					<p style='color: var(--white_text); font-size: 18px;'>Bạn có muốn xóa Nhóm <strong style='color: yellow; font-weight:600;'>${nameNhomMH}</strong> ?</p>
				</div>
				<button style='background: red;' type="button" class="button_popup" titles=${title} item="save_del">XÁC NHẬN</button>`
	
				const show_contain = document.querySelector('#popup')
				show_contain.innerHTML = html;
				/*------------------- func save ----------------------- */
				let btn_luu = document.querySelector('.button_popup')
				btn_luu.addEventListener('click',function (evt) {
					save_popup(this, selectObject)
				});
	
				// show popup
				clickFlag = 0;
			}else if(dict=='edit'){
				html+=`	<a class="close_popup" onclick='closePopup_gop_y()'>X</a>
					<p class="title_popup" id="${id_nhom}">Chỉnh Sửa Nhóm Mặt Hàng <a style="color: var(--yellow); font-weight:600;">${nameNhomMH}</a></p>
					<hr style="margin: 10px -30px 0rem -30px; border: 1px solid rgba(255, 255, 255, 0.2);outline: none !important;"><br>
					<div class="input-field">
						<input type="text" required spellcheck="false" class="popup-input valid nameMH" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);"> 
						<label>Nhập tên nhóm mặt hàng</label>
						<i class="ti-check"></i>
						<i class="ti-alert"></i>
					</div>

					<div class="input-field">
						<input type="text" required spellcheck="false" class="popup-input valid mota_nhomMH" id="number-input" onkeyup="validateValue_dropbox_green(event)" onfocusout="validateValue_dropbox_green(event);"> 
						<label>Nhập mô tả nhóm mặt hàng</label>
						<i class="ti-check"></i>
						<i class="ti-alert"></i>
					</div>

					<div class="checkbox-toggle" style="padding-bottom: 20px;">
						<label for="checkbox1" class="toggle_checkbox"> 
							<input type="checkbox" id="checkbox1" class="toggle_input popup-input label_nhom" hidden=""/>
							<div class="toggle_bar">
								<div class="toggle_spin"></div>
							</div>
							<p>Hiển thị nhãn trên mặt hàng</p>
						</label>
					</div>

					<div class="input-field not_show" id='hidde'>
						<input type="text" required spellcheck="false" class="popup-input tennhan_nhomMH" id="number-input"  onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);"> 
						<label>Nhập tên nhãn</label>
						<i class="ti-check"></i>
						<i class="ti-alert"></i>
					</div>

					<div class="lang-menu not_show" id='hidde'>
							<div class="selected-lang valid">
								<a class="mathang lang-option"></a>
								<span class="sBtn-text">Không chọn màu</span>
								<i class="separator"></i>
								<span class='sBtn-close'>X</span>
								<i class="ti-angle-down"></i>
							</div>
							
							<ul>`		
				color_list.forEach(function(element, index){
					let name = element.name
					let mau = element.color
					html+=`	<li class="option">
								<span class="mathang" style="background-color: ${mau};"></span>
								<a href="#" class="de option-text">${name}</a>
							</li>`
				});
	
				html+=	`	</ul>
							<i class="ti-check"></i>
							<i class="ti-alert"></i>
					</div>
					
					<div class="checkbox-toggle" style="padding-bottom: 20px;">
						<label for="checkbox2" class="toggle_checkbox"> 
							<input type="checkbox" id="checkbox2" class="toggle_input popup-input show_nhom" hidden=""/>
							<div class="toggle_bar">
								<div class="toggle_spin"></div>
							</div>
							<p>Hiển thị trên Menu Quick Link</p>
						</label>
					</div>
					<button type="button" class="button_popup" titles='DM_NHOMMATHANG' item="save_edit">Lưu</button>`
				const show_contain = document.querySelector('#popup')
				show_contain.innerHTML = html;
				dropbox_chonmau();
				/*------------------- func save ----------------------- */
				let btn_luu = document.querySelector('.button_popup')
				btn_luu.addEventListener('click',function (evt) {
					/*----- check invalid ---- */
					let invalid = this.parentNode.querySelectorAll('.invalid')
					if (invalid.length==0){
						save_popup(this, selectObject)
					}else{
						invalid.forEach(element => {
							const elem_check = element.parentNode.querySelector('.ti-check')
							css(elem_check, {
								'display': 'none',
								'color': 'var(--green)'
							})
							const elem_alert = element.parentNode.querySelector('.ti-alert')
							css(elem_alert, {
								'display': 'block',
								'color': 'red'
							})
							element.style.borderColor = 'red';
						})
					}
					/*----- check valid ---- */
					let valid = btn_luu.parentNode.querySelectorAll('.valid')
					valid.forEach(element => {
						const elem_check = element.parentNode.querySelector('.ti-check')
						css(elem_check, {
							'display': 'block',
							'color': 'var(--green)'
						})
						const elem_alert = element.parentNode.querySelector('.ti-alert')
							css(elem_alert, {
								'display': 'none',
								'color': 'red'
							})
						element.style.borderColor = 'green';
					});
				});
				/*------------------ func checkbox show ------------- */
				let checkbox = document.querySelector('#checkbox1')
				checkbox.addEventListener('change',function (evt) {
					let hide = document.querySelectorAll('#hidde')
					hide.forEach(element => {
						element.classList.toggle('not_show')
						element.querySelector('.tennhan_nhomMH') ? element.querySelector('.tennhan_nhomMH').classList.toggle('invalid') : null
						element.querySelector('.tennhan_nhomMH') ? element.querySelector('.tennhan_nhomMH').classList.remove('valid') : null
						if (element.classList.contains('not_show')){
							document.querySelector('.lang-menu .sBtn-text').innerHTML = ''
							document.querySelector('.tennhan_nhomMH').value=''
							document.querySelector('.tennhan_nhomMH').classList.remove('invalid')
						}
					});
				});
				// show popup
				clickFlag = 0;
				/*----------- show value on popup ------ */
				let temp_order = {
					id_nhom: id_nhom,
					action: 'get_nhom',
				}
				let res= await instance.post('/nhomMH', temp_order);
				if(res){
					let value = res.data[0]
					console.table(value)
					let Mau = await get_color(color_list, value.color_nhom)
					console.log(Mau)
					if (Mau.color != 'grey'){
						let hide = document.querySelectorAll('#hidde')
						hide.forEach(element => {
							element.classList.toggle('not_show')
							element.querySelector('.tennhan_nhomMH') ? element.querySelector('.tennhan_nhomMH').classList.remove('invalid') : null
							element.querySelector('.tennhan_nhomMH') ? element.querySelector('.tennhan_nhomMH').classList.add('valid') : null
							if (element.classList.contains('not_show')){
								document.querySelector('.lang-menu .sBtn-text').innerHTML = ''
								document.querySelector('.tennhan_nhomMH').value=''
								document.querySelector('.tennhan_nhomMH').classList.remove('invalid')
								// document.querySelector('.tennhan_nhomMH').classList.add('valid')
							}
						});
						document.querySelector('.lang-menu .sBtn-text').innerText = Mau.name
						document.querySelector('.selected-lang .mathang').style.background = Mau.color
					}
					value.mota ==''? value.mota = 'Không có mô tả' : value.mota
					document.querySelector('.popup-input.nameMH').value = value.name
					document.querySelector('.popup-input.nameMH').classList.remove('invalid')
					document.querySelector('.popup-input.mota_nhomMH').value = value.mota
					document.querySelector('.popup-input.show_nhom').checked = (value.show).trim()=="checked"? true : false 
					document.querySelector('.popup-input.label_nhom').checked= (value.label).trim()=="checked"? true : false 
					document.querySelector('.popup-input.tennhan_nhomMH').value = value.name_label
					
				}
			}
		break;
		case "DM_KHUYENMAI":
			/*---- set kich thước popup ----- */
			html =  `<style>
						.popup .popup-input, .selected-lang, .lang-menu, .popup .button_popup {
							border-radius: 5px;
							min-height:50px;
						}
						.popup{
							width: 700px;
						}
					</style>`
			var name_row, id;
			if(selectObject){
				const row = selectObject.parentNode.parentNode.parentNode
				name_row = titleCase(row.children[0].innerText)
				id = row.id
			}
			if(dict=='create'){
				html+=`	<a class="close_popup" onclick='closePopup_gop_y()'>X</a>
					<p class="title_popup">Thêm Khuyến Mại</p>
					<hr style="margin: 10px -30px 0rem -30px; border: 1px solid rgba(255, 255, 255, 0.2);outline: none !important;"><br>
					
					
					<div class="input-field">
						<input type="text" required spellcheck="false" class="popup-input nameKM invalid" id="number-input" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);"> 
						<label>Chương Trình Khuyến Mại</label>
						<i class="ti-check"></i>
						<i class="ti-alert"></i>
					</div>

					<div class="lang-menu" style="margin-bottom:10px;">
						<div class="selected-lang invalid check">
							<a class="mathang lang-option"></a>
							<span class="sBtn-text">Vui lòng chọn Nhóm</span>
							<i class="separator"></i>
							<span class='sBtn-close'>X</span>
							<i class="ti-angle-down"></i>
						</div>
						<ul>`
				let temp_order = {action: 'get_nhom'}
				let nhom_MH = await instance.post('/nhomMH', temp_order);
				const sortedList = nhom_MH.data.sort((a, b) => a.name.localeCompare(b.name));
				sortedList.forEach(function(element, index){
					const name = element.name;
					const id_nhom = element.id_nhom;
					html+=`		<li class="option" id="${id_nhom}">
								<span class="mathang" style="background-color: grey;"></span>
								<a href="#" class="de option-text">${name}</a>
							</li>`
				});

				html+=`	</ul>
						<i class="ti-check"></i>
						<i class="ti-alert"></i>
					</div>

					<div class="dropbox_old">
						<select class="popup-input loaiKM valid " onchange="validateValue_str(event);" onfocusout="validateValue_str(event);">
							<option value='0'>Chọn loại giảm giá</option>`
						temp_order = {action: 'getKM'}
						let nhom = await instance.post('/khuyenmai', temp_order);
						nhom.data.forEach(function(element, index){
							let id = element.id;
							let nameKM = element.nameKM;
							html+=`<option value='${id}'>${nameKM}</option>`
						});
							
				html+=  `</select>
						<i class="ti-angle-down"></i>
						<i class="ti-check"></i>
						<i class="ti-alert"></i>
					</div>
					
					<div class="input-field">
						<input type="text" required spellcheck="false" class="popup-input phantramKM invalid" id="number-input" onkeypress="validata_number_new(event)" onkeyup="validata_number_new(event)" onfocusout="validata_number_new(event);"> 
						<label>Phần Trăm Khuyến Mại</label>
						<i class="ti-check"></i>
						<i class="ti-alert"></i>
					</div>
					
					<div class="input-field date-form">
						<label>Từ Ngày</label>
						<input class="popup-input date_begin invalid" type="datetime-local" id="myDate" style="width: 100%; margin:0;" onchange="validateValue_str(event);">
						<i class="ti-check"></i>
						<i class="ti-alert"></i>
					</div>

					<div class="input-field date-form">
						<label>Đến Ngày</label>
						<input class="popup-input date_end invalid" type="datetime-local" id="myDate" style="width: 100%; margin:0;" onchange="validateValue_str(event);">
						<i class="ti-check"></i>
						<i class="ti-alert"></i>
					</div>
					
					<button type="button" class="button_popup" titles='DM_KHUYENMAI' item="save_new">Lưu</button>`
				const show_contain = document.querySelector('#popup')
				show_contain.innerHTML = html;
				// show popup
				clickFlag = 0;
				dropbox_chonmau();
				/*------------------- func save ----------------------- */
				let btn_luu = document.querySelector('.button_popup')
				btn_luu.addEventListener('click',function (evt) {
					/*----- check invalid ---- */
					let invalid = this.parentNode.querySelectorAll('.invalid')
					if (invalid.length==0){
						save_popup(this, selectObject)
					}else{
						invalid.forEach(element => {
							const elem_check = element.parentNode.querySelector('.ti-check')
							css(elem_check, {
								'display': 'none',
								'color': 'var(--green)'
							})
							const elem_alert = element.parentNode.querySelector('.ti-alert')
							css(elem_alert, {
								'display': 'block',
								'color': 'red'
							})
							element.style.borderColor = 'red';
						})
					}
					/*----- check valid ---- */
					let valid = btn_luu.parentNode.querySelectorAll('.valid')
					valid.forEach(element => {
						const elem_check = element.parentNode.querySelector('.ti-check')
						css(elem_check, {
							'display': 'block',
							'color': 'var(--green)'
						})
						const elem_alert = element.parentNode.querySelector('.ti-alert')
							css(elem_alert, {
								'display': 'none',
								'color': 'red'
							})
						element.style.borderColor = 'green';
					});
				});

				/*---------- func event date ---------------*/
				flatpickr("#myDate", {
					enableTime: true,
					dateFormat: "d/m/Y H:i:S",
				});
				
				
			}else if(dict=='add'){
			}else if(dict=='del'){
				html +=  `
						<a class="close_popup" onclick='closePopup_gop_y()'>X</a>
						<p class="title_popup">Xác Nhận</p>
						<hr style="margin: .3rem 0rem 0rem 0rem; border: 1px solid rgba(255, 255, 255, 0.3);outline: none !important;"><br>
						<div>
							<p style='color: var(--white_text); font-size: 18px;'>Bạn có muốn xóa Khuyến Mãi <strong style='color: yellow; font-weight:600;'>${name}</strong> ?</p>
						</div>
						<button style='background: red;' type="button" class="button_popup" titles=${title} item="save_del">XÁC NHẬN</button>`
	
				const show_contain = document.querySelector('#popup')
				show_contain.innerHTML = html;
				/*------------------- func save ----------------------- */
				let btn_luu = document.querySelector('.button_popup')
				btn_luu.addEventListener('click',function (evt) {
					save_popup(this, selectObject)
				});
	
				// show popup
				clickFlag = 0;
			}else if(dict=='edit'){
				html+=`	<a class="close_popup" onclick='closePopup_gop_y()'>X</a>
					<p class="title_popup" id="${id}">Chỉnh Sửa Khuyến Mại <a style="color: var(--yellow); font-weight:600;">${name_row}</a></p>
					<hr style="margin: 10px -30px 0rem -30px; border: 1px solid rgba(255, 255, 255, 0.2);outline: none !important;"><br>
					
					
					<div class="input-field">
						<input type="text" required spellcheck="false" class="popup-input nameKM valid" id="number-input" onkeyup="validateValue_str(event);" onfocusout="validateValue_str(event);"> 
						<label>Chương Trình Khuyến Mại</label>
						<i class="ti-check"></i>
						<i class="ti-alert"></i>
					</div>

					<div class="lang-menu" style="margin-bottom:10px;">
						<div class="selected-lang valid check">
							<a class="mathang lang-option"></a>
							<span class="sBtn-text">Vui lòng chọn Nhóm</span>
							<i class="separator"></i>
							<span class='sBtn-close'>X</span>
							<i class="ti-angle-down"></i>
						</div>
						<ul>`
				let temp_order = {action: 'get_nhom'}
				let nhom_MH = await instance.post('/nhomMH', temp_order);
				const sortedList = nhom_MH.data.sort((a, b) => a.name.localeCompare(b.name));
				sortedList.forEach(function(element, index){
					const name = element.name;
					const id_nhom = element.id_nhom;
					html+=`		<li class="option" id="${id_nhom}">
								<span class="mathang" style="background-color: grey;"></span>
								<a href="#" class="de option-text">${name}</a>
							</li>`
				});

				html+=`	</ul>
						<i class="ti-check"></i>
						<i class="ti-alert"></i>
					</div>

					<div class="dropbox_old">
						<select class="popup-input loaiKM valid " onchange="validateValue_str(event);" onfocusout="validateValue_str(event);">
							<option value='0'>Chọn loại giảm giá</option>`
				temp_order = {action: 'getKM'}
				let nhom = await instance.post('/khuyenmai', temp_order);
				nhom.data.forEach(function(element, index){
					let id = element.id;
					let nameKM = element.nameKM;
					html+=`<option value='${id}'>${nameKM}</option>`
				});
							
				html+=  `</select>
						<i class="ti-angle-down"></i>
						<i class="ti-check"></i>
						<i class="ti-alert"></i>
					</div>
					
					<div class="input-field">
						<input type="text" required spellcheck="false" class="popup-input phantramKM valid" id="number-input" onkeypress="validata_number_new(event)" onkeyup="validata_number_new(event)" onfocusout="validata_number_new(event);"> 
						<label>Phần Trăm Khuyến Mại</label>
						<i class="ti-check"></i>
						<i class="ti-alert"></i>
					</div>
					
					<div class="input-field date-form">
						<label>Từ Ngày</label>
						<input class="popup-input date_begin valid" type="datetime-local" id="myDate" style="width: 100%; margin:0;" onchange="validateValue_str(event);" onfocusout="validateValue_str(event);">
						<i class="ti-check"></i>
						<i class="ti-alert"></i>
					</div>

					<div class="input-field date-form">
						<label>Đến Ngày</label>
						<input class="popup-input date_end valid" type="datetime-local" id="myDate" style="width: 100%; margin:0;" onchange="validateValue_str(event);" onfocusout="validateValue_str(event);">
						<i class="ti-check"></i>
						<i class="ti-alert"></i>
					</div>
					
					<button type="button" class="button_popup" titles='DM_KHUYENMAI' item="save_edit">Lưu</button>`
				const show_contain = document.querySelector('#popup')
				show_contain.innerHTML = html;
				// show popup
				clickFlag = 0;
				dropbox_chonmau();
				/*------------------- func save ----------------------- */
				let btn_luu = document.querySelector('.button_popup')
				btn_luu.addEventListener('click',function (evt) {
					/*----- check invalid ---- */
					let invalid = this.parentNode.querySelectorAll('.invalid')
					if (invalid.length==0){
						save_popup(this, selectObject)
					}else{
						invalid.forEach(element => {
							const elem_check = element.parentNode.querySelector('.ti-check')
							css(elem_check, {
								'display': 'none',
								'color': 'var(--green)'
							})
							const elem_alert = element.parentNode.querySelector('.ti-alert')
							css(elem_alert, {
								'display': 'block',
								'color': 'red'
							})
							element.style.borderColor = 'red';
						})
					}
					/*----- check valid ---- */
					let valid = btn_luu.parentNode.querySelectorAll('.valid')
					valid.forEach(element => {
						const elem_check = element.parentNode.querySelector('.ti-check')
						css(elem_check, {
							'display': 'block',
							'color': 'var(--green)'
						})
						const elem_alert = element.parentNode.querySelector('.ti-alert')
							css(elem_alert, {
								'display': 'none',
								'color': 'red'
							})
						element.style.borderColor = 'green';
					});
				});

				/*---------- func event date ---------------*/
				flatpickr("#myDate", {
					enableTime: true,
					dateFormat: "d/m/Y H:i:S",
				});

				/*----------- show value on popup ------ */
				temp_order = {
					id_khuyenmai: id,
					name_KM: name_row,
					action: 'get_KM',
				}
				let res= await instance.post('/khuyenmai', temp_order);
				if(res){
					let value = res.data[0]
					console.table(res.data)
					const el_parent = document.querySelector('.popup')
					el_parent.querySelector('.nameKM').value = value.name_KM
					el_parent.querySelector('.sBtn-text').innerText = value.name
					el_parent.querySelector('.sBtn-text').id = value.id_nhom
					el_parent.querySelector('.loaiKM').value = value.id_loaiKM
					el_parent.querySelector('.phantramKM').value = value.phantramKM
					el_parent.querySelector('.date_begin').value = convert_dateToVN(value.date_begin)
					el_parent.querySelector('.date_end').value = convert_dateToVN(value.date_end)
					/*show btn clear of input */
					el_parent.querySelector('.sBtn-close').classList.add("active");
					
				}
			}
		break;
		case "DM_TAOMA":
			/*---- set kich thước popup ----- */
			html =  `<style>
						.popup .popup-input, .selected-lang, .lang-menu, .popup .button_popup {
							border-radius: 5px;
							min-height:50px;
						}
						.popup{
							width: 700px;
						}
					</style>`
			if(selectObject){
				const row = selectObject.parentNode.parentNode.parentNode
				name_row = titleCase(row.children[0].innerText)
				id = row.id
				// console.log(name_row, id)
			}
			if(dict=='create'){
				let id_KM = document.querySelector('.thietlapca .nut_dropdown').id
				html+=`	<a class="close_popup" onclick='closePopup_gop_y()'>X</a>
				<p class="title_popup">Tạo Mã</p>
				<hr style="margin: 10px -30px 0rem -30px; border: 1px solid rgba(255, 255, 255, 0.2);outline: none !important;"><br>
				
				<div class="input-field">
					<input type="text" required spellcheck="false" class="popup-input maKM" id="number-input" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);"> 
					<label>Nhập Mã</label>
					<i class="ti-check"></i>
					<i class="ti-alert"></i>
				</div>
				<div class="input-field">
					<input type="text" required spellcheck="false" class="popup-input solansudung" id="number-input" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);"> 
					<label>Nhập số lần sử dụng</label>
					<i class="ti-check"></i>
					<i class="ti-alert"></i>
				</div>
				<div class="input-field">
					<input type="text" required spellcheck="false" class="popup-input tksudung" id="number-input" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);"> 
					<label>Số Lần Sử Dụng Cho Mỗi Tài Khoản</label>
					<i class="ti-check"></i>
					<i class="ti-alert"></i>
				</div>

				<button type="button" class="button_popup" titles=${title} id="${id_KM}" item="save_new">Lưu</button>`
				const show_contain = document.querySelector('#popup')
				show_contain.innerHTML = html;

				// show popup
				clickFlag = 0;
				/*------------------- func save ----------------------- */
				let btn_luu = document.querySelector('.button_popup')
				btn_luu.addEventListener('click',function (evt) {
					/*----- check invalid ---- */
					let invalid = this.parentNode.querySelectorAll('.invalid')
					if (invalid.length==0){
						save_popup(this, selectObject)
					}else{
						invalid.forEach(element => {
							const elem_check = element.parentNode.querySelector('.ti-check')
							css(elem_check, {
								'display': 'none',
								'color': 'var(--green)'
							})
							const elem_alert = element.parentNode.querySelector('.ti-alert')
							css(elem_alert, {
								'display': 'block',
								'color': 'red'
							})
							element.style.borderColor = 'red';
						})
					}
					/*----- check valid ---- */
					let valid = btn_luu.parentNode.querySelectorAll('.valid')
					valid.forEach(element => {
						const elem_check = element.parentNode.querySelector('.ti-check')
						css(elem_check, {
							'display': 'block',
							'color': 'var(--green)'
						})
						const elem_alert = element.parentNode.querySelector('.ti-alert')
							css(elem_alert, {
								'display': 'none',
								'color': 'red'
							})
						element.style.borderColor = 'green';
					});
				});
			}else if(dict=='edit'){
				let id_KM = document.querySelector('.thietlapca .nut_dropdown').id
				html+=`	<a class="close_popup" onclick='closePopup_gop_y()'>X</a>
				<p class="title_popup" id="${id}">Chỉnh Sửa Mã KM <a style="color: var(--yellow); font-weight:600;">${name_row}</a></p>
				<hr style="margin: 10px -30px 0rem -30px; border: 1px solid rgba(255, 255, 255, 0.2);outline: none !important;"><br>
				
				<div class="input-field">
					<input type="text" required spellcheck="false" class="popup-input maKM" id="number-input" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);"> 
					<label>Nhập Mã</label>
					<i class="ti-check"></i>
					<i class="ti-alert"></i>
				</div>
				<div class="input-field">
					<input type="text" required spellcheck="false" class="popup-input solansudung" id="number-input" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);"> 
					<label>Nhập số lần sử dụng</label>
					<i class="ti-check"></i>
					<i class="ti-alert"></i>
				</div>
				<div class="input-field">
					<input type="text" required spellcheck="false" class="popup-input tksudung" id="number-input" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);"> 
					<label>Số Lần Sử Dụng Cho Mỗi Tài Khoản</label>
					<i class="ti-check"></i>
					<i class="ti-alert"></i>
				</div>

				<button type="button" class="button_popup" titles=${title} id="${id_KM}" item="save_edit">Lưu</button>`
				const show_contain = document.querySelector('#popup')
				show_contain.innerHTML = html;
				/*----------- show value on popup ------ */
				temp_order = {
					id_KM: id_KM,
					id_magiam: id,
					action: 'get_Magiam'
				}
				let res= await instance.post('/magiamgia', temp_order);
				if(res){
					let value = res.data[0]
					const el_parent = document.querySelector('.popup')
					el_parent.querySelector('.maKM').value = value.maKM
					el_parent.querySelector('.solansudung').value = value.solansudung
					el_parent.querySelector('.tksudung').value= value.solantkdung
				}

				// show popup
				clickFlag = 0;
				/*------------------- func save ----------------------- */
				let btn_luu = document.querySelector('.button_popup')
				btn_luu.addEventListener('click',function (evt) {
					/*----- check invalid ---- */
					let invalid = this.parentNode.querySelectorAll('.invalid')
					if (invalid.length==0){
						save_popup(this, selectObject)
					}else{
						invalid.forEach(element => {
							const elem_check = element.parentNode.querySelector('.ti-check')
							css(elem_check, {
								'display': 'none',
								'color': 'var(--green)'
							})
							const elem_alert = element.parentNode.querySelector('.ti-alert')
							css(elem_alert, {
								'display': 'block',
								'color': 'red'
							})
							element.style.borderColor = 'red';
						})
					}
					/*----- check valid ---- */
					let valid = btn_luu.parentNode.querySelectorAll('.valid')
					valid.forEach(element => {
						const elem_check = element.parentNode.querySelector('.ti-check')
						css(elem_check, {
							'display': 'block',
							'color': 'var(--green)'
						})
						const elem_alert = element.parentNode.querySelector('.ti-alert')
							css(elem_alert, {
								'display': 'none',
								'color': 'red'
							})
						element.style.borderColor = 'green';
					});
				});
			}
		break;
		case "DM_MENUDICHVU":
		break;
		case "DM_MENUGAME":
		break;
		case "DM_BANGTIN":
		break;
		case "DM_TUYCHINH":
		break;
	};
	
	/*-------------------- set width el ---------------======-- */
	let el = document.querySelectorAll('.dropbox_old')
	el.forEach(element => {
		element.style.width = '100%';
	});
	document.querySelector('.overlay').classList.add('showoverlay');
	document.querySelector('.containerpopup  .popup').classList.add('open-popup');

}
/* new save popup */
async function save_popup(e, element_row){
	const title = e.getAttribute('titles')
	const item = e.getAttribute('item')
	const el_parent = e.parentNode
	/*---------- check validate --------------- */
	var notifier = new Notifier({
		position: 'top-left',
		direction: 'top',
	});
	switch (title) {
		case "DM_XINCHAO":
		break;
		case "DM_MAYTRAM":
		break;
		case "DM_BIA":
		break;
		case "DM_DONHANG":
			if (item=="HUY"){
				popup.classList.remove("open-popup");
				const textpopup = document.getElementsByClassName('popup-input')
				document.querySelector('.overlay').classList.remove('showoverlay');
				//================== func hủy đơn ===================//
				var e = element_row;
				console.log(e)
				const id = e.parentNode.parentNode.id
				const date_order = e.parentNode.parentNode.children[0].textContent
				const custom_order = e.parentNode.parentNode.children[1].textContent
				const mathang_order = e.parentNode.parentNode.children[2].querySelector('.nameMH').innerText
				const sl_order = e.parentNode.parentNode.children[3].textContent
				let contain_action = e.previousElementSibling.textContent
				// element_temp = e;
				var id_ca = localStorage.getItem("id_ca")

				let temp_order = {
					id: id,
					id_ca: id_ca,
					date: date_order,
					custom: custom_order,
					mathang: mathang_order,
					Huy_Don: '1',
					action: 'HUY',
					Thaotac: `${textpopup[0].value} (${contain_action})`,
					nv_order: user_login
				}
				const res = await instance.post('/cashier', temp_order);
				
				e.innerHTML = `${textpopup[0].value} (${contain_action})`
				e.style.background = 'None';
				e.style.border = 'none';
				e.style.color = 'red';
				e.disabled = true;
				e.style.width = '100%';
				e.style.textAlign = 'center';

				// hide button chap nhan hủy
				e.previousElementSibling.style.visibility = 'hidden'
				e.previousElementSibling.style.display = 'none'

				// show name thu ngan	
				let show_nvthungan = e.parentNode.children[3]
				show_nvthungan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> ${user_login}`
				show_nvthungan.style.visibility = 'visible';
				show_nvthungan.style.display = '';

				/*--------- hidden print ------- */
				let id_print = '#'+e.previousElementSibling.id+'show'
				let show_print = document.querySelector(id_print)
				//check đã thu tiền hết hoá đơn thì ẩn máy in
				let count_thutien = document.querySelector(`tr[${e.previousElementSibling.id}]`)
				let count = Number(count_thutien.getAttribute(e.previousElementSibling.id))
				// console.log(count)
				if (count <= 1){
					if (show_print == null){
						show_print = e.parentNode.nextSibling.children[0]
					}
					show_print.style.display = '';
					show_print.style.visibility = 'hidden';
				}else{count_thutien.setAttribute(e.previousElementSibling.id, count-1)}				

				/*=== change thanh toan ==== */
				const rowcur = e.parentNode.parentNode.rowIndex;
				var row_firts_of_page = numPerPage*Math.floor(rowcur/numPerPage)
				const TT_cur = Number(e.parentNode.parentNode.children[4].innerHTML.replaceAll(/\D+/g, ''))
				const row_src = e.parentNode.parentNode.children[0].innerHTML + e.parentNode.parentNode.children[1].innerHTML
				var countt = 0;
				for (var items of document.querySelectorAll('tr')) {
					const row_find = items.children[0].innerHTML + items.children[1].innerHTML
					if (row_src == row_find){
						var thanhtoan = items.children[7].innerHTML.replaceAll(/\D+/g, '')
						thanhtoan-=TT_cur
						items.children[7].innerHTML = thanhtoan.format(0, 3, '.', ',') + ' <span style="color: yellow;"> ₫</span>'
						if (countt >= row_firts_of_page +1){
							items.children[7].innerHTML = thanhtoan.format(0, 3, '.', ',') + ' <span style="color: yellow;"> ₫</span>'
							break;
						}
					}
					countt++;
				}
				textpopup[0].value='';
			}else if(item=="CHAPNHAN"){
				const id = e.parentNode.parentNode.id
				const date_order = e.parentNode.parentNode.children[0].textContent
				const custom_order = e.parentNode.parentNode.children[1].textContent
				const mathang_order = e.parentNode.parentNode.children[2].querySelector('.nameMH').innerText
				const sl_order = e.parentNode.parentNode.children[3].textContent

				// ws.send("Send.");
				e.innerHTML = 'THU TIỀN';
				e.style.background = "orange";
				e.style.color = 'black';
				// show name thu ngan
				let show_nvthungan = e.parentNode.children[3]
				show_nvthungan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> ${user_login}`
				show_nvthungan.style.visibility = 'visible';
				show_nvthungan.style.display = ''

				let id_print = '#'+e.id+'show'
				let show_print = document.querySelector(id_print)
				// console.log(show_print)
				if (show_print == null){
					show_print = e.parentNode.nextSibling.children[0]
				}
				show_print.style.display = 'block';
				show_print.style.visibility = 'visible';

				var id_ca = localStorage.getItem("id_ca")
				let temp_order = {
					id: id,
					id_ca: id_ca,
					date: date_order,
					custom: custom_order,
					mathang: mathang_order,
					Thaotac: 'THU TIỀN',
					action: 'THUTIEN',
					nv_order: user_login
				}
				let res = await instance.post('/cashier', temp_order);
				if(res){
					e.setAttribute('item', 'THUTIEN')
				}

			}else if(item=="THUTIEN"){
				const id = e.parentNode.parentNode.id
				const date_order = e.parentNode.parentNode.children[0].textContent
				const custom_order = e.parentNode.parentNode.children[1].textContent
				const mathang_order = e.parentNode.parentNode.children[2].querySelector('.nameMH').innerText
				const sl_order = e.parentNode.parentNode.children[3].textContent

				e.innerHTML = 'HOÀN THÀNH';
				e.style.background = 'None';
				e.style.width = '125px';
				e.style.border = '1px solid green';
				e.style.color = 'green';
				e.nextSibling.style.visibility = 'hidden'
				e.nextSibling.style.display = 'none'
				let show_nvthungan = e.parentNode.children[3]
				show_nvthungan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> ${user_login}`
				e.disabled = true;
				
				let id_print = '#'+e.id+'show'
				let show_print = document.querySelector(id_print)
				
				//check đã thu tiền hết hoá đơn thì ẩn máy in
				let count_thutien = document.querySelector(`tr[${e.id}]`)
				let count = Number(count_thutien.getAttribute(e.id))
				// console.log(count)
				if (count <= 1){
					if (show_print == null){
						show_print = e.parentNode.nextSibling.children[0]
					}
					show_print.style.display = '';
					show_print.style.visibility = 'hidden';
				}else{count_thutien.setAttribute(e.id, count-1)}

				//check data gưi ve server
				var id_ca = localStorage.getItem("id_ca")
				let temp_order = {
					id: id,
					id_ca: id_ca,
					date: date_order,
					custom: custom_order,
					mathang: mathang_order,
					Thaotac: 'HOÀN THÀNH',
					action: 'HOANTHANH',
					nv_order: user_login
				}
				let res = await instance.post('/cashier', temp_order);
				if(res){
					// console.log(res.data)
					e.setAttribute('item', 'HOANTHANH')
					res = res.data.DT[0]
					let DT_dichvu = res.DT_dichvu
					document.querySelector('.DTDV').innerHTML = money(DT_dichvu)
				}
				
			}else if(item=="PRINT"){
				console.log('print')
				const id = e.parentNode.parentNode.id
				const date_order = e.parentNode.parentNode.children[0].textContent
				const custom_order = e.parentNode.parentNode.children[1].textContent
				const mathang_order = e.parentNode.parentNode.children[2].querySelector('.nameMH').innerText
				const sl_order = e.parentNode.parentNode.children[3].textContent
				e.style.color = "green";
				e.style.border = '1px solid green';
				let temp_order = {
					id: id,
					date: date_order,
					custom: custom_order,
					mathang: mathang_order,
					action: 'IN',
					thaotac: 'IN HÓA ĐƠN',
					nv_order: user_login
				}
				const res = await instance.post('/cashier', temp_order);
				
			}
		break;
		case "DM_THONGKE":
		break;
		case "DM_BAOCAO":
		break;
		case "DM_COBAN":
		break;
		case "DM_MAYIN":
		break;
		case "DM_NHANVIEN":
		break;
		case "DM_DANHMUC":
			if(item=='save_new'){
				let ten_DM = document.querySelector('.popup-input.nameDM').value
				let mota_DM = document.querySelector('.popup-input.motaDM').value
				let color = await digital(document.querySelector('.lang-menu .sBtn-text').innerText)
				let DMcha = document.querySelector('.popup-input.DMcha').value
				let mauDM = document.querySelector('.sBtn-text').innerText
				let DMtach = (document.querySelector('.popup-input.DMtach').checked?'checked':'unchecked')
				let mobanDM = (document.querySelector('.popup-input.mobanDM').checked?'checked':'unchecked')
				var table = document.getElementById("table_order");
				let tbody = table.querySelector('tbody')
				var lastRowIndex = table.rows.length-1;
				/*--------- remove row table ---------- */
				const rows = table.rows;
				for (let i = rows.length - 1; i > 0; i--) {
					rows[i].remove();
				}
				// var table = document.getElementById("table_order");
				if (mota_DM==''){mota_DM = 'Không mô tả'}				
				let temp_order = {
					id: '',
					name: ten_DM,
					color: color,
					mota: mota_DM,
					DMcha: DMcha,
					DTkhac: DMtach,
					mobanDM: mobanDM,
					action: 'newDM',
				}
				let res= await instance.post('/danhmuc', temp_order);
				if (res.data){
					var notification = notifier.notify(res.data.msg, `${res.data.content}`);
					notification.push();
					call_popup('DM_DANHMUC','create')
				}
			
				temp_order = {action: 'getDM'}
				let DM = await instance.post('/danhmuc', temp_order);
				/*-------------- sort Alphabetically xắp sếp ----------- */
				const sortedList = DM.data.reverse()
				let html = await render_rows(sortedList, 'DM_DANHMUC')
				tbody.insertAdjacentHTML("afterbegin",html)
			
				const main = document.getElementById('main');
				let btn = main.querySelectorAll('i')
				btn.forEach((el, i) => {
					el.addEventListener('click',function (evt) {
						xuly_before_call_popup(el);
					});
				});

				/*----------- func moban ------------ */
				let moban = main.querySelectorAll('.toggle_input')
				moban.forEach((el, i) => {
					el.addEventListener('change',async function (evt) {
						let id = el.id.replace('a','')
						let temp_order = {
							id: id,
							mobanDM: (el.checked?'checked':'unchecked'),
							action: 'mobanDM',
						}
						let mobanDM = await instance.post('/danhmuc', temp_order);
					});
				});
			
			
			}else if(item=='save_add'){
			}else if(item=='save_del'){
				const row = element_row.parentNode.parentNode.parentNode
				let nameDM = titleCase(row.children[0].innerText)
				let del_row = row.rowIndex
				// document.getElementById("table_order").deleteRow(del_row);
				let temp_order = {
					id: row.id,
					name: nameDM,
					action: 'delDM',
				}
				let res = await instance.post('/danhmuc', temp_order);
				if(res.data){
					var notification = notifier.notify(res.data.msg, `${res.data.content}`);
					notification.push();
					if (res.data.msg =="success"){
						/*--- clear row trong table --- */
						document.getElementById("table_order").deleteRow(del_row);
					}
				}
				popup.classList.remove("open-popup");

			}else if(item=='save_edit'){
				let save_tmp ={
					id: document.querySelector('.title_popup').id,
					name: document.querySelector('.popup-input.nameDM').value,
					color: digital(document.querySelector('.lang-menu .sBtn-text').innerText),
					mota: document.querySelector('.popup-input.motaDM').value,
					DMcha: document.querySelector('.popup-input.DMcha').value,
					DTkhac: document.querySelector('#DMtach').checked?'checked':'unchecked',
					mobanDM: document.querySelector('#mobanDM').checked?'checked':'unchecked',
					action: 'update'
				}
				await instance.post('/danhmuc', save_tmp);
				console.log(save_tmp)
				switch_tab('Danh Mục')
			}
		break;
		case "DM_MATHANG":
			var temp;
			if(item=='save_new'){
				let ten_MH = document.querySelector('.popup-input.nameMH').value
				let price_MH = document.querySelector('.popup-input.price_MH').value
				let price_tuychon = document.querySelector('.popup-input.price_tuychon').checked
				let pricetuychonMH = document.querySelector('.popup-input.giatuychonMH').value
				let max_toppingMH = document.querySelector('.popup-input.max_toppingMH').value
				price_tuychon == true ? price_MH = "Tuỳ Chọn":price_MH = price_MH
				let id_DM = document.querySelector('.popup-input.danhmucMH').value
				let danhmuc_MH = document.querySelector('.popup-input.danhmucMH').options[document.querySelector('.popup-input.danhmucMH').selectedIndex].text;
				var photo = document.querySelector('#blah').src
				
				let table_nguyenlieu = document.querySelector('#MHnguyenlieu')
				let nguyenlieu_MH = await getdata_table(table_nguyenlieu)
				if (nguyenlieu_MH===0){
					// console.log('nguyenlieu', nguyenlieu_MH)
					return;
				}

				let table_MHtopping = document.querySelector('#MHtopping')
				let Topping_MH = await getdata_table(table_MHtopping)
				if (Topping_MH===0){
					return;
				}

				async function getdata_table(table){
					if(table){
						var rows = table.rows,
						len = rows.length,
						data = [],
						cells;
						for (var n = 1; n < len; n++) {
							
							cells = rows[n].cells;
							if (cells[1].firstElementChild.value === '0'){
								var notification = notifier.notify('error', `<b>[Hệ Thống]</b> Số lượng <b>${cells[0].firstElementChild.innerText} phải lớn hơn 0</b>`);
								return 0;
							}

							temp ={
								k: cells[0].firstElementChild.innerText,
								v: cells[1].firstElementChild.value,
								DG: cells[2].firstElementChild.value
							};
							data.push(temp)
						}
						
						return data;
					}
					
				}
				
				/*--- func check giá tùy chọn --- */
				if (price_tuychon){
					nguyenlieu_MH = null;
				}else if (id_DM == 'Topping'){
					danhmuc_MH = 'Topping'
				}else if (!ten_MH){
					var notification = notifier.notify('error', `<b>[Hệ Thống]</b> Vui lòng nhập <b>Tên Mặt Hàng</b>`);
					return;
				}else if (!price_MH){
					var notification = notifier.notify('error', `<b>[Hệ Thống]</b> Vui lòng nhập <b>Giá Mặt Hàng</b>`);
					return;
				}
				if (id_DM === '0'){
					document.querySelector('.popup-input.danhmucMH').style.borderColor= 'red'
					var notification = notifier.notify('error', `<b>[Hệ Thống]</b> Vui lòng chọn <b>danh mục Mặt Hàng</b>`);
					return;
				}

				var duplicate = highlightDuplicates($('table'),'span.table-nameMH', ten_MH)
				if (duplicate){
					let temp_order = {
						ten_MH: ten_MH,
						price_MH: price_MH,
						price_tuychon: price_tuychon,
						danhmuc_MH: danhmuc_MH,
						id_DM: id_DM,
						photo: photo,
						nguyenlieu_MH: nguyenlieu_MH,
						Topping_MH: Topping_MH,
						muctoithieu: pricetuychonMH,
						chontoida: max_toppingMH,
						action: 'newMH'
					}
					let res = await instance.post('/mathang', temp_order);
					if (res.data){
						//console.log(res.data)
						var notification = notifier.notify(res.data.msg, `${res.data.content}`);
						if (res.data.msg=='error'){
							return;
						}
					}

					// /*----- Show table mat hang ------ */
					// var table = document.getElementById("table_order");
					// var lastRowIndex = table.rows.length-1;
					// let html =null
					// html += '<tr>'
					// html += `<td data-label="STT">${Number(lastRowIndex)+1}</td>`
					// html += `<td data-label="ẢNH"><img class="mathang_thietlap" src='${photo}'></td>`
					// html += `<td data-label="TÊN" style=" display: table; margin: 0 auto; margin-top: 5px; float: left;"><span class="table-nameMH" style="margin-left: 5px;">${ten_MH}</span><br>`
					
					// for (var n = 0; n < nguyenlieu_MH.length; n++) {
					// 	html += `<p class="danhmuc">${nguyenlieu_MH[n].k}</p>`
					// }
					// if (Topping_MH && Topping_MH.length > 0){
					// 	html +=         `<!-- <div class="table_responsive"> -->
					// 					<table cellspacing="0" cellpadding="0" id="MHtoppings" class="table-popup" style="margin-top: 0; display: block;">
					// 						<thead>
					// 							<tr>
					// 								<th>TOPPING</th>
					// 								<th>SL</th>
					// 								<th>Đơn Giá</th>									
					// 							</tr>
					// 						</thead>
					// 						<tbody id="list_order">`
					// 	for (var n = 0; n < Topping_MH.length; n++) {	

					// 				html += `<tr>
					// 							<td data-label="TÊN"><span class="MHtopping" style="user-select: none;">${Topping_MH[n].k}</span></td>
					// 							<td data-label="SL"><input type="text" disabled="disabled" value="${Topping_MH[n].v}" style="border: none; background: transparent;"/></td>
					// 							<td data-label="ĐG"><input type="text" disabled="disabled" value="${Topping_MH[n].DG}" style="border: none; background: transparent;"/></td>
					// 						</tr>`	
												
					// 	}	
					// 	html +=				`</tbody>
					// 					</table>
					// 				<!-- </div> -->`

					// }
					// html += '</td>'
					// html += `<td data-label="ĐƠN GIÁ"><span style="margin-left: 5px; color: red; font-size: 20px;">${Number(price_MH).format(0, 3, '.', ',')}₫</span></td>`
					// html += '<td data-label="TỒN KHO"><span style="margin-left: 5px; color: green; font-size: 20px;">114</span></td>'
					// html += `<td data-label="DANH MỤC">${danhmuc_MH}</td>`
					// html += `<td data-label="MỞ BÁN">
					// 			<label for="${ten_MH.replaceAll(' ', '')}" class="toggle_checkbox"> 
					// 			<input type="checkbox" id="${ten_MH.replaceAll(' ', '')}" class="toggle_input" hidden=""/>
					// 			<div class="toggle_bar">
					// 				<div class="toggle_spin"></div>
					// 			</div>
					// 		</td>`
					// html += '<td data-label="KHÓA"><i class="ti-lock"></i> <i class="ti-unlock" style="display: none;"></i></td>'
					// html += '<td data-label="HẸN GIỜ"></td>'
					// html += `<td data-label="THAO TÁC"><div class="danhmuc_thaotac"><i class="far fa-edit" onclick="chinhsua_show_popup(this,'chinhsuaMH');"></i>  <i class="far fa-clock"></i></td>`
					// html += '</tr>'

					// $(table).append(html);

					// await call_popup('THÊM MẶT HÀNG')
					//console.log('xong')
					switch_tab('Mặt Hàng')
					call_popup('DM_MATHANG','create')
				}
				

			}else if(item=='save_add'){
			}else if(item=='save_del'){
				console.log('del_MH')
				let id = document.querySelector('.title_popup').id
				let ten_MH = document.querySelector('.popup-input.nameMH').value
				let temp_order= {
					id_MH: id,
					name: ten_MH,
					action: 'del_MH'
				}
				let res = await instance.post('/mathang', temp_order);
				if (res.data){
					var notification = notifier.notify(res.data.msg, `${res.data.content}`);
					if (res.data.msg=='error')return;			
					switch_tab('Mặt Hàng')
				}

			}else if(item=='save_edit'){
				let id = document.querySelector('.title_popup').id
				let ten_MH = document.querySelector('.popup-input.nameMH').value
				let price_MH = document.querySelector('.popup-input.price_MH').value
				let price_tuychon = document.querySelector('.popup-input.price_tuychon').checked
				let pricetuychonMH = document.querySelector('.popup-input.giatuychonMH').value
				let max_toppingMH = document.querySelector('.popup-input.max_toppingMH').value
				price_tuychon == true ? price_MH = "Tuỳ Chọn":price_MH = price_MH
				let id_DM = document.querySelector('.popup-input.danhmucMH').value
				let danhmuc_MH = document.querySelector('.popup-input.danhmucMH').options[document.querySelector('.popup-input.danhmucMH').selectedIndex].text;
				var photo = document.querySelector('#blah').src
				
				let table_nguyenlieu = document.querySelector('#MHnguyenlieu')
				let nguyenlieu_MH = await getdata_table(table_nguyenlieu)
				if (nguyenlieu_MH===0){
					// console.log('nguyenlieu', nguyenlieu_MH)
					return;
				}

				let table_MHtopping = document.querySelector('#MHtopping')
				let Topping_MH = await getdata_table(table_MHtopping)
				if (Topping_MH===0){
					return;
				}

				//* get data form table return json dict */
				async function getdata_table(table){
					if(table){
						var rows = table.rows,
						len = rows.length,
						data = [],
						cells;
						for (var n = 1; n < len; n++) {
							
							cells = rows[n].cells;
							if (cells[1].firstElementChild.value === '0'){
								var notification = notifier.notify('error', `<b>[Hệ Thống]</b> Số lượng <b>${cells[0].firstElementChild.innerText} phải lớn hơn 0</b>`);
								return 0;
							}

							temp ={
								k: cells[0].firstElementChild.innerText,
								v: cells[1].firstElementChild.value,
								DG: cells[2].firstElementChild.value
							};
							data.push(temp)
						}
						
						return data;
					}
					
				}
				
				console.log(id_DM === '0')
				/*--- func check giá tùy chọn --- */
				if (price_tuychon){
					// nguyenlieu_MH = null;
				}else if (id_DM === 'Topping'){
					danhmuc_MH = 'Topping'
				}else if (!ten_MH){
					var notification = notifier.notify('error', `<b>[Hệ Thống]</b> Vui lòng nhập <b>Tên Mặt Hàng</b>`);
					return;
				}else if (!price_MH){
					var notification = notifier.notify('error', `<b>[Hệ Thống]</b> Vui lòng nhập <b>Giá Mặt Hàng</b>`);
					return;
				}
				if (id_DM == '0'){
					document.querySelector('.popup-input.danhmucMH').style.borderColor= 'red'
					var notification = notifier.notify('error', `<b>[Hệ Thống]</b> Vui lòng chọn <b>danh mục Mặt Hàng</b>`);
					return;
				}

				
				let temp_order = {
					id_MH: id,
					ten_MH: ten_MH,
					price_MH: price_MH,
					price_tuychon: price_tuychon,
					danhmuc_MH: danhmuc_MH,
					id_DM: id_DM,
					photo: photo,
					nguyenlieu_MH: nguyenlieu_MH,
					Topping_MH: Topping_MH,
					muctoithieu: pricetuychonMH,
					chontoida: max_toppingMH,
					action: 'update_MH'
				}
				let res = await instance.post('/mathang', temp_order);
				if (res.data){
					//console.log(res.data)
					var notification = notifier.notify(res.data.msg, `${res.data.content}`);
					if (res.data.msg=='error'){
						return;
					}			
					switch_tab('Mặt Hàng')
				}
				
			}
		break;
		case 'DM_NGUYENLIEU':
			if(item=='save_new'){
				let ten_nguyen_lieu= document.querySelector('.popup-input.nameNL').value
				let mota_nguyen_lieu= document.querySelector('.popup-input.motaNL').value
				let donvi_nguyen_lieu= document.querySelector('.popup-input.donviNL').value
	
				var table = document.getElementById("table_order");
				var lastRowIndex = table.rows.length-1;
				/*--------- remove row table ---------- */
				const rows = table.rows;
				for (let i = rows.length - 1; i > 0; i--) {
					rows[i].remove();
				}
	
				if (mota_nguyen_lieu==''){mota_nguyen_lieu = 'Không có mô tả'}
				let temp_order = {
					id: Number(lastRowIndex)+1,
					name: ten_nguyen_lieu,
					mota: mota_nguyen_lieu,
					sl: 0,
					action: 'newNL',
					donvi: donvi_nguyen_lieu
				}
				let res= await instance.post('/inventory', temp_order);
				if (res.data){
					var notification = notifier.notify(res.data.msg, `${res.data.content}`);
					notification.push();
				}
				
				temp_order = {action: 'getNL'}
				const NL = await instance.post('/inventory', temp_order);
				const sortedList = NL.data.reverse()
				var lastRowIndex = 0;
				sortedList.forEach(function(element, index){
					lastRowIndex +=1
					const id = element.id
					const tenNL = element.name
					const mota = element.mota
					const donvi = element.donvi
					const sl = element.Tonkho
					let html= '';
					html += `<tr id='${id}'>`
					html += `<td data-label="STT">${lastRowIndex}</td>`
					html += `<td data-label="TÊN" style="min-width: 270px; font-weight:600;">${tenNL}</td>`
					html += `<td data-label="MÔ TẢ" style="font-style:italic; color: grey;">${mota}</td>`
					html += `<td data-label="ĐƠN VỊ" style="width: 70px;">${donvi}</td>`
					html += `<td data-label="TỒN KHO" style="text-align: right;">${sl}</td>`
					html += `<td data-label="THAO TÁC"><div class="danhmuc_thaotac" titles="DM_NGUYENLIEU"><i class="far fa-edit" item='edit'></i>  <i class="ti-support" item='add'></i> <i class="far fa-trash-alt" item='del'></i></td>`
					html += '</tr>'
					$(table).append(html);
				})
				const main = document.getElementById('main');
				let btn = main.querySelectorAll('i')
				btn.forEach((el, i) => {
					el.addEventListener('click',function (evt) {
						xuly_before_call_popup(el);
					});
				});
				
				document.querySelector('.popup-input.nameNL').value = ''
				document.querySelector('.popup-input.motaNL').value = ''
				document.querySelector('.popup-input.donviNL').value= ''
				
			}else if(item=='save_add'){
				const element_popup = e.parentNode
				const row = element_row.parentNode.parentNode.parentNode
				let id = row.id;
				let sl_old = row.children[4].innerHTML
				let nameNL = row.children[1].innerHTML
				let thaotac = element_popup.querySelector('.popup-input.editkho').value
				let sl = element_popup.querySelector('.popup-input.slNL').value
				let price = element_popup.querySelector('.popup-input.priceNL').value
				let note = element_popup.querySelector('.popup-input.noteNL').value
				if (note==''){note="Không có mô tả"}
				let total = Number(sl_old) + Number(sl)
				if (thaotac==='Điều chỉnh tồn kho'){
					total = Number(sl_old) - Number(sl);
					thaotac = 'Điều chỉnh'
				}
				/*------- show ra table ------ */
				row.children[4].innerHTML = total
				row.children[2].innerHTML = note
	
				let temp_order = {
					id: id,
					name: row.children[1].innerHTML,
					mota: note,
					sl: total,
					action: 'nhapkho',
					// tao log nhap kho
					date: new_date(),
					staff: user_login,
					sl_old: sl_old,
					sl_new: sl,
					total_sl: total,
					price: digital(price),
					total_newnhap: Number(digital(price)* Number(sl)),
					thaotac: thaotac,
					nameNL: nameNL,
				}
				await instance.post('/inventory', temp_order);
	
			}else if(item=='save_del'){
				const row = element_row.parentNode.parentNode.parentNode
				let nameNL = titleCase(row.children[1].innerText)
				let del_row = row.rowIndex
				
				// document.getElementById("table_order").deleteRow(del_row);
				let temp_order = {
					id: row.id,
					name: row.children[1].innerHTML,
					mota: '',
					sl: '',
					action: 'delkho',
					donvi: ''
				}
				let res = await instance.post('/inventory', temp_order);
				if(res.data){
					var notification = notifier.notify(res.data.msg, `${res.data.content}`);
					notification.push();
					if (res.data.msg =="success"){
						/*--- clear row trong table --- */
						document.getElementById("table_order").deleteRow(del_row);
					}
				}
	
				popup.classList.remove("open-popup");
			}else if(item=='save_edit'){
				const row = element_row.parentNode.parentNode.parentNode
				let indexrow = row.rowIndex
				
				const ten_nguyen_lieu= document.querySelector('.popup-input.nameNL')
				const mota_nguyen_lieu= document.querySelector('.popup-input.motaNL')
				const donvi_nguyen_lieu= document.querySelector('.popup-input.donviNL')
				let table = document.getElementById("table_order")
				var rowa = table.rows[indexrow]
	
				rowa.children[1].innerHTML = ten_nguyen_lieu.value
				rowa.children[2].innerHTML = mota_nguyen_lieu.value
				rowa.children[3].innerHTML = donvi_nguyen_lieu.value
	
				let temp_order = {
					id: row.id,
					name: ten_nguyen_lieu.value,
					mota: mota_nguyen_lieu.value,
					sl: '',
					action: 'update',
					donvi: donvi_nguyen_lieu.value
				}
				await instance.post('/inventory', temp_order);	
			}
		break;
		case "DM_NHOMMATHANG":
			if(item=='save_new'){
				let ten_nhom= document.querySelector('.popup-input.nameMH').value
				let mota_nhom= document.querySelector('.popup-input.mota_nhomMH').value
				let show_nhom = document.querySelector('.popup-input.show_nhom').checked?'checked':'unchecked'
				let label = document.querySelector('.popup-input.label_nhom').checked?'checked':'unchecked'
				let color =  await digital(document.querySelector('.lang-menu .sBtn-text').innerText)
				let name_label = document.querySelector('.popup-input.tennhan_nhomMH').value
				var table = document.getElementById("table_order");
				let tbody = table.querySelector('tbody')
				/*--------- remove row table ---------- */
				const rows = table.rows;
				for (let i = rows.length - 1; i > 0; i--) {
					rows[i].remove();
				}
				let temp_order = {
					name: ten_nhom,
					mota: mota_nhom,
					show: show_nhom,
					label: label,
					color_nhom: color,
					name_label: name_label,
					action: 'newNhom',
				}
				let res= await instance.post('/nhomMH', temp_order);
				if (res.data){
					var notification = notifier.notify(res.data.msg, `${res.data.content}`);
					notification.push();
					call_popup('DM_NHOMMATHANG','create')
				}
				temp_order = {action: 'get_nhom'}
				let nhom_MH = await instance.post('/nhomMH', temp_order);
				/*-------------- sort Alphabetically xắp sếp ----------- */
				const sortedList = nhom_MH.data.reverse()
				let html = await render_rows(sortedList, 'DM_NHOMMATHANG')
				tbody.insertAdjacentHTML("afterbegin",html)
				/*------------- add event btn ---------------- */
				const main = document.getElementById('main');
				let btn = main.querySelectorAll('i')
				btn.forEach((el, i) => {
					el.addEventListener('click',function (evt) {
						xuly_before_call_popup(el);
					});
				});
				
			}else if(item=='save_add'){
			}else if(item=='save_del'){
				const row = element_row.parentNode.parentNode.parentNode
				let nameNhomMH = titleCase(row.children[0].innerText)
				let del_row = row.rowIndex
				// document.getElementById("table_order").deleteRow(del_row);
				let temp_order = {
					id_nhom: row.id,
					name: nameNhomMH,
					action: 'delnhom',
				}
				let res= await instance.post('/nhomMH', temp_order);
				if(res.data){
					var notification = notifier.notify(res.data.msg, `${res.data.content}`);
					notification.push();
					if (res.data.msg =="success"){
						/*--- clear row trong table --- */
						document.getElementById("table_order").deleteRow(del_row);
					}
				}
				popup.classList.remove("open-popup");
			}else if(item=='save_edit'){
				let id_nhom = document.querySelector('.title_popup').id
				let ten_nhom= document.querySelector('.popup-input.nameMH').value
				let mota_nhom= document.querySelector('.popup-input.mota_nhomMH').value
				let show_nhom = document.querySelector('.popup-input.show_nhom').checked?'checked':'unchecked'
				let label = document.querySelector('.popup-input.label_nhom').checked?'checked':'unchecked'
				let color =  await digital(document.querySelector('.lang-menu .sBtn-text').innerText)
				let name_label = document.querySelector('.popup-input.tennhan_nhomMH').value
				var table = document.getElementById("table_order");
				let tbody = table.querySelector('tbody')
				if(label.trim()!=='checked'){
					name_label=''
					color= ''
				}
				/*--------- remove row table ---------- */
				const rows = table.rows;
				for (let i = rows.length - 1; i > 0; i--) {
					rows[i].remove();
				}
				let temp_order = {
					id_nhom: id_nhom,
					name: ten_nhom,
					mota: mota_nhom,
					show: show_nhom,
					label: label,
					color_nhom: color,
					name_label: name_label,
					action: 'update_nhom',
				}
				let res= await instance.post('/nhomMH', temp_order);
				
				temp_order = {action: 'get_nhom'}
				let nhom_MH = await instance.post('/nhomMH', temp_order);
				/*-------------- sort Alphabetically xắp sếp ----------- */
				const sortedList = nhom_MH.data.reverse()
				let html = await render_rows(sortedList, 'DM_NHOMMATHANG')
				tbody.insertAdjacentHTML("afterbegin",html)
				/*------------- add event btn ---------------- */
				const main = document.getElementById('main');
				let btn = main.querySelectorAll('i')
				btn.forEach((el, i) => {
					el.addEventListener('click',function (evt) {
						xuly_before_call_popup(el);
					});
				});
				
			}
		break;
		case "DM_KHUYENMAI":
			if(item=='save_new'){
				let name_KM = el_parent.querySelector('.nameKM').value
				let ten_nhom= el_parent.querySelector('.sBtn-text').innerText
				let id_nhom = el_parent.querySelector('.sBtn-text').id
				let option = el_parent.querySelector('.loaiKM')
				let id_loaiKM = option.value
				console.log(id_loaiKM)
				let loaiKM = option.options[id_loaiKM].innerText							
				let phantram = el_parent.querySelector('.phantramKM').value
				let date_begin = el_parent.querySelector('.date_begin').value
					date_begin = convert_dateToUS(date_begin)
				let date_end = el_parent.querySelector('.date_end').value
					date_end = convert_dateToUS(date_end)

				/*--------- remove row table ---------- */
				var table = document.getElementById("table_order");
				let tbody = table.querySelector('tbody');
				const rows = table.rows;
				for (let i = rows.length - 1; i > 0; i--) {
					rows[i].remove();
				}
				let temp_order = {
					name_KM: name_KM,
					ten_nhom: ten_nhom,
					id_nhom: id_nhom,
					id_loaiKM: id_loaiKM,
					loaiKM: loaiKM,
					phantram: phantram,
					date_begin: date_begin,
					date_end: date_end,
					action: 'newKM',
				}
				console.log(temp_order)
				let res= await instance.post('/khuyenmai', temp_order);
				if (res.data){
					var notification = notifier.notify(res.data.msg, `${res.data.content}`);
					notification.push();
					call_popup('DM_KHUYENMAI','create')

					temp_order = {action: 'get_KM'}
					nhom_MH = await instance.post('/khuyenmai', temp_order);
					/*-------------- sort Alphabetically xắp sếp ----------- */
					const sortedList = nhom_MH.data.reverse()
					let html = await render_rows(sortedList, 'DM_KHUYENMAI')
					tbody.insertAdjacentHTML("afterbegin",html)
					/*------------- add event btn ---------------- */
					const main = document.getElementById('main');
					let btn = main.querySelectorAll('i')
					btn.forEach((el, i) => {
						el.addEventListener('click',function (evt) {
							xuly_before_call_popup(el);
						});
					});
					
				}
				
				
			}else if(item=='save_add'){
			}else if(item=='save_del'){
				const row = element_row.parentNode.parentNode.parentNode
				let nameKM = titleCase(row.children[0].innerText)
				let del_row = row.rowIndex
				console.log('dddd')
				let temp_order = {
					id_khuyenmai: row.id,
					name: nameKM,
					action: 'del_KM',
				}
				let res= await instance.post('/khuyenmai', temp_order);
				if(res.data){
					var notification = notifier.notify(res.data.msg, `${res.data.content}`);
					notification.push();
					if (res.data.msg =="success"){
						/*--- clear row trong table --- */
						document.getElementById("table_order").deleteRow(del_row);
					}
				}
				popup.classList.remove("open-popup");
			}else if(item=='save_edit'){
				let id_khuyenmai = document.querySelector('.title_popup').id
				let name_KM = document.querySelector('.nameKM').value
				let ten_nhom= el_parent.querySelector('.sBtn-text').innerText
				let id_nhom = el_parent.querySelector('.sBtn-text').id
				let option = el_parent.querySelector('.loaiKM')
				let id_loaiKM= option.value
				let loaiKM = option.options[id_loaiKM].innerText	
				let phantram = el_parent.querySelector('.phantramKM').value
				let date_begin = el_parent.querySelector('.date_begin').value
					date_begin = convert_dateToUS(date_begin)
				let date_end = el_parent.querySelector('.date_end').value
					date_end = convert_dateToUS(date_end)
				
				let temp_order = {
					id_khuyenmai:id_khuyenmai,
					name_KM: name_KM,
					ten_nhom: ten_nhom,
					id_nhom: id_nhom,
					id_loaiKM: id_loaiKM,
					loaiKM: loaiKM,
					phantram: phantram,
					date_begin: date_begin,
					date_end: date_end,
					action: 'update_KM',
				}
				let res= await instance.post('/khuyenmai', temp_order);
				switch_tab('Khuyến Mại')
			}
		break;
		case "DM_TAOMA":
			if(item=='save_new'){
				var table = document.getElementById("table_order");
				let tbody = table.querySelector('tbody')
				var lastRowIndex = table.rows.length-1;
				/*--------- remove row table ---------- */
				const rows = table.rows;
				for (let i = rows.length - 1; i > 0; i--) {
					rows[i].remove();
				}
				/*-------- clear thông báo chưa có mã----*/
				let hidden_title = document.querySelector('.title_maKM')
				let thongbao = document.querySelector('.thongbao')
				if (thongbao){
					hidden_title.style.visibility= 'visible';
					thongbao.remove();
				}

				let id_KM = e.id
				console.log(id_KM)
				let maKM = el_parent.querySelector('.maKM').value
				let solansudung= el_parent.querySelector('.solansudung').value
				let solantkdung= el_parent.querySelector('.tksudung').value
				let temp_order = {
					id_KM: id_KM,
					maKM: maKM,
					solansudung: solansudung,
					solantkdung: solantkdung,
					action: 'newMagiam',
				}
				let res= await instance.post('/magiamgia', temp_order);
				if (res.data){
					var notification = notifier.notify(res.data.msg, `${res.data.content}`);
					notification.push();
					call_popup(title, 'create');

					temp_order = {
						id_KM: id_KM,
						action: 'get_Magiam'
					}
					magiam = await instance.post('/magiamgia', temp_order);
					/*-------------- sort Alphabetically xắp sếp ----------- */
					const sortedList = magiam.data.reverse()
					let html = await render_rows(sortedList, 'DM_TAOMA')
					tbody.insertAdjacentHTML("afterbegin",html)
				
					const main = document.getElementById('main');
					let btn = main.querySelectorAll('i')
					btn.forEach((el, i) => {
						el.addEventListener('click',function (evt) {
							xuly_before_call_popup(el);
						});
					});
				}		
				
			}else if(item=='save_edit'){
				var table = document.getElementById("table_order");
				let tbody = table.querySelector('tbody')
				var lastRowIndex = table.rows.length-1;
				/*--------- remove row table ---------- */
				const rows = table.rows;
				for (let i = rows.length - 1; i > 0; i--) {
					rows[i].remove();
				}
				/*-------- clear thông báo chưa có mã----*/
				let hidden_title = document.querySelector('.title_maKM')
				let thongbao = document.querySelector('.thongbao')
				if (thongbao){
					hidden_title.style.visibility= 'visible';
					thongbao.remove();
				}

				let id_KM = e.id
				console.log(id_KM)
				let maKM = el_parent.querySelector('.maKM').value
				let id_magiam = document.querySelector('.title_popup').id
				let solansudung= el_parent.querySelector('.solansudung').value
				let solantkdung= el_parent.querySelector('.tksudung').value
				let temp_order = {
					id_KM: id_KM,
					id_magiam: id_magiam,
					maKM: maKM,
					solansudung: solansudung,
					solantkdung: solantkdung,
					action: 'update_Magiam',
				}
				let res= await instance.post('/magiamgia', temp_order);
				if (res.data){
					var notification = notifier.notify(res.data.msg, `${res.data.content}`);
					notification.push();
					temp_order = {
						id_KM: id_KM,
						action: 'get_Magiam'
					}
					magiam = await instance.post('/magiamgia', temp_order);
					/*-------------- sort Alphabetically xắp sếp ----------- */
					const sortedList = magiam.data.reverse()
					let html = await render_rows(sortedList, 'DM_TAOMA')
					tbody.insertAdjacentHTML("afterbegin",html)
				
					const main = document.getElementById('main');
					let btn = main.querySelectorAll('i')
					btn.forEach((el, i) => {
						el.addEventListener('click',function (evt) {
							xuly_before_call_popup(el);
						});
					});
				}		
			}
		break;
		case "DM_MENUDICHVU":
		break;
		case "DM_MENUGAME":
		break;
		case "DM_BANGTIN":
		break;
		case "DM_TUYCHINH":
		break;
	}
	if(item!=='save_new'){
		/*------------------ close popup ---------------------------- */
		document.querySelector('.overlay').classList.remove('showoverlay');
		document.querySelector('.containerpopup .popup').classList.remove('open-popup');
	}
};
/*-------------------- func close popup ------------------------- */
function closePopup_gop_y(){
	popup.classList.remove("open-popup");
    document.querySelector('.overlay').classList.remove('showoverlay');
}
/*---------------------- func confirm box ------------------ */
async function confirm_box(value,question, callback){
	// clickFlag = 0;
	$(".backdrop").fadeTo(200, 1);//show backdrop
	// document.querySelector('#id_confrmdiv').classList.remove('not_show')
	document.querySelector('#id_confrmdiv .shownoidung_popup .question').innerHTML = question;
	document.querySelector('#id_confrmdiv .shownoidung_popup p').innerHTML = value
	document.getElementById('id_confrmdiv').style.display="block"; //this is the replace of this line
	document.getElementById('id_truebtn').onclick = function(){
		$(".backdrop").fadeOut(200);
		// clickFlag = 0;
		// document.querySelector('#id_confrmdiv').classList.add('not_show')
		return callback(true);
	};
	document.getElementById('id_falsebtn').onclick = function(){
		$(".backdrop").fadeOut(200);//hide backdrop
		// clickFlag = 0;
		// document.querySelector('#id_confrmdiv').classList.add('not_show')
	  	return callback(false);
	};
}

///////////////////////////////////////////////////////// event order custom //////////////////////////////////////////////////////////

var list_order = ''
var list_giohang=[]
var count=0;//đánh index mac hang trong gio hang
var stop_order = false; //khóa đặt hàng

function order(selectObject, element){
	// check đang nhận đơn thì cho order
    if (stop_order){
        /*----------------- change content thông báo -------------------------------------- */
        var timechat = new Date().toLocaleString()
        const thongbao = document.getElementsByClassName("poup_thongbao");
        thongbao[0].innerHTML = "[Hệ Thống] Tạm dừng đặt hàng"
        loadingpoup()
        return;
    }

	/** chóng mặt ơi là chóng mặt */
	var dict;
    try {var dict = JSON.parse(element);} catch (error) {var dict = element}

	/* làm phần check số lượng (chưa làm)  */
	// console.log(element)
	if(typeof dict.Tonkho === 'number' || dict.Tonkho == "-"){
		if (dict.Tonkho === 0){
			itemsame = true
            return;
		}
	}else{
		itemsame = true
		return;
	}

	// check tuỳ chọn show popup
	if(dict.price == "Tuỳ Chọn"){
		let dict_json= {
			dict: dict,
			selectObject: selectObject
		}
		call_popup("DM_TAODONHANG", "price_tuychon", dict_json)
		return;
	}
	
	// check topping có thì show popup
	if(dict.Topping.length > 0){
		/*--- chưa add giỏ hàng ---*/
		let dict_json= {
			dict: dict,
			selectObject: selectObject
		}
		call_popup("DM_TAODONHANG", "add_Topping", dict_json)
		return;
	}
	var order_name = dict.name;
    var itemsame = false

	/*-------- check đã có mặt hàng chưa -------------- */
    var order_card = document.querySelectorAll('.order-card')
    for (const element of order_card) {
        var name = element.querySelector('.order-name').textContent
        let order_topping = element.querySelector('.order-topping')
		console.log(dict.Tonkho)
		
        if (name.trim()==order_name.trim() && !order_topping){
            var soluong = element.querySelector('.order-soluong')
			// chỗ này check số lượng 
			if(dict.Tonkho !== "-"){
				if (Number(dict.Tonkho) > Number(soluong.innerText)){
					soluong.innerHTML = Number(soluong.innerText) + 1;
					for (var i=0;i<list_giohang.length;i++) {
						if (list_giohang[i].name == name.trim()){
							list_giohang[i].sl = soluong.innerHTML
						}
					};
				}else{
					console.log(dict.TonKho)
					const success = loadingpoup()
				}
			}
            itemsame = true
            return;
        }
    };
	
	if (!itemsame)
		add_giohang(selectObject, dict);
	console.log(dict, selectObject)
}
function order_updateTopping(selectObject, dict){
    var itemsame = false
    var name_order = dict.name

    for (var i = 0; i < dict.Topping.length; i++){
        name_order += dict.Topping[i].nameTopping
        name_order += dict.Topping[i].Topping_SL
        name_order += dict.Topping[i].Topping_DG
    };
    for (var i = 0; i < list_giohang.length; i++){
        var name_MH_giohang = list_giohang[i].name
        var Topping = list_giohang[i].Topping
        for (var j = 0; j < Topping.length; j++){
            name_MH_giohang += Topping[j].nameTopping
            name_MH_giohang += Topping[j].Topping_SL
            name_MH_giohang += Topping[j].Topping_DG
            if (name_MH_giohang == name_order){
                var order_card = document.querySelectorAll('.order-card')
                var soluong = order_card[i].querySelector('.order-soluong')
				// if(dict.Tonkho !== "-"){
					if (Number(dict.Tonkho) > Number(soluong.innerText)){
						soluong.innerHTML = Number(soluong.innerText) + 1;
						list_giohang[i].sl = soluong.innerHTML
					}else{
						const success = loadingpoup()
					}
				itemsame = true
				return;
            }
        }
    };

	if (!itemsame)
		add_giohang(selectObject, dict);
}
function add_giohang(selectObject, dict) {
	// giohang()
	const dashboard_thongbao = document.getElementsByClassName('dashboard-thongbao');
	const dashboard_order = document.getElementsByClassName('dashboard-order');
    dashboard_thongbao[0].style.visibility = 'hidden';
    dashboard_order[0].style.visibility = 'visible';

	const SL_mathang = document.querySelectorAll('.order-card .order-soluong')
	var PhotoChildNode = selectObject.querySelector('.card-image');
	var order_photo = PhotoChildNode.src
	var order_name = dict.name;
	var order_price = money(dict.price)
	const order_wrapper = document.getElementsByClassName("order-wrapper");
	list_order = order_wrapper[0].innerHTML

	let id_giohang = count
	dict.id_giohang= count
	count++
	let Tonkho = dict.Tonkho=='-'? 0:dict.Tonkho

	var html = ''
	html += `<div class="order-card" id="${id_giohang}">`
	html += `   <img class="order-image" src="${order_photo}">`
	html += '   <div class="order-detail">'
	html += '       <button class="button-clear" onclick= "clear_order(this)">X</button>'
	html += `       <p class="order-name" style="font-size: 18px;">${order_name}</p>`
	/*------------ topping show ------ */
	const Topping_MH = dict.Topping
	if(Topping_MH.length > 0) {
		for (var i = 0; i < Topping_MH.length; i++)
			html += `<p class="order-topping" style="white-space: nowrap;">
			+ ${Topping_MH[i].nameTopping}
			<span class="SL-Topping" style="color: yellow;">[${Topping_MH[i].Topping_SL}] *</span>
			<span class="price-Topping">[${Number(Topping_MH[i].Topping_DG).format(0, 3, '.', ',')}</span>
			<span style="color: yellow;">₫</span>]</p>`
	}
	html += `       <input class="input-order" type="text" placeholder="Ghi Chú" style="margin-top: 10px; margin-bottom: 10px;" value="${dict.Ghichu}">`     
	html += `       <div style="display: flex; justify-content: flex-end;">
						<span class="order-price">${order_price} </span> <i class="ti-minus" onclick="giam_sl(this);"></i><span class="order-soluong" style="margin-right: 10px;margin-left: 10px; width: 10px; text-align: center;">1</span><i class="ti-plus" onclick="tang_sl(this, ${Tonkho});"></i>
					</div>`
	html += '   </div>'
	html += `<hr class="divider" style="width: 100%; margin-left: 10px;">`
	html += `<hr class="divider" style="margin-left: 5px;">`
	html += '</div>' 
	order_wrapper[0].innerHTML= list_order + html;

	/*----------------------- event change Span so lượng ---------------------------------*/ 
	const SL_mathang_change = document.querySelectorAll('.order-card .order-soluong')
	SL_mathang_change.forEach(element => {
		//create an observer instance
		var observer = new MutationObserver(function(mutations) {
			const detail = element.parentNode
			let id_MH = detail.parentNode.parentNode.id
			let name_MH = detail.parentNode.querySelector('.order-name')
			if (name_MH){
				for (var i=0;i<list_giohang.length;i++) {
					if (id_MH.trim() == list_giohang[i].id_giohang){
						list_giohang[i].sl = element.innerHTML
						func_total()
						// console.table(list_giohang)
						break;
					}
				};
			}
		});
		// configuration of the observer:
		var config = { attributes: true, childList: true, characterData: true };
		// pass in the target node, as well as the observer options
		observer.observe(element, config);
	});

	/*----------------- event change ghi chu -------------- */
	const Ghichu_change = document.querySelectorAll('.order-card .input-order')
	Ghichu_change.forEach(element => {
		element.addEventListener('change',function (evt) {
			const detail = element.parentNode
			let name_MH = detail.querySelector('.order-name')
			if (name_MH){
				for (var i=0;i<list_giohang.length;i++) {
					if (list_giohang[i].name == (name_MH.innerHTML).trim()){
						list_giohang[i].Ghichu = element.value
						element.setAttribute('value',element.value);
						// console.table(list_giohang)
						break;
					}
				};
			}
		});
	
	});

	/*----------------- add giỏ hàng ------------------- */
	list_giohang.push(dict)
    func_total()
}
async function clear_order(selectObject){
    const id_MH = selectObject.parentNode.parentNode.id
	// console.log(selectObject.parentNode.parentNode)
    let element = selectObject.parentNode.parentNode 
    element.remove();
   
	// console.log(id_MH, list_giohang.length, list_giohang)
    /*---------- cách remove 1 ------------------------- */
    for (var i = 0; i < list_giohang.length; i++){
		console.log(id_MH)
        if (Number(id_MH) == Number(list_giohang[i].id_giohang)){
			list_giohang.splice(i, 1); // 2nd parameter means remove one item only
			func_total()
			break;
            
        }
    }
   
}
// =========================== onchange soluong =========================== //
function tang_sl(selectObject, tonkho){
	console.log(tonkho)
	if(tonkho!='-'){
		let sl= Number(selectObject.previousElementSibling.innerText)
		if(sl >= 0 && sl < tonkho ){
			sl+=1
		}
		selectObject.previousElementSibling.innerHTML= sl
	}
	
}
function giam_sl(selectObject){
    const detail = selectObject.parentNode
    const classname = $(detail).attr('class')
    let sl_limit = 1
    if (classname== 'detail_Topping'){
        sl_limit = 0
    }
    let sl= Number(selectObject.nextElementSibling.innerText)
    if(sl > sl_limit){
        sl-=1
    }
    selectObject.nextElementSibling.innerHTML= sl
}
// ============================ tinh tong bill ========================== //
function func_total(){
    var order_card = document.querySelectorAll('.order-card')
    
    if (order_card.length >= 0 ){
        var Total_price = 0
        for (var i = 0; i < list_giohang.length; i++){
            var Total_topping =0
            let Topping = list_giohang[i].Topping
            let price_MH = list_giohang[i].price
            let sl_MH = list_giohang[i].sl
            for (var j = 0; j < Topping.length; j++){
                let price_topping = Topping[j].Topping_DG
                let Sl_topping = Topping[j].Topping_SL
                Total_topping +=  price_topping * Sl_topping
            }
            Total_price += (Number(price_MH) + Number(Total_topping)) * Number(sl_MH)
        }
       
       
        // var Total_topping = 0
        var count = 0
        var listNameFood = ''
        for (const element of order_card){
            var hesonhan = element.querySelector('.order-soluong').textContent
            var Namefood = element.querySelector('.order-name').textContent     
            listNameFood += Namefood+', '   
            count+=Number(hesonhan)        
        };        

        /*----------------- change content thông báo -------------------------------------- */
        var timechat = new Date().toLocaleString()
        const thongbao = document.getElementsByClassName("poup_thongbao");
        thongbao[0].innerHTML = "[Hệ Thống] Đặt hàng <b style='color: #00b627; font-size: 1.5rem;'>" + listNameFood + ' </b>thành công! <p style="color: var(--black2)">' + timechat + '</p>'
        
        var order_total = document.getElementById("order-totals");
        order_total.innerHTML = Total_price.format(0, 3, '.', ',') + `<span style="color: yellow;">₫</span>`
        const countgiohang = document.getElementsByClassName('countcart')
        
        if (list_giohang.length > 0){
            document.getElementsByClassName("checkout")[0].disabled = false;
            // document.getElementsByClassName("tick")[0].style.visibility="visible" 
            countgiohang[0].innerHTML = `(${count} Món)`
        }else{
            list_giohang = []
            document.getElementsByClassName("checkout")[0].disabled = true; 
            // document.getElementsByClassName("tick")[0].style.visibility="hidden"
            countgiohang[0].innerHTML = `(Đang trống! )`
            order_total.innerHTML =  `0<span style="color: yellow;">₫</span>`
        }
    }else{
		list_giohang = []
	}
        
}
async function dathang(value){
	if (value=='name_KH'){
		call_popup("add_nv")
		return;
	}

    // console.table(value)
    let temp_order = {
        action: 'Order',
        data: list_giohang
    }
    const res = await instance.post('/mathang', temp_order);
    console.log(res.data)

    const success = await loadingpoup()
    if (success){
        document.getElementsByClassName("checkout")[0].disabled = true;
        // document.getElementsByClassName("tick")[1].style.visibility="visible" 
        // document.getElementsByClassName("tick")[0].style.visibility="hidden"
        const order_wrapper = document.getElementsByClassName("order-wrapper");
        const countgiohang = document.getElementsByClassName('countcart')
        countgiohang[0].innerHTML = `(Đang trống! )`
        list_order = ''
        order_wrapper[0].innerHTML= list_order;
        var order_total = document.getElementById("order-totals");
        order_total.innerHTML = 0 + `<span style="color: yellow;">₫</span>`
    }

    /*--- clear gio hang --- */
    list_giohang = []
    list_order = ''
    // thongbao();
    const dashboard_thongbao = document.getElementsByClassName('dashboard-thongbao');
	const dashboard_order = document.getElementsByClassName('dashboard-order');
    dashboard_thongbao[0].style.visibility = 'hidden';
    dashboard_order[0].style.visibility = 'hidden';
	switch_tab('Đơn Hàng')
}
/*----------------------------- func event btn Măt Hàng ------------------------- */
function func_enventMH() {
	/*--------- func show value on popup -------- */
	id = document.querySelector('.title_popup').id//id_MH
	let table_MHnguyenlieu = document.querySelector("#MHnguyenlieu");
	let Mh_nguyenlieu = document.querySelector('.popup-input.MHnguyenlieu')
	let table_MHtopping = document.getElementById("MHtopping");
	let Mh_topping = document.querySelector('.popup-input.MHtopping')

	/*---------- fun choose dropbox nguyen lieu show table ----------- */
	Mh_nguyenlieu.addEventListener("change", () => {
		let Mh_nguyenlieu_Frist = Mh_nguyenlieu.options[Mh_nguyenlieu.selectedIndex].text;
		if(Mh_nguyenlieu.value != Mh_nguyenlieu_Frist){//"Thêm nguyên liệu cho mặt hàng")
			var id = Mh_nguyenlieu.options[Mh_nguyenlieu.selectedIndex].id
			//hide option of select
			Mh_nguyenlieu[Mh_nguyenlieu.selectedIndex].setAttribute('hidden','true');
			var table_html = `<tr id="NL${id}">
							<td data-label="Nguyên Liệu"><span class="MHnguyenlieu" style="user-select: none;">${Mh_nguyenlieu_Frist}</span></td>
							<td data-label="Số lượng" style="width: 100%;"><input type="text" min="1" value="1" style="border: none; width: 100%;text-align: center; border-color: grey;" id="number-input" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);" /></td>
							<td data-label="Thao Tác" style="text-align: right;"><i class="far fa-trash-alt"></i></td>
						</tr>`
			$(table_MHnguyenlieu).append(table_html);
			table_MHnguyenlieu.style.display = "block";

			let btn_del_NL = document.querySelector(`tr#NL${id}`)
			btn_del_NL.querySelector('i').addEventListener('click', async function (evt) {
				// name_option = this.parentNode.parentNode.childNodes[1].innerText
				//show option of select
				Mh_nguyenlieu[$(`.popup-input.MHnguyenlieu>option[value='${digital(id)}']`).index()].removeAttribute("hidden");
				delrowtable_now(this);
			});
			
		}
		Mh_nguyenlieu.value = '0'
	})
	
	/*---------- fun choose dropbox nguyen lieu show table ----------- */
	let Mh_topping_Frist = Mh_topping.value
	if (Mh_topping){
		Mh_topping.addEventListener("change", () => {
			if(Mh_topping.value != Mh_topping_Frist){//"Thêm nguyên liệu cho mặt hàng"){
				var duplicate = highlightDuplicates($('#MHtopping'),'span.MHtopping', Mh_topping.value)
				if (duplicate){
					var name_topping = Mh_topping.options[Mh_topping.selectedIndex].text;
					var price = (Mh_topping.options[Mh_topping.selectedIndex].getAttribute('DG'))
					var id = Mh_topping.options[Mh_topping.selectedIndex].value
					Mh_topping[Mh_topping.selectedIndex].setAttribute('hidden','true');
					var table_html = `<tr id="TP${id}">
									<td data-label="TÊN"><span class="MHtopping" style="user-select: none;">${name_topping}</span></td>
									<td data-label="Số Lượng"><input type="text" disabled="disabled" value="1" style="width: 100%;color: grey;border: none;text-align: center;" id="number-input" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);" /></td>
									<td data-label="Giá" style="width: 100%;"><input type="text" disabled="disabled" value="${Number(price).format(0, 3, '.', ',')}₫" style="width: 100%; color: grey; border:none;text-align: center;" id="number-input" /></td>
									<td data-label="Thao Tác" style="text-align: right;"><i class="far fa-trash-alt"></i></td>
								</tr>`
					$(table_MHtopping).append(table_html);
					table_MHtopping.style.display = "block";		
					let btn_del_NL = document.querySelector(`tr#TP${id}`)
					btn_del_NL.querySelector('i').addEventListener('click', async function (evt) {
						// name_option = this.parentNode.parentNode.childNodes[1].innerText
						//show option of select
						Mh_topping[$(`.popup-input.MHtopping>option[value='${digital(id)}']`).index()].removeAttribute("hidden");
						delrowtable_now(this);
					});					
				}
			}
			Mh_topping.value = Mh_topping_Frist 
		})
		
	}

	/*---------------- func gia tuy chon event ------------------------ */
	let price_tuychon = document.querySelector('.popup-input.price_tuychon')
	let price_toithieu = document.querySelector('.input-field.giatuychonMH')
	let nhap_price = document.querySelector('.input-field.nhapgiaMH')
	let note_toithieu = document.querySelector('.note-toithieu')
	let danhmucMH = document.querySelector('.popup-input.danhmucMH')
	price_tuychon.addEventListener("change", () => {
		// console.log('check', price_tuychon.checked)
		if (price_tuychon.checked){
			Mh_nguyenlieu.disabled = true;
			Mh_nguyenlieu.style.color = 'grey';
			price_toithieu.style.display = 'block';
			note_toithieu.style.display = 'block';
			nhap_price.style.display = 'none';
			nhap_price.querySelector('.price_MH').classList.remove('invalid')
			nhap_price.querySelector('.price_MH').value=''
			danhmucMH.value = '0'
			$("#MHnguyenlieu tbody tr").remove();
			document.querySelector("#MHnguyenlieu").style.display = 'none'
			table_MHtopping.parentNode.style.height= '120px'
			table_MHnguyenlieu.parentNode.style.height= '330px'
		}else{
			Mh_nguyenlieu.disabled = false;
			Mh_nguyenlieu.style.color = 'white';
			price_toithieu.style.display = 'none';
			note_toithieu.style.display = 'none';
			nhap_price.style.display = 'block';
			nhap_price.querySelector('.price_MH').classList.add('invalid')
			price_toithieu.querySelector('.giatuychonMH').value = 0;
			price_toithieu.querySelector('span').innerHTML = '';
			table_MHtopping.parentNode.style.height= '350px'
			table_MHnguyenlieu.parentNode.style.height= '410px'
		}

	});
	if (nhap_price.querySelector('.price_MH').value !=="Tuỳ Chọn"){
		Mh_nguyenlieu.disabled = false;
		Mh_nguyenlieu.style.color = 'white';
		price_toithieu.style.display = 'none';
		note_toithieu.style.display = 'none';
		nhap_price.style.display = 'block';
		nhap_price.querySelector('.price_MH').classList.remove('invalid')
		price_tuychon.checked = false
		table_MHtopping.parentNode.style.height= '350px'
		table_MHnguyenlieu.parentNode.style.height= '410px'
	}else{
		Mh_nguyenlieu.disabled = true;
		Mh_nguyenlieu.style.color = 'grey';
		price_toithieu.style.display = 'block';
		note_toithieu.style.display = 'block';
		nhap_price.style.display = 'none';
		nhap_price.querySelector('.price_MH').value=''
		nhap_price.querySelector('.price_MH').classList.add('invalid')
		price_tuychon.checked = true
		table_MHtopping.parentNode.style.height= '120px'
		table_MHnguyenlieu.parentNode.style.height= '330px'
	}		

	/*------------------- func chon topping ----------------*/
	let max_topping = document.querySelector('.popup-input.max_toppingMH')
	let toida = max_topping.parentNode.querySelector('label.max_toppingMH')
	// console.log(toida)
	let choose_topping = document.querySelector('.popup-input.danhmucMH')
	choose_topping.addEventListener("change", () => {
		// console.log('check', price_tuychon.checked)
		if (choose_topping.value =='Chọn làm Topping'){
			Mh_topping.disabled = true;
			Mh_topping.style.color = 'grey';
			price_toithieu.style.display = 'none';
			note_toithieu.style.display = 'none';
			max_topping.disabled= true;
			max_topping.style.color = 'transparent';
			toida.style.color = 'grey';
			price_tuychon.checked = false;
			price_tuychon.disabled = true;
			Mh_nguyenlieu.disabled = false;
			Mh_nguyenlieu.style.color = 'white';
		}else{
			Mh_topping.disabled = false;
			Mh_topping.style.color = 'white';
			price_toithieu.style.display = 'none';
			note_toithieu.style.display = 'none';
			max_topping.disabled= false;
			max_topping.style.color = 'white';
			toida.style.color = 'white';
			price_tuychon.disabled = false;
		}

	});

	/*-------------------- func chon danh muc --------------*/
	let danhmuc_MH = document.querySelector('.popup-input.danhmucMH')
	danhmuc_MH.addEventListener("change", () => {
		document.querySelector('.popup-input.danhmucMH').style.borderColor= 'var(--blue)'
		console.log(danhmuc_MH.value)
	});

}

/*=================== func dung nhận đơn kết thúc ca ===================*/ 
function nhan_don(){
	var nhandon = document.querySelector('.thietlapca .nhan_don')
	var ketca = document.getElementById('ket_ca')
	const nhan_don = document.querySelector('.Nhan_don')
	if(nhandon.innerHTML=='Nhận Đơn'){
		nhandon.innerHTML= 'Dừng Nhận Đơn'
		nhandon.style.color='red'
		ketca.disabled = true;
		ketca.style.opacity = '0.2'
		nhan_don.innerHTML = 'Đang Nhận Đơn'
		nhan_don.style.color='green'
		
	}else{
		nhandon.innerHTML= 'Nhận Đơn'
		nhandon.style.color='green'
		ketca.disabled = false;
		ketca.style.opacity = '1'
		nhan_don.innerHTML = "Dừng Nhận Đơn"
		nhan_don.style.color='red'
	}
}
function ket_ca(){
	var nhandon = document.querySelector('.thietlapca .nhan_don')
	var ketca = document.getElementById('ket_ca')
	if(ketca.innerHTML=='Kết Thúc Ca'){
		//console.log('kết ca')
		// create_ca();
		ketca.innerHTML= 'Bắt Đầu Ca'
		nhandon.style.opacity = '0.2'
		nhandon.disabled = true;
	}else{
		//console.log('Bắt đầu ca')
		ketca.innerHTML= 'Kết Thúc Ca'
		nhandon.style.opacity = '1'
		nhandon.disabled = false;
	}
}

/*------------------------- func alert cua popup ------------- */
document.getElementsByClassName("poup")[0].style.visibility="hidden"
async function loadingpoup(){
    return new Promise(function(resolve) {
        var countthongbaos = 0
        const thongbao_progressbar = document.getElementsByClassName("poup_thongbao");
        // console.log(thongbao_progressbar[0].innerHTML)
        const thongbao = document.getElementsByClassName('thongbao-card');
        // console.log(thongbao[0].innerHTML)
        thongbao[0].innerHTML += thongbao_progressbar[0].innerHTML + `<hr class="divider"></hr>`
        // thongbao[0].style.fontSize = "13px";
        changeFont(thongbao[0])

        /*----------------- show sô lượng thông báo ----------------- */
        const countthongbao = document.getElementsByClassName('countcart')
        countthongbaos +=1;
        countthongbao[1].innerHTML = `(${countthongbaos})`
        // document.getElementsByClassName("tick")[1].style.visibility="visible"

        /*------------------- show popup ---------------- */
        document.getElementsByClassName("poup")[0].style.visibility="visible"
        document.getElementsByClassName("poup")[0].style.display= "block"
        document.querySelector('.overlay').classList.add('showoverlay');
        const progressbar = document.getElementsByClassName('progress-bar')[0]
        progressbar.style.setProperty('--width', 100)
        const interval = setInterval(()=> {
            const computedStyle = getComputedStyle(progressbar)
            const width = parseFloat(computedStyle.getPropertyValue('--width')) || 0
            progressbar.style.setProperty('--width', width - .5)
            if (width<0){
                document.getElementsByClassName("poup")[0].style.visibility="hidden";
                document.getElementsByClassName("poup")[0].style.display= "";
				// thongbao.style.visibility="hidden";
				// thongbao.style.display= "";
                document.querySelector('.overlay').classList.remove('showoverlay');
                clearInterval(interval)
                resolve(true)
            }
        }, 5)
 })
}

/*======================== func thanh toan order =============================-*/

// async function call_client(data, e){
// 	// const name_nvthungan = e.parentNode.children[3].textContent
// 	const date_order = e.parentNode.parentNode.children[0].textContent
// 	const custom_order = e.parentNode.parentNode.children[1].textContent
// 	const mathang_order = e.parentNode.parentNode.children[2].children[0].textContent
// 	const sl_order = e.parentNode.parentNode.children[3].textContent
// 	//console.log(data.action)
// 	if (e.disabled === false && data.action == 'HOÀN THÀNH' ){
// 		e.disabled = true;
// 		// e.style.fontSize=".8rem";
// 		e.innerHTML = 'HOÀN THÀNH';
// 		e.style.background = 'None';
// 		e.style.width = '125px';
// 		e.style.border = '1px solid green';
// 		e.style.color = 'green';
// 		e.nextSibling.style.visibility = 'hidden'
// 		e.nextSibling.style.display = 'none'
// 		let show_nvthungan = e.parentNode.children[3]
// 		show_nvthungan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> ${data.nv_order}`

// 		const dtdv = document.querySelector('.DTDV')
// 		var numStr = /\D+/g;
//         var number = dtdv.innerHTML.replace(numStr, '');
// 		number = Number(number) + 20000
// 		dtdv.innerHTML = number.format(0, 3, '.', ',') + ' ₫';

// 		return;
		
// 	}else if (data.action == 'THU TIỀN') {
// 		// ws.send("Send.");
// 		e.innerHTML = 'THU TIỀN';
// 		e.style.background = "orange";
// 		e.style.color = 'black';
// 		// show name thu ngan
// 		let show_nvthungan = e.parentNode.children[3]
// 		show_nvthungan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> ${data.nv_order}`
		
// 		// console.log('thu ngan',show_nvthungan.textContent)
// 		show_nvthungan.style.visibility = 'visible';
// 		show_nvthungan.style.display = ''
// 		return;
		
// 	}else if (data.action == "IN HÓA ĐƠN"){
// 		e.style.color = "green";
// 		e.style.border = '1px solid green';
// 		return;

// 	}else if (data.action.indexOf("(Chấp Nhận)") >=0){

// 		e.innerHTML = "HOÀN THÀNH"//data.action
// 		e.style.background = 'None';
// 		e.style.border = 'none';
// 		e.style.color = 'red';
// 		e.disabled = true;
// 		e.style.width = '100%';
// 		e.style.textAlign = 'center';
		

// 		// hide button chap nhan hủy
// 		e.previousElementSibling.style.visibility = 'hidden'
// 		e.previousElementSibling.style.display = 'none'

// 		// show name thu ngan
// 		// const show_nvthungan = e.parentNode.children[3]
// 		// console.log('thu ngan',show_nvthungan.textContent)

// 		let show_nvthungan = e.parentNode.children[3]
// 		show_nvthungan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> ${data.nv_order}`
// 		show_nvthungan.style.visibility = 'visible';
// 		show_nvthungan.style.display = '';

// 		// change thanh toán khi hủy
// 		const rowcur = e.parentNode.parentNode.rowIndex;
// 		var rowfirtofpage = numPerPage*Math.floor(rowcur/numPerPage)
// 		// console.log('firt page',rowfirtofpage, 'row',rowcur)

// 		/*=== change thanh toan ==== */
// 		// const TT_cur = Number(e.parentNode.parentNode.children[7].innerHTML.replace(' ₫', '').replace('.',''))
// 		const TT_cur = Number(e.parentNode.parentNode.children[4].innerHTML.replace(' ₫', '').replace('.',''))
// 		// console.log(TT_cur)
// 		const row_src = e.parentNode.parentNode.children[0].innerHTML + e.parentNode.parentNode.children[1].innerHTML
// 		// document.getElementById('table_order').querySelectorAll('tr').forEach((item) => {} instand for mới break
// 		var countt = 0;
// 		for (var item of document.querySelectorAll('tr')) {
// 			// console.log('count', countt)
// 			const row_find = item.children[0].innerHTML + item.children[1].innerHTML
// 			if (row_src == row_find){
// 				var thanhtoan = item.children[7].innerHTML.replace(' ₫', '').replace('.','')
// 				thanhtoan-=TT_cur
// 				item.children[7].innerHTML = thanhtoan.format(0, 3, '.', ',') + ' ₫'
// 				if (countt >= rowfirtofpage+1){
// 					item.children[7].innerHTML = thanhtoan.format(0, 3, '.', ',') + ' ₫'
// 					//console.log(item.children[4].innerHTML, countt, rowfirtofpage+1)
// 					break
// 				}
// 			}
// 			countt++;
// 		}
// 		return;
// 	}
// }


/*----------------------------------------------func phân trang TABLE ----------------------------------------------------- */
var tabel_lenght = 0
var list_table = null
var page_table = 1
var pagesize = 20;
let totalPages = 0;
var elements;

async function createPagination(totalPages, page_table, dict){
	console.log(dict)
	if (typeof dict == 'string'){
		dict = dict.replaceAll('=','"');
        dict = JSON.parse(dict)
		console.log(typeof dict)
	}
	let list_table_temp='';
	let title_search = dict.title;
	let val_search = dict.val_search;
	var dict_search = (JSON.stringify(dict)).replaceAll('"', '=')
	console.log(dict_search)
	let temp, res;
	switch (title_search) {
		case 'Search_all':
			temp = {
				page: page_table-1,
				pagesize: pagesize,
				action: 'list-order'}
			res = await instance.post('/all-order', temp);
			totalPages = res.data.TotalRow
			totalPages = Math.ceil(Number(totalPages) / Number(pagesize));
			list_table_temp = res.data.listtable
		break;
		case 'Search_Trangthai':
			temp = {
				page: page_table-1,
				pagesize: pagesize,
				Thaotac: val_search,
				action: title_search}
			res = await instance.post('/cashier', temp);
			totalPages = res.data.TotalRow
			totalPages = Math.ceil(Number(totalPages) / Number(pagesize));
			list_table_temp = res.data.listtable
		break;
		case 'Search_Danhmuc':
			temp = {
				page: page_table-1,
				pagesize: pagesize,
				id_DM: val_search,
				action: title_search}
			res = await instance.post('/cashier', temp);
			totalPages = res.data.TotalRow
			totalPages = Math.ceil(Number(totalPages) / Number(pagesize));
			list_table_temp = res.data.listtable
		break;
		case 'Search_Mathang':
			temp = {
				page: page_table-1,
				pagesize: pagesize,
				id_MatHang: val_search,
				action: title_search}
			res = await instance.post('/cashier', temp);
			totalPages = res.data.TotalRow
			totalPages = Math.ceil(Number(totalPages) / Number(pagesize));
			list_table_temp = res.data.listtable
		break;
		case 'Search_NhomMathang':
			temp = {
				page: page_table-1,
				pagesize: pagesize,
				id_nhom: val_search,
				action: title_search}
			res = await instance.post('/cashier', temp);
			totalPages = res.data.TotalRow
			totalPages = Math.ceil(Number(totalPages) / Number(pagesize));
			list_table_temp = res.data.listtable
		break;
	}
	await render_rows(list_table_temp, 'DM_DONHANG')


	let page = page_table
	let liTag = '';
	let active;
	let beforePage = page - 1;
	let afterPage = page + 1;
	// how many pages or li show before the current li
	if (page == totalPages) {
		beforePage = beforePage - 2;
		if(beforePage<=1){
			beforePage = 1
			
			// return;
		}
	} else if (page == totalPages - 1) {
		beforePage = beforePage - 1;
		if(beforePage<=1){
			beforePage = 1
			
		}
		
	}

	if(page > 1){ //show the next button if the page value is greater than 1
		liTag += `<li class="btn prev" onclick="createPagination(totalPages, ${page - 1},'${dict_search}')"><span><i class="fas fa-angle-left"></i> Prev</span></li>`;
	}
	if(page === 1)
		liTag += `<li class="btn prev" onclick="createPagination(totalPages, ${1},'${dict_search}')"><span><i class="fas fa-angle-left"></i> Prev</span></li>`;
	
	if(page > 2){ //if page value is less than 2 then add 1 after the previous button
		if (beforePage!=1)
			liTag += `<li class="first numb" onclick="createPagination(totalPages, 1,'${dict_search}')"><span>1</span></li>`;
		if(page > 3){ //if page value is greater than 3 then add this (...) after the first li or page
			
			liTag += `<li class="dots"><span>...</span></li>`;
		}
	}

	
	// how many pages or li show after the current li
	if (page == 1) {
		afterPage = afterPage + 2;
		if(afterPage >= totalPages){
			afterPage = totalPages
			
		}
	} else if (page == 2) {
		afterPage  = afterPage + 1;
		if(afterPage >= totalPages){
			afterPage = totalPages
			
		}
	}

	for (var plength = beforePage; plength <= afterPage; plength++) {
		if (plength > totalPages) { //if plength is greater than totalPage length then continue
		continue;
		}
		if (plength == 0) { //if plength is 0 than add +1 in plength value
		plength = plength + 1;
		}
		if(page == plength){ //if page is equal to plength than assign active string in the active variable
		active = "active";
		}else{ //else leave empty to the active variable
		active = "";
		}
		liTag += `<li class="numb ${active}" onclick="createPagination(totalPages, ${plength},'${dict_search}')"><span>${plength}</span></li>`;
	}

	if(page < totalPages - 1){ //if page value is less than totalPage value by -1 then show the last li or page
		if(page < totalPages - 2){ //if page value is less than totalPage value by -2 then add this (...) before the last li or page
			liTag += `<li class="dots"><span>...</span></li>`;
		}
		if (afterPage != totalPages)
			liTag += `<li class="last numb" onclick="createPagination(totalPages, ${totalPages},'${dict_search}')"><span>${totalPages}</span></li>`;
	}

	if (page < totalPages) { //show the next button if the page value is less than totalPage(20)
		liTag += `<li class="btn next" onclick="createPagination(totalPages, ${page + 1},'${dict_search}')"><span>Next <i class="fas fa-angle-right"></i></span></li>`;
	}
	if (page === totalPages)
		liTag += `<li class="btn next" onclick="createPagination(totalPages, ${totalPages},'${dict_search}')"><span>Next <i class="fas fa-angle-right"></i></span></li>`;
	
	let elements = document.querySelector(".pagination ul");
	elements.innerHTML = liTag; //add li tag inside ul tag
	page_table =page	
}
async function clearRowspan(table){
	var rowspan = 0;
	var count=0;
	var cellToExtend = null
	var TotalTT =0;
	var id;
	var show_print=0;
	var temp;
	var row = 0;
	
	var rows = document.querySelectorAll('tr.has-rowspan')
	for (var i = 0; i < rows.length; i++){
		if (i == row){
			cellToExtend = rows[i];
			
			if (typeof cellToExtend.children[5].children[1]!= 'undefined' && cellToExtend.children[5].children[1].textContent=='HỦY'){
				// try {
				// 	console.log(cellToExtend.children[7].innerHTML)
				// 	TotalTT+=Number(cellToExtend.children[7].innerHTML.replaceAll(/\D+/g, ''))
				// } catch (error) {
				// 	console.log(error)
				// 	TotalTT-=0
				// }
				if (cellToExtend.children[7].innerHTML){
					TotalTT+= Number(cellToExtend.children[7].innerText.replace(/\D+/g, ''))
				}
				// TotalTT+=Number(cellToExtend.children[7].innerHTML.replaceAll(/\D+/g, ''))
				
			}else{
				TotalTT-=0
			}
			const text_src = cellToExtend.children[0].textContent + cellToExtend.children[1].textContent
			var row_pre= cellToExtend.nextElementSibling;
			try {
				var text_pre = row_pre.children[0].textContent + row_pre.children[1].textContent
				
			} catch (error) { 
				
			};	
			if(rowspan == 0){
				temp = rows[i];
				id = temp.id
				//console.log('id',id)
			}
			rowspan = 1;
			show_print = 1;
			cellToExtend.setAttribute(`print${id}`, rowspan);
			cellToExtend.children[5].children[0].id = 'print'+id;
			
			while (row_pre != null && typeof row_pre.children[5].children[1] != 'undefined' && text_src == text_pre) {
				rowspan+=1
				if (row_pre.children[5].children[1].textContent=='HỦY' && row_pre.children[7]){
					TotalTT+=Number(row_pre.children[7].innerText.replace(/\D+/g, ''))
				}else{
					TotalTT-=0
				}
				const columns= [0,1,6,7]
				for(let j=0; j < columns.length; j++){
					row_pre.children[columns[j]].classList.add("rowspan-remove");
				}
				// show_print++
				/*--------------- add id print show --------------------- */
				let btn_chapnhan = row_pre.children[5].children[0]
				btn_chapnhan.textContent=='HOÀN THÀNH'? null : show_print++;
				row_pre.children[5].children[0].id = 'print'+id;
				cellToExtend.children[5].children[0].id = 'print'+id;
				cellToExtend.children[6].children[0].id = 'print'+id+'show';
				cellToExtend.setAttribute(`print${id}`, show_print);
				// console.log(btn_chapnhan.textContent,Number(show_print))
				/*-------- check show btn print --------- */
				if (row_pre.children[5].children[0].textContent !='CHẤP NHẬN' && row_pre.children[5].children[0].textContent !='HOÀN THÀNH'){
					let print = cellToExtend.children[6].children[0]
					//console.log('kkkkkkkkkkkkkk', rowspan)
					print.style.display = 'block';
					print.style.visibility = 'visible';
				}

				// console.log(rowspan)
				row_pre = row_pre.nextElementSibling
				try {
					text_pre = row_pre.children[0].textContent + row_pre.children[1].textContent
					
				} catch (error) {
					break;
				}
			};
			const columns= [0,1,6,7]
			for(let j=0; j < columns.length; j++){
				cellToExtend.children[columns[j]].setAttribute("rowspan", rowspan);
			};
			
			cellToExtend.children[7].innerHTML = TotalTT.format(0, 3, '.', ',') + ' <span style="color: yellow;"> ₫</span>'
			// console.log(show_print)
			if (TotalTT == 0){
				cellToExtend.children[6].children[0].style.display = ''
				cellToExtend.children[6].children[0].style.visibility = 'hidden'
			}
			TotalTT = 0
			row+=rowspan;
			rowspan = 0
			show_print=0;

		}
	}

}
function search_trangthai(){
	$('select').on('change', function (e) {
		var optionSelected = $("option:selected", this);
		var valueSelected = this.value;
		// alert(valueSelected);
		if (valueSelected =='Chấp Nhận'){
			// filterTable('CHẤP NHẬN', $("#table_order"));
		}});
}
//*-------------------- del row in table ------------------- */
function delrowtable_now(element_row_delete){
	clickFlag = 0;
	const row = element_row_delete.parentNode.parentNode
	element_row_delete=null
	let del_row = row.rowIndex
	let table = row.parentNode.parentNode
	table.deleteRow(del_row);
	if (table.tBodies[0].rows.length===0){table.style.display = "none";}
}
/*--------------------------- func search -------------------- */

function search_order(key, value){
	var input = document.querySelector(".table-search");
	var filter = input.value.toUpperCase();
	var table = document.querySelector("table.search");
	if(table){
		var tr = table.getElementsByTagName("tr");
		var td, tdArr, i, j;
		// console.log(filter)
		for (i = 0; i < tr.length; i++) {
			tdArr = tr[i].getElementsByTagName("td");
			for (j = 0; j < tdArr.length; j++){
				td = tdArr [j];
				if (td) {
					switch (key) {
						case 'MH':
							let text_sear = td.childNodes[0]
							text_sear =='' ?text_sear = td:null
							if (td.getAttribute('data-label') == "TÊN" && text_sear){
								if (text_sear.innerText.toUpperCase().indexOf(filter) > -1 ) {
									tr[i].style.display = "";
									break;
								} else {
									tr[i].style.display = "none";
								}
							}
							break;
						case 'moban':
							if (value!=='TC'){
								// value = value == "true" ? true : false
								
								if (td.querySelector('input')){
									// console.log($(td.querySelector('input')).is(":checked"), value);
									if(value=='true'){
										if ($(td.querySelector('input')).is(":checked") === true){
											tr[i].style.display = "";
										} else {
											tr[i].style.display = "none";
										}
									}else{
										if ($(td.querySelector('input')).is(":checked") === false){
											tr[i].style.display = "";
										} else {
											tr[i].style.display = "none";
										}
									}
										
										
								}
							}else{tr[i].style.display = "";}
							
							break;
						default:
							break;
					}
				}
			}
		}
	}	
}
function search_text_table(data){
	// var input = document.querySelector(".table-search");

	let value_search = data.date + data.custom + data.mathang
	// console.log('search text', value_search, data.action)

	// var input = value_search//'12:45:16, 6/2/2023Amazing Pizza1'
	// var filter = value_search.toUpperCase();
	var table = document.getElementById("table_order");
	if (table){
		var tr = table.getElementsByTagName("tr");
		var td, tdArr, i, j;
		for (i = 0; i < tr.length; i++) {
			var date_order = tr[i].querySelector('.date_order')
			var custom_order = tr[i].querySelector('.custom_order')
			var mathang_order = tr[i].querySelector('.mathang')
			if (dashboard_order != null && mathang_order != null){
				let result_order = date_order.textContent + custom_order.textContent + mathang_order.textContent
				if (value_search === result_order){
					// console.log('success',result_order,value_search)
					let e = null
					if (data.action.indexOf("(Chấp Nhận)") >=0){
						e = tr[i].children[5].children[1]
					}else if (data.action === 'IN HÓA ĐƠN') {
						e = tr[i].children[6].children[0]
					}else{
						e = tr[i].children[5].children[0]
					}
					call_client(data, e)
					break;
				}
			}
		}
	}
	
}



/*================================= Func logout ============================ */
async function fbLogout(){
	const res = await instance.delete('/logout');
    // //console.log(res)
	window.location.href = 'http://127.0.0.1:8100/login-order'
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

function randomAvatar() {
const avatarOptions = [
	'https://i.pravatar.cc/150?img=1',
	'https://i.pravatar.cc/150?img=2',
	'https://i.pravatar.cc/150?img=3',
	'https://i.pravatar.cc/150?img=4',
	'https://i.pravatar.cc/150?img=5',
	'https://i.pravatar.cc/150?img=6',
	'https://i.pravatar.cc/150?img=7',
	'https://i.pravatar.cc/150?img=8',
	'https://i.pravatar.cc/150?img=9',
	'https://i.pravatar.cc/150?img=10',
];
const randomIndex = Math.floor(Math.random() * avatarOptions.length);
return avatarOptions[randomIndex];
}
  
////////////////////////  func add html run script /////////////
function setInnerHTML(elm, html) {
	elm.innerHTML = html;
	
	Array.from(elm.querySelectorAll("script"))
	  .forEach( oldScriptEl => {
		const newScriptEl = document.createElement("script");
		
		Array.from(oldScriptEl.attributes).forEach( attr => {
		  newScriptEl.setAttribute(attr.name, attr.value) 
		});
		
		const scriptText = document.createTextNode(oldScriptEl.innerHTML);
		newScriptEl.appendChild(scriptText);
		
		oldScriptEl.parentNode.replaceChild(newScriptEl, oldScriptEl);
	});
  }

/*//////////////////////////////// Func chart /////////////////////////////*/ 
function generateDayWiseTimeSeries(baseval, count, yrange) {
	var i = 0;
	var series = [];
	while (i < count) {
		var x = baseval;
		var y =
		Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
	
		series.push([x, y]);
		baseval += 86400000;
		i++;
	}
	return series;
}


/*===================== func dropbox select search ===================*/
var clk = function() {
	var index = this.dataset.index;
	document.querySelector("#trang_thai").selectedIndex = index;
};
function clickElem(elem) {
    // Thx user1601638 on Stack Overflow (6/6/2018 - https://stackoverflow.com/questions/13405129/javascript-create-and-save-file )
    var eventMouse = document.createEvent("MouseEvents")
    eventMouse.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    elem.dispatchEvent(eventMouse)
}

////////////////////////////// Func Popup //////////////////////////
/*=================== Popup input ================*/

var $ = function (id)
  {
      return document.getElementById(id);
  }
async function openPopup(id, gateway, dns1, dns2){
    var timechat = new Date().toLocaleString()
    const thongbao = document.getElementsByClassName("poup_thongbao");
    thongbao[0].innerHTML = "[Hệ Thống] Set Gateway <p style='color: #00b627; font-size: 1.5rem;'>" + gateway + ' </p> thành công!<br>' + timechat
    const success = await loadingpoup()
    if (success){
        let checkboxid = document.querySelectorAll(".checkbox");
        //console.log('changegateway',gateway,dns1,dns2)
        
        checkboxid.forEach((item) =>
        item.checked = false);
        
        $(id,'','','').checked = true;
        $(id,'','','').checked = 'checked';
        
        // popup.classList.add("open-popup");
        document.getElementById("navbar").style.pointerEvents = "none";
        document.getElementById("cardinternet").style.pointerEvents = "none";
    }
    // closePopup()
    document.getElementById("cardinternet").style.pointerEvents = "All";
	document.getElementById("navbar").style.pointerEvents = "All";
}

/*================= event click outside element ============*/
const checkClickOutside = (element, target_el) => {
	document.addEventListener("click", (event) => {
		if (!element.contains(event.target)) {
			// console.log("Click outside of element");
			element.classList.remove("active")
			if(target_el)target_el.classList.remove('show')
			return element
		}
	});
}
var clickFlag = 1;
var specifiedElement = document.querySelector('.containerpopup')
document.addEventListener('click', function(event) {
	
	var isClickInside = specifiedElement.contains(event.target);
	// console.log(isClickInside)
	if (isClickInside) {
		//console.log('You clicked inside')
	}
	else {
		if(clickFlag === 1) {
			let datetime = document.querySelector('.flatpickr-calendar.open')
			let backdrop = document.querySelector('.backdrop').style.display
			if(backdrop =='block')return;
			if(datetime){return;}
			/* Hide element here */
			document.querySelector('.overlay').classList.remove('showoverlay');
			document.querySelector('.containerpopup .popup').classList.remove('open-popup');
			
		}else{
			clickFlag = 1;
		}
		//console.log('You clicked outside', clickFlag, isClickInside)
	}
})

/*----- func elment input validate for step by event ------- */
/* */
// onchange - onfocusout - onkeyup - input - number
function validateValue_str(event){
	const elem = event.target;
	const input_field = elem.parentNode
	const input= input_field.querySelector('.popup-input')
	const value = elem.value;
	if (input_field.querySelector('.ti-check')){
		if (!value){
			input.style.borderColor = 'red';
			input_field.querySelector('.ti-check').style.display='none';
			input_field.querySelector('.ti-alert').style.display='block';
			input_field.querySelector('.ti-alert').style.color='red';
			elem.classList.add('invalid')
			elem.classList.remove('valid')
		}else{
			input.style.borderColor = 'green';
			input_field.querySelector('.ti-check').style.display='block';
			input_field.querySelector('.ti-check').style.color = 'var(--green)';
			input_field.querySelector('.ti-alert').style.display='none';
			elem.classList.remove('invalid')
			elem.classList.add('valid')
		}
		// const note_price = elem.parentNode.querySelector('span')
		// if (note_price){note_price.innerHTML = money(Number(elem.value))}
	}
  }
/** */
// onkeypress - onfocusout - onkeyup - input - number
function validata_number_new(event){
	!/^\d*(\.\d+)?$|(Backspace|Control|Meta)/.test(event.key) && event.preventDefault()
	const elem = event.target;
	const input_field = elem.parentNode
	const input= input_field.querySelector('.popup-input')
	const value = elem.value;
	if (input_field.querySelector('.ti-check')){
		if ((elem.className).indexOf('phantram') !== -1){
			if (Number(elem.value)>0 && Number(elem.value)<=100){
				elem.classList.add('valid')
				elem.classList.remove('invalid')

				input.style.borderColor = 'green';
				input_field.querySelector('.ti-check').style.display='block';
				input_field.querySelector('.ti-check').style.color = 'var(--green)';
				input_field.querySelector('.ti-alert').style.display='none';
			}else {
				elem.classList.add('invalid')
				elem.classList.remove('valid')
				console.log('<100')

				input.style.borderColor = 'red';
				input_field.querySelector('.ti-check').style.display='none';
				input_field.querySelector('.ti-alert').style.display='block';
				input_field.querySelector('.ti-alert').style.color='red';
			}
		}else{
			if (!value){
				elem.classList.add('invalid')
				elem.classList.remove('valid')

				input.style.borderColor = 'red';
				input_field.querySelector('.ti-check').style.display='none';
				input_field.querySelector('.ti-alert').style.display='block';
				input_field.querySelector('.ti-alert').style.color='red';
			}else{
				elem.classList.add('valid')
				elem.classList.remove('invalid')

				input.style.borderColor = 'green';
				input_field.querySelector('.ti-check').style.display='block';
				input_field.querySelector('.ti-check').style.color = 'var(--green)';
				input_field.querySelector('.ti-alert').style.display='none';
			}

		}
	}
	const note_price = elem.parentNode.querySelector('span')
	if (note_price){note_price.innerHTML = money(Number(elem.value))}
	
}
//onfocusout - onchange
function validateValue_dropbox(event){
	const elem = event.target;
	// elem.addEventListener('change',function (evt) {
		let parentnode= elem.parentNode
		// console.log(elem.selectedIndex)
		const checked = parentnode.querySelector('.ti-check')
		const elem_check = elem.parentNode.querySelector('.ti-alert')
		if(elem.selectedIndex !== 0){
			checked.style.display= 'block';
			elem.style.borderColor ='green';
			css(elem_check, {
				'display': 'none',
			})
			elem.classList.remove('invalid');
		}else{
			checked.style.display= 'none';
			elem.style.borderColor ='red';
			css(elem_check, {
				'display': 'block',
				'color': 'red'
			});
			elem.classList.add('invalid');
		}
	// elem.addEventListener('blur',function (evt) {
	
	// });
}
/*----------- func onchange tick xanh chon bat ky ----------- */
//onfocusout - onchange
function validateValue_dropbox_green(event) {
	const dropbox_old = event.target;
	let parentnode= dropbox_old.parentNode
	const checked = parentnode.querySelector('.ti-check')
	const alert = parentnode.querySelector('.ti-alert')
	alert.style.display = 'none';
	checked.style.display= 'block';
	dropbox_old.style.borderColor = 'green';
}

/*--- func check min value ----*/
function validata_number_new_min(input, min){
	if(input){
		for (let i = 0; i < input.length; i++) {
			input[i].addEventListener('keyup', function(evt){
				if (this.value && this.value == 0){
					//console.log(this.value)
				}
			});

			
		}
	}
}

/*------ func check dup in table -------- */
function highlightDuplicates(table,colum_search,currentValues) {
	if(table && colum_search){
		var tempp = table.find(colum_search)
		for (var i = 0; i < tempp.length; i++){
			var thiss = tempp[i]
			// check if there is another one with the same value
			if (String(currentValues).toUpperCase()==thiss.innerText.toUpperCase()) {
				var notifier = new Notifier({
					position: 'top-left',
					direction: 'top',
				});
				var notification = notifier.notify("error", `Danh Mục <b>${thiss.innerText} đã tạo rồi!</b>`);
				notification.push();
				return false;
			};
		};
		return true;
	};
	return false;
}

/*------ func element dropbox validata ------- */
function validata_dropbox(dropbox_old){
	if(dropbox_old){
		for (let i = 0; i < dropbox_old.length; i++) {
			const option_first=  dropbox_old[i].querySelector('select').value
			// console.log(option_first)
			dropbox_old[i].addEventListener('change',function (evt) {
				if(dropbox_old[i].querySelector('select').value != option_first){
					const checked = dropbox_old[i].querySelector('.ti-check')
					checked.style.display= 'block'
				}else{
					const checked = dropbox_old[i].querySelector('.ti-check')
					checked.style.display= 'none'
				}
			});
		}
	}
}

/*---- FUNC DROPBOX chọn màu ------ */
// if check then add class check in querySelector(".selected-lang")
function dropbox_chonmau(){
	var optionMenu = document.querySelector(".lang-menu")
	if (optionMenu){
		var selectBtn = optionMenu.querySelector(".selected-lang"),
		options = optionMenu.querySelectorAll(".option"),
		sBtn_text = optionMenu.querySelector(".sBtn-text"),
		send_color = optionMenu.querySelector(".mathang"),
		sBtn_close = optionMenu.querySelector(".sBtn-close");
		/*-------------- check outsize dropbox ---------- */
		(optionMenu.parentNode.parentNode).addEventListener("click", (event) => {
			if (!optionMenu.contains(event.target)) {
				const valid = optionMenu.querySelector('.valid')
				const invalid = optionMenu.querySelector('.invalid')
				optionMenu.classList.remove("active");
				if (valid){
					selectBtn.style.borderColor = 'green';
					optionMenu.querySelector('.ti-check').style.display='block';
					optionMenu.querySelector('.ti-check').style.color = 'var(--green)';
					optionMenu.querySelector('.ti-alert').style.display='none';
				}
				if (invalid){
					selectBtn.style.borderColor = 'red';
					optionMenu.querySelector('.ti-check').style.display='none';
					optionMenu.querySelector('.ti-alert').style.display='block';
					optionMenu.querySelector('.ti-alert').style.color='red';
				}
			}
		});
		/*---------- event button clear ---------- */
		sBtn_close.addEventListener("click", () => {
			sBtn_text.innerText = 'Không chọn màu';
			send_color.style.backgroundColor= 'grey'
			sBtn_close.classList.remove("active")
			optionMenu.querySelector('.ti-check').style.display='none'
			const check = optionMenu.querySelector('.check')
			if (check){
				selectBtn.classList.add('invalid')
				selectBtn.classList.remove('valid')
			}
		});     
		/*------------- event choice -------- */
		options.forEach(option =>{
			option.addEventListener("click", ()=>{
				let selectedOption = option.querySelector(".option-text").innerText;
				let id = option.id
				let get_color = option.querySelector(".mathang")
				// var backgroundColor = window.getComputedStyle ? window.getComputedStyle(get_color, null).getPropertyValue("background-color") : get_color.style.backgroundColor;
				var color = $(get_color).css("background-color");
				
				send_color.style.backgroundColor= color
				sBtn_text.innerText = selectedOption;
				sBtn_text.id = id;
				optionMenu.classList.remove("active");
				sBtn_close.classList.add("active");

				optionMenu.querySelector('.ti-alert').style.display='none';
				optionMenu.querySelector('.ti-check').style.display='block';
				optionMenu.querySelector('.ti-check').style.color = 'var(--green)';
				selectBtn.style.borderColor = 'green';
				const invalid = optionMenu.querySelector('.invalid')
				if (invalid){selectBtn.classList.remove('invalid')}
				selectBtn.style.lineHeight = '0';				
			});
		});

		selectBtn.addEventListener("click", () => {
			optionMenu.classList.toggle("active")
		});
	}
}



/*-------- func get value row table ------- */
function getdata_table(table){
	var rows = table.rows,
	len = rows.length,
	data = [],
	cells;
	for (var n = 1; n < len; n++) {
		cells = rows[n].cells;
		temp ={
			k: cells[0].firstElementChild.innerText,
			v: cells[1].firstElementChild.value,
			DG: cells[2].firstElementChild.value
		};
		data.push(temp)
	}
	return data;
}
/*--------- func search value min max----------*/
function min(input) {
	if (toString.call(input) !== "[object Array]")  
	  return false;
 return Math.min.apply(null, input);
   }

// Lấy giá trị lớn nhất và nhỏ nhất
// var maxInNumbers = Math.max.apply(Math, numbers); 
// var minInNumbers = Math.min.apply(Math, numbers);
function min_max(myArray, item_search){
	// var myArray = [
	// 	{"ID": 1, "Cost": 200},
	// 	{"ID": 2, "Cost": 1000},
	// 	{"ID": 3, "Cost": 50},
	// 	{"ID": 4, "Cost": 500}
	// ]
	// There's no real number bigger than plus Infinity
	var lowest = Number.POSITIVE_INFINITY;
	var highest = Number.NEGATIVE_INFINITY;
	var tmp;
	for (var i=myArray.length-1; i>=0; i--) {
		tmp = myArray[i].Tonkho;
		if (tmp < lowest) lowest = tmp;
		if (tmp > highest) highest = tmp;
	}
	//console.log(typeof lowest)
	if (lowest === Infinity){
		lowest = '-'
	}
	return {max: highest, min: lowest};
}
// get color name su dung id
async function get_color(color_list, id) {
	let color={}
	if (!id){
		color ={
				name: 'Không chọn màu',
				color: 'grey'
			}
		
	}else{
		for (let index = 0; index < color_list.length; index++) {
			const element = color_list[index];
			if (`${id}` === `${element.id}`){
				color = {
					name: element.name,
					color: element.color
				}
				break;
			}		
		};
	}
	// console.log(id, color);
	return color;
	
}
// dùng cho NhomMH
async function clear_el(el) {
	let parent = el.parentNode.parentNode
	let id_MH = el.id
	let popup = parent.parentNode.parentNode
	let option = popup.querySelectorAll('li')
	/*-------------- func add option ------- */
	option.forEach(element => {
		// console.log(element.id, id_MH)
		if (element.id == id_MH){
			element.classList.remove("not_show");
			element.style.display = 'block'
			console.log('add')
		}
	});
	/*-------- func show label chon mat hang.... ----------- */
	let count = parent.querySelectorAll('div').length
	if (count === 1){
		parent.querySelector('.search_MH').setAttribute('placeholder', 'Chọn Mặt Hàng...');
	}else{
		parent.querySelector('.search_MH').setAttribute('placeholder', '');
	} 
	//giữ popup
	clickFlag =0;
	/*-------- func clear label ----------- */
	el.parentNode.remove();
	console.log(el.parentNode.id, el.parentNode)
	let temp_order ={
		id_nhomMH: el.parentNode.id,
		action: 'del_MH_form_nhom'
	}
	let res = await instance.post('/nhomMH', temp_order);

}
/*---------------------------------- func upload photo ------------------------------------- */
function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			$('#blah')
				.attr('src', e.target.result)
				
		};

		reader.readAsDataURL(input.files[0]);
	}
}





/////////////////////////////////////////////////////// SIDEBAR DROPDOWN ////////////////////////////////////////////////////////////////////

/*----------------------  event Nav btn ---------------------- */
let btn_nav = document.querySelectorAll('.btn-nav')
btn_nav.forEach(option =>{
	option.addEventListener("click", ()=>{
		let name_btn_nav = option.querySelector("div").innerText;
		console.log(name_btn_nav)
		switch_tab(name_btn_nav)
		
	});
});


const allDropdown = document.querySelectorAll('#sidebar .side-dropdown');
const sidebar = document.getElementById('sidebar');

allDropdown.forEach(item=> {
	const a = item.parentElement.querySelector('a:first-child');
	a.addEventListener('click', function (e) {
		e.preventDefault();

		if(!this.classList.contains('active')) {
			allDropdown.forEach(i=> {
				const aLink = i.parentElement.querySelector('a:first-child');

				aLink.classList.remove('active');
				i.classList.remove('show');
			})
		}

		this.classList.toggle('active');
		item.classList.toggle('show');
	})
})


// SIDEBAR COLLAPSE
const toggleSidebar = document.querySelector('nav .toggle-sidebar');
const allSideDivider = document.querySelectorAll('#sidebar .divider');
const allinfousers = document.querySelectorAll('#sidebar .infousers');

////////////////////////// check element resize ////////////////////////
// var box = $('#sidebar');
// new ResizeSensor(box, function(){
// 	// console.log(box[0].clientWidth);
// 	let widthel= box[0].clientWidth;
// 	if (widthel<=60){
// 		allinfousers.forEach(item=> {
// 			item.style.display = 'none';
// 		})
// 	}else{
// 		allinfousers.forEach(item=> {
// 			item.style.display = 'block';
// 		})
// 	}
// });
function show_hide_nav(){
	sidebar.classList.toggle('hide');
	if(sidebar.classList.contains('hide')) {
		allSideDivider.forEach(item=> {
			item.textContent = '-'
		})
		allDropdown.forEach(item=> {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('active');
			item.classList.remove('show');
			
		})
		allinfousers.forEach(item=> {
			item.style.display = 'none';
		})

		
	} else {
		allSideDivider.forEach(item=> {
			item.textContent = item.dataset.text;
		})
		allinfousers.forEach(item=> {
			item.style.display = 'block';
		})
	}
}
// hide sidebar
// show_hide_nav();

toggleSidebar.addEventListener('click', function () {
		
	sidebar.classList.toggle('hide');
	if(sidebar.classList.contains('hide')) {
		allSideDivider.forEach(item=> {
			item.textContent = '-'
		})
		allDropdown.forEach(item=> {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('active');
			item.classList.remove('show');
			
		})
		allinfousers.forEach(item=> {
			item.style.display = 'none';
		})

		toggleSidebar.classList.remove('ti-shift-left');
		toggleSidebar.classList.add('ti-shift-right');
		
	} else {
		allSideDivider.forEach(item=> {
			item.textContent = item.dataset.text;
		})
		allinfousers.forEach(item=> {
			item.style.display = 'block';
		})

		toggleSidebar.classList.remove('ti-shift-right');
		toggleSidebar.classList.add('ti-shift-left');
	}
})

sidebar.addEventListener('mouseleave', function () {
	if(this.classList.contains('hide')) {
		allDropdown.forEach(item=> {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('active');
			item.classList.remove('show');
		})
		allSideDivider.forEach(item=> {
			item.textContent = '-'
		})
		allinfousers.forEach(item=> {
			item.style.display = 'none';
		})
	}
})

sidebar.addEventListener('mouseenter', function () {
	
	if(this.classList.contains('hide')) {
		allDropdown.forEach(item=> {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('active');
			item.classList.remove('show');
		})
		allSideDivider.forEach(item=> {
			item.textContent = item.dataset.text;
		})
		allinfousers.forEach(item=> {
			item.style.display = 'block';
		})
	}
})

// PROFILE DROPDOWN
const profile = document.querySelector('nav .profile');
const imgProfile = profile.querySelector('.photousername');
const dropdownProfile = document.querySelector('.profile .profile-link');

imgProfile.addEventListener('click', function () {
	dropdownProfile.classList.toggle('show');
})

// MENU
const allMenu = document.querySelectorAll('main .content-data .head .menu');

allMenu.forEach(item=> {
	const icon = item.querySelector('.icon');
	const menuLink = item.querySelector('.menu-link');

	icon.addEventListener('click', function () {
		menuLink.classList.toggle('show');
		
	})
})
checkClickOutside(imgProfile, dropdownProfile)
// window.addEventListener('click', function (e) {
	
// 	if(e.target !== imgProfile) {
// 		if(e.target !== dropdownProfile) {
// 			if(dropdownProfile.classList.contains('show')) {
// 				// dropdownProfile.classList.remove('show');
// 			}
// 		}
// 	}

// 	allMenu.forEach(item=> {
// 		const icon = item.querySelector('.icon');
// 		const menuLink = item.querySelector('.menu-link');

// 		if(e.target !== icon) {
// 			if(e.target !== menuLink) {
// 				if (menuLink.classList.contains('show')) {
// 					// menuLink.classList.remove('show')
// 				}
// 			}
// 		}
// 	})
// })


const mode = document.getElementById("mode");
mode.checked = true;

mode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})


 