import {roleapi} from '../../../../api/admin';

const {create,remove,update,list}=roleapi;

const model={
    name:"role",
    fields:{
        "name":{
            title:'角色名',
        },
        "description":{
            title:"角色米哦啊书",
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