<template>
<div class="globals-components-show1">
	<c-input v-model="searchText"></c-input>
  <span>{{searchText}}</span>
</div>
</template>

<script>
export default {
  name: 'globalsComponentsShow1',
  data () {
    return {
			searchText:''
		}
  },
  methods:{}
}
</script>

<style lang="scss" scoped>
</style>