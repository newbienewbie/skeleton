const domain=require('../../domain');
const keywordService=require('../keyword')("movie");
const categoryService=require('../common/category');
const {Service,message}=require('tiny-service');



const movieService=Service(domain.movie);


const _create=movieService.create;
/**
 * 创建影片的服务
 * @param {Object} movie 影片对象模型，
 * @param {Array} movie.keywords
 * @return {Promise} 返回创建的影片对象的Promise
 */
movieService.create= function create(movie){
    return _create(movie)    // 创建 movie
        // 创建附属信息
        .then(m=>{       
            if(!movie.keywords || !Array.isArray(movie.keywords)){
                return m;
            }else{
                return keywordService.create(m.id,movie.keywords)
                    // 返回创建的文章对象
                    .then(_=>m);
            }
        });
}



/**
 * @param {Integer} 影片id id
 * @param {Promise} 影片JSON对象
 */
movieService.findById= function findById(id=1){
    return domain.movie.findById(id,{
        include:[
            {
                model:domain.language,
            },
            {
                model:domain.country,
            },
        ]
    }).then(movie=>{
        if(!movie){
            return {};
        }
        // 创建一个拷贝
        const m=JSON.parse(JSON.stringify(movie));
        // 获取关键词
        return keywordService.findAllByTopicId(movie.id)
        .then(keywords=>{ 
            // 设置找到的关键词到之前拷贝的对象上
            m.keywords=keywords.map(i=>{
                return {
                    id:i.id,
                    tag:i.tag,
                    postId:i.postId,
                };
            });
            return m;
        })
    });
};


movieService.recent= function recent(categoryId=null,page=1,size=8){
    // todo:
    // condition.status="approval",
    const condition={};
    let _categoryId=!!categoryId?categoryId:null;
    return categoryService.getCategorySubnodeIdList(categoryId,{scope:'movie'})
        .then(ids=>{
            ids.push(categoryId);
            condition.categoryId={ $in:ids };
        })
        .then(_=>{
            return domain.movie.findAndCount({
                limit:size,
                offset:(page-1)*size,
                order:[['createdAt','desc']],
                where:condition,
                include:[
                    {
                        model:domain.language,
                    },
                    {
                        model:domain.country,
                    },
                    {
                        model:domain.screenshot,
                    },
                ],
            })
        })
        .then(result=>{
            const total=result.count;
            const list=result.rows;
            // 避免原型链上的属性影响
            let _list=JSON.parse(JSON.stringify(list));
            _list=_list.map(i=>{
                // delete i.author.password;
                // delete i.author.roles;
                // delete i.author.createdAt;
                // delete i.author.updatedAt;
                return i;
            });
            return {rows:_list,count:total};
        });
};



/**
 * 可以对 title、knownAs、description、categoryId、languageId、countryId、director、runtime、aspectRatio、
 * releaseDate、posterUrl、url、note、keywords进行修改
 * 如果传递的keywords和数据库中的不同，则对数据库中没有的，予以添加；
 * @param {Object} movie
 * @param {Array} movie.keywords ，eg:[{tag:''},{tag:''},]
 */
movieService.update= function edit(id,moive){
    const { title,knownAs,description,categoryId,languageId,countryId,
        director,runtime,aspectRatio,releaseDate,posterUrl,url,note,keywords
    }=movie;

    let params={ 
        title, knownAs, description, categoryId, languageId, countryId,
        director, runtime, aspectRatio, releaseDate, posterUrl, url, note, 
    };
    // 设置 Id
    keywords.forEach(i=>{
        i.topicId=id;
    });
    return domain.movie.findById(id)
        .then(m=>{
            // 更新 movie 本身
            const promiseUpdate=domain.movie.update(params,{where:{id:m.id,}});
            // 更新 keywords 部分
            const promiseKeywords=keywordService.edit(id,keywords);
            return Promise.all([promiseKeywords,promiseUpdate]);
        });
}


/**
 * 更改文章状态为发表状态
 */
movieService.publish= function publish(id){
    return domain.movie.update( {status:'publish'} , {where:{ id,status:'draft' }} );
}

/**
 * 更改文章状态-通过（至下一节点)
 */
movieService.approval= function approval(id){
    return domain.movie.update({status:'approval'},{where:{id,status:'publish'}});
}

/**
 * 更改文章状态-退回（至上一节点以修改）
 */
movieService.sendback= function sendback(id){
    return domain.movie.update({status:'draft'},{where:{id,status:'publish'}});
}

/**
 * 更改文章状态-拒绝（至最终节点）
 */
movieService.reject= function reject(id){
    return domain.movie.update({status:'reject'},{where:{id,status:'publish'}});
}


module.exports=movieService;