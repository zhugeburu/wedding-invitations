var path = require('path');
var webpack = require('webpack');
/*Extract text from bundle into a file.从bundle中提取出特定的text到一个文件中。
 使用 extract-text-webpack-plugin就可以把css从js中独立抽离出来*/
var ExtractTextPlugin = require('extract-text-webpack-plugin');
/*根据文件内容生成Hash值*/
var WebpackMd5Hash = require('webpack-md5-hash');
var HashedModuleIdsPlugin = require('./HashedModuleIdsPlugin');

// 项目根路径
var ROOT_PATH = path.join(__dirname, '..');
// 项目源码路径
var SRC_PATH = path.join(ROOT_PATH, 'src');
// 产出路径
var DIST_PATH = path.join(ROOT_PATH, 'dist');

// node_modules
var NODE_MODULES_PATH = path.join(ROOT_PATH, 'node_modules');

var __DEV__ = process.env.NODE_ENV !== 'production';

var args = process.argv;
/**/
var uglify = args.indexOf('--uglify') > -1;

var config = {
    context: SRC_PATH,
    entry: {
        app: ['./index.js'],
        lib: [
            'react', 'react-dom', 'react-router',
            'redux', 'react-redux', 'redux-thunk'
        ],
    },
    output: {
        path: DIST_PATH,
        // chunkhash 不能与 --hot 同时使用
        // see https://github.com/webpack/webpack-dev-server/issues/377
        filename: __DEV__ ? 'js/[name].js' : 'js/[name].[chunkhash].js',
        chunkFilename: __DEV__ ? 'js/[name].js' : 'js/[name].[chunkhash].js'
    },
    module: {},
    resolve: {
        extensions: ['', '.js'],
        root: ROOT_PATH
    },
    plugins: [
        new webpack.DefinePlugin({
            // http://stackoverflow.com/questions/30030031/passing-environment-dependent-variables-in-webpack
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['lib', 'manifest']
        }),
        // 使用文件名替换数字作为模块ID
        // new webpack.NamedModulesPlugin(),
        // 使用 hash 作模块 ID，文件名作ID太长了，文件大小剧增
        new HashedModuleIdsPlugin(),
        // 根据文件内容生成 hash
        new WebpackMd5Hash()
    ]
};


// loaders
var CACHE_PATH = path.join(ROOT_PATH, 'cache');
config.module.loaders = [];

// 使用 babel 编译 jsx、es6
config.module.loaders.push({
    test: /\.js$/,
    exclude: /node_modules/,
    // 这里使用 loaders ，因为后面还需要添加 loader
    loaders: ['babel?cacheDirectory=' + CACHE_PATH]
});

// 编译 sass
if (__DEV__) {
    config.module.loaders.push({
        test: /\.(scss|css)$/,
        loaders: ['style', 'css', 'postcss', 'sass']
    });
} else {
    config.module.loaders.push({
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
    });
    config.plugins.push(
        new ExtractTextPlugin('css/[name].[contenthash].css')
    );
}

// css autoprefix
//css 自动添加浏览器内核前缀
var precss = require('precss');
var autoprefixer = require('autoprefixer');
config.postcss = function () {
    return [precss, autoprefixer];
}

// 图片路径处理，压缩
config.module.loaders.push({
    test: /\.(?:jpg|gif|png|svg)$/,
    loaders: [
        'url?limit=8000&name=img/[hash].[ext]',
        'image-webpack'
    ]
});

// 压缩 js, css
if (uglify) {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        })
    );
}

// 去掉重复模块
if (!__DEV__) {
    config.plugins.push(
        new webpack.optimize.DedupePlugin()
    );
}

// html 页面
var HtmlwebpackPlugin = require('html-webpack-plugin');
config.plugins.push(
    new HtmlwebpackPlugin({
        filename: 'index.html',
        chunks: ['app', 'lib'],
        template: path.join(SRC_PATH, 'index.html'),
        minify: __DEV__ ? false : {
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
            removeRedundantAttributes: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            removeComments: true
        }
    })
);

// 内嵌 manifest 到 html 页面
config.plugins.push(function () {
    this.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function (file, callback) {
            var manifest = '';
            Object.keys(compilation.assets).forEach(function (filename) {
                if (/\/?manifest.[^\/]*js$/.test(filename)) {
                    manifest = '<script>' + compilation.assets[filename].source() + '</script>';
                }
            });
            if (manifest) {
                var htmlSource = file.html.source();
                htmlSource = htmlSource.replace(/(<\/head>)/, manifest + '$1');
                file.html.source = function () {
                    return htmlSource;
                };
            }
            callback(null, file);
        });
    });
});

//文件处理
config.module.loaders.push({
    test: /\.(mp3|ogg|m4a|ttf)$/,
    loader: 'file'
});

module.exports = config;
