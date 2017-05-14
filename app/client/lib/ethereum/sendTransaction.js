/*
发送信息至交易中，并返回tx值
*/
if(typeof web3 !== 'undefined')
  web3 = new Web3(web3.currentProvider);
else
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  





//若账户余额小于0.01ether返回false，否则成功发送
checkBalance = function(GETACCOUNT1){
     if(web3.fromWei(web3.eth.getBalance(GETACCOUNT1),'ether')>0.01){
         return ture;
     }else return false;
}
exports.checkBalance = checkBalance;
// 发送交易
sendTranscation = function(writeHash){
        var tx = web3.eth.sendTransaction({from:accountFrom,to:accountTo,value:0,data:writeHash,gas:25000,gasPrice:20000000000});//gas25000成本约0.15元一次,交易池等待区块数2～5块。
        return tx;

    }
exports.sendTranscation = sendTranscation;

// 判断交易是否达成
ifTranscationSu = function(tx){
        if(web3.eth.getTransaction(tx).blockNumber==null) return false;
        else return true;
}
exports.ifTranscationfinal = ifTranscationSu;

