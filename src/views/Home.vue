<template>
<drag-zone class="home-html">
  <drag-content class="content menu-flexble">
    <div class="menu-parent" v-for="(item, index) in homeMenuData" :key="item.pId">
      <div class="menu-parent-title" :title="item.pName" @click="openMenu(index)">
        <img class="menu-p" src="../assets/img/menu-parent.png" alt="menu-parent">
        <span>{{ item.pName }}</span>
        <img v-show="!item.isOpen"  class="arrow-p" src="../assets/img/arrow-dowm.png" alt="arrow-dowm">
        <img v-show="item.isOpen" class="arrow-p" src="../assets/img/arrow-up.png" alt="arrow-up">
      </div>
      <transition name="menu-show">
      <div class="menu-children" v-show="item.isOpen">
        <div class="menu-child" v-for="i in item.children" :key="i.cId" @click="menuClick(i.cId, i.linkName)" :class="{'menu-child-active':chooseMenuId==i.cId}">
          <img src="../assets/img/menu-child.png" alt="menu-child">
          <span>{{ i.cName }}</span>
        </div>
      </div>
      </transition>
    </div>
  </drag-content>
  <drag-handle class="handle"></drag-handle>
  <drag-content class="content container-flexble">
    <router-view/>
  </drag-content>
</drag-zone>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      chooseMenuId:'0',
      homeMenuData:[
        {pName:'组件', pId:'A', isOpen:false,
          children:[
            {cName:'公共组件1', cId:'3', linkName:'GlobalsComponentsShow1'},
            {cName:'tree', cId:'1', linkName:'tree'},
            {cName:'dragTree',cId:'2',linkName:'drogTree'},
            {cName:'solider1',cId:'4',linkName:'solider1'}
          ]
        },
        {pName:'地图', pId:'B', isOpen:false,
          children:[
            {cName:'百度地图-示例1', cId:'3', linkName:'baiduMapOne'},
            {cName:'百度地图-示例2', cId:'5', linkName:'baiduMapTwo'},
            {cName:'mapbox-示例1', cId:'4', linkName:'mapboxOne'}
          ]
        },
        {pName:'可视化', pId:'C', isOpen:false,
          children:[
            {cName:'可视化-示例1', cId:'c1', linkName:'DataVisualization1'},
            {cName:'可视化-示例2', cId:'c2', linkName:'DataVisualization2'},
          ]
        }
      ]
    }
  },
  methods:{
    openMenu(index) {
      this.homeMenuData[index].isOpen = !this.homeMenuData[index].isOpen;
    },
    menuClick(id, name) {
      this.chooseMenuId = id;
      this.$router.push({name: name})
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-parent{
  width: 100%;
  height: auto;
  .menu-parent-title{
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    span{
      text-align: left;
      display: inline-block;
      width: 150px;
      margin-right: 10px;
      margin-left: 10px;
    }
    .menu-p{
      position: relative;
      top: 1px;
    }
    .arrow-p{
      width: 25px;
      position: relative;
      top: 9px;
    }
  }
  .menu-children{
    transition: all .2s ease-in-out;
  }
  .menu-child{
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #363e4f;
    cursor: pointer;
    &:hover{
      background: #2d8cf0;
      padding-left: 5px;
      box-sizing: border-box;
    }
    span{
      text-align: left;
      display: inline-block;
      width: 150px;
      color: #ffffff;
    }
    img{
      position: relative;
      top: 2px;
      margin-right: 10px;
    }
  }
  .menu-child-active{
    background: #2d8cf0;
  }
}
.menu-show-enter-active{
  transition: all 2s;
}
.menu-show-leave-active {
  transition: all 0.5s;
}
.menu-show-enter, .menu-show-leave-to {
  transform: translateY(-10px);
  opacity: 0.5;
}

.drag-zone{
  position: absolute !important;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.home-html {
  width: 100%;
  height: auto;
  clear: both;
  display: flex;
  justify-content: space-between;
  .handle {
    height: auto;
    // 拖线宽度
    width: 3px;
    // 拖线颜色
    background: #ccc;
  }
  .content {
    height: auto;
    overflow: auto;
  }
}
.menu-flexble{
  // 左边宽度
  width: 17%;
  // 左边最小宽度
  min-width:250px;
  // 左边背景色
  background: #495060;
  color: #ffffff;
  border: 2px solid #d7dde4;
}
.container-flexble{
  // 右边宽度
  width: 83%;
  // 右边背景色
  background: #fff;
}
</style>