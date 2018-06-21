<style scoped>
  .ivu-icon{
    font-size: 16px;
    cursor: pointer;
  }
  .ivu-icon-ios-folder{
    color: #0a89fb;
    margin-right: 5px;
  }
  .ivu-icon-android-arrow-dropright{
    color: white;
    margin-left: 5px;
  }
  .ivu-icon-android-arrow-dropdown{
    color: #0a89fb;
    margin-left: 5px;
  }
  li{
    list-style: none;
    text-align: left;
    position: relative;
  }
  li ul{
    margin-left: 20px;
  }
</style>

<template>
  <li>
    <div @click="toggle">
      <!--此处为折叠式情况-->
      <span v-if="isFolder">
        <i class="ivu-icon ivu-icon-ios-folder"></i>
        {{model.name}}
        <i v-show="!open" class="ivu-icon ivu-icon-android-arrow-dropright"></i>
        <i v-show="open" class="ivu-icon ivu-icon-android-arrow-dropdown"></i>
      </span>
      <!--此处为人员时情况，可添加点击查看详情事件-->
      <span v-if="!isFolder">
        <i class="ivu-icon ivu-icon ivu-icon-person"></i>
        {{model.name}}
      </span>
    </div>
    <ul v-show="open" v-if="isFolder">
      <template v-for="(model, index) in model.children">
        <Tree class="item" :key="index" :model="model"></Tree>
      </template>
    </ul>
  </li>
</template>

<script>
    export default {
        name: 'Tree',
        props: {
          model: Object
        },
        data: function () {
          return {
            open: false,
          }
        },
        computed: {
          isFolder: function () {
            return this.model.children &&
              this.model.children.length
          }
        },
        methods:{
          toggle: function () {
            if (this.isFolder) {
              this.open = !this.open
            }
          }
        }
    }
</script>
