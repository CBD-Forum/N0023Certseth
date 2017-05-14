/*
获取值：教育机构申请账号，本地调用--ACCOUNT
       查询信息Json值，外部传入--getJson
       查询区块交易Tx值，外部传入--tx
*/
var txData = require('/client/lib/data/toTx.js');
var ifTrue = function(verification,eduAddress,getJson){
    var isConnected =function(){
        if(!web3.isConnected())return false;
        else return true;
    }
    //判断tx值是否有效，tx值格式在tx传入函数前就先进行了判断 
    var isExist = function(verification){
        if(web3.eth.getTransaction(txData.toTx(verification))==null)return false;
        else return true;       
    }
    //查找input值
    var getInput = function(verification){
         var getData = web3.eth.getTransaction(txData.toTx(verification)).input;
         return getData;
     }
     //查找blockNumber
    var getBlockNumber = function(verification){
         var blockNumber = web3.eth.getTransaction(txData.toTx(verification)).blockNumber;
         return blockNumber;
     }
     //查找交易hash
    var getTransactionHash = function(verification){
          var TransactionHash = web3.eth.getTransaction(txData.toTx(verification)).hash;
          return TransactionHash;
      }
      //查找交易发起方地址
    var getFrom = function(verification){
          return web3.eth.getTransaction(txData.toTx(verification)).from;
      }
            
    var txTrue = isExist(verification);//判断tx是否存在
    if(txTrue==true){       
        var getSendAddress =getFrom(verification);
        var ifAddressSame = function(eduAdd,getSendAddress){
            if(eduAdd!=getSendAddress) return false;
            else return true;
        }

    //判断Hash值是否一致
    var jsonHash = web3.sha3(getJson);
    //在传入前线判断节点是否连接，输入tx值是否有效。（在get_fromchain.js中）
    var chainData = getInput(verification);//传入输入的tx值
    var dataJson = JSON.parse(web3.toAscii(chainData));
    var chainHash = dataJson[txData.toNum(verification)];
    
    var ifHashSame = function(jsonHash,chainHash){//判断HASH值
        if(jsonHash==chainHash) return true;
        else return false; 
    }




    var addressTrue = ifAddressSame(eduAddress,getSendAddress);//判断是否与教育机构地址一致
    var jsonHashTrue = ifHashSame(jsonHash,chainHash);//判断Hash值是否一直
        if(isConnected()==true){
            if(addressTrue==true && jsonHashTrue==true){
                return true;
            }else return false;               
        }else return 2;//节点为链接成功返回2
    }else return false;
}
exports.ifTrue = ifTrue;

