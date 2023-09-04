

// ==================== event order =========================//
const order_wrapper = document.getElementsByClassName("order-wrapper");
order_wrapper[0].innerHTML = ''
var order_total = document.getElementById("order-totals");
order_total.innerHTML = 0 + 'đ'

const button_dathang = document.getElementsByClassName("checkout")
button_dathang[0].disabled = true;

document.getElementsByClassName("tick")[1].style.visibility="hidden"
document.getElementsByClassName("tick")[0].style.visibility="hidden"

var list_order = ''
console.log(list_order)

function order(selectObject){
    // var textContainer = document.querySelector(".order-wrapper");
    // console.log(selectObject.target)
    var PhotoChildNode = selectObject.querySelector('.card-image');
    var NameChildNode = selectObject.querySelector('.card-name');
    var PriceChildNode = selectObject.querySelector('.card-price');

    var order_photo = PhotoChildNode.src
    var order_name = NameChildNode.textContent
    var order_price = PriceChildNode.textContent

    var itemsame = false

    var order_card = document.querySelectorAll('.order-card')
    order_card.forEach(element => {
        var name = element.querySelector('.order-name').textContent
        if (name==order_name){
            var soluong = element.querySelector('.order-soluong')
            soluong.setAttribute('value',Number(soluong.value) + 1);
            itemsame = true
            return
        }
    });
    if (!itemsame){
        const order_wrapper = document.getElementsByClassName("order-wrapper");
        list_order = order_wrapper[0].innerHTML

        var html = ''
        html += `<hr class="divider ${order_name.replace(/ /g,'')}">`
        html += '<div class="order-card">'
        html += `   <img class="order-image" src="${order_photo}">`
        html += '   <div class="order-detail">'
        html += `       <p class="order-name">${order_name}</p>`
        html += `       <span class="order-price">${order_price} </span><i class="fas fa-times"></i>`
        html += '       <input type="number" value="1" min="1" class="order-soluong" onchange="soluong(this)">'
        html += '       <input class="input-order" type="text" placeholder="Ghi Chú">'
        html += '   </div>'
        html += '   <button class="button-clear" onclick= "clear_order(this)">X</button>'
        html += '</div>'

        order_wrapper[0].innerHTML= list_order + html;
    }
    func_total()
}

function clear_order(selectObject){
    let target_parent = selectObject.previousElementSibling
    var NameChildNode = target_parent.querySelector('.order-name');
    let element = document.querySelector(`.${NameChildNode.textContent.replace(/ /g,'')}`)
    element.closest(`.${NameChildNode.textContent.replace(/ /g,'')}`).remove();
    selectObject.closest('.order-card').remove();
    func_total()
}

// ==================== onchange soluong ================== //
function soluong(selectObject){
    selectObject.setAttribute('value',selectObject.value);
    func_total()
}

// =============== tinh tong bill =============== //
function func_total(){
    var Total_price = 0
    var listNameFood = ''
    var order_card = document.querySelectorAll('.order-card')
    order_card.forEach(element => {
        var price = element.querySelector('.order-price').textContent
        var Namefood = element.querySelector('.order-name').textContent
        var hesonhan = element.querySelector('.order-soluong').value
        listNameFood+= Namefood+', '

        var numStr = /\D+/g;
        var number = price.replace(numStr, '');
        // console.log(Number(number), hesonhan)
        
        var totalitem = Number(number) * Number(hesonhan)
        Total_price+= Number(totalitem);
    });
    var timechat = new Date().toLocaleString()
    const thongbao = document.getElementsByClassName("poup_thongbao");
    thongbao[0].innerHTML = "[Hệ Thống] Đặt hàng <p style='color: #00b627; font-size: 1.5rem;'>" + listNameFood + ' </p>thành công! <br>' + timechat
    var order_total = document.getElementById("order-totals");
    order_total.innerHTML = Total_price.format(0, 3, '.', ',') + 'đ'
    
    if (Number(Total_price) > 0){
        document.getElementsByClassName("checkout")[0].disabled = false;
        document.getElementsByClassName("tick")[0].style.visibility="visible" 
    }else{
        document.getElementsByClassName("checkout")[0].disabled = true; 
        document.getElementsByClassName("tick")[0].style.visibility="hidden"
    }
        
}

async function dathang(){
    const success = await loadingpoup()
    if (success){
        document.getElementsByClassName("checkout")[0].disabled = true;
        document.getElementsByClassName("tick")[1].style.visibility="visible" 
        document.getElementsByClassName("tick")[0].style.visibility="hidden"
        const order_wrapper = document.getElementsByClassName("order-wrapper");

        list_order = ''
        order_wrapper[0].innerHTML= list_order;

        var order_total = document.getElementById("order-totals");
        order_total.innerHTML = 0 + 'đ'
    }
    
}
// console.log('abc')
// =========== format number ============== //
Number.prototype.format = function(n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};


 // ============= progressbar ==========//
 document.getElementsByClassName("poup")[0].style.visibility="hidden"
 async function loadingpoup(){
    return new Promise(function(resolve) {
    document.getElementsByClassName("poup")[0].style.visibility="visible"
    document.querySelector('.overlay').classList.add('showoverlay');
    const progressbar = document.getElementsByClassName('progress-bar')[0]
    progressbar.style.setProperty('--width', 100)
    const interval = setInterval(()=> {
        const computedStyle = getComputedStyle(progressbar)
        const width = parseFloat(computedStyle.getPropertyValue('--width')) || 0
        progressbar.style.setProperty('--width', width - .5)
        if (width<0){
            document.getElementsByClassName("poup")[0].style.visibility="hidden";
            document.querySelector('.overlay').classList.remove('showoverlay');
            clearInterval(interval)
            resolve(true)
        }
    }, 5)
 })
}
 