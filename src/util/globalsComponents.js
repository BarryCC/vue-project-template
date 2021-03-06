/**
 * Created by CC on 2018/6/22
 * vue全局注册组件方法
 */

import Vue from 'vue'

// 方式一，官方推荐
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  // 其组件目录的相对路径
  '../components',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式，‘C’为自定义开头文件
  /C[A-Z]\w+\.vue$/
)
requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)
  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 剥去文件名开头的 `'./` 和结尾的扩展名
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
    )
  )
  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})

// 方式二，要配合components目录下的index.js文件
// import components from '../components'

// Object.keys(components).forEach((key) => {
//   var name = key.replace(/(\w)/, (v) => v.toUpperCase()) //首字母大写
//   Vue.component(`${name}`, components[key])
// })