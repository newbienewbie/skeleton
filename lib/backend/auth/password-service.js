const bcrypt=require("bcryptjs");

/**
 * 比较明文和某一个hash是否相匹配
 */
function compare(plaintext,hash) {

    return new Promise((resolve,reject)=>{
        bcrypt.compare(plaintext,hash,function (err,res) {
            if(err){
                reject(res);
            }
            else{
                resolve(res);
            } 
        });
    });
}


/**
 * 使用明文生成hash
 */
function generate(plaintext) {
    return new Promise((resolve,reject)=>{
        bcrypt.genSalt(10,function (err,salt) {
            bcrypt.hash(plaintext,salt,function (err,hash) {
                if(err){
                    reject(err);
                }else{
                    resolve(hash);
                }
            });
        });
    });
}



module.exports={
    compare:compare,
    generate:generate,
};