var wxCharts = require("../../utils/wxcharts.js");
var app = getApp();
var daylineChart = null;
var yuelineChart = null;
// pages/analizy/analizy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    source: "/images/historyback.jpg",
    //----------------------开始
    multiArray: [['一年级', '二年级','三年级'],  ['总题数', '错题数', '正确率']],
    multiIndex: [0, 0],  //多项选择类型
    data:  [[],[],[]],
    max : 10,
    source: "/images/historyback.jpg",
    //-------------------结束
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    for(var n=0;n<3;n++){
      for(var i=0;i<31;i++){
        this.data.data[n].push(0);
      }
    }
    this.dataanalizy();
    this.getMothElectro();
    


  },


  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
    this.dataanalizy();
    this.getMothElectro();
  },

  dataanalizy:function (){
    var wrongBook = wx.getStorageSync('history') || [];
    var today = Date().substr(4, 12);
    var tmp_today = new Date(today.replace(/-/g,"/"));
    var chudata = [];
    var tmp = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
    for(var n =0; n< wrongBook.length; n++){
      if(wrongBook[n][2]-1 == this.data.multiIndex[0]){
        var end_date = new Date(wrongBook[n][1].replace(/-/g, "/"));
        var day = 30 - parseInt((tmp_today.getTime() - end_date.getTime()) / (1000 * 60 * 60 * 24));
        wrongBook[n][1] = day;
        chudata.push(wrongBook[n]);
      }
    }
    for(var n=0;n<chudata.length;n++){
      tmp[chudata[n][1]].push(chudata[n]);
    }
    for(var n=0;n<tmp.length;n++){
      var num_ti = tmp[n].length;
      var num_cuo = 0;
      var num_lv = 0;
      for(var i=0;i<tmp[n].length;i++){
        if(tmp[n][i][5] == false){
          num_cuo ++;
        }
      }
      if(num_ti != 0)
        num_lv = 1 - num_cuo / num_ti;
      this.data.data[0][n]= num_ti;
      this.data.data[1][n] =num_cuo;
      this.data.data[2][n] =num_lv;
    }

  },


  getMothElectro: function () {
    var windowWidth = 320;
    console.log("xianshi:"+this.data.data[this.data.multiIndex[1]])
    if (this.data.multiIndex[1] == 2)
        this.setData({
          max: 1
        });
    else 
        this.setData({
          max: 100
        })
    yuelineChart = new wxCharts({ //当月用电折线图配置
      canvasId: 'yueEle',
      type: 'line',
      categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'], //categories X轴
      animation: true,
      // background: '#f5f5f5',
      series: [{
        name: this.data.multiArray[1][this.data.multiIndex[1]],
        //data: yuesimulationData.data,
        data:  this.data.data[this.data.multiIndex[1]],
        format: function (val, name) {
          return val.toFixed(2);
        }
      }
      ],
      xAxis: {
        disableGrid: true
      },
     yAxis: {
        format: function (val) {
          return val.toFixed(2);
        },
        max: this.data.max,
        min: 0
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  },

  yueTouchHandler: function (e) { //当月用电触摸显示
    console.log(daylineChart.getCurrentDataIndex(e));

    yuelineChart.showToolTip(e, { //showToolTip图表中展示数据详细内容

      background: '#7cb5ec',

      format: function (item, category) {

        return category + '日 ' + item.name + ':' + item.data

      }

    });

  },



})