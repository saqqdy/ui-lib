import vue from 'rollup-plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import path from 'path'
// import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import pkg from '../package.json'

const deps = Object.keys(pkg.dependencies)

const noWlPrefixFile = /(utils|style|hooks|locale)/
const getOutFile = (name, dir = 'lib') => {
    const compName = name.split('/')[1]
    if (noWlPrefixFile.test(name)) {
        return `${dir}/${compName}.js`
    }
    return `${dir}/${compName}.js`
}

export default [
    {
        input: path.resolve(__dirname, '../packages/index.js'),
        output: {
            format: 'es',
            file: 'lib/index.esm.js',
            paths(id) {
                if (/^ui-lib\/packages/.test(id)) {
                    if (noWlPrefixFile.test(id)) return id.replace('ui-lib/packages/', 'ui-lib/lib/')
                    return id.replace('ui-lib/packages/', 'ui-lib/lib/')
                }
            }
        },
        plugins: [
            terser(),
            nodeResolve(),
            // commonjs(),
            json(),
            vue({
                target: 'browser',
                css: false,
                exposeFilename: false
            })
        ],
        external(id) {
            return /^vue/.test(id) || deps.some(k => new RegExp('^' + k).test(id))
        }
    }
]
