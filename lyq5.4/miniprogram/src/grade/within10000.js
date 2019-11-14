
function jiaJian_10000() { //四位数加减四位数
  var rand1 = Math.floor(Math.random() * 2);
  var opt = ["+", "-", "*", "/"];
  var opt1 = opt[rand1];
  while (1) {
    var num1 = Math.floor(Math.random() * 9000) + 1000; //生成10到99以内的数
    var num2 = Math.floor(Math.random() * 9000) + 1000; //同上
    var result;

    if (opt1 == "+") result = num1 + num2;
    if (opt1 == "-") result = num1 - num2;

    if (0 <= result && 10000 >= result && (num1 != num2))
      return [(num1 + " " + opt1 + " " + num2), result];
  }
}

function mul1_10000() { //乘数是一位数的乘法
  while (1) {
    var num1 = Math.floor(Math.random() * 10000)+1; //生成10到99以内的数
    var num2 = Math.floor(Math.random() * 9) + 1; //同上
    var result=num1*num2;

    if (0 <= result && 10000 >= result && (num1 != num2))
      return [(num1 + " * " + num2), result];
  }
}

function div1_10000() { //除数是一位数的除法
  while (1) {
    var num1 = Math.floor(Math.random() * 10000) + 1; //生成10到99以内的数
    var num2 = Math.floor(Math.random() * 9) + 1; //同上
    var result = num1 * num2;

    if (0 <= result && 10000 >= result && (num1 != num2))
      return [(result + " / " + num2), num1];
  }
}

function mul2_10000() { //乘数是2位数的乘法
  while (1) {
    var num1 = Math.floor(Math.random() * 90) + 10; //生成10到99以内的数
    var num2 = Math.floor(Math.random() * 90) + 10; //同上
    var result = num1 * num2;

    if (0 <= result && 10000 >= result && (num1 != num2))
      return [(num1 + " * " + num2), result];
  }
}

module.exports = {
  jiaJian_10000:jiaJian_10000,
  div1_10000:div1_10000,
  mul1_10000:mul1_10000,
  mul2_10000: mul2_10000,
};