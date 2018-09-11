<style scoped>
    .upload-list{
        display: inline-block;
        text-align: center;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 15px;
    }
    .upload-list img{
        width: 100%;
        height: 100%;
    }
    .upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .upload-list:hover .upload-list-cover{
        display: block;
    }
    .upload-list-cover i{
        color: #fff;
        font-size: 40px;
        cursor: pointer;
        margin: 0 2px;
    }
    .upload-click-block{
        display: flex;
        align-items: center; /* 垂直居中 */
        justify-content: center; /* 水平居中 */
    }
    .upload-click-block span{
        font-size: 14px;
        color: #666;
    }
    .upload-click-block .light-color{
        color: #ff6501;
    }
</style>


<template>
    <div class="base-upload">
        <div class="upload-list"
            :style="{width: previewWHSize[0] + 'px', height: previewWHSize[1] + 'px', lineHeight: previewWHSize[1] + 'px'}"
            v-for="(item, index) in uploadList" :key="index">
            <img :src="item.url | getSmall(getSmallPictrue)">
            <div class="upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
            </div>
        </div>
        <Upload ref="upload"
                type="drag"
                :show-upload-list="true"
                v-show="uploadList.length !== fileMaxNumber"
                :format="fileFormat"
                :action="actionUrl"
                :max-size="fileMaxSize*1024"
                :on-exceeded-size="handleMaxSize"
                :on-format-error="handleFormatError"
                :before-upload="handleBeforeUpload"
                :on-success="handleSuccess"
                :style="{width: previewWHSize[0] + 'px'}"
                style="display: inline-block;">
            <div class="upload-click-block" :style="{width: previewWHSize[0] + 'px', height: previewWHSize[1] + 'px'}">
                <div style="width: 100%; height: 70px;">
                    <Icon size="50" type="ios-cloud-upload"></Icon><br>
                    <span>点击或者拖拽上传</span>
                    <span class="light-color">{{upLoadTitle}}</span>
                </div>
            </div>
        </Upload>
        <Modal title="图片查看" v-model="visible">
            <img :src="imgPath" v-if="visible" style="width: 100%">
        </Modal>
    </div>
</template>

<script>
    export default {
        name: 'base-upload',
        /** 用于双向绑定 **/
        model: {
            prop: 'initFileList',
            event: 'change'
        },
        /**
         * upLoadTitle上传文件类型名称
         * fileMaxSize表示文件最大大小（单位M）
         * fileMaxNumber文件最大数量
         * previewWHSize数组，预览图宽高
         * actionUrl 上传路径
         * fileFormat
         * sizeLimitation是否尺寸限制，参数一是否限制，限制时参数二三（宽高）为必填
         * getSmallPictrue上传成功后获取小预览图的，参数一为是否用小预览图，是时参数二必填，为小图标志
         * initFileList初始化的文件列表
         **/
        props: {
            upLoadTitle: {
                type: String,
                default: ''
            },
            fileMaxSize: {
                type: Number,
                default: 3
            },
            fileMaxNumber: {
                type: Number,
                default: 1000
            },
            previewWHSize: {
                type: Array,
                default: function () {
                    return [200, 150];
                }
            },
            actionUrl: {
                type: String,
                required: true
            },
            fileFormat: {
                type: Array,
                default: ['png', 'jpg', 'jpeg', 'word', 'text']
            },
            sizeLimitation: {
                type: Array,
                default: function () {
                    return [false];
                }
            },
            getSmallPictrue: {
                type: Array,
                default: function () {
                    return [false];
                }
            },
            initFileList: {
                type: Array
            }
        },
        data () {
            return {
                imgPath: '',
                visible: false,
                uploadList: []
            }
        },
        watch:{
            initFileList(){
                this.uploadList = this.initFileList;
            }
        },
        filters: {
            getSmall: function (value, type) {
                if (!value) { return ''; }
                if(type[0]){
                    let val = value.split(".");
                    return val[0] + type[1] + '.' + val[1];
                }else {
                    return value;
                }
            }
        },
        methods: {
            // 文件查看
            handleView (url) {
                this.imgPath = url;
                this.visible = true;
            },
            // 文件删除
            handleRemove (index) {
                this.uploadList.splice(index, 1);
                let data = this.uploadList;
                this.$emit('change', data);
            },
            // 上传成功
            handleSuccess (res, file) {
                if(res.messageCode === 10000){
                    this.uploadList.push({
                        name: res.result.file.fileName,
                        url: res.result.file.filePath
                    });
                    let data = this.uploadList;
                    this.$emit('change', data);
                }else {
                    this.handleRemove(file);
                    this.$Message.error(res.messageContent);
                }
            },
            // 上传类型检测
            handleFormatError (file) {
                this.$Message.warning('图片' + file.name + '不符合上传要求，请上传JPG类型图片！');
            },
            // 上传图片大小检测
            handleMaxSize (file) {
                this.$Message.warning('图片' + file.name + '不符合上传要求，文件大小请小于' + this.fileMaxSize + 'M');
            },
            // 上传文件数量及尺寸检测
            handleBeforeUpload (file) {
                const check = this.uploadList.length < this.fileMaxNumber;
                if (!check) {
                    this.$Message.warning("您最多可以上传" + this.fileMaxNumber + '个文件');
                    return check;
                }else {
                    if(this.sizeLimitation[0]){
                        // 如果要进行尺寸限制
                        return this.checkImageWH(file, this.sizeLimitation[1], this.sizeLimitation[1]);
                    }else {
                        return check
                    }
                }
            },
            //checkImageWH  返回一个promise  检测通过返回resolve  失败返回reject阻止图片上传
            checkImageWH(file, width, height) {
                let self = this;
                return new Promise(function (resolve, reject) {
                    let filereader = new FileReader();
                    filereader.onload = (e) => {
                        let src = e.target.result;
                        const image = new Image();
                        image.onload = function () {
                            console.log(this.width);
                            console.log(this.height);
                            if (width && this.width != width) {
                                self.$Message.warning('请上传宽为' + width + 'px的图片');
                                return reject;
                            } else if (height && this.height != height) {
                                self.$Message.warning('请上传高为' + height + 'px的图片');
                                return reject;
                            } else {
                                console.log("验证通过");
                                return resolve(true);
                            }
                        };
                        image.onerror = reject;
                        image.src = src;
                    };
                    filereader.readAsDataURL(file);
                });
            }
        }
    }
</script>