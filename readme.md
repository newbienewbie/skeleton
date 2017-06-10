# skeleton

* 用于快速开发的脚手架
* 可直接架设在OpenShift
* 后端使用Express
* 前端使用ReactJS，配合react-router，可以极速开发模块化的单页面应用

## 要求

1. node v6 :要使用低于v6版本的node，自行babel转换之。
2. 默认的`config.prod.js`是基于OpenShift写的，如果要运行在其他服务器上，自行修改。

## demo

![screenshot](https://github.com/newbienewbie/skeleton/raw/master/dashboard.png)
![screenshot](https://github.com/newbienewbie/skeleton/raw/master/dashboard2.png)

## 使用

### 步骤：

0. 安装`ffmpeg`，确保`ffmpeg`、`ffprobe`可执行程序在`PATH`下
1. `git clone 这个仓库`
2. `npm install` 安装所有依赖
3. 在`config/`下添加一个`config.dev.js`文件，
4. `npm run webpack --watch` 打包前端文件
5. `npm run start` 运行即可
6. 访问 `http://localhost:3000/install`，安装数据库、创建管理员、填充基本数据
7. `npm run test` 确保所有测试都通过

### 其他：

1. 如果是163邮箱，发送激活邮件特别容易被当作垃圾邮件而遭退信。
2. 如果采用 git 的形式推送到OpenShift，应该把 webpack 打包出来的文件纳入版本管理。


## 开发

分为前端部分和后端部分：

相应的文件结构为：

* lib/
    * backend/
    * frontend/
    * server.js
    * app.js
* test/

其中：

* `app.js` ：功能是利用`express`创建`app`,然后配置、载入路由
* `server.js` ：功能为利用`app`创建 HTTP Server 并监听。

具体功能开发的后端代码置入`backend/`文件夹下，前端代码置入`frontend/`文件夹下。


### 后端部分

文件夹结构为：

* backend/
    * config/
    * domain/
    * service/ # 服务
        * account/       # 账号服务，如角色服务、注册服务
        * auth/          # 认证相关服务，如密码比较、密码生成、检查角色、检查登陆等
        * email/         # 邮件服务
        * session/       # 会话服务
        * install/       # 安装
        * movie-process/ # 电影处理服务，如截图
        * ...
    * router/
    * utils/



### 前端

文件夹结构为：

* frontend/
    * views/
    * src/
    * static/


#### views

* 网站后端模板，不会被浏览器访问到。
* 支持服务端渲染+客户端渲染两种模式。
* 默认的服务端模板语法是`nunjucks`，类似于PHP的`twig`。

#### src

前端源码，不可被浏览器访问。源码经过`webpack`打包后会放入`static/`下的相应目录里。

* 入口文件：与 `webpack.config.js` 的 `entry` 配置相对应。
* 模块化： React组件化开发。

需要子路径导航的组件，应该以文件夹形式来组织源码，比如一个 `Post` 组件，相应的源码文件组织为:

* Post/
    * Post.jsx
    * Home.jsx
    * Detail.jsx
    * List.jsx
    * Add.jsx
    * ...

其中，`Post.jsx`文件为该组件的入口文件，使用一个`Main`组件渲染子组件：

```JavaScript

const Main=React.createClass({

    render:function(){
        return (<div>
            {this.props.children}
        </div>);
    }
});

```


此`Main`同时与子组件导出:

```JavaScript
export defualt {Main,Home,Detail,List,Add}; 
```

以供`react-router`路由使用。

#### static

网站的静态文件夹，存放的文件包括

* css
* images
* js
* 其他静态文件，如`ueditor`编辑器的前端文件

此文件夹下的内容会被浏览器任意访问，不要存放敏感信息。

note: `src/`文件夹的源码文件，会被`webpack`打包后放入这里相应的路径下。

