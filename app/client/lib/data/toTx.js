/*-------------------toTX.js--------------------
1.toTx 
功能：获取验证码后转换为tx值
输入：验证编码
输出：tx值
2.toNum
功能：获取验证码后转化为tx中序号
输入：验证编码
输出：序号
--------------------------------------------*/
toTx = function(string){
    var tx = "0x"+string.substring(0,64);
    return tx;
}
toNum = function(string){
    var hex = "0x"+string.substring(64,66);
    var num = parseInt(hex,16);
    return num;
}
exports.toTx = toTx;
exports.toNum = toNum;