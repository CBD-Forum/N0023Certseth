Template.loginmail.events({
    

  'click .aaa':function(event){
var code;
    code = "";   
     var codeLength = 4;//验证码的长度  
     var checkCode = document.getElementById("code");   
     var random = new Array(0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');//随机数  
     for(var i = 0; i < codeLength; i++) {//循环操作  
var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）  
        code += random[index];//根据索引取得随机数加到code上  
    }  
    checkCode.value = code;
              var ranColor = '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6); //随机生成颜色
    	// alert(ranColor)
    	var ranColor2 = '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6); 
    $("#code").html(code);  
        if ($("#code").hasClass("code")) {  
            $("#code").removeClass("code");  
            $("#code").addClass("code"); 
           
        }  
        $("#code").css('background',ranColor);
         $("#code").css('color',ranColor2);

    },

      
   

    'click button':function(event,tpl){
        event.preventDefault();
        var email = tpl.$('#email').val();
        var password = tpl.$('#password').val();
       
       
        //var s1=$("s1");
        Meteor.loginWithPassword(email, password, function(error){
            if (Meteor.user()) {
               console.log(Meteor.userId());
               
                     Router.go('/edu');
            } else {
                
               s1.innerHTML='密码错误';
   s1.style.color='red';
   return false;
            }
         });
        
               
    }
})

