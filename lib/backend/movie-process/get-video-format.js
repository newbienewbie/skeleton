const ffmpeg=require('fluent-ffmpeg');



function getVideoFormat(path){
    return new Promise(function(resolve,reject){
        ffmpeg.ffprobe(path,(err,metadata)=>{
            if(err){
                reject(err);
            }else{
                resolve(metadata.format);
            }
        });
    });
};



module.exports=getVideoFormat;