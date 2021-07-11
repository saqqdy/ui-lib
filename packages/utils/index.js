// 向上
/**
 * @param componentName
 * @param eventName
 * @param params
 */
export function dispatch(componentName, eventName, params) {
    let parent = this.$parent || this.$root,
        name = parent.$options.name
    //寻找父级，如果父级不是符合的组件名，则循环向上查找
    while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        if (parent) {
            name = parent.$options.name
        }
    }
    //找到符合组件名称的父级后，触发其事件。整体流程类似jQuery的closest方法
    if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
    }
}

// 向下
/**
 * @param componentName
 * @param eventName
 * @param params
 */
export function broadcast(componentName, eventName, params) {
    broadcastFn.call(this, componentName, eventName, params)
}

/**
 * @param componentName
 * @param eventName
 * @param params
 */
function broadcastFn(componentName, eventName, params) {
    this.$children.forEach(child => {
        var name = child.$options.name
        if (name === componentName) {
            child.$emit.apply(child, [eventName].concat(params))
        } else {
            broadcast.apply(child, [componentName, eventName].concat([params]))
        }
    })
}
