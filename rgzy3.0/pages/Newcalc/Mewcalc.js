var common = require("../../src/grade/within20.js");
var common2 = require("../../src/grade/within100.js");
var common3 = require("../../src/grade/within10000.js");
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

    if (data == this.data.questionAnwser) {
      questionRight = true;
      this.setData({
        hid: false,
        source: "/images/pageCalc/true.png",
        rightNum: this.data.rightNum + 1
      });
      console.log(true);
    } else {
      this.setData({
        hid: false,
        source: "/images/pageCalc/false.png",
        wrongNum: this.data.wrongNum + 1
      });
      console.log(true);
    }

    //存储历史记录
    this.data.logs.push(this.data.question + " = " + data + "    " + questionRight); //等待加入最后的正确/错误
    wx.setStorageSync("calclogs", this.data.logs);
    console.log("anser" + this.data.questionAnwser)
    this.data.calresult.push(this.data.questionAnwser); //等待加入最后的正确/错误
    wx.setStorageSync("calresult", this.data.calresult);


    //判断是否是第三十个题
    if (this.data.questionNum == 30) {
      this.data.questionEnd = true;
      return;
    }

    //延时动作并，产生题目
    var that = this;
    setTimeout(function() {
      that.setData({
        hid: true
      });
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
    }
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
    var that = this;
    that.genQuestion();
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
})