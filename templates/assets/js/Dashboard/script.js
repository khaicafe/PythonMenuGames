////////////////////////////// khai báo biến //////////////////////////////////////////////////////////////
const url = 'https://script.google.com/macros/s/AKfycbyvhJU56RfOvbePo45F6aQQrF-ECdTkUY-K-ewmeBYPq9_6o6i8tLTDpv0IzipMCvptwQ/exec'
var avata = window.localStorage.getItem('avata-user');
var username = window.localStorage.getItem('username');
var imageUrl;
var logodefault;
var logourl = 'https://drive.google.com/file/d/13anTEeBrYPlPTXMcRqopnm1EyFNBTyHZ/view?usp=sharing'

// chuyển định dạng số
Number.prototype.format = function(n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};
// hàm add thêm hours new Date()
Date.prototype.addHours= function(h){
	this.setHours(this.getHours()+h);
	return this;
}
// hàm random key
function makeid(length) {
	var result = "";
	var characters = '0123456789';
	for (var i = 0; i < length; i++) {
	  result += characters[Math.floor(Math.random() * characters.length)];
	}
	result = result.match(/\d{1,4}/g).join("-");
	return result;
  }

//////////////// Xử lý Token //////////////////////////

axios.defaults.params = {};
// xu ly data truoc khi gui len server
axios.interceptors.request.use( async config => {              
//   console.log('truoc khi request!!!')
  if (config.url.indexOf('SendChart') < 0 && config.url.indexOf('chatbox') < 0 && config.url.indexOf('Getlogo') < 0){
	// nhung router khong can show loading
	document.getElementById("popuploadingmain").style.visibility="visible";  
	}
//   document.getElementById("popuploadingmain").style.visibility="visible";  
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
//   console.log('sau khi response!!!')
  const config = response.config;
//   document.getElementById("popuploadingmain").style.visibility="hidden";
  if (config.url.indexOf('Login') >=0 || config.url.indexOf('refeshtoken') >=0){
      // nhung router khong can check token
      return response;
  }
  const code = response.data.status;
  if (code && code === 'The token has expired'){
      
      console.log('token hết hạn')
      const New_accessToken = response.data.token.accessToken
    //   console.log('lay lai Token mới', New_accessToken)
      axios.setLocalAccessToken(New_accessToken)

      return response
  }else if (code && code === 'Invalid Signature'){
    // Truong hop loi token clear token lỗi
    console.log('Token Error')
    // window.localStorage.clear();
    return Promise.reject(code)
  }
  console.log('token còn hạn')
  return response;
}, err => {
  return Promise.reject(err)
})


////////////////////////// FUNCTION axios///////////////////////////////////

axios.setLocalAccessToken = async (token) => {
    window.localStorage.setItem('accessToken', token)
	}
axios.getLocalAccessToken = async (token) => {
    const accessToken = window.localStorage.getItem('accessToken')
    return accessToken
	}

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

async function getuser(){
	var search_params = new URLSearchParams(); 
	// append parameters
	search_params.append('event_key', 'Get_userinfo');
	// query string
	var data = search_params.toString();
	document.getElementById("popuploadingmain").style.visibility="hidden";
	return await axios.get(url + '?'+data)
	}
async function getinfo_sendchart(){
	var search_params = new URLSearchParams(); 
	// append parameters
	search_params.append('event_key', 'SendChart');
	// query string
	var data = search_params.toString();
	// document.getElementById("popuploadingmain").style.visibility="hidden";
	return await axios.get(url + '?'+data)
	}
async function getinfo_phongmay(){
	var search_params = new URLSearchParams(); 
	// append parameters
	search_params.append('event_key', 'info_phongmay');
	// query string
	var data = search_params.toString();
	
	return await axios.get(url + '?'+data)
	}
async function getlist_idcgame(){
	var search_params = new URLSearchParams(); 
	// append parameters
	search_params.append('event_key', 'getlist_idcgame');
	// query string
	var data = search_params.toString();
	
	return await axios.get(url + '?'+data)
	}
async function getlist_market_game(){
	var search_params = new URLSearchParams(); 
	// append parameters
	search_params.append('event_key', 'getlist_market_game');
	// query string
	var data = search_params.toString();
	
	return await axios.get(url + '?'+data)
	}
async function getHardware_listPM_userid(Key){
	var search_params = new URLSearchParams(); 
	// append parameters
	search_params.append('event_key', 'listPM_userid');
	search_params.append('keyPC', Key);
	// query string
	var data = search_params.toString();
	
	return await axios.get(url + '?'+data)
	}
async function getlogo(){
	var search_params = new URLSearchParams(); 
	// append parameters
	search_params.append('event_key', 'Getlogo');
	// query string
	var data = search_params.toString();
	
	return await axios.get(url + '?'+data)
	}

var Date_Create = new Date().toLocaleString("vi-VN", {timeZone: "Asia/Ho_Chi_Minh"});
console.log(String(Date_Create));
// var date = new Date(Date_Create);
// console.log(date)
// Date_Create.setMonth(Date_Create.getMonth() + 1);
// console.log(Date_Create.toLocaleString())


async function Create_phongmay() {
	console.log('Create_phongmay....');
	var LogoPM = logourl;
	if (imageUrl){
		LogoPM = imageUrl
	}
	var keypm = makeid(16);
	// var Date_Create = new Date();
	var Date_Create = new Date().toLocaleString("vi-VN", {timeZone: "Asia/Ho_Chi_Minh"});

	const Tenphongmay = $("#Tenphongmay_create").val()
	const Diachi = $("#Diachi_create").val()
	const Soluongmay = $("#Soluongmay").val()
	const phanmem = $("#phanmem_create").val()
	console.log(Tenphongmay, Diachi, phanmem, Date_Create)

	var search_params = new URLSearchParams(); 
	// append parameters
	search_params.append('event_key', 'Create_PM');
	search_params.append('Date_Create', String(Date_Create));
	// search_params.append('ID', userID);
	search_params.append('Logo', LogoPM);
	search_params.append('TenPhongMay', Tenphongmay);
	search_params.append('DiaChi', Diachi);
	search_params.append('Soluongmay', Soluongmay);
	// search_params.append('Key', keypm); // key fix server create
	search_params.append('soft', phanmem);
	// query string
	var query_string = search_params.toString();
	
	return await axios.post(url + '?'+ query_string)
	}

async function send_chatbox(message,timechat){
	var Date_Create = new Date().toLocaleString();
	var search_params = new URLSearchParams(); 
	// append parameters
	search_params.append('event_key', 'chatbox');
	search_params.append('Date_Create', timechat);
	search_params.append('User', username);
	search_params.append('Photo', avata);
	search_params.append('Chat', message);
	
	// query string
	var data = search_params.toString();
	
	return await axios.get(url + '?'+data)
	}

async function getinfo_chatbox(){
	var search_params = new URLSearchParams(); 
	// append parameters
	search_params.append('event_key', 'sendchatbox');
	// query string
	var data = search_params.toString();
	// document.getElementById("popuploadingmain").style.visibility="hidden";
	return await axios.get(url + '?'+data)
	}
/*================= loading avata Profile & Setting ============*/

async function showavata() {
	var token = window.localStorage.getItem('accessToken');
	//// check Token //////
	if (token){
		// const status = await refeshToken();
		// var data = status.data;
		// console.table(data);
		const username_show = document.getElementsByClassName("branda");// show name user
		const photo = document.getElementById("photousername");// show photousername
		if (avata !== '' && avata !== null)
			{document.getElementById("photousername").src = avata;}
		if (username !== '' && username !== null){		
			// document.getElementById("myspan").innerHTML="newtext";
			// document.getElementById("myspan").textContent="newtext";
			username_show[0].innerHTML= "<i class='bx bxs-user icon'></i>" + username;//.toUpperCase();
			// <img alt='' src='/templates/logo.png' style='position: absolute;'></img>
			// document.getElementById("imageid").src="../template/save.png";
		}
		return
	}
	window.location.href = "/";
	}

function Profile() {
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", "/templates/setting.html", true);
	rawFile.onreadystatechange = async function() {
	  if (rawFile.readyState === 4) {
		if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
				const main = document.getElementById('main');
				main.innerHTML = allText;

				const status = await getuser();
				var data = status.data.rev_data;
				console.log(data.Birthday)
				console.table(data);
				
				document.getElementById('imag_profile').src = avata
				document.getElementById('name_profile').innerHTML = username
				document.getElementById('email_profile').innerHTML = data.Email
				document.getElementById('birthday_profile').innerHTML = data.Birthday
				document.getElementById('address_profile').innerHTML = 'N/A'
				document.getElementById('phone_profile').innerHTML = data.Phone
				// document.getElementById('brand_profile').innerHTML = 
				// document.getElementById('diachi_profile').innerHTML = diachi_profile

				document.getElementById("popuploadingmain").style.visibility="hidden";
            }
		
		
	  }
	}
	rawFile.send(null);
 	}

/*================= Dashboard chuyển tab của sidebar ============*/

function switch_tab(file) {
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", `${file}`, true);
	rawFile.onreadystatechange = async function() {
	  if (rawFile.readyState === 4) {
		if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
				var html ='';
				// show table kich hoat phong may
				if (file === '/templates/kichhoatPM.html'){
					const status = await getinfo_phongmay();
					var data = status.data.rev_data;
					// console.log('ListPM',data)
					html +='<div class="table_responsive">'
					html +='<table cellspacing="0" cellpadding="0">'
					html +='	<thead>'
					html +='	<tr>'
					html +='		<th>TT</th>'
					html +='		<th>Logo</th>'
					html +='		<th>Tên Phòng Máy</th>'
					html +='		<th>Địa Chỉ</th>'
					html +='		<th>Số Lượng Máy</th>'
					html +='		<th>Key</th>'
					html +='		<th>App</th>'
					html +='		<th>Ngày Khởi Tạo</th>'
					html +='		<th>Ngày Gia Hạn</th>'
					html +='		<th>Ngày Hết Hạn</th>'
					html +='		<th>Trạng Thái</th>'
					html +='		<th></th>'
					html +='	</tr>'
					html +='	</thead>'
					html +='	<tbody>'
					for (var i = 0, l = data.length; i < l; i++) {
						const obj = data[i];
						const str = obj.Logo;
						// console.log(str)
  										
						html += '<tr>'
						html += `<td data-label="TT">0${i+1}</td>`
						html += `<td><img src="data:image/png;base64, ${obj.Logo}" onerror="this.src='${logodefault}'"></td>`
						html += '<td data-label="Tên Phòng Máy">'+ obj.TenPhongMay +'</td>'
						html += '<td data-label="Địa Chỉ">'+ obj.DiaChi +'</td>'
						html += '<td data-label="Số Lượng Máy">'+ obj.Soluongmay +'</td>'
						html += '<td data-label="Key">'+ obj.Key +'</td>'
						html += '<td data-label="App">'+ obj.soft +'</td>'
						html += '<td data-label="Ngày Khởi Tạo">'+ obj.Date_Create +'</td>'
						html += '<td data-label="Ngày Gia Hạn">'+ obj.Ngaygiahan +'</td>'
						html += '<td data-label="Ngày Hết Hạn">'+ obj.Ngayhethan +'</td>'
						if (obj.Status=='Ready'){
							html += '<td data-label="Trạng Thái" style="color: #19fc05;">'+ obj.Status +'</td>'
						}else if (obj.Status=='Hết hạn'){
							html += '<td data-label="Trạng Thái" style="color: #fa2500">'+ obj.Status +'</td>'
						}else{
							html += '<td data-label="Trạng Thái" style="color: #faad08;">'+ obj.Status +'</td>'
						}
						html += '<td>'
						html += '<span class="action_btn">'
						html += '	<a href="#">Gia Hạn</a>'
						html += '	<a href="#">Edit</a>'
						// html += '	<a href="#">Remove</a>'
						html += '	</span>'
						html += '</td>'
						html += '</tr>'
					}
					html += '</tbody>'
					html += '</table>'
					html += '</div>'
				}else if (file === '/templates/home.html') {
					content_chat = 0
					show_chart()					
				}else if (file === '/templates/danhsach_pc.html'){
					
					html += '<div class="selector">'
    				html += '	<div class="custom_select">'
        			html += '		<select onchange="combobox(this)" class="comboboxpc">'
					const statuss = await getinfo_phongmay();
					var data = statuss.data.rev_data;
					var keypc =[]
					for (var i = 0, l = data.length; i < l; i++) {
						const obj = data[i];
						// console.log(obj)
						keypc.push(obj.Key)
						html += `			<option value="${obj.Key}">${obj.TenPhongMay}</option>`
					}
					// html += '			<option value="Tiền mặt">Tiền mặt</option>'
					// html += '			<option value="chuyển khoản">chuyển khoản</option>'
        			html += '		</select>'
    				html += '	</div>'
					html += '	<div class="custom_select">'
					html += '		<select class="comboboxpc">'
					html += '			<option value="">Hardware PC</option>'
					html += '			<option value="Tiền mặt">Temperature PC</option>'
					html += '		</select>'
					html += '	</div>'
					html += '</div>'
					// html += '<div class ="main_table"'
					// const status = await getHardware_info_phongmay();
					console.log(keypc)
					const status = await getHardware_listPM_userid(keypc[0])
					var data = status.data.rev_data;
					console.log('hardware ',data)
					html +='<div class="table_responsive" id = "main_table">'
					html +='<table cellspacing="0" cellpadding="0">'
					html +='	<thead>'
					html +='	<tr>'
					html +='		<th></th>'
					html +='		<th>TT</th>'
					html +='		<th>PC</th>'
					html +='		<th>IP</th>'
					html +='		<th>Main</th>'
					html +='		<th>CPU</th>'
					html +='		<th>RAM</th>'
					html +='		<th>VGA</th>'
					html +='		<th>Status</th>'
					html +='	</tr>'
					html +='	</thead>'
					html +='	<tbody>'
					for (var i = 0, l = data.length; i < l; i++) {
						const obj = data[i];
						const str = obj.Logo;
						// console.log(str)			
						html += '<tr>'
						html += `<td><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRDgncKRlVORwGNv_oWcM2T4RR_hQQfzv0Zg&usqp=CAU"></td>`
						html += `<td data-label="TT">0${i+1}</td>`
						html += '<td data-label="PC">'+ obj.PC +'</td>'
						html += '<td data-label="IP">'+ obj.IP +'</td>'
						html += '<td data-label="Main">'+ obj.Main +'</td>'
						html += '<td data-label="CPU">'+ obj.CPU +'</td>'
						html += '<td data-label="RAM">'+ obj.Ram +'</td>'
						html += '<td data-label="VGA">'+ obj.VGA +'</td>'
						html += '<td data-label="Status">'+ obj.Status +'</td>'
					}
					html += '</tbody>'
					html += '</table>'
					html += '</div>'
				}else if (file === '/templates/list_idc_game.html'){			
					
					html += '	<div class="custom_select">'
					html += '		<select  onchange="combobox(this)" class="comboboxpc">'
					html += '			<option value="IDC_Game_ALL">All Games</option>'
					html += '			<option value="IDC_Game_Online">Games Online</option>'
					html += '			<option value="IDC_Game_Offline">Games Offline</option>'
					html += '		</select>'
					html += '	</div>'
					html += '</div>'
					// html += '<div class ="main_table"'
					// // const status = await getHardware_info_phongmay();
					// {"Date_Create" : "07:50:50, 12/11/2022", "Photo_Game" : "https://drive.google.com/file/d/1k-d2eWL4jQxbKBV2pSjh4UuzsrX_OSZV/view?usp=sharing", "ID_Game" : "IDC008", "Group_Game" : "Game Offline", "Name_Game" : "Liên Minh Huyền Thoại", "Theloai" : "Hành động", "Totalsize" : "1.47 GB", "Pathgame" : "", "FileRun" : "abc.txt", "Count_Down" : "0", "Contents" : "", "linkdown" : "1R58NcoASOEMjIuJOa3jAT4-rjucDlZKo", "Price" : "0"}
					const status = await getlist_idcgame()
					var data = status.data.rev_data;
					console.log('hardware ',data)
					html +='<div class="table_responsive" id = "main_table">'
					html +='<table cellspacing="0" cellpadding="0">'
					html +='	<thead>'
					html +='	<tr>'
					html +='		<th></th>'
					html +='		<th>TT</th>'
					html +='		<th>ID_Games</th>'
					html +='		<th>Game</th>'
					html +='		<th>Group_Game</th>'
					html +='		<th>The loai</th>'
					html +='		<th>Total size</th>'
					html +='		<th>Contents</th>'
					html +='		<th>Price</th>'
					html +='	</tr>'
					html +='	</thead>'
					html +='	<tbody>'
					for (var i = 0, l = data.length; i < l; i++) {
						const obj = data[i];
						// const str = obj.Logo;
						var logodefault = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRDgncKRlVORwGNv_oWcM2T4RR_hQQfzv0Zg&usqp=CAU"	
						html += '<tr>'
						html += `<td><img src="data:image/png;base64, ${obj.Photo_Game}" onerror="this.src='${logodefault}'"></td>`
						html += `<td data-label="TT">0${i+1}</td>`
						html += '<td data-label="ID_Games">'+ obj.ID_Game +'</td>'
						html += '<td data-label="Game">'+ obj.Name_Game +'</td>'
						html += '<td data-label="Group_Game">'+ obj.Group_Game +'</td>'
						html += '<td data-label="The loai">'+ obj.Theloai +'</td>'
						html += '<td data-label="Total size">'+ obj.Totalsize +'</td>'
						html += '<td data-label="Contents">'+ obj.Contents +'</td>'
						html += '<td data-label="Price">'+ obj.Price +'</td>'
					}
					html += '</tbody>'
					html += '</table>'
					html += '</div>'
				}else if (file === '/templates/market-games.html'){
					// const status = await getlist_market_game()
					// var data = status.data.rev_data;
					// console.log('hardware ',data)
					// html +='<div class="table_responsive" id = "main_table">'
					// html +='<table cellspacing="0" cellpadding="0">'
					// html +='	<thead>'
					// html +='	<tr>'
					// html +='		<th></th>'
					// html +='		<th>TT</th>'
					// html +='		<th>ID_Games</th>'
					// html +='		<th>Game</th>'
					// html +='		<th>Group_Game</th>'
					// html +='		<th>The loai</th>'
					// html +='		<th>Total size</th>'
					// html +='		<th>Contents</th>'
					// html +='		<th>Price</th>'
					// html +='	</tr>'
					// html +='	</thead>'
					// html +='	<tbody>'
					// for (var i = 0, l = data.length; i < l; i++) {
					// 	const obj = data[i];
					// 	// const str = obj.Logo;
					// 	var logodefault = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRDgncKRlVORwGNv_oWcM2T4RR_hQQfzv0Zg&usqp=CAU"	
					// 	html += '<tr>'
					// 	html += `<td><img src="data:image/png;base64, ${obj.Photo_Game}" onerror="this.src='${logodefault}'"></td>`
					// 	html += `<td data-label="TT">0${i+1}</td>`
					// 	html += '<td data-label="ID_Games">'+ obj.ID_Game +'</td>'
					// 	html += '<td data-label="Game">'+ obj.Name_Game +'</td>'
					// 	html += '<td data-label="Group_Game">'+ obj.Group_Game +'</td>'
					// 	html += '<td data-label="The loai">'+ obj.Theloai +'</td>'
					// 	html += '<td data-label="Total size">'+ obj.Totalsize +'</td>'
					// 	html += '<td data-label="Contents">'+ obj.Contents +'</td>'
					// 	html += '<td data-label="Price">'+ obj.Price +'</td>'
					// }
					// html += '</tbody>'
					// html += '</table>'
					// html += '</div>'
				}
				
				allText += html	
				const main = document.getElementById('main');
				
				main.innerHTML = allText;
				render_chart();
				document.getElementById("popuploadingmain").style.visibility="hidden";
				
				if (file === '/templates/home.html') {
					await getchatbox();
					scrollToBottom('chat-box');
				}
			
            }
		}
	}
	rawFile.send(null);	
	}
		
/*================= Create Phong May===================*/

async function create_PM(){
	if (validates()){
		const status = await Create_phongmay();
		var data = status.data.rev_data;
		switch_tab('/templates/kichhoatPM.html')
	
		document.querySelector('.overlay').classList.remove('showoverlay');
		document.querySelector('.loginform').classList.remove('showloginform');
		$("#Tenphongmay_create").val('')
		$("#Diachi_create").val('')
		$("#Soluongmay").val('')
		$("#phanmem_create").val('')
		
		document.getElementById("imagefile2").src = logodefault
		document.getElementById("popuploadingmain").style.visibility="hidden";
	}else{
		alert('Vui lòng nhập đủ thông tin');
	}
	
}

// document.querySelector('.overlay').classList.add('showoverlay');
// document.querySelector('.loginform').classList.add('showloginform');

function validates(){
	if ($("#Tenphongmay_create").val() === '' || $("#Diachi_create").val() === ''|| $("#Soluongmay").val() === ''|| $("#phanmem_create").val() === ''){
		console.log('rỗng');
		return false
	}
	return true
}

function cancel_createPM(){
	document.querySelector('.overlay').classList.remove('showoverlay');
	document.querySelector('.loginform').classList.remove('showloginform');
	$("#Tenphongmay_create").val('')
	$("#Diachi_create").val('')
	$("#Soluongmay").val('')
	$("#phanmem_create").val('')
	// $("#imagefile2").val('')
	document.getElementById("imagefile2").src = logodefault
}


/*================= event click outside element ============*/

var clickFlag = 0;
$('body').on('click','#func', function (event) {
	clickFlag = 1;
	console.log('showed the element');
	/* Show the element */
	document.querySelector('.overlay').classList.add('showoverlay');
	document.querySelector('.loginform').classList.add('showloginform');
});

// var i =0;
// $("#pro"+i+", #pro"+i+", #pro"+i+"").each(function(){
//             $(this).on('click', function(){
// chart.series[0].update({
//      data: pro+i
// });

// });});

var specifiedElement = document.getElementById('loginform')
document.addEventListener('click', function(event) {
	var isClickInside = specifiedElement.contains(event.target);
	if (isClickInside) {
		console.log('You clicked inside')
	}
	else {
		if(clickFlag == 0) {
			/* Hide element here */
			document.querySelector('.overlay').classList.remove('showoverlay');
			document.querySelector('.loginform').classList.remove('showloginform');
		}
		else {
			clickFlag = 0;
		}
		console.log('You clicked outside', clickFlag)
		
	
	}
})

/*====================  event loop chart =================*/

// APEXCHART
var chart;
function render_chart() {

	var options = {
	series: [{
	name: 'Number of PCs online',
	data: [0]
	}, {
	name: 'Total time pc online',
	data: [0]
	}],
	//   chart: {
	//   height: 350,
	//   type: 'area'
	// },
	// dataLabels: {
	//   enabled: false
	// },
	// stroke: {
	//   curve: 'smooth'
	// },
	// xaxis: {
	//   type: 'datetime',
	//   categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z","2018-09-19T07:00:00.000Z", "2018-09-19T08:30:00.000Z", "2018-09-19T09:30:00.000Z", "2018-09-19T10:30:00.000Z", "2018-09-19T11:30:00.000Z", "2018-09-19T12:30:00.000Z", "2018-09-19T13:30:00.000Z", "2018-09-19T14:30:00.000Z"]
	// },
	// tooltip: {
	//   x: {
	//     format: 'dd/MM/yy HH:mm'
	//   },
	// },

	chart: {
		id: 'realtime',
		height: 350,
		type: 'area',
		animations: {
		enabled: true,
		// easing: 'linear',
		dynamicAnimation: {
			speed: 1000
		}
		},
		toolbar: {
		show: false
		},
		zoom: {
		enabled: false
		}
	},
	dataLabels: {
		enabled: false
	},
	stroke: {
		curve: 'smooth'
	},
	//   title: {
	// 	text: 'Dynamic Updating Chart',
	// 	align: 'left'
	//   },
	markers: {
		size: 0
	},
	xaxis: {
		type: 'datetime',
		categories: [],
		// ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z","2018-09-19T07:00:00.000Z", "2018-09-19T08:30:00.000Z", "2018-09-19T09:30:00.000Z", "2018-09-19T10:30:00.000Z", "2018-09-19T11:30:00.000Z", "2018-09-19T12:30:00.000Z", "2018-09-19T13:30:00.000Z"],
		axisBorder: {
			show: false
		  },
	},
	
	tooltip: {
		x: {
		format: 'dd/MM/yy HH:mm',
		},
	},
	grid: {
		row: {
			colors: ['#3b3838e8', 'transparent'],
			opacity: 0.3
		}, 
		show: false,      // you can either change hear to disable all grids
		xaxis: {
			lines: {
			show: false  //or just here to disable only x axis grids
			}
		},
		
	}
	
	};

	if (document.querySelector("#chart")){
		chart = new ApexCharts(document.querySelector("#chart"), options);
		chart.render();
	}
	// loop chart //
	
	
	}
var newData = [];
async function show_chart() {
	try{
		if (document.getElementById('card_1_h2')){
			// sendchatbox();
			// chatboxd = document.querySelectorAll('#btn-chatbox')
			/*============= Render Chart ==========================*/
			const status = await getinfo_sendchart()
			console.log(status)
			var data = status.data.rev_data;
			// console.table(data);
			const recv = Math.floor(Math.random() * (100 - data.PC_Online) + data.PC_Online);
			let local = new Date().addHours(-5)
			// console.log(local)
			if (recv){
				// Remove first data if we received more than 20 values
				if (newData.length >= 15) {
					let dst1 = newData.slice(1);
					newData = dst1;
				}
				var result = [local, recv]
				newData.push(result)
				chart.updateSeries([
				{
					name: 'Number of PCs online',
					data: newData,
				},
				{
					name: 'Total time pc online',
					data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				}])
			}
			/*============ Show data Dashboard ======================*/
			const pctl = (recv/data.PC_Total*100).toFixed(2)
			const totaltime = Number(data.Total_Time_online).format();
			const countpc_open = Number(data.Count_open_PC).format();
			const wallet = Number(data.Current_Wallet).format();
			const wallettl = (data.Current_Wallet/data.Wallet*100).toFixed(2)
			setvalue_begin(recv,pctl,totaltime,100,countpc_open,100,wallet,wallettl)
		}
	}
	catch{
		console.log('error show chart')
	}
	
	
	}

async function sendChart_loop() {
	await show_chart();
	// Create an interval to send echo messages to the server
	window.setInterval(async () => await show_chart(), 10000)
}
async function getchat_loop() {
	try{
		await getchatbox();
		scrollToBottom('chat-box');
	}
	catch{
		console.log('error')
	}
	// await getchatbox();
	// scrollToBottom('chat-box');
	// Create an interval to send echo messages to the server
	window.setInterval(() => getchatbox(), 1000)
}

/*============ Show PROGRESSBAR CARD ======================*/ 

function setvalue_begin(card_1, card_1tl, card_2,card_2tl, card_3, card_3tl, card_4,card_4tl) {
	if (document.getElementById('card_1_h2')){
		document.getElementById('card_1_h2').textContent = `${card_1}`
		document.getElementById('card_1_progress').dataset.value = `${card_1tl}%`
		document.getElementById('card_1_label').innerText = `${card_1tl}%`

		document.getElementById('card_2_h2').textContent = `${card_2} H`
		document.getElementById('card_2_progress').dataset.value = `${card_2tl}%`
		document.getElementById('card_2_label').innerText = `${card_2tl}%`
		
		document.getElementById('card_3_h2').textContent = `${card_3}`
		document.getElementById('card_3_progress').dataset.value = `${card_3tl}%`
		document.getElementById('card_3_label').innerText = `${card_3tl}%`

		document.getElementById('card_4_h2').textContent = `${card_4} VNĐ`
		document.getElementById('card_4_progress').dataset.value = `${card_4tl}%`
		document.getElementById('card_4_label').innerText = `${card_4tl}%`
		
		// PROGRESSBAR
		const allProgress = document.querySelectorAll('main .card .progress');

		allProgress.forEach(item=> {
			item.style.setProperty('--value', item.dataset.value)
		})
	}
	showavata();
	}

/*============ Chat Box ======================*/ 

// const emojiBtn = document.querySelector('#emoji-trigger');
var emojiBtn = document.querySelector('#emoji-btn');
const picker = new EmojiButton();
// Emoji selection  
window.addEventListener('DOMContentLoaded', () => {

    picker.on('emoji', emoji => {
      document.querySelector('#message').value += emoji
    });
	// `<font size="+3"> ${emoji} </font>`
    // emojiBtn.addEventListener('click', () => {
    //   picker.togglePicker(emojiBtn);
    // });
  });   

function clicks(){
	picker.togglePicker(document.getElementById('emoji-btn'));
}


async function sendchat_box(){
	// var timechat = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false })
	var timechat = new Date().toLocaleString()
	var message = $("#message").val()
	if (message){
		// document.querySelector('.btn-scrollchat').classList.add('scrolldown');
		document.getElementById('message').value = '';
		const main = document.getElementById('chat-box');

		const regex_emoji = /[\p{Extended_Pictographic}\u{1F3FB}-\u{1F3FF}\u{1F9B0}-\u{1F9B3}]+/gu;
		var emoji = message.match(regex_emoji)
		// console.log(emoji);
		if(emoji){
			emoji = `<font size="+3"> ${emoji} </font>`
			emoji = message.replace(message.match(regex_emoji), emoji)
		}else{
			emoji = message
		}

		var html = '<div class="msg me">'
		html += '	<div class="chat">'
		html += '		<div class="profile">'
		html += `			<span class="time">${timechat}</span>`
		html += '		</div>'
		html += `		<p>${emoji}</p>`
		html += '	</div>'
		html += '</div>'
		var outhtml = document.getElementById('chat-box').outerHTML
		outhtml = outhtml.replace('<div class="chat-box" id="chat-box" onscroll="scrolltemp()">','')
		outhtml = outhtml.replace('</div></div></div>', '</div></div>')
		// console.log(outhtml)
		main.innerHTML = outhtml + html;
		// $(".chat-box").stop().animate({ scrollTop: $(".chat-box")[0].scrollHeight}, 1000);
		scrollToBottom('chat-box');
		const status = await send_chatbox(message, timechat)
		var data = status.data.rev_data;
		console.table(data)
		if(data!="Ban"){
			
		}else{
			alert('Ban chat')
		}
	}
	
}
var content_chat = 0;
async function getchatbox(){
	try{
		if (document.getElementById('card_1_h2')){
			const status = await getinfo_chatbox()
			var data = status.data.rev_data;
			if (content_chat != data.length){
				content_chat = data.length;
				// console.log('khac', content_chat)
				
				// var html = `<p class="day"><span>${new Date().toLocaleString()}</span></p>`
				var html =''
				for (var i = 0, l = data.length; i < l; i++) {
					const obj = data[i];
					
					const regex_emoji = /[\p{Extended_Pictographic}\u{1F3FB}-\u{1F3FF}\u{1F9B0}-\u{1F9B3}]+/gu;
					var emoji = obj.Chat.match(regex_emoji)
					// console.log(emoji);
					if(emoji){
						emoji = `<font size="+3"> ${emoji} </font>`
						emoji = obj.Chat.replace(obj.Chat.match(regex_emoji), emoji)
					}else{
						emoji = obj.Chat;
					}
					// message me
					if (obj.User === username && obj.Photo === avata){
						html += '<div class="msg me">'
						html += '	<div class="chat">'
						html += '		<div class="profile">'
						html += `			<span class="time">${obj.Date_Create}</span>`
						html += '		</div>'
						html += `		<p>${emoji}</p>`
						
						html += '	</div>'
						html += '</div>'
					}else{
						html += '<div class="msg">'
						html += `	<img src="${obj.Photo}" alt="">`
						html += '	<div class="chat">'
						html += '		<div class="profile">'
						html += `			<span class="username">${obj.User}</span>`
						html += `			<span class="time">${obj.Date_Create}</span>`
						html += '		</div>'
						html += `		<p>${emoji}</p>`
						html += '	</div>'
						html += '</div>'
					}
				}
				const main = document.getElementById('chat-box');
				if (main){
					main.innerHTML = html;
					// $(".chat-box").stop().animate({ scrollTop: $(".chat-box")[0].scrollHeight}, 1000);	
				}
				
			}
		}
	}
	catch{
		console.log('error getchat')
	}
	
	
}
const scrollToBottom = (id) => {
	const element = document.getElementById(id);
  	element.scrollTop = element.scrollHeight;
}


function bottom(){
	document.querySelector('.btn-scrollchat').classList.remove('scrolldown');
	$(".chat-box").stop().animate({ scrollTop: $(".chat-box")[0].scrollHeight}, 1000);
}


// document.getElementById("chat-box").addEventListener('scroll',
//     function()
//     {
		
//         var scrollTop = document.getElementById("chat-box").scrollTop;
//         var scrollHeight = document.getElementById("chat-box").scrollHeight; // added
        
//         var contentHeight = scrollHeight - scrollTop; // added

// 		// console.log(contentHeight, scrollTop)
//         if (contentHeight >= 608) // modified
//         {
//             document.querySelector('.btn-scrollchat').classList.add('scrolldown');
//         }else{
// 			document.querySelector('.btn-scrollchat').classList.remove('scrolldown');
// 		}
//     },
//     false
// )
function scrolltemp()
    {
        var scrollTop = document.getElementById("chat-box").scrollTop;
        var scrollHeight = document.getElementById("chat-box").scrollHeight; // added
        
        var contentHeight = scrollHeight - scrollTop; // added

		// console.log(contentHeight, scrollTop)
        if (contentHeight >= 608) // modified
        {
            document.querySelector('.btn-scrollchat').classList.add('scrolldown');
        }else{
			document.querySelector('.btn-scrollchat').classList.remove('scrolldown');
		}
    }

///////// Get logo ////////////////////////////////
async function Get_logokl() {                                                       
	var file = await getlogo();
	// console.log(file.data)
	file = file.data.rev_data;
	document.getElementById("imagefile2").src = 'data:image/png;base64, '+file
	logodefault = 'data:image/png;base64, '+ file
} 

/*============ khởi động ===================*/
setvalue_begin(0,0,0,0,0,0,0,0);
render_chart();
show_chart();
sendChart_loop();
getchat_loop();
Get_logokl();

async function getFileFromUrl(url, name, defaultType = 'image/jpeg'){
	const response = await fetch(url);
	const data = await response.blob();
	return new File([data], name, {
	  type: data.type || defaultType,
	});
  }


// ================= func event combobox ============ //
async function combobox(selectObject) {
    $('select option').prop('disabled', false);
    // var optionSelected = $("option:selected", selectObject);
    var valueSelected = selectObject.value;
    // alert(valueSelected);
    // $("select option:contains('" + valueSelected + "')").attr("disabled","disabled");
	// console.log(optionSelected, valueSelected)
	var allText ='';
	var html ='';
	if(!(String(valueSelected).includes('IDC_Game_'))){
		const status = await getHardware_listPM_userid(valueSelected);
		var data = status.data.rev_data;
		console.log('hardware ',data)
		html +='<div class="table_responsive">'
		html +='<table cellspacing="0" cellpadding="0">'
		html +='	<thead>'
		html +='	<tr>'
		html +='		<th></th>'
		html +='		<th>TT</th>'
		html +='		<th>PC</th>'
		html +='		<th>IP</th>'
		html +='		<th>Main</th>'
		html +='		<th>CPU</th>'
		html +='		<th>RAM</th>'
		html +='		<th>VGA</th>'
		html +='		<th>Status</th>'
		html +='	</tr>'
		html +='	</thead>'
		html +='	<tbody>'
		for (var i = 0, l = data.length; i < l; i++) {
			const obj = data[i];
			const str = obj.Logo;
			// console.log(str)			
			html += '<tr>'
			html += `<td><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRDgncKRlVORwGNv_oWcM2T4RR_hQQfzv0Zg&usqp=CAU"></td>`
			html += `<td data-label="TT">0${i+1}</td>`
			html += '<td data-label="PC">'+ obj.PC +'</td>'
			html += '<td data-label="IP">'+ obj.IP +'</td>'
			html += '<td data-label="Main">'+ obj.Main +'</td>'
			html += '<td data-label="CPU">'+ obj.CPU +'</td>'
			html += '<td data-label="RAM">'+ obj.Ram +'</td>'
			html += '<td data-label="VGA">'+ obj.VGA +'</td>'
			html += '<td data-label="Status">'+ obj.Status +'</td>'
		}
		html += '</tbody>'
		html += '</table>'
		html += '</div>'
	}else{
		const status = await getlist_idcgame()
		var data = status.data.rev_data;
		console.log('hardware ',data)
		html +='<div class="table_responsive">'
		html +='<table cellspacing="0" cellpadding="0">'
		html +='	<thead>'
		html +='	<tr>'
		html +='		<th></th>'
		html +='		<th>TT</th>'
		html +='		<th>ID_Games</th>'
		html +='		<th>Game</th>'
		html +='		<th>Group_Game</th>'
		html +='		<th>The loai</th>'
		html +='		<th>Total size</th>'
		html +='		<th>Contents</th>'
		html +='		<th>Price</th>'
		html +='	</tr>'
		html +='	</thead>'
		html +='	<tbody>'
		for (var i = 0, l = data.length; i < l; i++) {
			const obj = data[i];
			if(String(obj.Group_Game).includes('Offline') && String(valueSelected).includes('IDC_Game_Offline')){
				var logodefault = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRDgncKRlVORwGNv_oWcM2T4RR_hQQfzv0Zg&usqp=CAU"	
				html += '<tr>'
				html += `<td><img src="data:image/png;base64, ${obj.Photo_Game}" onerror="this.src='${logodefault}'"></td>`
				html += `<td data-label="TT">0${i+1}</td>`
				html += '<td data-label="ID_Games">'+ obj.ID_Game +'</td>'
				html += '<td data-label="Game">'+ obj.Name_Game +'</td>'
				html += '<td data-label="Group_Game">'+ obj.Group_Game +'</td>'
				html += '<td data-label="The loai">'+ obj.Theloai +'</td>'
				html += '<td data-label="Total size">'+ obj.Totalsize +'</td>'
				html += '<td data-label="Contents">'+ obj.Contents +'</td>'
				html += '<td data-label="Price">'+ obj.Price +'</td>'
			}else if(String(obj.Group_Game).includes('Online') && String(valueSelected).includes('IDC_Game_Online')){
				var logodefault = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRDgncKRlVORwGNv_oWcM2T4RR_hQQfzv0Zg&usqp=CAU"	
				html += '<tr>'
				html += `<td><img src="data:image/png;base64, ${obj.Photo_Game}" onerror="this.src='${logodefault}'"></td>`
				html += `<td data-label="TT">0${i+1}</td>`
				html += '<td data-label="ID_Games">'+ obj.ID_Game +'</td>'
				html += '<td data-label="Game">'+ obj.Name_Game +'</td>'
				html += '<td data-label="Group_Game">'+ obj.Group_Game +'</td>'
				html += '<td data-label="The loai">'+ obj.Theloai +'</td>'
				html += '<td data-label="Total size">'+ obj.Totalsize +'</td>'
				html += '<td data-label="Contents">'+ obj.Contents +'</td>'
				html += '<td data-label="Price">'+ obj.Price +'</td>'
			}else if(String(valueSelected).includes('IDC_Game_ALL')){
				var logodefault = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRDgncKRlVORwGNv_oWcM2T4RR_hQQfzv0Zg&usqp=CAU"	
				html += '<tr>'
				html += `<td><img src="data:image/png;base64, ${obj.Photo_Game}" onerror="this.src='${logodefault}'"></td>`
				html += `<td data-label="TT">0${i+1}</td>`
				html += '<td data-label="ID_Games">'+ obj.ID_Game +'</td>'
				html += '<td data-label="Game">'+ obj.Name_Game +'</td>'
				html += '<td data-label="Group_Game">'+ obj.Group_Game +'</td>'
				html += '<td data-label="The loai">'+ obj.Theloai +'</td>'
				html += '<td data-label="Total size">'+ obj.Totalsize +'</td>'
				html += '<td data-label="Contents">'+ obj.Contents +'</td>'
				html += '<td data-label="Price">'+ obj.Price +'</td>'
			}
		}
		html += '</tbody>'
		html += '</table>'
		html += '</div>'
	}
	allText += html	
	const main = document.getElementById('main_table');
	main.innerHTML = allText;
	document.getElementById("popuploadingmain").style.visibility="hidden";
};



//////////////////// func create key ////////////////////////////////////

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

// console.log(formata("1598176793917341", 4))
// console.log(formata(
// 	"d-sf354g40ds-gsfgf-sfdds65-46", 6))
// console.log(format(
// "   d-sf354';.;.';.'...,k/]gcs-hsfgdf-sfs6-46", 5))

function makeid(length) {
	var result = "";
	var characters = '0123456789';
	for (var i = 0; i < length; i++) {
	  result += characters[Math.floor(Math.random() * characters.length)];
	}
	result = result.match(/\d{1,4}/g).join("-");
	return result;
  }
  



////////////////////// commingsoon ////////////////////////////////////////

// let customeDate = new Date("September 10, 2023 12:00:00").getTime();
// let timer = setInterval(timing, 1000);
// function timing(){
// 	let now = new Date().getTime();
// 	let x = customeDate - now;
// 	// console.log(x);
// 	if(x > 0){
		
// 		let days = Math.floor(x / (1000*60*60*24));
		
// 		let hours = Math.floor((x % (1000*60*60*24)) / (1000*60*60));
		
// 		let mins = Math.floor((x % (1000*60*60)) / (1000*60));
		
// 		let secs = Math.floor((x % (1000*60)) / 1000);
		
// 		let time = `${days}d : ${hours}h : ${mins}m : ${secs}s`;
// 		// console.log(time);
// 		try{document.querySelector('.timing').innerHTML = time;}
// 		catch{}
		
// 	}
//             }


			
/////////////////////////////// SIDEBAR DROPDOWN ////////////////////////////////

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
if(sidebar.classList.contains('hide')) {
	allSideDivider.forEach(item=> {
		item.textContent = '-'
		
	})
	allDropdown.forEach(item=> {
		const a = item.parentElement.querySelector('a:first-child');
		a.classList.remove('active');
		item.classList.remove('show');
	})

	
} else {
	allSideDivider.forEach(item=> {
		item.textContent = item.dataset.text;
	})

	
}

////////////////////////// check element resize ////////////////////////
var box = $('#sidebar');
new ResizeSensor(box, function(){
	// console.log(box[0].clientWidth);
	let widthel= box[0].clientWidth;
	if (widthel<=60){
		allinfousers.forEach(item=> {
			item.style.display = 'none';
		})
	}else{
		allinfousers.forEach(item=> {
			item.style.display = 'block';
		})
	}
});


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

		
	} else {
		allSideDivider.forEach(item=> {
			item.textContent = item.dataset.text;
		})
		allinfousers.forEach(item=> {
			item.style.display = 'block';
		})
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
const imgProfile = profile.querySelector('img');
const dropdownProfile = profile.querySelector('.profile-link');

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

window.addEventListener('click', function (e) {
	
	if(e.target !== imgProfile) {
		if(e.target !== dropdownProfile) {
			if(dropdownProfile.classList.contains('show')) {
				dropdownProfile.classList.remove('show');
			}
		}
	}

	allMenu.forEach(item=> {
		const icon = item.querySelector('.icon');
		const menuLink = item.querySelector('.menu-link');

		if(e.target !== icon) {
			if(e.target !== menuLink) {
				if (menuLink.classList.contains('show')) {
					menuLink.classList.remove('show')
				}
			}
		}
	})
})


const mode = document.getElementById("mode");
mode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})
  

/*======================= upfile ===================*/

$(document).ready(function() {
	$('input[type="file"]').change(function(e) {
		e.preventDefault();
		var geekss = e.target.files[0].name;
		// console.log((this.id))
		readFile(this.id, e.target.files[0]);
		
		const file= e.target.files[0];
		const fr = new FileReader();
		fr.readAsArrayBuffer(file);
		fr.onload = f => {
		// document.getElementById("popuploadingmain").style.visibility="visible";
		const url = "https://script.google.com/macros/s/AKfycbw8dXrZZGNl7J43Uks57ov_8Foe79lHmSJgC5LS7STgHeex04WB/exec";  // <--- Please set the URL of Web Apps.
		const qs = new URLSearchParams({filename: file.name, mimeType: file.type});
		fetch(`${url}?${qs}`, {method: "POST", body: JSON.stringify([...new Int8Array(f.target.result)])})
		.then(res => res.json())
		.then(e => {
			console.log(e.fileUrl)
			imageUrl = e.fileUrl;
			// document.getElementById("popuploadingmain").style.visibility="hidden";
		})  // <--- You can retrieve the returned value here.
		.catch(err => console.log(err));
		}
		
	});
});

function readFile(id,file) {                                                       
	var reader = new FileReader();
	reader.onload = readSuccess;                                            
	function readSuccess(evt) {     
		var imageData = reader.result;
		document.getElementById("image"+id).src = imageData  
		// imageUrl = imageData;
		};
	reader.readAsDataURL(file);                                
} 







/*========================== test func ================== */

const getBase64FromUrl = async (url) => {
	const data = await fetch(url);
	const blob = await data.blob();
	return new Promise((resolve) => {
	  const reader = new FileReader();
	  reader.readAsDataURL(blob); 
	  reader.onloadend = () => {
		const base64data = reader.result;   
		resolve(base64data);
	  }
	});
  }
  











/*================= function old ==================*/

const text = ''

var token = window.localStorage.getItem('tokenmenu-kl');
var tokensession = sessionStorage;
// console.log(tokensession);

function allStorage() {

    var archive = {}, // Notice change here
        keys = Object.keys(sessionStorage),
        i = keys.length;

    while ( i-- ) {
        archive[ keys[i] ] = sessionStorage.getItem( keys[i] );
		console.table(keys[i], sessionStorage.getItem( keys[i] ));
    }
	
    // return archive;
}
// allStorage();

// ready Login
async function GetData(url = '', data = {}) {
	// Default options are marked with *
	const response = await fetch(url, {
	  method: 'GET', // *GET, POST, PUT, DELETE, etc.
	  mode: 'cors', // no-cors, *cors, same-origin
	  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
	  credentials: 'same-origin', // include, *same-origin, omit
	  headers: {
		'Content-Type': 'application/json',
		"Authorization":'Bearer '+ token // Here you can add your token,
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
	console.log(response.status);
	if (response.ok) {
	  return response.json(); // parses JSON response into native JavaScript objects
	} else {
		// Dang nhap lai
		// print(response.json())
		// window.localStorage.setItem('tokenmenu-kl', token);
		// window.location.href="/";
	}

	// return response.json(); // parses JSON response into native JavaScript objects
	
  }
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

//   GetData('/show_user')
//   .then(data => {
//     console.log(data); // JSON data parsed by `data.json()` call
// 	if(data['username'] === 'Could not validate credentials'){
// 		console.log('het han');
// 		// window.location.href="/";
// 	} else{
// 	const username = document.getElementsByClassName("branda");// show name user
// 	const photo = document.getElementsByClassName("photousername");// show photousername
// 	// document.getElementById("myspan").innerHTML="newtext";
// 	// document.getElementById("myspan").textContent="newtext";
// 	// console.log(toggleSidebar)
// 	username[0].innerHTML= "<i class='bx bxs-user icon'></i>" + data['username'];//.toUpperCase();
// 	// <img alt='' src='/templates/logo.png' style='position: absolute;'></img>
//     // document.getElementById("imageid").src="../template/save.png";
// 	// console.log(photo)
// 	photo[0].src=data['photo'];
// 	}
//   });


////////////// logout fb /////////////////////
function fbLogout() {
	localStorage.clear();
	window.location.href="/";
	// FB.logout(function() {
	// 	console.log('logout fb');
		
	// });
}

 //////////////////////// Socket Chart //////////////////////////////////////

//  var ipserver = location.host;
//  var client_id = Date.now();
//  var count = 0;
//  var newData = [];
//  document.querySelector("#ws-id").textContent = client_id;

//  var ws = new WebSocket(`wss://${ipserver}/wss/${client_id}`);
//  ws.onmessage = function(event) {
// 	const recv = JSON.parse(event.data)
// 	if (recv.type === 'Cyber Report'){
// 		// Remove first data if we received more than 20 values
// 		if (newData.length > 14) {
// 			let dst1 = newData.slice(1);
// 			newData = dst1;
// 		}else{
// 			newData.push(recv.value)
// 		}
// 		chart.updateSeries([
// 		{
// 			name: 'Number of PCs online',
// 			data: newData
// 		}, 
// 		{
// 			name: 'Total time pc online',
// 			data: [11, 32, 45, 32, 34, 52, 41, 11, 32, 45, 32, 34, 52, 41]
// 		}])
// 	} else{
// 		//////// messege //////////////////////////////
// 		var messages = document.getElementById('messages')
// 		var message = document.createElement('li')
// 		var content = document.createTextNode(event.data)
// 		message.appendChild(content)
// 		messages.appendChild(message)
		
// 	}
	 
//  };
 
 function sendMessage(event) {
	 var input = document.getElementById("messageText")
	//  ws.send(input.value)
	 const a = {type: 'Cyber Report'}
	 ws.send(JSON.stringify(a))
	 input.value = ''
	 event.preventDefault()
 }
//// event loop chart ///////

 function sendChart_bk() {
	const a = {type: 'Cyber Report'}
	// Create an interval to send echo messages to the server
    window.setInterval(() =>ws.send(JSON.stringify(a)), 10000)
}

// sendChart()

function clickshow(){
	var btn=document.querySelector('.btna');
	var about=document.querySelector('.abouta');
	if(this.innerText=="More"){
		about.style.display="block";
		this. innerText="Less";
	}
	else{
		about.style.display="none";
		this. innerText="More";
	}
}	
