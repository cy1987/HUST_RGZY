//100以内数的相关生成

function zheng10_100() { //100以内整十数的加减法
  while (1) {
    var num1 = Math.floor(Math.random() * 10) + 1; //生成1到10以内的数
    var num2 = Math.floor(Math.random() * 10) + 1; //同上
    var rand1 = Math.floor(Math.random() * 2);
    var opt = ["+", "-", "*", "/"];
    var opt1 = opt[rand1];
    var result;

    if (opt1 == "+") result = num1 + num2;
    if (opt1 == "-") result = num1 - num2;

    if (0 <= result && 10 >= result && (num1 != num2))
      return [(num1 * 10 + " " + opt1 + " " + num2 * 10), result * 10];
  }
}

function zheng10Or1_100() { //两位数加一位数或者整十数

  var path = Math.random() * 2;
  if (path > 1) {
    while (1) {
      var num1 = Math.floor(Math.random() * 80) + 20; //生成20到99以内的数
      var num2 = Math.floor(Math.random() * 9) + 1; //1到9的数
      var rand1 = Math.floor(Math.random() * 2);
      var opt = ["+", "-", "*", "/"];
      var opt1 = opt[rand1];
      var result;

      if (opt1 == "+") result = num1 + num2;
      if (opt1 == "-") result = num1 - num2;

      if (0 <= result && 100 >= result && (num1 != num2))
        return [(num1 + " " + opt1 + " " + num2), result];
    }
  } else {
    while (1) {
      var num1 = Math.floor(Math.random() * 80) + 20; //生成20到99以内的数
      var num2 = 10 * (Math.floor(Math.random() * 9) + 1); //10到90的整10数
      var rand1 = Math.floor(Math.random() * 2);
      var opt = ["+", "-", "*", "/"];
      var opt1 = opt[rand1];
      var result;

      if (opt1 == "+") result = num1 + num2;
      if (opt1 == "-") result = num1 - num2;

      if (0 <= result && 100 >= result && (num1 != num2))
        return [(num1 + " " + opt1 + " " + num2), result];
    }
  }
}

function jiaJian_100() { //两位数加减两位数
  var rand1 = Math.floor(Math.random() * 2);
  var opt = ["+", "-", "*", "/"];
  var opt1 = opt[rand1];
  while (1) {
    var num1 = Math.floor(Math.random() * 90) + 10; //生成10到99以内的数
    var num2 = Math.floor(Math.random() * 90) + 10; //同上
    var result;

    if (opt1 == "+") result = num1 + num2;
    if (opt1 == "-") result = num1 - num2;

    if (0 <= result && 100 >= result && (num1 != num2))
      return [(num1 + " " + opt1 + " " + num2), result];
  }
}

function jiaJian_100_() { //两位数混合加减法
  var rand1 = Math.floor(Math.random() * 2);
  var opt = ["+", "-", "*", "/"];
  var opt1 = opt[rand1];
  var part1 = jiaJian_100();
  while (1) {
    var num1 = part1[1]; //生成10到99以内的数
    var num2 = Math.floor(Math.random() * 90) + 10; //同上
    var result;

    if (opt1 == "+") result = num1 + num2;
    if (opt1 == "-") result = num1 - num2;

    if (0 <= result && 100 >= result && (num1 != num2))
      return [(part1[0] + " " + opt1 + " " + num2), result];
  }
}

function mulTable() {
  var num1 = Math.floor(Math.random() * 8) + 2;
  var num2 = Math.floor(Math.random() * 8) + 2;
  var result = num1 * num2;
  return [num1 + " * " + num2, result];
}

function divTable() {
  var num1 = Math.floor(Math.random() * 8) + 2;
  var num2 = Math.floor(Math.random() * 8) + 2;
  var result = num1 * num2;
  return [result + " / " + num2, num1];
}

module.exports = {
  zheng10_100: zheng10_100,
  zheng10Or1_100: zheng10Or1_100,
  jiaJian_100: jiaJian_100,
  jiaJian_100_: jiaJian_100_,
  mulTable: mulTable,
  divTable: divTable,
};