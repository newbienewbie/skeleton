import {resourceapi} from '../../../../api/admin';


const model={
    name:"description",
    fields:{
        name:{
            title:'资源名',
        },
        description:{
            title:"资源描述",
        },
        category:{
            title:"分类",
        },
        method:{
            title:"方法",
        },
        path:{
            title:"路径",
        },
        status:{
            title:'状态',
        },
    },
    methods:{
        create:resourceapi.create,
        remove:resourceapi.remove,
        update:resourceapi.update,
        list:resourceapi.list,
    }
};


module.exports={model};