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

    hid: true,
    dotDisable: false,
    source: "/images/pageCalc/true.png",

    wrongQuestionList: [],
    rightNum: 0,

    questionAnwser: "",
    question: "",
    inputNumber: "",



  },

  onLoad: function(options) {
    this.data.wrongQuestionList = wx.getStorageSync("wrongBook") || [];
    var that = this;
    that.genQuestion();
  },

  //点击确认的操作
  nextQuestion: function() {
    var data = this.data.inputNumber;
    //等待正误提示过去
    if (this.data.hid == false)
      return;
    //啥都没输入就确定了
    if (data == "")
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
      this.data.wrongQuestionList.pop()
      wx.setStorageSync("wrongBook", this.data.wrongQuestionList);
      this.setData({
        hid: false,
        rightNum: this.data.rightNum + 1,
        source: "/images/pageCalc/true.png",
      });
      console.log(true);
    } else {
      this.setData({
        hid: false,
        source: "/images/pageCalc/false.png",
      });
      console.log(false);
    }


    //延时动作并产生题目
    var that = this;
    setTimeout(function() {
      that.setData({
        inputNumber: "",
        "dotDisable": false,
        hid: true
      });
      if (questionRight == false)
        return;

      that.genQuestion();
    }, 500)
  },


  genQuestion: function() {

    //判断是否读取了最后一个错题
    console.log(this.data.wrongQuestionList)
    if (this.data.wrongQuestionList.length == 0) {
      wx.showModal({
        title: '提示',
        content: '历史记录中无更多错题',
        showCancel:false,
        success(res) {
          if (res.confirm) {
            wx.navigateBack({
              delta: 1
            })
          } 
        }
      })
      return;
    }

    var tmp = this.data.wrongQuestionList;
    var data = tmp[tmp.length-1];

    //题号+1,设置题目状态
    this.setData({
      "question": data[3],
      "inputNumber": "",
      "questionAnwser": Number(data[4]).toFixed(2),
    });

  },

  //点击按键的反应
  clickBtn: function(event) {
    if (this.data.hid == false)
      return;
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
})