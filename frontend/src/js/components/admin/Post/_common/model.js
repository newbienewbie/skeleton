import {postapi} from '../../../../api/admin';


export const model={
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
            display:false,
            render:(text, record, index)=>{ return text; }
        },
        content:{
            title:"内容",
            display:false,
        },
    },
    actions:{
        'delete':{
            display:true,
        },
        'edit':{
            display:false,
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


export default model;