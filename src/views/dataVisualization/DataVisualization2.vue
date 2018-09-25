<template>
    <div class="center">
        <div class="center-data">
            <!--中间大圆-->
            <img class="center-bg-data" src="../../assets/img/center-bg-data.png" alt="大数据中心">
            <img :style="centerBgRotate" class="center-bg" src="../../assets/img/center-bg.png" alt="中间大圆">
            <!--线-->
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <line :x1="smallCircleLeft" :y1="smallCircleTop" :x2="bigCircleLeft" :y2="bigCircleTop" style="stroke:#51ffff;stroke-width:3" />
            </svg>
            <!--机构分布-->
            <template v-for="(item, index) in centerData">
                <share-center-data 
                                :key="index"
                                :name="item.organName"
                                :rotate="(index+1)/centerData.length"></share-center-data>
            </template>
            <div class="all-data" :style="centerAllDataStyle">{{centerAllData}}</div>
            <div class="add-data" :style="centerAddDataStyle">{{centerAddData}}</div>
        </div>
    </div>
</template>

<script>
    import ShareCenterData from './ShareCenterData.vue'
    export  default {
        name: 'share',
        data(){
            return{
                svgRoot: '',
                lineRotate: 0,
                centerData:[],
                centerAllData: 0,
                centerAddData: 0,
            }
        },
        components:{
            'share-center-data': ShareCenterData
        },
        computed:{
            bigCircleLeft(){
                return 400+300*Math.cos(Math.PI*2*this.lineRotate);
            },
            bigCircleTop(){
                return 400-300*Math.sin(Math.PI*2*this.lineRotate);
            },
            smallCircleLeft(){
                return 400+175*Math.cos(Math.PI*2*this.lineRotate);
            },
            smallCircleTop(){
                return 400-175*Math.sin(Math.PI*2*this.lineRotate);
            },
            centerAllDataStyle(){
                return {
                    transform: 'rotate(' + (90 - 360*this.lineRotate) + 'deg)',
                    left: 575 + 395*Math.cos(Math.PI*2*this.lineRotate) - 50*Math.sin(Math.PI*2*this.lineRotate) + 'px',
                    top: 400 - 395*Math.sin(Math.PI*2*this.lineRotate) - 50*Math.cos(Math.PI*2*this.lineRotate) + 'px'
                }
            },
            centerAddDataStyle(){
                return {
                    transform: 'rotate(' + (90 - 360*this.lineRotate) + 'deg)',
                    left: 575 + 205*Math.cos(Math.PI*2*this.lineRotate) + 5*Math.sin(Math.PI*2*this.lineRotate) + 'px',
                    top: 400 - 205*Math.sin(Math.PI*2*this.lineRotate) + 5*Math.cos(Math.PI*2*this.lineRotate) + 'px'
                }
            },
            centerBgRotate(){
                return {
                    transform: 'rotate(' + (45 - 360*this.lineRotate) + 'deg)',
                }
            }
        },
        mounted(){
            this.svgRoot = document.querySelector('svg line');
            this.svgLineAnimation();
            let that = this;
            let time = 1;
            setInterval(function () {
                if(time === that.centerData.length){
                    time = 0;
                }
                if(that.centerData.length !== 0){
                    that.centerAllData = that.centerData[time].totalCount;
                    that.centerAddData = that.centerData[time].increaseCount;
                }
                that.lineRotate = time/that.centerData.length;
                that.svgLineAnimation();
                time++;
            }, 5000);
        },
        methods:{
            // svg直线效果
            svgLineAnimation(){
                let length = this.svgRoot.getTotalLength();
                this.svgRoot.style.transition = this.svgRoot.style.WebkitTransition = 'none';
                this.svgRoot.style.strokeDasharray = length + ' ' + length;
                this.svgRoot.style.strokeDashoffset = length;
                this.svgRoot.getBoundingClientRect();
                this.svgRoot.style.transition = this.svgRoot.style.WebkitTransition = 'stroke-dashoffset 3s ease-in-out';
                this.svgRoot.style.strokeDashoffset = '0';
            },
        }
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
        height: 800px;
        margin: 0 auto;
    }
    .center-data svg{
        position: absolute;
        top: 0;
        left: 175px;
        width: 800px;
        height: 800px;
        z-index: 1;
    }
    .center-data .center-bg-data{
        position: absolute;
        top: 327px;
        left: 502px;
        z-index: 3;
    }
    .center-data .center-bg{
        position: absolute;
        top: 100px;
        left: 275px;
        z-index: 2;
        transition: transform 3s;
        -moz-transition: -moz-transform 3s;
        -webkit-transition: -webkit-transform 3s;
        -o-transition: -o-transform 3s;
    }
    .center-data .all-data,
    .center-data .add-data{
        position: absolute;
        z-index: 5;
        color: #51ffff;
        font-family: 'NumberFont';
        font-size: 30px;
        transform-origin:0 0;
    }
    .center-data .all-data{
        width: 100px;
        text-align: center;
    }
</style>