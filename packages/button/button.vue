<template>
	<button class="wl-button" :type="type">
		<slot></slot>
		<text></text>
	</button>
</template>
<script>
export default {
	name: 'WlButton',
	props: {
		type: String,
		disabled: Boolean,
	},
	data() {
		return {};
	},
	created() {},
	methods: {},
};
</script>
