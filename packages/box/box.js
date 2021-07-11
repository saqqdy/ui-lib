import Vue from 'vue'
import tmp from './box.vue'

const defaultOpt = {
    title: '提示',
    width: '800px',
    height: '360px',
    message: null,
    okBtnName: '确定',
    cancelBtnName: '取消',
    defaultMax: false,
    showOkBtn: true,
    showCancelBtn: true,
    showClose: true,
    showHeader: true,
    showBtn: true,
    showMax: true,
    template: null
}

/**
 * @param opt
 */
export default function box(opt) {
    const vueConstructor = Vue.extend(Object.assign({ router: this.$router, store: this.$store }, tmp))
    let instance = new vueConstructor({
        el: document.createElement('div'),
        props: {}
    })
    document.body.appendChild(instance.$el)
    instance.options = Object.assign({}, defaultOpt, opt)

    Vue.nextTick(() => {
        instance.visible = true
    })
    if (!opt.isGlobal) {
        Vue.$plugin.push({
            name: 'PluginBox',
            id: instance._uid,
            instance: instance
        })
    }

    return instance
}
