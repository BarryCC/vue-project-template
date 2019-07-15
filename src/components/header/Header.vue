<template>
  <div class="header">
	  <div class="logo">logo</div>
	  <div class="logout">logout</div>
	  <div class="user-info">user-info</div>
	  <div class="menus">menu</div>
  </div>
</template>

<script>
export default {
	name: 'Header'
}
</script>

<style lang="scss" scoped>
.header {
	width: 100%;
	height: 100px;
	line-height: 100px;
	background: #2e68ea;
}
.logo {
	float: left;
}
.logout, .user-info, .menus {
	float: right;
}
</style>
