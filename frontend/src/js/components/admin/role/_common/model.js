import {createRole,removeRole,updateRole,listRoles} from '../../../../api/admin';


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
        create:function(record){
            const {name,description}=record;
            return createRole(name,description);
        },
        remove:removeRole,
        update:function(id,record){
            const{name,description}=record;
            return updateRole(id,name,description);
        },
        list:listRoles,
    }
};


module.exports={model};