const CompressionWebpackPlugin = require('compression-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const compress = new CompressionWebpackPlugin(
    {
        filename: info => {
            return `${info.path}.gz${info.query}`
        },
        algorithm: 'gzip', 
        threshold: 10240,
        test: new RegExp(
            '\\.(' +
            ['js'].join('|') +
            ')$'
        ),
        minRatio: 0.8,
        deleteOriginalAssets: false
    }
)

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'
    // outputDir: 'dist',
    outputDir: 'wwwroot',
    productionSourceMap: false,
    filenameHashing: true,
    parallel: require('os').cpus().length > 1,
    devServer: {
        // before(app) {
        //     app.get(/.*.(js)$/, (req, res, next) => {
        //         req.url = req.url + '.gz';
        //         res.set('Content-Encoding', 'gzip');
        //         next();
        //     })
        // },
        port: 8080, // 端口号
        host: 'localhost',
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        //proxy: '' // 配置跨域处理,只有一个代理
        proxy: {
            '/api': {
                target: 'http://localhost:7675/api',
                ws: true,
                changeOrigin: true,
                pathRewrite:{
                    '^/api':'' // 需要rewrite重写的
                }
            }
        },  // 配置多个代理
    },
    configureWebpack: {
        plugins: [
            // new webpack.DllReferencePlugin({
            //   context: process.cwd(),
            //   manifest: require('./public/vendor/vendor-manifest.json')
            // }),
            // // 将 dll 注入到 生成的 html 模板中
            // new AddAssetHtmlPlugin({
            //     // dll文件位置
            //     filepath: path.resolve(__dirname, './public/vendor/*.js'),
            //     // dll 引用路径
            //     publicPath: './vendor',
            //     // dll最终输出的目录
            //     outputPath: './vendor'
            // }),
            compress
        ]
    },
    chainWebpack: config => {
        config.entry('main').add('@babel/polyfill');
        config.optimization.minimize(true);
        config.optimization.minimizer(
            [
                new TerserPlugin({
                    terserOptions: {
                        warnings: false,
                        compress: {
                            drop_console: true, 
                            drop_debugger: false,
                            pure_funcs: ['console.log'] 
                        }
                    }
                })
            ]
        );
        config.optimization.splitChunks({
            chunks: 'all'
        });
        config.module
            .rule('images')
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
            .options({
                bypassOnDebug: true
            })
            .end();
        // config.module
        //     .rule('images')
        //     .use('url-loader')
        //     .loader('url-loader')
        //     .tap(options => Object.assign(options, { limit: 10 }))
    }
}