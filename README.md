# 帮助文档

[docs](http://ionicframework.com/docs/v1/overview/)
[中文文档](http://www.ionic.wang/js_doc-index-id-21.html)
[图标](http://ionicons.com/)

## 环境要求

```node
node // 官网下载安装 stable
cordova // npm i cordova -g
ionic // npm i ionic -g
```

## 调试

### 本地浏览器调试

```node

npm run webpack:start
访问：http://localhost:8686
如果启动成功打不开，找个src下文件save一下

```

### 真机调试

```node

对应打包的app的
config.xml 配置文件
<config-file url="http://192.168.3.11:31284/chcp.json" />

1. npm run start

2. 在同一局域网下打开app

3. 修改文件就会同步刷新

```

## 构建

``` node
正式包配置 <config-file url="http://my.website.com/www/chcp.json" />

1. npm run build

2. www文件发布热更新服务器

```

详情看[热更新](#热更新)文档

## 设置开屏图

[http://ionicframework.com/docs/cli/cordova/resources/](http://ionicframework.com/docs/cli/cordova/resources/)

## 增删平台 ios 或 android

[http://ionicframework.com/docs/cli/cordova/platform/](http://ionicframework.com/docs/cli/cordova/platform/)

## 热更新

[https://github.com/nordnet/cordova-hot-code-push](https://github.com/nordnet/cordova-hot-code-push)
[https://github.com/nordnet/cordova-hot-code-push-cli#deploy-command](https://github.com/nordnet/cordova-hot-code-push-cli#deploy-command)
