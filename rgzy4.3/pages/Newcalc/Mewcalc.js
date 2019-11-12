var common = require("../../src/grade/within20.js");
var common2 = require("../../src/grade/within100.js");
var common3 = require("../../src/grade/within10000.js");
var common4 = require("../../src/grade/renyi.js");
var util = require("../../utils/util.js");

var app = getApp();

Page({
  data: {
    idb: "back",
    id9: "9",
    id8: "8",
    id7: "7",
    idj: "-",
    id6: "6",
    id5: "5",
    id4: "4",
    id3: "3",
    id2: "2",
    id1: "1",
    id0: "0",
    idd: ".",
    ide: "＝",
    idok: "ok",
    dotDisable: false,
    questionNum: 0,
    questionEnd: false,
    questionAnwser: "",
    countDown: 30,
    question: "",
    inputNumber: "",
    hid: true,
    source: "/images/pageCalc/true.png",
    grade: 0,
    rightNum: 0,
    wrongNum: 0,
    calresult: [], //cy
    logs: []
  },
  onShow: function() {
    this.setData({
      rightNum: app.globalData.rightToday,
      wrongNum: app.globalData.wrongToday,
    })
    // 页面显示
  },
  clickBtn: function(event) {
    if (this.data.hid == false)
      return;
    //  if (this.data.questionNum == 0)
    //    return;
    var id = event.target.id;

    //退格键<-
    if (id == this.data.idb) {
      var data = this.data.inputNumber;
      if (data == "") {
        return;
      }
      if (data.charAt(data.length - 1) == ".")
        this.setData({
          "dotDisable": false
        });
      data = data.substring(0, data.length - 1);
      this.setData({
        "inputNumber": data
      });

      //清屏键
    } else if (id == this.data.idc) {
      this.setData({
        "inputNumber": "",
        "dotDisable": false
      });
    }

    //数字，小数点，负数符号
    else {
      var sd = this.data.inputNumber;
      var data = sd;
      if (sd == "") {
        if (id == ".") {
          data = "0.";
          this.setData({
            "dotDisable": true
          });
        } else
          data = id;
      } else {
        if (id == "-")
          return;
        if (id == ".")
          if (this.data.dotDisable == true || sd.charAt(sd.length - 1) == "-")
            return;
          else
            this.setData({
              "dotDisable": true
            });
        data = sd + id;
      }
      this.setData({
        "inputNumber": data
      });
    }
  },

  //确认时操作
  //0.判断答案正误
  //1.将结果保存到历史记录中
  //2.清除  inputNumber ， dotdisable
  //3.检查当前是否已经完成30个题，完成则跳转到完成界面
  //4.生成下一题，并换为下一题

  nextQuestion: function() {
    var data = this.data.inputNumber;
    //已经回答30题
    if (this.data.questionEnd == true)
      return;
    //等待正误提示过去
    if (this.data.hid == false)
      return;
    //啥都没输入就确定了
    if (data == "" && this.data.questionNum != 0)
      return;
    //最后的输入是小数点
    if (data.charAt(data.length - 1) == ".")
      return;


    //判断正误

    var questionRight = false;
    data = Number(data).toFixed(2);

    console.log("本次输入的答案" + data);

    //总答题数+1
    var questKind = app.globalData.questionKind;
    var classes = 0;
    app.globalData.answeredAll = app.globalData.answeredAll + 1;
    if (questKind <= 9 || questKind == 18 || questKind == 19) {
      classes = 1;
      app.globalData.answeredOne = app.globalData.answeredOne + 1;
    } else if (questKind <= 13 || questKind == 20 || questKind == 21) {
      classes = 2;
      app.globalData.answeredTwo = app.globalData.answeredTwo + 1;
    } else if (questKind <= 17 || questKind == 22 || questKind == 23) {
      classes = 3;
      app.globalData.answeredThree = app.globalData.answeredThree + 1;
    }
    app.globalData.answeredToday = app.globalData.answeredToday + 1;

    wx.setStorageSync("answeredAll", app.globalData.answeredAll)
    wx.setStorageSync("answeredOne", app.globalData.answeredOne)
    wx.setStorageSync("answeredTwo", app.globalData.answeredTwo)
    wx.setStorageSync("answeredThree", app.globalData.answeredThree)

    var rightRate = 1.0;
    if (data == this.data.questionAnwser) {
      questionRight = true;
      this.setData({
        hid: false,
        source: "/images/pageCalc/true.png",
        rightNum: this.data.rightNum + 1
      });
      app.globalData.rightToday = app.globalData.rightToday + 1;
      if (classes == 1) {
        app.globalData.rightOne = app.globalData.rightOne + 1;
        rightRate = 1.0 * app.globalData.rightOne / app.globalData.answeredOne;
      }
      if (classes == 2) {
        app.globalData.rightTwo = app.globalData.rightTwo + 1;
        rightRate = 1.0 * app.globalData.rightTwo / app.globalData.answeredTwo;
      }
      if (classes == 3) {
        app.globalData.rightThree = app.globalData.rightThree + 1;
        rightRate = 1.0 * app.globalData.rightThree / app.globalData.answeredThree;
      }
      console.log(true);
    } else {
      this.setData({
        hid: false,
        source: "/images/pageCalc/false.png",
        wrongNum: this.data.wrongNum + 1
      });
      app.globalData.wrongToday = app.globalData.wrongToday + 1;
      if (classes == 1) {
        rightRate = 1.0 * app.globalData.rightOne / app.globalData.answeredOne;
      }
      if (classes == 2) {
        rightRate = 1.0 * app.globalData.rightTwo / app.globalData.answeredTwo;
      }
      if (classes == 3) {
        rightRate = 1.0 * app.globalData.rightThree / app.globalData.answeredThree;
      }
      console.log(false);
    }
    wx.setStorageSync("rightOne", app.globalData.rightOne)
    wx.setStorageSync("rightTwo", app.globalData.rightTwo)
    wx.setStorageSync("rightThree", app.globalData.rightThree)
    
    console.log(rightRate , classes);


    //存储历史记录
    if (questionRight == false) {
      this.data.logs.push(this.data.question + " = " + data + "    " + questionRight); //等待加入最后的正确/错误
      wx.setStorageSync("calclogs", this.data.logs);
      console.log("anser" + this.data.questionAnwser)
      this.data.calresult.push(this.data.questionAnwser); //等待加入最后的正确/错误
      wx.setStorageSync("calresult", this.data.calresult);

      var username="null";
      if (app.globalData.userInfo != null)
        username = app.globalData.userInfo.nickName;
      var tmp = wx.getStorageSync("wrongBook") || [];
      console.log([username, util.formatTime(new Date()), classes, this.data.question, this.data.questionAnwser, rightRate]);
      tmp.push([username,util.formatTime(new Date()),classes,this.data.question, this.data.questionAnwser,rightRate]);
      wx.setStorageSync("wrongBook", tmp);
    }

    var username = "null";
    if (app.globalData.userInfo != null)
      username = app.globalData.userInfo.nickName;
    var tmp = wx.getStorageSync("history") || [];
    console.log([username, util.formatTime(new Date()), classes, this.data.question, this.data.questionAnwser, questionRight]);
    tmp.push([username, util.formatTime(new Date()), classes, this.data.question, this.data.questionAnwser, questionRight]);
    wx.setStorageSync("history", tmp);

    //延时动作并，产生题目
    var that = this;
    setTimeout(function() {
      that.setData({
        hid: true
      });
      if (app.globalData.answeredToday >= app.globalData.questionNum) {
        that.setData({
          questionEnd: true
        });
        app.globalData.answerstart = false;
        app.globalData.rightToday = 0;
        app.globalData.wrongToday = 0;
        app.globalData.answeredToday = 0;
        wx.showModal({
          title: '提示',
          content: '你已完成今日的题目',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
      }
      that.genQuestion();
    }, 500)

  },

  genQuestion: function() {
    this.setData({ //解除重复输入小数点的限制
      "dotDisable": false
    });

    this.setData({ //题号+1
      "questionNum": this.data.questionNum + 1
    });

    var array_of_functions = [
      common.jiaJian_5, //5以内加减法
      common.jiaJian_10,
      common.jiaJian_10_,
      common.jiaJian_20,
      common.jia_20,
      common.jian_20,
      common.jiaJian_20_,

      common2.zheng10_100,
      common2.zheng10Or1_100,
      common2.jiaJian_100,
      common2.jiaJian_100_,
      common2.mulTable,
      common2.divTable,

      common3.jiaJian_10000,
      common3.mul1_10000,
      common3.div1_10000,
      common3.mul2_10000
    ];

    var array_of_class = [
      [common.jiaJian_5, //一年级上
        common.jiaJian_10,
        common.jiaJian_10_,
        common.jiaJian_20,
        common.jia_20
      ],

      [common.jian_20, //一年级下
        common.jiaJian_20_,
        common2.zheng10_100,
        common2.zheng10Or1_100
      ],

      [common2.jiaJian_100, //二年级上
        common2.jiaJian_100_,
        common2.mulTable
      ],

      [common2.divTable], //二年级下

      [common3.jiaJian_10000, //三年级上
        common3.mul1_10000
      ],

      [common3.div1_10000, //三年级下
        common3.mul2_10000
      ]
    ]

    if (app.globalData.questionKind <= 17)
      var rtn = array_of_functions[app.globalData.questionKind - 1]();
    else if (app.globalData.questionKind <= 23) {
      var classes = array_of_class[app.globalData.questionKind - 18];
      var tmp = classes[Math.floor(Math.random() * (classes.length))];
      var rtn = tmp();
    } else if (app.globalData.questionKind == 24)
      var rtn = common4.renyi();
    this.setData({
      "question": rtn[0],
      "inputNumber": "",
      "questionAnwser": Number(rtn[1]).toFixed(2),
    });

    console.log(rtn);

  },

  history: function() {
    wx.navigateTo({
      url: '../history/history'
    })
  },

  onLoad: function(options) {
    this.data.logs = wx.getStorageSync("calclogs") || [];
    this.data.calresult = wx.getStorageSync("calresult") || [];
    var that = this;
    that.genQuestion();
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function() {
    // 页面渲染完成
  },

  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
})