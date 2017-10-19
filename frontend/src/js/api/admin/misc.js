import {API} from 'tiny-api';
import axios from 'axios';


/**
 * 默认的 http client
 */
const client=axios.create({
    withCredentials: true,
});

const defaultClientOpts= {
    headers:{
        'Content-Type':'application/json',
    },
};


export const miscapi={};

/**
 * 适用于无需分页，一次性返回所有的项
 */
miscapi.selectStuff=function(remoteUrl){
    return client.get(remoteUrl)
        .then(resp=>resp.data,e=>{throw e;})
};


export default miscapi;