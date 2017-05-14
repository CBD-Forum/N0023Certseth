Template.regmail.events({
    'submit form': function(event,tpl){
		event.preventDefault();
        
        var userType = 'edu';  //用户类型
        　//教育机构名称
         
        var email = tpl.$('#email').val();　//邮箱
        var password = tpl.$('#password').val();　//账户密码
       
        
        var password2 = tpl.$('#password2').val();
        var registerData={
           
            email:email,
            password:password,
            profile:{userType:userType}
        }
        var num=0;
        var word=0;
        var bword=0;
        var other=0;
         for(i=0;i<password.length;i++){
          
             if((password[i]>="0") && (password[i]<="9")) {
              num++;
          }
             else if((password[i]>="a") && (password[i]<="z")) {
              word++;
          }

             else if((password[i]>="A") && (password[i]<="Z")) {
             bword++;
          }
          else {
             other++;
          }
      };
      if(num==0||word==0||bword==0||other!=0){
          
      pw.innerHTML='密码格式错误!（须包括字母大小写和数字）';
   pw.style.color='red';
   return 0;
      }
         if(password!=password2){
                   pw.innerHTML='密码不一致';
   pw.style.color='red';
   return 0;
      }
      if(password!=password2){
                   pw.innerHTML='密码不一致';
   pw.style.color='red';
   return 0;
      }
        Accounts.createUser(registerData,function(error){
            if(Meteor.user()){
                console.log(Meteor.userId());
            }
            else{
                console.log("ERROR"+error.reason);
            }
        });
        Router.go('/eduless');
    
	
    }
});


