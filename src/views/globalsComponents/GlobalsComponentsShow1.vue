<template>
<div class="globals-components-show1">
	<span>{{searchText}}</span>
	<c-input v-model="searchText"></c-input>
</div>
</template>

<script>
import CInput from '../../components/CInput'
export default {
  name: 'globalsComponentsShow1',
  components:{
		CInput
	},
  data () {
    return {
			searchText:''
		}
  },
  computed:{},
  mounted(){},
  methods:{}
}
</script>

<style lang="scss" scoped>
</style>