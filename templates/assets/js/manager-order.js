// import axios from 'axios';
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

//load script
// jQuery.loadScript = function (url, callback) {
//     jQuery.ajax({
//         url: url,
//         dataType: 'script',
//         success: callback,
//         async: true
//     });
// }

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
	$('.theme-loader').fadeOut('slow', function() {
		$(this).remove();
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
	// return Promise.reject(err)
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
	return `<b style="white-space: nowrap;">${Number(number).format(0, 3, '.', ',')}<span style="color: yellow;"> ₫</span></b>`
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

/*------ func covert date form database to VN chỉ dùng cho font-end ------------*/
function convert_dateToVN(date) {
	let Date_convert = date
	var dateString = Date_convert.split(' ')[0];
	var datetime_string = Date_convert.split(' ')[1];
	var dateParts = dateString.split('-').reverse().join('/');
	Date_convert = dateParts +" "+ datetime_string
	// console.log(Date_convert)
	return Date_convert
}
/*------ func covert date form database to VN chỉ dùng khi gửi về backend ------------*/
function convert_dateToUS(date) {
	let Date_convert = date
	var dateString = Date_convert.split(' ')[0];
	var datetime_string = Date_convert.split(' ')[1];
	var dateParts = dateString.split('/').reverse().join('-');
	Date_convert = dateParts +" "+ datetime_string
	// console.log(Date_convert)
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
var DM = localStorage.getItem('danhmuc')

let interval = {};
let color_list;
let role_order;
let temp_order={action: 'role'};

//test tính giờ
// let price_bia = 50000
// let timer = 15*60
// // let sophut = price_bia/60;
// let gia_motphut = (Number(price_bia)/60);
// let TTien = timer * gia_motphut
// console.log(TTien, gia_motphut)

/*--------------------------- begin func ----------------------- */
const main = async ()=>{
	// let temp_order={action: 'color'};
	color_list = await instance.post('/tuychinh', temp_order);
	role_order = color_list.data.role_order[0]
	color_list = color_list.data
	// console.log(color_list, role_order)
	
	let input_search = document.querySelector('.form-group .table-search')
	input_search.addEventListener('keyup',function (evt) {search_order('MH')});
	// console.log('data', color_list)
	window.onload = async function(){
		if (tab){switch_tab(tab,id)}
		else{switch_tab('Mặt Hàng')};
		// switch_tab('Mặt Hàng')
	}
}
main()

/*================= Dashboard chuyển tab của sidebar =============*/
async function switch_tab(e, id) {
	document.querySelector('.show_btn_back').innerHTML =''
	const main = document.getElementById('main');
	/*--------------- hidde giỏ hang -------------------------- */
	main.style.paddingRight = '0';
	main.innerHTML =''
	// DM = "e.getAttribute('DM')"
	// console.log(e, DM)
	if (typeof e.textContent !=='undefined'){e = e.textContent;}
	localStorage.setItem('tab', e, id)
	localStorage.setItem('id', id)
	// localStorage.setItem('danhmuc',DM)
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
	// get menu
	var dropbox = await instance.post('/dropbox');
	var danhmuc = dropbox.data.danhmuc
	var mathang = dropbox.data.mathang
	var nhom = dropbox.data.nhom
	var NV = dropbox.data.nhanvien
	var nguyenlieu = dropbox.data.nguyenlieu

	var html='',el, btn_date,id_ca,tmp,
	temp, res, value, temp_orders,sortedList_MH,sortedList_NV,
	sortedList,btn,nhom_MH,NL,dates, action, MH, moban,
	temp,get_MH;
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

			// test background task
			// temp = {action: ''}
			// res = await instance.post(`/send-notification/${user_login}`, temp);
			
		break;
		case 'Máy Trạm':
			await header('Máy Trạm');
			/*--------------- show content DM ----------------------- */
			html += `<div class="menu_list" style="margin-bottom: 5px; margin-top: 5px; ">
						<div class="dropdown" style="margin-top:5px;">
							<div class="drop_btn nut_dropdown" titles="DM_MAYTRAM" item="May_tram"><i class="ti-desktop"></i>Máy Trạm</div>
						</div>

						<div class="dropdown" style="margin-top:5px;">
							<div class="drop_btn nut_dropdown" titles="DM_MAYTRAM" item="Hoi_vien"><i class="fa fa-users" aria-hidden="true" style="margin-right: -5px;"></i>Tài Khoản</div>
						</div>

						<div class="dropdown" style="margin-top:5px;">
							<div class="drop_btn nut_dropdown" titles="DM_MAYTRAM" item="history_system"><i class="ti-pencil-alt"></i>Nhật ký hệ thống</div>
						</div>

						<div class="dropdown" style="margin-top:5px;">
							<div class="drop_btn nut_dropdown" titles="DM_MAYTRAM" item="history_transaction"><i class="ti-pencil-alt"></i></i>Nhật ký giao dịch</div>
						</div>
						<div class="dropdown" style="margin-top:5px;">
							<div class="drop_btn nut_dropdown" titles="DM_MAYTRAM" item="nhom_may"><i class="ti-layout-grid2"></i>Nhóm máy</div>
						</div>
						<div class="dropdown" style="margin-top:5px;">
							<div class="drop_btn nut_dropdown" titles="DM_MAYTRAM" item="nhom_user"><i class="fa fa-users" aria-hidden="true" style="margin-right: -5px;"></i>Nhóm người dùng</div>
						</div>

						<div class="dropdown" style="margin-top:5px;">
							<div class="drop_btn nut_dropdown" titles="DM_MAYTRAM" item="ql_app"><i class="ti-na"></i>Khống chế ứng dụng</div>
						</div>

						<div class="dropdown" style="margin-top:5px;">
							<div class="drop_btn nut_dropdown" titles="DM_MAYTRAM" item="anti_web"><i class="ti-na"></i>Khống chế Website</div>
						</div>

						<div class="dropdown" style="margin-top:5px;">
							<div class="drop_btn nut_dropdown" titles="DM_MAYTRAM" item="history_web"><i class="ti-pencil-alt"></i>Nhật ký Website</div>
						</div>

						<div class="dropdown" style="margin-top:5px;">
							<div class="drop_btn nut_dropdown" titles="DM_MAYTRAM" item="anti_timer"><i class="ti-pencil-alt"></i>Khống chế thời gian</div>
						</div>

					</div>`
			html+= `<div id="table_bia"></div>`
			var show_contentDM = document.getElementById('show_contentDM');
			show_contentDM.innerHTML = '';
			show_contentDM.insertAdjacentHTML("afterbegin",html)


			/*----------- func event them ban -------------- */
			btn = main.querySelectorAll('.menu_list .dropdown')
			btn.forEach((el, i) => {
				el.addEventListener('click',async function (evt) {
					btn.forEach((el, i) => {el.classList.remove('active')})
					this.classList.add('active')
					const selectObject = this.childNodes;
					var title = this.childNodes[1].getAttribute('titles');
					var dict = this.childNodes[1].getAttribute('item');
					await render_rows(dict, 'DM_MAYTRAM')
					// if(dict=='add_bia' || dict=='config_ban'){
					// 	// call_popup(title, dict, selectObject)
					// }else if(dict=='May_tram') {
					// 	/*------------ render row ---------------- */
					// 	await render_rows(dict, 'DM_MAYTRAM')
					// }else if(dict=='Hoi_vien') {
					// 	/*------------ render row ---------------- */
					// 	await render_rows(dict, 'DM_MAYTRAM')
					// }
				});
			});
			
			/*------------ render row ---------------- */
			// await render_rows('May_tram', 'DM_MAYTRAM')
			await render_rows('nhom_may', 'DM_MAYTRAM')
			
		break;
		case 'Bi-a':
			await header('Bi-a');
			/*--------------- show content table ----------------------- */
			html += `<div class="menu_list" style="margin-bottom: 5px; margin-top: 5px; ">
						<div class="dropdown">
							<div class="drop_btn nut_dropdown" titles="DM_BIA" item="table_bia"><i class="ti-more-alt"></i>Bàn Bi-a</div>
						</div>
						<div class="dropdown">
							<div class="drop_btn nut_dropdown" titles="DM_BIA" item="add_bia"><i class="ti-layout-grid2"></i>Thêm Bàn Bi-a</div>
						</div>

						<div class="dropdown">
							<div class="drop_btn nut_dropdown" titles="DM_BIA" item="config_ban"><i class="ti-layout-grid2"></i>Chỉnh sửa Bàn Bi-a</div>
						</div>

						<div class="dropdown">
							<div class="drop_btn nut_dropdown" titles="DM_BIA" item="history_bia"><i class="ti-pencil-alt"></i>Nhật ký bàn Bi-a</div>
						</div>
					</div>`
			html+= `<div id="table_bia"></div>`
			show_contentDM = document.getElementById('show_contentDM');
			show_contentDM.innerHTML = '';
			show_contentDM.insertAdjacentHTML("afterbegin",html)

			/*----------- func event them ban -------------- */
			btn = main.querySelectorAll('.menu_list .dropdown')
			btn.forEach((el, i) => {
				el.addEventListener('click',async function (evt) {
					btn.forEach((el, i) => {el.classList.remove('active')})
					this.classList.add('active')
					const selectObject = this.childNodes;
					var title = this.childNodes[1].getAttribute('titles');
					var dict = this.childNodes[1].getAttribute('item');
					if(dict=='add_bia' || dict=='config_ban'){
						call_popup(title, dict, selectObject)
					}else if(dict=='table_bia') {
						/*------------ render row ---------------- */
						await render_rows('BAN_BI-A', 'DM_BIA')
					}else if(dict=='history_bia') {
						/*------------ render row ---------------- */
						await render_rows('History_BIA', 'DM_BIA')
					}
				});
			});

			/*------------ render row ---------------- */
			await render_rows('BAN_BI-A', 'DM_BIA')
			
		
			
		break;
		case 'Đơn Hàng':
			await header("Đơn Hàng");
			
			html += `<div class="order_search" style="display: flex; width:100%; gap:5px; margin-bottom: 5px;">`//padding-bottom:15px;
			
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
				danhmuc.sort((a, b) =>a.name_DM.localeCompare(b.name_DM));
				danhmuc.forEach(function(element, index){
					html+= `<li class="option" id="${element.id_DM}" style="padding: 5px;">${element.name_DM}</li>`
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
					mathang.sort((a, b) =>a.name_MH.localeCompare(b.name_MH));
					mathang.forEach(function(element, index){
						html+= `<li class="option" id="${element.id_MH}" style="padding: 5px;">${element.name_MH}</li>`
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
					nhom.sort((a, b) =>a.name_nhom.localeCompare(b.name_nhom));
					nhom.forEach(function(element, index){
						html+= `<li class="option" id="${element.id_nhom}" style="padding: 5px;">${element.name_nhom}</li>`
					})		
			html+=`</ul>
					<i class="ti-check"></i>
					<i class="ti-alert"></i>
				</div>`
			
			html += `</div>`
					
			html +='<div class="table_responsive DH" id="main_table">'
			// class="paginated"
			html +='<table cellspacing="0" cellpadding="0" id="table_order"  class="table table-inverse table-bordered paginated search" >'//style="border-spacing: 5px"
			html +='	<thead>'
			html +='	<tr style="white-space: nowrap;">'
			html +='		<th>THỜI GIAN</th>'
			html +='		<th>VỊ TRÍ</th>'
			html +='		<th style="min-width:220px;">MẶT HÀNG</th>'
			html +='		<th style="text-align: center;">TT</th>'
			html +='		<th>Số Lượng</th>'
			html +='		<th style="text-align: center;">THAO TÁC</th>'
			html +='		<th style="max-width: 100px;">IN</th>'
			html +='		<th style="max-width: 200px; text-align: right;">THANH TOÁN</th>'
			html +='	</tr>'
			html +='	</thead>'
			html +='	<tbody id="list_order">'
		

			html += '</tbody>'
			html += '</table>'
			html += '</div>'
			/*-------- show chon page ------- */
			html += `  <div class="pagination">
							<ul> <!--pages or li are comes from javascript --> </ul>
						</div>`

			show_contentDM = document.getElementById('show_contentDM');
			show_contentDM.innerHTML = '';
			show_contentDM.insertAdjacentHTML("afterbegin",html)
			
			/*---------- func show table list_order -------------- */
			temp_order ={title: 'Search_all', val_search: ''}
			await createPagination(totalPages, page_table, temp_order)
			//* -------------------- func dropbox loc ----------------------*/
			await dropbox_trangthai()
			// window.onload = function(){
				
			// }
			
			/*======= listen func dung nhận đơn kết thúc ca ===============*/ 
			// var dropdownBtn = document.querySelectorAll('.drop_btn');
			// var iconDrop = null;
			// var lastOpened = null; //Add this for toggling dropdown
			// dropdownBtn.forEach(btn => btn.addEventListener('click', function() {
			// 	var dropCont = this.nextElementSibling;
			// 	let icon = this.querySelector('.fa-angle-up');
			// 	try{
			// 		icon.classList.toggle("down");
			// 		dropCont.classList.toggle("show");

			// 		//Add this for toggling dropdown
			// 		if (lastOpened && lastOpened !== dropCont)
			// 			lastOpened.classList.remove("show");
			// 			lastOpened = dropCont;

			// 		if (iconDrop && iconDrop !== icon)
			// 			iconDrop.classList.remove("down");
			// 		iconDrop = icon;
			// 	}catch{}
				
			// }));

			
		break;
		case 'Tạo Đơn Hàng':
			//clear gio hàng trước khi tạo giỏ mới
			list_giohang = []
			// contain_old = main.innerHTML
			// back_pages = "Đơn Hàng"
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
			// console.log	(Show_MH.data)
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
			//*-------------- func menu (search) có liên quan đến timer ---------*/
			let btn_search = document.querySelectorAll('.list_danhmuc .course-item')
			btn_search.forEach(el => {
				el.addEventListener('click',function (evt) {
					let name_search = el.id //.getAttribute('DM')
					const dashboard_card = document.querySelectorAll('.dashboard-card')
					const title = document.querySelector('.header span')
					dashboard_card.forEach(element => {
						let DMcha = element.getAttribute('DM')
						let TIMEOPEN = element.getAttribute('TIMEOPEN')
						let DMOPEN = element.getAttribute('DMOPEN')
						let MHOPEN = element.getAttribute('MHOPEN')
						// console.log(TIMEOPEN)
						if(TIMEOPEN=='true' && DMOPEN == "checked" && MHOPEN == "checked"){
							if(name_search == "TC"){
								element.style.display='';
							}else{
								 DMcha == name_search?element.style.display='' : element.style.display='none';
							}
						}			
						title.innerHTML = el.querySelector('.headers').innerText;
						// console.log(el.querySelector('.headers').innerText)
					});
				});
			});
		break;
		case 'Thống Kê':
			/*----------------------- Thông kê Ngày ------------------------ */
			const d = new Date();
			let months = d.getMonth()+1;
			html += `<div class="Chart">
						<div class="Top10" style="background: #000524; width: 100%;">
							<div>
								<span>Top 10 Mặt Hàng Theo Tháng</span>
						<div class='buttons'>`
								for (let index = 1; index <= months; index++) {
									let month = `${index}`;
									if(index==months)
										html+=`<button class='active' id='${month}'>${month}</button>`
									else
										html+=`<button id='${month}'>${month}</button>`
								}	
			html+=		`</div>
								<span>Tháng</span>
							</div>
							<div id="Top10" style="width: 100%;"></div>
						</div>
			
					</div>`
			/*--------------------------- Tổng doanh thu ngày ---------------------------- */
			html+=`	<div class="info-data" style="margin: 20px 0;">
						<div class="card">
							<div class="head">
								<div>
									<h2 id="card_1_h2">0 ₫</h2>
									<p>Tổng Doanh Thu</p>
								</div>
								<i class='bx bx-trending-up icon' ></i>
							</div>
							<span class="progress" id='card_1_progress' data-value="100%"></span>
							<span class="label" id='card_1_label'>0%</span>
						</div>

						<div class="card">
							<div class="head">
								<div>
									<h2 id="card_2_h2">0 ₫</h2>
									<p>DT Dịch Vụ/Ngày</p>
								</div>
								<i class='bx bx-trending-up icon' ></i>
							</div>
							<span class="progress" id='card_2_progress' data-value="0%"></span>
							<span class="label" id='card_2_label'>0%</span>
						</div>

						<div class="card">
							<div class="head">
								<div>
									<h2 id="card_3_h2">0 ₫</h2>
									<p>Tiền Nạp Giờ Chơi/Ngày</p>
								</div>
								<i class='bx bx-trending-up icon' ></i>
							</div>
							<span class="progress" id='card_3_progress' data-value="0%"></span>
							<span class="label" id='card_3_label'>0%</span>
						</div>

						<div class="card">
							<div class="head">
								<div>
									<h2 id="card_4_h2">0</h2>
									<p>Đơn Hàng/Ngày</p>
								</div>
								<i class='bx bx-trending-up icon' ></i>
							</div>
							<span class="progress" id='card_4_progress' data-value="30%"></span>
							<span class="label" id='card_4_label'>0%</span>
						</div>

					</div>`
			/*----------------------- xếp hang ------------------------------- */
			html += `<div class="Chart" >
						<div class="Hightchart" style="background: #000524; margin-bottom: 20px; width:100%;">
							<div>
								<span>Xếp Hạng</span>

								<div class="date-form" style="display: grid;
																grid-template-columns: repeat(auto-fit, minmax(150px, 250px));
																grid-gap: 20px 20px;
																width:70%;margin-left: 20px;">
									<div class="input-field date-form" style="margin:0; padding:0;">
										<label style="top: 0;background: var(--background);">Từ Ngày</label>
										<input class="popup-input invalid" type="datetime-local" id="date_begin" style="width: 100%; margin:0;" onchange="validateValue_str(event);">
										
									</div>
									<div class="input-field date-form" style="margin:0; padding:0;">
										<label style="top: 0;background: var(--background);">Đến Ngày</label>
										<input class="popup-input invalid" type="datetime-local" id="date_end" style="width: 100%; margin:0;" onchange="validateValue_str(event);">
									</div>
									
									<button type="button" class="date_search"><i class="ti-check-box"> </i>ÁP DỤNG</button>
								</div>

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
							<div id="chart-area" style="border: none;margin-bottom:-45px;"></div>
							<div id="chart-bar" style="border: none;margin-top:0;"></div>
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
			
		
			temp = {action: "Top_MH"}
			res =  await instance.post('/thongke', temp);
			const data_list = res.data
			console.log(res.data,data_list.Total_DV)
			const values = data_list.top10
			const cardDT = data_list.TotalDT
			const DT30 = data_list.Total_DV
			const list_newloc = values[4].slice()
			/*-------------- Thống kê top 10  ----------------- */
			async function BD_top10 () {
				var listop = JSON.stringify(values)
				listop = JSON.parse(listop)
				// convert data 
				//dung cho dict
				async function convert_to_array(values) {
					var data ={};
					Object.entries(values).forEach(([key, value]) => {
						// const element = values[key];
						let array =[];
						for (let index = 0; index < value.length; index++) {
							const element = value[index];
							array.push(Object.values(element))
						}
						// console.log(value)
						data[key] = array
					});
					return data
				}
				let data = await convert_to_array(listop);

				// const waitFor = (ms) => new Promise(r => setTimeout(r, ms))
				// const asyncForEach = async (array, callback) => {
				// for (let index = 0; index < array.length; index++) {
				// 	await callback(array[index], index, array)
				// }
				// }

				// const start = async () => {
				// await asyncForEach([1, 2, 3], async (num) => {
				// 	// await waitFor(50)
				// 	console.log(num)
				// })
				// console.log('Done')
				// }

				// start()
				

				// console.log(data)
				const dataPrev =data;
				//dùng cho array
				// const getData =  data => data.map((country, i) => ({
				// 	name: country[0],
				// 	y: country[1],
				// 	color: country[2]
				// }));
				// 
				const getData = (myArray) => {
					const promises = myArray.map(async (myValue) => {
						return {
							name: myValue[0],
							y: myValue[1],
							color: (await get_color(color_list, myValue[3])).color
						}
					});
					return Promise.all(promises);
				}
				const countries = await getData(data[months].slice())
				// console.log(countries)

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
						dataSorting: {
							enabled: true,
							matchByName: true
						},
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
						headerFormat: '<span style="font-size: 18px"><b>{point.point.name}</b></span><br/>',
						pointFormat: '<span style="color:{point.color};font-size:22px;">\u25CF</span> <b style="font-size: 16px;">{series.name}: {point.y} đơn</b><br/>'
					},
					xAxis: {
						type: 'category',
						accessibility: {
							description: 'Countries'
						},
						max: countries.length >10? 9: countries.length-1,
						labels: {
							useHTML: true,
							animate: true,
							formatter: ctx => {
								let flag;
								countries.forEach(function (country) {
									if (country.name === ctx.value) {
										flag = country.name;
									}
								});
								try {
									// lỗi liên quan đến lenght list MH các tháng khác nhau
									return `${flag.toUpperCase()}<br><span class="f32">
										<span class="flag ${flag}"></span>
									</span>`;
								} catch (error) {
									// lỗi liên quan đến lenght list MH các tháng khác nhau
									return `${ctx.value.toUpperCase()}<br><span class="f32">
										<span class="flag ${ctx.value}"></span>
									</span>`;
								}
								
							},
							// rotation: -45,
							style: {
								fontSize: '14px',
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
						data: Number(months)!=1? dataPrev[Number(months)-1].slice(): dataPrev[months].slice(),
						name: `Tháng ${months-1}`
					}, {
						name: `Tháng ${months}`,
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
						data: await getData(data[months].slice())
					}],
					exporting: {
						allowHTML: false
					},
					credits: {
						enabled: false
					},
					});
				var btn_top = document.querySelectorAll('.Chart .buttons button');
				btn_top.forEach(element => {
					element.addEventListener('click', async () => {
						element.classList.add('active');
						let btn_active = document.querySelectorAll('.buttons button.active')
						for (let index = 0; index < btn_active.length; index++) {
							const element = btn_active[index];
								element.classList.remove('active');
							};
						element.classList.add('active');
				
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
							xAxis: {
								max: (data[element.id]).length >10? 9: (data[element.id]).length-1,
							},
							series: [{
								name: Number(element.id)!=1? `Tháng ${Number(element.id)- 1}`:`Tháng ${Number(element.id)}` ,
								data: Number(element.id)!=1? dataPrev[Number(element.id)-1].slice(): dataPrev[element.id].slice()
							}, {
								name: `Tháng ${element.id}`,
								data: await getData(data[element.id].slice())
							}]
						}, true, false, {
							duration: 800
						});
					});
					});
			};
			/*-------------- show card Doanh Thu ----------------- */
			async function BD_DT () {
				// const cardDT = res.data.TotalDT
				const date_current = cardDT.date_current[0]
				const date_yesterday = cardDT.date_yesterday[0]
				const TongDT = document.querySelector('#card_1_h2')
				const Donhang = document.querySelector('#card_4_h2')
				const phantramDT = document.querySelector('#card_1_label')
				const proccessbarDT = document.querySelector('#card_1_progress')
				console.log(typeof date_current)

				typeof (date_current) == 'undefined'? TongDT.innerHTML = money(0) : TongDT.innerHTML = money(date_current.DoanhThu)
				var phantramDTs = 0
				
				typeof (date_current) == 'undefined'? null : phantramDTs =  ((date_current.DoanhThu *100)/date_yesterday.DoanhThu).toFixed(2)
				typeof (date_yesterday) == 'undefined'? phantramDTs = 100 : null

				phantramDT.innerHTML = phantramDTs+"%"
				proccessbarDT.style.setProperty('--value',  phantramDTs+"%");

				var DT_dichvu_val = 0;
				typeof (date_current) == 'undefined'? null : DT_dichvu_val = date_current.DT_dichvu
				const DT_dichvu = document.querySelector('#card_2_h2')
				DT_dichvu.innerHTML = money(DT_dichvu_val)
				var phantramDT_dichvu = 0;
				typeof (date_current) == 'undefined'? null : phantramDT_dichvu = ((date_current.DT_dichvu *100)/date_yesterday.DT_dichvu).toFixed(2)
				typeof (date_yesterday) == 'undefined'? phantramDT_dichvu = 100 : null

				const DT_dichvuphantram = document.querySelector('#card_2_label')
				DT_dichvuphantram.innerHTML = phantramDT_dichvu+'%'
				const proccess_dichvu = document.querySelector('#card_2_progress')
				proccess_dichvu.style.setProperty('--value', phantramDT_dichvu+'%')

				
				typeof (date_current) == 'undefined'? Donhang.innerHTML = 0 : Donhang.innerHTML = date_current.SLDH
				var phantramsls = 0;

				typeof (date_current) == 'undefined'? null : phantramsls = ((date_current.SLDH *100)/date_yesterday.SLDH).toFixed(2)
				typeof (date_yesterday) == 'undefined'? phantramsls = 100 : null

				const phantramsl = document.querySelector('#card_4_label')
				phantramsl.innerHTML = phantramsls+"%"
				const proccess_sl = document.querySelector('#card_4_progress')
				proccess_sl.style.setProperty('--value', phantramsls+"%")
			};
			
			/*----------------- Chart ----------------------*/
			async function BD_thongkeDTPM () {
				// var data1 = generateDayWiseTimeSeries(new Date("22 Apr 2017").getTime(), 115, {
				// 	min: 30,
				// 	max: 90
				// });
				// var data2 = generateDayWiseTimeSeries(new Date("22 Apr 2017").getTime(), 115, {
				// min: 10,
				// max: 99
				// });
				
				// console.log(DT30[0])
				var datedd = new Date();
				datedd.setDate(d.getDate() - 7);
				// console.log(new Date('2023-04-15').getTime(), datedd.getTime())
				
				let DT30_tmp=[]
				let DT_DV=[]
				for (let index = 0; index < DT30.length; index++) {
					const element = DT30[index];
					DT30_tmp.push([new Date(element.date).getTime(),element.DoanhThu])
					DT_DV.push([new Date(element.date).getTime(),element.DT_dichvu])
				};
				// console.log(DT30_tmp)
				
				var options1 = {
				series: [{
							name: 'Doanh Thu Dịch Vụ',
							data: DT30_tmp
							}, {
							name: 'Doanh Thu Phòng Máy',
							data: DT_DV
							}],
					legend: {
					show: false
				},
				colors: ["#008000", "#FF0000"],
				chart: {
					id: "chart2",
					type: "area",
					height: 255,
					width: '100%',
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
					defaultLocale: 'vi',
					locales: [{
						"name": "vi",
						"options": {
						"months": ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
						"shortMonths": ["Th1", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7", "Th8", "Th9", "Th10", "Th11", "Th12"],
						"days": ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"], //hãy nhớ rằng chủ nhật là ngày đầu tuần nhé
						"shortDays": ["CN", "t2", "t3", "t4", "t5", "t6", "t7"],
						"toolbar": { //tooltip hiển thị khi bạn hover vào các icon tương ứng
							"exportToSVG": "Tải định dạng SVG",
							"exportToPNG": "Tải định dạng PNG",
							"zoomIn": "Phóng to",
							"zoomOut": "Thu nhỏ",
							"pan": "Panning", //cái này mình cũng ko biết dịch sao, đại loại là bạn sẽ click chọn 1 vùng thì sẽ phóng to vùng đấy lên 
							"reset": "Cài đặt lại"
						}
						}
					}],
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
					theme: "dark",
					y: {
						formatter: function (val) {
						return "DT: " + money(val)
						},
						title: {
						formatter: function (seriesName) {
							return seriesName + "<br/>"
						},
						},
					},
					x: {
						show: true,
						format: "dd MMM yyyy",
						formatter: function (value,{ series, seriesIndex, dataPointIndex, w }) {
								return (new Date(value).toLocaleString("vi-VN")).split(' ')[1];
							},
						},
					style: {
						fontSize: '14px',
						fontFamily: undefined
					},
				},
				xaxis: {
					type: "datetime",//category,datetime
					// tooltip: {
					//   enabled: false
					// }
					axisBorder: {
						show: true,
						color: "rgba(98, 98, 98, 0.83)",
						height: 1,
						width: '100%',
						offsetX: 0,
						offsetY: 0
					},
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
					tickAmount: 9,
					labels: {
						formatter: function(value) {
						var val = Math.abs(value)
						if (val >= 1000) {
							val = (val / 1000).toFixed(0) + ' K'
						}
						return val
						}
					}
				},
				
				};
				var options2 = {
					chart: {
						id: "chart1",
						height: 150,
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
							min: datedd.getTime(),
							max: new Date().getTime()
						}
						}, 
						
						defaultLocale: 'vi',
						locales: [{
							"name": "vi",
							"options": {
								"months": ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
								"shortMonths": ["Th1", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7", "Th8", "Th9", "Th10", "Th11", "Th12"],
								"days": ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"], //hãy nhớ rằng chủ nhật là ngày đầu tuần nhé
								"shortDays": ["CN", "t2", "t3", "t4", "t5", "t6", "t7"],
								"toolbar": { //tooltip hiển thị khi bạn hover vào các icon tương ứng
									"exportToSVG": "Tải định dạng SVG",
									"exportToPNG": "Tải định dạng PNG",
									"zoomIn": "Phóng to",
									"zoomOut": "Thu nhỏ",
									"pan": "Panning", //cái này mình cũng ko biết dịch sao, đại loại là bạn sẽ click chọn 1 vùng thì sẽ phóng to vùng đấy lên 
									"reset": "Cài đặt lại"
								}
							}
						}],
					},
					colors: ["#008000", "#FF0000"],
					series: [
						{
						name: 'Doanh Thu Dịch Vụ',
						data: DT30_tmp
						},
						{
						name: 'Doanh Thu Phòng Máy',
						data: DT_DV
						}
					],
					stroke: {
						
						width: 0.5
					},
					grid: {
						borderColor: "rgba(98, 98, 98, 0.13)",
						clipMarkers: false,
						yaxis: {
						lines: {
							show: true,
							// width: 0.5
						}, 
						row: {
							colors: undefined,
							opacity: 0.2
						},  
						}
					},
					// grid: {
					// 	borderColor: "#444"
					// },
					markers: {
						size: 0
					},
					xaxis: {
						type: "datetime",
						axisBorder: {
							show: true,
							color: "rgba(98, 98, 98, 0.83)",
							height: 1,
							width: '100%',
							offsetX: 0,
							offsetY: 0
						},
						tooltip: {
						enabled: false
						}
					},
					// yaxis: {
					// 	tickAmount: 2
					// }
					yaxis: {
						min: 0,
						tickAmount: 4,
						labels: {
							formatter: function(value) {
							var val = Math.abs(value)
							if (val >= 1000) {
								val = (val / 1000).toFixed(0) + ' K'
							}
							return val
							}
						}
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
			};
			//----------------------- Build the chart tròn---------------------------//
			async function BD_tron () {
					var arraylist = JSON.stringify(list_newloc)
					arraylist = JSON.parse(arraylist)
					var listnew = Object.values(arraylist.reduce(function(r, e) {
						var key = e.name_DM;
						if (!r[key]) {
							r[key] = e;
							r[key].name = e.name_DM;
							r[key].y = e.soluong_ban;
							r[key].color = e.color;
						}else {
							r[key].soluong_ban += Number(e.soluong_ban)
							r[key].y+= Number(e.soluong_ban)
						}
						return r;
					}, {}))
					const getData_tron = (myArray) => {
						const promises = myArray.map(async (myValue) => {
							return {
								name: myValue.name,
								y: myValue.y,
								color:`${(await get_color(color_list, myValue.color_DM)).color}`
							}
						});
						return Promise.all(promises);
					}
					listnew = await getData_tron(listnew)
					// console.log(listnew)

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
						// tooltip: {
						// 	pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
						// },
						tooltip: {
							shared: true,
							headerFormat: '<span style="font-size: 18px"><b>{point.point.name}</b></span><br/>',
							pointFormat: '<span style="color:{point.color};font-size:22px;">\u25CF</span> <b style="font-size: 16px;">{series.name}: {point.percentage:.1f}%</b><br/>'
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
							name: 'Tỉ lệ',
							// stacking: 'normal',
							borderWidth: 0,
							// colorByPoint: true,
							// data: [
							// 	{ name:'Đồ Ăn Thêm', y: 13.24, color: 'yellow' },
							// 	{ name: 'Đồ Uống', y: 12.93 },
							// 	{ name: 'Firefox', y: 4.73 },
							// 	{ name: 'Safari', y: 2.50 },
							// 	{ name: 'Internet Explorer', y: 1.65 },
							// 	{ name: 'Đồ Ăn Vặt', y: 4.93 },
							// 	{ name: 'Đồ Uống', y: 12.93 },
							// 	{ name: 'Firefox', y: 4.73 },
							// 	{ name: 'Safari', y: 2.50 },
							// 	{ name: 'Internet Explorer', y: 1.65 },
							// 	{ name: 'Đồ Ăn Vặt', y: 4.93 }
							// ]
							data: listnew,
						}]
					});
			};
			BD_top10 ()
			BD_DT ()
			BD_thongkeDTPM ()
			BD_tron ()

			/*--------------------------------- xếp hạng -------------------------------- */
			flatpickr("#date_begin", {
				locale: "vn",
				shorthandCurrentMonth: true, //defaults to false
				// disableMobile: false,
				time_24hr: true,
				enableTime: true,
				defaultHour: '00',
				defaultMinute: '00', 
				dateFormat: "d/m/Y H:i:S",
				minDate: "2023-01",
			});
			flatpickr("#date_end", {
				locale: "vn",
				shorthandCurrentMonth: true, //defaults to false
				enableTime: true,
				dateFormat: "d/m/Y H:i:S",
				defaultHour: '23',
				defaultMinute: '59', 
				minDate: "2023-01",
			});
			var d_begin = new Date();
			d_begin.setHours(0,0,0,0);		
			var date_begin = d_begin.toLocaleString("en-ZA", {
				hour12: false,
				timeZone: "Asia/Ho_Chi_Minh",
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "2-digit",
				minute:"2-digit",
				second: "2-digit",
			});
			date_begin = (date_begin.replace(',','')).replaceAll('/', '-')
			var d_end = new Date();
			d_end.setHours(23,59,0,0);		
			var date_end = d_end.toLocaleString("en-ZA", {
				hour12: false,
				timeZone: "Asia/Ho_Chi_Minh",
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "2-digit",
				minute:"2-digit",
				second: "2-digit",
			});
			date_end = (date_end.replace(',','')).replaceAll('/', '-')
			var input_date_begin = document.querySelector('#date_begin')
			if (input_date_begin)
				input_date_begin.value = convert_dateToVN(date_begin)
			var input_date_end = document.querySelector('#date_end')
			if (input_date_end)
				input_date_end.value = convert_dateToVN(date_end)

			/*---------- set date current ------------- */
			async function init() {
				var input_date_begin = document.querySelector('#date_begin')
				let date_begins, date_ends;
				if (input_date_begin)
					date_begins = convert_dateToUS(input_date_begin.value)
				var input_date_end = document.querySelector('#date_end')
				if (input_date_end)
					date_ends = convert_dateToUS(input_date_end.value)

				let temp = {
					date_begin: date_begins,
					date_end: date_ends,
					action: 'get_BCMH',
				}
				const res = await instance.post('/baocao', temp);
				let values = res.data.listtable
				// console.log(values)
				/*------------------ func group by sum array ------------- */
				let xephang;
				let get_BC = 'get_BCMH'
				if(get_BC== 'get_BCMH'){
					values = await values.filter((el) => {return el.Action === 'HOANTHANH'});
					console.log(values)
					values = Object.values(values.reduce(function(r, e) {
						var key = e.id_MH;
						if (!r[key]) {
							r[key] = e;
							r[key].name = e.name_MH

							let price = e.price_MH
							let SL = e.soluong_MH
							var phantramKM = e.phantramKM
							var price_TC = e.price_TC
							price =='Tuỳ Chọn'? price= price_TC: price = price-(price*phantramKM/100)
							let TT = price							
							TT = TT*SL
							
							r[key].y = Number(TT)
							// r[key].y = Number(e.soluong_MH) * Number(e.price_TC) == 0? Number(e.price_MH)-(e.price_MH*e.phantramKM/100) : Number(e.price_TC)
							
						}else {
							r[key].soluong_MH += e.soluong_MH

							let price = e.price_MH
							let SL =e.soluong_MH
							var phantramKM = e.phantramKM
							var price_TC = e.price_TC
							price =='Tuỳ Chọn'? price= price_TC: price = price-(price*phantramKM/100)
							let TT = price							
							TT = TT*SL
							
							r[key].y += Number(TT)
							// r[key].y += Number(e.soluong_MH) * Number(e.price_TC) == 0? Number(e.price_MH)-(e.price_MH*e.phantramKM/100) : Number(e.price_TC)
						}
						return r;
					}, {}))

					const getData_tron = (myArray) => {
						const promises = myArray.map(async (myValue) => {
							return {
								name: myValue.name,
								y: myValue.y,
								color:`${(await get_color(color_list, myValue.id_DM, 'DM')).color}`
							}
						});
						return Promise.all(promises);
					}
					console.log(values)
					values = await getData_tron(values)
				}
				
				(async () => {$('document' ).ready(async function() {
					// console.log( "document loaded" );
					// lỗi chết ng hix do series color gây ra gán màu cho chart là hết
					let chart_xephang = Highcharts.chart('chart_xephang', {
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
									fontSize: '16px'
								}
							},
							lineColor: 'grey',
							lineWidth: 0.0//set line
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
							// tickInterval : 80,
							
						},
						plotOptions: {
							series: {
								animation: false,
								groupPadding: 0,
								pointPadding: 0.1,
								borderWidth: 0,
								inside: false,
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
						tooltip: {
							shared: true,
							useHTML: true,
							formatter: function () {
								var point = this.points[0].point,
								  cats = point.series.xAxis.categories;
								
								// var catIndex = point.index,
								// 	currCat = cats[catIndex],  //..or simply "this.x"
								// 	nextCat = cats[catIndex+1] || '';
									
								var s = `<span style="font-size: 18px;font-weight:600;"><b>${point.name}</b></span><br/>`;
					
								$.each(this.points, function () {
									// s += '<br/>' + this.series.name + ': ' +
									// 	this.y + 'm';
									s+= `<span style="color:${this.point.color};font-size:22px;">\u25CF</span>
									<b style="font-size: 16px;">${this.series.name}: ${money(this.point.y)}</b><br/>`
								});
					
								return s;
							},
							// headerFormat: '<span style="font-size: 18px"><b>{point.point.name}</b></span><br/>',
							// pointFormat: `<span style="color:{point.color};font-size:22px;">\u25CF</span> <b style="font-size: 16px;">{series.name}: {point.y} vnđ</b><br/>`
						},
						// series:[{
						// 	name: '2020',
							
						// 	data: await getData(data[months].slice())
						// }],
						series: [{
							name: `Tổng`,
							id: 'main',
							dataSorting: {
								enabled: true,
								matchByName: true
							},
							dataLabels: [{
								enabled: true,
								inside: false,
								style: {
									fontSize: '16px',
									
								},
								//set HTML
								formatter: function() {
									return money(this.y);
								  },

								useHTML: true,
							}],
							data: values,//await getData(data[months].slice())
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
			
			}
			await init();
			//------------ event btn search date ----------//
			btn_date = document.querySelector('button.date_search')
			if(btn_date){
				//huỷ event change
				btn_date.removeEventListener('click',arguments.caller,true);
				btn_date.addEventListener('click', async function (evt) {
					await init();
				});
			}

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
				tooltip: {
					shared: true,
					headerFormat: '<span style="font-size: 18px"><b>{point.point.name}</b></span><br/>',
					pointFormat: '<span style="color:{point.color};font-size:22px;">\u25CF</span> <b style="font-size: 16px;">{series.name}: {point.y} đơn</b><br/>'
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
				tooltip: {
					shared: true,
					headerFormat: '<span style="font-size: 18px"><b>{point.point.name}</b></span><br/>',
					pointFormat: '<span style="color:{point.color};font-size:22px;">\u25CF</span> <b style="font-size: 16px;">{series.name}: {point.y} đơn</b><br/>'
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
			tmp = '<button class="btn-back" type="button" onclick="back_page();"><i class="ti-arrow-left"> </i>Quay Lại</button>'
			document.querySelector('.show_btn_back').innerHTML = tmp
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
										<span class="DTDV" style="white-space: nowrap;">${money(0)}</span>
									</div>
								</div>
							</div>
							<p style="color: red; font-size: 18px;font-style: italic; padding-bottom: 10px;">* Lọc trạng thái [Tất Cả] sẽ hiện tổng doanh thu của cả đơn Hoàn Thành và đơn Hủy.</p>
							
							<div class="date-form" style="display: grid;
															grid-template-columns: repeat(auto-fit, minmax(250px, 350px));
															grid-gap: 20px 20px;">
								<div class="input-field date-form" style="margin:0; padding:0;">
									<label style="top: 0;background: var(--background);">Từ Ngày</label>
									<input class="popup-input invalid" type="datetime-local" id="date_begin" style="width: 100%; margin:0;" onchange="validateValue_str(event);">
									
								</div>
								<div class="input-field date-form" style="margin:0; padding:0;">
									<label style="top: 0;background: var(--background);">Đến Ngày</label>
									<input class="popup-input invalid" type="datetime-local" id="date_end" style="width: 100%; margin:0;" onchange="validateValue_str(event);">
								</div>
								
								<button type="button" class="date_search"><i class="ti-check-box"> </i>ÁP DỤNG</button>
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
											sortedList = danhmuc.sort((a, b) =>
											a.name_DM.localeCompare(b.name_DM));
												sortedList.forEach(function(element, index){
													const name = element.name_DM
													if(name!='Topping')													
														html+= `<option value="${element.id_DM}">${name}</option>`
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
											sortedList_MH = mathang.sort((a, b) =>
												a.name_MH.localeCompare(b.name_MH));
											// console.log(sortedList);
											sortedList_MH.forEach(function(element, index){
												const name = element.name_MH
												if(element.id_DM != 3)
													html+= `<option value="${element.id_MH}">${name}</option>`
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
											sortedList_NV = NV.sort((a, b) =>
												a.UserName.localeCompare(b.UserName));
											// console.log(sortedList);
											sortedList_NV.forEach(function(element, index){
												const name = element.UserName
												html+= `<option value=''>${name}</option>`
												
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
			html +='		<th style="text-align: center; min-width:220px;">MẶT HÀNG</th>'
			html +='		<th>DANH MỤC</th>'
			html +='		<th style="text-align: right;">ĐƠN GIÁ</th>'
			html +='		<th>SỐ LƯỢNG</th>'
			html +='		<th>THÀNH TIỀN</th>'
			html +='		<th>THANH TOÁN</th>'
			html +='		<th style="text-align: right;">LÝ DO</th>'
			html +='	</tr>'
			html +='	</thead>'
			html +='	<tbody id="list_order">'
			html += '</tbody>'
			html += '</table>'
			html += '</div>'
			/*-------- show chon page ------- */
			html +=`<div class="" id="pagination-demo1" style="margin: 10px auto;"></div>`

			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)

			init_BC('get_BCDH', 'BC_Đơn Hàng')
			
			
			/*--------------- set width el ----------------- */
			el = document.querySelectorAll('.dropbox_old')
			el.forEach(element => {
				element.style.width = 'calc(100% / 5.15)';
			});
			
			
		break;
		case 'BC_Mặt Hàng':
			tmp = '<button class="btn-back" type="button" onclick="back_page();"><i class="ti-arrow-left"> </i>Quay Lại</button>'
			document.querySelector('.show_btn_back').innerHTML = tmp
			html +='<div class="table_responsive" id = "main_table">'
			html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
			html +=`	<caption style="text-align: left;">
							<h3>BÁO CÁO MẶT HÀNG</h3>
							<p>Báo cáo số lượng các mặt hàng đã được bán ra theo thời điểm được lựa chọn. Mặc định báo cáo sẽ hiển thị trong ngày.</p>

							<div class='bxdoanhthu' style="padding: 10px 0; margin-bottom: 15px;">
								<div class="page-header-title">
									<i class="ti-harddrives" style="background: #f10075"></i>
									<div class="d-inline">
										<h4>TỔNG DOANH THU</h4>
										<span class="DTDV" style="white-space: nowrap;">${money(0)}</span>
									</div>
								</div>
							</div>
							
							<div class="date-form" style="display: grid;
															grid-template-columns: repeat(auto-fit, minmax(250px, 350px));
															grid-gap: 20px 20px;">
								<div class="input-field date-form" style="margin:0; padding:0;">
									<label style="top: 0;background: var(--background);">Từ Ngày</label>
									<input class="popup-input invalid" type="datetime-local" id="date_begin" style="width: 100%; margin:0;" onchange="validateValue_str(event);">
									
								</div>
								<div class="input-field date-form" style="margin:0; padding:0;">
									<label style="top: 0;background: var(--background);">Đến Ngày</label>
									<input class="popup-input invalid" type="datetime-local" id="date_end" style="width: 100%; margin:0;" onchange="validateValue_str(event);">
								</div>
								
								<button type="button" class="date_search"><i class="ti-check-box"> </i>ÁP DỤNG</button>
							</div>`

							/* Bộ lọc */

			html +=`		<div class="order_search" style="display: flex; width:100%; -webkit-flex-wrap: wrap; flex-wrap: wrap;">
								<div class="dropbox_old" id="search_DM" style="margin: 15px 5px 15px 0px;">
										<select>
											<option>Danh Mục</option>`
											/*-------------- sort Alphabetically xắp sếp ----------- */
											sortedList = danhmuc.sort((a, b) =>
											a.name_DM.localeCompare(b.name_DM));
												sortedList.forEach(function(element, index){
													const name = element.name_DM										
													html+= `<option value="${element.id_DM}">${name}</option>`
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
											sortedList_MH = mathang.sort((a, b) =>
												a.name_MH.localeCompare(b.name_MH));
											// console.log(sortedList);
											sortedList_MH.forEach(function(element, index){
												const name = element.name_MH
												if(element.id_DM != 3)
													html+= `<option value="${element.id_MH}">${name}</option>`
											});			
			html+=` 					</select>
										<i class="ti-angle-down"></i>
										<i class="ti-check"></i>
										<i class="ti-alert"></i>
									</div>						
							</div>					
						</caption>`

			html +='	<thead style="background: none;background: var(--light);">'
			html +='	<tr>'
			html +='		<th>STT</th>'
			html +='		<th>MẶT HÀNG</th>'
			html +='		<th>DANH MỤC</th>'
			html +='		<th style="text-align: right;">ĐƠN GIÁ</th>'
			html +='		<th>SỐ LƯỢNG</th>'
			html +='		<th style="text-align: right;">THÀNH TIỀN</th>'
			html +='	</tr>'
			html +='	</thead>'
			html +='	<tbody id="list_order">'

			html += '</tbody>'
			html += '</table>'
			html += '</div>'
			/*-------- show chon page ------- */
			html +=`<div class="" id="pagination-demo1" style="margin: 10px auto;"></div>`
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)

			init_BC('get_BCMH', e)
			/*--------------- set width el ----------------- */
			el = document.querySelectorAll('.dropbox_old')
			el.forEach(element => {
				element.style.width = 'calc(100% / 3.15)';
			});
			

		break;
		case 'BC_Nguyên Liệu':
			tmp = '<button class="btn-back" type="button" onclick="back_page();"><i class="ti-arrow-left"> </i>Quay Lại</button>'
			document.querySelector('.show_btn_back').innerHTML = tmp
			html +='<div class="table_responsive" id = "main_table">'
			html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
			html +=`	<caption style="text-align: left;">
							<h3>BÁO CÁO NGUYÊN LIỆU</h3>
							<p>Báo cáo số lượng các nguyên liệu đã được sử dụng theo thời điểm. Mặc định báo cáo sẽ hiển thị trong ngày.</p>
							</br>					
							<div class="date-form" style="display: grid;
															grid-template-columns: repeat(auto-fit, minmax(250px, 350px));
															grid-gap: 20px 20px;">
								<div class="input-field date-form" style="margin:0; padding:0;">
									<label style="top: 0;background: var(--background);">Từ Ngày</label>
									<input class="popup-input invalid" type="datetime-local" id="date_begin" style="width: 100%; margin:0;" onchange="validateValue_str(event);">
									
								</div>
								<div class="input-field date-form" style="margin:0; padding:0;">
									<label style="top: 0;background: var(--background);">Đến Ngày</label>
									<input class="popup-input invalid" type="datetime-local" id="date_end" style="width: 100%; margin:0;" onchange="validateValue_str(event);">
								</div>
								
								<button type="button" class="date_search"><i class="ti-check-box"> </i>ÁP DỤNG</button>
							</div>`
							/* Bộ lọc */
			html +=`		<div class="order_search" style="display: flex; width:100%; -webkit-flex-wrap: wrap; flex-wrap: wrap;">		
									
								<div class="dropbox_old" id="search_DM" style="margin: 15px 5px 15px 0px;">
										<select>
											<option>Danh Mục</option>`
											/*-------------- sort Alphabetically xắp sếp ----------- */
											sortedList = danhmuc.sort((a, b) =>
												a.name_DM.localeCompare(b.name_DM));
											sortedList.forEach(function(element, index){
													const name = element.name_DM
													if(name!='Topping')													
														html+= `<option value="${element.id_DM}">${name}</option>`
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
											sortedList_MH = mathang.sort((a, b) =>
												a.name_MH.localeCompare(b.name_MH));
											sortedList_MH.forEach(function(element, index){
												const name = element.name_MH
												if(element.id_DM != 3)
													html+= `<option value="${element.id_MH}">${name}</option>`
											});				
			html+=` 					</select>
										<i class="ti-angle-down"></i>
										<i class="ti-check"></i>
										<i class="ti-alert"></i>
									</div>							
							</div>				
						</caption>`

			html +='	<thead style="background: none;background: var(--light);">'
			html +='	<tr>'
			html +='		<th style="text-align: left;">STT</th>'
			html +='		<th style="text-align: left;">NGUYÊN LIỆU</th>'
			html +='		<th style="text-align: right;">SỐ LƯỢNG</th>'
			html +='		<th style="text-align: right;">ĐƠN VỊ</th>'
			html +='	</tr>'
			html +='	</thead>'
			html +='	<tbody id="list_order">'

			html += '</tbody>'
			html += '</table>'
			html += '</div>'
			/*-------- show chon page ------- */
			html +=`<div class="" id="pagination-demo1" style="margin: 10px auto;"></div>`

			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)
			init_BC('get_BCNL', e)
			

			/*--------------- set width el ----------------- */
			el = document.querySelectorAll('.dropbox_old')
			el.forEach(element => {	element.style.width = 'calc(100% / 3.33)';});
			
		break;
		case 'BC_Giao Ca':
			tmp = '<button class="btn-back" type="button" onclick="back_page();"><i class="ti-arrow-left"> </i>Quay Lại</button>'
			document.querySelector('.show_btn_back').innerHTML = tmp
			temp = {action: 'get_BCGC'}
			res = await instance.post('/baocao', temp);
			value = res.data.listtable.reverse()
						
			html +='<div class="table_responsive" id = "main_table">'
			html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
			html +=`	<caption style="text-align: left;">
							<h3>BÁO CÁO GIAO CA</h3>
							<p>Báo cáo doanh thu theo từng ca</p>
						</caption>`
			html +='	<thead style="background: none;background: var(--light);">'
			html +='	<tr>'
			html +='		<th>STT</th>'
			html +='		<th>BẮT ĐẦU</th>'
			html +='		<th>NV.BẮT ĐẦU</th>'
			html +='		<th>KẾT THÚC</th>'
			html +='		<th>NV.KẾT THÚC</th>'
			html +='		<th>DOANH THU</th>'
			html +='		<th>DT.DỊCH VỤ</th>'
			html +='		<th>DT.KHÁC</th>'
			html +='		<th>DT.PHÒNG MÁY</th>'
			html +='		<th style="text-align: right;">DT.BI-A</th>'
			html +='		<th>CHI TIẾT</th>'
			html +='	</tr>'
			html +='	</thead>'
			html +='	<tbody id="list_order">'

			let STT =0
			value.forEach(function(element, index){
				STT++
				let date_begin = element.date_begin
				let nv_begin =element.name
				let date_end =element.date_end
				
				let nv_end =element.name
				let DT_DV =money(element.DT_dichvu)
				let DT_KHAC =money(element.DT_khac)
				let TT_DT =money(element.TT_dientu)
				let DTPM =money(element.DT_PM)
				let DTBIA =money(element.DT_Bia)
				let HT =money(element.Hoantien)
				let DT = money(Number(element.DT_dichvu)+Number(element.DT_khac)+ Number(element.DT_PM) +Number(element.DT_Bia))

				html += `<tr class="has-rowspan">`
				html += `<td data-label="STT" style="text-align: center;">${STT}</td>`
				html += `<td data-label="BẮT ĐẦU" style="white-space: nowrap;">${date_begin}</td>`
				html += `<td data-label="NV.BẮT ĐẦU" style="text-align: center;">${nv_begin}</td>`
				html += `<td data-label="KẾT THÚC" style="white-space: nowrap;">${date_end}</td>`
				html += `<td data-label="NV.KẾT THÚC" style="text-align: center;">${nv_end}</td>`
				html += `<td data-label="DOANH THU" style="text-align: right;">${DT}</td>`
				html += `<td data-label="DT.DỊCH VỤ" style="text-align: right;">${DT_DV}</td>`
				html += `<td data-label="DT.KHÁC" style="text-align: right;">${DT_KHAC}</td>`
				html += `<td data-label="TT.ĐIỆN TỬ" style="text-align: right;">${DTPM}</td>`
				html += `<td data-label="HOÀN TIỀN" style="text-align: right;">${DTBIA}</td>`
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

			// init_BC('get_BCNL', e)

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
							<div class="date-form" style="display: grid;
															grid-template-columns: repeat(auto-fit, minmax(250px, 350px));
															grid-gap: 20px 20px;">
								<div class="input-field date-form" style="margin:0; padding:0;">
									<label style="top: 0;background: var(--background);">Từ Ngày</label>
									<input class="popup-input invalid" type="datetime-local" id="date_begin" style="width: 100%; margin:0;" onchange="validateValue_str(event);">
									
								</div>
								<div class="input-field date-form" style="margin:0; padding:0;">
									<label style="top: 0;background: var(--background);">Đến Ngày</label>
									<input class="popup-input invalid" type="datetime-local" id="date_end" style="width: 100%; margin:0;" onchange="validateValue_str(event);">
								</div>
								
								<button type="button" class="date_search"><i class="ti-check-box"> </i>ÁP DỤNG</button>
							</div>
						</caption>`

			html +='	<thead style="background: none;background: var(--light);">'
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
			/*-------- show chon page ------- */
			html +=`<div class="" id="pagination-demo1" style="margin: 10px auto;"></div>`

			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)

			/*---------- func event date ---------------*/
			flatpickr("#date_begin", {
				locale: "vn",
				shorthandCurrentMonth: true, //defaults to false
				// disableMobile: false,
				time_24hr: true,
				enableTime: true,
				defaultHour: '00',
				defaultMinute: '00', 
				dateFormat: "d/m/Y H:i:S",
				minDate: "2023-01",
			});
			flatpickr("#date_end", {
				locale: "vn",
				shorthandCurrentMonth: true, //defaults to false
				enableTime: true,
				dateFormat: "d/m/Y H:i:S",
				defaultHour: '23',
				defaultMinute: '59', 
				minDate: "2023-01",
			});		
			// async function init_NL() {
			// 	var d = new Date();
			// 	d.setHours(0,0,0,0);		
			// 	var date_begin = d.toLocaleString("en-ZA", {
			// 		hour12: false,
			// 		timeZone: "Asia/Ho_Chi_Minh",
			// 		year: "numeric",
			// 		month: "2-digit",
			// 		day: "2-digit",
			// 		hour: "2-digit",
			// 		minute:"2-digit",
			// 		second: "2-digit",
			// 	});
			// 	date_begin = (date_begin.replace(',','')).replaceAll('/', '-')
			// 	var input_date_begin = document.querySelector('#date_begin')
			// 	input_date_begin.placeholder = convert_dateToVN(date_begin)
			// 	var input_date_end = document.querySelector('#date_end')
			// 	input_date_end.placeholder = convert_dateToVN(new_date())
			// 	var date_end = new_date()
			// 	input_date_begin.value ==''?null : date_begin= convert_dateToUS(input_date_begin.value)
			// 	input_date_end.value ==''?null : date_end = convert_dateToUS(input_date_end.value)
			// 	temp = {
			// 		date_begin: date_begin,
			// 		date_end: new_date(),
			// 		action: 'get_BCNL'}
			// 	res = await instance.post('/baocao', temp);
			// 	var values = res.data.listtable
			// 	/*------------------ func group by sum array ------------- */
			// 	values = Object.values(values.reduce(function(r, e) {
			// 		var key = e.id_NL;
			// 		if (!r[key]) {
			// 			r[key] = e;
			// 		}else {
			// 		r[key].soluongNLMH += e.soluongNLMH
			// 		}
			// 		return r;
			// 	}, {}))
			// 	waitUntilElementExists('.table_responsive', (el) => {
			// 		loc_list('BC_Nguyên Liệu',values);
			// 		/*----------------- search --------------- */
			// 		action = document.querySelectorAll('.dropbox_old select')
			// 		action.forEach(element => {
			// 			//huỷ event change
			// 			element.removeEventListener('change',arguments.caller,false);
			// 			//add event change
			// 			element.addEventListener('change',function (evt) {
			// 				const values_tmp = values;
			// 				loc_list('BC_Nguyên Liệu', values_tmp);
			// 			});
			// 		});					
			// 	});	
			// }
			// init_NL();

			// check element da render chưa
			waitUntilElementExists = (selector, callback) => {
				const el = document.querySelector(selector);
				if (el){return callback(el);}
				setTimeout(() => waitUntilElementExists(selector, callback), 500);
				}
			// event btn search date
			btn_date = document.querySelector('button.date_search')
			if(btn_date){
				btn_date.addEventListener('click', async function (evt) {
					init_NL();
				});
			}

		break;
		case 'BC_Nhập/Xuất Kho':
			tmp = '<button class="btn-back" type="button" onclick="back_page();"><i class="ti-arrow-left"> </i>Quay Lại</button>'
			document.querySelector('.show_btn_back').innerHTML = tmp
			html +='<div class="table_responsive" id = "main_table">'
			html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
			html +=`	<caption style="text-align: left;">
							<h3>Báo Cáo Nhập/Xuất Kho</h3>
							<p>Báo cáo nhập kho và điều chỉnh kho cho từng loại nguyên liệu theo thời điểm.</p>
							</br>
							<div class="date-form" style="display: grid;
															grid-template-columns: repeat(auto-fit, minmax(250px, 350px));
															grid-gap: 20px 20px;">
								<div class="input-field date-form" style="margin:0; padding:0;">
									<label style="top: 0;background: var(--background);">Từ Ngày</label>
									<input class="popup-input invalid" type="datetime-local" id="date_begin" style="width: 100%; margin:0;" onchange="validateValue_str(event);">
									
								</div>
								<div class="input-field date-form" style="margin:0; padding:0;">
									<label style="top: 0;background: var(--background);">Đến Ngày</label>
									<input class="popup-input invalid" type="datetime-local" id="date_end" style="width: 100%; margin:0;" onchange="validateValue_str(event);">
								</div>
								
								<button type="button" class="date_search"><i class="ti-check-box"> </i>ÁP DỤNG</button>
							</div>`
			html +=`		<div class="order_search" style="display: flex; width:100%; -webkit-flex-wrap: wrap; flex-wrap: wrap;">

								<div class="dropbox_old" id="search_NV" style="margin: 15px 5px 15px 0px;">
									<select>
										<option>Nhân Viên</option>`
										/*-------------- sort Alphabetically xắp sếp ----------- */
										sortedList = NV.sort((a, b) => a.UserName.localeCompare(b.UserName));
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
										nguyenlieu.sort((a, b) => a.name_NL.localeCompare(b.name_NL));
										nguyenlieu.forEach(function(element, index){
											const name = element.name_NL
											html+= `<option>${name}</option>`
											
										});			
			html+=` 				</select>
									<i class="ti-angle-down"></i>
									<i class="ti-check"></i>
									<i class="ti-alert"></i>
								</div>

								<div class="dropbox_old" id="search_Thaotac" style="margin: 15px 5px;">
									<select>
										<option>Thao Tác</option>
										<option value="Nhập kho">Nhập Kho</option>
										<option value="Điều chỉnh">Điều Chỉnh</option>
									</select>
									<i class="ti-angle-down"></i>
									<i class="ti-check"></i>
									<i class="ti-alert"></i>
								</div>												
							</div>					
						</caption>`

			html +='	<thead style="background: none;background: var(--light);">'
			html +='	<tr>'
			html +='		<th>STT</th>'
			html +='		<th>THỜI GIAN</th>'
			html +='		<th>NHÂN VIÊN</th>'
			html +='		<th style="text-align: right;">NGUYÊN LIỆU</th>'
			html +='		<th style="text-align: right;">THAO TÁC</th>'
			html +='		<th>SỐ LƯỢNG</th>'
			html +='		<th>TỒN KHO TRƯỚC</th>'
			html +='		<th>TỒN KHO SAU</th>'
			html +='		<th style="text-align: right;">GIÁ NHẬP</th>'
			html +='		<th style="text-align: right;">TỔNG</th>'
			html +='		<th style="text-align: right;">Ghi Chú</th>'
			html +='	</tr>'
			html +='	</thead>'
			html +='	<tbody id="list_order">'

			html += '</tbody>'
			html += '</table>'
			html += '</div>'
			/*-------- show chon page ------- */
			html +=`<div class="" id="pagination-demo1" style="margin: 10px auto;"></div>`
		
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)
			init_BC('get_BCkho', e)
			
			
			
		break;
		case 'BC_Tồn Kho':
			tmp = '<button class="btn-back" type="button" onclick="back_page();"><i class="ti-arrow-left"> </i>Quay Lại</button>'
			document.querySelector('.show_btn_back').innerHTML = tmp
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
											sortedList = danhmuc.sort((a, b) =>	a.name_DM.localeCompare(b.name_DM));
											sortedList.forEach(function(element, index){
													const name = element.name_DM
													if(name!='Topping')													
														html+= `<option value="${element.id_DM}">${name}</option>`
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
											sortedList_MH = mathang.sort((a, b) => a.name_MH.localeCompare(b.name_MH));
											sortedList_MH.forEach(function(element, index){
												const name = element.name_MH
												html+= `<option value='${element.id_MH}'>${name}</option>`
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
											nguyenlieu.sort((a, b) => a.name_NL.localeCompare(b.name_NL));
											nguyenlieu.forEach(function(element, index){
												const name = element.name_NL
												html+= `<option value='${element.id_NL}'>${name}</option>`
											});			
			html+=` 					</select>
										<i class="ti-angle-down"></i>
										<i class="ti-check"></i>
										<i class="ti-alert"></i>
								</div>						
							</div>					
						</caption>`

			html +='	<thead style="background: none;background: var(--light);">'
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
			/*-------- show chon page ------- */
			html +=`<div class="" id="pagination-demo1" style="margin: 10px auto;"></div>`

			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)

			init_BC('get_BCTonkho', e)

				
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
					html += `<td data-label="THỜI GIAN" style="white-space: nowrap;text-align: center;">${'Date_tmp'}</td>`
					html += `<td data-label="" style="text-align: center;"><i class="ti-download BC"></i></td>`
					html += '</tr>'

					html += `<tr>`
					html += `<td data-label="STT" style="text-align: center;">2</td>`
					html += `<td data-label="LOẠI BÁO CÁO" style="white-space: nowrap;text-align: left;">Tồn Kho</td>`
					html += `<td data-label="NHÂN VIÊN YÊU CẦU" style="text-align: center; width:80px;">${user_login}</td>`
					html += `<td data-label="TRẠNG THÁI" style="text-align: center;">Sẵn Sàng</td>`
					html += `<td data-label="THỜI GIAN" style="white-space: nowrap;text-align: center;">${'Date_tmp'}</td>`
					html += `<td data-label="" style="text-align: center;"><i class="ti-download BC"></i></td>`
					html += '</tr>'

					html += `<tr>`
					html += `<td data-label="STT" style="text-align: center;">3</td>`
					html += `<td data-label="LOẠI BÁO CÁO" style="white-space: nowrap;text-align: left;">Bán Hàng Tổng Hợp(Mặt Hàng)</td>`
					html += `<td data-label="NHÂN VIÊN YÊU CẦU" style="text-align: center; width:80px;">${user_login}</td>`
					html += `<td data-label="TRẠNG THÁI" style="text-align: center;">Sẵn Sàng</td>`
					html += `<td data-label="THỜI GIAN" style="white-space: nowrap;text-align: center;">${'Date_tmp'}</td>`
					html += `<td data-label="" style="text-align: center;"><i class="ti-download BC"></i></td>`
					html += '</tr>'

					html += `<tr>`
					html += `<td data-label="STT" style="text-align: center;">4</td>`
					html += `<td data-label="LOẠI BÁO CÁO" style="white-space: nowrap;text-align: left;">Bán Hàng Tổng Hợp(Nguyên Liệu)</td>`
					html += `<td data-label="NHÂN VIÊN YÊU CẦU" style="text-align: center; width:80px;">${user_login}</td>`
					html += `<td data-label="TRẠNG THÁI" style="text-align: center;">Sẵn Sàng</td>`
					html += `<td data-label="THỜI GIAN" style="white-space: nowrap;text-align: center;">${'Date_tmp'}</td>`
					html += `<td data-label="" style="text-align: center;"><i class="ti-download BC"></i></td>`
					html += '</tr>'

					html += `<tr>`
					html += `<td data-label="STT" style="text-align: center;">5</td>`
					html += `<td data-label="LOẠI BÁO CÁO" style="white-space: nowrap;text-align: left;">Bán Hàng Tổng Hợp(Đơn Hàng)</td>`
					html += `<td data-label="NHÂN VIÊN YÊU CẦU" style="text-align: center; width:80px;">${user_login}</td>`
					html += `<td data-label="TRẠNG THÁI" style="text-align: center;">Sẵn Sàng</td>`
					html += `<td data-label="THỜI GIAN" style="white-space: nowrap;text-align: center;">${'Date_tmp'}</td>`
					html += `<td data-label="" style="text-align: center;"><i class="ti-download BC"></i></td>`
					html += '</tr>'

					html += `<tr>`
					html += `<td data-label="STT" style="text-align: center;">6</td>`
					html += `<td data-label="LOẠI BÁO CÁO" style="white-space: nowrap;text-align: left;">Góp Ý/Yêu Cầu</td>`
					html += `<td data-label="NHÂN VIÊN YÊU CẦU" style="text-align: center; width:80px;">${user_login}</td>`
					html += `<td data-label="TRẠNG THÁI" style="text-align: center;">Sẵn Sàng</td>`
					html += `<td data-label="THỜI GIAN" style="white-space: nowrap;text-align: center;">${'Date_tmp'}</td>`
					html += `<td data-label="" style="text-align: center;"><i class="ti-download BC"></i></td>`
					html += '</tr>'

			html += '</tbody>'
			html += '</table>'
			html += '</div>'
			/*-------- show chon page ------- */
			html +=`<div class="" id="pagination-demo1" style="margin: 10px auto;"></div>`

			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)

			// var print = document.querySelectorAll('table .ti-download')
			// print.forEach(function(element, index){
			// 	let text = element.parentNode.parentNode.children[1].innerText;
			// 	element.addEventListener('click',function (evt) {
			// 		ExportData(text);
			// 	});
			// });
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
							<div class="date-form" style="display: grid;
															grid-template-columns: repeat(auto-fit, minmax(250px, 350px));
															grid-gap: 20px 20px;">
								<div class="input-field date-form" style="margin:0; padding:0;">
									<label style="top: 0;background: var(--background);">Từ Ngày</label>
									<input class="popup-input invalid" type="datetime-local" id="date_begin" style="width: 100%; margin:0;" onchange="validateValue_str(event);">
									
								</div>
								<div class="input-field date-form" style="margin:0; padding:0;">
									<label style="top: 0;background: var(--background);">Đến Ngày</label>
									<input class="popup-input invalid" type="datetime-local" id="date_end" style="width: 100%; margin:0;" onchange="validateValue_str(event);">
								</div>
								
								<button type="button" class="date_search"><i class="ti-check-box"> </i>ÁP DỤNG</button>
							</div>
							</br>
						</caption>`
	
			html +='	<thead style="background: none;">'
			html +='	<tr>'
			html +='		<th>STT</th>'
			html +='		<th style="text-align: left;">THỜI GIAN</th>'
			html +='		<th style="text-align: right;">TÀI KHOẢN</th>'
			html +='		<th style="text-align: right;">THAO TÁC</th>'
			html +='		<th style="text-align: right;">ĐỐI TƯỢNG</th>'
			html +='		<th></th>'
			html +='	</tr>'
			html +='	</thead>'
			html +='	<tbody id="list_order">'
	
			html += '</tbody>'
			html += '</table>'
			html += '</div>'
			/*-------- show chon page ------- */
			html +=`<div class="" id="pagination-demo1" style="margin: 10px auto;"></div>`
	
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)
	
			init_BC('get_BCThaotac', e)
			

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
				a.name_DM.localeCompare(b.name_DM));
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
			MH = await instance.post('/mathang', temp_order);
			// console.log(MH.data)
			/*-------------- sort Alphabetically xắp sếp ----------- */
			sortedList = MH.data.sort((a, b) =>a.name_MH.localeCompare(b.name_MH));
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
			// console.log('data', NL.data)
			/*-------------- sort Alphabetically xắp sếp ----------- */
			sortedList = NL.data.sort((a, b) =>
				a.name_NL.localeCompare(b.name_NL));
			var lastRowIndex = 0;
			sortedList.forEach(function(element, index){
				lastRowIndex +=1
				const id = element.id_NL
				const tenNL = element.name_NL
				const mota = element.mota_NL
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
			sortedList = nhom_MH.data.sort((a, b) => a.name_nhom.localeCompare(b.name_nhom));
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
				action: 'get_MaKM'
			}
			var magiam = await instance.post('/maKM', temp_order);
			magiam = magiam.data
			console.log(magiam)
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
			// console.log(Show_MH.data)
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
		case 'Online Games':
			tmp = '<button class="btn-back" type="button" onclick="back_page();"><i class="ti-arrow-left"> </i>Quay Lại</button>'
			document.querySelector('.show_btn_back').innerHTML = tmp
			html +='<div class="table_responsive" id = "main_table">'
			html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
			

			html +='	<thead style="background: none;background: var(--light);">'
			html +='	<tr>'
			html +='		<th style="text-align: left;">STT</th>'
			html +='		<th style="text-align: left;">NGUYÊN LIỆU</th>'
			html +='		<th style="text-align: right;">SỐ LƯỢNG</th>'
			html +='		<th style="text-align: right;">ĐƠN VỊ</th>'
			html +='	</tr>'
			html +='	</thead>'
			html +='	<tbody id="list_order">'
			temp_order = {action: 'All_game_idc'}
			let gamedata = await instance.post('/idc', temp_order);
			let list_games= gamedata.data.rev_data
			console.log(eval(list_games))
			for (let index = 0; index < list_games.length; index++) {
				const element = list_games[index];
				console.log(element)
				let name_game = element.Name_Game;
				let Group_game = element.Group_Game;

				html += `<tr id='${'id'}'>`
				html += `<td data-label="STT">${'lastRowIndex'}</td>`
				html += `<td data-label="TÊN" style="min-width: 270px; font-weight:600;">${name_game}</td>`
				html += `<td data-label="MÔ TẢ" style="font-style:italic; color: grey;">${Group_game}</td>`
				// html += `<td data-label="ĐƠN VỊ" style="width: 70px;">${donvi}</td>`
				// html += `<td data-label="TỒN KHO" style="text-align: right;">${sl}</td>`
				// html += `<td data-label="THAO TÁC"><div class="danhmuc_thaotac" titles="DM_NGUYENLIEU"><i class="far fa-edit" item='edit'></i>  <i class="ti-support" item='add'></i> <i class="far fa-trash-alt" item='del'></i></td>`
				html += '</tr>'
			}
			html += '</tbody>'
			html += '</table>'
			html += '</div>'
			/*-------- show chon page ------- */
			html +=`<div class="" id="pagination-demo1" style="margin: 10px auto;"></div>`

			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)
			let a = 0;
			a


		break;
		case 'Offline Games':
		break;
		case 'Menu Game':
			//Thiết lập menu dịch vụ cho phép bạn sắp xếp thứ tự hiển thị của danh mục và mặt hàng trên launcher tại máy trạm.
			html += `<div class="importan-note" style="border-radius: 0;padding: 15px; font-size:18px; border-radius: 5px;">
						<span>Thiết lập menu Games cho phép bạn sắp xếp thứ tự hiển thị của danh mục và game trên KLMenu tại máy trạm.</span>
					</div>
					<div class="row">
						<div class="col l-3 border" style="width: 300px; padding: 20px;">
							<div id="list_danhmuc">
								<div class="course-item" id="1" style= "color: white; margin: 10px 0; cursor: move;">
									<div class="header" style="margin-bottom: 20px; border: 1px solid rgba(255, 255, 255, .2); text-transform:none;">Online Games</div>
								</div>

								<div class="course-item" id="2" style="color: white; margin: 10px 0; cursor: move;">
									<div class="header" style="margin-bottom: 20px; border: 1px solid rgba(255, 255, 255, .2); text-transform:none;">Offline Games</div>
								</div>
							</div>
						</div>

						<div class="col l-3" style="border: none; width: 80%;">
							<div class="course-item" style= "color: white; border: 1px solid rgba(255, 255, 255, .2);border-radius: 5px;
							box-shadow: rgba(255, 255, 255, 0.25) 0px 0.0625em 0.0625em, rgba(255, 255, 255, 0.25) 0px 0.125em 0.5em, rgba(0, 0, 0, 0.1) 0px 0px 0px 1px inset;">
								<div class="header">
									<span>Online Games</span>
								</div>
								
								<div id="list_sort_online" style="padding:20px;">
									<!--- -->`
						html+=	`</div></div>`
						html +=	`<div class="course-item" style= "color: white; margin-top: 5px; border: 1px solid rgba(255, 255, 255, .2); border-radius: 5px; margin-top: 20px;
									box-shadow: rgba(255, 255, 255, 0.25) 0px 0.0625em 0.0625em, rgba(255, 255, 255, 0.25) 0px 0.125em 0.5em, rgba(0, 0, 0, 0.1) 0px 0px 0px 1px inset;">
								<div class="header">
									<span>Offline Games</span>
								</div>
								
								<div id="list_sort_offline" style="padding:20px;">`
									
			html+=		 		`</div>
							</div>
						</div>
					</div>
					`
			// `box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;`
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)

			//render table row
			temp_order = {action: 'All_game'}
			Show_MH = await instance.post('/idc', temp_order);
			console.log(Show_MH.data)
			await render_rows(Show_MH.data, 'DM_MENUGAME')
			
			// sắp xếp online
			$(()=>{
				let sort=[];
				const wrapper = $("#list_sort_online")[0]
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
						// console.log(sort)
					  }
				});
				
			})

			// sắp xếp offline
			$(()=>{
				let sort=[];
				const wrapper = $("#list_sort_offline")[0]
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
											<p>Hiển thị Bảng tin Phòng Máy khi Menu vừa khởi động</p>
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
											<p>Bảng Tin Phòng Máy</p>
										</label>
									</div>
									
								</div>

								<div class="header" style="padding:0;margin-bottom: 20px; border: 1px solid rgba(255, 255, 255, .2);  text-transform:none; border-radius: 5px;
								box-shadow: rgba(255, 255, 255, 0.25) 0px 0.0625em 0.0625em, rgba(255, 255, 255, 0.25) 0px 0.125em 0.5em, rgba(0, 0, 0, 0.1) 0px 0px 0px 1px inset;">

									<div class="Bangtin_content">
										<span>Nội dung Bảng Tin </span>
										<div>
											<button>Huỷ</button>
											<button class="capnhat">Cập nhật</button>
										</div>
									</div>

									<div style="margin: 20px 20px;"> Hướng dẫn soạn nội dung bảng tin.</div>

									<!-- Editor -->
									<div id="editor" spellcheck="false" style="margin-top:20px;padding:0;"></div>
								</div>
								
								
							</div>
						</div>
					</div>`

			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)
			
			const Editor = toastui.Editor;
			const editor = new Editor({
				el: document.querySelector('#editor'),
				height: '500px',
				// initialEditType: 'markdown',
				initialEditType: 'wysiwyg',
				previewStyle: 'vertical',
				theme: 'dark',
				placeholder: 'Vui lòng Soạn nội dung ở đây...'
			});
		
			editor.getMarkdown();
			document.querySelector('.header .capnhat').addEventListener('click', function (event) {
				var content = editor.getHTML()
				console.log(content)
			});
			
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
/*--------- func header of don hang, bia, may tram ------------- */
async function header(value_back) {
	let temp = {action: 'info-DoanhThu'}
	let res = await instance.post('/cashier', temp);
	let value_tmp = res.data[0]
	// console.log(value_tmp)
	localStorage.setItem('id_ca', value_tmp.id_ca)
	let html ='';
	back_pages = value_back
	/*--------------- show btn thietlapca ------------------------ */
	let tmp = `<div class='thietlapca'> 
				<div class="dropdown">
					<div class="drop_btn nut_dropdown"><i class="fa fa-users" aria-hidden="true"></i> Thiết Lập Ca <i class="fa fa-angle-up"></i></div>
					<div class="noidung_dropdown">
						<button class="nhan_don" onclick="nhan_don()">Nhận Đơn</button>
						<hr style="margin: 0;color: grey;">
					<button id="ket_ca" class="ket_ca" onclick="ket_ca()" ketca=${value_tmp.id_ca} >Kết Thúc Ca</button>
					</div>
				</div>

				<div class="dropdown newDH" style="margin-right: 0px;">
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
				<div class="batdau_ca">
					<p style="font-size: 18px;color: yellow;"> Nhận Ca </p>
					<p class="info_ca nhan_ca"> <b style="color: green; font-size: 18px;">${user_login}</b> - ${convert_dateToVN(value_tmp.date_begin)} </p>
				</div>
				<div class="ketthuc_ca" style='display: none;'>
					<p style="font-size: 18px; font-weight: 400; color: yellow;margin-top:5px;"> Kết thúc Ca </p>
					<p class="info_ca ket_ca" style="font-size: 16px;font-weight:400;"><b style="color: green;font-size: 18px;"></b> -  </p>
				</div>
			</div>`
	html += `<div style="display: flex; flex-wrap: wrap;">
			<div class='bxdoanhthu'>
				<div class="page-header-title">
					<i class="ti-harddrives" style="background: #f10075"></i>
					<div class="d-inline">
						<h4>DOANH THU DỊCH VỤ</h4>
						<span class="DTDV" style="white-space: nowrap;">${money(value_tmp.DT_dichvu)}</span>
					</div>
				</div>
				<div class="page-header-title">
					<i class="ti-harddrives" style="background: #2a2de8"></i>
					<div class="d-inline">
						<h4>DOANH THU PHÒNG MÁY</h4>
						<span class="DTPM" style="white-space: nowrap;">${money(value_tmp.DT_PM)}</span>
					</div>
				</div>
			</div><br>`
	html += `<div class='bxdoanhthu'>
				<div class="page-header-title">
					<i class="ti-harddrives" style="background: #41a304"></i>
					<div class="d-inline">
						<h4>DOANH THU BI-A</h4>
						<span class="DTBIA">${money(value_tmp.DT_Bia)}</span>
					</div>
				</div>
				<div class="page-header-title">
					<i class="ti-harddrives"></i>
					<div class="d-inline">
						<h4>DOANH THU KHÁC</h4>
						<span class="DTKHAC">${money(value_tmp.DT_khac)}</span>
					</div>
				</div>
			</div>`
	html += `</div>
		</div>`
	html += `<div id="show_contentDM">
	</div>`
	const main = document.getElementById('main');
	main.innerHTML = '';
	main.insertAdjacentHTML("afterbegin",html)
	
	/*---------------- func show thông tin ca --------------- */
	var nhandon = document.querySelector('.thietlapca .nhan_don')
	var thongtin_ca = document.querySelector('.thongtin_ca')
	var show_ketthuc_ca = thongtin_ca.querySelector('.ketthuc_ca')
	var ket_ca = thongtin_ca.querySelector('.ket_ca')
	var nhan_ca = thongtin_ca.querySelector('.nhan_ca')
	var ketca_btn = document.getElementById('ket_ca')
	const nhan_don = document.querySelector('.Nhan_don')
	temp_order={action: 'get_tuychinh'}
	res= await instance.post('/tuychinh', temp_order);
	// console.log(res.data)
	let value = res.data[0] 
	let value_nhan_ca = value.Nhan_ca;
	
	if (value_nhan_ca == 'checked'){
		//bắt đầu ca
		//aneable btn_tao don hang
		let btn_donhang  = document.querySelector('.thietlapca .newDH');
		btn_donhang.classList.remove('disabledbutton')

		var checked = value.Nhandon;
		if(checked=='checked'){
			nhandon.innerHTML= 'Dừng Nhận Đơn'
			nhandon.style.color='red'
			ketca_btn.disabled = true;
			ketca_btn.style.opacity = '0.2'
			nhan_don.innerHTML = 'Đang Nhận Đơn'
			nhan_don.style.color='green'
			checked = 'checked'
		}else{
			nhandon.innerHTML= 'Nhận Đơn'
			nhandon.style.color='green'
			ketca_btn.disabled = false;
			ketca_btn.style.opacity = '1'
			nhan_don.innerHTML = "Dừng Nhận Đơn"
			nhan_don.style.color='red'
			checked = 'unchecked'
		}

		show_ketthuc_ca.style.display = 'none'
	}else{
		//ket thuc ca
		//disable btn_tao don hang
		let btn_donhang  = document.querySelector('.thietlapca .newDH');
		btn_donhang.classList.add('disabledbutton')

		nhandon.innerHTML= 'Nhận Đơn'
		nhandon.style.color='green'
		ketca_btn.disabled = false;
		ketca_btn.style.opacity = '1'
		nhan_don.innerHTML = "Dừng Nhận Đơn"
		nhan_don.style.color='red'
		ket_ca.innerHTML = `<b style="color: green;font-size: 18px;">NV_Thiên Thần</b> - ${convert_dateToVN(value_tmp.date_end)} `
		ketca_btn.innerHTML= 'Bắt Đầu Ca'
		nhandon.style.opacity = '0.2'
		nhandon.disabled = true;

		show_ketthuc_ca.style.display = ''
	}
	
}
/*----------------- func event BC dành cho api Báo cáo  --------------------- */
async function init_BC(get_BC, tab_BC) {
	/*---------- func event date ---------------*/
	flatpickr("#date_begin", {
		locale: "vn",
		shorthandCurrentMonth: true, //defaults to false
		// disableMobile: false,
		time_24hr: true,
		enableTime: true,
		defaultHour: '00',
		defaultMinute: '00', 
		dateFormat: "d/m/Y H:i:S",
		minDate: "2023-01",
	});
	flatpickr("#date_end", {
		locale: "vn",
		shorthandCurrentMonth: true, //defaults to false
		enableTime: true,
		dateFormat: "d/m/Y H:i:S",
		defaultHour: '23',
		defaultMinute: '59', 
		minDate: "2023-01",
	});
	var d = new Date();
	d.setHours(0,0,0,0);		
	var date_begin = d.toLocaleString("en-ZA", {
		hour12: false,
		timeZone: "Asia/Ho_Chi_Minh",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute:"2-digit",
		second: "2-digit",
	});
	date_begin = (date_begin.replace(',','')).replaceAll('/', '-')
	var e = new Date();
	e.setHours(23,59,0,0);		
	var date_end = e.toLocaleString("en-ZA", {
		hour12: false,
		timeZone: "Asia/Ho_Chi_Minh",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute:"2-digit",
		second: "2-digit",
	});
	date_end = (date_end.replace(',','')).replaceAll('/', '-')
	var input_date_begin = document.querySelector('#date_begin')
	if (input_date_begin)
		input_date_begin.value = convert_dateToVN(date_begin)
	var input_date_end = document.querySelector('#date_end')
	if (input_date_end)
		input_date_end.value = convert_dateToVN(date_end)
	/*---------- set date current ------------- */
	async function init() {
		var input_date_begin = document.querySelector('#date_begin')
		let date_begins, date_ends;
		if (input_date_begin)
			date_begins = convert_dateToUS(input_date_begin.value)
		var input_date_end = document.querySelector('#date_end')
		if (input_date_end)
			date_ends = convert_dateToUS(input_date_end.value)

		let temp = {
			date_begin: date_begins,
			date_end: date_ends,
			action: get_BC,
		}
		const res = await instance.post('/baocao', temp);
		let values = res.data.listtable
		/*------------------ func group by sum array ------------- */
		if (get_BC== 'get_BCNL'){
			values = Object.values(values.reduce(function(r, e) {
				var key = e.id_NL;
				if (!r[key]) {
					r[key] = e;
				}else {
					r[key].soluong_NL += e.soluong_NL
				}
				return r;
			}, {}))
		}else if(get_BC== 'get_BCMH'){
			//loc đơn hoàn thành
			values = await values.filter((el) => {return el.Action === 'HOANTHANH'});
			// console.log(values)
			values = Object.values(values.reduce(function(r, e) {
				var key = e.id_MH;
				if (!r[key]) {
					r[key] = e;
				}else {
					r[key].soluong_MH += e.soluong_MH
				}
				return r;
			}, {}))
			// console.log(values)
		}
		// console.log(values)
		waitUntilElementExists('.table_responsive', (el) => {
			loc_list(tab_BC,values);
			/*----------------- search --------------- */
			const action = document.querySelectorAll('.dropbox_old select')
			action.forEach(element => {
				if(element){
					//huỷ event change
					element.removeEventListener('change',arguments.caller,false);
					//add event change
					element.addEventListener('change',async function (evt) {
						loc_list(tab_BC, values);
					});
				}
			});
			/*----------------- input search --------- */
			const input_search = document.querySelector('input#search_custom')
			if (input_search){
				document.querySelector('input#search_custom').addEventListener('keyup',function (evt) {
					loc_list(tab_BC, values);
				});
			}
			
		});		
	}
	//------------ event btn search date ----------//
	const btn_date = document.querySelector('button.date_search')
	if(btn_date){
		//huỷ event change
		btn_date.removeEventListener('click',arguments.caller,false);
		btn_date.addEventListener('click', async function (evt) {
			init();
		});
	}

	await init();
}
/*------------------ func render table order --------------------*/
async function loc_list(BC, values, exports){
	console.log(values, BC)
	let new_list=[]
	if (BC === 'BC_Đơn Hàng'){
		const action = document.querySelector('#search_action select').value
		const DM = document.querySelector('#search_DM select').value
		const MH = document.querySelector('#search_MH select').value
		const NV = document.querySelector('#search_NV select').value
		const custom = document.querySelector('#search_custom').value
		const LoaiTT = document.querySelector('#search_LoaiTT select').value
		new_list = values
		/*---------------- loc action --------------------------------- */
		new_list = await new_list.filter((el) => {
			// console.log(el.Action, action)
			if(action === "TẤT CẢ"){
				return el.Action === "HOANTHANH" || el.Action === "HUY"
			}else if (action === "HỦY"){
				return el.Action === "HUY"
			}
			return el.Action === 'HOANTHANH'
		});
	
		/*---------------- loc DM --------------------------------- */
		new_list = await new_list.filter((el) => {
			// console.log(el.id_DM, DM)
			if(DM !== "Danh Mục"){
				return Number(el.id_DM) === Number(DM)
			}
			return new_list
		});
		/*---------------- loc MH --------------------------------- */
		new_list = await new_list.filter((el) => {
			// console.log('mathang',el.name_MH, MH)
			if(MH !== "Mặt Hàng"){
				return Number(el.id_MH) === Number(MH)
			}
			return new_list
		});
		// /*---------------- loc NV --------------------------------- */
		// new_list = await new_list.filter((el) => {
		// 	console.log('nhanvien',el.NvOrder, NV)
		// 	if(NV !== "Nhân Viên"){
		// 		return el.id_NV === NV
		// 	}
		// 	return new_list
		// });
	
		/*---------------- loc Custom --------------------------------- */
		new_list = await new_list.filter((el) => {
			// console.log('custom',"I love freeCodeCamp".includes("love"))
			if(custom !== ""){
				let text_search = el.Custom.toUpperCase()
				return text_search.includes(custom.toUpperCase()) == true
			}
			return new_list
		});
	
		// /*---------------- loc LoaiTT --------------------------------- */
		// new_list = await new_list.filter((el) => {
		// 	console.log('custom',el.LoaiTT, LoaiTT)
		// 	if(LoaiTT !== "Thanh Toán"){
		// 		return el.LoaiTT === LoaiTT
		// 	}
		// 	return new_list
		// });
	
	
	}else if(BC === 'BC_Mặt Hàng'){
		const DM = document.querySelector('#search_DM select').value
		const MH = document.querySelector('#search_MH select').value
		new_list = values
		// console.log(new_list)
		/*---------------- loc DM --------------------------------- */
		new_list = await new_list.filter((el) => {
			// console.log(el.id_DM, DM)
			if(DM !== "Danh Mục"){
				return Number(el.id_DM) === Number(DM)
			}
			return new_list
		});
		/*---------------- loc MH --------------------------------- */
		new_list = await new_list.filter((el) => {
			// console.log('mathang',el.name_MH, MH)
			if(MH !== "Mặt Hàng"){
				return Number(el.id_MH) === Number(MH)
			}
			return new_list
		});
		/*---------------- loc don huy ----------------------- */
		// new_list = await new_list.filter((el) => {
		// 	return Number(el.Huy_Don) !== 1
		// });
	}else if(BC === 'BC_Nguyên Liệu'){
		const DM = document.querySelector('#search_DM select').value
		const MH = document.querySelector('#search_MH select').value
		new_list = values
		/*---------------- loc DM --------------------------------- */
		new_list = await new_list.filter((el) => {
			// console.log(el.id_DM, DM)
			if(DM !== "Danh Mục"){
				return Number(el.id_DM) === Number(DM)
			}
			return new_list
		});
		/*---------------- loc MH --------------------------------- */
		new_list = await new_list.filter((el) => {
			// console.log('mathang',el.name_MH, MH)
			if(MH !== "Mặt Hàng"){
				return Number(el.id_MH) === Number(MH)
			}
			return new_list
		});
		
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
		let NV = document.querySelector('#Trạng Thái select').value
		let NL = document.querySelector('#search_NL select').value	
		new_list = values
		if(new_list){
			// console.log(NV, NL, Thaotac)
			/*---------------- loc NV --------------------------------- */
			new_list = await values.filter((el) => {
				if(NV !== "Nhân Viên"){
					return el.Person === NV
				}
				return new_list
			});
			/*---------------- loc NL --------------------------------- */
			new_list = await new_list.filter((el) => {
				console.log(String(el.NameNL).trim(), String(NL).trim())
				if(NL !== "Nguyên Liệu"){
					return (el.NameNL).trim() === NL.trim()
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
		}
		
		
	}else if(BC === 'BC_Tồn Kho'){
		let DM = document.querySelector('#search_DM select').value
		let MH = document.querySelector('#search_MH select').value
		let NL = document.querySelector('#search_NL select').value
		
		let temp = {action: 'getDM'}
		const res = await instance.post('/baocao', temp);	
		// get list NL of DM
		let list_DM_MH = res.data
		list_DM_MH = await list_DM_MH.filter((el) => {
			if(DM !== "Danh Mục"){
				return Number(el.id_DM) === Number(DM)
			}
			return list_DM_MH
		});
		var id_NL_DM =[]
		for (let index = 0; index < list_DM_MH.length; index++) {
			const element = list_DM_MH[index];
			for (let i = 0; i < element.nguyenlieu.length; i++) {
				const item = element.nguyenlieu[i];
				// console.log(item, list_DM[index])
				id_NL_DM.push(Number(item.id_NL))
			}
		}
		// get list NL of MH
		let list_NL_MH = res.data
		list_NL_MH = await list_NL_MH.filter((el) => {
			if(DM !== "Mặt Hàng"){
				return Number(el.id_MH) === Number(MH)
			}
			return list_NL_MH
		});
		var id_NL_MH =[]
		for (let index = 0; index < list_NL_MH.length; index++) {
			const element = list_NL_MH[index];
			for (let i = 0; i < element.nguyenlieu.length; i++) {
				const item = element.nguyenlieu[i];
				id_NL_MH.push(Number(item.id_NL))
			}
		}
		// console.log(list_NL_MH)
		/*---------------- loc list ---------------------- */
		new_list = values
		if(new_list){
			/*---------------- loc NL --------------------------------- */
			new_list = await new_list.filter((el) => {
				if(NL !== "Nguyên Liệu"){
					return Number(el.id_NL) === Number(NL)
				}
				return new_list
			});
			/*---------------- loc DM --------------------------------- */
			new_list = await new_list.filter((el) => {
				if(DM !== "Danh Mục"){
					return id_NL_DM.includes(el.id_NL)
				}
				return new_list
			});
			
			/*---------------- loc MH --------------------------------- */
			new_list = await new_list.filter((el) => {
				if(MH !== "Mặt Hàng"){
					return id_NL_MH.includes(el.id_NL)
				}
				return new_list
			});
		}
		

	}else if(BC === 'BC_Xuất Báo Cáo'){
		// ExportData()

		return;
	}else if(BC === 'BC_Nhật Ký Thao Tác'){
		new_list = values
	}else if(BC === 'BAN_BI-A'){
		let trangthai = document.querySelector('.lang-menu .Trangthai')
		let name_table = document.querySelector('.lang-menu .name_table')
		values.sort((a, b) =>a.name.localeCompare(b.name));
		new_list = values
		/*---------------- loc name Table bia --------------------------------- */		
		new_list = await new_list.filter((el) => {
			if(trangthai.innerText!=="Trạng Thái")
				return el.id_Thaotac === trangthai.id
			return new_list
		});

		new_list = await new_list.filter((el) => {
			if(name_table.innerText !=='Bàn BI-A')
				return Number(el.id_table) === Number(name_table.id)
			return new_list
		});
		show_search(BC, new_list, exports)
		return;
	}else if(BC === 'History_BIA'){
		new_list = values
		const name_table = document.querySelector('#name_table select').value
		/*---------------- loc name Table bia --------------------------------- */		
		new_list = await new_list.filter((el) => {
			if(name_table !== 'Bàn BI-A')
				return Number(el.id_table) === Number(name_table)
			return new_list
		});
		phantrang(BC, new_list, '')
	}else if(BC === 'HV_table'){

	}

	/*================================================================*/
	if (BC.includes('BC_'.toUpperCase()) == true){
		//------------------------- tính tổng DT ---------------//
		try {
			// tính tổng doanh thu
			let Total = 0;
			for (let index = 0; index < new_list.length; index++) {
				const element = new_list[index];
				let Topping_list_order = element.Topping
				let SL =element.soluong_MH
				let price = element.price_MH
				var phantramKM = element.phantramKM
				let show_KM =`(GG: <b style="color: white;">${phantramKM}%</b>)`
				Number(phantramKM) ==0? show_KM= '':null
				// console.log(element)
				var price_TC = element.price_TC
				price =='Tuỳ Chọn'? price= price_TC: price = price-(price*phantramKM/100)
				let TT = price
				price = money(price)
				if(Topping_list_order){
					if (Topping_list_order.length > 0){
						for (var n = 0; n < Topping_list_order.length; n++) {
							let Total_topping = Number(Topping_list_order[n].soluong_TPDH) * Number(Topping_list_order[n].Topping_DG)
							TT += Number(Total_topping)
						}
					}
				}
				TT = TT*SL
				Total += Number(TT)
			};
			document.querySelector('.DTDV').innerHTML = money(Total)
		} catch (error) {}
		//------------------ phân trang ------------------------//
		$(function() {
			(function(name) {
			var container = $('#pagination-' + name);
			//   if (!container.length) return;
			var options = {
				dataSource: new_list,
				pageSize: 20,
				className: 'paginationjs-big',
				callback: function (response, pagination) {
					// window.console && console.log(response, pagination);
					show_search(BC, response, exports, pagination);
				}
			};	  
			//$.pagination(container, options);	  
			container.addHook('beforeInit', function () {
				// window.console && console.log('beforeInit...');			
			});
			container.pagination(options);	  
			container.addHook('beforePageOnClick', function () {
				// window.console && console.log('beforePageOnClick...');			
				//return false
			});
			})('demo1');
		});
	}
		
}
async function show_search(BC, new_list, exports, pagination){
	// console.log(pagination)
	if (BC === 'BC_Đơn Hàng'){
		if (new_list){
			let Total = 0;
			let html= '';
			let STT = Number(pagination.pageSize)* (Number(pagination.pageNumber)-1)
			new_list.forEach(function(element, index){
				STT+=1
				let date_time = element.date_thutien
				let custom =element.Custom
				let NV = element.id_NV
				let MH =element.name_MH
				let DM =element.name_DM
				let SL =element.soluong_MH
				let price = element.price_MH
				var phantramKM = element.phantramKM
				let show_KM =`(GG: <b style="color: yellow;">${phantramKM}%</b>)`
				Number(phantramKM) ==0? show_KM= '':null
				// console.log(element)
				var price_TC = element.price_TC
				price =='Tuỳ Chọn'? price= price_TC: price = price-(price*phantramKM/100)
				let TT = price
				price = money(price)
				let Thanhtoan = element.LoaiTT
				let LD = element.Thaotac
				let HUY = element.Huy_Don;
				let Topping_list_order = element.Topping
				let color='green'
				if (Number(HUY) == 1){
					color='red'
					LD= "HỦY: "+LD
					// SL = 0;
					// Thanhtoan = null
				}
				html += `<tr>`
				html += `<td data-label="STT" style="text-align: center;">${STT}</td>`
				html += `<td data-label="THỜI GIAN">${convert_dateToVN(date_time)}</td>`
				html += `<td data-label="KHÁCH HÀNG">${custom}</td>`
				html += `<td data-label="NHÂN VIÊN" style="text-align: center;">${NV}</td>`
				html += `<td data-label="MẶT HÀNG">
							<div style="display: flex; padding: 0px; margin: 0px;">
								<div style= "color: white;padding:0px; margin: 0px; width:70%; text-align: left;">
									
									<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">${MH} <b style="font-size:12px;">${show_KM}</b></span>
								</div>
								<div style= "padding: 0px;margin: 0px; text-align: right; flex-grow: 2;">
									<span class="priceMH" style="font-size: 18px;padding:0;margin: 0px;color: var(--white_text);">${price}</span>
								</div>
							</div>`
							
				if (Topping_list_order.length > 0){
					html +=         `
									<table cellspacing="0" cellpadding="0" id="MHtoppings" class="table-popup" style="margin:0; display: block; font-size: 18px; width:100%;padding:0;">
										<thead>
											<tr style="background-color:var(--yellow_low);">
												<th style="font-size: 14px; text-align: left;">TOPPING</th>
												<th style="font-size: 14px;">Số Lượng</th>
												<th style="font-size: 14px; text-align: right;">Đơn Giá</th>									
											</tr>
										</thead>
										<tbody id="list_order">`
					for (var n = 0; n < Topping_list_order.length; n++) {
						let Total_topping = Number(Topping_list_order[n].soluong_TPDH) * Number(Topping_list_order[n].Topping_DG)
						TT += Number(Total_topping)
								html += `<tr style='padding:0;margin: 0px;'>
											<td data-label="TÊN" style="width:100%;"><span class="MHtopping" style="">${Topping_list_order[n].name_MH}</span></td>
											<td data-label="SL" style="max-width: 50px; text-align: center;padding:0;margin: 0px;"><span disabled="disabled" style="border: none; width: 100%;">${Topping_list_order[n].soluong_TPDH}</span></td>
											<td data-label="ĐG" style="min-width: 100px; text-align: right;padding:0;margin: 0px;"><span class="MHtopping">${money(Topping_list_order[n].Topping_DG)}</span></td>
										</tr>`	
											
					}	
					html +=				`</tbody>
									</table>
								</td>`
				}
				
				html += `<td data-label="DANH MỤC" style="text-align: center;">${DM}</td>`
				html += `<td data-label="ĐƠN GIÁ" style="text-align: right;">${money(TT)}</td>`
				TT = TT*SL
				html += `<td data-label="SỐ LƯỢNG" style="text-align: center;">${SL}</td>`
				html += `<td data-label="THÀNH TIỀN" style="text-align: right;">${money(TT)}</td>`
				html += `<td data-label="THANH TOÁN" style="text-align: left;">${Thanhtoan}</td>`
				html += `<td data-label="LÝ DO" style="text-align: right; color: ${color}"> ${LD}</td>`
				html += '</tr>'
				Total += Number(TT)
			});
			let main = document.querySelector("#list_order")
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)
			
		};
	}else if(BC === 'BC_Mặt Hàng'){
		if (new_list){
			let Total = 0;
			let html= '';
			let STT =0
			new_list.forEach(function(element, index){
				STT+=1
				// let date_time = element.date_new
				// let custom =element.Custom
				// let NV = element.id_NV
				let MH =element.name_MH
				let DM =element.name_DM
				let SL =element.soluong_MH
				let price = element.price_MH
				var phantramKM = element.phantramKM
				let show_KM =`(GG: <b style="color: yellow;">${phantramKM}%</b>)`
				Number(phantramKM) ==0? show_KM= '':null
				// console.log(element)
				var price_TC = element.price_TC
				price =='Tuỳ Chọn'? price= price_TC: price = price-(price*phantramKM/100)
				let TT = price
				price = money(price)
				let Thanhtoan = element.LoaiTT
				let LD = element.Thaotac
				let HUY = element.Huy_Don;
				let Topping_list_order = element.Topping
				let color='green'
				

				html += `<tr class="has-rowspan">`
				html += `<td data-label="STT" style="text-align: left;">${STT}</td>`
				html += `<td data-label="MẶT HÀNG" style="white-space: nowrap;">
							<div style="display: flex; padding: 0px; margin: 0px;">
								<div style= "color: white;padding:0px; margin: 0px; width:70%; text-align: left;">
									<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">${MH} <b style="font-size:12px;">${show_KM}</b></span>
								</div>
								
							</div>
						</td>`
				// 	<div style= "padding: 0px;margin: 0px; text-align: right; flex-grow: 2;">
				// 	<span class="priceMH" style="font-size: 18px;padding:0;margin: 0px;color: var(--white_text);">${price}</span>
				// </div>
				html += `<td data-label="DANH MỤC" style="text-align: left;">${DM}</td>`
				html += `<td data-label="ĐƠN GIÁ" style="text-align: right;">${money(TT)}</td>`
				html += `<td data-label="SỐ LƯỢNG" style="text-align: left;">${SL}</td>`
				TT = TT*SL
				html += `<td data-label="THÀNH TIỀN" style="text-align: right;">${money(TT)}</td>`
				html += '</tr>'
				Total += Number(TT)
			});
			let main = document.querySelector("#list_order")
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)
			// document.querySelector('.DTDV').innerHTML = money(Total)
		};
	}else if(BC === 'BC_Nguyên Liệu'){
		if (new_list){
			let Total = 0;
			let html= '';
			let STT =0
			new_list.forEach(function(element, index){
				console.log(element)
				STT+=1
				let NL = element.name_NL
				let SL = element.soluong_NL
				let donvi = element.donvi
				html += `<tr class="has-rowspan">`
				html += `<td data-label="STT" style="text-align: left; width:150px;">${STT}</td>`
				html += `<td data-label="NGUYÊN LIỆU" style="white-space: nowrap; text-align: left;">${NL}`
				html += `<td data-label="SỐ LƯỢNG" style="text-align: right;width:50px;">${SL}</td>`
				html += `<td data-label="ĐƠN VỊ" style="text-align: right;width:50%;">${donvi}</td>`
				html += '</tr>'
			});
			let main = document.querySelector("#list_order")
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)
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
				html += `<tr class="has-rowspan">`
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
		if(new_list){
			let html= '';
			let STT =0
			new_list.forEach(function(element, index){
				STT+=1
				let NL = element.NameNL
				let Before =element.Tonkho_before
				let after = element.Tonkho_after
				let SL = element.SL
				let ghichu = element.mota
				let action = element.action
				let Gianhap = element.Price_import
				let date = convert_dateToVN(element.date_new)
				let NV = element.Person
				let Total = Gianhap*SL
				action == 'Điều chỉnh'? Total = -Total: null
				html += `<tr class="has-rowspan">`
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
				html += `<td data-label="GHI CHÚ" style="white-space: nowrap;text-align: right;">${ghichu}</td>`	
				html += '</tr>'
			});
			let main = document.querySelector("#list_order")
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)
		}
		
	}else if(BC === 'BC_Tồn Kho'){
		if (new_list){
			let html= '';
			let STT =0
			new_list.forEach(function(element, index){
				// console.log(element)
				STT+=1
				let NL = element.name_NL
				let TonKho =element.Tonkho
				let Gianhap = element.TB_gia
				var Total = Math.floor(Number(Gianhap)*Number(TonKho))
				html += `<tr class="has-rowspan">`
				html += `<td data-label="STT" style="text-align: left;">${STT}</td>`
				html += `<td data-label="NGUYÊN LIỆU" style="white-space: nowrap;text-align: left;">${NL}</td>`
				html += `<td data-label="TỒN KHO" style="text-align: center; width:80px;">${TonKho}</td>`
				html += `<td data-label="GIÁ NHẬP TRUNG BÌNH" style="text-align: right;">${money(Gianhap)}</td>`
				html += `<td data-label="TỔNG" style="white-space: nowrap;text-align: right;">${money(Total)}</td>`		
				html += '</tr>'
			});
			let main = document.querySelector("#list_order")
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)
		};
	}else if(BC === 'BC_Xuất Báo Cáo'){
		return;
	}else if(BC === 'BC_Nhật Ký Thao Tác'){
		// if (new_list){
			let html= '';
			let STT =0
			new_list.forEach(function(element, index){
				STT+=1
				let date = element.date_new
				let action =element.Thaotac
				let account = element.user
				let doituong = element.Doituong
				let mota = element.mota
				html += `<tr class="has-rowspan">`
				html += `<td data-label="STT" style="text-align: left;">${STT}</td>`
				html += `<td data-label="THỜI GIAN" style="white-space: nowrap;text-align: left;">${date}</td>`
				html += `<td data-label="TÀI KHOẢN" style="text-align: right; width:80px;">${account}</td>`
				html += `<td data-label="THAO TÁC" style="text-align: right;">${action}</td>`
				html += `<td data-label="ĐỐI TƯỢNG" style="white-space: nowrap;text-align: right;">${doituong}</td>`	
				html += `<td data-label="" style="white-space: nowrap;text-align: right;">${mota}</td>`	
				html += '</tr>'
			});
			let main = document.querySelector("#list_order")
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)
		// };
	}else if(BC === "BAN_BI-A"){
		let html='';
		var value = new_list
		for (let index = 0; index < value.length; index++) {
			/*-------- parameter bia ------------ */
			let id_table = value[index].id_table
			let name_bia = value[index].name
			let price_bia = value[index].price
			let Group_bia = value[index].Group
			let date_begin = value[index].date_begin
			let date_end = value[index].date_end
			let trangthai = value[index].trangthai
			let btn_name = trangthai
			let id_btnname = value[index].id_Thaotac
			var Tong_TT = value[index].Tong_TT
			// console.log(value[index], Tong_TT)
			trangthai =''
			let TTien;
			const list_order = value[index].list_order
			// const rowspan = list_order.length
			var date_now = new_date()
			date_end!=''? date_now = date_end: null
			const timestamp_seconds = get_seconds(date_now)/ 1000;

			let date_begin_second = get_seconds(new_date())/ 1000;
			date_begin!=''? date_begin_second = get_seconds(date_begin)/ 1000: null
			let Seconds = timestamp_seconds - date_begin_second
				
			let hrs = Math.floor(Seconds / 3600);
			let mins = Math.floor((Seconds - (hrs*3600)) / 60);
			let secs = Seconds % 60;
					
			if (secs < 10) secs = '0' + secs;
			if (mins < 10) mins = '0' + mins;
			if (hrs < 10) hrs = '0' + hrs;				
			// }
			// ban bia
			let background_bia = 'green'	
			let opacity = '0.1';
			var TongTT = 0;
			let TT_frist;

			
			let display_TTBan_TT_print = 'none';
			let visibility_TTBan_TT_print= 'hidden';
			// dang lỗi chạy thời gian sai do đây kkkk				
			if (id_btnname == 'TINHTIEN'){
				trangthai ='Đang sử dụng'
				background_bia = 'red';
				opacity = '1';
				date_begin = convert_dateToVN(date_begin)
			}else if (id_btnname =="DONBAN"){
				trangthai = convert_dateToVN(date_end)
				background_bia = 'orange';
				date_begin = convert_dateToVN(date_begin);
				display_TTBan_TT_print = '';
				visibility_TTBan_TT_print= 'visible';
				TTien = Number(Tong_TT);
				
			}else if (id_btnname == 'BATDAU'){
				TTien =0;
			}
			
			if (list_order.length>0){
				for (let j = 0; j < list_order.length; j++) {
					const element = list_order[j];	
					// console.log(element)
					const date = convert_dateToVN(element.date_new)
					const id_MH = element.id_MH
					const name = element.name_MH
					var price = element.price_MH
					var phantramKM = element.phantramKM
					// console.log(phantramKM)
					var price_TC = element.price_TC
					price =='Tuỳ Chọn'? price= price_TC: price = price-(price*phantramKM/100)
					const sl = element.soluong_MH
					const ghichu = element.Ghichu
					var Thaotac = element.Thaotac
					var action = element.Action
					const custom = element.Custom
					var id_table_custom = element.id_table_custom
					const nv = element.id_NV
					const print = element.Print
					var color_name = await get_color(color_list, element.id_DM, 'dad')
					// console.log(color_name,element.color_DM)
					color_name = color_name.color
					const Topping_list_order = element.Topping
					const id = element.id_DH
					var total = price

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
					let btn_disabled = '';
					
					let show_KM =`(GG: <b style="color: white;">${phantramKM}%</b>)`
					Number(phantramKM) ==0? show_KM= '':null
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
							btn_disabled = 'disabledbutton';
							// display_print = 'none';
							// visibility_print = 'hidden';
						break;
						case 'CHAPNHAN':

						break;
						case 'THUTIEN':
							background = "orange";
							// color = 'var(--white_text)';
							// show name thu ngan
							visibility_nvthungan = 'visible';
							display_nvthungan = ''
							// display_print = 'block';
							// visibility_print = 'visible';

							//check trả tiền dich vu trước hay sau
							console.log(role_order.Bia_thutiensau)
							if(role_order.Bia_thutiensau =='checked'){
								id_table_custom = id_table_custom.split('_')[0]
								if(id_table_custom == 'tableBia'){
									btn_disabled = ('disabledbutton');
									// btn_Huy.classList.add('disabledbutton')
									Thaotac = 'THU SAU'
								}
							}
						break;
						case 'HUY':
							huy_visibility = 'hidden';
							huy_display = 'none'
							huy_background = 'none'
							huy_color = 'red'
							huy_action = Thaotac
							// action = 'HOÀN THÀNH'
							huy_width = '100%'
							huy_disabled = 'disabled'
							visibility_nvthungan = 'visible';
							display_nvthungan = ''
							huy_padding = '0';
							// display_print = 'none';
							// visibility_print = 'hidden';
						break;
					}
					//Gộp row
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

					

				html += `<tr class="has-rowspan" id="${id_table}" style="font-size: 18px;">`
					html += `<td data-label="THỜI GIAN" class="rowspan_order ${remove_el}" rowspan='${rowspan}' style=""><span class="date_order">${date_begin}</span></td>`
					html += `<td data-label="VỊ TRÍ" rowspan='${rowspan}' class="${remove_el}">
								<div class='bida'>
									<p>${name_bia}</p>
									<p>${money(price_bia)}/giờ</p>
									<img class="ban_bida" style="margin-top: 10px; opacity: ${opacity}" src="images_order/bida1.jpg">
								</div>
							</td>`

					html += `<td data-label="TÍNH GIỜ Billiards" rowspan='${rowspan}' class="${remove_el}" style="min-width: 250px; width: 50%; text-align: left; font-size: 14px; white-space: nowrap;">`
					html+=`		<div class="time_bida_kt" style="display: flex; padding: 0px; margin: 0px;font-size: 14px;">
									<div style= "color: white;padding:0px; margin: 0px; width:70%; text-align: left;">
										<span style="padding:0;margin: 0px;">Kết Thúc:</span>
									</div>
									<div style= "padding: 0px;margin: 0px; text-align: right; flex-grow: 2;">
										<span id='time_bida_kt' style="padding:0;margin: 0px;color: var(--white_text);padding-right:5px;">${trangthai}</span>
									</div>
								</div>`
					html+=`		<div class="time_bida_sudung" style="display: flex; padding: 0px; margin: 0px;font-size: 14px;">
									<div style= "color: white;padding:0px; margin: 0px; width:70%; text-align: left;">
										<span style="padding:0;margin: 0px;">Thời Gian Thuê:</span>
									</div>
									<div style= "padding: 0px;margin: 0px; text-align: right; flex-grow: 2;">
										<span id='time_bida_sudung' style="padding:0;margin: 0px;color: var(--white_text);padding-right:5px;"></span>
									</div>
								</div>`
					html+=`		<div class="Total" style="display: flex; padding: 0px; margin: 0px;font-size: 14px;">
									<div style= "color: white;padding:0px; margin: 0px; width:70%; text-align: left;">
										<span style="padding:0;margin: 0px;">Tạm Tính:</span>
									</div>
									<div style= "padding: 0px;margin: 0px; text-align: right; flex-grow: 2;">
										<span id='TTien' style="padding:0;margin: 0px;color: var(--white_text);padding-right:5px;">${money(TTien)}</span>
									</div>
								</div>`
					html+=  	`<div class="counter" style="width:100%;">
									<div class="time">${hrs}:${mins}:${secs}</div>
									<div class="controls">
										<button id="${id_start}" style="background: ${background_bia};font-weight:600;" item="${id_btnname}">${btn_name}</button>
										<i class="ti-printer btn_DH" style='visibility: ${visibility_TTBan_TT_print}; cursor: pointer; color: green; border-radius: 5px;border: 1px solid green; font-size: 16px; min-height: 35px; background: None; padding: 10px 15px 5px 15px;' class='inhoadon' titles="DM_BIA" item="PRINT"></i>
									
									</div>
								</div>`

					//show total TT
					html+=`		<div class="TT_dichvus" style="display: flex; padding: 0px; margin: 0px;">
									<div style= "color: white;padding:0px; margin: 0px; width:70%; text-align: left;">
										<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Tiền dịch vụ:</span>
									</div>
									<div style= "padding: 0px;margin: 0px; text-align: right; flex-grow: 2;">
										<span class="TT_dichvu" style="font-size: 18px;padding:0;margin: 0px;color: var(--white_text);padding-right:5px;"> ${money(TongTT)}</span>
									</div>
								</div>`
					html+=`		<div class="TT_ban" style="display: flex; padding: 0px; margin: 0px; visibility: ${visibility_TTBan_TT_print};">
									<div style= "color: white;padding:0px; margin: 0px; width:70%; text-align: left;">
										<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Tiền bàn:</span>
									</div>
									<div style= "padding: 0px;margin: 0px; text-align: right; flex-grow: 2;">
										<span class="TT_thueban" style="font-size: 18px;padding:0;margin: 0px;color: var(--white_text);padding-right:5px;"> ${money(TTien)}</span>
									</div>
								</div>`
					html+=`		<div class="TT" style="display: flex; padding: 0px; margin: 0px; visibility: ${visibility_TTBan_TT_print};">
									<div style= "color: white;padding:0px; margin: 0px; width:70%; text-align: left;">
										<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Thanh Toán:</span>
									</div>
									<div style= "padding: 0px;margin: 0px; text-align: right; flex-grow: 2;">
										<span class="TT_Tong" style="font-size: 18px;padding:0;margin: 0px;color: var(--white_text);padding-right:5px;"> ${money(TTien+ TongTT)}</span>
									</div>
								</div>`
								
					html+=`</td>`

							//phần order
					html += `<td data-label="MẶT HÀNG" style="text-align: left; width:50%; min-width: 180px;" id="MH${id_MH}">
							<div style="display: flex; padding: 0px; margin: 0px;">
								<div style= "color: white;padding:0px; margin: 0px; width:70%; text-align: left;">
									<a class="mathang" style="background-color: ${color_name};"></a>
									<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">${name} <b style="font-size:12px;">${show_KM}</b></span>
								</div>
								<div style= "padding: 0px;margin: 0px; text-align: right; flex-grow: 2;">
									<span class="priceMH" style="font-size: 18px;padding:0;margin: 0px;color: var(--white_text);padding-right:5px;">${money(price)}</span>
								</div>
							</div>`
					if (Topping_list_order.length > 0){
						html +=         `
									<table cellspacing="0" cellpadding="0" id="MHtoppings" class="table-popup" style="margin: 0;margin-top: 10px; display: block; font-size: 18px; width:100%;padding:0;">
										<thead>
											<tr style="background-color:var(--yellow_low);">
												<th style="font-size: 16px; text-align: left; font-size: 14px;">Topping</th>
												<th style="font-size: 16px; text-align: center; font-size: 14px;">Số Lượng</th>
												<th style="font-size: 16px; text-align: right; font-size: 14px;">Đơn Giá</th>									
											</tr>
										</thead>
										<tbody id="list_order">`
					for (var n = 0; n < Topping_list_order.length; n++) {

						let TT_TP = Number(Topping_list_order[n].Topping_DG) * Number(Topping_list_order[n].soluong_TPDH)
						total= Number(total)+ Number(TT_TP)
								html += `<tr>
											<td data-label="TÊN" style="width:100%;font-size: 16px;"><span class="MHtopping" style="">${Topping_list_order[n].name_MH}</span></td>
											<td data-label="SL" style="max-width: 50px; text-align: center;"><span style="width: 100%; "/>${Topping_list_order[n].soluong_TPDH}</span></td>
											<td data-label="ĐG" style="min-width: 100px; text-align: right;"><span class="MHtopping" style="float: right;">${money(Topping_list_order[n].Topping_DG)}</span></td>
										</tr>`	
											
					}	
					html +=				`</tbody>
									</table>
								`
					}
					// ghi chú
					if (ghichu){
						html += '<p style="margin-top:5px; float:left; font-size: 16px; color: red;min-width: 200px;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--dark)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg><i> '+ghichu+'</i></p></td>'
					}
					html += `<td data-label="TT" style="white-space: nowrap; font-size: 18px; text-align: right;min-width:100px; text-align: right;"><span>${money(total)}</span></td>`
					html += '<td data-label="SL" style="text-align: center;">'+ sl +'</td>'
					html += '<td data-label="THAO TÁC" style="min-width: 180px;">'
					html += `<button IDDH='${id}' class="${btn_disabled} btn_DH" type='button' ${disabled} style='cursor: pointer; visibility: ${huy_visibility}; display: ${huy_display}; color: ${color}; border-radius: 5px;border: ${border};width: ${width}; font-size: .9rem; min-height: 0px; background: ${background}; padding: ${huy_padding}; margin-right:5px; margin-bottom: 0px; font-weight: 600;' titles="DM_BIA" item="${action}">`+ Thaotac +`</button>`//onclick='call(this);'
					html += `<button type='button' ${huy_disabled} class="btn_DH" style='cursor: pointer; visibility: ${visibility}; display: ${display}; color: ${huy_color}; border-radius: 5px;border: none;width: ${huy_width}; font-size: .9rem; min-height: 0px; background: ${huy_background}; padding: ${huy_padding}; margin-right:10px; margin-bottom: 0px; font-weight: 600;' titles="DM_BIA" item="HUYS">`+ huy_action +`</button>` //onclick='call(this);'
					html += `<br><span style="visibility: ${visibility_nvthungan}; display: ${display_nvthungan}; color: green;">`
					html += '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>'
					html += ` ${name_nvthungan}</span>`
					html += '</td>'
					
					total = Number(total)*Number(sl)
					action!=="HUY"? TongTT = TongTT + total : null
					// TongTT = TongTT + total
					// console.log(TongTT)
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
					html += `<td data-label="TÍNH GIỜ Billiards" style="width: 50%; text-align: left; font-size: 14px; white-space: nowrap;">`
					html+=`		<div class="time_bida_kt" style="display: flex; padding: 0px; margin: 0px;font-size: 14px;">
									<div style= "color: white;padding:0px; margin: 0px; width:70%; text-align: left;">
										<span style="padding:0;margin: 0px;">Kết Thúc:</span>
									</div>
									<div style= "padding: 0px;margin: 0px; text-align: right; flex-grow: 2;">
										<span id='time_bida_kt' style="padding:0;margin: 0px;color: var(--white_text);padding-right:5px;">${trangthai}</span>
									</div>
								</div>`
					html+=`		<div class="time_bida_sudung" style="display: flex; padding: 0px; margin: 0px;font-size: 14px;">
									<div style= "color: white;padding:0px; margin: 0px; width:70%; text-align: left;">
										<span style="padding:0;margin: 0px;">Thời Gian Thuê:</span>
									</div>
									<div style= "padding: 0px;margin: 0px; text-align: right; flex-grow: 2;">
										<span id='time_bida_sudung' style="padding:0;margin: 0px;color: var(--white_text);padding-right:5px;">${hrs} giờ: ${mins} phút</span>
									</div>
								</div>`
					html+=`		<div class="Total" style="display: flex; padding: 0px; margin: 0px;font-size: 14px;">
									<div style= "color: white;padding:0px; margin: 0px; width:70%; text-align: left;">
										<span style="padding:0;margin: 0px;">Tạm Tính:</span>
									</div>
									<div style= "padding: 0px;margin: 0px; text-align: right; flex-grow: 2;">
										<span id='TTien' style="padding:0;margin: 0px;color: var(--white_text);padding-right:5px;">${money(TTien)}</span>
									</div>
								</div>`

					html+=  	`<div class="counter" style="width:100%;">
									<div class="time">${hrs}:${mins}:${secs}</div>
									<div class="controls">
										<button id="start" style="background: ${background_bia};font-weight:600;" item="${id_btnname}">${btn_name}</button>
										<i class="ti-printer btn_DH" style='visibility: ${visibility_TTBan_TT_print}; cursor: pointer; color: green; border-radius: 5px;border: 1px solid green; font-size: 16px; min-height: 35px; background: None; padding: 10px 15px 5px 15px;' titles="DM_PRINT" item="PRINT"></i>
									
									</div>
								</div>`

					html+=`		<div class="TT_dichvus" style="display: flex; padding: 0px; margin: 0px;">
									<div style= "color: white;padding:0px; margin: 0px; width:70%; text-align: left;">
										<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Tiền dịch vụ:</span>
									</div>
									<div style= "padding: 0px;margin: 0px; text-align: right; flex-grow: 2;">
										<span class="TT_dichvu" style="font-size: 18px;padding:0;margin: 0px;color: var(--white_text);padding-right:5px;"> ${money(TongTT)}</span>
									</div>
								</div>`
					html+=`		<div class="TT_ban" style="display: flex; padding: 0px; margin: 0px; visibility: ${visibility_TTBan_TT_print};">
									<div style= "color: white;padding:0px; margin: 0px; width:70%; text-align: left;">
										<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Tiền bàn:</span>
									</div>
									<div style= "padding: 0px;margin: 0px; text-align: right; flex-grow: 2;">
										<span class="TT_thueban" style="font-size: 18px;padding:0;margin: 0px;color: var(--white_text);padding-right:5px;"> ${money(TTien)}</span>
									</div>
								</div>`
					html+=`		<div class="TT" style="display: flex; padding: 0px; margin: 0px; visibility: ${visibility_TTBan_TT_print};">
									<div style= "color: white;padding:0px; margin: 0px; width:70%; text-align: left;">
										<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Thanh Toán:</span>
									</div>
									<div style= "padding: 0px;margin: 0px; text-align: right; flex-grow: 2;">
										<span class="TT_Tong" style="font-size: 18px;padding:0;margin: 0px;color: var(--white_text);padding-right:5px;"> ${money(TTien+ TongTT)}</span>
									</div>
								</div>`
								
					html+=`</td>`

					html += `<td data-label="MẶT HÀNG" style="text-align: left; width:100%; min-width: 180px;"></td>`
					html += '<td data-label="SL"></td>'
					html += '<td data-label="TT" style="white-space: nowrap; font-size: 18px; text-align: right;"></td>'
					html += '<td data-label="THAO TÁC" style="min-width: 180px;"></td>'
				html += '</tr>'
			}
			
			//add Tong in list
			value[index].Tong_TT = TongTT
		}
		let main = document.querySelector('#list_bia');
		main.innerHTML = '';
		main.insertAdjacentHTML("afterbegin",html)
		
		/*--------------------- func show auto count time ------------- */
		const elements = document.querySelectorAll('#start')
		TongTT = document.querySelectorAll('.TTfrist')
		for (let i = 0; i < elements.length; i++) {
			// console.log(i, value[i])
			const el = elements[i];
			let row_table = el.parentNode.parentNode.parentNode.parentNode;
			let parent_el = (el.parentNode.parentNode.parentNode)
			let TT_dichvu = parent_el.querySelector('.TT_dichvu')
			let TT_ban = parent_el.querySelector('.TT_thueban')
			TT_dichvu.innerHTML = money(value[i].Tong_TT);
			let TT_Tong = parent_el.querySelector('.TT_Tong')
			
			let sum_TT = Number(digital(TT_dichvu.innerText)) + Number(digital(TT_ban.innerText))
			TT_Tong.innerHTML = money(sum_TT)


			// TT_ban 
			el.addEventListener('click',function (evt) {
				start(row_table, value[i])
			});
			let btn_tinhtien = el.innerText
			if (btn_tinhtien ==='TÍNH TIỀN'){
				setCounter(row_table, value[i])
				if(TongTT[i])
					TongTT[i].innerHTML = money(value[i].Tong_TT);
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
			let gia_motphut = (Number(price_bia)/60);
			let TTien = sophut*gia_motphut

			console.log(Seconds, sophut, gia_motphut, TTien)
			
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
				// TTienbida.style.color = 'var(--yellow)'
				TTienbida.innerHTML = money(TTien);
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
			let rowspan = element.children[0].getAttribute('rowspan')
			// console.log(rowspan)
			var id_row = element.getAttribute('id');
			
			let bia_TT = element.querySelector('.TT_ban')
			let bia_TTban = element.querySelector('.TT_thueban')
			let TT_dichvu = element.querySelector('.TT_dichvu')
			let bia_TTbia = element.querySelector('.TT')
			let TT_Tong = element.querySelector('.TT_Tong')
			
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
				start_btn.setAttribute('item', 'TINHTIEN')

				//print show hide
				start_btn.nextElementSibling.style.visibility='hidden'
			
				var Date_Create = convert_dateToVN(new_date());
				if (dateofrow){dateofrow.innerText = Date_Create}
				// time_bida.innerText ='Bắt Đầu: '+ Date_Create
				// TTienbida.innerText = money(0)
				time_bida_sudung.innerText =''
				ban_bida.style.opacity = "1";
				//   ban_bida.style.filter  = 'alpha(opacity=100)';
				time_bida_kt.innerText ='Đang sử dụng'
				// time_bida_sudung.innerText = `Thời Gian Thuê: `
				temp_order ={
					id_table: id_row,
					date_begin: new_date(),
					action: "BATDAU"
				}
				const res = await instance.post('/Bi-a', temp_order);

			}else if (start_btn.innerHTML=='TÍNH TIỀN'){
				//check đơn hàng trước
				let row_next = element
				let data_to_server = []
				let noidung_thongbao ='';
				for (let index = 0; index < rowspan; index++) {
					// console.log(index)
					let Thaotac = row_next.children[6]
					let name_DH = row_next.children[3].innerText
					let date_DH = row_next.children[0].innerText
					let btn_thaotac = Thaotac.querySelectorAll('button')
					for (let index = 0; index < btn_thaotac.length; index++) {
						const element = btn_thaotac[index];
						if (element.getAttribute('item')=='THUTIEN') {
							data_to_server.push(element)
						}else if(element.getAttribute('item')=='CHAPNHAN'){
							console.log(date_DH, name_DH)
							noidung_thongbao += `<p> ${date_DH} <b style="color: yellow;">${name_DH}</b></p>`
							// return alert('chua xu ly don hang')
						}
					}
					row_next= row_next.nextElementSibling			
				}
				if(noidung_thongbao!==''){
					let question = 'Vui lòng xử lý đơn hàng trước khi tính tiền !'
					// hàm callback hay ah nha
					let conf = confirm_box(noidung_thongbao, question, async function (arg) {
						console.log(arg)
						if(arg){
							return
						}else{
							clickFlag = 1;
							/*------------------ close popup ---------------------------- */
							document.querySelector('.overlay').classList.remove('showoverlay');
							document.querySelector('.containerpopup .popup').classList.remove('open-popup');
						}
					});
					return
				}
				
				let list_order =[]
				for (let index = 0; index < data_to_server.length; index++) {
					const element = data_to_server[index];
					let temp = await to_HOANHTANH(element)
					list_order.push(temp)
					// console.log(list_order)
				}				
									
				clearInterval(interval[value.id_table]);
				delete(interval[value.id_table])

				start_btn.style.background = 'orange';
				start_btn.innerHTML = 'DỌN BÀN';
				start_btn.setAttribute('item', 'DONBAN')
				var Date_Create = convert_dateToVN(new_date())
				ban_bida.style.opacity = ".1";
				time_bida_kt.innerText = Date_Create

				let timesthue = time_el.innerText.split(':')
				let Hr = timesthue[0]
				let mins = timesthue[1]
				time_bida_sudung.innerText = `${Hr} giờ: ${mins} phút`

				bia_TT.style.visibility = 'visible'
				bia_TTbia.style.visibility = 'visible'
				bia_TTban.innerHTML =  TTienbida.innerHTML
				var id_ca = localStorage.getItem("id_ca")

				temp_order ={
					id_table: id_row,
					id_ca: id_ca,
					date_end: new_date(),
					Tong_TT: digital(bia_TTban.innerText),
					list_order: list_order,
					action: "TINHTIEN"
				}
				let res = await instance.post('/Bi-a', temp_order);

				if(res){
					// console.log(res.data)
					let DT = res.data.DT[0]
					let DT_dichvu = DT.DT_dichvu
					let DT_Bia = DT.DT_Bia
					
					document.querySelector('.DTDV').innerHTML = money(DT_dichvu)
					document.querySelector('.DTBIA').innerHTML = money(DT_Bia)

					console.log(res, DT_Bia)
					let tiengio = res.data.tiengio
					// render tien gio choi
					TTienbida.style.visibility = 'hidden'
					bia_TTban.innerHTML = money(tiengio)
					/*------------------ Tính tổng bill ---------------- */
					let Tong = Number(digital(TT_dichvu.innerText))+ Number(digital(bia_TTban.innerText))
					TT_Tong.innerHTML = money(Tong)
				}
				
				//print show hide
				start_btn.nextElementSibling.style.visibility='visible'
				
				
			}else if (start_btn.innerHTML=='DỌN BÀN'){
				start_btn.setAttribute('item', 'BATDAU')
				temp_order ={
					id_table: id_row,
					action: "DONBAN"
				}
				const res = await instance.post('/Bi-a', temp_order);
				//refesh page
				let values = res.data
				loc_list(BC, values, '')
			}
		}

		async function to_HOANHTANH(element) {
			element.setAttribute('item', "HOANTHANH")

			element.innerHTML = 'HOÀN THÀNH';
			element.style.background = 'None';
			element.style.width = '125px';
			element.style.border = '1px solid green';
			element.style.color = 'green';
			element.nextSibling.style.visibility = 'hidden'
			element.nextSibling.style.display = 'none'
			let show_nvthungan = element.parentNode.children[3]
			show_nvthungan.style.visibility = 'visible'
			show_nvthungan.style.display = ''
			console.log(show_nvthungan)
			show_nvthungan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> ${user_login}`
			element.disabled = true;

			//check data gưi ve server
			var id_ca = localStorage.getItem("id_ca")
			// let id_MH
			let id_DH = element.getAttribute('IDDH')
			console.log('id_DH', id_DH, id_ca)
			temp_order = {
				id: id_DH,
				id_ca: id_ca,
				date_thutien: new_date(),
				Thaotac: 'HOÀN THÀNH',
				action: 'HOANTHANH',
				nv_order: user_login
			}
			return temp_order
		}
		/*--------- func event btn click --------- */
		let btn_click = document.querySelectorAll('#list_bia .btn_DH')
		for (let index = 0; index < btn_click.length; index++) {
			const element = btn_click[index];
			element.addEventListener('click', function(e) {
				console.log('test')
				if(element.getAttribute('item')!=='HUYS'){
					save_popup(this)
				}else{
					call_popup("DM_BIA", "HUY", this)
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
	
	}else if(BC === 'History_BIA'){
		if(BC){
			var value = new_list
			let html= '';
			for (let index = 0; index < value.length; index++) {
				/*-------- parameter bia ------------ */
				let id_table = value[index].id_table
				let name_bia = value[index].name
				let price_bia = value[index].price
				let Group_bia = value[index].Group
				let date_begin = value[index].date_begin
				let date_end = value[index].date_end
				let trangthai = value[index].trangthai
				let btn_name = trangthai
				let id_btnname = value[index].id_Thaotac
				var Tong_TT = value[index].Tong_TT
				// console.log(value[index], Tong_TT)
				trangthai =''
				let TTien;
				const list_order = value[index].list_order
				// console.log(list_order)
				// const rowspan = list_order.length
				var date_now = new_date()
				date_end!=''? date_now = date_end: null
				const timestamp_seconds = get_seconds(date_now)/ 1000;

				let date_begin_second = get_seconds(new_date())/ 1000;
				date_begin!=''? date_begin_second = get_seconds(date_begin)/ 1000: null
				// let date_begin_second = get_seconds(date_begin)/ 1000;
				let Seconds = timestamp_seconds - date_begin_second
				// Seconds = 1000
		
				let hrs = Math.floor(Seconds / 3600);
				let mins = Math.floor((Seconds - (hrs*3600)) / 60);
				let secs = Seconds % 60;
			
				// let sophut = Seconds/60;
				// let gia_motphut =  50000/60;
				// TTien = sophut*gia_motphut
				
				if (secs < 10) secs = '0' + secs;
				if (mins < 10) mins = '0' + mins;
				if (hrs < 10) hrs = '0' + hrs;				
				// }
				// ban bia
				let background_bia = 'green'	
				let opacity = '0.1';
				var TongTT = 0;
				let TT_frist;

				
				let display_TTBan_TT_print = 'none';
				let visibility_TTBan_TT_print= 'hidden';
				// dang lỗi chạy thời gian sai do đây kkkk				
				if (id_btnname == 'TINHTIEN'){
					trangthai ='Đang sử dụng'
					background_bia = 'red';
					opacity = '1';
					date_begin = convert_dateToVN(date_begin)
				}else if (id_btnname =="DONBAN"){
					trangthai = convert_dateToVN(date_end)
					background_bia = 'orange';
					date_begin = convert_dateToVN(date_begin);
					// display_print = '';
					// visibility_print= 'visible';
					display_TTBan_TT_print = '';
					visibility_TTBan_TT_print= 'visible';
					TTien = Number(Tong_TT);
					
				}else if (id_btnname == 'BATDAU'){
					TTien =0;
				}
				
				if (list_order.length > 0){
					for (let j = 0; j < list_order.length; j++) {
						const element = list_order[j];	
						console.log(element, list_order.length)
						const date = convert_dateToVN(element.date_new)
						const id_MH = element.id_MH
						const name = element.name_MH
						var price = element.price_MH
						var phantramKM = element.phantramKM
						// console.log(phantramKM)
						var price_TC = element.price_TC
						price =='Tuỳ Chọn'? price= price_TC: price = price-(price*phantramKM/100)
						const sl = element.soluong_MH
						const ghichu = element.Ghichu
						var Thaotac = element.Thaotac
						var action = element.Action
						const custom = element.Custom
						var id_table_custom = element.id_table_custom
						const nv = element.id_NV
						const print = element.Print
						var color_name = await get_color(color_list, element.id_DM, 'dad')
						// console.log(color_name,element.color_DM)
						color_name = color_name.color
						const Topping_list_order = element.Topping
						const id = element.id_DH
						var total = price

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
						let btn_disabled = '';
						
						let show_KM =`(GG: <b style="color: white;">${phantramKM}%</b>)`
						Number(phantramKM) ==0? show_KM= '':null
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
								btn_disabled = 'disabledbutton';
								// display_print = 'none';
								// visibility_print = 'hidden';
							break;
							case 'CHAPNHAN':

							break;
							case 'THUTIEN':
								background = "orange";
								// color = 'var(--white_text)';
								// show name thu ngan
								visibility_nvthungan = 'visible';
								display_nvthungan = ''
								// display_print = 'block';
								// visibility_print = 'visible';

								//check trả tiền dich vu trước hay sau
								console.log(role_order.Bia_thutiensau)
								if(role_order.Bia_thutiensau =='checked'){
									id_table_custom = id_table_custom.split('_')[0]
									if(id_table_custom == 'tableBia'){
										btn_disabled = ('disabledbutton');
										// btn_Huy.classList.add('disabledbutton')
										Thaotac = 'THU SAU'
									}
								}
							break;
							case 'HUY':
								huy_visibility = 'hidden';
								huy_display = 'none'
								huy_background = 'none'
								huy_color = 'red'
								huy_action = Thaotac
								// action = 'HOÀN THÀNH'
								huy_width = '100%'
								huy_disabled = 'disabled'
								visibility_nvthungan = 'visible';
								display_nvthungan = ''
								huy_padding = '0';
								// display_print = 'none';
								// visibility_print = 'hidden';
							break;
						}
						//Gộp row
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

						

					html += `<tr class="has-rowspan" id="${id_table}" style="font-size: 18px;">`
					html += `<td data-label="THỜI GIAN" class="rowspan_order ${remove_el}" rowspan='${rowspan}' style=""><span class="date_order">${date_begin}</span></td>`
					html += `<td data-label="VỊ TRÍ" rowspan='${rowspan}' class="${remove_el}">
								<div class='bida'>
									<p>${name_bia}</p>
									<p>${money(price_bia)}/giờ</p>
								</div>
							</td>`

					html += `<td data-label="TÍNH GIỜ Billiards" rowspan='${rowspan}' class="${remove_el}" style="min-width: 250px; width: 50%; text-align: left; font-size: 14px; white-space: nowrap;">`
					html+=`		<div class="time_bida_kt" style="display: flex; padding: 0px; margin: 0px;font-size: 14px;">
									<div style= "color: white;padding:0px; margin: 0px; width:70%; text-align: left;">
										<span style="padding:0;margin: 0px;">Kết Thúc:</span>
									</div>
									<div style= "padding: 0px;margin: 0px; text-align: right; flex-grow: 2;">
										<span id='time_bida_kt' style="padding:0;margin: 0px;color: var(--white_text);padding-right:5px;">${trangthai}</span>
									</div>
								</div>`
					html+=`		<div class="time_bida_sudung" style="display: flex; padding: 0px; margin: 0px;font-size: 14px;">
									<div style= "color: white;padding:0px; margin: 0px; width:70%; text-align: left;">
										<span style="padding:0;margin: 0px;">Thời Gian Thuê:</span>
									</div>
									<div style= "padding: 0px;margin: 0px; text-align: right; flex-grow: 2;">
										<span id='time_bida_sudung' style="padding:0;margin: 0px;color: var(--white_text);padding-right:5px;">${hrs} giờ: ${mins} phút</span>
									</div>
								</div>`
					
					html+=`		<div class="TT_dichvus" style="display: flex; padding: 0px; margin: 0px;">
									<div style= "color: white;padding:0px; margin: 0px; width:70%; text-align: left;">
										<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Tiền dịch vụ:</span>
									</div>
									<div style= "padding: 0px;margin: 0px; text-align: right; flex-grow: 2;">
										<span class="TT_dichvu" id="${id_start}" style="font-size: 18px;padding:0;margin: 0px;color: var(--white_text);padding-right:5px;"> ${money(TongTT)}</span>
									</div>
								</div>`
					html+=`		<div class="TT_ban" style="display: flex; padding: 0px; margin: 0px; visibility: ${visibility_TTBan_TT_print};">
									<div style= "color: white;padding:0px; margin: 0px; width:70%; text-align: left;">
										<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Tiền bàn:</span>
									</div>
									<div style= "padding: 0px;margin: 0px; text-align: right; flex-grow: 2;">
										<span class="TT_thueban" style="font-size: 18px;padding:0;margin: 0px;color: var(--white_text);padding-right:5px;"> ${money(TTien)}</span>
									</div>
								</div>`
					html+=`		<div class="TT" style="border-top: 1px solid rgba(255,255,255,0.2); display: flex; padding-top: 5px; margin: 0px; visibility: ${visibility_TTBan_TT_print};">
									<div style= "color: white;padding:0px; margin: 0px; width:70%; text-align: left;">
										<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Thanh Toán:</span>
									</div>
									<div style= "padding: 0px;margin: 0px; text-align: right; flex-grow: 2;">
										<span class="TT_Tong" style="font-size: 18px;padding:0;margin: 0px;color: var(--white_text);padding-right:5px;"> ${money(TTien+ TongTT)}</span>
									</div>
								</div>`
								
					html+=`</td>`


								//phần order
						html += `<td data-label="MẶT HÀNG" style="text-align: left; width:50%; min-width: 180px;" id="MH${id_MH}">
								<div style="display: flex; padding: 0px; margin: 0px;">
									<div style= "color: white;padding:0px; margin: 0px; width:70%; text-align: left;">
										<a class="mathang" style="background-color: ${color_name};"></a>
										<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">${name} <b style="font-size:12px;">${show_KM}</b></span>
									</div>
									<div style= "padding: 0px;margin: 0px; text-align: right; flex-grow: 2;">
										<span class="priceMH" style="font-size: 18px;padding:0;margin: 0px;color: var(--white_text);padding-right:5px;">${money(price)}</span>
									</div>
								</div>`
						if (Topping_list_order.length > 0){
							html +=         `
										<table cellspacing="0" cellpadding="0" id="MHtoppings" class="table-popup" style="margin: 0;margin-top: 10px; display: block; font-size: 18px; width:100%;padding:0;">
											<thead>
												<tr style="background-color:var(--yellow_low);">
													<th style="font-size: 16px; text-align: left; font-size: 14px;">Topping</th>
													<th style="font-size: 16px; text-align: center; font-size: 14px;">Số Lượng</th>
													<th style="font-size: 16px; text-align: right; font-size: 14px;">Đơn Giá</th>									
												</tr>
											</thead>
											<tbody id="list_order">`
						for (var n = 0; n < Topping_list_order.length; n++) {

							let TT_TP = Number(Topping_list_order[n].Topping_DG) * Number(Topping_list_order[n].soluong_TPDH)
							total= Number(total)+ Number(TT_TP)
									html += `<tr>
												<td data-label="TÊN" style="width:100%;font-size: 16px;"><span class="MHtopping" style="">${Topping_list_order[n].name_MH}</span></td>
												<td data-label="SL" style="max-width: 50px; text-align: center;"><span style="width: 100%; "/>${Topping_list_order[n].soluong_TPDH}</span></td>
												<td data-label="ĐG" style="min-width: 100px; text-align: right;"><span class="MHtopping" style="float: right;">${money(Topping_list_order[n].Topping_DG)}</span></td>
											</tr>`	
												
						}	
						html +=				`</tbody>
										</table>
									`
						}
						// ghi chú
						if (ghichu){
							html += '<p style="margin-top:5px; float:left; font-size: 16px; color: red;min-width: 200px;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--dark)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg><i> '+ghichu+'</i></p></td>'
						}
						html += `<td data-label="TT" style="white-space: nowrap; font-size: 18px; text-align: right;min-width:100px; text-align: right;"><span>${money(total)}</span></td>`
						html += '<td data-label="SL" style="text-align: center;">'+ sl +'</td>'
						html += '<td data-label="THAO TÁC" style="min-width: 180px;">'
						html += `<button IDDH='${id}' class="${btn_disabled} btn_DH" type='button' ${disabled} style='cursor: pointer; visibility: ${huy_visibility}; display: ${huy_display}; color: ${color}; border-radius: 5px;border: ${border};width: ${width}; font-size: .9rem; min-height: 0px; background: ${background}; padding: ${huy_padding}; margin-right:5px; margin-bottom: 0px; font-weight: 600;' titles="DM_BIA" item="${action}">`+ Thaotac +`</button>`//onclick='call(this);'
						html += `<button type='button' ${huy_disabled} class="btn_DH" style='cursor: pointer; visibility: ${visibility}; display: ${display}; color: ${huy_color}; border-radius: 5px;border: none;width: ${huy_width}; font-size: .9rem; min-height: 0px; background: ${huy_background}; padding: ${huy_padding}; margin-right:10px; margin-bottom: 0px; font-weight: 600;' titles="DM_BIA" item="HUYS">`+ huy_action +`</button>` //onclick='call(this);'
						html += `<br><span style="visibility: ${visibility_nvthungan}; display: ${display_nvthungan}; color: green;">`
						html += '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>'
						html += ` ${name_nvthungan}</span>`
						html += '</td>'
						
						total = Number(total)*Number(sl)
						action!=="HUY"? TongTT = TongTT + total : null
						// TongTT = TongTT + total
						// console.log(TongTT)
					html += '</tr>'
					
					};
				}else{
					html += `<tr class="has-rowspan" id="${id_table}" style="font-size: 18px;">`
						html += `<td data-label="THỜI GIAN" class="rowspan_order" style=""><span class="date_order">${date_begin}</span></td>`
						html += `<td data-label="VỊ TRÍ">
									<div class='bida'>
										<p>${name_bia}</p>
										<p>${money(price_bia)}/giờ</p>
									</div>
								</td>`
						html += `<td data-label="TÍNH GIỜ Billiards" style="width: 50%; text-align: left; font-size: 14px; white-space: nowrap;">`
						html+=`		<div class="time_bida_kt" style="display: flex; padding: 0px; margin: 0px;font-size: 14px;">
										<div style= "color: white;padding:0px; margin: 0px; width:70%; text-align: left;">
											<span style="padding:0;margin: 0px;">Kết Thúc:</span>
										</div>
										<div style= "padding: 0px;margin: 0px; text-align: right; flex-grow: 2;">
											<span id='time_bida_kt' style="padding:0;margin: 0px;color: var(--white_text);padding-right:5px;">${trangthai}</span>
										</div>
									</div>`
						html+=`		<div class="time_bida_sudung" style="display: flex; padding: 0px; margin: 0px;font-size: 14px;">
										<div style= "color: white;padding:0px; margin: 0px; width:70%; text-align: left;">
											<span style="padding:0;margin: 0px;">Thời Gian Thuê:</span>
										</div>
										<div style= "padding: 0px;margin: 0px; text-align: right; flex-grow: 2;">
											<span id='time_bida_sudung' style="padding:0;margin: 0px;color: var(--white_text);padding-right:5px;">${hrs} giờ: ${mins} phút</span>
										</div>
									</div>`
						
						html+=`		<div class="TT_dichvus" style="display: flex; padding: 0px; margin: 0px;">
										<div style= "color: white;padding:0px; margin: 0px; width:70%; text-align: left;">
											<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Tiền dịch vụ:</span>
										</div>
										<div style= "padding: 0px;margin: 0px; text-align: right; flex-grow: 2;">
											<span class="TT_dichvu" id="start" style="font-size: 18px;padding:0;margin: 0px;color: var(--white_text);padding-right:5px;"> ${money(TongTT)}</span>
										</div>
									</div>`
						html+=`		<div class="TT_ban" style="display: flex; padding: 0px; margin: 0px; visibility: ${visibility_TTBan_TT_print};">
										<div style= "color: white;padding:0px; margin: 0px; width:70%; text-align: left;">
											<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Tiền bàn:</span>
										</div>
										<div style= "padding: 0px;margin: 0px; text-align: right; flex-grow: 2;">
											<span class="TT_thueban" style="font-size: 18px;padding:0;margin: 0px;color: var(--white_text);padding-right:5px;"> ${money(TTien)}</span>
										</div>
									</div>`
						html+=`		<div class="TT" style="border-top: 1px solid rgba(255,255,255,0.2); display: flex; padding-top: 5px; margin: 0px; visibility: ${visibility_TTBan_TT_print};">
										<div style= "color: white;padding:0px; margin: 0px; width:70%; text-align: left;">
											<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Thanh Toán:</span>
										</div>
										<div style= "padding: 0px;margin: 0px; text-align: right; flex-grow: 2;">
											<span class="TT_Tong" style="font-size: 18px;padding:0;margin: 0px;color: var(--white_text);padding-right:5px;"> ${money(TTien+ TongTT)}</span>
										</div>
									</div>`
									
						html+=`</td>`

						html += `<td data-label="MẶT HÀNG" style="text-align: left; width:100%; min-width: 180px;"></td>`
						html += '<td data-label="SL"></td>'
						html += '<td data-label="TT" style="white-space: nowrap; font-size: 18px; text-align: right;"></td>'
						html += '<td data-label="THAO TÁC" style="min-width: 180px;"></td>'
					html += '</tr>'
				}
				
				//add Tong in list
				value[index].Tong_TT = TongTT
			}
			let main = document.querySelector('#list_bia');
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)
			/*--------------------- func show auto count time ------------- */
			const elements = document.querySelectorAll('#start')
			console.log(elements.length, value.length)
			// TongTT = document.querySelectorAll('.TTfrist')
			for (let i = 0; i < elements.length; i++) {
				// console.log(i, value[i])
				const el = elements[i];
				let row_table = el.parentNode.parentNode.parentNode.parentNode;
				let parent_el = (el.parentNode.parentNode.parentNode)
				let TT_dichvu = parent_el.querySelector('.TT_dichvu')
				let TT_ban = parent_el.querySelector('.TT_thueban')
				let TT_Tong = parent_el.querySelector('.TT_Tong')
				if(TT_dichvu)
					TT_dichvu.innerHTML = money(value[i].Tong_TT);

				let sum_TT = Number(digital(TT_dichvu.innerText)) + Number(digital(TT_ban.innerText))
				if(TT_Tong)
					TT_Tong.innerHTML = money(sum_TT)
				
			}
		}
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
			// console.log(error, this)
		} 
	});
	// excel
	exports? exportToExcel(BC, 'sheetName', 'table_order'):null
}
// check element da render chưa
var waitUntilElementExists = (selector, callback) => {
	const el = document.querySelector(selector);
	if (el){return callback(el);}
	setTimeout(() => waitUntilElementExists(selector, callback), 500);
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
	let menu = sortedList;//danh cho maytram, bi-a
	switch (title) {
		case "DM_XINCHAO":
		break;
		case "DM_MAYTRAM":
			if(menu==='May_tram'){
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
				html +='		<th style="text-align: right;">NHÓM MÁY</th>'
				html +='	</tr>'
				html +='	</thead>'
				html +='	<tbody id="list_maytram">'

				html += 	'</tbody>'
				html += '</table>'

				var show_contentDM = document.getElementById('table_bia');
				show_contentDM.innerHTML = '';
				show_contentDM.insertAdjacentHTML("afterbegin",html)


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
						//hightlight click phải
						$('tr').removeClass('active');
						$(this).addClass('active'); 

						let namepc = el.querySelector('.maytram').innerText
						call_popup("DM_MAYTRAM","Menu_maytram", {el: el, namepc:namepc})
						e.preventDefault();
					}, false);
					//Event double-clicks on an HTML element.
					el.addEventListener('dblclick', function(e) {
						let namepc = el.querySelector('.maytram').innerText
						console.log(namepc)
					});
				});

				//hightlight click trái
				$(function() {
					$('td').click(function() {
						$('tr').removeClass('active');
						$(this).parent().addClass('active'); 
					});
				});
			}else if(menu==='Hoi_vien'){
				// console.log('hoivien')
				html+= `<style>
						.input-field label, .text-field label{
							position: absolute;
							top: 45%;
							left: 15px;
							transform: translateY(-50%);
							color: var(--white_text);
							font-size: 19px;
							pointer-events: none;
							transition: 0.3s;
							}
						</style>`
				html += `<div class="menu_list hoivien" style="padding: 0; margin:0;">
							<div class="dropdown" style='background:#aaaa1136;margin:0;margin-bottom: 5px;'>
								<div class="drop_btn nut_dropdown" titles="DM_MAYTRAM" item="Hoi_vien" style="color: green;"><i class="fa fa-users" aria-hidden="true" style="color:rgb(0, 123, 255);margin-right: -5px;"></i>Hội Viên</div>
							</div>

							<div class="dropdown" style='background:#aaaa1136;margin-top:0;'>
								<div class="drop_btn nut_dropdown" titles="DM_MAYTRAM" item="The_combo" style="color: green;"><i class="ti-pencil-alt" style="color: rgb(0, 123, 255);"></i>Thẻ Combo</div>
							</div>
						</div>`

				html += `<div class="order_search table_responsive date-form" style="display: flex; width:100%;">`//padding-bottom:15px;
				// html += `<div class="btn_click" data-tooltip= "Thêm" titles="DM_MAYTRAM" item="Them_hoivien"><i class="ti-plus"></i></div>`
				// html += `<div class="btn_click" data-tooltip= "Sửa" titles="DM_MAYTRAM" item="May_tram"><i class="ti-pencil"></i></div>`
				// html += `<div class="btn_click" data-tooltip= "Xoá" titles="DM_MAYTRAM" item="May_tram"><i class="ti-close"></i></div>`
				// html += `<div class="btn_click" data-tooltip= "Nhật ký người dùng" titles="DM_MAYTRAM" item="May_tram" style="margin-right: 30px;"><i class="ti-list"></i></div>`
				html += `<div class="dropdown" style="margin:0;margin-right:3px; height: 50px;">
							<div class="drop_btn nut_dropdown" onclick="call_popup('DM_MAYTRAM','Them_hoivien');" style="color: #0099c6;margin:0;"><i class="ti-plus"> Thêm Hội Viên</i> </div>
						</div>`
				html += `<div class="btn_click" titles="DM_MAYTRAM" item="May_tram" style="margin-right: 30px;">Làm mới</div>`
				html+= `<div class="dropbox_old" id="name_table" style="margin: 0px 5px 15px 0;">
							<select>
								<option value='Tendangnhap'>Tên đăng nhập</option>
								<option value='ho'>Họ</option>
								<option value='ten'>Tên</option>
								<option value='cccd'>Số CCCD</option>
								<option value='dienthoai'>Điện thoại</option>
							</select>
							<i class="ti-angle-down"></i>
							<i class="ti-check"></i>
							<i class="ti-alert"></i>
						</div>`

				html+= `<div class="input-field" style="margin:0; ">
							<input type="text" required spellcheck="false" class="popup-input input_search_HV invalid" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);" style="text-align: left;"> 
							<label style="font-size: 16px;">Nhập kí tự tìm kiếm</label>
							
						</div>`
				html += `</div>`
				// class="paginated"
				html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
				html +='	<thead>'
				html +='	<tr>'
				html +='		<th>Tên đăng nhập</th>'
				html +='		<th style="text-align: center;">Tên</th>'
				html +='		<th style="">Họ</th>'
				html +='		<th>Tên đệm</th>'
				html +='		<th>Số tiền còn lại</th>'
				html +='		<th>Nhóm người dùng</th>'
				html +='		<th>Số CCCD(CMND)</th>'
				html +='		<th>Điện Thoại</th>'
				html +='		<th style="text-align: center;">Tình Trạng</th>'
				html +='	</tr>'
				html +='	</thead>'
				html +='	<tbody id="list_hoivien">'
				temp_order= {action: 'get_hv'}
				let res= await instance.post('/hoivien', temp_order);
				if (res.data){
					console.log(res.data)
					let value = res.data
					for (let index = 0; index < value.length; index++) {
						const element = value[index];
						let user_id = element.userid
						let name_HV = element.UserName
						let Ho_hv = element.FirstName
						let Ten_hv = element.LastName
						let tendem_hv = element.MiddeName			
						let cccd = element.ID
						let Tien_conlai = element.RemainMoney				
						let chophep = element.Active
						let sdt = element.Phone
						let nhom_hv = element.UserType

						html += `<tr class="" id='${user_id}' style="${''}">`
						html += `<td data-label="Tên đăng nhập" class="hv" id='${''}'>${name_HV}</td>`
						html += `<td data-label="Tên" style="">${Ten_hv}</td>`
						html += `<td data-label="Họ" id="${''}">${Ho_hv}</td>`
						html += `<td data-label="Tên đệm">${tendem_hv}</td>`
						html += `<td data-label="Số tiền còn lại">${Tien_conlai}</td>`
						html += `<td data-label="Nhóm người dùng" style="text-align: left;">${nhom_hv}</td>`
						html += `<td data-label="Số CCCD(CMND)" style="text-align: left;">${cccd}</td>`
						html += `<td data-label="Điện Thoại" style="text-align: left;"${sdt}></td>`
						html += `<td data-label="Trạng Thái" style="text-align: left;">${chophep}</td>`
						html += '</tr>'

					}
				}
				
				html += 	'</tbody>'
				html += '</table>'
				/*-------- show chon page ------- */
				html +=`<div class="" id="pagination-demo1" style="margin: 10px auto;"></div>`

				let show_contentDM = document.getElementById('table_bia');
				show_contentDM.innerHTML = '';
				show_contentDM.insertAdjacentHTML("afterbegin",html)

				/*----------- func event tab table -------------- */
				let btn = show_contentDM.querySelectorAll('.menu_list.hoivien .dropdown')
				btn.forEach((el, i) => {
					el.addEventListener('click',async function (evt) {
						btn.forEach((el, i) => {el.classList.remove('active')})
						this.classList.add('active')
						const selectObject = this.childNodes;
						var title = this.childNodes[1].getAttribute('titles');
						var dict = this.childNodes[1].getAttribute('item');
						if(dict=='add_bia' || dict=='config_ban'){
							// call_popup(title, dict, selectObject)
						}else if(dict=='The_combo') {
							/*------------ render row ---------------- */
							await render_rows(dict, 'DM_MAYTRAM')
						}else if(dict=='Hoi_vien') {
							/*------------ render row ---------------- */
							await render_rows(dict, 'DM_MAYTRAM')
						}
					});
				});

				/*----------- func event them ban -------------- */
				let btn_hv = show_contentDM.querySelectorAll('.btn_click')
				btn_hv.forEach((el, i) => {
					el.addEventListener('click',async function (evt) {
						btn.forEach((el, i) => {el.classList.remove('active')})
						this.classList.add('active')
						const selectObject = this.childNodes;
						var title = this.getAttribute('titles');
						var dict = this.getAttribute('item');
						if(dict=='add_bia' || dict=='config_ban'){
							// call_popup(title, dict, selectObject)
						}else if(dict=='The_combo') {
							/*------------ render row ---------------- */
							await render_rows(dict, 'DM_MAYTRAM')
						}else if(dict=='Them_hoivien') {
							call_popup(title, dict, selectObject)
						}
					});
				});


				//*------------ func event key down search (enter) ---------- */
				let input_search_HV = show_contentDM.querySelector('.input_search_HV')
				input_search_HV.addEventListener('keydown',async function (evt) {
					if(evt.key === 'Enter') {
						alert(input_search_HV.value);        
					}
				});

				//*------------- event click phải double click ------------------- */
				let menu_row = document.querySelectorAll('tr');
				menu_row.forEach((el, i) => {
					//Event click phải
					el.addEventListener('contextmenu', function(e) {
						//hightlight click phải
						$('tr').removeClass('active');
						$(this).addClass('active'); 

						// let namepc = el.querySelector('.maytram').innerText
						// call_popup("DM_MAYTRAM","Menu_maytram", {el: el, namepc:namepc})
						e.preventDefault();
					}, false);

					//Event double-clicks on an HTML element.
					el.addEventListener('dblclick', function(e) {
						let hv = el.querySelector('.hv').innerText
						let noidung_thongbao = ``//`<p>Hội viên <b style="color: yellow;">${'khách aaa'}</b></p>`
						let question = `<style>
											#id_confrmdiv {
												width: 40%;
											}
										</style>
										<div class="TT_dichvus" style="display: flex; padding: 0px; margin: 15px 0px; height:35px; width:100%;">
											<div style= "width:50%; color: var(--white_text);padding: 5px 10px; margin-right: 10px; text-align: left; border-radius: 5px;">
												<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Thời gian:</span>
											</div>
											<div class="input-field" style= "width:50%; margin:0;">
												<input style="font-size: 18px; height:35px;" type="text" required spellcheck="false" id="price" class="popup-input nameMH invalid" onkeypress="validata_number_new(event);" onkeyup="validata_number_new(event)"> 
											</div>
										</div>

										<div class="TT_dichvus" style="display: flex; padding: 0px; margin: 15px 0px; height:35px; width:100%;">
											<div style= "width:50%; color: var(--white_text);padding: 5px 10px; margin-right: 10px; text-align: left; border-radius: 5px;">
												<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Số tiền:</span>
											</div>
											<div class="input-field" style= "width:50%; margin:0;">
												<input style="font-size: 18px; height:35px;" type="text" required spellcheck="false" class="popup-input nameMH invalid" onkeypress="validata_number_new(event);" onkeyup="validata_number_new(event)" onkeydown="validata_price(event)"> 
										
											</div>
										</div>
										<div class="TT_dichvus" style="display: flex; padding: 0px; margin: 15px 0px; height:35px;width:100%;">
											<div style= "width:50%; color: var(--white_text);padding: 5px 10px; margin-right: 10px; text-align: left; border-radius: 5px;">
												<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Thời gian còn lại:</span>
											</div>
											<div style= "width:50%; padding: 5px 10px;margin: 0px;text-align: left;align-items: center; border-radius: 5px; border: 1px solid rgba(255,255,255,0.1);">
												<span class="TT_dichvu" id="${'id_start'}" style="font-size: 18px;padding:0;margin: 0px;color: var(--white_text);padding-right:5px;"> ${(0)}</span>
											</div>
										</div>
										<div class="TT_dichvus" style="display: flex; padding: 0px; margin: 15px 0px; height:35px;width:100%;">
											<div style= "width:50%; color: var(--white_text);padding: 5px 10px; margin-right: 10px; text-align: left; border-radius: 5px;">
												<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Số tiền còn lại:</span>
											</div>
											<div style= "width:50%; padding: 5px 10px;margin: 0px;text-align: left;align-items: center;border-radius: 5px; border: 1px solid rgba(255,255,255,0.1);">
												<span class="TT_dichvu" id="${'id_start'}" style="font-size: 18px;padding:0;margin: 0px;color: var(--white_text);padding-right:5px;"> ${money(0)}</span>
											</div>
										</div>`
						// hàm callback hay ah nha
						let conf = confirm_box(noidung_thongbao, question, async function (arg) {
							if(arg){
								
							}else{
								
							}
						}, `Nạp tiền hội viên <b style="color: yellow;">${hv}</b>`);
						
					});
				});
				
				//hightlight click trái
				$(function() {
					$('td').click(function() {
						$('tr').removeClass('active');
						$(this).parent().addClass('active'); 
					});
				});

			}else if(menu==='The_combo'){
				html+= `<style>
						.input-field label, .text-field label{
							position: absolute;
							top: 45%;
							left: 15px;
							transform: translateY(-50%);
							color: var(--white_text);
							font-size: 19px;
							pointer-events: none;
							transition: 0.3s;
							}
						</style>`
				html += `<div class="menu_list hoivien" style="padding: 0; margin:0;">
						<div class="dropdown" style='background:#aaaa1136;margin:0;margin-bottom: 5px;'>
							<div class="drop_btn nut_dropdown" titles="DM_MAYTRAM" item="Hoi_vien" style="color: green;"><i class="fa fa-users" aria-hidden="true" style="color: #316395;margin-right: -5px;"></i>Hội Viên</div>
						</div>

						<div class="dropdown" style='background:#aaaa1136;margin-top:0;'>
							<div class="drop_btn nut_dropdown" titles="DM_MAYTRAM" item="The_combo"><i class="ti-pencil-alt"></i>Thẻ Combo</div>
						</div>
					</div>`

				html += `<div class="order_search table_responsive date-form" style="display: flex; width:100%;">`//padding-bottom:15px;
				// html += `<div class="btn_click" data-tooltip= "Thêm" titles="DM_MAYTRAM" item="Them_hoivien"><i class="ti-plus"></i></div>`
				// html += `<div class="btn_click" data-tooltip= "Sửa" titles="DM_MAYTRAM" item="May_tram"><i class="ti-pencil"></i></div>`
				// html += `<div class="btn_click" data-tooltip= "Xoá" titles="DM_MAYTRAM" item="May_tram"><i class="ti-close"></i></div>`
				// html += `<div class="btn_click" data-tooltip= "Nhật ký người dùng" titles="DM_MAYTRAM" item="May_tram" style="margin-right: 30px;"><i class="ti-list"></i></div>`
				html += `<div class="dropdown" style="margin:0;margin-right:3px; height: 50px;">
							<div class="drop_btn nut_dropdown" onclick="call_popup('DM_MAYTRAM','Them_hoivien');" style="color: #0099c6;margin:0;"><i class="ti-plus"> Thêm Hội Viên</i> </div>
						</div>`
				html += `<div class="btn_click" titles="DM_MAYTRAM" item="May_tram" style="margin-right: 30px;">Làm mới</div>`
				html+= `<div class="dropbox_old" id="name_table" style="margin: 0px 5px 15px 0;">
							<select>
								<option value='Tendangnhap'>Tên đăng nhập</option>
								<option value='ho'>Họ</option>
								<option value='ten'>Tên</option>
								<option value='cccd'>Số CCCD</option>
								<option value='dienthoai'>Điện thoại</option>
							</select>
							<i class="ti-angle-down"></i>
							<i class="ti-check"></i>
							<i class="ti-alert"></i>
						</div>`

				html+= `<div class="input-field" style="margin:0; ">
							<input type="text" required spellcheck="false" class="popup-input nameMH invalid" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);" style="text-align: left;"> 
							<label style="font-size: 16px;">Nhập kí tự tìm kiếm</label>
							
						</div>`
				html += `</div>`
				// class="paginated"
				html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
				html +='	<thead>'
				html +='	<tr>'
				html +='		<th>Tên đăng nhập</th>'
				html +='		<th>Số tiền</th>'
				html +='		<th>Nhóm người dùng</th>'
				html +='	</tr>'
				html +='	</thead>'
				html +='	<tbody id="list_hoivien">'
				html += 	'</tbody>'
				html += '</table>'
				/*-------- show chon page ------- */
				html +=`<div class="" id="pagination-demo1" style="margin: 10px auto;"></div>`

				let show_contentDM = document.getElementById('table_bia');
				show_contentDM.innerHTML = '';
				show_contentDM.insertAdjacentHTML("afterbegin",html)

				/*----------- func event them ban -------------- */
				let btn = show_contentDM.querySelectorAll('.menu_list.hoivien .dropdown')
				btn.forEach((el, i) => {
					el.addEventListener('click',async function (evt) {
						btn.forEach((el, i) => {el.classList.remove('active')})
						this.classList.add('active')
						const selectObject = this.childNodes;
						var title = this.childNodes[1].getAttribute('titles');
						var dict = this.childNodes[1].getAttribute('item');
						if(dict=='add_bia' || dict=='config_ban'){
							// call_popup(title, dict, selectObject)
						}else if(dict=='The_combo') {
							/*------------ render row ---------------- */
							await render_rows(dict, 'DM_MAYTRAM')
						}else if(dict=='Hoi_vien') {
							/*------------ render row ---------------- */
							await render_rows(dict, 'DM_MAYTRAM')
						}
					});
				});

				/*----------- func event them ban -------------- */
				let btn_hv = show_contentDM.querySelectorAll('.btn_click')
				btn_hv.forEach((el, i) => {
					el.addEventListener('click',async function (evt) {
						btn.forEach((el, i) => {el.classList.remove('active')})
						this.classList.add('active')
						const selectObject = this.childNodes;
						var title = this.getAttribute('titles');
						var dict = this.getAttribute('item');
						if(dict=='add_bia' || dict=='config_ban'){
							// call_popup(title, dict, selectObject)
						}else if(dict=='The_combo') {
							/*------------ render row ---------------- */
							await render_rows(dict, 'DM_MAYTRAM')
						}else if(dict=='Them_hoivien') {
							call_popup(title, dict, selectObject)
						}
					});
				});
			}else if(menu==='history_system'){
				html += `<div class="order_search table_responsive date-form" style="display: flex; width:100%; gap:10px; margin-top:15px;">`//padding-bottom:15px;
				
				html+= `<div class="input-field date-form" style="margin:0; padding:0;">
							<label style="top: 0;background: var(--background);">Từ Ngày</label>
							<input class="popup-input invalid" type="datetime-local" id="date_begin" style="width: 100%; margin:0;" onchange="validateValue_str(event);">

						</div>
						<div class="input-field date-form" style="margin:0; padding:0;">
							<label style="top: 0;background: var(--background);">Đến Ngày</label>
							<input class="popup-input invalid" type="datetime-local" id="date_end" style="width: 100%; margin:0;" onchange="validateValue_str(event);">
						</div>
						<div>
							<button type="button" class="date_search"><i class="ti-check-box"> </i>ÁP DỤNG</button>
						</div>`

				html+= `<div class="dropbox_old" id="name_table" style="margin: 0px 5px 15px 0;">
							<select>
								<option value='Tendangnhap'>Tên đăng nhập</option>
								<option value='name_pc'>Tên máy</option>
							</select>
							<i class="ti-angle-down"></i>
							<i class="ti-check"></i>
							<i class="ti-alert"></i>
						</div>`

				html+= `<div class="input-field" style="margin:0; ">
							<input type="text" required spellcheck="false" class="popup-input nameMH invalid" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);" style="text-align: left;"> 
							<label style="font-size: 16px;">Nhập kí tự tìm kiếm</label>
							
						</div>
					</div>`

					// class="paginated"
					html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
					html +='	<thead>'
					html +='	<tr>'
					html +='		<th>Máy</th>'
					html +='		<th>Người dùng</th>'
					html +='		<th>Ngày</th>'
					html +='		<th>Thời gian</th>'
					html +='		<th>Tình trạng</th>'
					html +='		<th>Đã dùng</th>'
					html +='		<th>Ghi chú</th>'
					html +='	</tr>'
					html +='	</thead>'
					html +='	<tbody id="list_hoivien">'
					html += 	'</tbody>'
					html += '</table>'
					/*-------- show chon page ------- */
					html +=`<div class="" id="pagination-demo1" style="margin: 10px auto;"></div>`
	
					let show_contentDM = document.getElementById('table_bia');
					show_contentDM.innerHTML = '';
					show_contentDM.insertAdjacentHTML("afterbegin",html)

					init_BC('get_BCMaytram', 'history_system')

			}else if(menu==='history_transaction'){
				html += `<div class="order_search table_responsive date-form" style="display: flex; width:100%; gap:10px;margin-top:15px;">`//padding-bottom:15px;
				
				html+= `<div class="input-field date-form" style="margin:0; padding:0;">
							<label style="top: 0;background: var(--background);">Từ Ngày</label>
							<input class="popup-input invalid" type="datetime-local" id="date_begin" style="width: 100%; margin:0;" onchange="validateValue_str(event);">

						</div>
						<div class="input-field date-form" style="margin:0; padding:0;">
							<label style="top: 0;background: var(--background);">Đến Ngày</label>
							<input class="popup-input invalid" type="datetime-local" id="date_end" style="width: 100%; margin:0;" onchange="validateValue_str(event);">
						</div>
						<div>
							<button type="button" class="date_search"><i class="ti-check-box"> </i>ÁP DỤNG</button>
						</div>`

				html+= `<div class="dropbox_old" id="name_table" style="margin: 0px 5px 15px 0;">
							<select>
								<option value='Tendangnhap'>Tên đăng nhập</option>
								<option value='name_NV'>Nhân viên</option>
							</select>
							<i class="ti-angle-down"></i>
							<i class="ti-check"></i>
							<i class="ti-alert"></i>
						</div>`

				html+= `<div class="input-field" style="margin:0; ">
							<input type="text" required spellcheck="false" class="popup-input nameMH invalid" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);" style="text-align: left;"> 
							<label style="font-size: 16px;">Nhập kí tự tìm kiếm</label>
							
						</div>
					</div>`

				// class="paginated"
				html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
				html +='	<thead>'
				html +='	<tr>'
				html +='		<th>Giờ yêu cầu</th>'
				html +='		<th>Ngày thanh toán</th>'
				html +='		<th>Giờ thanh toán</th>'
				html +='		<th>Số tiền</th>'
				html +='		<th>Thời gian thanh toán</th>'
				html +='		<th>Nhân viên</th>'
				html +='		<th>Ghi chú</th>'
				html +='	</tr>'
				html +='	</thead>'
				html +='	<tbody id="list_hoivien">'
				html += 	'</tbody>'
				html += '</table>'
				/*-------- show chon page ------- */
				html +=`<div class="" id="pagination-demo1" style="margin: 10px auto;"></div>`

				let show_contentDM = document.getElementById('table_bia');
				show_contentDM.innerHTML = '';
				show_contentDM.insertAdjacentHTML("afterbegin",html)

				init_BC('get_BCBia', 'history_transaction')

			}else if(menu==='history_web'){
				html += `<div class="order_search table_responsive date-form" style="display: flex; width:100%; gap:10px;margin-top:15px;">`//padding-bottom:15px;
				
				html+= `<div class="input-field date-form" style="margin:0; padding:0;">
							<label style="top: 0;background: var(--background);">Từ Ngày</label>
							<input class="popup-input invalid" type="datetime-local" id="date_begin" style="width: 100%; margin:0;" onchange="validateValue_str(event);">

						</div>
						<div class="input-field date-form" style="margin:0; padding:0;">
							<label style="top: 0;background: var(--background);">Đến Ngày</label>
							<input class="popup-input invalid" type="datetime-local" id="date_end" style="width: 100%; margin:0;" onchange="validateValue_str(event);">
						</div>
						<div>
							<button type="button" class="date_search"><i class="ti-check-box"> </i>ÁP DỤNG</button>
						</div>`

				html+= `<div class="dropbox_old" id="name_table" style="margin: 0px 5px 15px 0;">
							<select>
								<option value='Tendangnhap'>Tên đăng nhập</option>
								<option value='name_web'>Website</option>
							</select>
							<i class="ti-angle-down"></i>
							<i class="ti-check"></i>
							<i class="ti-alert"></i>
						</div>`

				html+= `<div class="input-field" style="margin:0; ">
							<input type="text" required spellcheck="false" class="popup-input nameMH invalid" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);" style="text-align: left;"> 
							<label style="font-size: 16px;">Nhập kí tự tìm kiếm</label>
							
						</div>
					</div>`

				// class="paginated"
				html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
				html +='	<thead>'
				html +='	<tr>'
				html +='		<th>Tên đăng nhập</th>'
				html +='		<th>Họ và tên</th>'
				html +='		<th>CCCD(CMND)</th>'
				html +='		<th>Địa chỉ</th>'
				html +='		<th>Máy sử dụng</th>'
				html +='		<th>Website truy cập</th>'
				html +='		<th>Thời điểm truy cập</th>'
				html +='	</tr>'
				html +='	</thead>'
				html +='	<tbody id="list_hoivien">'
				html += 	'</tbody>'
				html += '</table>'
				/*-------- show chon page ------- */
				html +=`<div class="" id="pagination-demo1" style="margin: 10px auto;"></div>`

				let show_contentDM = document.getElementById('table_bia');
				show_contentDM.innerHTML = '';
				show_contentDM.insertAdjacentHTML("afterbegin",html)

				init_BC('get_BCBia', 'history_transaction')
			}else if(menu==="nhom_may"){
				html += `<div class="order_search table_responsive date-form" style="display: flex; width:100%; margin-bottom:5px;">`//padding-bottom:15px;
				html += `<div class="dropdown" style="margin:0;">
							<div class="drop_btn nut_dropdown" onclick="call_popup('DM_MAYTRAM','Them_nhom_pc');" style="color: #0099c6;margin:0;"><i class="ti-plus"> Thêm nhóm máy</i> </div>
						</div>`
				html += `<div class="dropdown" style="margin:0; margin-left:3px;">
							<div class="drop_btn nut_dropdown context-menu-one" onclick="call_popup('DM_MAYTRAM','Capnhat_nhom_pc');" style="color: #0099c6;margin:0;"><i class="ti-arrows-horizontal"> Cập nhật danh sách máy</i> </div>
						</div>`
				
				html += `</div>`
				html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
				html +='	<thead>'
				html +='	<tr>'
				html +='		<th>Tên nhóm máy</th>'
				html +='		<th>Mô tả</th>'
				html +='	</tr>'
				html +='	</thead>'
				html +='	<tbody id="list_nhom_pc">'
				temp_order= {action: 'get_nhom_pc'}
				let res= await instance.post('/hoivien', temp_order);
				if (res.data){
					console.log(res.data)
					let value = res.data
					for (let index = 0; index < value.length; index++) {
						const element = value[index];
						let nhom_id_pc = element.nhom_pc_id
						let mota = element.mota
						let name_nhom_pc = element.name_nhom_pc
						
						html += `<tr class="context-menu-one" id='${nhom_id_pc}' style="${''}">`
						html += `<td data-label="Tên nhóm máy" class="nhom_may" id='${''}' style="text-align: left; width: 100px;">${name_nhom_pc}</td>`
						html += `<td data-label="Mô tả" style="text-align: left;">${mota}</td>`
						html += '</tr>'

					}
				}
				html += 	'</tbody>'
				html += '</table>'

				let show_contentDM = document.getElementById('table_bia');
				show_contentDM.innerHTML = '';
				show_contentDM.insertAdjacentHTML("afterbegin",html)

				//*------------- event click phải double click ------------------- */
				let menu_row = document.querySelectorAll('tr');
				menu_row.forEach((el, i) => {
					// Event click phải
					el.addEventListener('contextmenu', function(e) {
						//hightlight click phải
						$('tr').removeClass('active');
						$(this).addClass('active');   

						let namepc = el.querySelector('.nhom_may').innerText
						call_popup("DM_MAYTRAM","Xoa_nhom_pc", {el: el, namepc:namepc})
						e.preventDefault();
					}, false);

					//Event double-clicks on an HTML element.
					el.addEventListener('dblclick', function(e) {
						let namepc = el.querySelector('.nhom_may').innerText
						call_popup("DM_MAYTRAM","Them_nhom_pc", {el: el, namepc:namepc})
						e.preventDefault();
					});
				});
				
				//hightlight click trái
				$(function() {
					$('td').click(function() {
						$('tr').removeClass('active');
						$(this).parent().addClass('active'); 
						
					});
				});


				// $(function() {
				// 	$.contextMenu({
				// 		selector: '.context-menu-one', 
				// 		callback: function(key, options) {
				// 			var m = "clicked: " + key;
				// 			window.console && console.log(m) || alert(m); 
				// 		},
				// 		items: {
				// 			"edit": {name: "Edit", icon: "edit"},
				// 			"cut": {name: "Cut", icon: "cut"},
				// 		   copy: {name: "Copy", icon: "copy"},
				// 			"paste": {name: "Paste", icon: "paste"},
				// 			"delete": {name: "Delete", icon: "delete"},
				// 			"sep1": "---------",
				// 			"quit": {name: "Quit", icon: function(){
				// 				return 'context-menu-icon context-menu-icon-quit';
				// 			}}
				// 		}
				// 	});
			
				// 	$('.context-menu-one').on('click', function(e){
				// 		console.log('clicked', this);
				// 	})    
				// });

			}else if(menu==="nhom_user"){
				// html += `<div class="order_search table_responsive date-form" style="display: flex; width:100%; margin-bottom:10px;">`//padding-bottom:15px;
				// html += `<div class="btn_click" data-tooltip= "Thêm" titles="DM_MAYTRAM" item="Them_hoivien"><i class="ti-plus"></i></div>`
				// html += `<div class="btn_click" data-tooltip= "Sửa" titles="DM_MAYTRAM" item="May_tram"><i class="ti-pencil"></i></div>`
				// html += `<div class="btn_click" data-tooltip= "Xoá" titles="DM_MAYTRAM" item="May_tram"><i class="ti-close"></i></div>`
				// html += `<div class="btn_click" data-tooltip= "Nhật ký người dùng" titles="DM_MAYTRAM" item="May_tram" style="margin-right: 30px;"><i class="ti-list"></i></div>`
				// html += `</div>`
				html += `<div class="order_search table_responsive date-form" style="display: flex; width:100%; margin-bottom:5px;">`//padding-bottom:15px;
				html += `<div class="dropdown" style="margin:0;">
							<div class="drop_btn nut_dropdown" onclick="call_popup('DM_MAYTRAM','Them_nhom_hv');" style="color: #0099c6;margin:0;"><i class="ti-plus"> Thêm nhóm người dùng</i> </div>
						</div>`
				html += `<div class="dropdown" style="margin:0; margin-left:3px;">
							<div class="drop_btn nut_dropdown context-menu-one" onclick="call_popup('DM_MAYTRAM','Capnhat_nhom_hv');" style="color: #0099c6;margin:0;"><i class="ti-gift"> Chính sách giá/Khuyến mãi</i> </div>
						</div>`
				
				html += `</div>`
				html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
				html +='	<thead>'
				html +='	<tr>'
				html +='		<th>Tên nhóm người dùng</th>'
				html +='		<th>Loại nhóm</th>'
				html +='		<th>Giá Nhóm máy</th>'
				html +='	</tr>'
				html +='	</thead>'
				html +='	<tbody id="list_hoivien">'
				temp_order= {action: 'get_nhom_hv'}
				let res= await instance.post('/hoivien', temp_order);
				if (res.data){
					console.log(res.data)
					let value = res.data
					for (let index = 0; index < value.length; index++) {
						const element = value[index];
						let nhom_id = element.nhom_hv_id
						let mota = element.mota
						let Price = element.Price_pc
						
						html += `<tr class="" id='${nhom_id}' style="${''}">`
						html += `<td data-label="Tên nhóm người dùng" class="nhom_hv" id='${''}'>${mota}</td>`
						html += `<td data-label="Loại nhóm" style="">${mota}</td>`
						html += `<td data-label="Giá Nhóm máy" id="${''}">${money(Price)}</td>`
						html += '</tr>'

					}
				}
				html += 	'</tbody>'
				html += '</table>'
				let show_contentDM = document.getElementById('table_bia');
				show_contentDM.innerHTML = '';
				show_contentDM.insertAdjacentHTML("afterbegin",html)

				//*------------- event click phải double click ------------------- */
				let menu_row = document.querySelectorAll('tr');
				menu_row.forEach((el, i) => {
					//Event click phải
					el.addEventListener('contextmenu', function(e) {
						//hightlight click phải
						$('tr').removeClass('active');
						$(this).addClass('active'); 

						// let namepc = el.querySelector('.maytram').innerText
						// call_popup("DM_MAYTRAM","Menu_maytram", {el: el, namepc:namepc})
						e.preventDefault();
					}, false);

					//Event double-clicks on an HTML element.
					el.addEventListener('dblclick', function(e) {
						let nhom_hv = el.querySelector('.nhom_hv').innerText
						let noidung_thongbao = ``//`<p>Hội viên <b style="color: yellow;">${'khách aaa'}</b></p>`
						let question = `<style>
											#id_confrmdiv {
												width: 40%;
											}
										</style>
						<div class="" style="display: flex; padding: 0px; margin: 15px 0px; height:35px; width:100%;">
							<div style= "width:50%; color: var(--white_text);padding: 5px 10px; margin-right: 10px; text-align: left; border-radius: 5px;">
								<span class="Loai_hv" style="font-size: 18px;padding:0;margin: 0px;">Loại:</span>
							</div>
							<div class="input-field" style= "width:50%; margin:0;">
								<input style="font-size: 18px; height:35px;" type="text" required spellcheck="false" id="price" class="popup-input nameMH invalid" onkeypress="validata_number_new(event);" onkeyup="validata_number_new(event)"> 
							</div>
						</div>

						<div class="" style="display: flex; padding: 0px; margin: 15px 0px; height:35px; width:100%;">
							<div style= "width:50%; color: var(--white_text);padding: 5px 10px; margin-right: 10px; text-align: left; border-radius: 5px;">
								<span class="name_nhom_hv" style="font-size: 18px;padding:0;margin: 0px;">Tên nhóm:</span>
							</div>
							<div class="input-field" style= "width:50%; margin:0;">
								<input style="font-size: 18px; height:35px;" type="text" required spellcheck="false" class="popup-input nameMH invalid" onkeypress="validata_number_new(event);" onkeyup="validata_number_new(event)" onkeydown="validata_price(event)"> 
						
							</div>
						</div>
						<div class="TT_dichvus" style="display: flex; padding: 0px; margin: 15px 0px; height:35px;width:100%;">
							<div style= "width:50%; color: var(--white_text);padding: 5px 10px; margin-right: 10px; text-align: left; border-radius: 5px;">
								<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Thời gian còn lại:</span>
							</div>
							<div style= "width:50%; padding: 5px 10px;margin: 0px;text-align: left;align-items: center; border-radius: 5px; border: 1px solid rgba(255,255,255,0.1);">
								<span class="TT_dichvu" id="${'id_start'}" style="font-size: 18px;padding:0;margin: 0px;color: var(--white_text);padding-right:5px;"> ${(0)}</span>
							</div>
						</div>
						<div class="TT_dichvus" style="display: flex; padding: 0px; margin: 15px 0px; height:35px;width:100%;">
							<div style= "width:50%; color: var(--white_text);padding: 5px 10px; margin-right: 10px; text-align: left; border-radius: 5px;">
								<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Số tiền còn lại:</span>
							</div>
							<div style= "width:50%; padding: 5px 10px;margin: 0px;text-align: left;align-items: center;border-radius: 5px; border: 1px solid rgba(255,255,255,0.1);">
								<span class="TT_dichvu" id="${'id_start'}" style="font-size: 18px;padding:0;margin: 0px;color: var(--white_text);padding-right:5px;"> ${money(0)}</span>
							</div>
						</div>`
						// hàm callback hay ah nha
						let conf = confirm_box(noidung_thongbao, question, async function (arg) {
							if(arg){
								
							}else{
								
							}
						}, `Chỉnh sửa Nhóm người dùng <b style="color: yellow;">${nhom_hv}</b>`);
						
					});
				});
				
				//hightlight click trái
				$(function() {
					$('td').click(function() {
						$('tr').removeClass('active');
						$(this).parent().addClass('active'); 
					});
				});

			}else if(menu==="ql_app"){
				html += `<div class="order_search table_responsive date-form" style="display: flex; width:100%;margin-bottom:5px;">`//padding-bottom:15px;
				// html += `<div class="btn_click" data-tooltip= "Thêm" titles="DM_MAYTRAM" item="Them_hoivien"><i class="ti-plus"></i></div>`
				// html += `<div class="btn_click" data-tooltip= "Sửa" titles="DM_MAYTRAM" item="May_tram"><i class="ti-pencil"></i></div>`
				// html += `<div class="btn_click" data-tooltip= "Xoá" titles="DM_MAYTRAM" item="May_tram"><i class="ti-close"></i></div>`
				// html += `<div class="btn_click" data-tooltip= "Nhật ký người dùng" titles="DM_MAYTRAM" item="May_tram" style="margin-right: 30px;"><i class="ti-list"></i></div>`
				html += `<div class="dropdown" style="margin:0;margin-right:3px; height: 50px;">
							<div class="drop_btn nut_dropdown" onclick="call_popup('DM_MAYTRAM','Them_hoivien');" style="color: #0099c6;margin:0;"><i class="ti-plus"> Thêm ứng dụng cấm</i> </div>
						</div>`
				html += `</div>`
				html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
				html +='	<thead>'
				html +='	<tr>'
				html +='		<th>Tên ứng dụng cấm</th>'
				html +='		<th>Kiểu cấm</th>'
				html +='		<th>Mô tả</th>'
				html +='		<th>Ghi chú</th>'
				html +='	</tr>'
				html +='	</thead>'
				html +='	<tbody id="list_hoivien">'
				html += 	'</tbody>'
				html += '</table>'
				let show_contentDM = document.getElementById('table_bia');
				show_contentDM.innerHTML = '';
				show_contentDM.insertAdjacentHTML("afterbegin",html)
			}else if(menu==="anti_web"){
				html += `<div class="order_search table_responsive date-form" style="display: flex; width:100%;">`//padding-bottom:15px;
				html += `<div class="btn_click" data-tooltip= "Thêm" titles="DM_MAYTRAM" item="Them_hoivien"><i class="ti-plus"></i></div>`
				html += `<div class="btn_click" data-tooltip= "Sửa" titles="DM_MAYTRAM" item="May_tram"><i class="ti-pencil"></i></div>`
				html += `<div class="btn_click" data-tooltip= "Xoá" titles="DM_MAYTRAM" item="May_tram"><i class="ti-close"></i></div>`
				html += `<div class="btn_click" data-tooltip= "Nhật ký người dùng" titles="DM_MAYTRAM" item="May_tram" style="margin-right: 30px;"><i class="ti-list"></i></div>`
				
				html+= `<div class="dropbox_old" id="name_table" style="margin: 0px 5px 15px 0;">
							<select>
								<option value='diachi'>Địa chỉ</option>
								<option value='name_web'>Tên</option>
							</select>
							<i class="ti-angle-down"></i>
							<i class="ti-check"></i>
							<i class="ti-alert"></i>
						</div>`

				html+= `<div class="input-field" style="margin:0; ">
							<input type="text" required spellcheck="false" class="popup-input nameMH invalid" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);" style="text-align: left;"> 
							<label style="font-size: 16px;">Nhập kí tự tìm kiếm</label>
							
						</div>
					</div>`
				html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
				html +='	<thead>'
				html +='	<tr>'
				html +='		<th>Địa chỉ</th>'
				html +='		<th>Tên website</th>'
				html +='		<th>Thời gian cập nhật</th>'
				html +='		<th>Cấm</th>'
				html +='		<th>Mô tả</th>'
				html +='	</tr>'
				html +='	</thead>'
				html +='	<tbody id="list_hoivien">'
				html += 	'</tbody>'
				html += '</table>'
				let show_contentDM = document.getElementById('table_bia');
				show_contentDM.innerHTML = '';
				show_contentDM.insertAdjacentHTML("afterbegin",html)
			}else if(menu==="anti_timer"){
				html += `<div class="order_search table_responsive date-form" style="display: flex; width:100%; margin-bottom:5px;">`//padding-bottom:15px;
				// html += `<div class="btn_click" data-tooltip= "Thêm" titles="DM_MAYTRAM" item="Them_hoivien"><i class="ti-plus"></i></div>`
				// html += `<div class="btn_click" data-tooltip= "Sửa" titles="DM_MAYTRAM" item="May_tram"><i class="ti-pencil"></i></div>`
				// html += `<div class="btn_click" data-tooltip= "Xoá" titles="DM_MAYTRAM" item="May_tram"><i class="ti-close"></i></div>`
				// html += `<div class="btn_click" data-tooltip= "Nhật ký người dùng" titles="DM_MAYTRAM" item="May_tram" style="margin-right: 30px;"><i class="ti-list"></i></div>`
				html += `<div class="dropdown" style="margin:0;margin-right:3px; height: 50px;">
							<div class="drop_btn nut_dropdown" onclick="call_popup('DM_MAYTRAM','Them_khongche_timer');" style="color: #0099c6;margin:0;"><i class="ti-plus"> Thêm khống chế thời gian</i> </div>
						</div>`
				html += `</div>`
				
				html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
				html +='	<thead>'
				html +='	<tr>'
				html +='		<th>Khống chế thời gian</th>'
				html +='		<th>Mô tả</th>'
				html +='	</tr>'
				html +='	</thead>'
				html +='	<tbody id="list_hoivien">'
				html += 	'</tbody>'
				html += '</table>'
				let show_contentDM = document.getElementById('table_bia');
				show_contentDM.innerHTML = '';
				show_contentDM.insertAdjacentHTML("afterbegin",html)
			}
		
		break;
		case "DM_BIA":
			if(menu==='BAN_BI-A'){
				/*--------------- show search table ----------------------- */
				temp_order = {action: 'getBia'}
				let res = await instance.post('/Bi-a', temp_order);
				let value = res.data				
				html += `<div class="order_search" style="display: flex; width:100%; gap:5px; margin-bottom:5px;">`//padding-bottom:15px;
				html+=`<div class="lang-menu" id="Search_table" style="height: 50px; margin:0; width:30%;">
					<div class="selected-lang" style="height: 50px; background: var(--light);border-radius: 5px;">
						<span class="sBtn-text name_table" item="table_bia">Bàn BI-A</span>
						<i class="separator"></i>
						<span class='sBtn-close'>X</span>
						<i class="ti-angle-down"></i>
					</div>
					<ul style="padding: 0;">`
					value.sort((a, b) =>a.name.localeCompare(b.name));
					value.forEach(function(element, index){
						html+= `<li class="option" id="${element.id_table}" style="padding: 5px;">${element.name}</li>`
					})
				html+=`</ul>
					<i class="ti-check"></i>
					<i class="ti-alert"></i>
					</div>`
				
				html+=`<div class="lang-menu" id="Search_Trangthai" style="height: 50px; margin:0; width:30%;">
						<div class="selected-lang" style="height: 50px; background: var(--light);border-radius: 5px;">
							<span class="sBtn-text Trangthai" item="table_bia">Trạng Thái</span>
							<i class="separator"></i>
							<span class='sBtn-close'>X</span>
							<i class="ti-angle-down"></i>
						</div>
						<ul style="padding: 0;">
							<li class="option" id="BATDAU" style="padding: 5px;">BẮT ĐẦU</li>
							<li class="option" id="TINHTIEN" style="padding: 5px;">TÍNH TIỀN</li>
							<li class="option" id="DONBAN" style="padding: 5px;">DỌN BÀN</li>
						</ul>
						<i class="ti-check"></i>
						<i class="ti-alert"></i>
					</div>`

				html += `</div>`			

				// class="paginated"
				html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
				html +='	<thead>'
				html +='	<tr>'
				html +='		<th>THỜI GIAN BẮT ĐẦU</th>'
				html +='		<th style="text-align: center;">VỊ TRÍ</th>'
				html +='		<th style="min-width: 250px;">TÍNH GIỜ Billiards</th>'
				html +='		<th>MẶT HÀNG</th>'
				html +='		<th>TT</th>'
				html +='		<th>SỐ LƯỢNG</th>'
				html +='		<th style="text-align: center;">THAO TÁC</th>'
				html +='	</tr>'
				html +='	</thead>'
				html +='	<tbody id="list_bia">'
				html += 	'</tbody>'
				html += '</table>'
				/*-------- show chon page ------- */
				html +=`<div class="" id="pagination-demo1" style="margin: 10px auto;"></div>`

				let show_contentDM = document.getElementById('table_bia');
				show_contentDM.innerHTML = '';
				show_contentDM.insertAdjacentHTML("afterbegin",html)

				await dropbox_trangthai()
				/*-------------func event chagne ----------------*/
				//close btn
				let btn_close = document.querySelectorAll('.lang-menu .sBtn-close')
				btn_close.forEach(element => {
					element.addEventListener('click',async function (evt) {
						/*------------ render row ---------------- */
						temp_order = {action: 'getBia'}
						let res = await instance.post('/Bi-a', temp_order);
						let value = res.data
						loc_list('BAN_BI-A',value)
					});
				});
				
				let options = document.querySelectorAll(".lang-menu .option")
				options.forEach(element => {
					// $(element).on('DOMSubtreeModified',async function(){
						element.addEventListener('click',async function (evt) {
						if (this.innerText!==''){
							temp_order = {action: 'getBia'}
							let res = await instance.post('/Bi-a', temp_order);
							let value = res.data	
							loc_list('BAN_BI-A',value)
						}
					});
				});

				loc_list(menu, value, '')
				
			}else if(menu==='History_BIA'){
				/*--------------- show search table ----------------------- */
				temp_order = {action: 'getBia'}
				let res = await instance.post('/Bi-a', temp_order);
				let value = res.data
				html += `<div class="order_search table_responsive date-form" style="display: flex; width:100%; gap:5px; margin-top:15px;">`//padding-bottom:15px;
				
				html+= `	<div class="input-field date-form" style="margin:0; padding:0;">
								<label style="top: 0;background: var(--background);">Từ Ngày</label>
								<input class="popup-input invalid" type="datetime-local" id="date_begin" style="width: 100%; margin:0;" onchange="validateValue_str(event);">

							</div>
							<div class="input-field date-form" style="margin:0; padding:0;">
								<label style="top: 0;background: var(--background);">Đến Ngày</label>
								<input class="popup-input invalid" type="datetime-local" id="date_end" style="width: 100%; margin:0;" onchange="validateValue_str(event);">
							</div>
							<div>
								<button type="button" class="date_search"><i class="ti-check-box"> </i>ÁP DỤNG</button>
							</div>`

				html+= `<div class="dropbox_old" id="name_table" style="margin: 0px 5px 15px 0;">
							<select>
								<option id='0'>Bàn BI-A</option>`
								value.sort((a, b) =>a.name.localeCompare(b.name));
								value.forEach(function(element, index){
									html+= `<option value="${element.id_table}">${element.name}</option>`
								})
				html+=		`</select>
							<i class="ti-angle-down"></i>
							<i class="ti-check"></i>
							<i class="ti-alert"></i>
						</div>`
				html += `</div>`			

				// class="paginated"
				html +='<table cellspacing="0" cellpadding="0" id="table_order" class="table table-inverse table-bordered paginated search">'
				html +='	<thead>'
				html +='	<tr>'
				html +='		<th>THỜI GIAN BẮT ĐẦU</th>'
				html +='		<th style="text-align: center;">VỊ TRÍ</th>'
				html +='		<th style="min-width: 250px;">TÍNH GIỜ Billiards</th>'
				html +='		<th>MẶT HÀNG</th>'
				html +='		<th>TT</th>'
				html +='		<th>SỐ LƯỢNG</th>'
				html +='		<th style="text-align: center;">THAO TÁC</th>'
				html +='	</tr>'
				html +='	</thead>'
				html +='	<tbody id="list_bia">'
				html += 	'</tbody>'
				html += '</table>'
				/*-------- show chon page ------- */
				html +=`<div class="" id="pagination-demo1" style="margin: 10px auto;"></div>`

				let show_contentDM = document.getElementById('table_bia');
				show_contentDM.innerHTML = '';
				show_contentDM.insertAdjacentHTML("afterbegin",html)

				init_BC('get_BCBia', 'History_BIA')

			}
		break;
		case "DM_DONHANG":
			// console.log(sortedList)
			main = document.getElementById('list_order');
			if (main){
				main.innerHTML = '';
				html=''
				// show rows table
				for (let index = 0; index < sortedList.length; index++) {
					const element = sortedList[index];	
					// console.log(element)
					const date = convert_dateToVN(element.date_new)
					const id_MH = element.id_MH
					const name = element.name_MH
					var price = element.price_MH
					var phantramKM = element.phantramKM
					// console.log(phantramKM)
					var price_TC = element.price_TC
					price =='Tuỳ Chọn'? price= price_TC: price = price-(price*phantramKM/100)
					const sl = element.soluong_MH
					const ghichu = element.Ghichu
					var Thaotac = element.Thaotac
					var action = element.Action
					const custom = element.Custom
					var id_table_custom = element.id_table_custom
					const nv = element.id_NV
					const print = element.Print
					var color_name = await get_color(color_list, element.color_DM)
					color_name = color_name.color
					const Topping_list_order = element.Topping
					const id = element.id_DH

					var total = price

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
					let huy_disabled= null;
					let btn_disabled = '';
					let display_print = '';
					let visibility_print= 'hidden';
					let show_KM =`(GG: <b style="color: yellow;">${phantramKM}%</b>)`
					Number(phantramKM) ==0? show_KM= '':null
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
							display_print = 'none';
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

							//check trả tiền dich vu trước hay sau
							console.log(role_order.Bia_thutiensau)
							if(role_order.Bia_thutiensau =='checked'){
								id_table_custom = id_table_custom.split('_')[0]
								if(id_table_custom == 'tableBia'){
									btn_disabled = ('disabledbutton');
									// btn_Huy.classList.add('disabledbutton')
									Thaotac = 'THU SAU'
								}
							}
						break;
						case 'HUY':
							huy_visibility = 'hidden';
							huy_display = 'none'
							huy_background = 'none'
							huy_color = 'red'
							huy_action = Thaotac
							// action = 'HOÀN THÀNH'
							huy_width = '100%'
							huy_disabled = 'disabled'
							visibility_nvthungan = 'visible';
							display_nvthungan = ''
							huy_padding = '0';
							display_print = 'none';
							visibility_print = 'hidden';
						break;
					}
					if (price){
						html += `<tr class="has-rowspan" id="${id}" style="font-size: 18px;">`
						html += '<td data-label="THỜI GIAN" class="rowspan_order" style=""><span class="date_order">'+ date +'</span></td>'
						html += `<td data-label="VỊ TRÍ" class="rowspan_order" id="${id_table_custom}"><span class="custom_order" style='color: #3bccd6; white-space: nowrap;'>`+ custom +`</span></td>`
						html += `<td data-label="MẶT HÀNG" style="text-align: left; width:100%; min-width: 180px;" id="MH${id_MH}">
									<div style="display: flex; padding: 0px; margin: 0px;">
										<div style= "color: white;padding:0px; margin: 0px; width:70%; text-align: left;">
											<a class="mathang" style="background-color: ${color_name};"></a>
											<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">${name} <b style="font-size:12px;">${show_KM}</b></span>
										</div>
										<div style= "padding: 0px;margin: 0px; text-align: right; flex-grow: 2;">
											<span class="priceMH" style="font-size: 18px;padding:0;margin: 0px;color: var(--white_text);padding-right:5px;">${money(price)}</span>
										</div>
									</div>`
						if (Topping_list_order.length > 0){
							html +=         `
											<table cellspacing="0" cellpadding="0" id="MHtoppings" class="table-popup" style="margin: 0;margin-top: 10px; display: block; font-size: 18px; width:100%;padding:0;">
												<thead>
													<tr style="background-color:var(--yellow_low);">
														<th style="font-size: 16px; text-align: left; font-size: 14px;">Topping</th>
														<th style="font-size: 16px; text-align: center; font-size: 14px;">Số Lượng</th>
														<th style="font-size: 16px; text-align: right; font-size: 14px;">Đơn Giá</th>									
													</tr>
												</thead>
												<tbody id="list_order">`
							for (var n = 0; n < Topping_list_order.length; n++) {

								let TT_TP = Number(Topping_list_order[n].Topping_DG) * Number(Topping_list_order[n].soluong_TPDH)
								total= Number(total)+ Number(TT_TP)
										html += `<tr>
													<td data-label="TÊN" style="width:100%;font-size: 16px;"><span class="MHtopping" style="">${Topping_list_order[n].name_MH}</span></td>
													<td data-label="SL" style="max-width: 50px; text-align: center;"><span style="width: 100%; "/>${Topping_list_order[n].soluong_TPDH}</span></td>
													<td data-label="ĐG" style="min-width: 100px; text-align: right;"><span class="MHtopping" style="float: right;">${money(Topping_list_order[n].Topping_DG)}</span></td>
												</tr>`	
													
							}	
							html +=				`</tbody>
											</table>
										`
						}
						// ghi chú
						if (ghichu){
							html += '<p style="margin-top:5px; float:left; font-size: 16px; color: red;min-width: 200px;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--dark)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg><i> '+ghichu+'</i></p></td>'
						}
						html += `<td data-label="TT" style="white-space: nowrap; font-size: 18px; text-align: right;min-width:100px; text-align: right;"><span>${money(total)}</span></td>`
						html += '<td data-label="SL" style="text-align: center;">'+ sl +'</td>'
						html += '<td data-label="THAO TÁC" style="min-width: 180px;">'
						html += `<button class="${btn_disabled}" type='button' ${disabled} style='cursor: pointer; visibility: ${huy_visibility}; display: ${huy_display}; color: ${color}; border-radius: 5px;border: ${border};width: ${width}; font-size: .9rem; min-height: 0px; background: ${background}; padding: ${huy_padding}; margin-right:5px; margin-bottom: 0px; font-weight: 600;' titles="DM_DONHANG" item="${action}">`+ Thaotac +`</button>`//onclick='call(this);'
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
						total = Number(total)*Number(sl)
						html += `<td data-label="THANH TOÁN" style="max-width: 250px;font-size: 1.5rem; white-space: nowrap; text-align: right;" class="rowspan_order">`+ money(total)+'</td>'
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
			//sắp xếp
			var list_doan = [];
			var list_douong = [];
			for(let i=0; i<sortedList.length; i++) {
				let element = sortedList[i]
				const DM_cha = element.parent_id

				let id_Thaotac = element.id_Thaotac
				//check del MH không show
				if(Number(id_Thaotac) == 1){
					if(Number(DM_cha)==1){
						list_doan.push(element)
					}else if(Number(DM_cha)==2){
						list_douong.push(element)
					}
				}
			}
			temp_order ={action: 'get_sort'}
			let res = await instance.post('/sortlist', temp_order);
			let list_sort = (res.data)
			let sort_da = list_sort[1]
			let sort_du = list_sort[2]
			let sort_DM = list_sort[0]

			// console.log(sort_DM, list_doan, list_douong)
			//sắp xếp đồ ăn
			sort_da = eval(sort_da.sort)
			list_doan.sort((a, b) => sort_da.indexOf(a.id_MH) - sort_da.indexOf(b.id_MH));
			//sắp xếp đồ uống
			sort_du = eval(sort_du.sort)
			list_douong.sort((a, b) => sort_du.indexOf(a.id_MH) - sort_du.indexOf(b.id_MH));

			let total_list = list_doan.concat(list_douong);
			// console.log(total_list)

			//*---------------- show Danh mục ------------------------- */
			html='';
			sort_DM = eval(sort_DM.sort)
			html+=`<div class="course-item" id="TC" style= "color: white; margin: 5px 0; cursor: move;">
					<div class="headers" style="margin-bottom: 10px; border: 1px solid rgba(255, 255, 255, .2); text-transform:none;">Tất Cả</div>
				</div>`
			for(let i=0; i<sort_DM.length; i++) {
				let name;
				if(sort_DM[i]==1) name = 'Đồ Ăn'
				else name = "Đồ Uống"
				html += `<div class="course-item" id="${sort_DM[i]}" style= "color: white; margin: 5px 0; cursor: move;">
							<div class="headers" style="margin-bottom: 10px; border: 1px solid rgba(255, 255, 255, .2); text-transform:none;">${name}</div>
						</div>`
			}
			main = document.getElementById('list_danhmuc');
			main.innerHTML = '';
			main.insertAdjacentHTML("afterbegin",html)
			
			//*---------------- show đồ ăn đồ uống ------------------------- */
			html='';
			var arry_list = [];
			for (let index = 0; index < total_list.length; index++){
				const element = total_list[index];
				// console.log(element)
				const id = element.id_MH
				const photo = element.photo_MH
				const ten_MH = element.name_MH
				const danhmuc_MH = element.Danhmuc
				const moban_DM = element.moban_DM
				var price = element.price_MH
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
				element.sl = 1;
				element.price_TC=0;
				element.Ghichu = ''
				element.action = 'CHẤP NHẬN'
				element.Thaotac = 'CHAPNHAN';
				element.photo = null
				element.Custom = '**Khách Vãng Lai**'//document.querySelector('#tenmay').innerHTML
				const SL_mathang = document.querySelectorAll('.order-card .order-soluong')
				const DM_parent = element.parent_id
				
				// check khuyến mãi và chưa check ngày show khuyen mãi
				if (price !== 'Tuỳ Chọn'){
					// console.log(KhuyenMai, price_KM)
					let price_KM_tmp = 0;
					for (let index = 0; index < KhuyenMai.length; index++) {
						const item = KhuyenMai[index];
						// console.log(price_KM_tmp, item.phantramKM)
						if (Number(item.id_KM) == 1){
							if(price_KM_tmp < Number(item.phantramKM)){
								price_KM_tmp = Number(item.phantramKM)
								price_KM = Number(price)-((Number(price)*Number(item.phantramKM))/100)
								console.log(price_KM)
								show_price = 'visible';
								element.price_MH = price_KM;
							}
							
						}
					}
					price_KM = money(price_KM)
					price = money(price)
				}else{price_KM = `<span style="color: yellow;">${price_KM}</span>`}
				// console.log(element)
				//check hiển thị tồn kho chưa làm
				//check show danh muc chua làm
				//check giới hạn chọn topping chua lam

				let show_mathang= '';
				let timer_moban=true;
				let timeoff=0;

				//---------------- check show danh muc -----------------//
				if (moban_DM=='checked'){
					//check show lock chinh sua
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
										// Se_ngungban >= Se_cur ? timeoff = true: timer_moban = false
									}else timer_moban = false
									timer_moban == true ? show_mathang ='': show_mathang = 'none'
								}
							}
						}
					}else{
						//dang chinh sua
						show_mathang = 'none'
					}
				}else{
					//off danh muc
					show_mathang = 'none'
				}

				// check MH đã xoá thì không show
				let id_Thaotac = element.id_Thaotac
				let id_DMThaotac = element.id_DMThaotac
				if(Number(id_Thaotac) == 1 && Number(id_DMThaotac)== 1){
					//check không phải là topping thì cho show
					if (danhmuc_MH != "Topping"){
						if (min_tonkho===0){
							html +=`<div class="dashboard-card" id='${id}' DM=${DM_parent} TIMEOPEN=${timer_moban} DMOPEN=${moban_DM} MHOPEN=${moban_MH} style="display: ${show_mathang};">`
							html +=     `<img class="card-image" src="${photo}" onerror="this.onerror=null;this.src='/images_order/no-image.jpg';">`
							html +=      `<div class="card-detail">`
							html +=         `<h4 class="card-name"><b style="color: red; font: var(--body-font);">[Hết] </b>${ten_MH}</h4>`
						}else{
							html +=`<div class="dashboard-card" id='${id}' DM=${DM_parent} TIMEOPEN=${timer_moban} DMOPEN=${moban_DM} MHOPEN=${moban_MH} style="display: ${show_mathang};">`
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
				}
			};
			var custom_order = document.querySelector(".custom_order");
			custom_order.insertAdjacentHTML("afterbegin",html)
			/*------------- add event btn ---------------- */
			const dashboard_card = document.querySelectorAll('.dashboard-card')
			for (let index = 0; index < dashboard_card.length; index++) {
				const element = dashboard_card[index];
				// console.log(element.id ,arry_list[index])
				element.addEventListener('click',function (evt) {
					arry_list.forEach(function(el, i){
						if(el.id_MH == element.id){
							const obj_tmp =  arry_list[i]
							order(element, JSON.stringify(obj_tmp))
						}
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
		break;
		case "DM_NHANVIEN":
			
		break;
		case "DM_DANHMUC":
			for (let index = 0; index < sortedList.length; index++) {
				const element = sortedList[index];
				const id = element.id_DM;
				var disabled ='';
				id =='1'|| id=='2'|| id=='3'? disabled ='pointer-events: none;' : null;
				const obj_color = await get_color(color_list, element.color_DM)
				// console.log(obj_color)
				const id_color = element.color_DM;
				const color = obj_color.color;
				var ten_DM = element.name_DM
				const mota_DM = element.mota_DM
				const moban = element.moban_DM
				const parent_id = element.parent_id
				console.log(parent_id)
				var DTkhac = element.DTkhac
				var DMcha = '';
				parent_id =='1'? DMcha='Đồ Ăn': DMcha="Đồ Uống"
				let background='#0080ff';
				let fontsize = '14px';
				if(parent_id=='0'){
					DMcha ='Không có';
					background = 'transparent'
					fontsize = '17px';
				}
				let id_Thaotac = element.id_Thaotac
				if(Number(id_Thaotac) == 1){
					html += `<tr id='${id}' style="${disabled}">`
					html += `<td data-label="TÊN" id='${id_color}'><a class="mathang" style="background-color: ${color}"></a><span class="table-nameDM" style="font-size: 18px; margin-left: 5px; font-weight:600;">${ten_DM}</span></td>`
					html += `<td data-label="MÔ TẢ" style="font-style:italic; color: grey;"><i>${mota_DM}</i></td>`
					html += `<td data-label="DANH MỤC CHA" id="${parent_id}"><span class="danhmuc" style="background: ${background}; font-size: ${fontsize};">${DMcha}</span></td>`
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
				
			}
			return html;
		case "DM_MATHANG":
			for (let index = 0; index < sortedList.length; index++){
				const element = sortedList[index];
				// console.log(element)
				const id = element.id_MH
				const photo = element.photo_MH
				const ten_MH = element.name_MH
				const danhmuc_MH = element.Danhmuc
				var price = element.price_MH
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
				var hide_hengio_Topping = '';
				danhmuc_MH =='Topping'? hide_hengio_Topping= 'none': null
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
				//check đã xoá hay chưa
				let id_Thaotac = element.id_Thaotac
				if(Number(id_Thaotac) == 1){
					html += `<tr class="has-rowspan" id='${id}'>`
					html += `<td data-label="STT" style="text-align: center;">${index+1}</td>`
					html += `<td data-label="ẢNH"><img class="mathang_thietlap" src='${photo}'></td>`
					html += `<td data-label="TÊN"><span class="table-nameMH" style="margin-left: 5px; color: yellow;">${ten_MH}</span><br>`
					for (var n = 0; n < nguyenlieu_MH.length; n++) {
						html +=`<p class="danhmuc">${nguyenlieu_MH[n].name_NL}</p>`
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
												<td data-label="Name"><span class="MHtopping" style="user-select: none;">${Topping_MH[n].name_Topping}</span></td>
												<td data-label="ĐG" style="text-align: right;"><span class="" style="user-select: none; text-align: right;">${money(Topping_MH[n].Topping_DG)}</span></td>
											</tr>`	
												
						}	
						html +=				`</tbody>
										</table>
									<!-- </div> -->`
			
					}
		
					html += `</td>`
					html += `<td data-label="ĐƠN GIÁ"><span style="margin-left: 5px; font-size: 20px;">${price}</span></td>`
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
					html += `<td data-label="THAO TÁC"><div class="danhmuc_thaotac" titles="${title}"><i class="far fa-edit" item="edit"></i>  <i class="far fa-clock" item="time" style="display: ${hide_hengio_Topping};"></i></td>`
					html += '</tr>'
				}
			}
			return html;
		case "DM_NHOMMATHANG":
			for (let index = 0; index < sortedList.length; index++) {
				const element = sortedList[index];
				const id = element.id_nhom
				const name = element.name_nhom
				let mota_nhom = element.mota_nhom
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
				const id_khuyenmai = element.id_subKM
				const name = element.name_subKM
				const nhom = element.name_nhom
				const phantram = element.phantramKM
				const id_loaiKM = element.id_KM
				const loai_KM = element.name_KM
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
			if(title){
				var list_doan = [];
				var list_douong = [];
				for(let i=0; i<sortedList.length; i++) {
					let element = sortedList[i]
					const DM_cha = element.parent_id
					console.log(DM_cha)
					let id_Thaotac = element.id_Thaotac
					//check del MH không show
					if(Number(id_Thaotac) == 1){
						if(Number(DM_cha)==1){
							list_doan.push(element)
						}else if(Number(DM_cha)==2){
							list_douong.push(element)
						}
					}
				}
				temp_order ={action: 'get_sort'}
				let res = await instance.post('/sortlist', temp_order);
				let list_sort = (res.data)
				let sort_da = list_sort[1]
				let sort_du = list_sort[2]
				let sort_DM = list_sort[0]
				
				//*---------------- sort đồ ăn ------------------------- */
				sort_da = eval(sort_da.sort)
				list_doan.sort((a, b) => sort_da.indexOf(a.id_MH) - sort_da.indexOf(b.id_MH));
				for(let i=0; i<list_doan.length; i++) {
					let element = list_doan[i]
					const id = element.id_MH
					const photo = element.photo_MH
					const ten_MH = element.name_MH
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
				//*---------------- sort đồ uống ------------------------- */
				html='';
				sort_du = eval(sort_du.sort)
				list_douong.sort((a, b) => sort_du.indexOf(a.id_MH) - sort_du.indexOf(b.id_MH));
				// console.log('do uong', list_douong)
				for(let i=0; i<list_douong.length; i++) {
					let element = list_douong[i]
					const id = element.id_MH
					const photo = element.photo_MH
					const ten_MH = element.name_MH
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

				//*---------------- sort Danh mục ------------------------- */
				html='';
				sort_DM = eval(sort_DM.sort)
				for(let i=0; i<sort_DM.length; i++) {
					let name;
					if(sort_DM[i]==1) name = 'Đồ Ăn'
					else name = "Đồ Uống"
					html += `<div class="course-item" id="${sort_DM[i]}" style= "color: white; margin: 10px 0; cursor: move;">
								<div class="header" style="margin-bottom: 20px; border: 1px solid rgba(255, 255, 255, .2); text-transform:none;">${name}</div>
							</div>`
				}
				main = document.getElementById('list_danhmuc');
				main.innerHTML = '';
				main.insertAdjacentHTML("afterbegin",html)
			}
		break;
		case "DM_MENUGAME":
			if(title){
				var list_online = sortedList.online_game;
				var list_offline = sortedList.offline_game;
				// for(let i=0; i<sortedList.length; i++) {
				// 	let element = sortedList[i]
				// 	const DM_cha = element.parent_id
				// 	console.log(DM_cha)
				// 	let id_Thaotac = element.id_Thaotac
				// 	//check del MH không show
				// 	if(Number(id_Thaotac) == 1){
				// 		if(Number(DM_cha)==1){
				// 			list_doan.push(element)
				// 		}else if(Number(DM_cha)==2){
				// 			list_douong.push(element)
				// 		}
				// 	}
				// }
				temp_order ={action: 'get_sort'}
				let res = await instance.post('/sortlist', temp_order);
				let list_sort = (res.data)
				let sort_da = list_sort[1]
				let sort_du = list_sort[2]
				let sort_DM = list_sort[0]
				console.log(list_online, list_offline)
				// return
				//*---------------- sort online game ------------------------- */
				// sort_da = eval(sort_da.sort)
				// list_doan.sort((a, b) => sort_da.indexOf(a.id_MH) - sort_da.indexOf(b.id_MH));
				for(let i=0; i<list_online.length; i++) {
					let element = list_online[i]
					const id = element.ID
					const photo = element.imagedata
					const name_game = element.Tengame
					// onerror="this.src='https://i.imgur.com/NhGzwjO.gif';this.onerror='';"
					html += `<div class="box_card" id="${id}">`
					html +=     `<div class="box-img">`
					html +=         `<img src="https://images2.thanhnien.vn/Uploaded/truongnghi/2022_07_15/1-4624.jpg">`
					html +=     `</div>`
					html +=     `<div class="tengame">`
					html +=         `<span>Game Online</span>`
					html +=         `<h3 class="name">${name_game}</h3>`
					html +=         `<h3 class="theloai">Hành động, Phiêu lưu</h3>`
					html +=         `<h3 class="luotchoi">☆ 1000</h3>`
					html +=     `</div>`
					html +=     `<div class="content">`
					html +=         `<h3>${name_game}</h3>`
					html +=         `<p>Hành động, Phiêu lưu</p>`
					html +=     `</div>`
					html +=     `<div class="button" >`
					html +=         `<li><button class="b1">Play Game</button></li>`
					// html +=         `<li><button class="b1" onclick="call('filerun4')">Save Game</button></li>`
					html +=         `<li><button class="b1">Open Folder</button></li>`
					html +=     `</div>`
					html += `</div>`
				}
				main = document.getElementById('list_sort_online');
				main.innerHTML = '';
				main.insertAdjacentHTML("afterbegin",html)

				html='';
				for(let i=0; i<list_offline.length; i++) {
					let element = list_offline[i]
					const id = element.ID
					const photo = element.imagedata
					const name_game = element.Tengame
					// onerror="this.src='https://i.imgur.com/NhGzwjO.gif';this.onerror='';"
					html += `<div class="box_card" id="${id}">`
					html +=     `<div class="box-img">`
					html +=         `<img src="https://images2.thanhnien.vn/Uploaded/truongnghi/2022_07_15/1-4624.jpg">`
					html +=     `</div>`
					html +=     `<div class="tengame">`
					html +=         `<span>Game Online</span>`
					html +=         `<h3 class="name">${name_game}</h3>`
					html +=         `<h3 class="theloai">Hành động, Phiêu lưu</h3>`
					html +=         `<h3 class="luotchoi">☆ 1000</h3>`
					html +=     `</div>`
					html +=     `<div class="content">`
					html +=         `<h3>${name_game}</h3>`
					html +=         `<p>Hành động, Phiêu lưu</p>`
					html +=     `</div>`
					html +=     `<div class="button" >`
					html +=         `<li><button class="b1">Play Game</button></li>`
					// html +=         `<li><button class="b1" onclick="call('filerun4')">Save Game</button></li>`
					html +=         `<li><button class="b1">Open Folder</button></li>`
					html +=     `</div>`
					html += `</div>`
				}
				main = document.getElementById('list_sort_offline');
				main.innerHTML = '';
				main.insertAdjacentHTML("afterbegin",html)
			}
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
	// console.log(title)
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
	var dropbox = await instance.post('/dropbox');
	// console.log(title,dict, e)
	var danhmuc = dropbox.data.danhmuc
	var mathang = dropbox.data.mathang
	var Topping = dropbox.data.Topping
	var nhom = dropbox.data.nhom
	var NV = dropbox.data.nhanvien
	var nguyenlieu = dropbox.data.nguyenlieu
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
					<p class="title_popup">Máy Trạm <b style="color: yellow;">${selectObject.namepc}</b></p>
					<hr style="margin: .3rem 0rem 0rem 0rem; border: 1px solid rgba(255, 255, 255, 0.3);outline: none !important;"><br>
					<div class="order-detail" style="text-align: left;">
						<div class="menu_maytrams">
						
							<div class="drop_btn nut_dropdown_2">Đăng nhập (Trả tiền sau)</div>
							<div class="drop_btn nut_dropdown_2">Tính tiền</div>
		
							<hr style="margin: .3rem 0rem 0rem 0.5rem; border: 1px solid rgba(255, 255, 255, 0.3);outline: none !important;"><br>
							<div class="dropdown" style="background: none;">
								<div class="drop_btn nut_dropdown_2">Điều Khiển máy trạm<i class="fa fa-angle-up" style="style="float: right;"></i></div>
								<div class="noidung_dropdown" style="overflow: inherit; left: 0%; border-radius:5px; padding: 5px 0;">
									<button class="item_menu" >Xem các ứng dụng từ xa</button>
									<button class="item_menu" >Điều khiển từ xa</button>
								</div>
							</div>
		
							<hr style="margin: .3rem 0rem 0rem 0.5rem; border: 1px solid rgba(255, 255, 255, 0.3);outline: none !important;"><br>
							<div class="drop_btn nut_dropdown_2">Khóa máy Trạm</div>
		
							
							<div class="dropdown" style="background: none;">
								<div class="drop_btn nut_dropdown_2">Đăng nhập quyền ADMIN<i class="fa fa-angle-up" style="style="float: right;"></i></div>
								<div class="noidung_dropdown" style="overflow: inherit; left: 0%;border-radius:5px; padding: 5px 0;">
									<button class="item_menu" >Máy trạm được chọn</button>
									<button class="item_menu" >Tất cả các máy trạm Sẵn sàng</button>
								</div>
							</div>
							
							<div class="dropdown" style="background: none;">
								<div class="drop_btn nut_dropdown_2">Đóng ứng dụng<i class="fa fa-angle-up" style="style="float: right;"></i></div>
								<div class="noidung_dropdown" style="overflow: inherit; left: 0%;border-radius:5px; padding: 5px 0;">
									<button class="item_menu" >Máy trạm được chọn</button>
									<button class="item_menu" >Tất cả các máy</button>
								</div>
							</div>
		
							<div class="dropdown" style="background: none;">
								<div class="drop_btn nut_dropdown_2">Tắt máy<i class="fa fa-angle-up" style="style="float: right;"></i></div>
								<div class="noidung_dropdown" style="overflow: inherit; left: 0%;border-radius:5px; padding: 5px 0;">
									<button class="item_menu" >Máy trạm được chọn</button>
									<button class="item_menu" >Những máy trạm Sẵn sàng</button>
									<button class="item_menu" >Tất cả các máy trạm</button>
								</div>
							</div>
		
						</div>`
				html+=`</div>`
				const show_contain = document.querySelector('#popup')
				show_contain.innerHTML = html;
			}else if(dict=="Them_hoivien"){
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
					<p class="title_popup">Thêm Hội Viên</p>
					<hr style="margin: 10px -30px 0rem -30px; border: 1px solid rgba(255, 255, 255, 0.2);outline: none !important;"><br>`
					html+=`	<div class="contents_popup">
					<div class="row">
						<div class="col" style="width:50%; padding:10px; border-radius:5px; border: 1px solid rgba(255,255,255,0.2); margin-right: 0;position: relative;">
							<label style="position: absolute;top:-10px;left: 20px; background: var(--light);color: var(--white);">Thông tin</label>
							<div class="course-item" style= "color: white;">
								<div class="row">
									<div class="col" style="width:50%;">
										<div class="course-item" style= "color: white; margin-top: 5px;">
											<div class="input-field">
												<input style="font-size: 14px; height:35px;" type="text" required spellcheck="false" class="popup-input Ho_hv"> 
												<label>Nhập Họ</label>
												<i class="ti-check"></i>
												<i class="ti-alert"></i>
											</div>
							
											<div class="input-field">
												<input style="font-size: 14px; height:35px;" type="text" required spellcheck="false" class="popup-input Ten_hv"> 
												<label>Nhập Tên</label>
												<i class="ti-check"></i>
												<i class="ti-alert"></i>
											</div>
											<div class="input-field date-form" style="margin:0; padding:0;">
												<label style="font-size: 14px;top: 0;background: var(--background);">Ngày sinh</label>
												<input style="font-size: 14px; height:35px;" class="popup-input birth_date" type="datetime-local" id="date_birday" style="width: 100%; margin:0;">
											</div>
										</div>
									</div>
									<div class="col" style="width:50%;">
										<div class="course-item" style= "color: white; margin-top: 5px;">
											<div class="input-field">
												<input style="font-size: 14px; height:35px;" type="text" required spellcheck="false" class="popup-input tendem_hv" > 
												<label>Nhập Tên Đệm</label>
												<i class="ti-check"></i>
												<i class="ti-alert"></i>
											</div>

											<div class="input-field date-form" style="margin:0; padding:0;">
												<label style="top: 0;background: var(--background);">Ngày</label>
												<input style="font-size: 14px; height:35px;" class="popup-input date_create" type="datetime-local" id="date_new" style="width: 100%; margin:0;">
											</div>

											<div class="checkbox-toggle" style="padding-bottom: 20px;">
												<label for="checkbox1" class="toggle_checkbox"> 
													<input style="font-size: 14px; height:35px;" type="checkbox" id="checkbox1" class="toggle_input popup-input chophep" hidden=""/>
													<div class="toggle_bar">
														<div class="toggle_spin"></div>
													</div>
													<p>Cho phép sử dụng</p>
												</label>
											</div>

										</div>
									</div>
								</div>

								<div class="input-field">
									<input style="font-size: 14px; height:35px;" type="text" required spellcheck="false" class="popup-input Last_login_hv"> 
									<label>Lần đăng nhập gần nhất</label>
									<span style="float: left; font-style: italic; margin-left:7px;"></span>
									<i class="ti-check"></i>
									<i class="ti-alert"></i>
								</div>
								<div class="input-field">
									<input style="font-size: 14px; height:35px;" type="text" required spellcheck="false" class="popup-input phone" onkeypress="validata_number_new(event);" onkeyup="validata_number_new(event)"> 
									<label>Số điện thoại</label>
									<i class="ti-check"></i>
									<i class="ti-alert"></i>
								</div>
								<div class="input-field">
									<input style="font-size: 14px; height:35px;" type="text" required spellcheck="false" class="popup-input email"> 
									<label>Nhập Email</label>
									<i class="ti-check"></i>
									<i class="ti-alert"></i>
								</div>
								<div class="input-field">
									<input style="font-size: 14px; height:35px;" type="text" required spellcheck="false" class="popup-input address"> 
									<label>Nhập địa chỉ</label>
									<i class="ti-check"></i>
									<i class="ti-alert"></i>
								</div>
								<div class="input-field">
									<input style="font-size: 14px; height:35px;" type="text" required spellcheck="false" class="popup-input city"> 
									<label>Nhập Thành phố</label>
									<i class="ti-check"></i>
									<i class="ti-alert"></i>
								</div>
								<div class="input-field">
									<input style="font-size: 14px; height:35px;" type="text" required spellcheck="false" class="popup-input zipcode"> 
									<label>Nhập Quận/Huyện</label>
									<i class="ti-check"></i>
									<i class="ti-alert"></i>
								</div>
								<div class="input-field">
									<input style="font-size: 14px; height:35px;" type="text" required spellcheck="false" class="popup-input cccd"> 
									<label>Nhập CCCD(CMND)</label>
									<i class="ti-check"></i>
									<i class="ti-alert"></i>
								</div>
								
								
							</div>
						</div>`

				html+=`	<div class="col" style="width:50%; padding:10px;border-radius:5px; border: 1px solid rgba(255,255,255,0.2); position: relative;">
							<label style="position: absolute;top:-10px;left: 20px; background: var(--light);color: var(--white);">Tài Khoản</label>
				
							<div class="course-item" style= "color: white; margin-top: 5px;">
								<div class="input-field">
									<input style="font-size: 14px; height:35px;" type="text" required spellcheck="false" class="popup-input name_HV invalid" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);"> 
									<label>Nhập tên người sử dụng</label>
									<i class="ti-check"></i>
									<i class="ti-alert"></i>
								</div>

								<div class="input-field">
									<input style="font-size: 14px; height:35px;" type="password" required spellcheck="false" class="popup-input pass_HV invalid" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);"> 
									<label>Nhập mật khẩu</label>
									<i class="ti-check"></i>
									<i class="ti-alert"></i>
								</div>`

				html+=`			<div class="TT_dichvus" style="display: flex; padding: 0px; margin: 15px 0px; height:35px;">
									<div class="checkbox-toggle" style="padding-bottom: 20px; width:33%; margin-right: 10px; diseable">
										<label for="checkbox2" class="toggle_checkbox"> 
											<input style="font-size: 14px; height:35px;" type="checkbox" id="checkbox2" class="toggle_input popup-input price_tuychon" hidden=""/>
											<div class="toggle_bar">
												<div class="toggle_spin"></div>
											</div>
											<p>Ngày hết hạn</p>
										</label>
									</div>
									<div class="input-field date-form disabledbutton" style="margin:0; padding:0; width:33%;">
										<input style="font-size: 14px; height:35px;" class="popup-input" type="datetime-local" id="date_hethan" style="width: 100%; margin:0;">
									</div>
								</div>

								<div class="TT_dichvus" style="display: flex; padding: 0px; margin: 15px 0px; height:35px;">
									<div style= "width:33%; color: white;padding: 5px 10px; margin-right: 10px; text-align: left; border-radius: 5px;">
										<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Thời gian đã mua:</span>
									</div>
									<div style= "width:33%; padding: 5px 10px;margin: 0px;text-align: left;align-items: center; margin-right: 10px; border-radius: 5px; border: 1px solid rgba(255,255,255,0.2);">
										<span class="TT_dichvu" id="${'id_start'}" style="font-size: 18px;padding:0;margin: 0px;color: var(--white_text);padding-right:5px;"> ${money(0)}</span>
									</div>
								</div>

								<div class="TT_dichvus" style="display: flex; padding: 0px; margin: 15px 0px; height:35px;">
									<div style= "width:33%; color: white;padding: 5px 10px; margin-right: 10px; text-align: left; border-radius: 5px;">
										<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Tiền đã dùng:</span>
									</div>
									<div style= "width:33%; padding: 5px 10px;margin: 0px;text-align: left;align-items: center; margin-right: 10px; border-radius: 5px; border: 1px solid rgba(255,255,255,0.2);">
										<span class="TT_dichvu" id="${'id_start'}" style="font-size: 18px;padding:0;margin: 0px;color: var(--white_text);padding-right:5px;"> ${money(0)}</span>
									</div>
								</div>

								<div class="TT_dichvus" style="display: flex; padding: 0px; margin: 15px 0px; height:35px;">
									<div style= "width:33%; color: white;padding: 5px 10px; margin-right: 10px; text-align: left; border-radius: 5px;">
										<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Tiền hiện có:</span>
									</div>
									<div style= "width:33%; padding: 5px 10px;margin: 0px;text-align: left;align-items: center; margin-right: 10px; border-radius: 5px; border: 1px solid rgba(255,255,255,0.2);">
										<span class="TT_dichvu" id="${'id_start'}" style="font-size: 18px;padding:0;margin: 0px;color: var(--white_text);padding-right:5px;"> ${money(0)}</span>
									</div>
									<div item="chinh" class="naptien" style= "cursor: pointer; padding: 5px 10px;margin: 0px; text-align: center; justify-content: center; flex-grow: 2;border-radius: 5px; background: #0099c6;">Nhập</div>
								</div>

								<div class="TT_dichvus" style="display: flex; padding: 0px; margin: 15px 0; height:35px;">
									<div style= "width:33%; color: white;padding: 5px 10px; margin-right: 10px; text-align: left; border-radius: 5px;">
										<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Tiền miễn phí:</span>
									</div>
									<div style= "width:33%; padding: 5px 10px;margin: 0px;text-align: left;align-items: center; margin-right: 10px; border-radius: 5px; border: 1px solid rgba(255,255,255,0.2);">
										<span class="TT_dichvu" id="${'id_start'}" style="font-size: 18px;padding:0;margin: 0px;color: var(--white_text);padding-right:5px;"> ${money(0)}</span>
									</div>
									<div item="free" class="naptien" style= "cursor: pointer; padding: 5px 10px;margin: 0px; text-align: center; justify-content: center; flex-grow: 2;border-radius: 5px; background: #0099c6;">Nhập</div>
								</div>

								<div class="TT_dichvus" style="display: flex; padding: 0px; margin: 15px 0px; height:35px;">
									<div style= "width:33%; color: white;padding: 5px 10px; margin-right: 10px; text-align: left; border-radius: 5px;">
										<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Tiền miễn phí còn lại:</span>
									</div>
									<div style= "width:33%; padding: 5px 10px;margin: 0px;text-align: left;align-items: center; margin-right: 10px; border-radius: 5px; border: 1px solid rgba(255,255,255,0.2);">
										<span class="TT_dichvu" id="${'id_start'}" style="font-size: 18px;padding:0;margin: 0px;color: var(--white_text);padding-right:5px;"> ${money(0)}</span>
									</div>
								</div>

								<div class="TT_dichvus" style="display: flex; padding: 0px; margin: 15px 0; height:35px;">
									<div style= "width:33%; color: white;padding: 5px 10px; margin-right: 10px; text-align: left; border-radius: 5px;">
										<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Trừ Tiền:</span>
									</div>
									<div style= "width:33%; padding: 5px 10px;margin: 0px;text-align: left;align-items: center; margin-right: 10px; border-radius: 5px; border: 1px solid rgba(255,255,255,0.2);">
										<span class="TT_dichvu" id="${'id_start'}" style="font-size: 18px;padding:0;margin: 0px;color: var(--white_text);padding-right:5px;"> ${money(0)}</span>
									</div>
									<div item="ruttien" class="naptien" style= "cursor: pointer; padding: 5px 10px;margin: 0px; text-align: center; justify-content: center; flex-grow: 2;border-radius: 5px; background: #0099c6;">Trừ tiền</div>
								</div>

							</div>
						</div>`

				html+=`	</div>
				</div>`
					
				html+=`<button type="button" class="button_popup" titles='${title}' item="save_new_hv">LƯU</button>`
				const show_contain = document.querySelector('#popup')
				show_contain.innerHTML = html;


				/*---------- func event date ---------------*/
				flatpickr("#date_birday", {
					locale: "vn",
					shorthandCurrentMonth: true, //defaults to false
					// disableMobile: false,
					time_24hr: true,
					enableTime: true,
					defaultHour: '00',
					defaultMinute: '00', 
					dateFormat: "d/m/Y",
					minDate: "2023-01",
				});
				flatpickr("#date_new", {
					locale: "vn",
					shorthandCurrentMonth: true, //defaults to false
					enableTime: true,
					dateFormat: "d/m/Y",
					defaultHour: '23',
					defaultMinute: '59', 
					minDate: "2023-01",
				});
				flatpickr("#date_hethan", {
					locale: "vn",
					shorthandCurrentMonth: true, //defaults to false
					enableTime: true,
					dateFormat: "d/m/Y",
					defaultHour: '23',
					defaultMinute: '59', 
					minDate: "2023-01",
				});
				var d = new Date();
				// d.setHours(0,0,0,0);	
				var date_begin = d.toLocaleString("en-ZA", {
					hour12: false,
					timeZone: "Asia/Ho_Chi_Minh",
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
					hour: "2-digit",
					minute:"2-digit",
					second: "2-digit",
				});
				date_begin = (date_begin.replace(',','')).replaceAll('/', '-')
				date_begin = date_begin
				
				var input_date_begin = document.querySelector('#date_birday')
				// if (input_date_begin)
				// 	input_date_begin.value = convert_dateToVN(date_begin).split(' ')[0]
				var input_date_end = document.querySelector('#date_new')
				if (input_date_end)
					input_date_end.value = convert_dateToVN(date_begin).split(' ')[0]
				var input_date_hethan = document.querySelector('#date_hethan')
				if (input_date_hethan)
					input_date_hethan.value = convert_dateToVN(date_begin).split(' ')[0]

				let naptien = document.querySelectorAll('#popup .naptien')
				naptien.forEach(element => {
					element.addEventListener('click',function (evt) {
						if(element.getAttribute('item')=='chinh'){
							let noidung_thongbao = ``//`<p>Hội viên <b style="color: yellow;">${'khách aaa'}</b></p>`
							let question = `<style>
												#id_confrmdiv {
													width: 40%;
												}
											</style>
											<div class="TT_dichvus" style="display: flex; padding: 0px; margin: 15px 0px; height:35px; width:100%;">
												<div style= "width:50%; color: var(--white_text);padding: 5px 10px; margin-right: 10px; text-align: left; border-radius: 5px;">
													<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Thời gian:</span>
												</div>
												<div class="input-field" style= "width:50%; margin:0;">
													<input style="font-size: 18px; height:35px;" type="text" required spellcheck="false" id="price" class="popup-input nameMH invalid" onkeypress="validata_number_new(event);" onkeyup="validata_number_new(event)"> 
												</div>
											</div>

											<div class="TT_dichvus" style="display: flex; padding: 0px; margin: 15px 0px; height:35px; width:100%;">
												<div style= "width:50%; color: var(--white_text);padding: 5px 10px; margin-right: 10px; text-align: left; border-radius: 5px;">
													<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Số tiền:</span>
												</div>
												<div class="input-field" style= "width:50%; margin:0;">
													<input style="font-size: 18px; height:35px;" type="text" required spellcheck="false" class="popup-input nameMH invalid" onkeypress="validata_number_new(event);" onkeyup="validata_number_new(event)" onkeydown="validata_price(event)"> 
											
												</div>
											</div>
											<div class="TT_dichvus" style="display: flex; padding: 0px; margin: 15px 0px; height:35px;width:100%;">
												<div style= "width:50%; color: var(--white_text);padding: 5px 10px; margin-right: 10px; text-align: left; border-radius: 5px;">
													<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Thời gian còn lại:</span>
												</div>
												<div style= "width:50%; padding: 5px 10px;margin: 0px;text-align: left;align-items: center; border-radius: 5px; border: 1px solid rgba(255,255,255,0.1);">
													<span class="TT_dichvu" id="${'id_start'}" style="font-size: 18px;padding:0;margin: 0px;color: var(--white_text);padding-right:5px;"> ${(0)}</span>
												</div>
											</div>
											<div class="TT_dichvus" style="display: flex; padding: 0px; margin: 15px 0px; height:35px;width:100%;">
												<div style= "width:50%; color: var(--white_text);padding: 5px 10px; margin-right: 10px; text-align: left; border-radius: 5px;">
													<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Số tiền còn lại:</span>
												</div>
												<div style= "width:50%; padding: 5px 10px;margin: 0px;text-align: left;align-items: center;border-radius: 5px; border: 1px solid rgba(255,255,255,0.1);">
													<span class="TT_dichvu" id="${'id_start'}" style="font-size: 18px;padding:0;margin: 0px;color: var(--white_text);padding-right:5px;"> ${money(0)}</span>
												</div>
											</div>`
							// hàm callback hay ah nha
							let conf = confirm_box(noidung_thongbao, question, async function (arg) {
								// console.log(arg)
								if(arg){
									
								}else{
									// clickFlag = 1;
									// /*------------------ close popup ---------------------------- */
									// document.querySelector('.overlay').classList.remove('showoverlay');
									// document.querySelector('.containerpopup .popup').classList.remove('open-popup');
								}
							}, `Nạp tiền hội viên <b style="color: yellow;">${'khách aaa'}</b>`);
						}else if(element.getAttribute('item')=='free'){
							let noidung_thongbao = ``//`<p>Hội viên <b style="color: yellow;">${'khách aaa'}</b></p>`
							let question = `<style>
												#id_confrmdiv {
													width: 40%;
												}
											</style>
											<div class="TT_dichvus" style="display: flex; padding: 0px; margin: 15px 0px; height:35px; width:100%;">
												<div style= "width:50%; color: var(--white_text);padding: 5px 10px; margin-right: 10px; text-align: left; border-radius: 5px;">
													<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Thời gian tặng:</span>
												</div>
												<div class="input-field" style= "width:50%; margin:0;">
													<input style="font-size: 18px; height:35px;" type="text" required spellcheck="false" id="price" class="popup-input nameMH invalid" onkeypress="validata_number_new(event);" onkeyup="validata_number_new(event)"> 
												</div>
											</div>

											<div class="TT_dichvus" style="display: flex; padding: 0px; margin: 15px 0px; height:35px; width:100%;">
												<div style= "width:50%; color: var(--white_text);padding: 5px 10px; margin-right: 10px; text-align: left; border-radius: 5px;">
													<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Số tiền tặng:</span>
												</div>
												<div class="input-field" style= "width:50%; margin:0;">
													<input style="font-size: 18px; height:35px;" type="text" required spellcheck="false" class="popup-input nameMH invalid" onkeypress="validata_number_new(event);" onkeyup="validata_number_new(event)" onkeydown="validata_price(event)"> 
											
												</div>
											</div>`
							// hàm callback hay ah nha
							let conf = confirm_box(noidung_thongbao, question, async function (arg) {
								console.log(arg)
								if(arg){
									
								}else{
									// clickFlag = 1;
									// /*------------------ close popup ---------------------------- */
									// document.querySelector('.overlay').classList.remove('showoverlay');
									// document.querySelector('.containerpopup .popup').classList.remove('open-popup');
								}
							}, `Tặng tiền hội viên <b style="color: yellow;">${'khách aaa'}</b>`);
						}else if(element.getAttribute('item')=='ruttien'){
							let noidung_thongbao = ``//`<p>Hội viên <b style="color: yellow;">${'khách aaa'}</b></p>`
							let question = `<style>
												#id_confrmdiv {
													width: 40%;
												}
											</style>
											<div class="TT_dichvus" style="display: flex; padding: 0px; margin: 15px 0px; height:35px; width:100%;">
												<div style= "width:50%; color: var(--white_text);padding: 5px 10px; margin-right: 10px; text-align: left; border-radius: 5px;">
													<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Thời gian trừ:</span>
												</div>
												<div class="input-field" style= "width:50%; margin:0;">
													<input style="font-size: 18px; height:35px;" type="text" required spellcheck="false" id="price" class="popup-input nameMH invalid" onkeypress="validata_number_new(event);" onkeyup="validata_number_new(event)"> 
												</div>
											</div>

											<div class="TT_dichvus" style="display: flex; padding: 0px; margin: 15px 0px; height:35px; width:100%;">
												<div style= "width:50%; color: var(--white_text);padding: 5px 10px; margin-right: 10px; text-align: left; border-radius: 5px;">
													<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Số tiền trừ:</span>
												</div>
												<div class="input-field" style= "width:50%; margin:0;">
													<input style="font-size: 18px; height:35px;" type="text" required spellcheck="false" class="popup-input nameMH invalid" onkeypress="validata_number_new(event);" onkeyup="validata_number_new(event)" onkeydown="validata_price(event)"> 
											
												</div>
											</div>
											
											<div class="TT_dichvus" style="display: flex; padding: 0px; margin: 15px 0px; height:35px; width:100%;">
												<div style= "width:50%; color: var(--white_text);padding: 5px 10px; margin-right: 10px; text-align: left; border-radius: 5px;">
													<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Lý do trừ:</span>
												</div>
												<div class="input-field" style= "width:50%; margin:0;">
													<input style="font-size: 18px; height:35px;" type="text" required spellcheck="false" id="price" class="popup-input nameMH invalid"> 
												</div>
											</div>`
											// hàm callback hay ah nha
							let conf = confirm_box(noidung_thongbao, question, async function (arg) {
								console.log(arg)
								if(arg){
									
								}else{
									// clickFlag = 1;
									// /*------------------ close popup ---------------------------- */
									// document.querySelector('.overlay').classList.remove('showoverlay');
									// document.querySelector('.containerpopup .popup').classList.remove('open-popup');
								}
							}, `Trừ tiền hội viên <b style="color: yellow;">${'khách aaa'}</b>`);
						}
						
					});
				});

				//*------------- event create hv ------------- */
				let btn_luu = document.querySelector('.button_popup')
				btn_luu.addEventListener('click',function (evt) {
					/*----- check invalid ---- */
					let invalid = this.parentNode.querySelectorAll('.invalid')
					console.log(invalid)
					if (invalid.length==0){
						save_popup(this, selectObject)
					}else{
						invalid.forEach(element => {
							try {
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
							} catch (error) {
								console.log(error)
							
							}
						
						})
					}
					/*----- check valid ---- */
					let valid = btn_luu.parentNode.querySelectorAll('.valid')
					valid.forEach(element => {
						try {
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
						} catch (error) {
							
						}
						
					});
				});

			}else if(dict=="Them_nhom_pc"){
				html +=`<style>
						.table_nhom_hv td {
							padding:0;
							padding-left:5px;
						}
						.popup .popup-input, .selected-lang, .lang-menu, .popup .button_popup {
							border-radius: 5px;
							height: 50px;
						}
						.popup{
							width: 80%;
						}

						.open-popup{
							top: 0vh;
						}
						code{
							color: #9b1728;
						}
						.col-xs-5.dropbox_old {
							padding: 0;
							
						}
						.dropbox_old.nhommay{
							position: relative;
							flex:2;
							width: calc(100% / 4.01);
							min-width: 150px;
							margin-left: 10px;
							
							border-radius: 5px;
							padding:0;
						}
						.dropbox_old.nhommay select {
							position: unset;
							
						}
						.dropbox_old.nhommay .ti-angle-down{
							transform: translate(0, -75%);
						}
						.dropbox_old.nhommay .ti-check, .dropbox_old.nhommay .ti-alert{
							padding-right: 35px;
						}
						
					</style>`
				html+=`	<a class="close_popup" onclick='closePopup_gop_y()'>X</a>
					<p class="title_popup">Thêm nhóm máy</p>
					<hr style="margin: 10px -30px 0rem -30px; border: 1px solid rgba(255, 255, 255, 0.2);outline: none !important;"><br>`
				html+=`<div class="row">
						<div class="col-xs-5 dropbox_old nhommay">`
				html+=`<div class="TT_dichvus" style="display: flex; padding: 0px; margin: 15px 0px; height:35px; width:100%;">
							<div style= "width:50%; color: var(--white_text);padding: 5px 10px; margin-right: 10px; text-align: left; border-radius: 5px;">
								<span class="name" style="font-size: 18px;padding:0;margin: 0px;">Tên nhóm máy:</span>
							</div>
							<div class="input-field" style= "width:50%; margin:0;">
								<input style="font-size: 18px; height:35px;" type="text" required spellcheck="false" id="price" class="popup-input name_nhom_pc invalid" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);"> 
								<i class="ti-check"></i>
								<i class="ti-alert"></i>
							</div>
						</div>

						<div class="TT_dichvus" style="display: flex; padding: 0px; margin: 15px 0px; height:35px; width:100%;">
							<div style= "width:50%; color: var(--white_text);padding: 5px 10px; margin-right: 10px; text-align: left; border-radius: 5px;">
								<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Mô tả:</span>
							</div>
							<div class="input-field" style= "width:50%; margin:0;">
								<input style="font-size: 18px; height:35px;" type="text" required spellcheck="false" class="popup-input mota_nhom_pc" onkeyup="validateValue_str(event)"> 
								<i class="ti-check"></i>
								<i class="ti-alert"></i>
							</div>
						</div>`
				html+=`	<div class="table_responsive" style="overflow-y: auto; border-radius: 5px; text-align: left;">
							<span>Giá tiền từng nhóm người dùng </span>
							<table cellspacing="0" cellpadding="0" id="table_nhom_hv" class="table_nhom_hv" style="margin-top:5px;">
								<thead style="background: rgba(98, 98, 98, 0.23);">
									<tr>
										<th>Nhóm người dùng</th>
										<th>Giá (VNĐ)</th>									
									</tr>
								</thead>
								<tbody id="nhom_hv_table">`
								temp_order= {action: 'get_nhom_hv'}
								let res= await instance.post('/hoivien', temp_order);
								if (res.data){
									console.log(res.data)
									let value = res.data
									for (let index = 0; index < value.length; index++) {
										const element = value[index];
										let nhom_id = element.nhom_hv_id
										let mota = element.mota
										let Price = element.Price_pc
										let active = element.Active
										if(active=='1'){
											html += `<tr class="" id='${nhom_id}' style="${''}">`
											html += `<td data-label="Nhóm người dùng" class="nhom_hv" id='${''}'>${mota}</td>`
											html += `<td data-label="Giá Nhóm máy" id="${''}">
														<div class="input-field" style= "width:100%; margin:0;">
															<input value="${new Intl.NumberFormat('vi-VN').format(Price)}"style="font-size: 18px; height:35px; width:100%; border: none;" type="text" required spellcheck="false" class="popup-input valid" onkeypress="validata_number_new(event);" onkeyup="validata_number_new(event)" onkeydown="validata_price(event)"> 
															
														</div>
													</td>`
											html += '</tr>'
										}
									}
								}
				html+=`			</tbody>
							</table>
						</div>`
				html+=`<div class="importan-note" style="padding: 10px; font-size:16px; text-align: left;">
							<span>Ghi chú: Sửa giá nhấp vào vùng số.</span>
						</div>
					</div>
							<div class="col-xs-5 dropbox_old nhommay" style="margin-left: 20px;">
								<div style="text-align: left; margin-bottom:5px;">
									<span>Danh sách máy trong nhóm</span>
								</div>
								<select name="from[]" class="js-multiselect form-control" size="12" multiple="multiple">
									<option value="1">Item 1</option>
									<option value="2">Item 5</option>
									<option value="2">Item 2</option>
									<option value="2">Item 4</option>
									<option value="3">Item 3</option>
									<option value="1">Item 1</option>
									<option value="2">Item 5</option>
									<option value="2">Item 2</option>
									<option value="2">Item 4</option>
									<option value="3">Item 3</option>
								</select>
							</div>
						</div>`
				
				html+=`<button type="button" class="button_popup" titles='${title}' item="save_new_nhom_pc">Thêm</button>`
				const show_contain = document.querySelector('#popup')
				show_contain.innerHTML = html;

				//*------------- event create hv ------------- */
				let btn_luu = document.querySelector('.button_popup')
				btn_luu.addEventListener('click',function (evt) {
					/*----- check invalid ---- */
					let invalid = this.parentNode.querySelectorAll('.invalid')
					console.log(invalid)
					if (invalid.length==0){
						save_popup(this, selectObject)
					}else{
						invalid.forEach(element => {
							try {
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
							} catch (error) {
								console.log(error)
							
							}
						
						})
					}
					/*----- check valid ---- */
					let valid = btn_luu.parentNode.querySelectorAll('.valid')
					valid.forEach(element => {
						try {
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
						} catch (error) {
							
						}
						
					});
				});


			}else if(dict=="Capnhat_nhom_pc"){
				// if (typeof someObject == 'undefined') $.loadScript('url_to_someScript.js', function(){
				// 	//Stuff to do after someScript has loaded
				// });
				html =  `<style>
						.popup .popup-input, .selected-lang, .lang-menu, .popup .button_popup {
							border-radius: 5px;
							height: 50px;
						}
						.popup{
							width: 80%;
						}

						.open-popup{
							top: 0vh;
						}
						code{
							color: #9b1728;
						}
						.col-xs-5.dropbox_old {
							padding: 0;
							
						}
						.dropbox_old.nhommay{
							position: relative;
							flex:2;
							width: calc(100% / 4.01);
							min-width: 150px;
							margin-left: 10px;
							border: 1px solid rgba(255, 255, 255, 0.2);	
							border-radius: 5px;
							padding:0;
						}
						.dropbox_old.nhommay select {
							position: unset;
							
						}
						.dropbox_old.nhommay .ti-angle-down{							
							transform: translate(0, -75%);
						}
					</style>`
				html+=`	<a class="close_popup" onclick='closePopup_gop_y()'>X</a>
				<p class="title_popup">Cập nhật danh sách máy</p>
				<hr style="margin: 10px -30px 0rem -30px; border: 1px solid rgba(255, 255, 255, 0.2);outline: none !important;"><br>`
				html+=`<div class="row">
							<div class="col-xs-5 dropbox_old nhommay" style="border: none;">
								<div class="" style="display: flex; -webkit-flex-wrap: wrap; flex-wrap: wrap;font-size: 16px; align-items: center; margin-bottom: 10px;">
									<div>
										<span>Danh sách máy trong nhóm: </span>
									</div>
									<div class="dropbox_old nhommay">
										<select style="height:40px; border: none;font-size:14px;">
											<option>HOÀN THÀNH</option>
											<option>TẤT CẢ</option>
											<option>HỦY</option>
										</select>
										<i class="ti-angle-down" style="font-size:20px;padding-top:4px;"></i>
										<i class="ti-check"></i>
										<i class="ti-alert"></i>
									</div>
								</div>
								
								<select name="from[]" class="js-multiselect form-control" size="10" multiple="multiple">
									<option value="1">Item 1</option>
									<option value="2">Item 5</option>
									<option value="2">Item 2</option>
									<option value="2">Item 4</option>
									<option value="3">Item 3</option>
									<option value="1">Item 1</option>
									<option value="2">Item 5</option>
									<option value="2">Item 2</option>
									<option value="2">Item 4</option>
									<option value="3">Item 3</option>
								</select>

								

							</div>
							
							<div class="col-xs-2">
								<button type="button" id="js_right_All_1" class="btn btn-block"><i class="ti-angle-double-right"></i></button>
								<button type="button" id="js_right_Selected_1" class="btn btn-block"><i class="ti-angle-right"></i></button>
								<button type="button" id="js_left_Selected_1" class="btn btn-block"><i class="ti-angle-left"></i></button>
								<button type="button" id="js_left_All_1" class="btn btn-block"><i class="ti-angle-double-left"></i></button>
							</div>
							
							<div class="col-xs-5 dropbox_old nhommay" style="border: none;">

								<div class="" style="display: flex; -webkit-flex-wrap: wrap; flex-wrap: wrap;font-size: 16px; align-items: center; margin-bottom: 10px;">
									<div>
										<span>Danh sách máy trong nhóm: </span>
									</div>
									<div class="dropbox_old nhommay">
										<select style="height:40px; border: none; font-size:14px;">
											<option>HOÀN THÀNH</option>
											<option>TẤT CẢ</option>
											<option>HỦY</option>
										</select>
										<i class="ti-angle-down" style="font-size:20px;padding-top:4px;"></i>
										<i class="ti-check"></i>
										<i class="ti-alert"></i>
									</div>
								</div>

								<select name="to[]" id="js_multiselect_to_1" class="form-control" size="10" multiple="multiple"></select>
							</div>
						</div>`
				
				html+=`<button type="button" class="button_popup" titles='${title}' item="save_new_nhom_pc">XÁC NHẬN</button>`
				const show_contain = document.querySelector('#popup')
				show_contain.innerHTML = html;

				
				$('.js-multiselect').multiselect({
					right: '#js_multiselect_to_1',
					rightAll: '#js_right_All_1',
					rightSelected: '#js_right_Selected_1',
					leftSelected: '#js_left_Selected_1',
					leftAll: '#js_left_All_1'
				});
				
				console.log('test nhom update')
			}else if(dict=="Xoa_nhom_pc"){
				html =  `<style>
						.popup .popup-input {
							height: 50px;
						}
						.drop_btn.nut_dropdown_2:hover{
							background: grey;
						}
					</style>	
					<a class="close_popup" onclick='closePopup_gop_y()'>X</a>
					<p class="title_popup">Nhóm ${selectObject.namepc}</p>
					<hr style="margin: .3rem 0rem 0rem 0rem; border: 1px solid rgba(255, 255, 255, 0.3);outline: none !important;"><br>
					<div class="order-detail" style="text-align: left;">
						<div class="menu_maytrams">
							<div class="drop_btn nut_dropdown_2"><i class="ti-plus" style="margin-right:20px; color: red; border:none; padding:0;font-size: unset;"></i> Thêm</div>
							<div class="drop_btn nut_dropdown_2"><i class="ti-close" style="margin-right:20px; color: red;"></i> Xoá</div>
							<div class="drop_btn nut_dropdown_2"><i class="ti-pencil" style="margin-right:20px; color: red;"></i> Sửa</div>
		
							
							<hr style="margin: .3rem 0rem 0rem 0.5rem; border: 1px solid rgba(255, 255, 255, 0.3);outline: none !important;"><br>
							<div class="drop_btn nut_dropdown_2"><i class="ti-pencil" style="margin-right:20px; color: red; visibility: hidden;"> </i>Cập nhật danh sách máy</div>
							<div class="drop_btn nut_dropdown_2"><i class="ti-pencil" style="margin-right:20px; color: red; visibility: hidden;"> </i>Chi tiết nhóm máy</div>
							
							
						</div>`
				html+=`</div>`
				const show_contain = document.querySelector('#popup')
				show_contain.innerHTML = html;
			}else if(dict=="Them_khongche_timer"){
				html +=`<style>
						.table_nhom_hv td {
							padding:0;
							padding-left:5px;
						}
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
						code{
							color: #9b1728;
						}
						.scheduler, .scheduler tr, .scheduler th, .scheduler td {
							border: 1px solid rgba(255,255,255,0.2);
						}


						.col-xs-5.dropbox_old {
							padding: 0;
							
						}
						.dropbox_old.nhommay{
							position: relative;
							flex:2;
							width: calc(100% / 4.01);
							min-width: 150px;
							margin-left: 10px;
							
							border-radius: 5px;
							padding:0;
						}
						.dropbox_old.nhommay select {
							position: unset;
							
						}
						.dropbox_old.nhommay .ti-angle-down{
							transform: translate(0, -75%);
						}
						.dropbox_old.nhommay .ti-check, .dropbox_old.nhommay .ti-alert{
							padding-right: 35px;
						}
						
					</style>`
				html+=`	<a class="close_popup" onclick='closePopup_gop_y()'>X</a>
						<p class="title_popup">Thêm khống chế thời gian</p>
						<hr style="margin: 10px -30px 0rem -30px; border: 1px solid rgba(255, 255, 255, 0.2);outline: none !important;"><br>`
				html+=`<div class="row">
							<div class="col-xs-5 dropbox_old nhommay">
								<div class="TT_dichvus" style="display: flex; padding: 0px; margin: 15px 0px; height:35px; width:100%;">
									<div style= "width:50%; color: var(--white_text);padding: 5px 10px; margin-right: 5px; text-align: left; border-radius: 5px;">
										<span class="nameMH" style="font-size: 16px;padding:0;margin: 0px;">Khống chế thời gian:</span>
									</div>
									<div class="input-field" style= "width:50%; margin:0;">
										<input style="font-size: 16px; height:35px;" type="text" required spellcheck="false" id="price" class="popup-input nameMH invalid" onkeypress="validata_number_new(event);" onkeyup="validata_number_new(event)"> 
									</div>
								</div>

								<div class="TT_dichvus" style="display: flex; padding: 0px; margin: 15px 0px; height:35px; width:100%;">
									<div style= "width:50%; color: var(--white_text);padding: 5px 10px; margin-right: 5px; text-align: left; border-radius: 5px;">
										<span class="nameMH" style="font-size: 18px;padding:0;margin: 0px;">Nhóm:</span>
									</div>
									<div class="input-field" style= "width:50%; margin:0;">
										<input style="font-size: 18px; height:35px;" type="text" required spellcheck="false" class="popup-input nameMH invalid" onkeypress="validata_number_new(event);" onkeyup="validata_number_new(event)" onkeydown="validata_price(event)"> 
									</div>
								</div>

							</div>
							<div class="col-xs-5 dropbox_old nhommay" style= "margin-left:100px; ">
								<div class="" style="display: flex; justify-content: flex-end; padding: 0px; margin: 15px 0px; height:35px;">
									<div class="input-field" style= "width:15%; margin:0;">
										<input style="font-size: 18px; height:35px; pointer-events:none;" type="text" required spellcheck="false" id="price" class="popup-input nameMH invalid" onkeypress="validata_number_new(event);" onkeyup="validata_number_new(event)"> 
									</div>
									<div style= "width:50%;color: var(--white_text);padding: 5px 10px;text-align:left; margin-right: 10px; border-radius: 5px;">
										<span class="nameMH" style="font-size: 14px;padding:0;margin: 0px;">Không được đăng nhập</span>
									</div>
								</div>

								<div class="" style="display: flex; justify-content: flex-end; padding: 0px; margin: 15px 0px; height:35px;">
									<div class="input-field" style= "width:15%; margin:0; background: #87bd41;border-radius: 5px;">
										<input style="font-size: 18px; height:35px;pointer-events:none;" type="text" required spellcheck="false" id="price" class="popup-input nameMH invalid" onkeypress="validata_number_new(event);" onkeyup="validata_number_new(event)"> 
									</div>
									<div style= "width:50%;color: var(--white_text);padding: 5px 10px; text-align:left;margin-right: 10px; border-radius: 5px;">
										<span class="nameMH" style="font-size: 14px;padding:0;margin: 0px;">Được đăng nhập</span>
									</div>
								</div>
							</div>
						</div>`
				html+=` <table id="scheduler"></table>`
				html+=`<button type="button" class="button_popup" titles='${title}' item="save_new_nhom_pc">Thêm</button>`
				const show_contain = document.querySelector('#popup')
				show_contain.innerHTML = html;
				//jQuery Weely Scheduler
				function log(msg) {
					// var str = $.fn.scheduler.util.serialize(data);
					
					// $.fn.scheduler.util.parse(str);
					// $('#log').prepend('<p>' + ++log.line + ': ' + msg + '</p>');
					// console.log(msg,str)
				  }
				log.line = 0;
				$('#scheduler').scheduler({
					data: {
					//   1: [1, 2, 3, 4]
					},
					onRender: function () {
					  log('Init');
					},
					onDragStart: function (d) {
					  log('Drag Start');
					},
					onDragMove: function (d) {
					  log('Drag Move');
					},
					onDragEnd: function (d) {
					  log('Drag End');
					  console.log(d)
					},
					onSelect: function (d) {
					  log('Selected');
					}
				  });

			}
		break;
		case "DM_BIA":
			if(dict== "HUY"){
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
				
				<button type="button" class="button_popup" titles="DM_BIA" item="HUY">Gửi</button>`

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
			}else if(dict == "add_bia"){
				html= `<!-- <img src="image/tick.png"> -->
				<a class="close_popup" onclick='closePopup_gop_y()'>X</a>
				<p class="title_popup">Thêm Bàn BI-A</p>
				<hr style="margin: .3rem 0rem 0rem 0rem; border: 1px solid rgba(255, 255, 255, 0.3);outline: none !important;"><br>


				<div class="input-field">
					<input type="text" required spellcheck="false" class="popup-input name_table invalid" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);"> 
					<label>Nhập tên bàn Bi-a</label>
					<i class="ti-check"></i>
					<i class="ti-alert"></i>
				</div>

				<div class="input-field nhapgiaMH">
					<input type="text" required spellcheck="false" class="popup-input price_table invalid" onkeypress="validata_number_new(event);" onkeyup="validata_number_new(event)" onfocusout="validata_number_new(event)"> 
					<label>Nhập đơn giá bàn Bi-a</label>
					<span style="float: left; font-style: italic; margin-left:7px;"></span>
					<i class="ti-check"></i>
					<i class="ti-alert"></i>
				</div>
				
				<button type="button" class="button_popup" titles="DM_BIA" item="save_new">LƯU</button>`
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

			}else if(dict == "config_ban"){
				let temp = {action: 'getBia'}
				let res = await instance.post('/Bi-a', temp);
				let value = res.data

		html= `<!-- <img src="image/tick.png"> -->
				<a class="close_popup" onclick='closePopup_gop_y()'>X</a>
				<p class="title_popup">Chỉnh sửa Bàn BI-A</p>
				<hr style="margin: .3rem 0rem 0rem 0rem; border: 1px solid rgba(255, 255, 255, 0.3);outline: none !important;"><br>`
				
		html+=`<div class="lang-menu" id="Search_table" style="height: 50px; margin:0;">
				<div class="selected-lang" style="height: 50px; background: var(--light);border-radius: 5px;">
					<span class="sBtn-text name_table">Chọn Bàn BI-A</span>
					<i class="separator"></i>
					<span class='sBtn-close'>X</span>
					<i class="ti-angle-down"></i>
				</div>
				<ul style="padding: 0;">`
				value.sort((a, b) =>a.name.localeCompare(b.name));
				value.forEach(function(element, index){
					html+= `<li class="option" id="${element.id_table}" style="padding: 5px;" price="${element.price}">${element.name}</li>`
				})
		html+=`</ul>
				<i class="ti-check"></i>
				<i class="ti-alert"></i>
				</div>`
		
		html+=`		
				<div class="input-field">
					<input type="text" required spellcheck="false" class="popup-input name_table invalid" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);"> 
					<label>Tên bàn Bi-a</label>
					<i class="ti-check"></i>
					<i class="ti-alert"></i>
				</div>

				<div class="input-field gia_table">
					<input type="text" required spellcheck="false" class="popup-input price_table invalid" onkeypress="validata_number_new(event);" onkeyup="validata_number_new(event)" onfocusout="validata_number_new(event)"> 
					<label>Đơn giá bàn Bi-a</label>
					<span style="float: left; font-style: italic; margin-left:7px;"></span>
					<i class="ti-check"></i>
					<i class="ti-alert"></i>
				</div>
				
				<button type="button" class="button_popup" titles="DM_BIA" item="save_edit">LƯU</button>`
				const show_contain = document.querySelector('#popup')
				show_contain.innerHTML = html;

				await dropbox_trangthai()
				/*-------------func event chagne ----------------*/
				//close btn
				let btn_close = document.querySelectorAll('.lang-menu .sBtn-close')
				btn_close.forEach(element => {
					element.addEventListener('click',async function (evt) {
						let name_table = document.querySelector('.input-field .name_table')
						let price_table = document.querySelector('.input-field .price_table')
						let span = document.querySelector('.input-field.gia_table span')
						name_table.classList.add('invalid')
						price_table.classList.add('invalid')
						name_table.value = ''
						name_table.id = ''
						price_table.value = ''
						span.innerHTML = ''
					});
				});
				let options = document.querySelectorAll(".lang-menu .option")
				options.forEach(element => {
					// $(element).on('DOMSubtreeModified',async function(){
						element.addEventListener('click',async function (evt) {
						if (this.innerText!==''){
							let name_table = document.querySelector('.input-field .name_table')
							let price_table = document.querySelector('.input-field .price_table')
							let span = document.querySelector('.input-field.gia_table span')
							name_table.classList.remove('invalid')
							price_table.classList.remove('invalid')
							
							name_table.value = this.innerText
							name_table.id = this.id
							price_table.value = this.getAttribute('price')
							span.innerHTML = money(this.getAttribute('price'))

							
							// temp = {action: 'getBia'}
							// res = await instance.post('/Bi-a', temp);
							// value = res.data
							// loc_list('DM_BIA',value)
						}
					});
				});
				/*------------------- func save ----------------------- */
				let btn_luu = document.querySelector('.button_popup')
				btn_luu.addEventListener('click',function (evt) {
					/*----- check invalid ---- */
					let invalid = this.parentNode.querySelectorAll('.invalid')
					if (invalid.length==0){
						let name_table = document.querySelector('.input-field .name_table')
						let price_table = document.querySelector('.input-field .price_table')
						selectObject = {
							name_table: name_table.value,
							price_table: price_table.value,
							id_table: name_table.id,
							action: 'edit_table'
						}
						// console.log('test dict',selectObject)
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

					let nameTopping = topping[i].name_Topping
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
				show_contain.innerHTML = html
				
				/*---- func add số lượng topping vào dict -----*/
				const detail_topping = show_contain.querySelectorAll('.detail_Topping')
				detail_topping.forEach(element => {
				/*--- event change span ---- */
					const sl_topping = element.querySelector('.order-soluong')//MutationObserver ,
					// Bind to the DOMSubtreeModified Event
					$(sl_topping).bind('DOMSubtreeModified',function (evt) {
						const nameTopping = element.querySelector('.order-nameTopping').innerText
						for (var i = 0; i < dict.Topping.length; i++){
							if (dict.Topping[i].name_Topping == nameTopping){
								dict.Topping[i].Topping_SL = Number(sl_topping.innerText)
								break;
							}
						}
					});		
				});
				const btn_click= document.querySelector('.containerpopup .button_popup')
				btn_click.addEventListener('click',function (evt) {
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

				});
				// show popup
				clickFlag = 0;
				// document.querySelector('.containerpopup  .popup').classList.add('open-popup');
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
							// console.log(index)
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
						// console.log(selectObject.dict)
						selectObject.dict.price_TC = Number(price_MH.value)
						selectObject.dict.price_MH = Number(price_MH.value)
						var dict_tmp = selectObject.dict
						var selectObject_tmp = selectObject.selectObject
						// check condition have topping or muc gia toi thieu 
						if (Number(price_MH.value) < Number(dict_tmp.muctoithieu) || dict_tmp.Topping.length == 0){
							dict_tmp.Topping = []
							order(selectObject_tmp, dict_tmp);
							closePopup_gop_y()
							// console.log('ddd', selectObject_tmp, dict_tmp)
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
			}else if (dict =='add_vitri'){
				html =  `<style>
						.popup .popup-input, .selected-lang, .lang-menu, .popup .button_popup {
							border-radius: 5px;
							height: 50px;
						}
						.popup{
							width: 50%;
						}

						.open-popup{
							top: 0vh;
						}	
						code{
							color: #9b1728;
						}
					</style>`	
					temp_order = {action: 'getBia_dangsudung'}
					let list_bia = await instance.post('/Bi-a', temp_order);
					list_bia = list_bia.data
					console.log(list_bia)
					let show="Chọn vị trí..."
					// list_MH.MH_of_nhom.length == 0 ? show="Chọn Mặt Hàng..." : show=""

				html+=`	<a class="close_popup" onclick='closePopup_gop_y()'>X</a>
					<p class="title_popup">Thêm vị trí đặt hàng</p>
					<hr style="margin: 10px -30px 0rem -30px; border: 1px solid rgba(255, 255, 255, 0.2);outline: none !important;"><br>
					<div class="lang-menu" id='hidde' style= "width:100%;">
						<div class="selected-lang" style="padding: 10px 0; justify-content: space-between; width:100%;">
							<div class="contains" style="box-sizing: inherit; display: flex; flex-flow: wrap; border-right: 1px solid rgba(255,255,255,0.2); width:100%;">
								<input type="text" class="search_MH" style="flex: 2; padding:0 10px;color: var(--white_text);font-size: 19px; background: transparent; border: none;" placeholder="${show}">
							</div>
							<span class='sBtn-close' >X</span>
							<i class="ti-angle-down" style="border: none; float:right;"></i>
						</div>
						<ul  style="padding:10px 0;">`
				for (let index = 0; index < list_bia.length; index++) {
					const element = list_bia[index];
					console.log(element)
					let id = element.id
					let name = element.name
					let date_begin = element.date_begin
					html+=`	<li class="option" id="${id}" date-begin="${date_begin}">
								<a href="#" class="de option-text">${name}</a>
							</li>`
				}
				html+=	`</ul>
						<i class="ti-check"></i>
						<i class="ti-alert"></i>
					</div>
					<p style="text-align: left;margin-top: 5px;"><i>- Nếu không muốn thêm vị trí, có thể nhấn nút Đặt Hàng Ngay để bỏ qua bước này, mặc định là ***Khách vãng lai***</i></p>
					<p style="text-align: left;margin-top: 5px;"><i>- Chọn bàn Bi-a đang sử dụng thêm đơn hàng tại đây</i></p>`
				
				html+=	`<button type="button" class="button_popup" titles='${title}' item="add_nv" style="margin-top:20px;">Đặt Hàng Ngay</button>`
				// Nếu không muốn thêm vị trí, có thể nhấn nút Đặt Hàng Ngay để bỏ qua bước này.
				const show_contain = document.querySelector('#popup')
				show_contain.innerHTML = html;

				function dropbox_chonmau(title){
					var optionMenu = document.querySelector(".lang-menu")
					if (optionMenu){
						var selectBtn = optionMenu.querySelector(".selected-lang"),
						options = optionMenu.querySelectorAll(".option"),
						sBtn_text = optionMenu.querySelector(".sBtn-text"),
						input_text = optionMenu.querySelector(".search_MH"),
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
							// sBtn_text.innerText = title;
							// send_color.style.backgroundColor= 'grey'
							input_text.value =''
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
								// let get_color = option.querySelector(".mathang")
								// var backgroundColor = window.getComputedStyle ? window.getComputedStyle(get_color, null).getPropertyValue("background-color") : get_color.style.backgroundColor;
								// var color = $(get_color).css("background-color");
								
								// send_color.style.backgroundColor= color
								console.log(option.getAttribute('date-begin'))
								input_text.value = selectedOption;
								input_text.id = id;
								input_text.setAttribute('date-begin',option.getAttribute('date-begin'))
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
				dropbox_chonmau('')
				console.log(list_giohang)
				/*------------------- func save ----------------------- */
				let btn_luu = document.querySelector('.button_popup')
				btn_luu.addEventListener('click',function (evt) {
					let input_text = document.querySelector(".lang-menu .search_MH")
					let id_table_custom = input_text.id
					console.log(input_text.value, id_table_custom)
					if(input_text.value !=''){
						for (let index = 0; index < list_giohang.length; index++) {
							list_giohang[index]['Custom'] = input_text.value
							list_giohang[index]['date_new'] = input_text.getAttribute('date-begin')
							list_giohang[index]['id_table_custom'] = id_table_custom
						}
					}else{
						for (let index = 0; index < list_giohang.length; index++) {
							list_giohang[index]['date_new'] = new_date();
							list_giohang[index]['id_table_custom'] = ''
						}
					}
					save_popup(this, list_giohang)
				});
				// show popup
				clickFlag = 0;				
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
								<option value="0">Không Có Danh Mục Cha</option>
								<option value="1">Đồ Ăn</option>
								<option value="2">Đồ Uống</option>
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
				color_list.color_list.forEach(function(element, index){
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
				dropbox_chonmau('Không chọn màu');

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
								<option value="0">Không Có Danh Mục Cha</option>
								<option value="1">Đồ Ăn</option>
								<option value="2">Đồ Uống</option>
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
				color_list.color_list.forEach(function(element, index){
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
				let DMcha = row.children[2].id
				let Mau = await get_color(color_list, row.children[0].id)
				let DTkhac = row.children[3]
				DTkhac = DTkhac.querySelector('i.checked')? true : false;
				let moban = row.children[4].querySelector('.toggle_input').checked
				console.log(DTkhac, moban)
				// DMcha=DMcha.innerText.trim()
				// if(DMcha=='Không có')DMcha='Không Có Danh Mục Cha';

				document.querySelector('.popup-input.nameDM').value= ten.innerText
				document.querySelector('.popup-input.motaDM').value= mota.innerText
				document.querySelector('.popup-input.DMcha').value= DMcha
				document.querySelector('.lang-menu .sBtn-text').innerText= Mau.name
				document.querySelector('.selected-lang .mathang').style.background = Mau.color
				document.querySelector('#DMtach').checked = DTkhac;
				document.querySelector('#mobanDM').checked = moban;

				// show popup
				clickFlag = 0;
				dropbox_chonmau('Không chọn màu');	
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
				// console.log(row.children[2].children[0], id)
			}
			if(dict=='create'){
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
										<option value='0'>Chọn danh mục cho mặt hàng</option>`
										/*-------------- sort Alphabetically xắp sếp ----------- */
										const sortedList = danhmuc.sort((a, b) =>a.name_DM.localeCompare(b.name_DM));
										sortedList.forEach(function(element, index){
											const name = element.name_DM
											const id_DM = element.id_DM
											// console.log(id_DM)
											id_DM=='3'?html+= `<option value="${id_DM}" style="color: orange;">${name}</option>`: html+= `<option value="${id_DM}">${name}</option>`
											// html+= `<option value="${id_DM}">${name}</option>`
										
										
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
										nguyenlieu.sort((a, b) =>a.name_NL.localeCompare(b.name_NL));
										// console.log(nguyenlieu);
										nguyenlieu.forEach(function(element, index){
											const name = element.name_NL
											const id_NL = element.id_NL
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
										Topping.sort((a, b) =>a.name_MH.localeCompare(b.name_MH));
										Topping.forEach(function(element, index){
											const name = element.name_MH
											const price = element.price_MH
											const id = element.id_MH
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
				
				/*--------- func show value on popup -------- */
				id = document.querySelector('.title_popup').id//id_MH
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
							id: element.id_HG,
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
					/*----- func show timer ------- */
					let table = document.querySelector("#time_order");
					(document.querySelector('.popup .hengio_MH').parentNode.parentNode).style.display= 'block'
					let table_html = `<tr id='timer${id_time}'>
										<td data-label="Giờ Bán"><span class="timer_begin" style="user-select: none;">${gioban}</span></td>
										<td data-label="Giờ Ngừng"><span class="timer_end" style="user-select: none;">${giongung}</span></td>
										<td data-label="Action"><i class="far fa-trash-alt" item="del_timer"></i></td>
									</tr>`
					$(table).append(table_html);
					table.style.display = "block";

					/*----- func del timer ------- */
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
											<option value='0'>Chọn danh mục cho mặt hàng</option>`
											/*-------------- sort Alphabetically xắp sếp ----------- */
											const sortedList = danhmuc.sort((a, b) =>a.name_DM.localeCompare(b.name_DM));
											sortedList.forEach(function(element, index){
											const name = element.name_DM
											const id_DM = element.id_DM
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
											nguyenlieu.sort((a, b) =>a.name_NL.localeCompare(b.name_NL));
											// console.log(nguyenlieu);
											nguyenlieu.forEach(function(element, index){
												const name = element.name_NL
												const id_NL = element.id_NL
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
											Topping.sort((a, b) =>a.name_MH.localeCompare(b.name_MH));
											Topping.forEach(function(element, index){
												const name = element.name_MH
												const price = element.price_MH
												const id = element.id_MH
												html+= `<option value='${id}' id="${id}" DG='${price}'>${name}</option>`
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
				console.log(temp_order, MH.data[0])
				const element = MH.data[0];
				if(MH){
					document.querySelector('.popup-input.nameMH').value = element.name_MH
					document.querySelector('.popup-input.price_MH').value = element.price_MH
					element.price !== 'Tuỳ Chọn'? document.querySelector('.input-field.nhapgiaMH span').innerHTML = money(element.price_MH): null;
					document.querySelector('.input-field.nhapgiaMH span').style.display = 'block'
					document.querySelector('.popup-input.price_tuychon').checked = false
					
					// console.log((element.Danhmuc).includes('Đã Xoá'))
					element.Danhmuc.includes('Đã Xoá')? document.querySelector('.popup-input.danhmucMH').value = '0' : document.querySelector('.popup-input.danhmucMH').value = element.id_DM;
					document.querySelector('#blah').src = element.photo_MH
					document.querySelector('.popup-input.giatuychonMH').value = element.muctoithieu
					element.muctoithieu !== '0'? document.querySelector('.input-field.giatuychonMH span').innerHTML = money(element.muctoithieu): null;
					document.querySelector('.popup-input.max_toppingMH').value = element.chontoida
					// console.log(element.id_DM)
					// show nguyen lieu
					let array = element.NguyenLieu
					for (let index = 0; index < array.length; index++) {
						const element = array[index];
						const name_NL = element.name_NL
						const id = element.id_NL
						const SL_NL = element.soluong_NL;
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
					console.log(array)
					for (let index = 0; index < array.length; index++) {
						const element = array[index];
						const name_topping = element.name_Topping;
						const id_topping = element.id_Topping;
						// const id_topping = id
						const SL_Topping = element.soluong_Topping;
						const DG_Topping = element.Topping_DG;
						console.log(id_topping)
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
				let element_popup_title = row.children[1].innerHTML
	
			
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
						<input type="text" required spellcheck="false" class="popup-input invalid priceNL" onkeypress="validata_number_new(event);" onkeyup="validata_number_new(event);" onfocusout="validateValue_str(event);"> 
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
				color_list.color_list.forEach(function(element, index){
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
				dropbox_chonmau('Vui lòng chọn Nhóm');
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
				let show;
				list_MH.MH_of_nhom.length == 0 ? show="Chọn Mặt Hàng..." : show=""
				html+=`	<a class="close_popup" onclick='closePopup_gop_y()'>X</a>
						<p class="title_popup">Thêm/Xoá Mặt Hàng</p>
						<hr style="margin: 10px -30px 0rem -30px; border: 1px solid rgba(255, 255, 255, 0.2);outline: none !important;"><br>

						<div class="lang-menu" id='hidde' style= "width:100%;">
							<div class="selected-lang" style="padding: 10px 0; justify-content: space-between; width:100%;">
								<div class="contains" style="box-sizing: inherit; display: flex; flex-flow: wrap; border-right: 1px solid rgba(255,255,255,0.2); width:100%;">`
							for (let index = 0; index < list_MH.MH_of_nhom.length; index++) {
								const element = list_MH.MH_of_nhom[index];
								console.log(element)
								let name = element.name_MH
								let id = element.id_MH
								let id_nhomMH = element.id_nhom
								html+=`<div class='a${id}' id="${id_nhomMH}" style="display: inline-block;background: #A0522D;border-radius: 3px; margin: 5px 5px;padding:0 10px; flex-flow: wrap;">
										<span class="" style="margin-right: 10px;">${name}</span>
										<span style="cursor: pointer;z-index:100;" id='${id}' onclick="clear_el(this);">X</span>
									</div>`
							};

				html+=		`	<input type="text" class="search_MH" style="flex: 2; padding:0 10px;color: var(--white_text);font-size: 19px; background: transparent; border: none;" placeholder="${show}">
						</div>
						
						<span class='sBtn-close' >X</span>
						<i class="ti-angle-down" style="border: none; float:right;"></i>
					</div>
					<ul>`
				for (let index = 0; index < list_MH.list_MH.length; index++) {
					const element = list_MH.list_MH[index];
					// console.log(element)
					let id = element.id_MH
					let color = await get_color(color_list, element.color_DM)
					let id_Thaotac = element.id_Thaotac
					  
					if(Number(id_Thaotac)==1){
					/*-------- func không phải là Toppping thì show ---------- */
						if(element.id_DM != '3'){
							let name = element.name_MH
							let mau = color.color
							html+=`	<li class="option" id="${id}">
										<span class="mathang" style="background-color: ${mau};"></span>
										<a href="#" class="de option-text">${name}</a>
									</li>`
						}
					}
				};
	
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
								console.log(res.data)
								if(res.data){
									let id_nhomMH = id_nhom;
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
				color_list.color_list.forEach(function(element, index){
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
				dropbox_chonmau('Vui lòng chọn Nhóm');
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
					document.querySelector('.popup-input.nameMH').value = value.name_nhom
					document.querySelector('.popup-input.nameMH').classList.remove('invalid')
					document.querySelector('.popup-input.mota_nhomMH').value = value.mota_nhom
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
				const sortedList = nhom_MH.data.sort((a, b) => a.name_nhom.localeCompare(b.name_nhom));
				for (let index = 0; index < sortedList.length; index++) {
					const element = sortedList[index];
					const name = element.name_nhom;
					const id_color = await get_color(color_list,Number(element.color_nhom));
					console.log(id_color, name)

					const id_nhom = element.id_nhom;
					html+=`		<li class="option" id="${id_nhom}">
								<span class="mathang" style="background-color: ${id_color.color};"></span>
								<a href="#" class="de option-text">${name}</a>
							</li>`
				};
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
							let id = element.id_KM;
							let nameKM = element.name_KM;
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
				dropbox_chonmau('Vui lòng chọn Nhóm');
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
				const sortedList = nhom_MH.data.sort((a, b) => a.name_nhom.localeCompare(b.name_nhom));
				for (let index = 0; index < sortedList.length; index++) {
					const element = sortedList[index];
					
				
					const name = element.name_nhom;
					const id_color = await get_color(color_list,Number(element.color_nhom));
					console.log(id_color, name)

					const id_nhom = element.id_nhom;
					html+=`		<li class="option" id="${id_nhom}">
								<span class="mathang" style="background-color: ${id_color.color};"></span>
								<a href="#" class="de option-text">${name}</a>
							</li>`
				};

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
					let id = element.id_KM;
					let nameKM = element.name_KM;
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
				dropbox_chonmau('Vui lòng chọn Nhóm');
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
					console.log(id, value)
					const el_parent = document.querySelector('.popup')
					el_parent.querySelector('.nameKM').value = value.name_subKM
					el_parent.querySelector('.sBtn-text').innerText = value.name_nhom
					el_parent.querySelector('.sBtn-text').id = value.id_nhom
					el_parent.querySelector('.loaiKM').value = value.id_KM
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
					action: 'get_MaKM'
				}
				let res= await instance.post('/maKM', temp_order);
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
	let el = document.querySelectorAll('.popup .dropbox_old')
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
			if (item=="save_new_hv"){
				let name_HV= document.querySelector('#popup .popup-input.name_HV').value
				let pass_HV= document.querySelector('.popup-input.pass_HV').value

				let Ho_hv= document.querySelector('#popup .popup-input.Ho_hv').value
				let Ten_hv= document.querySelector('.popup-input.Ten_hv').value
				let date_birday= document.querySelector('#popup .popup-input.birth_date').value
				let tendem_hv= document.querySelector('.popup-input.tendem_hv').value
				let phone= document.querySelector('#popup .popup-input.phone').value
				let email= document.querySelector('.popup-input.email').value
				let address= document.querySelector('#popup .popup-input.address').value
				let city= document.querySelector('.popup-input.city').value
				let zipcode= document.querySelector('#popup .popup-input.zipcode').value
				let cccd= document.querySelector('.popup-input.cccd').value
				let date_create= document.querySelector('#popup .popup-input.date_create').value
				let chophep= document.querySelector('.popup-input.chophep').value
				
				temp_order= {
					name_HV: name_HV,
					pass_HV: pass_HV,
					Ho_hv: Ho_hv,
					Ten_hv: Ten_hv,
					date_birday: date_birday,
					tendem_hv: tendem_hv,
					phone: phone,
					email: email,
					address: address,
					city: city,
					zipcode: zipcode,
					cccd: cccd,
					date_create: date_create,
					chophep: chophep,
					action: 'new_hv',
				}
				let res= await instance.post('/hoivien', temp_order);
				if (res.data){
					var notification = notifier.notify(res.data.msg, `${res.data.content}`);
					notification.push();
				}
				console.log('hv', temp_order)
			}else if (item=="save_new_nhom_pc"){
				let name_nhom_pc= document.querySelector('#popup .popup-input.name_nhom_pc').value
				let mota_nhom_pc= document.querySelector('.popup-input.mota_nhom_pc').value
				let table_nhom_hv = document.querySelector('#table_nhom_hv')
				/*-------- func get value row table ------- */
				function getdata_table_nhom(table){
					var rows = table.rows,
					len = rows.length,
					data = [],
					cells;
					for (var n = 1; n < len; n++) {
						cells = rows[n].cells;
						let temp ={
							id: digital(rows[n].id),
							k: cells[0].innerText,
							v: digital(cells[1].querySelector('input').value),
						};
						data.push(temp)
					}
					return data;
				}
				table_nhom_hv = getdata_table_nhom(table_nhom_hv)

				temp_order={
					name_nhom_pc: name_nhom_pc,
					mota: mota_nhom_pc,
					action: 'new_nhom_pc'
				}
				let res = await instance.post('/hoivien', temp_order);
				if (res.data){
					var notification = notifier.notify(res.data.msg, `${res.data.content}`);
					//clear value
					document.querySelector('#popup .popup-input.name_nhom_pc').value = '';
					document.querySelector('.popup-input.mota_nhom_pc').value = '';
					//reload page
					
					let html =''
					temp_order= {action: 'get_nhom_pc'}
					res= await instance.post('/hoivien', temp_order);
					if (res.data){
						console.log(res.data)
						let value = res.data
						for (let index = 0; index < value.length; index++) {
							const element = value[index];
							let nhom_id_pc = element.nhom_pc_id
							let mota = element.mota
							let name_nhom_pc = element.name_nhom_pc
							
							html += `<tr class="" id='${nhom_id_pc}' style="${''}">`
							html += `<td data-label="Tên nhóm máy" class="nhom_hv" id='${''}' style="text-align: left; width: 100px;">${name_nhom_pc}</td>`
							html += `<td data-label="Mô tả" style="text-align: left;">${mota}</td>`
							html += '</tr>'

						}
						let list_nhom_pc = document.getElementById('list_nhom_pc');
						list_nhom_pc.innerHTML = '';
						list_nhom_pc.insertAdjacentHTML("afterbegin",html)
					}
					
				}
				console.log('nhompc', name_nhom_pc,mota_nhom_pc, table_nhom_hv)
			}
		break;
		case "DM_BIA":
			if (item=="HUY"){
				popup.classList.remove("open-popup");
				const textpopup = document.getElementsByClassName('popup-input')
				document.querySelector('.overlay').classList.remove('showoverlay');
				//================== func hủy đơn ===================//
				var e = element_row;
				// console.log(e.parentNode.parentNode.children[6].children[0].getAttribute('iddh'))
				const id_DH = e.parentNode.parentNode.children[6].children[0].getAttribute('iddh')
				const date_order = e.parentNode.parentNode.children[0].textContent
				const custom_order = e.parentNode.parentNode.children[1].textContent
				const mathang_order = e.parentNode.parentNode.children[2].querySelector('.nameMH').innerText
				const sl_order = e.parentNode.parentNode.children[5].textContent
				let contain_action = e.previousElementSibling.textContent
				// element_temp = e;
				var id_ca = localStorage.getItem("id_ca")
				let id_table;
				temp_order = {
					id: id_DH,
					id_ca: id_ca,
					date_thutien: new_date(),
					custom: custom_order,
					mathang: mathang_order,
					Huy_Don: '1',
					action: 'HUY',
					Thaotac: `${textpopup[0].value} (${contain_action})`,
					nv_order: user_login
				}
				// console.log(temp_order)
				const res = await instance.post('/cashier', temp_order);
				if(res){
					let Custom = res.data.custom[0]
					id_table = Custom.id_table_custom.split('_')[1]
					// console.log(Custom.Custom, id_table)
				}
				
				e.innerHTML = `${textpopup[0].value} (${contain_action})`
				e.style.background = 'None';
				e.style.border = 'none';
				e.style.color = 'red';
				e.disabled = true;
				e.style.width = '100%';
				e.style.textAlign = 'center';
				e.previousElementSibling.setAttribute('item','HUY')

				// hide button chap nhan hủy
				e.previousElementSibling.style.visibility = 'hidden'
				e.previousElementSibling.style.display = 'none'

				// show name thu ngan	
				let show_nvthungan = e.parentNode.children[3]
				show_nvthungan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> ${user_login}`
				show_nvthungan.style.visibility = 'visible';
				show_nvthungan.style.display = '';

				/*=== change thanh toan ==== */
				const rowcur = e.parentNode.parentNode.rowIndex;
				var row_firts_of_page = numPerPage*Math.floor(rowcur/numPerPage)
				const TT_cur = Number(e.parentNode.parentNode.children[4].innerHTML.replaceAll(/\D+/g, ''))* Number(sl_order)
				// const row_src = e.parentNode.parentNode.children[0].innerHTML + e.parentNode.parentNode.children[1].innerHTML
				// var countt = 0;
				console.log(TT_cur, rowcur, row_firts_of_page)
				for (var items of document.querySelectorAll('tr')) {
					console.log(items.id)
					if (id_table = items.id){
						items.querySelector('.TT_dichvu').innerHTML = money(Number(digital(items.querySelector('.TT_dichvu').innerText)) - Number(TT_cur))
					}
				}
				
			}else if(item=="CHAPNHAN"){
				const id_DH = e.parentNode.parentNode.children[6].children[0].getAttribute('iddh')
				const date_order = e.parentNode.parentNode.children[0].textContent
				const custom_order = e.parentNode.parentNode.children[1].textContent
				var id_table_custom = e.parentNode.parentNode.children[1].id
				const mathang_order = e.parentNode.parentNode.children[2].querySelector('.nameMH').innerText
				const sl_order = e.parentNode.parentNode.children[3].textContent
				const btn_Huy = e.nextElementSibling
				let show_nvthungan = e.parentNode.children[3]

				// ws.send("Send.");
				e.innerHTML = 'THU SAU';
				e.style.background = "orange";
				e.style.color = 'white';
				e.classList.add('disabledbutton');
				show_nvthungan.style.visibility = 'visible'
				show_nvthungan.style.display = ''
				show_nvthungan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> ${user_login}`
				
				//check trả tiền dich vu trước hay sau
				// console.log(role_order.Bia_thutiensau)
				// if(role_order.Bia_thutiensau =='checked'){
				// 	id_table_custom = id_table_custom.split('_')[0]
				// 	if(id_table_custom == 'tableBia'){
				// 		e.classList.add('disabledbutton');
				// 		// btn_Huy.classList.add('disabledbutton')
				// 		e.innerHTML = 'THU SAU'
				// 	}
				// }
				
				var id_ca = localStorage.getItem("id_ca")
				let temp_order = {
					id: id_DH,
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

			}else if(item=="save_new"){
				let name_table = document.querySelector('.popup-input.name_table').value
				let price_table = document.querySelector('.popup-input.price_table').value
				temp_order ={
					date_new: new_date(),
					name_table: name_table,
					price_table: price_table,
					mota: '',
					action: 'new_table'
				}
				let res = await instance.post('/Bi-a', temp_order);
				if (res.data){
					var notification = notifier.notify(res.data.msg, `${res.data.content}`);
					//clear value
					document.querySelector('.popup-input.name_table').value = '';
					document.querySelector('.popup-input.price_table').value = '';
					//reload page
					let temp = {action: 'getBia'}
					res = await instance.post('/Bi-a', temp);
					let value = res.data
					await render_rows(value, 'DM_BIA')
				}
			}else if(item=='PRINT'){
				let row_table = e.parentNode.parentNode.parentNode.parentNode;
				let id_table = row_table.id
				console.log('print', row_table, id_table)
			}else if(item=="save_edit"){
				if(element_row.id_table=='')return
				console.log(element_row)
			}
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
				const sl_order = e.parentNode.parentNode.children[4].textContent
				let contain_action = e.previousElementSibling.textContent
				// element_temp = e;
				var id_ca = localStorage.getItem("id_ca")

				let temp_order = {
					id: id,
					id_ca: id_ca,
					date_thutien: new_date(),
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
				const TT_cur = Number(e.parentNode.parentNode.children[3].innerHTML.replaceAll(/\D+/g, ''))* Number(sl_order)
				const row_src = e.parentNode.parentNode.children[0].innerHTML + e.parentNode.parentNode.children[1].innerHTML
				var countt = 0;
				for (var items of document.querySelectorAll('tr')) {
					const row_find = items.children[0].innerHTML + items.children[1].innerHTML
					if (row_src == row_find){
						var thanhtoan = items.children[7].innerHTML.replaceAll(/\D+/g, '')
						console.log(thanhtoan, TT_cur)
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
				var id_table_custom = e.parentNode.parentNode.children[1].id
				const mathang_order = e.parentNode.parentNode.children[2].querySelector('.nameMH').innerText
				const sl_order = e.parentNode.parentNode.children[3].textContent
				const btn_Huy = e.nextElementSibling

				// ws.send("Send.");
				e.innerHTML = 'THU TIỀN';
				e.style.background = "orange";
				e.style.color = 'white';

				//check trả tiền dich vu trước hay sau
				console.log(role_order.Bia_thutiensau)
				if(role_order.Bia_thutiensau =='checked'){
					id_table_custom = id_table_custom.split('_')[0]
					if(id_table_custom == 'tableBia'){
						e.classList.add('disabledbutton');
						// btn_Huy.classList.add('disabledbutton')
						e.innerHTML = 'THU SAU'
					}
				}
				
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
				const id_MH = digital(e.parentNode.parentNode.children[2].id)
				const sl_order = e.parentNode.parentNode.children[4].textContent
				console.log(id_table_custom)

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
				temp_order = {
					id: id,
					id_MH: id_MH,
					id_ca: id_ca,
					date_thutien: new_date(),
					date: date_order,
					custom: custom_order,
					mathang: mathang_order,
					sl_order: sl_order,
					Thaotac: 'HOÀN THÀNH',
					action: 'HOANTHANH',
					nv_order: user_login
				}
				console.log(temp_order)
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
		case "DM_TAODONHANG":
			if(item=='add_nv'){
				dathang('newdate')
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
				let parent_id = document.querySelector('.popup-input.DMcha').value
				// console.log(DMcha)
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
				// save popup
				if (mota_DM==''){mota_DM = 'Không mô tả'}				
				let temp_order = {
					id: '',
					name: ten_DM,
					color: color,
					mota: mota_DM,
					parent_id: parent_id,
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
				let nguyenlieu_MH = await getdata_table(table_nguyenlieu)//* get data form table return json dict */
				// console.log('nguyenliaaaeu', nguyenlieu_MH)
				if (nguyenlieu_MH===0){
					return;
				}

				let table_MHtopping = document.querySelector('#MHtopping')
				let Topping_MH = await getdata_table(table_MHtopping)
				if (Topping_MH===0){
					return;
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
						date_new: new_date(),
						ten_MH: ten_MH,
						user: user_login,
						price_MH: price_MH,
						price_tuychon: price_tuychon,
						danhmuc_MH: danhmuc_MH,
						id_DM: id_DM,
						photo: photo,
						nguyenlieu_MH: nguyenlieu_MH,
						Topping_MH: Topping_MH,
						muctoithieu: pricetuychonMH,
						chontoida: max_toppingMH,
						action: 'newMH',
						id_Thaotac: '1',
						mota_Thaotac: 'Tạo mới'
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
					ten_MH: ten_MH,
					user: user_login,
					action: 'del_MH',
					id_Thaotac: '0',
					mota_Thaotac: 'Xoá'
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
				let nguyenlieu_MH = await getdata_table(table_nguyenlieu)//* get data form table return json dict */
				if (nguyenlieu_MH===0){
					// console.log('nguyenlieu', nguyenlieu_MH)
					return;
				}

				let table_MHtopping = document.querySelector('#MHtopping')
				let Topping_MH = await getdata_table(table_MHtopping)
				if (Topping_MH===0){
					return;
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
					user: user_login,
					price_MH: price_MH,
					price_tuychon: price_tuychon,
					danhmuc_MH: danhmuc_MH,
					id_DM: id_DM,
					photo: photo,
					nguyenlieu_MH: nguyenlieu_MH,
					Topping_MH: Topping_MH,
					muctoithieu: pricetuychonMH,
					chontoida: max_toppingMH,
					action: 'update_MH',
					id_Thaotac: '2',
					mota_Thaotac: 'Chỉnh sửa'
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
					date_new: new_date(),
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
					const id = element.id_NL
					const tenNL = element.name_NL
					const mota = element.mota_NL
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
				// console.log(temp_order)
				const res = await instance.post('/inventory', temp_order);
				if (res.data){
					var notification = notifier.notify(res.data.msg, `${res.data.content}`);
					notification.push();
					if(res.data.msg == 'success'){
						/*------- show ra table ------ */
						row.children[4].innerHTML = total
						// row.children[2].innerHTML = note
					}
				}
	
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
					date_new: new_date(),
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
				// console.log(id_loaiKM)
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
				// console.log(temp_order)
				let res= await instance.post('/khuyenmai', temp_order);
				if (res.data){
					var notification = notifier.notify(res.data.msg, `${res.data.content}`);
					notification.push();
					call_popup('DM_KHUYENMAI','create')

					temp_order = {action: 'get_KM'}
					let KhuyenMai = await instance.post('/khuyenmai', temp_order);
					/*-------------- sort Alphabetically xắp sếp ----------- */
					const sortedList = KhuyenMai.data.reverse()
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
					id_subKM: id_KM,
					maKM: maKM,
					solansudung: solansudung,
					solantkdung: solantkdung,
					action: 'newMagiam',
				}
				let res= await instance.post('/maKM', temp_order);
				if (res.data){
					var notification = notifier.notify(res.data.msg, `${res.data.content}`);
					notification.push();
					call_popup(title, 'create');

					temp_order = {
						id_KM: id_KM,
						action: 'get_MaKM'
					}
					let magiam = await instance.post('/maKM', temp_order);
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
					action: 'update_MaKM',
				}
				let res= await instance.post('/maKM', temp_order);
				if (res.data){
					var notification = notifier.notify(res.data.msg, `${res.data.content}`);
					notification.push();
					temp_order = {
						id_KM: id_KM,
						action: 'get_MaKM'
					}
					let magiam = await instance.post('/maKM', temp_order);
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
async function confirm_box(value,question, callback, confrmdiv_title){
	$(".backdrop").fadeTo(200, 1);//show backdrop
	if(confrmdiv_title)
		document.querySelector('#id_confrmdiv .confrmdiv_title').innerHTML = confrmdiv_title;
		document.querySelector('#id_confrmdiv .shownoidung_popup .question').innerHTML = question;
		document.querySelector('#id_confrmdiv .shownoidung_popup p').innerHTML = value
		document.getElementById('id_confrmdiv').style.display="block"; //this is the replace of this line
		document.getElementById('id_truebtn').onclick = function(){
		$(".backdrop").fadeOut(200);
		return callback(true);
	};
	document.getElementById('id_falsebtn').onclick = function(){
		$(".backdrop").fadeOut(200);//hide backdrop
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
	// console.log(dict)
	var order_name = dict.name_MH;
    var itemsame = false
	/* làm phần check số lượng (chưa làm)  */
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
	if(dict.price_MH == "Tuỳ Chọn"){
		// console.log('1111')
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
	

	/*-------- check đã có mặt hàng chưa -------------- */
    var order_card = document.querySelectorAll('.order-card')
    for (const element of order_card) {
        var name = element.querySelector('.order-name').textContent
        let order_topping = element.querySelector('.order-topping')
		// console.log(name, order_name, dict)
		
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
					console.log(dict.Tonkho)
					//không đủ hàng
					var timechat = convert_dateToVN(new_date())
					const thongbao = document.getElementsByClassName("poup_thongbao");
					thongbao[0].innerHTML = "[Hệ Thống] Không đủ hàng <b style='color: #00b627; font-size: 1.5rem;'>" + order_name + ' </b>! <p style="color: var(--black2)">' + timechat + '</p>'
					const success = loadingpoup()
				}
			}
            itemsame = true
            return;
        }
    };
	
	if (!itemsame)
		add_giohang(selectObject, dict);
	// console.log(dict)
}
function order_updateTopping(selectObject, dict){
    var itemsame = false
    var name_order = dict.name_MH

    for (var i = 0; i < dict.Topping.length; i++){
        name_order += dict.Topping[i].name_Topping
        name_order += dict.Topping[i].Topping_SL
        name_order += dict.Topping[i].Topping_DG
    };
    for (var i = 0; i < list_giohang.length; i++){
        var name_MH_giohang = list_giohang[i].name_MH
        var Topping = list_giohang[i].Topping
        for (var j = 0; j < Topping.length; j++){
            name_MH_giohang += Topping[j].name_Topping
            name_MH_giohang += Topping[j].Topping_SL
            name_MH_giohang += Topping[j].Topping_DG
            if (name_MH_giohang == name_order){
                var order_card = document.querySelectorAll('.order-card')
				console.log(order_card)
                var soluong = order_card[i].querySelector('.order-soluong')
				// if(dict.Tonkho !== "-"){
					if (Number(dict.Tonkho) > Number(soluong.innerText)){
						soluong.innerHTML = Number(soluong.innerText) + 1;
						list_giohang[i].sl = soluong.innerHTML
					}else{
						console.log(dict.Tonkho)
						//không đủ hàng
						var timechat = convert_dateToVN(new_date())
						const thongbao = document.getElementsByClassName("poup_thongbao");
						thongbao[0].innerHTML = "[Hệ Thống] Không đủ hàng <b style='color: #00b627; font-size: 1.5rem;'>" + name_order + ' </b>thành công! <p style="color: var(--black2)">' + timechat + '</p>'
						
						const success = loadingpoup()
					}
				itemsame = true
				return;
            }
        }
    };

	if (!itemsame)
		add_giohang(selectObject, dict);
		// console.log(dict)
}
function add_giohang(selectObject, dict) {
	
	const dashboard_thongbao = document.getElementsByClassName('dashboard-thongbao');
	const dashboard_order = document.getElementsByClassName('dashboard-order');
    dashboard_thongbao[0].style.visibility = 'hidden';
    dashboard_order[0].style.visibility = 'visible';

	const SL_mathang = document.querySelectorAll('.order-card .order-soluong')
	var PhotoChildNode = selectObject.querySelector('.card-image');
	var order_photo = PhotoChildNode.src
	var order_name = dict.name_MH;
	var order_price = money(dict.price_MH)
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
			+ ${Topping_MH[i].name_Topping}
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
			// let name_MH = detail.parentNode.querySelector('.order-name')
			// if (name_MH){
				for (var i=0;i<list_giohang.length;i++) {
					if (id_MH.trim() == list_giohang[i].id_giohang){
						list_giohang[i].sl = element.innerHTML
						func_total()
						// console.table(list_giohang)
						break;
					}
				};
			// }
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
			let id_MH = detail.parentNode.parentNode.id
			// let name_MH = detail.parentNode.querySelector('.order-name')
			// if (name_MH){
				for (var i=0;i<list_giohang.length;i++) {
					if (id_MH.trim() == list_giohang[i].id_giohang){
						list_giohang[i].Ghichu = element.value
						element.setAttribute('value',element.value);
						console.log(list_giohang)
						break;
					}
				};
			// }
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
	// console.log(tonkho)
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
    // console.log(list_giohang)
    if (order_card.length >= 0 ){
        var Total_price = 0
        for (var i = 0; i < list_giohang.length; i++){
            var Total_topping =0
            let Topping = list_giohang[i].Topping
            let price_MH = list_giohang[i].price_MH
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
	let id_ca = localStorage.getItem("id_ca")
	if (value=='name_KH'){
		console.log(value)
		call_popup('DM_TAODONHANG',"add_vitri")
		return;
	}
	// loc list_giohang trước khi gửi lên server tiet kiem bang thong
	for (let index = 0; index < list_giohang.length; index++) {
		list_giohang[index]['id_ca']= id_ca;
		list_giohang[index]['LoaiTT']= 'Tiền mặt';
		delete list_giohang[index]['Danhmuc'];
		delete list_giohang[index]['Khuyenmai'];
		delete list_giohang[index]['OpenHengio'];
		delete list_giohang[index]['Tonkho'];
		delete list_giohang[index]['chontoida'];
		delete list_giohang[index]['id_DM'];
		delete list_giohang[index]['id_giohang'];
		delete list_giohang[index]['lock'];
		delete list_giohang[index]['moban'];
		delete list_giohang[index]['muctoithieu'];
		delete list_giohang[index]['name_MH'];
		delete list_giohang[index]['photo'];
		delete list_giohang[index]['photo_MH'];
		delete list_giohang[index]['price_MH'];
		delete list_giohang[index]['timer'];
		delete list_giohang[index]['NguyenLieu'];
		delete list_giohang[index]['KhuyenMai'];
		delete list_giohang[index]['Thaotac'];
		delete list_giohang[index]['action'];
		let TP = list_giohang[index]['Topping']
		for (let i = 0; i < TP.length; i++) {
			delete TP[i]['NguyenLieu_Topping'];
			delete TP[i]['Tonkho'];
			delete TP[i]['Topping_DG'];
			delete TP[i]['soluong_Topping'];
			delete TP[i]['name_Topping'];
		}
	}
	// console.log(list_giohang)
    // call order to server
    let temp_order = {
        action: 'dathang',
        data: list_giohang
    }
    const res = await instance.post('/dathang', temp_order);
    // console.log(res.data, list_giohang)

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
	// switch_tab('Đơn Hàng')
	back_page()
}
/*----------------------------- func event btn Măt Hàng ------------------------- */
function func_enventMH() {
	/*--------- func show value on popup -------- */
	id = document.querySelector('.title_popup').id//id_MH
	let table_MHnguyenlieu = document.querySelector("#MHnguyenlieu");
	let Mh_nguyenlieu = document.querySelector('.popup-input.MHnguyenlieu')
	let table_MHtopping = document.getElementById("MHtopping");
	let Mh_topping = document.querySelector('.popup-input.MHtopping')

	/*---------- func choose dropbox nguyen lieu show table ----------- */
	Mh_nguyenlieu.addEventListener("change", async () => {
		let Mh_nguyenlieu_Frist = Mh_nguyenlieu.options[Mh_nguyenlieu.selectedIndex].text;
		if(Mh_nguyenlieu.value != Mh_nguyenlieu_Frist){//"Thêm nguyên liệu cho mặt hàng")
			var id = Mh_nguyenlieu.options[Mh_nguyenlieu.selectedIndex].id
			//hide option of select
			Mh_nguyenlieu[Mh_nguyenlieu.selectedIndex].setAttribute('hidden','true');
			var table_html = `<tr id="${id}">
							<td data-label="Nguyên Liệu"><span class="MHnguyenlieu" style="user-select: none;">${Mh_nguyenlieu_Frist}</span></td>
							<td data-label="Số lượng" style="width: 100%;"><input type="text" min="1" value="1" style="border: none; width: 100%;text-align: center; border-color: grey;" id="number-input" onkeyup="validateValue_str(event)" onfocusout="validateValue_str(event);" /></td>
							<td data-label="Thao Tác" style="text-align: right;"><i class="far fa-trash-alt"></i></td>
						</tr>`
			$(table_MHnguyenlieu).append(table_html);
			table_MHnguyenlieu.style.display = "block";

			let btn_del_NL = document.querySelector(`tr#${id}`)
			btn_del_NL.querySelector('i').addEventListener('click', async function (evt) {
				// name_option = this.parentNode.parentNode.childNodes[1].innerText
				//show option of select
				Mh_nguyenlieu[$(`.popup-input.MHnguyenlieu>option[value='${digital(id)}']`).index()].removeAttribute("hidden");
				delrowtable_now(this);
			});

			let nguyenlieu_MH = await getdata_table(table_MHnguyenlieu)
			console.log('nguyenliaaaeu', nguyenlieu_MH)
			
		}
		Mh_nguyenlieu.value = '0'
	})
	
	/*---------- func choose dropbox nguyen lieu show table ----------- */
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
			Mh_nguyenlieu.querySelectorAll('option').forEach(element => {
				element.removeAttribute('hidden');
			});

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
	/*--------- func show value on popup -------- */
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
		if (choose_topping.value =='3'){
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
			nhap_price.style.display = 'block';
			nhap_price.querySelector('.price_MH').classList.add('invalid')
			$("#MHtopping tbody tr").remove();
			document.querySelector("#MHtopping").style.display = 'none'
			Mh_topping.querySelectorAll('option').forEach(element => {
				element.removeAttribute('hidden');
			});
		}else{
			Mh_topping.disabled = false;
			Mh_topping.style.color = 'white';
			// price_toithieu.style.display = 'none';
			// note_toithieu.style.display = 'none';
			max_topping.disabled= false;
			max_topping.style.color = 'white';
			toida.style.color = 'white';
			price_tuychon.disabled = false;
			
		}

	});

	/*-------------------- func chon danh muc --------------*/
	// let danhmuc_MH = document.querySelector('.popup-input.danhmucMH')
	// danhmuc_MH.addEventListener("change", () => {
	// 	document.querySelector('.popup-input.danhmucMH').style.borderColor= 'var(--blue)'
	// 	// console.log(danhmuc_MH.value)
	// });

}

/*=================== func dung nhận đơn kết thúc ca ===================*/ 
async function nhan_don(){
	var nhandon = document.querySelector('.thietlapca .nhan_don')
	var ketca = document.getElementById('ket_ca')
	const nhan_don = document.querySelector('.Nhan_don')
	var checked = 'checked';
	if(nhandon.innerHTML=='Nhận Đơn'){
		nhandon.innerHTML= 'Dừng Nhận Đơn'
		nhandon.style.color='red'
		ketca.disabled = true;
		ketca.style.opacity = '0.2'
		nhan_don.innerHTML = 'Đang Nhận Đơn'
		nhan_don.style.color='green'
		checked = 'checked'
	}else{
		nhandon.innerHTML= 'Nhận Đơn'
		nhandon.style.color='green'
		ketca.disabled = false;
		ketca.style.opacity = '1'
		nhan_don.innerHTML = "Dừng Nhận Đơn"
		nhan_don.style.color='red'
		checked = 'unchecked'
	}
	
	temp_order={checked: checked, action: 'Nhandon'}
	await instance.post('/tuychinh', temp_order);
				 
}
async function ket_ca(){
	var nhandon = document.querySelector('.thietlapca .nhan_don')
	var thongtin_ca = document.querySelector('.thongtin_ca')
	var show_ketthuc_ca = thongtin_ca.querySelector('.ketthuc_ca')
	var ket_ca = thongtin_ca.querySelector('.ket_ca')
	var nhan_ca = thongtin_ca.querySelector('.nhan_ca')
	var ketca_btn = document.getElementById('ket_ca')
	var table = document.querySelector('.table_responsive.DH #table_order')
	let btn_donhang  = document.querySelector('.thietlapca .newDH');
	var id_ca = ketca_btn.getAttribute('ketca')

	let Bia_thutiensau = role_order.Bia_thutiensau;
	if(ketca_btn.innerHTML=='Kết Thúc Ca'){
		//check đơn hàng trước hoàn thành hết chưa
		temp_order = {action:'check_DH', Bia_thutiensau: Bia_thutiensau}
		let res = await instance.post('/dathang', temp_order);
		let listMH = res.data
		let noidung_thongbao ='';
		
		if (listMH.length > 0){
			for (let index = 0; index < listMH.length; index++) {
				const element = listMH[index];
				let name_DH = element.name_MH
				let date_DH = element.date_new
				// console.log(date_DH, name_DH)
				noidung_thongbao += `<p> ${date_DH} <b style="color: yellow;">${name_DH}</b></p>`
			}
			let question = 'Vui lòng xử lý đơn hàng trước khi kết ca !'
			// hàm callback hay ah nha
			let conf = confirm_box(noidung_thongbao, question, async function (arg) {
				console.log(arg)
				if(arg){
					
				}else{
					clickFlag = 1;
					/*------------------ close popup ---------------------------- */
					document.querySelector('.overlay').classList.remove('showoverlay');
					document.querySelector('.containerpopup .popup').classList.remove('open-popup');
				}
			});
			return
		}

		// unchecked chuyen sang bat dau ca
		btn_donhang.classList.add('disabledbutton')

		show_ketthuc_ca.style.display = ''
		ket_ca.innerHTML = `<b style="color: green;font-size: 18px;">NV_Thiên Thần</b> - ${convert_dateToVN(new_date())} `
		ketca_btn.innerHTML= 'Bắt Đầu Ca'
		nhandon.style.opacity = '0.2'
		nhandon.disabled = true;
		
		let temp = {
			id_ca: id_ca,
			Bia_thutiensau: Bia_thutiensau,
			NV_ketca: user_login,
			date_end: new_date(),
			action: 'KETCA'
		}
		const dropbox = await instance.post('/cashier', temp);
		

	}else{
		// checked  chuyển sang kết ca
		btn_donhang.classList.remove('disabledbutton')
		// if (table){
		// 	var lastRowIndex = table.rows.length-1;
		// 	/*--------- remove row table ---------- */
		// 	const rows = table.rows;
		// 	for (let i = rows.length - 1; i > 0; i--) {

		// 		rows[i].remove();
		// 	}
		// }
		show_ketthuc_ca.style.display = 'none'
		nhan_ca.innerHTML =`<b style="color: green;font-size: 18px;">NV_Thiên Thần</b> - ${convert_dateToVN(new_date())} `
		ketca_btn.innerHTML= 'Kết Thúc Ca'
		nhandon.style.opacity = '1'
		nhandon.disabled = false;

		// nhận đơn luôn
		const nhan_don = document.querySelector('.Nhan_don')
		nhandon.innerHTML= 'Dừng Nhận Đơn'
		nhandon.style.color='red'
		ketca_btn.disabled = true;
		ketca_btn.style.opacity = '0.2'
		nhan_don.innerHTML = 'Đang Nhận Đơn'
		nhan_don.style.color='green'
		// checked = 'checked'

		let temp = {
			nameNV: user_login,
			//checked: checked,//nhận đơn luôn tuỳ chọn database
			Bia_thutiensau: Bia_thutiensau,
			date_begin: new_date(),
			action: 'BATDAUCA'
		}
		let res = await instance.post('/cashier', temp);
		// if (res){
		// 	let id_ca = res.data.id_ca
		// 	localStorage.setItem('id_ca', id_ca)
		// 	ketca_btn.setAttribute('ketca', id_ca)
		// }

		// /*---------- func show table list_order -------------- */
		// temp ={title: 'Search_all', val_search: ''}
		// await createPagination(totalPages, page_table, temp)
		location.reload();
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
        }, 10)
 })
}


/*----------------------------------------------func phân trang TABLE ----------------------------------------------------- */
var tabel_lenght = 0
var list_table = null
var page_table = 1
var pagesize = 20;
let totalPages = 0;
var elements;
async function phantrang(BC, new_list, exports){
	//------------------ phân trang ------------------------//
	$(function() {
		(function(name) {
		var container = $('#pagination-' + name);
		//   if (!container.length) return;
		var options = {
			dataSource: new_list,
			pageSize: 5,
			className: 'paginationjs-big',
			callback: function (response, pagination) {
				// window.console && console.log(response, pagination);
				// render_rows(response, 'History_BIA')
				show_search(BC, response, exports, pagination);
			}
		};	  
		//$.pagination(container, options);	  
		container.addHook('beforeInit', function () {
			// window.console && console.log('beforeInit...');			
		});
		container.pagination(options);	  
		container.addHook('beforePageOnClick', function () {
			// window.console && console.log('beforePageOnClick...');			
			//return false
		});
		})('demo1');
	});
}
async function createPagination(totalPages, page_table, dict){
	// console.log(dict)
	if (typeof dict == 'string'){
		dict = dict.replaceAll('=','"');
        dict = JSON.parse(dict)
		console.log(typeof dict)
	}
	let list_table_temp='';
	let title_search = dict.title;
	let val_search = dict.val_search;
	var dict_search = (JSON.stringify(dict)).replaceAll('"', '=')
	// console.log(dict)
	async function try_switch(title_search) {
		let temp, res;
		switch (title_search) {
			case 'Search_all':
				temp = {
					page: page_table-1,
					pagesize: pagesize,
					action: 'get-DH'}
				res = await instance.post('/dathang', temp);
				totalPages = res.data.TotalRow
				totalPages = Math.ceil(Number(totalPages) / Number(pagesize));
				list_table_temp = res.data.listtable
				console.log(res.data)
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
	}

	await try_switch(title_search)
	if (title_search.includes('Search') == true){
		await render_rows(list_table_temp, 'DM_DONHANG')
	}
	
	// console.log(totalPages)
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
				if (cellToExtend.children[7].innerHTML) TotalTT+= Number(cellToExtend.children[7].innerText.replace(/\D+/g, ''))
			}else{TotalTT-=0}

			const text_src = cellToExtend.children[0].textContent + cellToExtend.children[1].textContent
			var row_pre= cellToExtend.nextElementSibling;
			try {var text_pre = row_pre.children[0].textContent + row_pre.children[1].textContent} catch (error) {};	
			if(rowspan == 0){
				temp = rows[i];
				id = temp.id
			}
			if(cellToExtend.children[5].children[0].getAttribute('item')=='THUTIEN')count=1

			rowspan = 1;
			show_print = 1;
			cellToExtend.setAttribute(`print${id}`, rowspan);
			cellToExtend.children[5].children[0].id = 'print'+id;
			while (row_pre != null && typeof row_pre.children[5].children[1] != 'undefined' && text_src == text_pre) {
				rowspan+=1
				if (row_pre.children[5].children[1].textContent=='HỦY' && row_pre.children[7]){
					TotalTT+=Number(row_pre.children[7].innerText.replace(/\D+/g, ''))
				}else{TotalTT-=0}

				if(row_pre.children[5].children[0].getAttribute('item')=='THUTIEN')
					count=1
				const columns= [0,1,6,7]
				for(let j=0; j < columns.length; j++){
					row_pre.children[columns[j]].classList.add("rowspan-remove");
				}
				// show_print++
				/*--------------- add id print show --------------------- */
				let btn_chapnhan = row_pre.children[5].children[0]
				btn_chapnhan.getAttribute('item')=='HOANTHANH'? null : show_print++;
				row_pre.children[5].children[0].id = 'print'+id;
				cellToExtend.children[5].children[0].id = 'print'+id;
				cellToExtend.children[6].children[0].id = 'print'+id+'show';
				cellToExtend.setAttribute(`print${id}`, show_print);
				
				row_pre = row_pre.nextElementSibling
				try {text_pre = row_pre.children[0].textContent + row_pre.children[1].textContent} catch (error) {break;}
			};
			const columns= [0,1,6,7]
			for(let j=0; j < columns.length; j++){
				cellToExtend.children[columns[j]].setAttribute("rowspan", rowspan);
			};
			
			cellToExtend.children[7].innerHTML = money(TotalTT)
			if (TotalTT == 0){
				cellToExtend.children[6].children[0].style.display = ''
				cellToExtend.children[6].children[0].style.visibility = 'hidden'				
			}else{
				if (count>0){
					cellToExtend.children[6].children[0].style.display = ''
					cellToExtend.children[6].children[0].style.visibility = 'visible'
				}
			}
			TotalTT = 0
			row+=rowspan;
			rowspan = 0
			show_print=0;
			count =0;
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
	//check out-size table tr
	let table = document.querySelector('table')
	try {
		if (!table.contains(event.target)) $('tr').removeClass('active');
	} catch (error) {}
	

})
//click phải event
// document.addEventListener('contextmenu', function(event) {
// 	console.log('click phải')
// 	//check out-size table tr
// 	let table = document.querySelector('table')
// 	if (!table.contains(event.target)) {
// 		$('tr').removeClass('active');
// 	}
// 	if (!specifiedElement.contains(event.target)) {
// 		document.querySelector('.overlay').classList.remove('showoverlay');
// 		document.querySelector('.containerpopup .popup').classList.remove('open-popup');
// 	}
// 	event.preventDefault();
// }, false);

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
///key down
function validata_price(event) {
	//test input tien te
	var elem = event.target;
	setTimeout(() => {
		let v = digital(elem.value)
		let n = new Intl.NumberFormat('vi-VN').format(v);
		$(elem).val(n)
	})
}

/*---- FUNC DROPBOX chọn màu ------ */
// if check then add class check in querySelector(".selected-lang")
function dropbox_chonmau(title){
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
			sBtn_text.innerText = title;
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

async function dropbox_trangthai(){
	var optionMenus = document.querySelectorAll(".lang-menu")
	optionMenus.forEach( optionMenu => {
		if (optionMenu){
			var selectBtn = optionMenu.querySelector(".selected-lang"),
			options = optionMenu.querySelectorAll(".option"),
			sBtn_text = optionMenu.querySelector(".sBtn-text"),
			// send_color = optionMenu.querySelector(".mathang"),
			sBtn_close = optionMenu.querySelector(".sBtn-close")
			let default_name =''
			if(sBtn_text)
				default_name = sBtn_text.innerText;
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
				console.log(sBtn_text)
				sBtn_close.classList.remove("active")
				optionMenu.querySelector('.ti-check').style.display='none'
				const check = optionMenu.querySelector('.check')
				if (check){
					selectBtn.classList.add('invalid')
					selectBtn.classList.remove('valid')
				}
				//event dropbox search
				if(sBtn_text.getAttribute('item') !=='table_bia'){
					try {
						temp_order ={title: 'Search_all', val_search: ''}
						await createPagination(totalPages, page_table, temp_order)
					} catch (error) {}
				}
			});     
			/*------------- event choice -------- */
			options.forEach(option =>{
				option.addEventListener("click", async ()=>{
					let selectedOption = option.innerText;
					// console.log(selectedOption)
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
					// console.log(optionMenu.id, selectedOption)
					if(sBtn_text.getAttribute('item') !=='table_bia'){
						try {
							//event dropbox search
							temp_order ={title: optionMenu.id, val_search: option.id}
							await createPagination(totalPages, page_table, temp_order)
						} catch (error) {}
					}
				});
			});
	
			selectBtn.addEventListener("click", () => {
				optionMenu.classList.toggle("active")
			});
		}
	});

}

/*-------- func get value row table ------- */
function getdata_table(table){
	var rows = table.rows,
	len = rows.length,
	data = [],
	cells;
	for (var n = 1; n < len; n++) {
		cells = rows[n].cells;
		// console.log(rows[n].id, 'safdsf')
		// console.log('dddd')
		let temp ={
			id: digital(rows[n].id),
			k: cells[0].firstElementChild.innerText,
			v: cells[1].firstElementChild.value,
			DG: cells[2].firstElementChild.value
		};
		data.push(temp)
	}
	// console.log(data)
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
async function get_color(color_list, id, id_DM_color) {
	let color={}
	//danh cho id_DM
	if(id_DM_color){
		color_list = color_list.DM_color
		for (let index = 0; index < color_list.length; index++) {
			const element = color_list[index];
			if (`${id}` === `${element.id_DM}`){
				color = {
					name: element.name,
					color: element.color
				}
				break;
			}		
		};
	// danh cho id_color
	}else{
		color_list = color_list.color_list
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
		id_MH: digital(el.parentNode.className),
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


//*--------------- css menu context ----------- */



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
const btn_a = document.querySelectorAll('#sidebar .side-menu a');

btn_a.forEach(element => {
	if (tab == element.innerText)element.classList.toggle('active');
	element.addEventListener('click', function (e) {
		e.preventDefault();
		btn_a.forEach(element => {
			let show= element.nextElementSibling
			if(show){
				show.classList.remove('show')
				show.querySelectorAll('li a').forEach(el => {
					el.style.color = 'var(--white_text)'
					el.style.fontWeight = '400'
				});
			} 
			element.classList.remove('active');
		});
		// check xem no co phai la sub dm
		let dropdown = this.parentElement.parentElement
		console.log(dropdown)
		if(dropdown.classList.contains('side-dropdown')){
			dropdown.previousElementSibling.classList.add('active');
			dropdown.classList.add('show')
			this.style.color = "white"
			this.style.fontWeight = '600'
		}else{
			this.classList.add('active');
			let show= this.nextElementSibling
			if(show) show.classList.add('show')
		}
	})
});

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


 