# 婚礼请柬

**请注意：本系统仅测试了在主流手机微信平台上的兼容性。**

**请注意：PC没有做兼容，所以PC打开会很乱。**

**请注意：请在微信坏境打开，其他任何浏览器均没有测试。**

> 本系统参照[微请柬-来电互动版](http://t.wqingjian.com/app/a6VjYf)实现。

> 如有侵权，请联系本人删除。

## 技术栈

* React

* Webpack

* Redux

* ES6

* Css3

## 开发配置

1. `npm install`

2. `npm start`

3. 浏览器打开[http://localhost:8081](http://localhost:8081)


## 祝福语存储之后端配置

> 本程序采用前后端完全分离配置，程序需要一个存储祝福语和读取祝福语的接口！

下面我给了一个PHP提供API接口的例子，你完全可以采用其他语言。

1. 将`php`文件夹复制到本地的`PHP`坏境。

2. 新建数据库，执行`php/wedding.sql`，修改`getBless.php`与`commitBless.php`中数据库相关配置。

3. 修改`server.js`,修改端口为相应的PHP端口。(当`uri`为`/wedding`时，代理到php所在的`url`)
   
       ```
       app.use(proxy('/wedding', {
           target: 'http://localhost:80',
           changeOrigin: true
       }));
       ```

## 生产坏境打包

1. `npm run bundle`

2. 拷贝`dist`文件夹至服务器即可。

## 其他说明

1. 系统分男方版本和女方版本，如果访问首页带参数`?t=girl`，则为访问女方版本，否则访问男方版本。
   
    具体版本区别请详看代码。下面举一个例子：
    
    ```
    <audio className="hidden" id="talk-audio">
    <source src={userType == 'boy' ? boyMp3 : girlMp3} type="audio/mpeg"/>
    </audio>
    ```
    
2. 所有可配置的照片放在`src/asset/images/photos`，所有可配置的音频放在`src/asset/audio`。
