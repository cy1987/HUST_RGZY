//20以内出题函数

function jiaJian_5() { //5以内的加减法
  while (1) {
    var num1 = Math.floor(Math.random() * 6);
    var num2 = Math.floor(Math.random() * 6);
    var rand1 = Math.floor(Math.random() * 2);
    var opt = ["+", "-", "*", "/"];
    var opt1 = opt[rand1];
    var result;

    if (opt1 == "+") result = num1 + num2;
    if (opt1 == "-") result = num1 - num2;

    if (0 <= result && 5 >= result && (num1 != num2))
      return [(num1 + " " + opt1 + " " + num2), result];
  }
}

function jiaJian_10() { //10以内的加减法
  while (1) {
    var num1 = Math.floor(Math.random() * 11);
    var num2 = Math.floor(Math.random() * 11);
    var rand1 = Math.floor(Math.random() * 2);
    var opt = ["+", "-", "*", "/"];
    var opt1 = opt[rand1];
    var result;

    if (opt1 == "+") result = num1 + num2;
    if (opt1 == "-") result = num1 - num2;

    if (0 <= result && 10 >= result && (num1 != num2))
      return [(num1 + " " + opt1 + " " + num2), result];
  }
}

function jiaJian_10_() { //10以内的混合加减法，无进位无借位
  while (1) {
    //通过两个数的算法得到算式的前半部分
    var part1 = jiaJian_10();
    var num1 = part1[1];
    var num2 = Math.floor(Math.random() * 11);
    var rand1 = Math.floor(Math.random() * 2);
    var opt = ["+", "-", "*", "/"];
    var opt1 = opt[rand1];
    var result;

    if (opt1 == "+") result = num1 + num2;
    if (opt1 == "-") result = num1 - num2;

    if (0 <= result && 10 >= result && (num1 != num2))
      return [(part1[0] + " " + opt1 + " " + num2), result];
  }
}

function jiaJian_20() { //二十以内的加减法 无进位无借位
  while (1) {
    var num1 = Math.floor(Math.random() * 11) + 10;
    var num2 = Math.floor(Math.random() * 11);
    var rand1 = Math.floor(Math.random() * 2);
    var opt = ["+", "-", "*", "/"];
    var opt1 = opt[rand1];
    var result;

    if (opt1 == "+") result = num1 + num2;
    if (opt1 == "-") result = num1 - num2;

    if (10 <= result && 20 >= result && (num1 != num2))
      return [(num1 + " " + opt1 + " " + num2), result];
  }
}

function jia_20() { //20以内的进位加法
  while (1) {
    var num1 = Math.floor(Math.random() * 9) + 1;
    var num2 = Math.floor(Math.random() * 9) + 1;
    var rand1 = Math.floor(Math.random() * 2);
    var opt = ["+", "-", "*", "/"];
    var opt1 = opt[rand1];
    var result;

    if (opt1 == "+") result = num1 + num2;
    if (opt1 == "-") result = num1 - num2;

    if (10 <= result && (num1 != num2))
      return [(num1 + " " + opt1 + " " + num2), result];
  }
}

function jian_20() { //20以内的借位减法
  while (1) {
    var num1 = Math.floor(Math.random() * 9) + 10; //10到18的数字
    var num2 = Math.floor(Math.random() * 9) + 1; //1到9的数字
    var rand1 = Math.floor(Math.random() * 2);
    var opt = ["+", "-", "*", "/"];
    var opt1 = opt[rand1];
    var result;

    if (opt1 == "+") result = num1 + num2;
    if (opt1 == "-") result = num1 - num2;

    if (10 > result && (num1 != num2))
      return [(num1 + " " + opt1 + " " + num2), result];
  }
}

function jiaJian_20_() { //20以内混合算法
  while (1) {
    var path = Math.random() * 2;
    if (path > 1) {
      var part1 = jia_20();
      var num1 = part1[1]; //10到18的数字
      var num2 = Math.floor(Math.random() * 9) + 1; //1到9的数字
      var rand1 = Math.floor(Math.random() * 2);
      var opt = ["+", "-", "*", "/"];
      var opt1 = opt[rand1];
      var result;
      if (opt1 == "+") result = num1 + num2;
      if (opt1 == "-") result = num1 - num2;
      if (20 >= result && (num1 != num2))
        return [(part1[0] + " " + opt1 + " " + num2), result];
    }
    else{
      var part1 = jian_20();
      var num1 = part1[1]; //1到9的数字
      var num2 = Math.floor(Math.random() * 9) + 1; //1到9的数字
      var rand1 = Math.floor(Math.random() * 2);
      var opt = ["+", "-", "*", "/"];
      var opt1 = opt[rand1];
      var result;
      if (opt1 == "+") result = num1 + num2;
      if (opt1 == "-") result = num1 - num2;
      if (0 <= result && (num1 != num2))
        return [(part1[0] + " " + opt1 + " " + num2), result];
    }
  }
}

module.exports = {
  jiaJian_5: jiaJian_5,
  jiaJian_10: jiaJian_10,
  jiaJian_20: jiaJian_20,
  jiaJian_10_: jiaJian_10_,
  jia_20: jia_20,

  jian_20: jian_20,
  jiaJian_20_: jiaJian_20_,
};