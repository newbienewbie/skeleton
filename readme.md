# skeleton

- [x] 极速开发、模块化开发
- [x] 集成后台管理，自带用户管理、权限管理功能
- [x] 支持自定义主题
- [x] 支持自定义扩展
- [x] 以npm包的形式安装
- [ ] 后台管理钩子

## demo

![screenshot](https://github.com/newbienewbie/skeleton/raw/master/dashboard.gif)

## 使用

前提：如果要启用视频功能，请安装`ffmpeg`，确保`ffmpeg`、`ffprobe`可执行程序在`PATH`下

```
npm install 
```

### 傻瓜使用

```javascript
const skeleton =new Skeleton({config});
skeleton.run();
```

### 自定义主题

Skeleton也支持像`WordPress`那样支持自定义主题，只需在配置里填写好主题的相关路径即可。

对于一个`skeleton-demo`项目，可以在根目录下建立`/frontend/themes`文件夹，用于存放各种不同主题的文件。比如我们有个叫`itminus`的主题，则可以再在其中建立两个文件夹：
* views/  #各个模板
* static/ #静态文件

最后，在配置文件里填好相关路径，传递给`Skeleton`构造函数即可：
```javascript
// ...
config.basePath={
    "views":[
        path.join(__dirname,"../frontend/themes/itminus/views"),
    ],
    "assets":[
        path.join(__dirname,"../frontend/themes/itminus/static"),
    ],
    "ebooks":"C:/Users/itminus/pdfs",
    "lock":process.cwd(),
};

const skeleton =new Skeleton({config});
skeleton.run();
```

[演示如何自定义主题的demo](https://github.com/newbienewbie/skeleton-demo)

### 扩展功能

要新增或者修改功能，需要对`Skelton`进行扩展。基本的扩展点如下：

```javascript

class MySkeleton extends Skeleton{
    constructor(opts){
        super(opts);
        // 会继承到如下属性：
        // this.config         : 配置缓存
        // ...
        // this.register       : 内置的路由
        // this.service        : 内置的服务层
        // this.domain         : 内置的数据模型层
        // ...
        // this.app            : 就是简单的express()生成的app！
        // this.staticHandle   : 静态文件处理器
        // ...
    }

    beforeRun(){
        // ...
        // 这里默认会配置模板、注册路由 ...
    }

    serveStaticFiles(){
        const app=this.app;
        const config=this.config;
        // 可以简单的调用父类方法，甚至完全重写
        super.serveStaticFiles();
    }

    afterRun(server,ip,port){
        // ...
    }
}
```


## 开发

### 开发环境搭建 

1. `git clone` 这个仓库
2. `npm install` 安装所有依赖
3. 在`config/`下添加一个`config.dev.js`文件，填写相关配置
4. `npm run webpack --watch` 打包前端文件
5. `npm run lessc` 为前台页面编译`css`样式代码
6. `npm run start` 运行即可
7. 访问 `http://localhost:3000/install`，安装数据库、创建管理员、填充基本数据
8. `npm run test` 确保所有测试都通过

### 文件结构

分为前端部分和后端部分：

相应的文件结构为：

* config/
    * config.dev.js          # 测试环境配置
    * config.prod.js         # 生产环境配置
    * config.default.json    # 默认配置
* backend/                   # 后端
    * domain/
    * router/
    * service/
    * utils/
    * index.js
* frontend/                  # 前端
    * src/                   # 安装页面、后台页面等的源码
    * views/                 # 视图
    * static/                # 静态资源文件夹，编译后的js文件也放这里
* test/                      # 测试


配置放入`/config`文件夹下,具体功能开发的后端代码置入`backend/`文件夹下，前端代码置入`frontend/`文件夹下。


### 后端部分

文件夹结构为：
```
* backend/
    * config/            # 配置功能模块，对外暴露存、取接口
    * domain/            # 对领域的抽象，定义各模型实体及其之间的关系
    * service/           # 服务
        * account/       # 账号服务，如角色服务、注册服务
        * email/         # 邮件服务
        * install/       # 安装
        * cms/
            * movie/     # 电影处理服务，如截图
            * post/      # 文章服务
            * ebook/     # 电子书服务
        * ...
    * router/            # 相关路由器
        * system/        # 系统相关
        * common/        # 常用
        * session/       # 会话支持
        * cms/           # cms相关
        * ...
    * utils/             # 小功能
```


### 前端

文件夹结构为：

* frontend/
    * views/
    * src/
    * static/


#### views

* 网站后端模板，不会被浏览器访问到。
* 默认的服务端模板语法是`nunjucks`，类似于PHP的`twig`。

#### src

前端源码，不可被浏览器直接访问。源码经过`webpack`打包后会放入`static/`下的相应目录里。

此部分主要涉及的后台页面的前端源码、安装页面的前端源码

* 入口文件：与 `webpack.config.js` 的 `entry` 配置相对应。
* 模块化： React组件化开发。

#### static

网站的静态文件夹，存放的文件包括

* css
* images
* js
* 其他静态文件，如`ueditor`编辑器的前端文件

此文件夹下的内容会被浏览器任意访问，不要存放敏感信息。

note: `src/`文件夹的源码文件，会被`webpack`打包后放入这里相应的路径下。

