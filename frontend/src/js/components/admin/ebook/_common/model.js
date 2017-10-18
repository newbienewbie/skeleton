import {ebookapi} from '../../../../api/admin';


export const model={
    name:"ebook",
    fields:{
        id:{
            title:'ID',
        },
        title:{
            title:'书名',
        },
        author:{
            title:"作者",
            display:true,
        },
        category:{
            title:"分类",
        },
        isbn:{
            title:"ISBN",
            display:true,
            render:(text, record, index)=>{ return text; }
        },
        status:{
            title:"状态",
        },
        featureImageUrl:{
            title:'配图',
            display:false,
        },
        keywords:{
            title:'关键词',
            render:(text,record,index)=>text,
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
        create:ebookapi.create,
        remove:ebookapi.remove,
        update:ebookapi.update,
        list:ebookapi.list,
        detail:ebookapi.detail,
        publish:ebookapi.publish,
        approval:ebookapi.approval,
        sendback:ebookapi.sendback,
        reject:ebookapi.reject,
    }
};


export default model;