# vue-project-topic
Vue专题系列

专题系列是使用官方脚手架vue-cli来构建单页面应用，最后将补充本人项目开发中总结的注意点和要点；

本人目前项目开发使用一下几个方面的内容：Vue、vue-router（路由）、vuex（状态管理）、
iview（提供样式组件）、axios（基于promise的HTTP客户端）、vue-qull-editor（富文本编辑框插件）、echarts（图标）；

一、Vue基础项目框架搭建

1、全局安装Vue-cli（使用npm，首先本地安装node）
    运行命令： npm install --global vue-cli；
    
2、开始创建项目目录
    运行命令：vue init webpack vueProject，其中会填写一些信息（可以试着看懂中间出来的提示），
    项目名称、描述、作者自己写，后面重要的是选择使用vue-router（一个基本的项目都需要用到），
    没有使用ESlint（建议初学者暂时不要用），后面一直enter就行了，这样一个基本项目目录就搭建完成了；
    
3、项目运行，
    首先运行命令：npm install;
    然后运行命令：npm run dev,之后在浏览器8080端口看到页面；
    
二、项目目录描述：
