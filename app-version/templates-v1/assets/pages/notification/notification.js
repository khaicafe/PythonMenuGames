  'use strict';
  axios.interceptors.response.use( (response) =>{
    console.log('sau khi response!!!')
    // const config = response.config;
  //   document.getElementById("popuploadingmain").style.visibility="hidden";
    // if (config.url.indexOf('Login') >=0 || config.url.indexOf('refeshtoken') >=0){
    //     // nhung router khong can check token
    //     return response;
    // }
    // const code = response.data.status;
    // console.log("after Res",response.status)
  
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
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
  
    // $.getscript("http://127.0.0.1:8100/assets/pages/notification/notification.js",function(){
        var nFrom = 'top';
        var nAlign = 'right';
        var nIcons = '';
        var nType = 'success';
        var nAnimIn = '';
        var nAnimOut = '';
        console.log('dsdsaf',nFrom, nAlign, nIcons, nType, nAnimIn, nAnimOut);
        notify(nFrom, nAlign, nIcons, nType, nAnimIn, nAnimOut);
      // });
   
  
    localStorage.clear()
    return Promise.reject(err)
    // return err;
  })


  
$(window).on('load',function(){
    //Welcome Message (not for login page)
    function notify(message, type){
        $.growl({
            message: message
        },{
            type: type,
            allow_dismiss: false,
            label: 'Cancel',
            className: 'btn-xs btn-inverse',
            placement: {
                from: 'bottom',
                align: 'right'
            },
            delay: 2500,
            animate: {
                    enter: 'animated fadeInRight',
                    exit: 'animated fadeOutRight'
            },
            offset: {
                x: 30,
                y: 30
            }
        });
    };

   
        notify('Welcome to Notification page', 'inverse');
   
});

// $(document).ready(function() {
   
    /*--------------------------------------
         Notifications & Dialogs
     ---------------------------------------*/
    /*
     * Notifications
     */
    function notify(from, align, icon, type, animIn, animOut){
        console.log(from, align, icon, type, animIn, animOut)
        $.growl({
            icon: icon,
            title: ' Bootstrap Growl ',
            message: 'Turning standard Bootstrap alerts into awesome notifications',
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
            delay: 2500,
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

    $('.notifications .btn').on('click',function(e){
        e.preventDefault();
        // console.log('kkkk')
        var nFrom = $(this).attr('data-from');
        var nAlign = $(this).attr('data-align');
        var nIcons = $(this).attr('data-icon');
        var nType = $(this).attr('data-type');
        var nAnimIn = $(this).attr('data-animation-in');
        var nAnimOut = $(this).attr('data-animation-out');
        

        notify(nFrom, nAlign, nIcons, nType, nAnimIn, nAnimOut);
    });

// });

