export  default  {

    /**
     * 判断是否为空
     */
    isEmpty:function (value) {
      if (value === null || value === undefined || value === "") {
        return true;
      } else if ((value instanceof Number || typeof(value) === "number") && isNaN(value)) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * 判断是否成年人
     */
    isAdult :function (sBirthday, sServerDate) {
      var year = sServerDate.substr(0, 4);
      var month = sServerDate.substr(4, 2);
      var day = sServerDate.substr(6, 2);
      var birthyear = sBirthday.substr(0, 4);
      var birthmonth = sBirthday.substr(4, 2);
      var birthday = sBirthday.substr(6, 2);
      var flag = year - birthyear;
      return flag > 18 || ((flag == 18) && (birthmonth < month)) || ((flag == 18) && (birthmonth == month) && (birthday < day));
    },
    /**
     * 跳转到指定URL
     */
    gotoPage :function (url) {
      window.location.href = encodeURI(url);
    },
    /**
     * 过滤空字符串
     */
    Trim : function (sValue) {
      if(api.isEmpty(sValue)){
        return "";
      }
      return sValue.replace(/\s/g,"");
    },
    /**
     * 格式化整型日期,仅检查位数和字符有效性，如果无效返回
     * @param date 可以是Date、int、string类型
     * @param sSplit 分隔符,默认'-','CN'表示用年月日分隔
     * @returns string
     */
    fmtDate : function (date, sSplit) {
      var sDate, sY, sM, sD;
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
     * 简单检查输入的身份证号是否无效，有效返回false，无效返回true
     */
    isValidIDCardNo:function(code){
  
      var Errors = new Array("true",
        "身份证号码位数不对,必须是15位或者18位!",
        "身份证号码出生年月日格式不对!",
        "身份证号码校验位错误!",
        "身份证地区非法!",
        "15位身份证号码由数字组成!",
        "18位身份证号码前17位由数字组成,第18位可以是数字或者大写\"X\"!");
      if (code.length != 15 && code.length != 18) {// 身份证长度不正确
        return Errors[1];
      }
      var area = {
        11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",
        31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",
        44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",
        63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"
      };
      var Y, JYM;
      var S, M;
      var ereg;
      var idcard_array = new Array();
      idcard_array = code.split("");
      // 地区检验
      if (area[parseInt(code.substr(0, 2))] == null)
        return Errors[4];
      // 身份号码位数及格式检验
      switch (code.length) {
        case 15:
          if (!/^[0-9]{15}$/.test(code)) {
            return Errors[5];
          }
          var sBirthday = "19" + code.substr(6, 2) + "-"
            + Number(code.substr(8, 2)) + "-"
            + Number(code.substr(10, 2));
          var d = new Date(sBirthday.replace(/-/g, "/"));
          var flag = (sBirthday != (d.getFullYear() + "-"
          + (d.getMonth() + 1) + "-" + d.getDate()));
          if (!flag)
            return Errors[0];
          else
            return Errors[2];
          break;
        case 18:
          if (!/^[0-9]{17}([0-9X])$/.test(code)) {
            return Errors[6];
          }
  
          var sBirthday = code.substr(6, 4) + "-"
            + Number(code.substr(10, 2)) + "-"
            + Number(code.substr(12, 2));
          var d = new Date(sBirthday.replace(/-/g, "/"));
          var flag = (sBirthday != (d.getFullYear() + "-"
          + (d.getMonth() + 1) + "-" + d.getDate()));
          if (!flag) {// 测试出生日期的合法性
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
    /*
     * 从URl中获取某个Key的Value值
     */
    getUrlParam :function(name){
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r!=null) return unescape(r[2]); return null;
    },
    /**
     * 格式化数字
     * @param fData 待格式的数字
     * @param sFormat 格式化掩码，支持：#，0.等字符，可选，则默认KGC.GO_AmountFmt：
     *          ‘#’一位数字，如果是数字末尾且是0则不显示，‘，’分位标志，‘0’一位数字，‘.’小数点，例1234567.1204格式化如下：
     *          #,###（#,###.#0）     1,234,567      #,###.0#            1,234,567.12
     *          #,###.##            1,234,567.12   #,###.0##        1,234,567.12
     *          #,###.00            1,234,567.12
     */
    fmtNumber : function (fData, sFormat) {
      var arrTemp;
      var sInt, sFloat, sFmt,sSign;
      var fmtInt = "", fmtFloat = "";
      sSign = fData >= 0 ? "" : "-";
      fData = Math.abs(fData);
      var sData = fData.toString();
      if (arguments.length == 1) {
        sFormat = "#,##0.00"; // 系统默认金额格式化掩码
      }
      arrTemp = sFormat.match(/[\#\,0\.]+/);
      if (arrTemp != null) {
        sFmt = arrTemp[0];
      } else {
        sFmt = "#,##0.00";
      }
      var reDecimal = /\./;
      if (reDecimal.test(sFmt)) {
        arrTemp = sFmt.split(".");
        fmtInt = arrTemp[0];
        fmtFloat = arrTemp[1];
      } else {
        fmtInt = sFmt;
      }
  
      if (reDecimal.test(sData)) {
        if (fmtFloat != "") {
          arrTemp = sData.split(".");
          var iPow10 = Math.pow(10, fmtFloat.length);
          var fTemp = Math.round(parseFloat("0." + arrTemp[1]) * iPow10) / iPow10;
          sInt = (Math.floor(fData) + Math.floor(fTemp)).toString();
          if (fTemp == 0)
            sFloat = "0";
          else
            sFloat = fTemp.toString().split(".")[1];
        } else {
          sInt = Math.round(fData).toString();
          sFloat = "";
        }
      } else {
        sInt = sData;
        sFloat = "";
      }
  
      if (fmtInt != "") {
        var iCommaLen = null;
        var iZeroCount = fmtInt.match(/0*$/)[0].length;
        if (/,/g.test(fmtInt)) {
          iCommaLen = fmtInt.match(/,[^,]*/)[0].length - 1;
        }
        var reg = new RegExp("(\\d{" + iCommaLen + "})", "g");
        if (sInt.length < iZeroCount) {
          sInt = new Array(iZeroCount + 1).join("0") + sInt;
          sInt = sInt.substr(sInt.length - iZeroCount, iZeroCount);
        }
        if (iCommaLen > 0) {
          var idx = sInt.length % iCommaLen;
          sInt = sInt.substr(0, idx) + sInt.substring(idx).replace(reg, ",$1");
        }
        sInt = sInt.replace(/^,/, "");
      }
  
      if (fmtFloat != "") {
        var iZeroCount = fmtFloat.match(/^0*/)[0].length;
        if (sFloat.length < iZeroCount) {
          sFloat = sFloat + new Array(iZeroCount + 1).join("0");
          if (fmtFloat.length > iZeroCount) {
            var sTemp1 = sFloat.substring(0, iZeroCount);
            var sTemp2 = sFloat.substring(iZeroCount, fmtFloat.length);
            sFloat = sTemp1 + sTemp2.replace(/0*$/, "");
          } else {
            sFloat = sFloat.substring(0, iZeroCount);
          }
        } else {
          sFloat = sFloat.substring(0, fmtFloat.length);
        }
      } else {
        sFloat = "";
      }
  
      if (sFloat == "") {
        sData = sInt;
      } else {
        sData = sInt + "." + sFloat;
      }
      if (sFormat != sFmt) {
        sData = sFormat.replace(sFmt, sData);
      }
      return sSign + sData;
    },
    //格式化参数 fmt		"yyyy-MM-dd hh:mm:ss.S"
    dateFormat: function (time,fmt) { //author: meizz
      var o = {
        "M+": time.getMonth() + 1, //月份
        "d+": time.getDate(), //日
        "h+": time.getHours(), //小时
        "m+": time.getMinutes(), //分
        "s+": time.getSeconds(), //秒
        "q+": Math.floor((time.getMonth() + 3) / 3), //季度
        "S": time.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) {fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length))}
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))}
      }
      return fmt;
    },
    //  计算时间差
    dateDiff:function(o){
      var date1=new Date().getTime();  //开始时间
      var date2=o;    //结束时间
      var date3=date2-date1;  //时间差的毫秒数
      //计算出相差天数
      var days=Math.floor(date3/(24*3600*1000));
      //计算出小时数
      var leave1=date3%(24*3600*1000);    //计算天数后剩余的毫秒数
      var hours=Math.floor(leave1/(3600*1000));
      //计算相差分钟数
      var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
      var minutes=Math.floor(leave2/(60*1000));
      //计算相差秒数
      var leave3=leave2%(60*1000);      //计算分钟数后剩余的毫秒数
      var seconds=Math.round(leave3/1000);
      html=days+'天'+hours+'小时'+minutes+'分'+seconds+'秒';
      return html;
    },
    //  去掉html标签
    stripHTML : function(str) {
      var reTag = /<(?:.|\s)*?>/g;
      return str.replace(reTag,"");
    }
  
  };
  
  
  