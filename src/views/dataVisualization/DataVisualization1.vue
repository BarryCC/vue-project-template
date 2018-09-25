<template>
    <div class="center">
        <div class="center-data">
            <canvas id="canvas" width="1150" height="840">你的浏览器不支持Canvas</canvas>
            <!--中心地球 一级菜单-->
            <div @click="centerBtn" class="ball-big">{{ballBigTitle}}</div>
            <!--二级菜单-->
            <template v-for="(item, index) in firstLevelMenuData">
                <ball-block :key="index"
                            :canClick="item.canClick"
                            @ball-click="changeData(item.name)"
                            :rotate="(index + 1)/firstLevelMenuData.length"
                            :data="item.data"
                            :name="item.name"
                            :type="2"
                            :longRadius="290"
                            :shortRadius="180"></ball-block>
            </template>
            <!--三级菜单-->
            <template v-for="(item, index) in twoLevelMenuData">
                <ball-block :key="index+10"
                            :canClick="item.canClick"
                            @ball-click="changeData(item.name)"
                            :rotate="(index + 1)/twoLevelMenuData.length"
                            :data="item.data"
                            :name="item.name"
                            :type="1"
                            :longRadius="420"
                            :shortRadius="270"></ball-block>
            </template>
            <!--四级菜单-->
            <template v-for="(item, index) in threeLevelMenuData">
                <ball-block :key="index+20"
                            :canClick="item.canClick"
                            @ball-click="changeData(item.name)"
                            :rotate="(index + 1)/threeLevelMenuData.length"
                            :data="item.data"
                            :name="item.name"
                            :type="1"
                            :longRadius="520"
                            :shortRadius="340"></ball-block>
            </template>
        </div>
    </div>
</template>

<script>
    import BallBlock from './BallBlock.vue'
    export  default {
        name: 'share',
        data(){
            return{
                canvasRoot: '',
                firstLevelMenuData: [],
                twoLevelMenuData: [],
                threeLevelMenuData: [],
                ballBigTitle: '星转动',
                testData1: [
                    {name: '人口库', data: 7242356, canClick: 1},
                    {name: '法人库', data: 183888, canClick: 1},
                    {name: '空间地理信息库', data: 44435121, canClick: 1},
                    {name: '电子证照库', data: 0, canClick: 1}
                ],
                testData2: [
                    {name: '图书馆', data: 0, canClick: 0},
                    {name: '办公厅', data: 0, canClick: 0},
                    {name: '总工会', data: 1201, canClick: 0},
                    {name: 'ca中心',  data: 47289, canClick: 0},
                    {name: '网上政务大厅', data: 27564, canClick: 0},
                    {name: '交通委', data: 136810, canClick: 0},
                    {name: '警辉', data: 211728, canClick: 0},
                    {name: '民政', data: 329582, canClick: 0},
                    {name: '信用中心', data: 1083080, canClick: 0},
                    {name: '社保卡中心', data: 5405102, canClick: 0},
                ],
                testData3: [
                    {name: '192.168.3.122', data: 2, canClick: 0},
                    {name: '10.101.59.9', data: 647, canClick: 0},
                    {name: '172.27.93.43', data: 8556, canClick: 0},
                    {name: '192.168.4.21', data: 174687, canClick: 0}
                ],
                testData4: [
                    {name: '上海市地质调查研究院', data: 2912, canClick: 0},
                    {name: '上海市城乡建设和交通发展研究院', data: 85915, canClick: 0},
                    {name: '奉贤区规划和土地管理局', data: 1, canClick: 0},
                    {name: '上海市政府办公厅应急值守处', data: 1763, canClick: 0},
                    {name: '上海市气象局', data: 4183, canClick: 0},
                    {name: '上海市经济和信息委员会信息中心', id: 1, data: 109648, canClick: 0},
                    {name: '上海市审计局', data: 7226, canClick: 0},
                    {name: '上海市机关事务管理局', data: 34340343, canClick: 0},
                    {name: '上海市大数据中心', data: 268, canClick: 0},
                    {name: '上海市房屋状况信息中心', data: 16953, canClick: 0},
                    {name: '上海市工商局信息中心', data: 1, canClick: 0},
                    {name: '上海市航务管理处', data: 3498, canClick: 0},
                    {name: '上海市测绘院', data: 37315, canClick: 0},
                    {name: '上海市浦东新区电子政务管理中心', data: 759, canClick: 0},
                    {name: '上海市城市管理行政执法局', data: 932, canClick: 0},
                    {name: '上海市黄浦区财政局', data: 26, canClick: 0},
                    {name: '上海市房屋土地资源信息中心', data: 77385, canClick: 0},
                    {name: '上海市交通委员会', data: 163216, canClick: 0},
                    {name: '超级用户组', data: 35691, canClick: 0},
                    {name: '上海市浦东新区规划设计研究院', data: 11288, canClick: 0},
                    {name: '上海堤防（泵闸）设施管理处', data: 44965, canClick: 0},
                    {name: '上海市青浦区规土局', data: 2723, canClick: 0},
                    {name: '金山区规划和土地管理局', data: 18641, canClick: 0},
                    {name: '上海市水务局', data: 205116, canClick: 0},
                    {name: '上海市绿化局', data: 725287, canClick: 0},
                    {name: '应用系统', data: 6190975, canClick: 0},
                    {name: '上海市文物局', data: 4, canClick: 0},
                    {name: '上海市闵行区国有资产监督管理委员会', data: 121, canClick: 0},
                    {name: '上海市浦东新区城市运行管理中心', data: 26, canClick: 0},
                    {name: '12345热线', data: 2347940, canClick: 0}
                ],
                testData5: []
            }
        },
        components: {
            'ball-block': BallBlock
        },
        mounted(){
            this.initCanvas();
            this.initCenterMenu();
        },
        methods:{
            initCanvas(){
                let canvasId = document.getElementById("canvas");
                this.canvasRoot = canvasId.getContext("2d");
                // 装饰
                drawEllipse(this.canvasRoot, 240, 150, 0, 'rgba(255, 255, 0, 0.2)');
                // 二级菜单轨迹
                drawEllipse(this.canvasRoot, 290, 180, 0, 'rgba(81, 255, 255, 0.3)');

                this.canvasRoot.beginPath();
                this.canvasRoot.ellipse(575, 420, 285, 175, 0, 0, Math.PI*2/6);
                this.canvasRoot.lineWidth = '8';
                this.canvasRoot.strokeStyle = 'rgba(81, 255, 255, 0.2)';
                this.canvasRoot.stroke();

                this.canvasRoot.beginPath();
                this.canvasRoot.ellipse(575, 420, 285, 175, 0, Math.PI*4/6, Math.PI*6/6);
                this.canvasRoot.lineWidth = '8';
                this.canvasRoot.strokeStyle = 'rgba(81, 255, 255, 0.2)';
                this.canvasRoot.stroke();

                this.canvasRoot.beginPath();
                this.canvasRoot.ellipse(575, 420, 285, 175, 0, Math.PI*8/6, Math.PI*10/6);
                this.canvasRoot.lineWidth = '8';
                this.canvasRoot.strokeStyle = 'rgba(81, 255, 255, 0.2)';
                this.canvasRoot.stroke();
                // 装饰
                drawEllipse(this.canvasRoot, 340, 210, 0, 'rgba(255, 255, 0, 0.2)');
                drawEllipse(this.canvasRoot, 360, 230, -5, 'rgba(255, 255, 0, 0.2)');
                // 三级菜单轨迹
                drawEllipse(this.canvasRoot, 420, 270, 0, 'rgba(81, 255, 255, 1)');

                this.canvasRoot.beginPath();
                this.canvasRoot.ellipse(575, 420, 418, 268, 0, 0, Math.PI*2/6);
                this.canvasRoot.lineWidth = '4';
                this.canvasRoot.strokeStyle = 'rgba(81, 255, 255, 0.8)';
                this.canvasRoot.stroke();

                this.canvasRoot.beginPath();
                this.canvasRoot.ellipse(575, 420, 418, 268, 0, Math.PI*4/6, Math.PI*6/6);
                this.canvasRoot.lineWidth = '4';
                this.canvasRoot.strokeStyle = 'rgba(81, 255, 255, 0.8)';
                this.canvasRoot.stroke();

                this.canvasRoot.beginPath();
                this.canvasRoot.ellipse(575, 420, 418, 268, 0, Math.PI*8/6, Math.PI*10/6);
                this.canvasRoot.lineWidth = '4';
                this.canvasRoot.strokeStyle = 'rgba(81, 255, 255, 0.8)';
                this.canvasRoot.stroke();
                // 四级菜单轨迹
                drawEllipse(this.canvasRoot, 520, 340, 0, 'rgba(81, 255, 255, 0.5)');
            },
            initCenterMenu(){
                this.firstLevelMenuData = this.testData1.slice(0, 1);
                this.twoLevelMenuData = this.testData1.slice(1, 2);
                this.threeLevelMenuData = this.testData1.slice(2, 4);
            },
            centerBtn(){
                this.ballBigTitle = '大数据中心';
                this.initCenterMenu();
            },
            changeData(name){
                this.ballBigTitle = name;
                if(name == '人口库'){
                    this.firstLevelMenuData = this.testData2.slice(0, 3);
                    this.twoLevelMenuData = this.testData2.slice(3, 5);
                    this.threeLevelMenuData = this.testData2.slice(5, 10);
                }
                if(name == '法人库'){
                    this.firstLevelMenuData = this.testData3.slice(0, 1);
                    this.twoLevelMenuData = this.testData3.slice(1, 3);
                    this.threeLevelMenuData = this.testData3.slice(3, 4);
                }
                if(name == '空间地理信息库'){
                    this.firstLevelMenuData = this.testData4.slice(0, 6);
                    this.twoLevelMenuData = this.testData4.slice(6, 16);
                    this.threeLevelMenuData = this.testData4.slice(16, 30);
                }
                if(name == '电子证照库'){}
            }
        }
    }

    function drawEllipse(context, longRadius, shortRadius, Rotate, strokeStyle) {
        context.beginPath();
        context.ellipse(575, 420, longRadius, shortRadius, Rotate * Math.PI/180, 0, Math.PI*2);
        context.lineWidth = '1';
        context.strokeStyle = strokeStyle;
        context.stroke();
    }
</script>

<style scoped>
    .center{
        width: 100%;
        height: 970px;
        overflow: hidden;
        z-index: 0;
        background: url("../../assets/img/DataVisualization-bg.png") center;
    }
    .center-data{
        position: relative;
        width: 1150px;
        height: 845px;
        margin: 0 auto;
        transform:rotate(-15deg);
        -ms-transform:rotate(-15deg);
        -moz-transform:rotate(-15deg);
        -webkit-transform:rotate(-15deg);
    }
    .center-data canvas{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
    }
    .center-data .ball-big{
        position: absolute;
        top: 310px;
        left: 465px;
        z-index: 2;
        width: 220px;
        height: 222px;
        line-height: 222px;
        background: url("../../assets/img/ball-big.png");
        color: #51ffff;
        font-size: 30px;
        text-align: center;
        cursor: pointer;
        transform:rotate(15deg);
        -ms-transform:rotate(15deg);
        -moz-transform:rotate(15deg);
        -webkit-transform:rotate(15deg);
    }
</style>