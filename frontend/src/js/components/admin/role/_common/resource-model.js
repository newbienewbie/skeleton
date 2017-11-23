import {model as m } from '../../resource/_common/model';
import { resourceapi } from "../../../../api/admin";

export const model=Object.assign(
    {},
    { fields:m.fields },
    {
        actions:{
            "edit":{
                display:false,
            },
            "delete":{
                display:false,
            }
        }
    },
    { methods:{
        /**
         * add resource 
         * @param {*} record
         * @param {Number}  record.roleId
         */
        create:resourceapi.create,
        /**
         * remove resource of role
         */
        remove: resourceapi.removeResourceOfRole,
        /**
         * update resource 
         */
        update:resourceapi.update,
        list:resourceapi.listResourcesOfRole,
        listAll:resourceapi.list,
        determineWhetherResourcesAssociatedWithRole:resourceapi.determineWhetherResourcesAssociatedWithRole,
        grantResourceToRole:resourceapi.grantResourceToRole,
        grantResourceToRoleCancel:resourceapi.grantResourceToRoleCancel,
    } }
);
