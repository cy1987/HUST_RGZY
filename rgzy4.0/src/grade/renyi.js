var app = getApp();
var rpn = require("../../utils/rpn.js");
function renyi() { //任意的算式生成
  var num_num = app.globalData.multiIndex[0];
  var range_num = app.globalData.multiIndex[1];
  var opt_num = app.globalData.multiIndex[2];
  var optarr, range;
  if (opt_num == 0) {
    optarr = ['+', '-'];
  } else if (opt_num == 1) {
    optarr = ['*', '/'];
  } else {
    optarr = ['+', '-', '*', '/'];
  }
  if (range_num == 0) {
    range = 5;
  } else if (range_num == 1) {
    range = 20;
  } else if (range_num == 2) {
    range = 40;
  } else if (range_num == 3) {
    range = 100;
  } else if (range_num == 4) {
    range = 1000;
  } else {
    range = 10;
  }
  if (num_num == 0) {
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
    while (1) {
      var num1 = Math.floor(Math.random() * range) + 1; //生成1到range以内的数
      var num2 = Math.floor(Math.random() * range) + 1; //同上
      var num3 = Math.floor(Math.random() * range) + 1; //同上
      var opt1 = optarr[Math.floor(Math.random() * optarr.length)]
      var opt2 = optarr[Math.floor(Math.random() * optarr.length)]
      var str = num1 + " " + opt1 + " " + num2 + " " + opt2 + " " + num3;
      var result = Math.floor(rpn.calCommonExp(str));
      if (0 <= result && 10000 >= result && (num1 != num2))
        return [str, result];
    }
  }

}

module.exports = {
  renyi: renyi,
};