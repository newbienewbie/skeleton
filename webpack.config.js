const path=require("path");

const PATHS={
    app:path.join(__dirname,"frontend","src"),
    build:path.join(__dirname,"frontend","static","js"),
};

module.exports={
    entry:{
        install:path.join(PATHS.app,"install.jsx"),
        // main: path.join(PATHS.app,"main.jsx"),
        admin:path.join(PATHS.app,"admin.jsx"),
    },
    output:{
        path:PATHS.build,
        filename:"[name].js",
    },
    externals:{
        "react":"React",
        "react-dom":"ReactDOM",
    },
    module:{
        loaders:[
            {
                test:/\.jsx?/,
                loaders:["babel-loader"],//自右向左依次加载
                include:PATHS.app,
            },
            {
                test:/\.css$/,
                loaders: ["style-loader","css-loader", ]
            },
            {
                test:/\.less$/,
                loaders: ["style-loader","css-loader??importLoaders=1",'postcss-loader',"less-loader"]
            },
        ],
    }
}