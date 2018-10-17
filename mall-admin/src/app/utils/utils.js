const uuid = require('node-uuid');
/**
 * 保留两位小数
 * @param {*} value 
 */
export const moneyFormat = (item) => {
  let value = Math.round(parseFloat(item) * 100) / 100;
  let xsd = value.toString().split(".");
  if (xsd.length == 1) {
    value = value.toString() + ".00";
    return value;
  }
  if (xsd.length > 1) {
    if (xsd[1].length < 2) {
      value = value.toString() + "0";
    }
    return value;
  }
};
/**
 * 生成8位唯一id
 */
export const generateShortUuid = () => {
  let r_uuid = uuid.v4().replace(new RegExp('-', 'g'), "");
  // let shortBuffer = "";
  // let chars = ["a", "b", "c", "d", "e", "f",
  //   "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
  //   "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5",
  //   "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I",
  //   "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V",
  //   "W", "X", "Y", "Z"];
  // for (let i = 0; i < 8; i++) {
  //   let str = r_uuid.substring(i * 4, i * 4 + 4);
  //   let x = parseInt(str, 16);
  //   shortBuffer = shortBuffer + chars[x % 0x3E];
  // }
  // return shortBuffer

  return r_uuid
}


/**
 * 获取浏览器引擎
 */
export const client = () => {

  //呈现引擎
  var engine = {

    ie: 0,
    gecko: 0,
    webkit: 0,
    khtml: 0,
    opera: 0,
    //完整版本号
    ver: null
  };

  //浏览器
  var browser = {

    //主要浏览器
    ie: 0,
    firefox: 0,
    safari: 0,
    konq: 0,
    opera: 0,
    chrome: 0,

    //具体的版本号
    cer: null
  };

  //平台、设备和操作系统
  var system = {
    win: false,
    mac: false,
    xll: false,

    //移动设备
    iphone: false,
    ipod: false,
    ipad: false,
    ios: false,
    android: false,
    nokiaN: false,
    winMobile: false,

    //游戏系统
    wii: false,
    ps: false
  };

  //检测呈现引擎和浏览器
  var ua = navigator.userAgent;
  if (window.opera) {
    engine.ver = browser.ver = window.opera.version();
    engine.opera = browser.opera = parseFloat(engine.ver);
  } else if (/AppleWebKit\/(\S+)/.test(ua)) {
    engine.ver = RegExp["$1"];
    engine.webkit = parseFloat(engine.ver);

    //确定是Chrome还是Safair
    if (/Chrome\/(\S+)/.test(ua)) {
      browser.ver = RegExp["$1"];
      browser.chrome = parseFloat(browser.ver);
    } else if (/Version\/(\S+)/.test(ua)) {
      browser.ver = RegExp["$1"];
      browser.safari = parseFloat(browser.ver);
    } else {
      //近似的确定版本号
      var safariVersion = 1;
      if (engine.webkit < 100) {
        safariVersion = 1;
      } else if (engine.webkit < 312) {
        safariVersion = 1.2;
      } else if (engine.webkit < 412) {
        safariVersion = 1.3;
      } else {
        safariVersion = 2;
      }

      browser.safari = browser.ver = safariVersion;
    }
  } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
    engine.ver = browser.ver = RegExp["$1"];
    engine.khtml = browser.konq = parseFloat(engine.ver);
  } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
    engine.ver = RegExp["$1"];
    engine.gecko = parseFloat(engine.ver);

    //确定是不是Firefox
    if (/Firefox\/(\S+)/.test(ua)) {
      browser.ver = RegExp["$1"];
      browser.firefox = parseFloat(browser.ver);
    }
  } else if (/MSTE ([^;]+)/.test(ua)) {
    engine.ver = browser.ver = RegExp["$1"];
    engine.ie = browser.ie = parseFloat(engine.ver);
  }

  //检测浏览器
  browser.ie = engine.ie;
  browser.opera = engine.opera;

  //检测平台
  var p = navigator.platform;
  system.win = p.indexOf("Win") == 0;
  system.mac = p.indexOf("Mac") == 0;
  system.xll = (p == "Xll") || (p.indexOf("Linux") == 0);

  //检测Windows操作系统
  if (system.win) {
    if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
      if (RegExp["$1"] == "NT") {
        switch (RegExp["$2"]) {
          case "5.0":
            system.win = "2000";
            break;
          case "5.1":
            system.win = "XP";
            break;
          case "6.0":
            system.win = "Vista";
            break;
          case "6.1":
            system.win = "7";
            break;
          default:
            system.win = "NT";
            break;
        }
      } else if (RegExp["$1"] == "9px") {
        system.win = "ME";
      } else {
        system.win = RegExp["$1"];
      }
    }
  }

  //移动设备
  system.iphone = ua.indexOf("iPhone") > -1;
  system.ipod = ua.indexOf("iPod") > -1;
  system.ipad = ua.indexOf("iPad") > -1;
  system.nakiaN = ua.indexOf("NakiaN") > -1;

  //windows mobile
  if (system.win == "CE") {
    system.winMobile = system.win;
  } else if (system.win == "Ph") {
    if (/Windows Phone OS (\d+.\d+)/.test(ua)) {
      ;
      system.win = "Phone";
      system.winMobile = parseFloat(RegExp["$1"]);
    }
  }

  //检测ios版本
  if (system.mac && ua.indexOf("Mobile") > -1) {
    if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)) {
      system.ios = parseFloat(RegExp.$1.replace("_", "."));
    } else {
      system.ios = 2;//不能真正检测出来，所以只能猜测
    }
  }

  //检测Android版本
  if (/Android (\d+\.\d+)/.test(ua)) {
    system.android = parseFloat(RegExp.$1);
  }

  //游戏系统
  system.wii = ua.indexOf("Wii") > -1;
  system.ps = /playstation/i.test(ua);

  //返回这些对象
  return {
    engine: engine,
    browser: browser,
    system: system
  }

}
/**
 * 字符串转日期对象
 * @param {*} datestr 
 */
export const getDate = (datestr) => {
  let temp = datestr.split("-");
  let date = new Date(temp[0], temp[1] - 1, temp[2]);
  return date;
}
/**
 * 根据秒数时分秒倒计时
 * @param {*} _this 
 * @param {*} seconds 
 */
export const countTime = (_this, seconds) => {
  let minutesTime = 0; //分
  let hoursTime = 0; //时
  let result = "";
  if (seconds > 60) {
    minutesTime = parseInt(seconds / 60);
    seconds = parseInt(seconds % 60);
    if (minutesTime > 60) {
      hoursTime = parseInt(minutesTime / 60);
      minutesTime = parseInt(minutesTime % 60);
    }
    result = "" + parseInt(seconds) + "秒";
    if (minutesTime > 0) {
      result = "" + parseInt(minutesTime) + "分" + result;
    }
    if (hoursTime > 0) {
      result = "" + parseInt(hoursTime) + "小时" + result;
    }
  } else {
    result = "" + parseInt(seconds) + "秒";
  }
  return result;
}

/**
 * //比较函数升序
 * @param {*} x 
 * @param {*} y 
 */
export const compareUp = function (x, y) {
  if (x < y) {
    return -1;
  } else if (x > y) {
    return 1;
  } else {
    return 0;
  }
}
/**
 * 降序
 * @param {*} x 
 * @param {*} y 
 */
export const compareDown = function (x, y) {
  if (x < y) {
    return 1;
  } else if (x > y) {
    return -1;
  } else {
    return 0;
  }
}
