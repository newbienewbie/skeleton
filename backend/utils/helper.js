
function toPositiveInteger(s){
    let result=parseInt(s);
    result=result>0?result:1;
    return result;
}



module.exports={
    toPositiveInteger,
};