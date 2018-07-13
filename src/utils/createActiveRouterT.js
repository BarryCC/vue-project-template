let demoRequire = require.context('@component', true, /demo\/.*\.vue$/);
//遍历取出所有的demo组件
const demos = demoRequire.keys().map(demoKey => {
    let [componentName, demoName] = demoKey.split('/demo/');
    componentName = componentName.substring(2);
    demoName = demoName.substring(0, demoName.lastIndexOf('.'));
    return {
        componentName: componentName,
        demoName: demoName,
        component: demoRequire(demoKey)
    }
});
//组成key+value形式的demo组件对象集合
const demosByComponent = _.groupBy(demos,  demo => {
    return demo.componentName;
});
//整个组件页面路由
const routesByComponent = Object.keys(demosByComponent).map(componentName => {
    return {
        path: '/' + componentName,
        component: require('./component.vue'),
        meta: {
            componentName: componentName,
            demoComponents: demosByComponent[componentName]
        }
    }
});
//组件页面内调试每个单独demo的路由
const routesByDemo = demos.map(demo => {
    return {
        path: '/' + demo.componentName + '/' + demo.demoName,
        component: demo.component,
        meta: {
            componentName: demo.componentName
        }
    }
});