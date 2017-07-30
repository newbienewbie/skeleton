# skeleton

* 用于快速开发的脚手架
* 可直接架设在`OpenShift`
* 后端使用`Express`
* 前端的后台部分使用`ReactJS`，配合`react-router`，可以极速开发模块化的单页面应用
* 前端的前台部分使用`Nunjucks`

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
    * index.js
* frontend/
    * src/
    * views/
    * static/
* test/


具体功能开发的后端代码置入`lib/backend/`文件夹下，前端代码置入`frontend/`文件夹下。


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

