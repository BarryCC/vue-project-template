<template>
<div class="layout">
	<slot></slot>
</div>
</template>

<script>
export default {
	name: 'layout',
}
</script>

<style lang="scss" scoped>
.layout {
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;
	overflow: hidden;
}
</style>