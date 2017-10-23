require('../../../../init-test-config');
const assert=require('assert');
const keywordService=require('../../../../../backend/service/common/keyword')('movie');
const movieService=require('../../../../../backend/service/cms/movie');


describe('测试movie-service',function(){

    it("#create()、findById()、remove()",function(){
        const movie={
            title:'a test title of movie ',
            knownAs:'test knownAs',
            categoryId:'1',
            languageId:'1',
            director:'sssss',
            site:'shit',
            releatedDate:new Date(),
            countryId:1,
            description:'xxxxxxxxxxxx',
            posterUrl:'shit',
            url:'ssss',
            note:'note',
            uploaderId:-1,
            keywords:[],
        };
        return movieService.create(movie)
            .then(m=>{
                return movieService.findById(m.id);
            })
            .then(m=>{
                assert.equal(m.title,movie.title,"title 理应相等");
                assert.equal(m.knownAs,movie.knownAs,"knownAs 理应相等");
                return keywordService.findAllByTopicId(m.id)
                    .then(keywords=>keywords.map(k=>{
                        return k.destroy();
                    }))
                    .then(_=>{
                        return movieService.remove(m.id);
                    });
            });
    });



    it('#recent()',function(){
        const movies=[
            {
                title:'a test title of movie ',
                knownAs:'test knownAs',
                categoryId:1,
                languageId:'1',
                director:'sssss',
                site:'shit',
                releatedDate:new Date(),
                countryId:1,
                description:'xxxxxxxxxxxx',
                posterUrl:'shit',
                url:'ssss',
                note:'note',
                uploaderId:-1,
                keywords:[]
            },
        ];
        const creates=movies.map(i=>{
            return movieService.create(i);
        });
        return Promise.all(creates)
            .then(_=>{
                return movieService.recent(1,1,8);
            })
            .then(_=>{
                assert.ok(_.hasOwnProperty("rows"));
                assert.ok(_.hasOwnProperty("count"));
                assert.ok(Array.isArray(_.rows));
                assert.ok(_.rows.length>=creates.length,`查询出来的数组长度(${_.rows.length})理应大于等于 新插入的这批数组长度(${creates.length})`);
                let removes=movies.map(i=>{
                    return movieService.remove(i.id);
                });
                return Promise.all(removes);
            });
    });
    
    
});