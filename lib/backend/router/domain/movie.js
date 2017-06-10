const path=require('path');
const domain=require('../../domain');
const videoProcess=require('../../service/movie-process/movie-process.js');
const checker=require('../../service/auth/authorization-checker');
const express=require('express');
const bodyParser=require('body-parser');



const router=express.Router();
router.get('/detail/:id',checker.requireLogin());
router.get('/detail/:id',function(req,res){
    let id=req.params.id;
    id=parseInt(id);
    domain.movie.findById(id)
        .then(movie=>{
            res.end(JSON.stringify(movie));
        })
        .catch(e=>{
            const _result = {
                result: 'FAIL',
                message: '异常',
            };
            res.end(JSON.stringify(_result));
            console.log(e);
        });;
});



router.get('/list',checker.requireLogin());
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

router.post('/list',checker.requireLogin());
router.use('/list',bodyParser.json());
router.post('/list',function(req,res){

    let {_page,_size,condition}=req.body;
    let page=parseInt(!!_page?_page:1);
    page=page>0?page:1;
    let size=parseInt(!!_size?_size:10);
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



router.post('/add',checker.requireLogin());
router.post('/add',bodyParser.json() ,function(req,res){
    const movie=req.body;
    // 处理结果对象，用于返回至客户端
    const _result={
        result:'SUCCESS',
        message:'',
    };

    if(!movie.posterUrl){
        movie.posterUrl=null;
    }
    // 视频格式对象
    let _format;
    // 创建了的movie实体对象
    let _movieEntity;
    domain.movie
        .create(Object.assign({},movie,{ }))
        .then(movie=>{
            //先返回新增影片的处理结果，后续再处理探针、截屏操作
            res.end(JSON.stringify(_result));
            _movieEntity=movie;
            return movie;
        })
        .catch(e=>{
            _result.result="FAIL";
            _result.message="请求失败";
            res.end(JSON.stringify(_result));
            throw e;
        })
        // 探针
        .then(movie=>{
            return videoProcess.getVideoFormat(path.resolve(movie.url))
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
        // 截屏，总是位于影片同一目录下
        .then(()=>{
            let directory=path.dirname(_format.filename);
            return videoProcess.takeScreenShot(movie.url,2,directory);
        })
        .then(outs=>{
            // 计算影片的相对URL
            const base=_movieEntity.url.slice(0,_movieEntity.url.lastIndexOf("/"));
            // 计算截图的相对URL
            const shots=outs.filenames.map(f=>{
                return {
                    movieId:_movieEntity.id,
                    url:base+"/"+f,
                };
            });
            console.log(shots);
            domain.screenshot.bulkCreate(shots);
            domain.movie.update(
                { posterUrl:shots[0].url, },
                { where:{
                    $and:{
                        id:_movieEntity.id,
                        $or:{posterUrl:null},
                    }
                }}
            );
        })
        .catch(e=>{
            console.log(e);
        });
});

module.exports=router;