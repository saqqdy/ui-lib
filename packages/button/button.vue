<template>
    <button class="ui-button" :type="type">
        <slot></slot>
        <text></text>
    </button>
</template>
<script>
import { nextIndex } from 'ui-lib/packages/utils/nextIndex'
export default {
    name: 'UiButton',
    props: {
        type: String,
        disabled: Boolean
    },
    data() {
        return {}
    },
    created() {
        nextIndex()
    },
    methods: {}
}
</script>
