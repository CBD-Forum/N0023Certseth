// 判断交易是否达成
ifTranscationSu = function(tx){
        if(web3.eth.getTransaction(tx).blockNumber==null) {alert('证书正在写入区块链'); //return false;
    }
        else {
			alert('交易成功');
            return true;
		}
}

ifTranSuccess = function(tx){
var timer = setInterval(ifTranscationSu,1000,tx);
    if(ifTranscationSu(tx)==true) timer.unref();
};
exports.ifTranSuccess = ifTranSuccess;