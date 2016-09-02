const path=require("path");

const PATHS={
    app:path.join(__dirname,"lib","frontend","src"),
    build:path.join(__dirname,"lib","frontend","static","js"),
};

module.exports={
    entry:{
        main: path.join(PATHS.app,"main.jsx"),
        admin:path.join(PATHS.app,"admin.jsx"),
    },
    output:{
        path:PATHS.build,
        filename:"[name].js",
    },
    module:{
        loaders:[
            {
                test:/\.jsx?/,
                loader:["babel-loader"],//自右向左依次加载
                query:{
                    "presets": ['es2015','react'],
                    "plugins": [
                        ["antd", {
                            "style": 'css',
                            "libraryName": "antd",           // default: antd
                            "libraryDirectory": "lib",  // default: lib
                        }],
                    ]
                },
                include:PATHS.app,
            },
            {
                test:/\.css$/,
                loaders: ["style-loader","css-loader" ]
            },
        ],
    }
}