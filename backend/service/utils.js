const path=require('path');

/**
 * 获取文件路径中的文件名，不含后缀，不含路径，只是文件名本身
 * @param {*} file_path 
 */
function getFileName(file_path){
    return path.parse(file_path).name;
}

/**
 * 根据文件路径及其中的某个路由名合成资源名
 * @param {*} file_path 
 * @param {*} routeName 
 */
function getResourceName(fileName,routeName){
    return `${fileName}/${routeName}`;
}



function _startWith(str='',s=''){
    const ss=str.slice(0,s.length);
    return ss===s;
}
function _installPage(resourceName){
    return _startWith(resourceName,"install/");
}
function _account(resourceName){
    return resourceName==='account/login-page'
        || resourceName==="account/login-process"
        || resourceName==="account/sign-out"
        || resourceName==="account/sign-up-page"
        || resourceName==="account/sign-up-process";
}

function shouldPassBy(resourceName){
    return _installPage(resourceName) || _account(resourceName);
};

module.exports={
    getFileName,
    getResourceName,
    shouldPassBy,
};