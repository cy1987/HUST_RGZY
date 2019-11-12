var that;
var app = getApp()
const db = wx.cloud.database()

// pages/choiceMain/choiceMain.js
Page({
  data: {
    questionNum: 30,
    questionStart: false, // 标识已经开始答题
    text: "开始答题",
  },


  //跳转到答题界面
  toCalc: function (e) {
    //记录打卡日期
    var date = wx.getStorageSync("calcdate") || [];
    var time = Date().substr(4, 12);
    date.push(time);
    if (date.length == 1) {
      app.globalData.day = app.globalData.day + 1;
      wx.setStorageSync("day", app.globalData.day);
    } else if (date[date.length - 1] != date[date.length - 2]) {
      console.log(true);
      app.globalData.day = app.globalData.day + 1;
      wx.setStorageSync("day", app.globalData.day);
    }

    wx.setStorageSync("calcdate", date);
    console.log(date)
    console.log(date.length)
    console.log(app.globalData.day)

    var username = "null";
    if (app.globalData.userInfo != null)
      username = app.globalData.userInfo.nickName;
    var id_key = 'userinfo ' + username;
    console.log(id_key)
    db.collection('movies').doc(id_key).update({
      data: {
        day: app.globalData.day
      },
    })


    if (Number(app.globalData.questionKind) == 0) {
      wx.showModal({
        title: '提示',
        content: '首次使用前请先在“我的”界面选择题目类型！',
      })
      return;
    }

    id_key = 'wrongbook of ' + username;
    db.collection('movies').add({
      data: {
        _id:id_key,
        list:[]
      },
    })
    db.collection('movies').doc(id_key).get({
      success: function (res) {
        console.log(res.data.list.length)
        if (res.data.list.length >= 10) {
          console.log(res.data.list)
          wx.showModal({
            title: '你的错题已经多达' + res.data.list.length + "个",
            content: '温故而知新，请先在 "我的" 界面中回答历史错题',
          })
          return;
        }
        app.globalData.answerstart = true;
        wx.navigateTo({
          url: '../Newcalc/Mewcalc'
        })
      }
    })

  },


  bindKeyInput: function (e) {
    if (!this.data.questionStart) {
      this.setData({
        questionNum: e.detail.value
      })
      app.globalData.questionNum = this.data.questionNum;
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      questionNum: app.globalData.questionNum,
      questionStart: app.globalData.answerstart,
    })
    if (app.globalData.answerstart == false)
      this.setData({
        text: "开始答题"
      })
    else
      this.setData({
        text: "继续答题"
      })
  },

})