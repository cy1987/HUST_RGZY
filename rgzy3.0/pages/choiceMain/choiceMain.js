var that;
var app = getApp()
//var Bmob = require('../../utils/bmob.js');
// pages/choiceMain/choiceMain.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      choosenNum:0
  },


//跳转到答题界面
  toCalc: function(e) {
    console.log(app.globalData.questionKind);
    if (Number(app.globalData.questionKind) == 0){
      wx.showModal({
        title: '提示',
        content: '首次使用前请先在“我的界面”选择题目类型！',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return;
    }
    wx.navigateTo({
      url: '../Newcalc/Mewcalc',
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
  onShow: function() {},

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