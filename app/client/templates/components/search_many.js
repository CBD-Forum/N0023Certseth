var ifTrue = require('/client/lib/ethereum/data/if_true.js');
var formatData=[];


query = function()
{
    for(var i=0;i<formatData.length;i++)
    {
    	  if(formatData[i]=="")
		  {
			 	formatData.splice(i,1);
				i--;
		  }
	  }
    var keys = formatData[0].split(",");
    formatData[0] += ",result";
    for(var i=0;i<formatData.length-1;i++) 
	{
        var verification = formatData[i+1].split(",")[keys.length-1];
        var edu = formatData[i+1].split(",")[keys.length-2];
		var json ={};
		values = formatData[i+1].split(",");　
		for(var j=0;j<keys.length-1;j++)
		{
			 json[keys[j]] =values[j]; 
		} 
        console.log(json);
        console.log(web3.sha3(JSON.stringify(json)));
        var clt = Meteor.users.findOne({'profile.username':edu});
        if(clt==undefined){
           formatData[i+1] += ",false";continue; 
        }
        var eduEthAddress =clt.profile.ethAddress;
        if(ifTrue.ifTrue(verification,eduEthAddress,JSON.stringify(json))==true)
        {
            formatData[i+1] += ",true";
        }
        else
        {
            formatData[i+1] += ",false";
        }
   }
}
Template.searchmany.events({
   
    'change .query':function(event){
	    var file=event.target.files[0];
	    var reader=new FileReader();
	    reader.onload=function(e){
            fileData = e.target.result;
            var data = fileData.split('\r\n');
		  if(data[0]==fileData)
		  {
			  data = fileData.split('\n');
		  }
		  if(data[0]==fileData)
		  {
			  data = fileData.split('\r');  
		  }
          formatData = data;
            //改为formatData = check(e.target.result);
	     }
	    reader.readAsText(file);
    },
    'click .quedgm':function(event,tpl){
         event.preventDefault();
        query();
        s1.innerHTML='<a class="xiazai" download="queryResult.csv">下载查询结果</a>';
        
    },
    'click a.xiazai':function(event){
        var csv = "";
        var enter = escape('\n');
        for(index in formatData)
        {
            csv += formatData[index]+enter;
        }
        event.target.href = "data:text/csv;chartset = utf-8,"+csv;
    },
     'click .logout': function(event){
         event.preventDefault();
			
         Meteor.logout(function(error) {
            if(error) {
               console.log("ERROR: " + error.reason);
            }
         });
        Router.go('/');
      }


})
Template.searchmany.helpers({
	islogin:function(){
		return Meteor.userId();
	},
	user:function(){
		return{
			username:Meteor.users.findOne(Meteor.userId()).profile.username,
			email:Meteor.user().emails[0].address,
            call:Meteor.users.findOne(Meteor.userId()).profile.call,
            address:Meteor.users.findOne(Meteor.userId()).profile.address,
            ethaddress:Meteor.users.findOne(Meteor.userId()).profile.ethAddress,
		};
	}
	
});