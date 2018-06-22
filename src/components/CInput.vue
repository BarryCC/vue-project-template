<template>
<div class="c-input">
	<input
		v-bind:value="value"
		v-on:input="$emit('input', $event.target.value)"
	>
</div>
</template>

<script>
export default {
	name: 'c-input',
	props: ['value'],
  data () {
    return {}
  },
  methods:{}
}
</script>

<style lang="scss" scoped>
</style>