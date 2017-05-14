var transcation = require("/client/lib/ethereum/ethTransaction.js");
var DATA = require("/client/lib/ethereum/data/constants.js");
var formatData = [];
Template.certmany.helpers({
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



/*------------------certs集合说明----------------
num为关键字段，从０计数
field:value
1、num:0,total:证书总数,verify:全部tx值是否验证完成
2、num:其他,hashs:存储13个哈希值,tx:交易返回值,verify:tx是否验证完成
-----------------------------------------------*/

/*-------------------csv2clt--------------------
功能：读取csv文件，哈希每一行数据，每13个哈希值存储到１个文档中
输入：fileData
输出：输出到集合中
-----------------------------------------------*/
csv2clt = function(fileData){
		  var data = fileData.split('\r\n');
		  if(data[0]==fileData)
		  {
			  data = fileData.split('\n');
		  }
		  if(data[0]==fileData)
		  {
			  data = fileData.split('\r');  
		  }
		  //------------------------------------------
		  //此处改为数据检查函数
		  //formatData = check(data);
		  for(var i=0;i<data.length;i++)
		  {
			  if(data[i]=="")
			  {
				  	data.splice(i,1);
					i--;
			  }
		  }
		  formatData = data;
		  //------------------------------------------

		  var keys = data[0].split(",");
		  //Certs.remove();
		  Certs.insert({num:0,total:data.length-1,verify:false});
          for(var i=0,temp={};i<data.length-1;i++) 
		  {
               var hash = "";
			   var json ={};
			   values = data[i+1].split(",");　
			   for(var j=0;j<keys.length;j++)
			   {
				   json[keys[j]] = values[j];
			   }
			   json['edu'] = Meteor.user().profile.username;
			   hash = web3.sha3(JSON.stringify(json));
			   console.log(json);
			   console.log(hash);
			   temp[i%13] = hash;
			   if((i+1)%13==0||i==data.length-2)
			   {
					Certs.insert({num:parseInt(i/13)+1,hashs:web3.toHex(JSON.stringify(temp)),verify:false});
					temp={};
			   }
			   
		  }
}

var accountTo = DATA.mainAccount//发送交易给主账号



Template.certmany.events({


'change .addpic':function(event){
	  var file=event.target.files[0];
	  var reader=new FileReader();
	  reader.onload=function(e){
		  csv2clt(e.target.result);
	  }
	  reader.readAsText(file);
	  
},


	  'click .logout': function(event){
         event.preventDefault();
         Meteor.logout(function(error) {
            if(error) {
               console.log("ERROR: " + error.reason);
            }
         });
        Router.go('/');
      },
	'click a.xiazai':function(event){
        var total = Certs.findOne({num:0}).total;
		var times = (parseInt(total/13))+((total%13)?1:0);//需要发送交易的次数
		//var csv = "num,verification";
		var csv = "";
		var enter = escape('\n');
		var edu = Meteor.user().profile.username;
		var verification = "";
		csv = formatData[0] + ",edu,verification"+enter;
		for(var i=0;i<times;i++)
		{
			tx = Certs.findOne({num:i+1}).tx;
			for(var j=0;j<((i==times-1)?(total%13):13);j++)
			{
				verification = tx.substring(2,66) + web3.toHex(j)[2];
				//csv += enter+(i*13+j+1)+','+verification;
				csv += formatData[i*13+j+1]+","+edu+','+verification+enter;
			}
		}
		event.target.href = "data:text/csv;chartset = utf-8,"+csv
},

'click .quedg':function(event,tpl){
	
	event.preventDefault();
	
	var passwd=$('#mima').val();
	var accountFrom = Meteor.users.findOne(Meteor.userId()).profile.ethAddress;//获取到教育机构账户

　　if(Meteor.users.findOne(Meteor.userId()).profile.ethAddress==null){
	s8.innerHTML='还未设置签发密码！';
			   
         s1.style.color='red';
          return 0;

}

	web3.personal.unlockAccount(accountFrom,passwd,function(err){
	if(err)  
	 {
		
         s8.innerHTML='签发密码错误！';
			   
         s8.style.color='red';
          return false;
　　 }

    else if(transcation.checkBalance(accountFrom)==false)alert("账户余额不足，请及时充值！");
		 else{
				var total = Certs.findOne({num:0}).total;
				var times = (parseInt(total/13))+((total%13)?1:0);//需要发送交易的次数
		
				//计算gas

				//s2.innerHTML='证书正在写入区块链';
				for(var i=0;i<times;i++)
				{
					console.log("写入第"+(i*13+1)+"~"+(i==times-1?total:i*13+13)+"个");
					cert = Certs.findOne({num:i+1});
					var tx =transcation.sendTransaction(cert.hashs,accountFrom,accountTo);
					Certs.update(cert._id,{$set:{tx:tx}});
				}
				//检验
			/*	for(var i=0;i<times;i++)
				{
					cert = Certs.findOne({num:i+1});
					tx = cert.tx;
					if(transcation.ifTranscationSu(tx)==true)
					{
						Certs.update(cert._id,{$set:{verify:true}});

					}
					else
				{
				
			}
		} 
		*/
		//	s2.innerHTML='证书写入成功';
		alert("证书写入成功！");
		 s8.innerHTML='<a class="xiazai"  download="test.csv">下载已写入证书</a>';
		 s8.style.color='red';
    }

	
	
	
	});
    
  }
});

	
