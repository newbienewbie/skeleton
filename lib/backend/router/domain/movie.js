const path=require('path');
const domain=require('../../domain/domain.js');
const videoProcess=require('../../movie-process/movie-process.js');
const express=require('express');
const bodyParser=require('body-parser');



const router=express.Router();

router.get('/list',function(req,res){

    let page=parseInt(req.query.page?req.query.page:1);
    page=page>0?page:1;
    let size=parseInt(req.query.size?req.query.size:10);
    size=size>0?size:5;

    domain.movie
        .findAndCountAll({
            offset:(page-1)*size,
            limit:size,
            order:[
                ['createdAt', 'desc'],
            ]
        })
        .then(movieResult=>{
            res.end(JSON.stringify(movieResult));
        })
        .catch(e=>{
            console.log(`[!] 异常发生：${e}`);
            res.end(JSON.stringify([]));
        });
});

router.post('/add',bodyParser.json() ,function(req,res){
    const movie=req.body;
    // 创建记录成功后的movie entity对象
    let _movieEntity;
    // 处理结果对象，用于返回至客户端
    const _result={
        result:'SUCCESS',
        message:'',
    };
    // 视频格式对象
    let _format;
    domain.movie
        .create(Object.assign({},movie,{ }))
        .then(movie=>{
            //先返回新增影片的处理结果，后续再处理探针、截屏操作
            res.end(JSON.stringify(_result));
            _movieEntity=movie;
            return movie;
        })
        .catch(e=>{
            //todo: 如何避免 res重复end() 的 错误？？
            _result.result="FAIL";
            _result.message="请求失败";
            res.end(JSON.stringify(_result));
            return _movieEntity;
        })
        // 探针
        .then(movieEntity=>{
            return videoProcess.getVideoFormat(path.resolve(movieEntity.url))
        })
        .then(
            (format)=>{
                console.log('探针处理完毕：',format);
                _format=format;
                return ;
            },
            (err)=>{
                console.log(err);
                throw(err);
            }
        )
        // 截屏
        .then(()=>{
            let directory=path.dirname(_format.filename);
            return videoProcess.takeScreenShot(movie.url,2,directory);
        })
        .then(outs=>{
            console.log(outs);
        })
        .catch(e=>{
            console.log(e);
        });
});

module.exports=router;