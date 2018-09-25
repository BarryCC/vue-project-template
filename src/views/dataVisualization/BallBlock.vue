<style scoped>
    .ball-block{
        position: absolute;
        width: 136px;
        height: 100px;
        text-align: center;
        line-height: 46px;
        font-size: 18px;
        z-index: 3;
        cursor: pointer;
        transform:rotate(15deg);
        -ms-transform:rotate(15deg);
        -moz-transform:rotate(15deg);
        -webkit-transform:rotate(15deg);
    }
    .bg{
        position: absolute;
        top: 0;
        left: 0;
    }
    .name{
        color: #fff;
        font-size: 14px;
        margin-top: 20px;
        line-height: 22px;
    }
</style>

<template>
    <div @click="getData" class="ball-block" :style="{ top: 420-shortRadius*Math.sin(Math.PI*2*rotate + addRotate) - 40 + 'px', left: 575-longRadius*Math.cos(Math.PI*2*rotate + addRotate) - 60 + 'px' }">
        <img v-show="type == 1" class="bg" src="../../assets/img/ball-block-type1.png" alt="">
        <img v-show="type == 2" class="bg" src="../../assets/img/ball-block-type2.png" alt="">
        <div :style="{ color: type === 1 ? '#42ca83 ' : '#008fff' }" class="data">{{data}}</div>
        <div class="name">{{name}}</div>
    </div>
</template>

<script>
    export default {
        name: "ball-block",
        props: ['type', 'data', 'name', 'longRadius', 'shortRadius', 'rotate', 'canClick'],
        data(){
            return {
                addRotate: 0,
                timer: ''
            }
        },
        mounted(){
//            const timer = setInterval(() =>{
//                this.addRotate = this.addRotate + Math.PI/800;
//            }, 3000);
//            this.$once('hook:beforeDestroy', () => { clearInterval(timer); })

            this.animLoop();
        },
        beforeDestroy(){
            cancelAnimationFrame(this.timer);
        },
        methods:{
            animLoop(){
                this.addRotate = this.addRotate + Math.PI/2000;
                this.timer = requestAnimFrame(this.animLoop);
            },
            getData(){
                if(this.canClick === 1){
                    this.$emit('ball-click');
                }
            }
        }
    }
    window.requestAnimFrame = (function() {
        return  window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback){
                window.setTimeout(callback, 1000 / 60);
            };
    })();
</script>