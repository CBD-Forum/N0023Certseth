//当机构需要充值时，得到充值以太坊账户请求，并向机构地址发送请求数量的以太币
//以太币数量由云币网api与客户请求数量，经过换算后得到，采取充值金额与以太币时时价格挂钩

import { HTTP } from 'meteor/http'
var Data = require('/client/lib/ethereum/data/constants.js');//引用常量
var unLock = require('./ethTransaction');
var mainAddress = Data.mainAccount;
var CNY = Data.RMB;

    requestEth = function(getEthAddress){
        HTTP.get('https://yunbi.com//api/v2/tickers/ethcny.json',function(err,res){
       
        var ethcny = res.data.ticker.last;
        var ethNum = (CNY/ethcny).toString();
        var numbers = web3.toWei(ethNum,'ether');
        unLock.unlockMain(mainAddress);
        web3.eth.sendTransaction({from:mainAddress,to:getEthAddress,value:numbers});
    
        });
    }

exports.requestEth=requestEth;
