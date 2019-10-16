//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    array: ['一上 5以内加减法', '一上 10以内加减法', '一上 10以内混合运算', '一上 20以内加减法（无进位）', '一上 20以内的进位加法', '一下 20以内的借位减法', '一下 20以内混合运算', '一下 整十数加，减整十数', '一下 两位数加减一位数或整十数', '二上 100以内的加减法', '二上 100以内的加减法混合运算','二上 乘法表','二下 表内除法','三上 万以内的加减','三下 乘数是一位的乘法','三下 除数是一位的除法','三下 两位数乘法'],
    array2: ['一年级上', '一年级下', '二年级上', '二年级下', '三年级上', '三年级下'],
    index: 0,
    indexarray:[0,0],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  //事件处理函数
  bindPickerChange: function (e) {
    app.globalData.questionKind = Number(e.detail.value) + this.data.indexarray[e.currentTarget.dataset.n] + 1;
    console.log(app.globalData.questionKind)
  },
  
  onLoad: function () {
    this.setData({
      indexarray:[0,this.data.array.length],
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
