/**
 * Created by CC on 2017/11/30
 * 应用于百度地图在vue项目中的引用初始化
 */
export function MP(ak) {
  return new Promise(function (resolve, reject) {
    window.init = function () {
      resolve(BMap)
    };
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://api.map.baidu.com/api?v=2.0&ak="+ak+"&callback=init";
    script.onerror = reject;
    document.head.appendChild(script);
  })
}
