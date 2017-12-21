const path=require('path');
const domain=require('../../domain');
const {categoryService,movieService}=require('../../service');
const express=require('express');
const bodyParser=require('body-parser');
const {calculatePaginationInfo}=require('pagination-info');
const {Middleware,message}=require('tiny-service');



const jsonMiddleware=bodyParser.json();
const middleware=Middleware(movieService);

function detail(req,res){
    let id=req.params.id;
    id=parseInt(id);
    domain.movie.findById(id)
        .then(movie=>{
            res.json(movie);
        })
        .catch(e=>{
            res.json(message.fail(e));
            console.log(e);
        });;
}

function create(req,res){
    const movie=req.body.record;
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
            res.json(message.success());
            _movieEntity=movie;
            return movie;
        })
        .catch(e=>{
            res.json(message.fail(e));
            throw e;
        })
        // 探针
        .then(movie=>{
            return movieService.getVideoFormat(path.resolve(movie.url))
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
            return movieService.takeScreenShot(movie.url,2,directory);
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
            return Promise.all([
                domain.screenshot.bulkCreate(shots),
                domain.movie.update(
                    { posterUrl:shots[0].url, },
                    { where:{
                        $and:{
                            id:_movieEntity.id,
                            $or:{posterUrl:null},
                        }
                    }}
                ),
            ]);
        })
        .catch(e=>{
            console.log(e);
        });
}

function detailPlayPage(req,res){
    const id=req.params.id;
    let categories=[];

    categoryService.tree({
        'scope':'post'
    })
    .then(list=>{
        categories=list;
    })
    .then(_=>{
        return movieService.findById(id)
    })
    .then((movie)=>{
        res.render("movie/play.njk",{
            categories,
            convertCategoryIdToHref:id=>`/movie?categoryId=${id}`,
            movie,
        });
    });
}

function index(req,res){
    let {categoryId,page,size}=req.query;
    page=page?parseInt(page):1;
    page=page>0?page:1;
    size=size?parseInt(size):8;
    size=size>0?size:8;

    let categories=[];
    let movies={rows:[],count:0}; 
    movieService.recent(categoryId,page,size)
        .then((results)=>{
            movies=results;
        })
        .then(_=>{
            // 获取相关的 分类 信息
            return categoryService.tree({
                scope:'movie'
            })
            .then(list=>{
                categories=list;
            });
        })
        .then(_=>{
            const pagesInfo=calculatePaginationInfo(movies.count,size,page,5);
            res.render("movie/index.njk",{
                movies,
                pagesInfo,
                categories,
                convertPageToHref:page=>{
                    const conditions=[ `page=${page}`, `size=${size}`, ];
                    if(categoryId){
                        conditions.push(`categoryId=${categoryId}`);
                    }
                    return `/post?${conditions.join('&')}`
                },
                convertCategoryIdToHref:id=>`/movie?categoryId=${id}`,
            }); 

        });

}

routes={
    'detail':{
        method:'get',
        path:'/detail/:id',
        middlewares:[detail],
    },
    'list':{
        method:'post',
        path:'/list',
        middlewares:[jsonMiddleware,middleware.list],
    },
    'create':{
        method:'post',
        path:'/create',
        middlewares:[jsonMiddleware,create],
        allowRoles:['ROLE_ADMIN',],
    },
    'play':{
        method:'get',
        path:'/play/:id',
        middlewares:[detailPlayPage],
    },
    'index':{
        method:'get',
        path:'/',
        middlewares:[index],
    },
};


module.exports={
    mount:'/movie',
    routes,
};