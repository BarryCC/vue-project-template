<style scope>
.baiDuMapTwo{
  position: relative;
  width: 100%;
  height: 800px;
}
.BDMap-header{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: left;
  font-size: 22px;
  }
.BDMap-header .goBack{
  margin-left: 70px;
  font-weight: bold;
  display: inline-block;
  cursor: pointer;
}
.BDMap-header .goBack i{
  margin-right: 5px;
}
.BDMap-header .choose-area{
  font-weight: bolder;
  margin-left: 20px;
  display: inline-block;
}
</style>

<template>
  <div class="baiDuMapTwo">
		<div v-show="!BDMapShow" id="SHMapChart" style="width: 70%;height: 800px;"></div>
    <div v-show="BDMapShow" id="BDMap" style="width: 70%;height: 800px;"></div>
    <div v-show="BDMapShow" class="BDMap-header">
      <div class="goBack" @click="mapToChart">
        <i class="ivu-icon ivu-icon-chevron-left"></i>
        <span>返回</span>
      </div>
      <div class="choose-area">浦东新区</div>
    </div>
  </div>
</template>

<script>
  //echarts按需引用
  require('echarts/lib/chart/map');
  require('echarts/lib/component/title');
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/visualMap');
  //百度地图
  import {MP} from '../../utils/baduMapInit.js'
  import baiduMapStyle from '../../utils/baiduMapStyle.js'
  export default {
    name: 'baiDuMapTwo',
    data(){
        return{
          mapChartRoot:'',
          mapChartOption:{
            backgroundColor: '#404a59',
            title: {
              text: '上海市各区人员分布',
              top: '5',
              left: 'center',
              textStyle: {
                color: 'white'
              }
            },
            tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(12, 204, 104, 0.92)',
                borderColor: '#FFFFCC',
                showDelay: 0,
                hideDelay: 0,
                enterable: true,
                transitionDuration: 0,
                extraCssText: 'z-index:110',
                formatter: function(params, ticket, callback) {
                    //根据业务自己拓展要显示的内容
                    var res = "";
                    var name = params.name;
                    var value = params.value;
                    res = "<span style='color:#fff;'>" + name + "</span><br/>数据：" + value;
                    return res;
                }
            },
            visualMap: {
              left: '20',
              bottom: '30',
              min: 0,
              max: 800,
              splitNumber: 5,
              inRange: {
                color: ['#d94e5d','#eac736','#50a3ba'].reverse()
              },
              textStyle: {
                color: '#fff'
              }
            },
            series: [{
              type: 'map',
              map: '上海',
              roam: false,//不能放大
              zoom: 1.17,//放大比例
              label: {
                normal: {
                  show: false,
                  color: '#ffffff',
                },
                emphasis: {
                  color: '#ffffff',
                }
              },
              itemStyle: {
                normal: {
                  show: false,
                  areaColor: '#323c48',
                  borderColor: '#111'
                },
                emphasis: {
                  areaColor: '#2a333d'
                }
              },
              data:[]
            }]
          },
          mapChartData: [
            {
                name: '黄浦区',
                value: 219
            }, {
                name: '徐汇区',
                value: 339
            }, {
                name: '长宁区',
                value: 412
            }, {
                name: '静安区',
                value: 429
            }, {
                name: '普陀区',
                value: 389
            }, {
                name: '闸北区',
                value: 352
            }, {
                name: '虹口区',
                value: 329
            }, {
                name: '杨浦区',
                value: 532
            }, {
                name: '闵行区',
                value: 299
            }, {
                name: '宝山区',
                value: 139
            }, {
                name: '嘉定区',
                value: 440
            }, {
                name: '浦东新区',
                value: 89
            }, {
                name: '金山区',
                value: 652
            }, {
                name: '松江区',
                value: 415
            }, {
                name: '青浦区',
                value: 329
            }, {
                name: '奉贤区',
                value: 752
            }, {
                name: '崇明县',
                value: 399
            }
          ],
          BDMapShow:false,
          BDMapRoot:'',
        }
    },
    mounted(){
      this.initMapChart();
    },
    methods:{
      //初始化echarts地图
			initMapChart(){
        this.mapChartRoot = this.$echarts.init(document.getElementById('SHMapChart'));
        this.generateMapChart();
      },
      //生成echarts地图
      generateMapChart(){
        let _self = this;
        this.$http.get('../../../static/shanghai.json').then(function (res) {
          _self.$echarts.registerMap('上海', res);
          _self.mapChartOption.series[0].data = _self.mapChartData;
          _self.mapChartRoot.setOption(_self.mapChartOption, true);
          setTimeout(_self.goBDMap(), 1000);
        });
      },
      //进入百度地图
      goBDMap(){
        let _self = this;
        _self.mapChartRoot.on("click", function(param) {
          //显示百度地图，隐藏上海地图chart
          _self.BDMapShow = true;
          _self.initBDMap();
        });
      },
      //初始化百度地图，创建Map实例
      initBDMap(){
        let _self = this;
        MP("G0bMrAM75NEcwnPuRSYpN8VBDOhSqeCD").then( BMap => {
          _self.BDMapRoot = new BMap.Map("BDMap");
          //设置基本设置，不需要改变的
          _self.setMapEvent();
          _self.setMapStyle();
          //创建点坐标和放大倍数,创建多边形，添加覆盖物
          _self.drawPolygon(BMap);
        })
      },
      //添加控件
      setMapEvent(){
        this.BDMapRoot.addControl(new BMap.NavigationControl());//平移缩放控件
        //this.BDMapRoot.addControl(new BMap.ScaleControl());//比例尺
        //this.BDMapRoot.addControl(new BMap.OverviewMapControl());//缩略地图
        //this.BDMapRoot.addControl(new BMap.MapTypeControl());//地图类型
        this.BDMapRoot.setCurrentCity("上海"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用
        this.BDMapRoot.enableScrollWheelZoom();//启用滚轮放大缩小
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
      //定制化地图
      setMapStyle(){
        this.checkHtml5();
        this.BDMapRoot.setMapStyle({
          styleJson:baiduMapStyle
        });
      },
      //创建点坐标和放大倍数,创建多边形，添加覆盖物
      drawPolygon(BMap){
        // 创建点坐标和放大倍数
        this.BDMapRoot.centerAndZoom(new BMap.Point(121.480,31.235), 12);
        //创建多边形，添加覆盖物
        let polygon = new BMap.Polygon([
          new BMap.Point(121.491265,31.237661),
          new BMap.Point(121.489109,31.250628),
          new BMap.Point(121.496008,31.264704),
          new BMap.Point(121.496008,31.264704),
          new BMap.Point(121.533665,31.23482),
          new BMap.Point(121.534096,31.217898),
          new BMap.Point(121.506788,31.214563),
        ], {strokeColor:"#00cc8f", strokeWeight:2, strokeOpacity:0.5, fillColor:'#00cc8f', fillOpacity:0.5});
        this.BDMapRoot.addOverlay(polygon);
      },
      //返回到echarts地图
      mapToChart(){
        this.BDMapShow = false;
        //清除覆盖物
      }
    }
  }
</script>
