# skeleton

- [x] 极速开发、模块化开发
- [x] 集成后台管理，自带用户管理、权限管理功能
- [x] 支持自定义主题
- [x] 支持自定义扩展
- [X] 支持后台管理扩展
- [x] 以npm包的形式安装


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


### 高级使用方法

参见 `docs/` 文档