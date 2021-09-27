/**
 * @Description:
 * @Author: saqqdy
 * @LastEditors: saqqdy
 * @Date: 2021-07-12 09:33:06
 * @LastEditTime: 2021-08-19 23:29:19
 */
const path = require('path')
const fs = require('fs')
const util = require('util')
// 导入 parser 函数
const { parser } = require('@vuese/parser')
const { Render } = require('@vuese/markdown-render')
let list = []

const readDir = entry => {
    const dirInfo = fs.readdirSync(entry)
    dirInfo.forEach(item => {
        const url = path.join(entry, item)
        const info = fs.statSync(url)
        if (info.isDirectory()) {
            readDir(url)
        } else {
            // console.log(entry, item);
            ;/^[\S]*\.(vue)$/.test(item) && getInfo(entry, item, url)
        }
    })
}
readDir('packages')

/**
 * @param {string} entry entry
 * @param {string} item item
 * @param {string} url url
 */
function getInfo(entry, item, url) {
    const name = item.replace(/\.vue$/, '')
    const pathName = entry.split('/').reverse()[0]
    const fileDir = entry.replace(/^\w+\//, 'docs/components/')
    const filePartsDir = entry.replace(/^\w+\//, 'docs/components-parts/')
    const ph = `/components/${pathName}/${name === 'index' || name === pathName ? '' : name}`
    let index = list.findIndex(el => el.path === ph)
    if (index === -1) {
        list.push({
            title: name === 'index' || name === pathName ? pathName : pathName + '/' + name,
            path: ph,
            collapsable: false
        })
    }
    // 读取 vue 文件内容
    const source = fs.readFileSync(url, 'utf-8')
    fs.mkdirSync(filePartsDir, { recursive: true }, () => {})
    let topParts,
        bottomParts,
        topFile = path.resolve(filePartsDir, 'top.md'),
        bottomFile = path.resolve(filePartsDir, 'bottom.md')
    // const stats = await util.promisify(fs.stat)(path.resolve(filePartsDir, 'top.md'));
    try {
        topParts = fs.readFileSync(topFile, 'utf-8')
    } catch {
        topParts = `---
title: ${pathName}
sidebarDepth: 2
---

<Block>

# ${pathName}

> ${pathName}组件

## 使用方法

\`\`\`js

\`\`\`

</Block>

`
        fs.writeFileSync(topFile, topParts)
    }
    try {
        bottomParts = fs.readFileSync(bottomFile, 'utf-8')
    } catch {
        bottomParts = `
<Block>

## Demo

### template 方式

::: demo \`${pathName}\`

\`\`\`html
<template>
	<div>

	</div>
</template>
<script>
	export default {
		data() {
			return {};
		},
	};
</script>
\`\`\`

:::

</Block>
`
        fs.writeFileSync(bottomFile, bottomParts)
    }
    // 使用 parser 函数解析并得到结果
    try {
        const parserRes = parser(source)
        // 创建渲染实例
        const r = new Render(parserRes)
        // 基本渲染，返回值是一个对象
        // const renderRes = r.render();
        // 渲染完整的 markdown 文本，返回值是 markdown 字符串
        // const markdownRes = r.renderMarkdown();
        const markdownObj = r.render()
        const content = `${topParts}

<Block>

## 参数

${markdownObj.props}

## 事件

${markdownObj.events}

</Block>

${bottomParts}
`
        const fileName = (name === pathName ? 'index' : name) + '.md'
        fs.mkdirSync(fileDir, { recursive: true }, () => {})
        // fs.closeSync(fs.openSync(path.resolve(fileDir, fileName), 'w'));
        fs.writeFileSync(path.resolve(fileDir, fileName), content /* markdownRes.content */)
    } catch (e) {
        console.error(e)
    }
}
// console.log(list);
