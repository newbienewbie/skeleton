const path=require('path');

let routeRules={
    'page':{
        category:'页面',
        files:[
            './page/home.js',
            './page/dashboard.js',    // dashboard page
            './page/about',          // about page
            './page/contact',        // contact page
            './page/not-found.js',   // 404 page
        ],
    },
    'sudo':{
        category:'系统',
        files:[
            './sudo/health',
            './sudo/info',
            './sudo/install',
        ],
    },
    'system':{
        category:'系统',
        files:[
            './system/account',
            './system/role',
            './system/resource',
            './system/action',
        ],
    },
    'common':{
        category:'通用',
        files:[
            './common/upload.js',    // 上传
            './common/ueditor.js',   // 编辑器
            './common/category',     // category
            './common/country.js',   // country
            './common/language.js',  // language
        ],
    },
    'cms':{
        category:'领域',
        files:[
            './cms/movie',      // movie 模块
            './cms/post',       // post 模块
            './cms/ebook',      // ebook 模块
            './cms/director',   // director 模块
        ],
    },
    'comment':{
        category:'领域',
        files:[
            './comment',        // 评论回复模块
        ],
    },
};


// 把routesConfig中的相对路径转换为绝对路径
Object.keys(routeRules).forEach(rcName=>{
    const rc=routeRules[rcName];
    const {files}=rc;
    files.forEach((p,idx)=>{
        files[idx]= path.resolve(__dirname,p);
    });
});

module.exports=routeRules;