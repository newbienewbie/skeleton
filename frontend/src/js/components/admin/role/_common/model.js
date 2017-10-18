import {roleapi} from '../../../../api/admin';

const {create,remove,update,list}=roleapi;

const model={
    name:"role",
    fields:{
        "name":{
            title:'角色名',
        },
        "description":{
            title:"角色描述",
        },
    },
    methods:{
        create,
        remove,
        update,
        list,
    }
};


module.exports={model};