require('../../../init-test-config.js');
const assert=require('assert');
const {hasAnyOpinion,hasAnyOpinionOf,like,hate,cancelLike,cancelHate}=require('../../../../lib/backend/service/topic-user-opinion');


describe('测试 topicUserOpinionService',function(){

    describe('测试 #like()及#cancelLike()和#hasAnyOpinion()、#hasAnyOpinionOf',function(){
        
        const scope="test";
        const topicId=1;
        const userId=1;

        it('测试 like后再取消',function(){
            return like(scope,topicId,userId)
                .then(s=>{
                    assert.ok(s.id>1,`id必定大于1：${s.id}`);
                    assert.equal(s.topicId,topicId);
                    assert.equal(s.userId,userId);
                })
                // 测试 hasAnyOpinion()
                .then(_=>{
                    return hasAnyOpinion(scope,topicId,userId)
                        .then(f=>{
                            assert.ok(f,"刚创建意见，现在应该被找到");
                        });
                })
                // 测试 hasAnyOpinionOf()
                .then(_=>{
                    return hasAnyOpinionOf(scope,topicId,userId,["like"])
                        .then(f=>{
                            assert.ok(f,"刚创建意见，现在应该被找到");
                        }) 
                        .then(_=>{
                            return hasAnyOpinionOf(scope,topicId,userId,["like","hello"])
                                .then(f=>{
                                    assert.ok(f,"刚创建意见，现在应该被找到");
                                });
                        })
                        .then(_=>{
                            return hasAnyOpinionOf(scope,topicId,userId,["shit","hello"])
                                .then(f=>{
                                    assert.ok(!f,"这些意见都没有创建");
                                });
                        })
                        .then(_=>{
                            return hasAnyOpinionOf(scope,topicId,userId,[])
                                .then(f=>{
                                    assert.ok(!f,"空意见理应没有创建");
                                });
                        });
                })
                // 取消喜欢
                .then(_=>{
                    return cancelLike(scope,topicId,userId);
                })
                .then(_=>{
                    return hasAnyOpinion(scope,topicId,userId)
                        .then(f=>{
                            assert.ok(!f,"刚删除意见，现在应该找不到");
                        });
                })
                // 测试 hasAnyOpinionOf()
                .then(_=>{
                    return hasAnyOpinionOf(scope,topicId,userId,["like"])
                        .then(f=>{
                            assert.ok(!f,"刚已取消意见，现在应该找不到");
                        }) 
                        .then(_=>{
                            return hasAnyOpinionOf(scope,topicId,userId,["like","hello"])
                                .then(f=>{
                                    assert.ok(!f,"刚已取消意见，现在应该找不到");
                                });
                        })
                        .then(_=>{
                            return hasAnyOpinionOf(scope,topicId,userId,["shit","hello"])
                                .then(f=>{
                                    assert.ok(!f,"这些意见都没有创建");
                                });
                        })
                        .then(_=>{
                            return hasAnyOpinionOf(scope,topicId,userId,[])
                                .then(f=>{
                                    assert.ok(!f,"空意见理应没有创建");
                                });
                        });
                }) 
                ;

                
        });

    });

    describe('测试 #hate()及 #cancelHate() 和#hasAnyOpinion() 和#hasAnyOpinionOf()',function(){
        
        const scope="test";
        const topicId=1;
        const userId=1;

        it('测试 hate后再取消',function(){
            return hate(scope,topicId,userId)
                .then(s=>{
                    assert.ok(s.id>1,`id必定大于1：${s.id}`);
                    assert.equal(s.topicId,topicId);
                    assert.equal(s.userId,userId);
                    return ;
                })
                .then(_=>{
                    return hasAnyOpinion(scope,topicId,userId)
                        .then(f=>{
                            assert.ok(f,"刚创建意见，现在应该被找到");
                        });
                })
                // 测试 hasAnyOpinionOf()
                .then(_=>{
                    return hasAnyOpinionOf(scope,topicId,userId,["hate"])
                        .then(f=>{
                            assert.ok(f,"刚创建意见，现在应该被找到");
                        }) 
                        .then(_=>{
                            return hasAnyOpinionOf(scope,topicId,userId,["hate","hello"])
                                .then(f=>{
                                    assert.ok(f,"刚创建意见，现在应该被找到");
                                });
                        })
                        .then(_=>{
                            return hasAnyOpinionOf(scope,topicId,userId,["shit","hello"])
                                .then(f=>{
                                    assert.ok(!f,"这些意见都没有创建");
                                });
                        })
                        .then(_=>{
                            return hasAnyOpinionOf(scope,topicId,userId,[])
                                .then(f=>{
                                    assert.ok(!f,"空意见理应没有创建");
                                });
                        });
                })
                .then(_=>{
                    return cancelHate(scope,topicId,userId);
                })
                .then(_=>{
                    return hasAnyOpinion(scope,topicId,userId)
                        .then(f=>{
                            assert.ok(!f,"刚删除意见，现在应该找不到");
                        });
                })
                // 测试 hasAnyOpinionOf()
                .then(_=>{
                    return hasAnyOpinionOf(scope,topicId,userId,["hate"])
                        .then(f=>{
                            assert.ok(!f,"刚已取消意见，现在应该找不到");
                        }) 
                        .then(_=>{
                            return hasAnyOpinionOf(scope,topicId,userId,["hate","hello"])
                                .then(f=>{
                                    assert.ok(!f,"刚已取消意见，现在应该找不到");
                                });
                        })
                        .then(_=>{
                            return hasAnyOpinionOf(scope,topicId,userId,["shit","hello"])
                                .then(f=>{
                                    assert.ok(!f,"这些意见都没有创建");
                                });
                        })
                        .then(_=>{
                            return hasAnyOpinionOf(scope,topicId,userId,[])
                                .then(f=>{
                                    assert.ok(!f,"空意见理应没有创建");
                                });
                        });
                })
                ;
            
        });

    });

});