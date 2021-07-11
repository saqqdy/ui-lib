const path = require('path')
/**
 * @description resolve
 * @param {string} dir 目录
 * @returns {string} url
 */
function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    title: 'UILibDemo',
    description: '组件库demo',
    base: '/ui-lib-demo/',
    dest: './.vuepress/dist',
    theme: '@vuepress/default',
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: '指南', link: '/start/' },
            { text: '组件', link: '/components/box/' },
            { text: '插件', link: '/plugins/stringify/' },
            {
                text: '其他项目',
                items: [
                    {
                        text: '链接',
                        items: [
                            {
                                text: '作者',
                                link: 'https://github.com/saqqdy',
                                target: '_blank'
                            }
                        ]
                    }
                ]
            },
            {
                text: '更多',
                items: [
                    {
                        text: '链接',
                        items: [
                            {
                                text: 'HomePage',
                                link: 'http://github.com/saqqdy/ui-lib-demo#readme',
                                target: '_blank'
                            },
                            {
                                text: 'Bugs',
                                link: 'http://github.com/saqqdy/ui-lib-demo/issues',
                                target: '_blank'
                            }
                        ]
                    },
                    {
                        text: 'saqqdy',
                        items: [{ text: '网站', link: 'http://www.saqqdy.com' }]
                    }
                ]
            }
        ],
        sidebar: {
            '/components/': [
                {
                    title: '组件',
                    collapsable: false,
                    sidebarDepth: 0,
                    children: [{ title: 'button', path: '/components/button/', collapsable: false }]
                }
            ],
            '/plugins/': [
                {
                    title: '公共方法',
                    collapsable: false,
                    sidebarDepth: 0,
                    children: [
                        {
                            title: '$stringify',
                            path: '/plugins/stringify/',
                            collapsable: false
                        }
                    ]
                }
            ],
            '/start/': [
                {
                    title: '更新日志',
                    path: '/change-log',
                    collapsable: false,
                    sidebarDepth: 1
                },
                {
                    title: '开发指南',
                    collapsable: false,
                    sidebarDepth: 1,
                    children: [
                        {
                            title: '介绍',
                            path: '/start/',
                            collapsable: false
                        },
                        {
                            title: '安装',
                            path: 'install',
                            collapsable: false
                        },
                        {
                            title: '快速上手',
                            path: 'getting-start',
                            collapsable: false
                        },
                        {
                            title: '基本配置',
                            path: 'basic-config',
                            collapsable: false
                        },
                        {
                            title: '主题色',
                            path: 'theme-color',
                            collapsable: false
                        },
                        {
                            title: '图标',
                            path: 'icon',
                            collapsable: false
                        },
                        {
                            title: '兼容性',
                            path: 'compatibility',
                            collapsable: false
                        }
                    ]
                }
            ]
        },
        lastUpdated: '最近更新',
        // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
        repo: 'http://github.com/saqqdy/ui-lib-demo.git',
        // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
        // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
        repoLabel: '查看源码',
        // 以下为可选的编辑链接选项
        // 假如你的文档仓库和项目本身不在一个仓库：
        docsRepo: 'http://github.com/saqqdy/ui-lib-demo',
        // 假如文档不是放在仓库的根目录下：
        docsDir: 'docs',
        // 假如文档放在一个特定的分支下：
        docsBranch: 'dev',
        // 默认是 false, 设置为 true 来启用
        editLinks: true,
        // 默认为 "Edit this page"
        editLinkText: '帮助我们改善此页面！'
    },
    locales: {
        // 键名是该语言所属的子路径
        // 作为特例，默认语言可以使用 '/' 作为其路径。
        '/en/': {
            lang: 'en-US', // 将会被设置为 <html> 的 lang 属性
            title: 'UILibDemo',
            description: '组件库demo'
        },
        '/': {
            lang: 'zh-CN',
            title: 'UILibDemo',
            description: '组件库demo'
        }
    },

    plugins: [
        // 官方回到顶部插件
        '@vuepress/back-to-top',
        [
            'vuepress-plugin-demo-container',
            {
                // component: 'demo-DemoBlock',
                locales: [
                    {
                        lang: 'zh-CN',
                        'demo-block': {
                            'hide-text': '隐藏代码',
                            'show-text': '显示代码',
                            'copy-text': '复制代码',
                            'copy-success': '复制成功'
                        }
                    },
                    {
                        lang: 'en-US',
                        'demo-block': {
                            'hide-text': 'Hide',
                            'show-text': 'Expand',
                            'copy-text': 'Copy',
                            'copy-success': 'Successful'
                        }
                    }
                ]
            }
        ],
        [
            'vuepress-plugin-right-anchor',
            {
                showDepth: 1,
                ignore: ['/', '/start/'],
                expand: {
                    default: true
                    // trigger: 'hover',
                },
                customClass: '',
                disableGlobalUI: false
            }
        ],
        //官方图片放大组件 目前是所有img都可以点击放大。具体配置见https://v1.vuepress.vuejs.org/zh/plugin/official/plugin-medium-zoom.html
        ['@vuepress/medium-zoom', { selector: 'img' }],
        // vssue 一个借助issue的评论插件 具体配置见https://vssue.js.org/zh/
        [
            '@vssue/vuepress-plugin-vssue',
            {
                // 设置 `platform` 而不是 `api` 我这里是在github平台
                platform: 'github',
                // owner与repo配置 https://github.com/${owner}/${repo}
                owner: 'saqqdy',
                repo: 'ui-lib-demo',
                // 填写自己的OAuth App 信息。详见https://vssue.js.org/zh/options/#repo
                clientId: '',
                clientSecret: '',
                locale: 'zh', //使用的语言  这里是简体中文
                baseURL: 'https://github.com' //平台的 base URL
            }
        ]
    ],
    markdown: {
        lineNumbers: false,
        toc: { includeLevel: [2, 3] }
    },
    sidebarDepth: 1,
    // chainWebpack: config => {
    //     // console.log(config.plugin('style-resources-loader'));
    //     config
    //         .plugin('style-resources-loader')
    //         .use(require('style-resources-loader'))
    //         .tap(options =>
    //             Object.assign(options, [
    //                 {
    //                     preProcessor: 'less',
    //                     patterns: [resolve('../../src/css/var.less')],
    //                 },
    //             ])
    //         )
    //         .end();
    //     // 移除 prefetch 插件
    //     // config.plugins.delete('prefetch');

    //     return config;
    // },
    configureWebpack: {
        resolve: {
            alias: {
                '@assets': require('path').join(__dirname, '../assets'),
                packages: require('path').join(__dirname, '../../packages'),
                '@': require('path').join(__dirname, '../../src'),
                root: require('path').join(__dirname, '../../')
            }
        }
    },
    devServer: {
        // before: app => {
        // 	const api = require('./src/api/index');
        // 	api(app);
        // },
        proxy: {
            '/ui-lib-demo/': {
                target: 'http://127.0.0.1:8080',
                changeOrigin: true,
                pathRewrite: {}
            },
            '/node/': {
                target: 'http://127.0.0.1:8080',
                changeOrigin: true,
                pathRewrite: {}
            }
        }
    }
}
