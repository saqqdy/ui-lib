/**
 * @Description:
 * @Author: saqqdy
 * @LastEditors: saqqdy
 * @Date: 2021-07-12 09:33:06
 * @LastEditTime: 2021-07-14 09:36:45
 */
const execa = require('execa')

module.exports = (command, props) => {
    try {
        return execa.sync(command, props)
    } catch (e) {
        return e
    }
}
