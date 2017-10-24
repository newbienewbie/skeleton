module.exports={
    "env":"prod",
    "site":{
        "name":"72洞",
        "url":"http://localhost:3000"
    },
    "database": {
        "dialect":"mysql",
        "host":"localhost",
        "port":3306,
        "username":"username",
        "password":"password",
        "dbname":"dbname",
        "charset":"utf-8"
    },
    "email":{
        "secureConnection": true,
        "host":"smtp.163.com",
        "port": 465 ,
        "username":"itminus@163.com",
        "password":"your_pass" 
    },
    "sessionSecret":"hello,world",
    "basePath":{
        /**
         * 安装锁定文件路径
         */
        "lock":process.cwd(),    
        /**
         * ebooks 路径
         */
        "ebooks":process.cwd(),
        /**
         * 模板路径列表
         */
        "views":[],
        /**
         * 资源文件路径
         */
        "assets":"",
    }
}
