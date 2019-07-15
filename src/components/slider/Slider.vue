<template>
<div class="slider">
	<div class="menu-parent" v-for="(item, index) in homeMenuData" :key="item.pId">
		<div class="menu-parent-title" :title="item.pName" @click="openMenu(index)">
			<img class="menu-p" src="../../assets/images/menu-parent.png" alt="menu-parent">
			<span>{{ item.pName }}</span>
			<img v-show="!item.isOpen"  class="arrow-p" src="../../assets/images/arrow-dowm.png" alt="arrow-dowm">
			<img v-show="item.isOpen" class="arrow-p" src="../../assets/images/arrow-up.png" alt="arrow-up">
		</div>
		<transition name="menu-show">
		<div class="menu-children" v-show="item.isOpen">
			<div class="menu-child" 
					 v-for="i in item.children" 
					 :key="i.cId" 
					 @click="menuClick(i.cId, i.linkName)" 
					 :class="{'menu-child-active': chooseMenuId==i.cId}">
				<img src="../../assets/images/menu-child.png" alt="menu-child">
				<span>{{ i.cName }}</span>
			</div>
		</div>
		</transition>
	</div>
</div>
</template>

<script>
export default {
	name: 'slider',
	data () {
    return {
      chooseMenuId:'0',
      homeMenuData:[
        {pName:'组件', pId:'A', isOpen:false,
          children:[
            {cName:'公共组件1', cId:'3', linkName:'home'},
            {cName:'tree', cId:'1', linkName:'tree'},
            {cName:'dragTree',cId:'2',linkName:'drogTree'},
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
.slider {
	position: absolute;
	top: 100px;
	bottom: 0;
	left: 0;
	right: 85%;
  box-shadow: 0 0 5px #2c3e50;
}
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
</style>
