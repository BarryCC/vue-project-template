<style scoped>
    .share-center-data{
        position: absolute;
        width: 83px;
        height: 63px;
        background: url("../../assets/img/center-circle-data.png");
        z-index: 3;
        text-align: center;
        color: #51ffff;
        transform-origin:0 0;
    }
</style>

<template>
    <div class="share-center-data" :style="transformStyle">
        <div class="name">{{name}}</div>
    </div>
</template>

<script>
    export default {
        name: "share-center-data",
        props:['name', 'rotate'],
        computed:{
            transformStyle(){
                return {
                    transform: 'rotate(' + (90 - 360*this.rotate) + 'deg)',
                    left: 575 + 300*Math.cos(Math.PI*2*this.rotate) + 63*Math.cos(Math.PI*2*this.rotate) - 42*Math.sin(Math.PI*2*this.rotate) + 'px',
                    top: 400 - 300*Math.sin(Math.PI*2*this.rotate) - 63*Math.sin(Math.PI*2*this.rotate) - 42*Math.cos(Math.PI*2*this.rotate) + 'px'
                }
            }
        }
    }
</script>