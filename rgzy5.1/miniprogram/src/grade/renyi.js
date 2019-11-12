var rpn = require("../../utils/rpn.js");
var app = getApp();
function renyi() { //任意的算式生成
  var num_num = app.globalData.multiIndexg[0];
  var range_num = app.globalData.multiIndexg[1];
  var opt_num = app.globalData.multiIndexg[2];
  var optarr, range;
  if (opt_num == 0) {
    optarr = ['+', '-'];
  } else if (opt_num == 1) {
    optarr = ['*', '/'];
  } else {
    optarr = ['+', '-', '*', '/'];
  }
  if (num_num == 0) {
    if (range_num == 0) {
      range = 5;
    } else if (range_num == 1) {
      range = 20;
    } else if (range_num == 2) {
      range = 50;
    } else if (range_num == 3) {
      range = 100;
    } else if (range_num == 4) {
      range = 200;
    } else {
      range = 10;
    }
    while (1) {
      var num1 = Math.floor(Math.random() * range) + 1; //生成1到range以内的数
      var num2 = Math.floor(Math.random() * range) + 1; //同上
      var opt = optarr[Math.floor(Math.random() * optarr.length)]
      var str = num1 + " " + opt + " " + num2;
      var result = Math.floor(rpn.calCommonExp(str));
      if (0 <= result && 10000 >= result && (num1 != num2))
        return [str, result];
    }
  } else if (num_num == 1) {
    if (range_num == 0) {
      range = 5;
    } else if (range_num == 1) {
      range = 10;
    } else if (range_num == 2) {
      range = 30;
    } else if (range_num == 3) {
      range = 50;
    } else if (range_num == 4) {
      range = 100;
    } else {
      range = 10;
    }
    while (1) {
      var num1 = Math.floor(Math.random() * range) + 1; //生成1到range以内的数
      var num2 = Math.floor(Math.random() * range) + 1; //同上
      var num3 = Math.floor(Math.random() * range) + 1; //同上
      var opt1 = optarr[Math.floor(Math.random() * optarr.length)]
      var opt2 = optarr[Math.floor(Math.random() * optarr.length)]
      var str = num1 + " " + opt1 + " " + num2 + " " + opt2 + " " + num3;
      var result = Math.floor(rpn.calCommonExp(str));
      if (0 <= result && 10000 >= result)
        return [str, result];
    }
  }

}

module.exports = {
  renyi: renyi,
};