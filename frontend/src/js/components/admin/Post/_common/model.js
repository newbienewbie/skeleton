import {postapi} from '../../../../api/admin';


const model={
    name:"post",
    fields:{
        title:{
            title:'资源名',
        },
        excerpt:{
            title:"摘要",
        },
        category:{
            title:"分类",
        },
        featureImageUrl:{
            title:"配图",
        },
        content:{
            title:"内容",
        },
    },
    methods:{
        create:postapi.create,
        remove:postapi.remove,
        update:postapi.update,
        list:postapi.list,
        detail:postapi.detail,
        publish:postapi.publish,
        approval:postapi.approval,
        sendback:postapi.sendback,
        reject:postapi.reject,
    }
};


module.exports={model};