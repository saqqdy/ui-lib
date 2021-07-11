const fs = require('fs');
import vue from 'rollup-plugin-vue';
import css from 'rollup-plugin-css-only';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';
import path from 'path';
import pkg from '../package.json';

const components = require('../components.json');
const deps = Object.keys(pkg.dependencies);

const noWlPrefixFile = /(utils|style|hooks)/;
const getOutFile = (name, dir = 'lib') => {
	const compName = name.split('/')[1];
	if (noWlPrefixFile.test(name)) {
		return `${dir}/${compName}.js`;
	}
	return `${dir}/${compName}.js`;
};

export default Object.keys(components).map(key => ({
	input: path.resolve(__dirname, '../' + components[key]),
	output: [
		{
			format: 'es',
			file: getOutFile(components[key], 'es'),
			paths(id) {
				if (/^ui-lib-demo\/packages/.test(id)) {
					if (noWlPrefixFile.test(id)) return id.replace('ui-lib-demo/packages/', 'ui-lib-demo/lib/');
					return id.replace('ui-lib-demo/packages/', 'ui-lib-demo/lib/');
				}
			},
		},
		{
			format: 'cjs',
			file: getOutFile(components[key], 'lib'),
			exports: 'named',
			paths(id) {
				if (/^ui-lib-demo\/packages/.test(id)) {
					if (noWlPrefixFile.test(id)) return id.replace('ui-lib-demo/packages/', 'ui-lib-demo/lib/');
					return id.replace('ui-lib-demo/packages/', 'ui-lib-demo/lib/');
				}
			},
		},
	],
	plugins: [
		css(),
		vue({
			target: 'browser',
			css: false,
		}),
		nodeResolve(),
		esbuild(),
	],
	external(id) {
		return /^vue/.test(id) || /^ui-lib-demo/.test(id) || deps.some(k => new RegExp('^' + k).test(id));
	},
}));
