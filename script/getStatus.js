const path = require('path')
const cwd = process.cwd()
const commandSync = require(path.join(cwd, 'bin/commandSync'))

module.exports = () => {
    const out = commandSync('git', ['status', '-s', '--no-column', 'lib']).stdout.replace(/(^\s+|\n*$)/g, '')
    let list = out ? out.replace(/\n(\s+)/g, '\n').split('\n') : [],
        sum = {
            A: [],
            D: [],
            M: [],
            '??': []
        }
    if (list.length === 0) return null
    list.forEach(str => {
        let arr = str.trim().replace(/\s+/g, ' ').split(' '),
            type = arr.splice(0, 1)
        if (!sum[type]) sum[type] = []
        sum[type].push(arr.join(' '))
    })
    return sum
}
