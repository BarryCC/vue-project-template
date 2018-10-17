// https://github.com/michael-ciniawsky/postcss-load-config
//postcss-loader包的一个配置，需要使用到的一个插件
module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {}
  }
}

/************ 移动端VM（viewport width）适配，工具postcss ************** */
// npm i postcss-aspect-ratio-mini postcss-px-to-viewport postcss-write-svg postcss-cssnext postcss-viewport-units cssnano --S
// npm i cssnano-preset-advanced --save-dev

// module.exports = {
//   "plugins": {
//     "postcss-import": {},
//     "postcss-url": {},
//     "postcss-write-svg": {
//       "utf8": false
//     },
//     "postcss-cssnext": {},
//     "postcss-px-to-viewport": {
//       "viewportWidth": 375,
//       "viewportHeight": 1334,
//       "unitPrecision": 3,
//       "viewportUnit": "vw",
//       "selectorBlackList": [
//         ".ignore",
//         ".hairlines"
//       ],
//       "minPixelValue": 1,
//       "mediaQuery": false
//     },
//     "postcss-viewport-units": {},
//     "cssnano": {
//       "preset": "advanced",
//       "autoprefixer": false,
//       "postcss-zindex": false
//     }
//   }
// }