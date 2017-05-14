var ifTrue = require('/client/lib/ethereum/data/if_true.js');


if(typeof web3 !== 'undefined')
  web3 = new Web3(web3.currentProvider);
else
  web3 = new Web3(new Web3.providers.HttpProvider("120.24.61.145:8545"));

Template.searchone.events({
	'click .quedgm':function(event,tpl){
		event.preventDefault();
		var name=$('#name').val();
		var sex=$('#sex').val();
		var age=$('#age').val();
		var certname=$('#certname').val();
		var level=$('#level').val();
		var unit=$('#unit').val();
		var tx=$('#tx').val();
        clt = Meteor.users.findOne({username:unit});
        if (clt==undefined){alert("证书未认证"); return 0;}
        clt = Meteor.users.findOne({username:unit});
        var eduEthAddress =clt.profile.ethAddress;
        if(eduEthAddress==undefined)  eduEthAddress = null//需要修改为获得证书的教育机构ethAddress
		var getJson = {'name':name,'sex':sex,'age':age,'certname':certname,'level':level,'unit':unit};
        var getJson = JSON.stringify(getJson);
        //console.log(ifTrue.ifTrue(tx,eduEthAddress,getJson));
        //检查Hex格式是否正确
        for(i=0;i<65;i++){
            if(tx[i]!='0' && tx[i]!='1' && tx[i]!='2' && tx[i]!='3' && tx[i]!='4' && tx[i]!='5' && tx[i]!='6' && tx[i]!='7' && tx[i]!='8' && tx[i]!='9' && tx[i]!='a' && tx[i]!='b' && tx[i]!='c' && tx[i]!='d' && tx[i]!='e' && tx[i]!='f'){
                txData = false;
                break;
            }else{
                if(i==64)txData = true;
            }
        }
        //console.log(txData);
        if(txData==true && tx.length == 65){
        
            if(ifTrue.ifTrue(tx,eduEthAddress,getJson)==true){
                alert("证书为真！");
            }else  alert("证书为假！");
                
                
        
            

	}else alert('验证码格式错误，证书为假！');
    }
})

