/*----------------------------- load jquery -------------------- */
// Immediately-invoked function expression
(function() {
	// Load the script
	const script = document.createElement("script");
	script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js';
	script.type = 'text/javascript';
	script.addEventListener('load', () => {
	//   console.log(`jQuery ${$.fn.jquery} has been loaded successfully!`);
	  // use jQuery below
	});
	document.head.appendChild(script);
  })();


 /*------------------------------- axios ------------------------------ */
 let refreshTokenRequest = null;
 var config_data = null
 var isTokenExpired = true
const instance = axios.create({
   baseURL: 'http://127.0.0.1:8100'
 })
 axios.defaults.params = {};
//   xu ly data truoc khi gui len server
instance.interceptors.request.use(config => {              
   // console.log('truoc khi request!!!')
   config_data = config.data
   // configs = config
   // console.log('request',config.data, typeof(config.data))

     return config;
   }, err => {
       console.log('sau khi request lỗi error!!!', err)
         return Promise.reject(err)
 })
 
 // xu ly data sau khi response
instance.interceptors.response.use( (response) =>{
   // console.log('sau khi response!!!')
   console.log('token còn hạn', response.status)
   isTokenExpired = true
   return response;
 }, async err => {
     const originalRequest = err.config;
   originalRequest.data = config_data
   console.log(err.response.status, originalRequest.data)
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
//    localStorage.clear()
   window.location.href = 'http://127.0.0.1:8100/menu-game'
   return Promise.reject(err)
 
   
 })
   

function changeFont(element){
   element.style.fontSize="13px";
   for(var i=0; i < element.children.length; i++){
       changeFont(element.children[i]);
   }
}
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


///////////////////////////////// button sliderbar //////////////////////////
async function show_Danhmuc_order(){
    let danhmuc_doan = document.querySelector('.Danhmuc_doan')
    let danhmu_douong = document.querySelector('.Danhmuc_douong')
    let temp_order = {
        action: 'getDanhmuc'
    }
    let DM = await instance.post('/mathang', temp_order);

    var html_doan = ''
    var html_douong = ''
   
    DM.data.forEach(function(element, index){
        let DMCha = element.DMcha
        let DMChild = element.name
        if (DMCha =='Đồ Ăn'){
            html_doan += `<li href="#" class="collapse__sublink" style="padding-left: 40px; white-space: nowrap;" onclick= "sumitt('gameall')">.${DMChild}</li>`
        }else if (DMCha =='Đồ Uống'){
            html_douong += `<li href="#" class="collapse__sublink" style="padding-left: 40px; white-space: nowrap;" onclick= "sumitt('gameall')">.${DMChild}</li>`
        }
    });
    // console.log(html_doan)
    danhmuc_doan.querySelector('.order_danhmuc').innerHTML = html_doan
    danhmu_douong.querySelector('.order_danhmuc').innerHTML = html_douong
}


async function sumitt(e){
    const banner_photo = document.getElementsByClassName("hinh");
    const content_menu = document.getElementsByClassName("show_content");
    const title_menu = document.getElementsByClassName('dashboard-title');
    title_menu[0].innerHTML = e
    var html = ''
    if (e == 'order'){
        
        banner_photo[0].src = 'images_order/images-banner.jpg'
        let temp_order = {
			action: 'getMH'
		}
		let MH = await instance.post('/mathang', temp_order);
        // console.table(MH.data)
        MH.data.forEach(function(element, index){
            const id = element.id
            const photo = element.photo
            const ten_MH = element.name
            const danhmuc_MH = element.Danhmuc
            const price = element.price
            const nguyenlieu_MH = element.NguyenLieu
            const Topping_MH = element.Topping
            const min_tonkho = min_max(nguyenlieu_MH, 'Tonkho').min
            element.Tonkho = min_tonkho
            element.sl = 1
            element.Ghichu = ''
            element.action = 'CHẤP NHẬN'
            element.photo = null
            element.Custom = document.querySelector('#tenmay').innerHTML
            const SL_mathang = document.querySelectorAll('.order-card .order-soluong')
            element.id_MH = SL_mathang.length

            var book = JSON.stringify(element)
            book = book.replaceAll('"', '=')
            // console.log(book)           
            // book.push(element)

            
            if (danhmuc_MH != "Topping"){
                if (min_tonkho===0){
                    html +=`<div class="dashboard-card">`
                    html +=     `<img class="card-image" src="${photo}" onerror="this.onerror=null;this.src='/images_order/no-image.jpg';">`
                    html +=      `<div class="card-detail">`
                    html +=         `<h4 class="card-name"><b style="color: red; font: var(--body-font);">[Hết] </b>${ten_MH}</h4>`
                }else{
                    html +=`<div class="dashboard-card" onclick="order(this, '${book}')">`
                    html +=     `<img class="card-image" src="${photo}" onerror="this.onerror=null;this.src='/images_order/no-image.jpg';">`
                    html +=      `<div class="card-detail">`
                    html +=         `<h4 class="card-name"><b style="color: var(--xanhla); font: var(--body-font);">[${min_tonkho}] </b>${ten_MH}</h4>`
                }
                    html +=         `<div style="display: flex; justify-content: flex-end; position: relative;">
                                        <p class="card-time"><span class="fas fa-clock"></span> 5-15 mins</p>
                                        <h3><span class="card-price">${Number(price).format(0, 3, '.', ',')}<span style="color: yellow;">₫</span></span></h3>
                                    </div>`
                    html +=       `</div>`
                    html +=       `<div class='overlay-order'><span class="fas fa-shopping-cart"><p>Thêm Vào Giỏ</p></span></div>`
                    html +=`</div>`
            }            
        });
    
        //  html += `</div>`
    }else if (e == 'changeline'){
       
        html +=`<div class="container" id="cardinternet">`
        for(i=0; i<4; i++) {

            html +=`<label class="option_item">`
            html +=`    <input id="checkbox0" type="checkbox" class="checkbox" onclick="openPopup('checkbox0', '192.168.1.${i}','192.168.1.1','8.8.8.8')">`
            html +=`    <div class="option_inner facebook">`
            html +=`        <div class="tickmark"></div>`
            html +=`        <div class="boxchangeline">`
            html +=`           <div class="icon">Viettel${i}</div>`
            html +=`           <div class="contentchangline facebook">`
            html +=`               <h3>Speed: 100Mbps</h3>`
            html +=`               <p>Gateway: 192.168.1.${i}</p>`
            html +=`               <p>DNS1: 192.168.1.1</p>`
            html +=`               <p>DNS2: 8.8.8.8</p>`
            html +=`               <h3>Fast internet for Game</h3>`
            html +=`           </div>`
            html +=`       </div>`
            html +=`   </div>`
            html +=`</label>`

            // <div class="container" id="cardinternet">
        	// 	<label class="option_item">
        	// 		<input id="checkbox0" type="checkbox" class="checkbox" onclick="openPopup('checkbox0', '192.168.1.1','192.168.1.1','8.8.8.8')">
        	// 		<div class="option_inner facebook">
        	// 			<div class="tickmark"></div>
        	// 			<div class="boxchangeline">
        	// 				<div class="icon">Viettel</div>
        	// 				<div class="contentchangline facebook">
        	// 					<h3>Speed: 100Mbps</h3>
        	// 					<p>Gateway: 192.168.1.1</p>
        	// 					<p>DNS1: 192.168.1.1</p>
        	// 					<p>DNS2: 8.8.8.8</p>
        	// 					<h3>Fast internet for Game</h3>
        	// 				</div>
        	// 			</div>
        	// 		</div>
        	// 	</label>
        	// 	<label class="option_item">
        	// 		<input id="checkbox1" type="checkbox" class="checkbox" onclick="openPopup('checkbox1', '192.168.1.2','1.1.1.1','8.8.8.8')">
        	// 		<div class="option_inner facebook">
        	// 			<div class="tickmark"></div>
        	// 			<div class="boxchangeline">
        	// 				<div class="icon">VNPT</div>
        	// 				<div class="contentchangline facebook">
        	// 					<h3>Speed: 100Mbps</h3>
        	// 					<p>Gateway: 192.168.1.2</p>
        	// 					<p>DNS1: 1.1.1.1</p>
        	// 					<p>DNS2: 8.8.8.8</p>
        	// 					<h3>Fast internet for Web</h3>
        	// 				</div>
        	// 			</div>
        	// 		</div>
        	// 	</label></div>
        }
        html +=`</div>`
    }else if (e == 'gopy'){
        html +=`<div class="boxfeedback" onclick="gop_y()">`
        html +=`   <div class="feedback-img">`
        html +=`       <img class="feedback-imag-nen" src="images_order/feedback-nen.png"">`
        html +=`      <img class="feedback-imag-chinh" src="images_order/feedback-update.png" onerror="this.src='https://i.imgur.com/NhGzwjO.gif';this.onerror='';"/>`
        html +=`   </div>`
        html +=`   <div class="feedback_name">`
        html +=`       <span>Yêu Cầu</span>`
        html +=`       <h3 class="feedback_content">Update Games/App</h3>`
        html +=`      <p class="feedback_title">Cập nhật game/phần mềm</p>`
        html +=`   </div>`
        html +=`</div>`

        html +=`<div class="boxfeedback">`
        html +=`   <div class="feedback-img">`
        html +=`      <img class="feedback-imag-nen" src="images_order/feedback-nen.png">`
        html +=`       <img class="feedback-imag-chinh" src="images_order/feedback-onao.png" onerror="this.src='https://i.imgur.com/NhGzwjO.gif';this.onerror='';"/>`
        html +=`   </div>`
        html +=`   <div class="feedback_name">`
        html +=`       <span>Ồn Ào</span>`
        html +=`       <h3 class="feedback_content">Ghế Bên Cạnh ồn ào</h3>`
        html +=`       <p class="feedback_title">Bên cạnh ồn ào</p>`
        html +=`   </div>`
        html +=`</div>`

        html +=`<div class="boxfeedback">`
        html +=`   <div class="feedback-img">`
        html +=`       <img class="feedback-imag-nen" src="images_order/feedback-nen.png">`
        html +=`      <img class="feedback-imag-chinh" src="images_order/feedback-time.png" onerror="this.src='https://i.imgur.com/NhGzwjO.gif';this.onerror='';"/>`
        html +=`  </div>`
        html +=`  <div class="feedback_name">`
        html +=`      <span>Yêu Cầu</span>`
        html +=`       <h3 class="feedback_content">Update Games/App</h3>`
        html +=`       <p class="feedback_title">Cập nhật game, phần mềm</p>`
        html +=`   </div>`
        html +=`</div>`

        html +=`<div class="boxfeedback">`
        html +=`   <div class="feedback-img">`
        html +=`       <img class="feedback-imag-nen" src="images_order/feedback-nen.png">`
        html +=`       <img class="feedback-imag-chinh" src="images_order/feedback-nong.png" onerror="this.src='https://i.imgur.com/NhGzwjO.gif';this.onerror='';"/>`
        html +=`   </div>`
        html +=`  <div class="feedback_name">`
        html +=`       <span>Ồn Ào</span>`
        html +=`       <h3 class="feedback_content">Ghế Bên Cạnh ồn ào</h3>`
        html +=`        <p class="feedback_title">Bên cạnh ồn ào</p>`
        html +=`    </div>`
        html +=`</div>`

        html +=`<div class="boxfeedback">`
        html +=`   <div class="feedback-img">`
        html +=`       <img class="feedback-imag-nen" src="images_order/feedback-nen.png">`
        html +=`       <img class="feedback-imag-chinh" src="images_order/feedback-tienthua.png" onerror="this.src='https://i.imgur.com/NhGzwjO.gif';this.onerror='';"/>`
        html +=`  </div>`
        html +=`  <div class="feedback_name">`
        html +=`      <span>Ồn Ào</span>`
        html +=`       <h3 class="feedback_content">Ghế Bên Cạnh ồn ào</h3>`
        html +=`       <p class="feedback_title">Bên cạnh ồn ào</p>`
        html +=`   </div>`
        html +=`</div>`

        html +=`<div class="boxfeedback">`
        html +=`  <div class="feedback-img">`
        html +=`      <img class="feedback-imag-nen" src="images_order/thuocla.png">`
        html +=`       <img class="feedback-imag-chinh" src="images_order/feedback-thuocla.png" onerror="this.src='https://i.imgur.com/NhGzwjO.gif';this.onerror='';"/>`
        html +=`   </div>`
        html +=`   <div class="feedback_name">`
        html +=`       <span>Ồn Ào</span>`
        html +=`      <h3 class="feedback_content">Ghế Bên Cạnh ồn ào</h3>`
        html +=`      <p class="feedback_title">Bên cạnh ồn ào</p>`
        html +=`   </div>`
        html +=`</div>`

        html +=`<div class="boxfeedback">`
        html +=`  <div class="feedback-img">`
        html +=`       <img class="feedback-imag-nen" src="images_order/feedback-nen.png">`
        html +=`      <img class="feedback-imag-chinh" src="images_order/feedback-bucboi.png" onerror="this.src='https://i.imgur.com/NhGzwjO.gif';this.onerror='';"/>`
        html +=`  </div>`
        html +=`  <div class="feedback_name">`
        html +=`       <span>Ồn Ào</span>`
        html +=`       <h3 class="feedback_content">Ghế Bên Cạnh ồn ào</h3>`
        html +=`       <p class="feedback_title">Bên cạnh ồn ào</p>`
        html +=`   </div>`
        html +=`</div>`

        html +=`<div class="boxfeedback">`
        html +=`   <div class="feedback-img">`
        html +=`       <img class="feedback-imag-nen" src="images_order/feedback-nen.png">`
        html +=`      <img class="feedback-imag-chinh" src="images_order/feedback-vesinh.png" onerror="this.src='https://i.imgur.com/NhGzwjO.gif';this.onerror='';"/>`
        html +=`  </div>`
        html +=`  <div class="feedback_name">`
        html +=`       <span>Ồn Ào</span>`
        html +=`       <h3 class="feedback_content">Ghế Bên Cạnh ồn ào</h3>`
        html +=`       <p class="feedback_title">Bên cạnh ồn ào</p>`
        html +=`   </div>`
        html +=`</div>`

        html +=`<div class="boxfeedback">`
        html +=`   <div class="feedback-img">`
        html +=`       <img class="feedback-imag-nen" src="images_order/feedback-nen.png">`
        html +=`      <img class="feedback-imag-chinh" src="images_order/feedback-tainghe.png" onerror="this.src='https://i.imgur.com/NhGzwjO.gif';this.onerror='';"/>`
        html +=`   </div>`
        html +=`   <div class="feedback_name">`
        html +=`       <span>Ồn Ào</span>`
        html +=`       <h3 class="feedback_content">Ghế Bên Cạnh ồn ào</h3>`
        html +=`       <p class="feedback_title">Bên cạnh ồn ào</p>`
        html +=`   </div>`
        html +=`</div>`

        html +=`<div class="boxfeedback">`
        html +=`   <div class="feedback-img">`
        html +=`       <img class="feedback-imag-nen" src="images_order/feedback-nen.png">`
        html +=`       <img class="feedback-imag-chinh" src="images_order/feedback-mouse.png" onerror="this.src='https://i.imgur.com/NhGzwjO.gif';this.onerror='';"/>`
        html +=`   </div>`
        html +=`   <div class="feedback_name">`
        html +=`       <span>Ồn Ào</span>`
        html +=`       <h3 class="feedback_content">Ghế Bên Cạnh ồn ào</h3>`
        html +=`       <p class="feedback_title">Bên cạnh ồn ào</p>`
        html +=`   </div>`
        html +=`</div>`

        html +=`<div class="boxfeedback">`
        html +=`  <div class="feedback-img">`
        html +=`      <img class="feedback-imag-nen" src="images_order/feedback-nen.png">`
        html +=`       <img class="feedback-imag-chinh" src="images_order/feedback-keyboard.png" onerror="this.src='https://i.imgur.com/NhGzwjO.gif';this.onerror='';"/>`
        html +=`   </div>`
        html +=`    <div class="feedback_name">`
        html +=`       <span>Ồn Ào</span>`
        html +=`       <h3 class="feedback_content">Ghế Bên Cạnh ồn ào</h3>`
        html +=`       <p class="feedback_title">Bên cạnh ồn ào</p>`
        html +=`   </div>`
        html +=`</div>`
    }else{
        banner_photo[0].src = 'images_order/1.jpg'
        for(i=0; i<18; i++) {
            html += `<div class="box">`
            html +=     `<div class="box-img">`
            html +=         `<img src="https://image.thanhnien.vn/w2048/Uploaded/2022/dbeyxqxqrs/2022_07_15/1-4624.jpg" onerror="this.src='https://i.imgur.com/NhGzwjO.gif';this.onerror='';"/>`
            html +=     `</div>`
            html +=     `<div class="tengame">`
            html +=         `<span>Game Online</span>`
            html +=         `<h3 class="name">FIFA ONLINE FIFA ONLINE</h3>`
            html +=         `<h3 class="theloai">Hành động, Phiêu lưu</h3>`
            html +=         `<h3 class="luotchoi">☆ 1000</h3>`
            html +=     `</div>`
            html +=     `<div class="content">`
            html +=         `<h3>FIFA ONLINE</h3>`
            html +=         `<p>Hành động, Phiêu lưu</p>`
            html +=     `</div>`
            html +=     `<div class="button" >`
            html +=         `<li><button class="b1" onclick="call('filerun4')">Play Game</button></li>`
            // html +=         `<li><button class="b1" onclick="call('filerun4')">Save Game</button></li>`
            html +=         `<li><button class="b1" onclick="call('openfolder4')" )="">Open Folder</button></li>`
            html +=     `</div>`
            html += `</div>`
        }        
    }
    content_menu[0].innerHTML = html
   
}


  
///////////////////////// event order //////////////////////////////////
const order_wrapper = document.getElementsByClassName("order-wrapper");
order_wrapper[0].innerHTML = ''
var order_total = document.getElementById("order-totals");
order_total.innerHTML = 0 + `<span style="color: yellow;">₫</span>`

const button_dathang = document.getElementsByClassName("checkout")
button_dathang[0].disabled = true;

document.getElementsByClassName("tick")[1].style.visibility="hidden"
document.getElementsByClassName("tick")[0].style.visibility="hidden"

const dashboard_thongbao = document.getElementsByClassName('dashboard-thongbao');
dashboard_thongbao[0].style.visibility = 'hidden';
const dashboard_order = document.getElementsByClassName('dashboard-order');
dashboard_order[0].style.visibility = 'visible';

var list_order = ''
var list_giohang=[]
var stop_order = false; //khóa đặt hàng


function order(selectObject, element){   
    if (stop_order){
        /*----------------- change content thông báo -------------------------------------- */
        var timechat = new Date().toLocaleString()
        const thongbao = document.getElementsByClassName("poup_thongbao");
        thongbao[0].innerHTML = "[Hệ Thống] Tạm dừng đặt hàng"
        
        loadingpoup()
        return;
    }
    var dict;
    if (typeof element == 'string'){
        dict = element.replaceAll('=','"');
        dict = JSON.parse(dict)
        // console.table(dict)
        if(dict.Topping.length > 0){
            /*--- chưa add giỏ hàng ---*/
            // console.log('co topping')
            call_popup("Thêm Topping", dict, selectObject)
            return;
        }
    }else{
        dict = element
    }
    giohang()
    const SL_mathang = document.querySelectorAll('.order-card .order-soluong')

    var PhotoChildNode = selectObject.querySelector('.card-image');
    var NameChildNode = selectObject.querySelector('.card-name');
    var PriceChildNode = selectObject.querySelector('.card-price');

    var order_photo = PhotoChildNode.src
    var order_name = NameChildNode.textContent.split("]")[1];
    
    var order_price = PriceChildNode.innerHTML

    var itemsame = false

    var order_card = document.querySelectorAll('.order-card')
    for (const element of order_card) {
        var name = element.querySelector('.order-name').textContent
        let order_topping = element.querySelector('.order-topping')
        if (name.trim()==order_name.trim() && !order_topping){
            var soluong = element.querySelector('.order-soluong')

            if (Number(dict.Tonkho) > Number(soluong.innerText)){
                soluong.innerHTML = Number(soluong.innerText) + 1;
                for (var i=0;i<list_giohang.length;i++) {
                    if (list_giohang[i].name == name.trim()){
                        list_giohang[i].sl = soluong.innerHTML
                    }
                };
                
            }else{
                const success = loadingpoup()
            }
            itemsame = true
            console.table(list_giohang)
            return;
        }
    };

    if (!itemsame){
        const order_wrapper = document.getElementsByClassName("order-wrapper");
        list_order = order_wrapper[0].innerHTML
        // console.log(list_order)

        var html = ''
        // html += `<hr class="divider ${order_name.replace(/ /g,'')}">`
        html += `<div class="order-card id="${SL_mathang.length}">`
        html += `   <img class="order-image" src="${order_photo}">`
        html += '   <div class="order-detail">'
        html += '       <button class="button-clear" onclick= "clear_order(this)">X</button>'
        html += `       <p class="order-name" style="font-size: 18px;">${order_name}</p>`
        /*------------ topping show ------ */
        const Topping_MH = dict.Topping
        if(Topping_MH.length > 0) {
            for (var i = 0; i < Topping_MH.length; i++)
                html += `<p class="order-topping" style="white-space: nowrap;">
                -${Topping_MH[i].nameTopping}
                (${Topping_MH[i].Topping_SL}) 
                (+${Number(Topping_MH[i].Topping_DG).format(0, 3, '.', ',')}
                <span style="color: yellow;">₫</span>)</p>`
        }
        html += `       <input class="input-order" type="text" placeholder="Ghi Chú" style="margin-top: 10px; margin-bottom: 10px;" value="${dict.Ghichu}">`
        // html += `       <span class="order-price">${order_price} </span>`//<i class="fas fa-times" style="margin-right: 27px;margin-left: 27px;"></i>             
        html += `       <div style="display: flex; justify-content: flex-end;">
                            <span class="order-price">${order_price} </span> <i class="ti-minus" onclick="giam_sl(this);"></i><span class="order-soluong" style="margin-right: 10px;margin-left: 10px; width: 10px; text-align: center;">1</span><i class="ti-plus" onclick="tang_sl(this, ${dict.Tonkho});"></i>
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
                        if (id_MH == i){
                            list_giohang[i].sl = element.innerHTML
                            func_total()
                            console.table(list_giohang)
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
                            console.table(list_giohang)
                            break;
                        }
                    };
                }
            });
        
        });
    }
        

    /*--- add giỏ hàng ---- */
    list_giohang.push(dict)

    // console.table(list_giohang)
    func_total()
    
}
function order_updateTopping(selectObject, dict){
    
    giohang()
    const SL_mathang = document.querySelectorAll('.order-card .order-soluong')
    var PhotoChildNode = selectObject.querySelector('.card-image');
    var NameChildNode = selectObject.querySelector('.card-name');
    var PriceChildNode = selectObject.querySelector('.card-price');

    var order_photo = PhotoChildNode.src
    var order_name = NameChildNode.textContent.split("]")[1];
    var order_price = PriceChildNode.innerHTML

    var itemsame = false
    var name_order = dict.name
    for (var i = 0; i < dict.Topping.length; i++){
        name_order += dict.Topping[i].nameTopping
        name_order += dict.Topping[i].Topping_SL
        name_order += dict.Topping[i].Topping_DG
    }
    for (var i = 0; i < list_giohang.length; i++){
        var name_MH_giohang = list_giohang[i].name
        console.table(list_giohang[i].Topping)
        var Topping = list_giohang[i].Topping
        for (var j = 0; j < Topping.length; j++){
            name_MH_giohang += Topping[j].nameTopping
            name_MH_giohang += Topping[j].Topping_SL
            name_MH_giohang += Topping[j].Topping_DG
            if (name_MH_giohang == name_order){
                var order_card = document.querySelectorAll('.order-card')
                var soluong = order_card[i].querySelector('.order-soluong')
                if (Number(dict.Tonkho) > Number(soluong.innerText)){
                    soluong.innerHTML = Number(soluong.innerText) + 1;
                    list_giohang[i].sl = soluong.innerHTML
                }else{
                    const success = loadingpoup()
                }
                itemsame = true
                console.table(list_giohang)
                return;
            }
        }
    }


    if (!itemsame){
        const order_wrapper = document.getElementsByClassName("order-wrapper");
        list_order = order_wrapper[0].innerHTML
        // console.log(list_order)

        var html = ''
        // html += `<hr class="divider ${order_name.replace(/ /g,'')}">`
        html += `<div class="order-card id="${SL_mathang.length}">`
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
                            <span class="order-price">${order_price} </span> <i class="ti-minus" onclick="giam_sl(this);"></i><span class="order-soluong" style="margin-right: 10px;margin-left: 10px; width: 10px; text-align: center;">1</span><i class="ti-plus" onclick="tang_sl(this, ${dict.Tonkho});"></i>
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
                let name_MH = detail.parentNode.querySelector('.order-name')
                let id_MH = detail.parentNode.parentNode.id
                // console.log(id_MH)
                if (name_MH){
                    for (var i=0;i<list_giohang.length;i++) {
                        if (id_MH == i){
                            list_giohang[i].sl = element.innerHTML
                            func_total()
                            console.table(list_giohang)
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
                            console.table(list_giohang)
                            break;
                        }
                    };
                }
            });
            
        });

        /*--- add giỏ hàng ---- */
        list_giohang.push(dict)
    }
    func_total()
    
}


function clear_order(selectObject){
    let id_MH = selectObject.parentNode.parentNode.id
    let element = selectObject.parentNode.parentNode 
    element.remove();
    // In ECMA6 (arrow function syntax):
    // list_giohang = list_giohang.filter(e => e.id_MH !== id_MH)
    // func_total()
    // console.table(list_giohang)
    /*---------- cách remove 1 ------------------------- */
    for (var i = 0; i < list_giohang.length; i++){
        if (id_MH == i){
            const index = i;
            if (index > -1) { // only splice array when item is found
                list_giohang.splice(index, 1); // 2nd parameter means remove one item only
                console.log(id_MH)
                console.table(list_giohang)
                func_total()
                break;
            }
        }
    }
   
}

// ==================== onchange soluong ================== //

function tang_sl(selectObject, tonkho){
    // console.log(tonkho)
    let sl= Number(selectObject.previousElementSibling.innerText)
    if(sl >= 0 && sl < tonkho ){
        sl+=1
    }
    selectObject.previousElementSibling.innerHTML= sl
    // func_total()
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
    // func_total()

    
}

// =============== tinh tong bill =============== //

function func_total(){
    var order_card = document.querySelectorAll('.order-card')
    console.log('order', order_card)
    if (order_card.length >= 0 ){
        // console.log(list_giohang)
        
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
            document.getElementsByClassName("tick")[0].style.visibility="visible" 
            countgiohang[0].innerHTML = `(${count} Món)`
        }else{
            list_giohang = []
            document.getElementsByClassName("checkout")[0].disabled = true; 
            document.getElementsByClassName("tick")[0].style.visibility="hidden"
            countgiohang[0].innerHTML = `(Đang trống! )`
            order_total.innerHTML =  `0<span style="color: yellow;">₫</span>`
        }
    }
        
}

async function dathang(){
    
    var Date_Create = new Date().toLocaleString("vi-VN", {timeZone: "Asia/Ho_Chi_Minh"});
    for (var i = 0; i < list_giohang.length; i++) {
        list_giohang[i].date = Date_Create
    };
    console.table(list_giohang)
    let temp_order = {
        action: 'Order',
        data: list_giohang
    }
    const res = await instance.post('/mathang', temp_order);
    console.log(res)

    const success = await loadingpoup()
    if (success){
        document.getElementsByClassName("checkout")[0].disabled = true;
        document.getElementsByClassName("tick")[1].style.visibility="visible" 
        document.getElementsByClassName("tick")[0].style.visibility="hidden"
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
    thongbao();
    
}

// =========== format number ============== //
// Number.prototype.format = function(n, x, s, c) {
//     var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
//         num = this.toFixed(Math.max(0, ~~n));

//     return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
// };


 // ============= progressbar ==========//
document.getElementsByClassName("poup")[0].style.visibility="hidden"
async function loadingpoup(){
    return new Promise(function(resolve) {
        var countthongbaos = 0
        const thongbao_progressbar = document.getElementsByClassName("poup_thongbao");
        // console.log(thongbao_progressbar[0].innerHTML)
        const thongbao = document.getElementsByClassName('thongbao-card');
        console.log(thongbao[0].innerHTML)
        thongbao[0].innerHTML += thongbao_progressbar[0].innerHTML + `<hr class="divider"></hr>`
        // thongbao[0].style.fontSize = "13px";
        changeFont(thongbao[0])

        /*----------------- show sô lượng thông báo ----------------- */
        const countthongbao = document.getElementsByClassName('countcart')
        countthongbaos +=1;
        countthongbao[1].innerHTML = `(${countthongbaos})`
        document.getElementsByClassName("tick")[1].style.visibility="visible"

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
                document.getElementsByClassName("poup")[0].style.display= "none"
                document.querySelector('.overlay').classList.remove('showoverlay');
                clearInterval(interval)
                resolve(true)
            }
        }, 5)
 })
}
// ===================== func change font element ====================//
function changeFont(element){
    element.style.fontSize="13px";
    for(var i=0; i < element.children.length; i++){
        changeFont(element.children[i]);
    }
}
 
/////////////////////////////////// func menu game ////////////////////////////////

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
    linkColor.forEach(l=> {
        l.classList.remove('active')        
    });
    this.classList.add('active')
}
linkColor.forEach(l=> l.addEventListener('click', colorLink))

/*================= COLLAPSE MENU  ===============*/ 
const linkCollapse = document.getElementsByClassName('collapse__link')
var i
for(i=0;i<linkCollapse.length;i++){
    linkCollapse[i].addEventListener('click', function(){
        console.log('test1')
        const collapseMenu = this.nextElementSibling
        collapseMenu.classList.toggle('showCollapse')
        
        const rotate = collapseMenu.previousElementSibling
        rotate.classList.toggle('rotate')
    })
}

const nav_link = document.getElementsByClassName('nav__link')
var i
for(i=0;i<nav_link.length;i++){
    nav_link[i].addEventListener('click', function(){
        try{
            const collapseMenu = this.childNodes[1].nextElementSibling.nextElementSibling.nextElementSibling
            var classNames  = String($(collapseMenu).attr('class'));
            // console.log(classNames.indexOf("showCollapse"), classNames)
            if (classNames.indexOf("showCollapse")==-1){
                for(i=0;i<nav_link.length;i++){
                    const temp1 = nav_link[i].querySelector('.collapse__link')
                    if(temp1){temp1.classList.remove('rotate')}
                    const temp2 = nav_link[i].querySelector('.collapse__menu')
                    if(temp2){temp2.classList.remove('showCollapse')}
                }
            }
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


/*---------------------- Func call popup --------------------- */
async function call_popup(e, dict, selectObject){
	clickFlag = 1;
    var tilte= null
	if (e.textContent){
		tilte = (e.textContent).trim()
	}else{tilte = e.trim()}
	
	var html = null
	if (tilte=='Thêm Topping'){
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
            let nameTopping = topping[i].nameTopping
            let Topping_DG = topping[i].Topping_DG

            const nguyenlieu_Topping = topping[i].NguyenLieu_Topping

            const min_tonkho = min_max(nguyenlieu_Topping, 'Tonkho').min
            topping[i].Tonkho = min_tonkho

            console.log(nguyenlieu_Topping, dict)
            html+=		`<div class="detail_Topping" style="display: flex; justify-content: flex-end; margin:5px;">
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
                console.log('thay doi', dict.Topping[i].Topping_SL)
                // console.log(dict)
            });
           


        });
        document.querySelector('.button_popup').addEventListener('click',function (evt) {
            // for (var i = 0; i < dict.Topping.length; i++){
            //     if (dict.Topping[i].Topping_SL === 0){
            //         console.log('del')
            //         dict.Topping.splice(i, 1);
            //     }
            // };
            dict.Topping = dict.Topping.filter(function(item) {
                if (item.Topping_SL !== 0){
                    return item
                }
            });
            // console.log(dict.Topping)
            if (dict.Topping.length == 0){
                dict.Topping = []
                // console.log(dict.Topping)
                order(selectObject, dict);
            }else{
                order_updateTopping(selectObject, dict);
            }
            closePopup_gop_y();
        })
        
		// show popup
		clickFlag = 0;
		document.querySelector('.containerpopup  .popup').classList.add('open-popup');
	}

    document.querySelector('.overlay').classList.add('showoverlay');
	document.querySelector('.containerpopup  .popup').classList.add('open-popup');

}

/*------------------ func notify --------------- */

async function call(e) {
    var timechat = new Date().toLocaleString()
    const thongbao = document.getElementsByClassName("poup_thongbao");
    thongbao[0].innerHTML = "[Hệ Thống] Đang mở Game !<p style='color: #00b627; font-size: 1.5rem;'>" + e + ' </p><br>' + timechat
    
    const success = await loadingpoup()
    if (success){
        
        console.log(e)
    }
    
}

// ///////////////////// Func Changeline ///////////////////////////////

/*=================== Popup input ================*/
let popup = document.getElementById("popup");
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
        console.log('changegateway',gateway,dns1,dns2)
        
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
async function closePopup(e){
	popup.classList.remove("open-popup");
	// document.getElementById("cardinternet").style.pointerEvents = "All";
	// document.getElementById("navbar").style.pointerEvents = "All";
    const textpopup = document.getElementsByClassName('popup-input')
    textpopup[0].value='';
    var timechat = new Date().toLocaleString()
    const thongbao = document.getElementsByClassName("poup_thongbao");
    thongbao[0].innerHTML = "[Hệ Thống] Đã ghi nhận ý kiến đóng góp <p style='color: #00b627; font-size: 1.5rem;'>" + e + ' </p> thành công!<br>' + timechat
    const success = await loadingpoup()
    if (success){

    }
}

function closePopup_gop_y(){
	popup.classList.remove("open-popup");
    document.querySelector('.overlay').classList.remove('showoverlay');
}
/*============== Get gateway pc ==============*/
// var findIP = new Promise(r=>{var w=window,a=new (w.RTCPeerConnection||w.mozRTCPeerConnection||w.webkitRTCPeerConnection)({iceServers:[]}),b=()=>{};a.createDataChannel("");a.createOffer(c=>a.setLocalDescription(c,b,b),b);a.onicecandidate=c=>{try{c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r)}catch(e){}}})
// /*Usage example*/
// findIP.then(ip => 
// console.log('ip: ', ip))
// 	.catch(e => console.error(e))

////////////////////////////// Func gop y //////////////////////////

async function gop_y(){
    document.querySelector('.overlay').classList.add('showoverlay');
    popup.classList.add("open-popup");
    // var timechat = new Date().toLocaleString()
    // const thongbao = document.getElementsByClassName("poup_thongbao");
    // thongbao[0].innerHTML = "[Hệ Thống] Set Gateway <p style='color: #00b627; font-size: 1.5rem;'>" + gateway + ' </p> thành công!<br>' + timechat
    // const success = await loadingpoup()
    // if (success){

    // }
}

//========= thong bao ==========//
async function thongbao(){
    dashboard_thongbao[0].style.visibility = 'visible';
    dashboard_order[0].style.visibility = 'hidden';
}
async function giohang(){
    dashboard_thongbao[0].style.visibility = 'hidden';
    dashboard_order[0].style.visibility = 'visible';
}


/*---------------------------------------------- func tính toán ------------------------------------------------ */
/*================= event click outside element ============*/
var clickFlag = 1;
var specifiedElement = document.querySelector('.containerpopup')
document.addEventListener('click', function(event) {
	// event.preventDefault();
	var isClickInside = specifiedElement.contains(event.target);
	// console.log(isClickInside)
	if (isClickInside) {
		// console.log('You clicked inside')
	}
	else {
		if(clickFlag === 1) {
			/* Hide element here */
			document.querySelector('.overlay').classList.remove('showoverlay');
			document.querySelector('.containerpopup .popup').classList.remove('open-popup');
			
		}else{
			clickFlag = 1;
		}
		// console.log('You clicked outside', clickFlag, isClickInside)
		
	
	}
})

/*----- func elment input validate for step by event ------- */
function validateValue(event){
	const elem = event.target;
	const value = elem.value;
	console.log(value)
	const numVal = value.replace(/\D/,"");
	elem.value = numVal;
  }
function validateValue_str(event){
	const elem = event.target;
	const elem_check = elem.parentNode.querySelector('.ti-alert')
	console.log(elem_check)
	const value = elem.value;
	if (elem_check){
		if (!value){
			css(elem_check, {
				'display': 'block',
				'color': 'red'
			})
			css(elem, {
				'border-color': 'red',
				// 'font-style': 'italic'
				
			});
		}else{
			css(elem_check, {
				'display': 'none',
			})
			css(elem, {
				'border': '1px solid rgba(255, 255, 255, 0.3)',
				// 'font-style': 'italic'
			});
			
		}
	}
	
	
  }
function validateValue_huy(event){
	const elem = event.target;
	const elem_check = elem.parentNode.querySelector('.ti-alert')
	const value = elem.value;
	if(elem_check){
		if (!value){
			css(elem_check, {
				'display': 'block',
				'color': 'red'
			})
			css(elem, {
				'border-color': 'red',
				// 'font-style': 'italic'
				
			});
		}else{
			css(elem_check, {
				'display': 'none',
			})
			css(elem, {
				'border': '1px solid rgba(255, 255, 255, 0.3)',
				// 'font-style': 'italic'
			});
			
		}
	}

	var n = Number(value).format(0, 3, '.', ',')
	const note_price = elem.parentNode.querySelector('span')
	if (note_price){note_price.innerHTML = n +' ₫'}
  }
function validata_number(cbox){
	if(cbox){
		for (let i = 0; i < cbox.length; i++) {
			cbox[i].addEventListener('keypress', function(evt){
				!/^\d*(\.\d+)?$|(Backspace|Control|Meta)/.test(evt.key) && evt.preventDefault()
			});

			
		}
	}
}
/*--- func check min value ----*/
function validata_number_min(input, min){
	if(input){
		for (let i = 0; i < input.length; i++) {
			input[i].addEventListener('keyup', function(evt){
				if (this.value && this.value == 0){
					console.log(this.value)
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
	// console.log(typeof lowest)
	if (lowest === Infinity){
        /* dau trừ xuất hiện ở show mat hang de order */
		lowest = '-'
        // lowest = '0'
	}
	return {max: highest, min: lowest};
}


/*------------------------------------- login ------------------------------- */
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
  


async function login(){
    // localStorage.setItem('namelogin', username.value)
    var username;
    username = document.querySelector('#tenmay').innerHTML
    const res = await instance.post('/login', {username: username, password: '123456'});
    console.log(res)
}

// let csrf_token = getCookie("refresh_token_cookie")
// let ws = new WebSocket(`ws://127.0.0.1:8100/ws?token=${csrf_token}`)
//  ws.onmessage = (event) => {
// 	// let dict_data = {}
// 	let dict_data = JSON.parse(event.data)
// 	dict_data = eval(dict_data);
// 	// console.log(typeof(dict_data), dict_data)
// 	if (dict_data.action === 'Order'){
// 		// return new Promise(async (resolve) => {
// 		// 	await render_table ()
// 		// 	var audio = new Audio('http://127.0.0.1:8100/assets/js/alert-order.ogg');
// 		// 	await audio.play()
// 		// 	resolve(console.log('xong socket'))
// 		// });
// 	}else{
// 		// console.log('Search btn')
// 		// search_text_table(dict_data)
// 		// return;
// 	}
// }


/*----------- func Main ------------ */
const main = async ()=>{
    if (cookie){
        console.log(cookie);
        var data_temp = new Promise((resolve) => {
          const res = instance.post('/refresh');
          resolve(res.data);
          });
        //   console.log(data_temp)
      }else{
        await login();
      }
    
    await show_Danhmuc_order();
    sumitt('order')
}
main()