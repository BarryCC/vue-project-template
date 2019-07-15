<template>
	<div class="checkbox-group">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'Checkboxgroup',
	model: {
    prop: 'valueList',
    event: ''
  },
  props: {
    checked: {
			valueList: Array
		}
	},
	data(){
		return {
		}
	}
}
</script>

<style scoped>
.checkbox-group {
	overflow: auto;
}
</style>