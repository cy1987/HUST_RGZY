var that;
var app = getApp()

// pages/choiceMain/choiceMain.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionStart: false, // 标识已经开始答题
    text: "开始答题",
  },


  //跳转到答题界面
  toCalc: function(e) {
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


    if (Number(app.globalData.questionKind) == 0) {
      wx.showModal({
        title: '提示',
        content: '首次使用前请先在“我的”界面选择题目类型！',
      })
      return;
    }
    app.globalData.answerstart = true;


    wx.navigateTo({
      url: '../Newcalc/Mewcalc'
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    that = this;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})