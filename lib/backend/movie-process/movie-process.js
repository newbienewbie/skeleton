const fs=require('fs');
const ffmpeg=require('fluent-ffmpeg');



/**
 * 根据文件路径，获取视频的格式信息，如播放时长、比特率、编码格式等信息
 */
function getVideoFormat(infile){
    return new Promise(function(resolve,reject){
        fs.exists(infile,function(is){
            if(!is){
                reject('文件不存在');
            }else{
                ffmpeg.ffprobe(infile,(err,metadata)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(metadata.format);
                    }
                });
            }

        });
    });
};

/**
 * 截图
 */
function takeScreenShot(infile,count=4,outdir=__dirname,pattern="%b-%i-%s"){
    return new Promise(function(resolve,reject){
        fs.exists(infile,function(is){
            if(!is){
                reject('文件不存在');
            }else{
                ffmpeg(infile)
                    .screenshots({count:count, filename:pattern})
                    .on('filenames',function(filenames){
                        console.log('即将开始截图,拟生成文件：'+filenames.join(', '));
                    })
                    .on('end',function(){
                        resolve('截图完成');
                    })
                    .on('error',function(err){
                        console.log(err);
                        reject(err);
                    });
            }
        });
    });
}



module.exports={
    getVideoFormat,
    takeScreenShot,
};