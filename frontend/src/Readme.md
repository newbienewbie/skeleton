# 前端源代码

## 组成

* views/           # 模板，基本都是前台部分，用于服务端渲染
* less/            # 前台部分的less的代码
* src/             # 客户端渲染部分的代码，主要用于后台和安装功能
    * install.jsx      # webpack 的入口文件
    * admin.jsx        # webpack 的入口文件
    * js/          # 具体代码
        * api/         # 与后端交互的代码
            * install/    #安装部分
            * admin/      #后台管理部分
        * components/  # 组件部分的代码
            * install/    #安装部分
            * admin/      #后台管理部分
* static/          # 静态资源文件(含编译后的资源)