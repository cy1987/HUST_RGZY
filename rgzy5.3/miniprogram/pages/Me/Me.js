//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    array: ['一上 5以内加减法', '一上 10以内加减法', '一上 10以内混合运算', '一上 20以内加减法（无进位）', '一上 20以内的进位加法', '一下 20以内的借位减法', '一下 20以内混合运算', '一下 整十数加，减整十数', '一下 两位数加减一位数或整十数', '二上 100以内的加减法', '二上 100以内的加减法混合运算', '二上 乘法表', '二下 表内除法', '三上 万以内的加减', '三下 乘数是一位的乘法', '三下 除数是一位的除法', '三下 两位数乘法'],
    array2: ['一年级上', '一年级下', '二年级上', '二年级下', '三年级上', '三年级下'],
    index: 0,
    indexarray: [0, 0],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    answeredAll: 0,
    day: 0,


    //----------------------开始
    multiArray: [
      ['两位运算数', '三位运算数'],
      ['5以下', '20以下', '50以下', '100以下', '200以下'],
      ['加减运算', '乘除运算', '加减乘除运算']
    ],
    multiIndex: [0, 0, 0], //多项选择类型

    //-------------------结束
  },

  onShow: function() {
    this.setData({
      answeredAll: app.globalData.answeredAll,
      day: app.globalData.day,
    })
    
    var username = "null";
    if (app.globalData.userInfo != null)
      username = app.globalData.userInfo.nickName;
    var id_key = 'userinfo ' + username;
    const db = wx.cloud.database()
    var that = this
    db.collection('movies').doc(id_key).get({
      success: function (res) {
        console.log(res.data)
        app.globalData.day = res.data.day
        app.globalData.answeredAll = res.data.answeredAll
        that.setData({
          answeredAll: app.globalData.answeredAll,
          day: app.globalData.day
        })
      }
    })
  },

  onLoad: function() {
    this.setData({
      indexarray: [0, this.data.array.length],
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

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    var id_key = "userinfo " + e.detail.userInfo.nickName
    const db = wx.cloud.database()
    var that = this
    db.collection('movies').doc(id_key).get({
      success: function(res) {
        console.log(res.data)
        app.globalData.day = res.data.day
        app.globalData.answeredAll = res.data.answeredAll
        that.setData({
          answeredAll: app.globalData.answeredAll,
          day: app.globalData.day
        })
      }
    })

    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    })
  },




  //事件处理函数
  bindPickerChange: function(e) {
    app.globalData.questionKind = Number(e.detail.value) + this.data.indexarray[e.currentTarget.dataset.n] + 1;
    console.log(app.globalData.questionKind)
  },
  bindMultiPickerChange: function(e) {
    this.setData({
      multiIndex: e.detail.value
    })
    app.globalData.multiIndexg = e.detail.value;
    app.globalData.questionKind = 24 //与种类和年级区别
  },
  bindMultiPickerColumnChange: function(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['5以下', '20以下', '50以下', '100以下', '200以下'];
            data.multiArray[2] = ['加减运算', '乘除运算', '加减乘除运算'];
            break;
          case 1:
            data.multiArray[1] = ['5以下', '10以下', '30以下', '50以下', '100以下'];
            data.multiArray[2] = ['加减混合', '乘除混合', '加减乘除混合'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['加减运算', '乘除运算', '加减乘除运算'];
                break;
              case 1:
                data.multiArray[2] = ['加减运算', '乘除运算', '加减乘除运算'];
                break;
              case 2:
                data.multiArray[2] = ['加减运算', '乘除运算', '加减乘除运算'];
                break;
              case 3:
                data.multiArray[2] = ['加减运算', '乘除运算'];
                break;
              case 4:
                data.multiArray[2] = ['加减运算', '乘除运算'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['加减混合', '乘除混合', '加减乘除混合'];
                break;
              case 1:
                data.multiArray[2] = ['加减混合', '乘除混合', '加减乘除混合'];
                break;
              case 2:
                data.multiArray[2] = ['加减混合', '乘除混合', '加减乘除混合'];
                break;
              case 3:
                data.multiArray[2] = ['加减混合', '乘除混合'];
                break;
              case 4:
                data.multiArray[2] = ['加减混合', '乘除混合'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;

        break;
    }
    console.log(data.multiIndex);
    this.setData(data);
    console.log(this.data.multiIndex);
  },


  wrongBook: function(e) {
    wx.navigateTo({
      url: '../wrongBook/wrongBook',
    })
  },

  analizy: function(e) {
    wx.navigateTo({
      url: '../analizy/analizy',
    })
  },
})