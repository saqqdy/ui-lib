const fs = require('fs')
const path = require('path')
const colors = require('colors')
const cwd = process.cwd()
const pkg = fs.readFileSync(path.join(cwd, 'package.json'))
const commandSync = require(path.join(cwd, 'bin/commandSync'))
const sum = require(path.join(cwd, 'bin/getStatus'))()
const version = JSON.parse(pkg).version
const argvs = process.argv.slice(2)
if (!version) {
    process.exit(1)
}
// if (!sum || sum.A.length + sum.D.length + sum.M.length + sum['??'].length === 0) {
// 	console.warn(colors.red('检测到当前lib目录没有待提交的文件，请确认已运行 npm run dist 指令构建项目！'));
// }
let line = commandSync('git', ['symbolic-ref', '--short', '-q', 'HEAD']).stdout
if (argvs.includes('--deploy') && line !== 'master') {
    console.info(colors.yellow('请在master分支下执行'))
    process.exit(1)
}
if (argvs.length === 0 && !argvs.includes('--deploy')) {
    console.info(colors.yellow('请输入提交信息'))
    process.exit(1)
}
commandSync('git', ['fetch', 'origin', '--tags'])
commandSync('git', ['add', '.'])
commandSync('git', ['reset', '-q', 'HEAD', '--', 'lib'])
commandSync('git', ['checkout', '--', 'lib'])
// commandSync('git', ['clean', '-fd', 'lib']);
// commandSync('git', ['checkout', '.']);
commandSync('git', ['commit', '-m', argvs.includes('--deploy') ? `"push version ${version}"` : argvs.length > 0 ? argvs[0] : 'push some changes'])
commandSync('git', ['push'])
if (argvs.includes('--deploy')) {
    let id = commandSync('git', ['rev-list', '--tags', '--max-count', '1']).stdout,
        latest = commandSync('git', ['describe', '--tags', id]).stdout
    if (latest === version) {
        console.info(colors.red('当前版本已存在，请更改package.json里面的version之后再执行'))
        process.exit(1)
    }
    commandSync('git', ['tag', version])
    commandSync('git', ['push', 'origin', version])
    commandSync('git', ['tag', '-d', version])
    process.stdout.write(version)
} else {
    process.stdout.write(colors.green('推送成功！'))
}
