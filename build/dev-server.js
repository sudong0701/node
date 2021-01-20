'use strict'
const express = require('express');
const app = express();
const path = require('path');
const url = require('url');
const logger = require('morgan');
const cors = require('cors')
const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const MssqlStore = require('connect-mssql')(session);
const mutipart = require('connect-multiparty');

const bodyParser = require("body-parser");
const ueditor = require("ueditor");
const expressJwt = require('express-jwt');

require("body-parser-xml")(bodyParser);
app.use(cors())
app.use(mutipart({uploadDir: path.join(__dirname, '../temp')}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'../static')));

app.use('/public',express.static(path.join(__dirname,'../public')));
//const mssql_251 = require('../dist/server/db/mssql_251');

const db = require('../server/db/mysql');

//使用中间件验证token合法性
const secret = 'hwason';
app.use(expressJwt ({
    secret: secret
}).unless( req => {
    return true;
    let pathname = url.parse(req.originalUrl).pathname;

    // 过滤设备
    let deviceAgent = req.headers["user-agent"].toLowerCase();
    let isMobile = deviceAgent.match(/(iphone|ipod|ipad|android)/);
    if (isMobile) {
        return true;
    }

    // 过滤接口
    let path = [
        '/common/login',
        '/common/alipay/orderValidate2',
        '/common/alipay/orderValidate',

        '/transaction/rechargeReturn',
        '/transaction/rechargeReturn2',

        '/transaction/aliAPPRechargeReturn',
        '/transaction/paymentReturn',

        '/common/linkUp',
        '/inspection/queryPatientList',
        '/inspection/querySampleInfoLs',
    ];
    if (path.indexOf(pathname) > -1) {
        return true;
    }

    // 过滤静态资源文件
    let ext = pathname.split('\.');
    if (ext[1]) {
        return !['.pdf', '.xlsx', '.jpg', '.png', '.txt'].indexOf(`.${ext[1]}`);
    }
}));

app.use(bodyParser.xml({
    limit: "2MB",
    xmlParseOptions: {
        normalize: true,
        normalizeTags: true,
        explicitArray: false
    },
    verify: function(req, res, buf, encoding) {
        if(buf && buf.length) {
            req.rawBody = buf.toString(encoding || "utf8");
        }
    }
}));

/** /upload 入口地址配置 https://github.com/netpi/ueditor/blob/master/example/public/ueditor/ueditor.config.js
 * 官方例子是这样的 serverUrl: URL + "php/controller.php"
 * 我们要把它改成 serverUrl: URL + 'ue'
 */
app.use("/static/ueditor/ue", ueditor(path.join(__dirname, '../public/upload'), function(req, res, next) {
    // upload 客户发起上传图片请求
    console.log('ueditor',req.ueditor)
    if(req.query.action === 'uploadimage'){
        // 这里你可以获得上传图片的信息
        var foo = req.ueditor;
        console.log(foo.filename); // exp.png
        console.log(foo.encoding); // 7bit
        console.log(foo.mimetype); // image/png

        // 下面填写你要把图片保存到的路径 （ 以 path.join(__dirname, '../public/upload') 作为根路径）
        var img_url ='/img/';
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    }else if (req.query.action === 'listimage'){//  客户端发起图片列表请求
        var dir_url =  '/img/'; // 要展示给客户端的文件夹路径
        res.ue_list(dir_url) // 客户端会列出 dir_url 目录下的所有图片
    }else {// 客户端发起其它请求
        res.setHeader('Content-Type', 'application/json');
        // 这里填写 ueditor.config.json 这个文件的路径
        // let configPath = path.join(__dirname, '../static/ueditor/') + 'ueditor.config.json';
        // console.log('configPath',configPath)
        res.redirect('/ueditor/ueditor.config.json');
    }})
);

require('../server/index')(app)

/*解决请求跨域请求*/
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200); //让options请求快速返回
    else  next();
  });


//拦截器
app.use(function (err, req, res, next) {
    //当token验证失败时会抛出如下错误
    console.log(err.name)
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token...');
    }
});

app.listen(3000, ()=> {
    console.log('服务器开启在3000端口....')
})
