<style scoped>
  .departments{
    width: 200px;
    height: 700px;
    margin:10px auto;
    padding: 5px;
    border: 1px solid black;
    background: #131519;
    color: white;
    font-size: 14px;
  }
  .departments ul {
    line-height: 1.5em;
    list-style-type: none;
  }
  .departments .item {
    cursor: pointer;
  }
</style>

<template>
  <div class="departments">
    <ul id="departments">
      <template v-for="(item, index) in treeData">
        <Tree class="item" :key="index" :model="item"></Tree>
      </template>
    </ul>
  </div>
</template>

<script>
  import Tree from './tree.vue'
  var data = [
    {
      id: 1,
      status: 'on-hold',
      name: '技术部',
      children: [
        { id:'2', name: '老大1'},
        {
          id:'3',
          name: '技术一组',
          children: [
            {
              id:'4',
              name: '小组1',
              children: [
                { id:'6', name: '人员1' },
                { id:'7', name: '人员2' }
              ]
            },
            { id:'5', name: '人员6' }
          ]
        }
      ]
    },
    {
      id: 10,
      name: '技术部2',
      children: [
        { id:'21', name: '老大1'},
        {
          id:'31',
          name: '技术一组',
          children: [
            {
              id:'41',
              name: '小组1',
              children: [
                { id:'61', name: '人员1' },
                { id:'71', name: '人员2' }
              ]
            },
            { id:'51', name: '人员6' }
          ]
        }
      ]
    },
    {
      id: 2,
      name: '项目部',
      children: [
        { name: '老大2', id:'1' },
        {
          name: '项目一组',
          children: [
            {
              name: '小组1',
              children: [
                { name: '人员1' },
                { name: '人员2' }
              ]
            },
            {
              name: '小组2',
              children: [
                { name: '人员3' },
                { name: '人员4' }
              ]
            },
            { name: '人员5' },
            { name: '人员6' }
          ]
        }
      ]
    }
  ];
export default {
  name: 'index',
  data: function() {
    return {
      treeData:data
    }
  },
  methods: {
  },
  components:{
      'Tree':Tree,
  }
}
</script>
