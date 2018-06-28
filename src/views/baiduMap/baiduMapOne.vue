<template>
  <div class="baiDuMap">
    <div id="map" style="width: 75%;height: 800px;"></div>
  </div>
</template>

<script>
  import {MP} from '../../utils/baduMapInit.js'
  import baiduMapStyle from '../../utils/baiduMapStyle.js'
  export default {
    name: 'baiDuMap',
    data(){
        return{
          mapRoot:''
        }
    },
    mounted(){
      this.initMap();
    },
    methods:{
      initMap(){
          this.createMap();
      },
      createMap(){
          let that = this;
          MP("G0bMrAM75NEcwnPuRSYpN8VBDOhSqeCD").then( BMap => {
            that.mapRoot = new BMap.Map("map");// 创建Map实例
            that.mapRoot.centerAndZoom(new BMap.Point(121.487726,31.691703), 12);// 创建点坐标
            that.setMapEvent();
            that.setMapStyle();
          })
      },
      setMapEvent(){
        //添加控件
        this.mapRoot.addControl(new BMap.NavigationControl());//平移缩放控件
        this.mapRoot.addControl(new BMap.ScaleControl());//比例尺
        this.mapRoot.addControl(new BMap.OverviewMapControl());//缩略地图
        //this.mapRoot.addControl(new BMap.MapTypeControl());//地图类型
        this.mapRoot.setCurrentCity("上海"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用
        this.mapRoot.enableScrollWheelZoom();//启用滚轮放大缩小
      },
      //定制化地图
      setMapStyle(){
        this.checkHtml5();
        this.mapRoot.setMapStyle({
          styleJson:baiduMapStyle
        });
      },
      //地图定制支持检测
      checkHtml5(){
        if (typeof(Worker) === "undefined")
        {
          if(navigator.userAgent.indexOf("MSIE 9.0")<=0)
          {
            alert("定制个性地图示例：IE9以下不兼容，推荐使用百度浏览器、chrome、firefox、safari、IE10");
          }
        }
      },
      //搜索
      mapSearch(){
       let that = this;
       var myGeo = new BMap.Geocoder();
       // 将地址解析结果显示在地图上，并调整地图视野
       myGeo.getPoint("上海市杨浦区城市概念", function(point){
         if (point) {
           that.mapRoot.centerAndZoom(point, 16);
           that.mapRoot.addOverlay(new BMap.Marker(point));
         }else{
          alert("您选择地址没有解析到结果!");
         }
       });
      },
    }
  }
</script>

<style scope>

</style>