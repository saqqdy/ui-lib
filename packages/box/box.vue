<template>
    <transition name="fade">
        <view class="ui-box" tabindex="-1">
            <view class="ui-box__body">box body</view>
        </view>
    </transition>
</template>
<script>
export default {
    name: 'UiBox',
    props: {
        options: Object
    },
    data() {
        return {
            visible: false,
            zIndex: 0,
            instance: null,
            isAppendContent: false,
            maxW: '600px',
            maxH: '480px',
            mWidth: null,
            mHeight: null,
            max: false
        }
    },
    mounted() {},
    methods: {}
}
</script>
