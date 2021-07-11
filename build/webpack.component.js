const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const TerserPlugin = require('terser-webpack-plugin')

const Components = require('../components.json')
const config = require('./config')
let plugins = [new ProgressBarPlugin(), new VueLoaderPlugin()],
    publicPath = process.env.PUBLIC_PATH || ''
if (process.env.ANALAYZ_REPORT) plugins.push(new BundleAnalyzerPlugin())

module.exports = {
    mode: 'production',
    entry: Components,
    output: {
        path: path.resolve(process.cwd(), './lib'),
        publicPath: publicPath,
        filename: '[name].js',
        chunkFilename: '[id].js',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: config.alias,
        modules: ['node_modules']
    },
    externals: config.externals,
    performance: {
        hints: false
    },
    stats: 'none',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.(jsx?|babel|es6)$/,
                include: process.cwd(),
                exclude: config.jsexclude,
                loader: 'babel-loader'
                // options: {
                // 	exclude: [/node_modules[\\\/]core-js/, /node_modules[\\\/]webpack[\\\/]buildin/],
                // 	presets: [
                // 		'@babel/preset-react',
                // 		[
                // 			'@babel/preset-env',
                // 			{
                // 				useBuiltIns: 'entry',
                // 				corejs: 3,
                // 				targets: '> 0.5%, not dead',
                // 			},
                // 		],
                // 	],
                // },
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                test: /\.(css|less)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'style-resources-loader',
                        options: {
                            patterns: path.resolve(__dirname, '../packages/style/var.less')
                        }
                    }
                ]
            },
            {
                test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    esModule: false,
                    name: path.posix.join('img', '[name].[ext]?version=' + config.version + '.[hash:7]')
                }
            }
        ]
    },
    plugins: plugins
}
