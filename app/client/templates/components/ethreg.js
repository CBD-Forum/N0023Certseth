var autoSend = require('/client/lib/ethereum/ethTransaction.js');//引用自动发送以太币函数
var Data = require('/client/lib/ethereum/data/constants.js');//引用常量
var Passwd = Data.PASSWD;
var fromAddress = Data.mainAccount;
var ethValue = Data.ethValue;
Template.ethreg.helpers({
	islogin:function(){
		return Meteor.userId();
	},
	user:function(){
		return{
			id:Meteor.user()._id,
			username:Meteor.users.findOne(Meteor.userId()).profile.username,
			email:Meteor.user().emails[0].address
		};
	}
	
});

//教育结构登陆后，首先判断以太坊账号是否存在，如存在就不跳转到以太坊账户注册界面，如果不存在就需要在登陆后跳转注册界面
Template.ethreg.events({
         'click .logout': function(event){
         event.preventDefault();
			
         Meteor.logout(function(error) {
            if(error) {
               console.log("ERROR: " + error.reason);
            }
         });
        Router.go('/');
      },
    'click .dl_sub':function(event,tpl){
         event.preventDefault();
         
         if(Meteor.users.findOne(Meteor.userId()).profile.ethAddress==null){//判断以太坊账户是否存在，

         inputData1 = $('#mima1').val();
       
         inputData2 = $('#mima2').val();
         if(inputData1==inputData2&&inputData1!=""&&inputData2!=""){
              var address = web3.personal.newAccount(inputData2);
              
               s3.innerHTML='密码设置成功！';
   　　　　　　　s3.style.color='red';
  
            
              Meteor.users.update(Meteor.userId(),{$set:{'profile.ethAddress':address}});
              var sendAddress = Meteor.users.findOne(Meteor.userId()).profile.ethAddress;//机构注册以太坊账户
              autoSend.unlockMain(fromAddress,'mwtbeemong');
              autoSend.sendEth(sendAddress,fromAddress,ethValue);
              window.setTimeout("window.location='/edu'",2000);
       }else if(inputData1!=inputData2) {
               s3.innerHTML='密码不一致！';
   s3.style.color='red';
   return false;
            }
            else if(inputData1==""&&inputData2==""){
      s3.innerHTML='密码不能为空！';
   s3.style.color='red';
   return false;
            }
    //alert("密码不一致！");
	
		  }else  {
               s3.innerHTML='您已设置密码';
   s3.style.color='red';
   return false;
            }　//alert('以太坊账号已存在');
  }
});
