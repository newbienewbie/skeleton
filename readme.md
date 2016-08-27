# skeleton

* 用于快速开发的脚手架
* 可直接架设在OpenShift
* 后端使用Express
* 前端使用ReactJS，配合react-router，可以极速开发模块化的单页面应用

## 要求

1. node v6 :要使用低于v6版本的node，自行babel转换之。
2. 默认的`config.prod.js`是基于OpenShift写的，如果要运行在其他服务器上，自行修改。

## 使用

1. `git clone 这个仓库`
2. `npm install` 安装所有依赖
2. 在`lib/backend/config/`下添加一个`config.dev.js`文件，
3. `webpack --watch` 打包前端文件
4. `npm run start` 运行即可

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

* backend/
    * auth/
    * config/
    * domain/
    * email/
    * router/
    * session/
    * utils/



### 前端

* frontend/
    * views/
    * src/
    * static/


#### vies

网站后端模板，不会被浏览器访问到。

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


`Main`同时与子组件导出:

```JavaScript
export defualt {Main,Home,Detail,List,Add}; 
```

以供`react-router`路由使用。

#### static

网站的静态文件夹，会被浏览器访问到，不要存放敏感信息。

`src/`文件夹的源码文件，会被`webpack`打包后放入这里相应的路径下。

