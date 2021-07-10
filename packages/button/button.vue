<template>
	<button class="wl-button" :type="type">
		<slot></slot>
		<text></text>
	</button>
</template>
<script>
import { nextIndex } from 'ui-lib-demo/packages/utils/nextIndex';
export default {
	name: 'WlButton',
	props: {
		type: String,
		disabled: Boolean,
	},
	data() {
		return {};
	},
	created() {
		nextIndex();
	},
	methods: {},
};
</script>
