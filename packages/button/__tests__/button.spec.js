/* eslint-disable */
import { shallowMount } from '@vue/test-utils'
import Button from 'ui-lib/packages/button/button.vue'

describe('开始测试 Button 组件 /packages/button/button.vue', () => {
    it('输入框初始值为空字符串', () => {
        const type = 'primary'
        const wrapper = shallowMount(Button, {
            propsData: { type }
        })
        // expect(wrapper.text()).toMatch(type)
        expect(wrapper.vm.type).toBe(type)
    })
})
