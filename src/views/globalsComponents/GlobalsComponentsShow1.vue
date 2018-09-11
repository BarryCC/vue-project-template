<template>
  <div class="globals-components-show1">
    <Row>
      <Col span="4">
        <!-- 输入框 -->
        <h1>输入框</h1>
        <c-input v-model="searchText"></c-input>
        <span>{{searchText}}</span>
      </Col>
      <Col span="4">
        <!-- 上传 -->
        <h1>上传（基于iview的上传组件，在有多个上传时使用）</h1>
        <c-upload
          v-model="workProductFiles"
          actionUrl="/api/upload"
          :fileFormat="['jpg', 'png', 'jpeg']"
          :getSmallPictrue="[true, '_small']"
          :sizeLimitation="[false, 500, 400]"
          :previewWHSize="[210, 160]"
          :fileMaxNumber="1"
          :fileMaxSize="30"
          upLoadTitle="作品图"></c-upload>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'globalsComponentsShow1',
  data () {
    return {
      searchText: '',
      workProductFiles: []
		}
  }
}
</script>

<style lang="scss" scoped>
</style>