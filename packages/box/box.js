import Vue, { nextTick } from 'vue'
import tmp from './box.vue'

const defaultOption = {
    title: '提示',
    width: '800px',
    height: '360px',
    confirmName: '确定',
    cancelName: '取消',
    showConfirm: true,
    showCancel: true,
    showClose: true,
    showHeader: true,
    showButton: true,
    template: null
}

/**
 * box
 *
 * @param {object} opt 参数配置
 * @returns {object} instance
 */
export default function box(opt) {
    const vueConstructor = Vue.extend(Object.assign({ router: this.$router, store: this.$store }, tmp))
    let instance = new vueConstructor({
        el: document.createElement('div'),
        props: {}
    })
    document.body.appendChild(instance.$el)
    instance.options = Object.assign({}, defaultOption, opt)

    nextTick(() => {
        instance.visible = true
    })
    Vue.$plugins.push({
        name: 'PluginBox',
        id: instance._uid,
        instance
    })

    return instance
}
