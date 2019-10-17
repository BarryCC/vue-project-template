<template>
<div class="home">
  <!-- editor -->
  <div class="part">
    <Editor v-model="editorContent" 
            :maxSize="4" 
            uploadUrl="eweee" 
            serverPath="ddddd"></Editor>
    <div v-html="editorContent"></div>
  </div>
  <!-- checkbox -->
  <div class="part">
    <Checkbox v-model="checkboxState" @on-change="checkboxChange">
      checkbox
    </Checkbox>
    <Checkbox disabled>checkbox</Checkbox>
    <CheckboxGroup v-model="checkboxgroup" @on-change="checkboxGroupChange">
      <Checkbox :value="1">checkbox1</Checkbox>
      <Checkbox :value="2">checkbox2</Checkbox>
      <Checkbox :value="3">checkbox3</Checkbox>
    </CheckboxGroup>
    {{checkboxgroup}}
  </div>
  <!-- input -->
  <div class="part">
    <Input 
      :width="300" 
      v-model="inputVal" 
      @on-change="inputChange"
      @on-blur="inputBlur"
      type="text" 
      placeholder="please enter username">
    </Input>
    <Input type="password" 
      disabled
      placeholder="please enter password">
    </Input>
  </div>
  <!-- table -->
  <div class="part" style="height: 250px;">
    <table class="table-primary table-border">
      <thead>
        <tr>
          <th>title1</th>
          <th>title1</th>
          <th>title1</th>
          <th>title1</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>content1</td>
          <td>content1</td>
          <td>content1</td>
          <td>
            <span class="table-handle">操作</span>
            <span class="table-handle">操作</span>
            <span class="table-handle">操作</span>
          </td>
        </tr>
        <tr>
          <td>content1</td>
          <td>content1</td>
          <td>content1</td>
          <td>
            <span class="table-handle">操作</span>
            <span class="table-handle">操作</span>
            <span class="table-handle">操作</span>
          </td>
        </tr>
        <tr>
          <td>content1</td>
          <td>content1</td>
          <td>content1</td>
          <td>
            <span class="table-handle">操作</span>
            <span class="table-handle">操作</span>
            <span class="table-handle">操作</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- button -->
  <div class="part">
    <Button width="130" fontSize="16" type="primary">确认</Button>
    <Button height="42" type="cancel">取消</Button>
    <Button fontSize="16" disabled>禁止</Button>
  </div>
</div>
</template>

<script>
import checkboxGroup from '../components/checkBox/CheckboxGroup'
import checkbox from '../components/checkBox/Checkbox'
import button from '../components/button/Button'
import input from '../components/input/Input'
import editor from '../components/editor/Editor'
export default {
  name: 'ShowComponents',
  components: {
    'Button': button,
    'Input': input,
    'Checkbox': checkbox,
    'CheckboxGroup': checkboxGroup,
    'Editor': editor
  },
  data() {
    return {
      checkboxgroup: [],
      checkboxState: false,
      inputVal: '',
      editorContent: ''
    }
  },
  methods:{
    checkboxGroupChange(val){
      console.log(val);
    },
    checkboxChange(val){
      console.log(val);
    },
    inputChange(val){
      console.log(val);
    },
    inputBlur(val){
      console.log(val);
    }
  }
}
</script>

<style lang="scss" scoped>
.part {
  width: 100%;
  height: 120px;
  border: 1px dotted #cccccc;
  margin-bottom: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
}
</style>
