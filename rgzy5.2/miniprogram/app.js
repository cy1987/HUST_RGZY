//app.js
App({
  globalData: {
    userInfo: null,

    day: 0, //从文件中读取并更新，当前作答的天数
    answeredAll: 0, //从文件中读取并更新，当前作答的题目数
    answeredOne: 0,//回答的一年级的题目数
    answeredTwo: 0,//回答的二年级的题目数
    answeredThree: 0,//回答的三年级的题目数

    rightOne: 0,
    rightTwo: 0,
    rightThree: 0,

    answeredToday: 0,    //今天已经答题的数
    rightToday: 0,       //今天答对的数目
    wrongToday: 0,       //今天答错的数目

    questionKind: 0,     //题目类型  
    questionNum: 30,

    wrongBook: [],//选择错题重答的时候
    //读取历史文件
    //------------
    answerstart: false,
    multiIndexg: [0, 0, 0],
  },
  onLaunch: function () {

      if (!wx.cloud) {
        console.error('请使用 2.2.3 或以上的基础库以使用云能力')
      } else {
        wx.cloud.init({
          // env 参数说明：
          //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
          //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
          //   如不填则使用默认环境（第一个创建的环境）
          // env: 'my-env-id',
          traceUser: true,
        })
      }

    //this.globalData = {}
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var date = wx.getStorageSync("day") || 0;
    this.globalData.day = date;
    var num = wx.getStorageSync("answeredAll") || 0;
    this.globalData.answeredAll = num;
    num = wx.getStorageSync("answeredOne") || 0;
    this.globalData.answeredOne = num;
    num = wx.getStorageSync("answeredTwo") || 0;
    this.globalData.answeredTwo = num;
    num = wx.getStorageSync("answeredThree") || 0;
    this.globalData.answeredThree = num;
    num = wx.getStorageSync("rightOne") || 0;
    this.globalData.rightOne = num;
    num = wx.getStorageSync("rightTwo") || 0;
    this.globalData.rightTwo = num;
    num = wx.getStorageSync("rightThree") || 0;
    this.globalData.rightThree = num;



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