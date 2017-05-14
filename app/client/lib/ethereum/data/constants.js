/*
定义常用常量，方便修改查询
*/

if(typeof web3 !== 'undefined')
  web3 = new Web3(web3.currentProvider);
else
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  

exports.mainAccount = web3.eth.coinbase;//自定义中心账户
exports.ethValue = web3.toWei('0.1','ether');//定义创建账户后，向机构账户发送多少以太币
exports.RMB = 100;//测试制定充值人民币数量

