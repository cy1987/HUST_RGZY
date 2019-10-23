//app.js
App({
  globalData: {
    userInfo: null,
    day:0,
    answeredAll:0,
    answeredToday: 0,    //今天已经答题的数目
    rightToday: 0,       //今天答对的数目
    wrongToday: 0,       //今天答错的数目
    questionKind: 0,     //题目类型  
   
    answerstart: false,
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var date = wx.getStorageSync("day") || 0;
    this.globalData.day = date;
    var num = wx.getStorageSync("answeredAll") || 0;
    this.globalData.answeredAll = num;


    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

})