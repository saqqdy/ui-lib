const fs = require('fs');
const path = require('path');
// const colors = require('colors');
const cwd = process.cwd();
const commandSync = require(path.join(cwd, 'bin/commandSync'));
let argvs = process.argv.slice(2),
	list = [];
const readDir = entry => {
	const dirInfo = fs.readdirSync(entry);
	dirInfo.forEach(item => {
		const name = path.join(entry, item);
		const info = fs.statSync(name);
		if (info.isDirectory()) {
			readDir(name);
		} else {
			let fileName = name.split('/').reverse();
			/^[\S]*\.(vue|js)$/.test(fileName[0]) && getInfo(name);
		}
	});
};
const getInfo = path => {
	let out = commandSync('git', ['log', '--pretty=oneline', path]).stdout.split(' ').splice(0, 1)[0],
		// committer = commandSync('git', ['log', '--pretty=format:"%cn"', out, '-1']).stdout.replace(/\"/g, ''),
		author = commandSync('git', ['log', '--pretty=format:"%an"', out, '-1']).stdout.replace(/\"/g, '');
	list.push({
		admin: author,
		// committer: committer,
		path: path,
	});
};
if (argvs.length === 0) argvs = ['packages', 'src'];
argvs.forEach(dir => {
	readDir(dir);
});
fs.writeFileSync(path.join(cwd, 'module.json'), JSON.stringify(list));
