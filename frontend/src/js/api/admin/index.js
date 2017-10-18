import {API} from 'tiny-api';
import {categoryapi} from './categroy';
import {accountapi} from './system';





export {roleapi,resourceapi,accountapi} from './system';

export const listRolesOfCurrentUser=accountapi.listRolesOfCurrentUser;

export const updateRolesOfUsername=accountapi.updateRolesOfUsername;