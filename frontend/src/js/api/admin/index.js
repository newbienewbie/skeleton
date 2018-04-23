import { accountapi } from "./system";

export {postapi} from './post';

export {ebookapi} from './ebook';

export {movieapi} from './movie';

export {categoryapi} from './categroy';
export {actionapi} from './action';

export {roleapi,resourceapi,accountapi} from './system';

export {miscapi} from './misc';


export const listRolesOfCurrentUser=accountapi.listRolesOfCurrentUser;

export const updateRolesOfUsername=accountapi.updateRolesOfUsername;
