<template>
    <div class="base-box">
        <div class="base-box-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BaseBox',
    props: {
        content: String
    }
}
</script>

<style lang="less" scoped>
.base-box {
    padding: 2rem 1.2rem;
    line-height: 1.6;
}
</style>
