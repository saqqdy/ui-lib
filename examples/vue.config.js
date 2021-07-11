const path = require('path');
function resolve(dir) {
	return path.join(__dirname, dir);
}
module.exports = {
	lintOnSave: false,
	chainWebpack: config => {
		config.resolve.alias.set('@', resolve('./src')).set('ui-lib-demo', resolve('../'));
	},
};
