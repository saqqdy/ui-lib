# 概要

组件库 demo 主要采用

## 有哪些功能

<ClientOnly>

<base-Box>
<div v-for="(item, key) in components" :key="key">
    <a :href="item" :title="key">{{ key }}</a>
</div>
</base-Box>

<!-- <base-Star></base-Star> -->

</ClientOnly>

<script>
const components = require('root/components.json')
export default {
	data() {
		return {
			components: []
		}
	},
	mounted() {
		for (let key in components) {
			components[key] = this.$withBase('/components/' + components[key].replace(/^\.\/packages\/([\d\w\-]+)\/.+/, "$1"))
		}
		this.components = components

  }
}
</script>
