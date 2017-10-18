import {API} from 'tiny-api';
import {accountapi} from './system';




export {postapi} from './post';

export {categoryapi} from './categroy';

export {roleapi,resourceapi,accountapi} from './system';

export const listRolesOfCurrentUser=accountapi.listRolesOfCurrentUser;

export const updateRolesOfUsername=accountapi.updateRolesOfUsername;
