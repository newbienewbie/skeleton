const path=require('path');
const fs=require('fs');



const argvs=process.argv.slice(2);
let BASE_PATH=argvs.shift();    // eg: `C:/Users/itminus/pdfs`;
let outfile=argvs.shift();      // eg: 'output.txt'

if(!BASE_PATH){
    console.log(`usage: node list-files.js <directory> <outfile>`);
}else{
    BASE_PATH=BASE_PATH.split(path.sep).join("/");
    if(!outfile){
        outfile="out.txt";
    }
    const outStream=fs.createWriteStream(outfile);
    lsRecursive(BASE_PATH,outStream);    
}


/**
 * 递归式列出目标文件夹下所有文件，将结果输出到可写流中
 * @param {String} dir : 目标文件夹路径
 * @param {WritableStream} outStream 可写流
 * @param {String} sepString  控制输出格式的分隔字符串，默认为"|"
 */
function lsRecursive(dir,outStream,sepString="|"){
    fs.readdir(dir,function(err,files){
        if(err){
            console.log(err);
        }else{
            // 剔除当前目录和上级目录
            files.filter(i=>{
                return i!="." && i!=".." ;
            }).forEach((item,key)=>{
                const p=path.join(dir,item);
                const stat=fs.statSync(p);
                if(  stat.isFile()){
                    // 计算相对URL，同时替换"\" 为“/”
                    const _p=p.split(path.sep).join("/")    // 统一设置\ 为 /
                    .replace(BASE_PATH,"")          // 移除 BASE_PATH
                    .replace(/^\//,"")              // 移除当前最前面的"/"
                    const title=getTitleFromFileName(item);  // 计算书名    
                    outStream.write(`${title}${sepString}${_p}\r\n`);   // 由于Windows下文件名不能包含|字符，故可以用之分割
                }else{
                    lsRecursive(p,outStream,sepString);
                }
            })
        }
    }); 
}


/**
 * 从文件名中推算书名
 * @param {String} name  文件名
 */
function getTitleFromFileName(name){
    const regex=new RegExp(/(.*)\.(.*?)$/);
    const result=regex.exec(name);
    return result[1];
}