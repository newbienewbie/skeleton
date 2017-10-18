import {movieapi} from '../../../../api/admin';


export const model={
    name:"movie",
    fields:{
        id:{
            title:'ID',
        },
        title:{
            title:'片名',
        },
        knownAs:{
            title:"别名",
            display:true,
        },
        releaseAt:{
            title:"上映日期",
        },
        status:{
            title:"状态",
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
        create:movieapi.create,
        remove:movieapi.remove,
        update:movieapi.update,
        list:movieapi.list,
        detail:movieapi.detail,
        publish:movieapi.publish,
        approval:movieapi.approval,
        sendback:movieapi.sendback,
        reject:movieapi.reject,
    }
};


export default model;