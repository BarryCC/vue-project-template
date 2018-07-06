/**
 * Created by CC on 2018/6/22
 * vue官方全局注册组件方法，需在main.js文件中创建vue实例对象前引用,未成功。。。。。。。
 */

import Vue from 'vue'

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

import components from '../components'

// 方式一，未成功
// https://webpack.js.org/guides/dependency-management/#require-context
// const requireComponent = require.context(
//   // Look for files in the current directory
//   '../components',
//   // Do not look in subdirectories
//   false,
//   // Only include "_base-" prefixed .vue files
//   /_base-[\w-]+\.vue$/
// )
// // For each matching file name...
// requireComponent.keys().forEach(fileName => {
//   // Get the component config
//   const componentConfig = requireComponent(fileName)
//   // Get the PascalCase version of the component name
//   const componentName = upperFirst(
//     camelCase(
//       fileName
//         // Remove the "./_" from the beginning
//         .replace(/^\.\/_/, '')
//         // Remove the file extension from the end
//         .replace(/\.\w+$/, '')
//     )
//   )
//   // Globally register the component
//   Vue.component(componentName, componentConfig.default || componentConfig)
// })

// 方式二，未成功
// const requireComponent = require.context(
//   // 其组件目录的相对路径
//   '../components',
//   // 是否查询其子目录
//   false,
//   // 匹配基础组件文件名的正则表达式
//   /Base[A-Z]\w+\.(vue|js)$/
// )
// requireComponent.keys().forEach(fileName => {
//   // 获取组件配置
//   const componentConfig = requireComponent(fileName)
//   // 获取组件的 PascalCase 命名
//   const componentName = upperFirst(
//     camelCase(
//       // 剥去文件名开头的 `'./` 和结尾的扩展名
//       fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
//     )
//   )
//   // 全局注册组件
//   Vue.component(
//     componentName,
//     // 如果这个组件选项是通过 `export default` 导出的，
//     // 那么就会优先使用 `.default`，
//     // 否则回退到使用模块的根。
//     componentConfig.default || componentConfig
//   )
// })

// 方式三，成功
Object.keys(components).forEach((key) => {
  var name = key.replace(/(\w)/, (v) => v.toUpperCase()) //首字母大写
  Vue.component(`${name}`, components[key])
})