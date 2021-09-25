# 快速上手

本节将介绍如何在项目中使用 ui-lib

## 引入 ui-lib

你可以引入整个 ui-lib，或是根据需要仅引入部分组件。

### 完整引入

在 main.js 中写入以下内容：

```js
import Vue from 'vue'
import UILib from 'ui-lib'
import App from './App.vue'

Vue.use(UILib, { zIndex: 5000 })

new Vue({
    render: h => h(App)
}).$mount('#app')
```

以上代码便完成了 ui-lib 的引入。

## 按需引入

借助 babel-plugin-import，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 babel-plugin-import:

```shell
yarn add babel-plugin-import -D
# 或者
npm install babel-plugin-import -D
```

然后，将 babel.config.js 修改为：

```js
module.exports = {
    plugins: [
        [
            'import',
            {
                libraryName: 'ui-lib'
            }
        ]
    ]
}
```

## 开始使用

至此，一个基于 Vue 和 ui-lib 的开发环境已经搭建完毕，现在就可以编写代码了。各个组件的使用方法请参阅它们各自的文档。
