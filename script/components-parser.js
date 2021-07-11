const path = require('path')
const fs = require('fs')
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

function getInfo(entry, item, url) {
    console.log(entry, item)
    const name = item.replace(/\.vue$/, '')
    const pathName = entry.split('/').reverse()[0]
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
    // 使用 parser 函数解析并得到结果
    try {
        const parserRes = parser(source)
        // 创建渲染实例
        const r = new Render(parserRes)
        // 基本渲染，返回值是一个对象
        const renderRes = r.render()
        // 渲染完整的 markdown 文本，返回值是 markdown 字符串
        const markdownRes = r.renderMarkdown()
        fs.writeFileSync(path.resolve(entry, (name === pathName ? 'index' : name) + '.md'), markdownRes.content)
    } catch (e) {
        console.error(e)
    }
}
console.log(list)
