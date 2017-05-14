//解锁中心账户
//以太币发送函数
var Data = require('/client/lib/ethereum/data/constants.js');
var Passwd = Data.PASSWD;
unlockMainAddress = function(fromAddress){
    web3.personal.unlockAccount(fromAddress,'mwtbeemong');
}
sendEth = function(sendAddress,fromAddress,ethValue){
    web3.eth.sendTransaction({from:fromAddress,to:sendAddress,value:ethValue});
}
checkBalance = function(GETACCOUNT1){
     if(web3.fromWei(web3.eth.getBalance(GETACCOUNT1),'ether')>0.01){
         return true;
     }else return false;
}

sendTransaction = function(writeHash,accountFrom,accountTo){
        var tx = web3.eth.sendTransaction({from:accountFrom,to:accountTo,value:0,data:writeHash});//gas25000成本约0.15元一次,交易池等待区块数2～5块。
        return tx;
    }

ifTranscationSu = function(tx){
        if(web3.eth.getTransaction(tx).blockNumber==null) return false;
        else if(web3.eth.blockNumber-(web3.eth.getTransaction(tx).blockNumber)<5)return false;
             else return true;
}
exports.unlockMain = unlockMainAddress;
exports.sendEth = sendEth;
exports.checkBalance = checkBalance;
exports.sendTransaction = sendTransaction;
exports.ifTranscationSu = ifTranscationSu;
