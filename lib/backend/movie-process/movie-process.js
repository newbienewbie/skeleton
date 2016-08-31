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
 * 截图:
 * 绝大数情况下，应该提供前3个参数，其中count是指按进度截取几张，outdir是指存放路径
 */
function takeScreenShot(infile,count=4,outdir=__dirname,pattern="%b-%i-%s"){
    return new Promise(function(resolve,reject){
        let _outs={
            path:outdir,
            filenames:[],
        };
        fs.exists(infile,function(is){
            if(!is){
                reject('文件不存在');
            }else{
                ffmpeg(infile)
                    .screenshots({count:count, filename:pattern},outdir)
                    .on('filenames',function(filenames){
                        _outs.filenames=filenames;
                        _outs.path=outdir;
                    })
                    .on('end',function(){
                        resolve(_outs);
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