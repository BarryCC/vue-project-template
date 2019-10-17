export default  {
  /**
   * 判断是否为空
   */
  isEmpty: function (value) {
    if (value === null || value === undefined || value === "") {
      return true;
    } else if ((value instanceof Number || typeof(value) === "number") && isNaN(value)) {
      return true;
    } else {
      return false;
    }
  },

  /**
   * 格式化整型日期,仅检查位数和字符有效性，如果无效返回
   * @param date 可以是Date、int、string类型
   * @param sSplit 分隔符,默认'-','CN'表示用年月日分隔
   * @returns string
   */
  formatDate: function (date, sSplit) {
    let sDate, sY, sM, sD;
    if (date instanceof Date) {
      sY = date.getFullYear();
      sM = date.getMonth() + 1 + "";
      if (sM.length === 1) {
        sM = "0" + sM;
      }
      sD = date.getDate() + "";
      if (sD.length === 1)
        sD = "0" + sD;
    } else {
      sDate = date.toString();
      if (/^\d{8}$/.test(sDate)) {
        sY = sDate.substring(0, 4);
        sM = sDate.substring(4, 6);
        sD = sDate.substring(6, 8);
      } else
        return "-";
    }

    if (sSplit === "CN") {
      sDate = sY + "年" + sM + "月" + sD + "日";
    } else {
      if (sSplit === "" || sSplit == null) {
        sSplit = "-";
      }
      sDate = sY + sSplit + sM + sSplit + sD;
    }
    return sDate;
  },

  /**
   * 说明：格式化参数 fmt		"yyyy-MM-dd hh:mm:ss.S"
   */
  dateFormat: function (time, fmt) {
    var o = {
      "M+": time.getMonth() + 1,
      "d+": time.getDate(),
      "h+": time.getHours(),
      "m+": time.getMinutes(),
      "s+": time.getSeconds(),
      "q+": Math.floor((time.getMonth() + 3) / 3),
      "S": time.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
      }
    }
    return fmt;
  },

  /**
   * 简单检查输入的身份证号是否无效，有效返回false，无效返回true
   */
  isValidIDCard: function(code){
    const Errors = new Array("true",
      "身份证号码位数不对,必须是15位或者18位!",
      "身份证号码出生年月日格式不对!",
      "身份证号码校验位错误!",
      "身份证地区非法!",
      "15位身份证号码由数字组成!",
      "18位身份证号码前17位由数字组成,第18位可以是数字或者大写\"X\"!");
    // 身份证长度不正确
    if (code.length != 15 && code.length != 18) {return Errors[1];}
    let area = {
      11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",
      31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",
      44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",
      63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"
    };
    let Y, JYM;
    let S, M;
    let idcard_array = new Array();
    idcard_array = code.split("");
    // 地区检验
    if (area[parseInt(code.substr(0, 2))] == null) {return Errors[4];}
    // 身份号码位数及格式检验
    switch (code.length) {
      case 15:
        if (!/^[0-9]{15}$/.test(code)) {
          return Errors[5];
        }
        let sBirthday1 = "19" + code.substr(6, 2) + "-" + Number(code.substr(8, 2)) + "-" + Number(code.substr(10, 2));
        let d1 = new Date(sBirthday1.replace(/-/g, "/"));
        let flag1 = (sBirthday1 != (d1.getFullYear() + "-" + (d1.getMonth() + 1) + "-" + d1.getDate()));
        if (!flag1)
          return Errors[0];
        else
          return Errors[2];
        break;
      case 18:
        if (!/^[0-9]{17}([0-9X])$/.test(code)) {
          return Errors[6];
        }
        let sBirthday2 = code.substr(6, 4) + "-" + Number(code.substr(10, 2)) + "-" + Number(code.substr(12, 2));
        let d2 = new Date(sBirthday2.replace(/-/g, "/"));
        let flag2 = (sBirthday2 != (d2.getFullYear() + "-" + (d2.getMonth() + 1) + "-" + d2.getDate()));
        if (!flag2) {// 测试出生日期的合法性
          // 计算校验位
          S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10]))
            * 7
            + (parseInt(idcard_array[1]) + parseInt(idcard_array[11]))
            * 9
            + (parseInt(idcard_array[2]) + parseInt(idcard_array[12]))
            * 10
            + (parseInt(idcard_array[3]) + parseInt(idcard_array[13]))
            * 5
            + (parseInt(idcard_array[4]) + parseInt(idcard_array[14]))
            * 8
            + (parseInt(idcard_array[5]) + parseInt(idcard_array[15]))
            * 4
            + (parseInt(idcard_array[6]) + parseInt(idcard_array[16]))
            * 2 + parseInt(idcard_array[7]) * 1
            + parseInt(idcard_array[8]) * 6
            + parseInt(idcard_array[9]) * 3;
          Y = S % 11;
          M = "F";
          JYM = "10X98765432";
          M = JYM.substr(Y, 1);
          // 判断校验位
          if (M == idcard_array[17])
            return Errors[0];// 检测ID的校验位
          else
            return Errors[3];
        } else
          return Errors[2];
        break;
      default:
        return Errors[1];
        break;
    }
  },

  /**
   * 说明：金额分段
  */
  moneyChange: function(value) {
    return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  }
};