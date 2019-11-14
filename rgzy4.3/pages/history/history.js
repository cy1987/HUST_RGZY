Page({
  data:{
    // text:"这是一个页面"
    logs:[],
    result:[],
    content: [],
    anscontent:[],
    px: [],
    pxopen: false,
    pxshow: false,
    ansopen: [false,false],
    ansshow: [],
    imgUrl: "/images/down.png",
    source: "/images/historyback.jpg",
    imgUrlLogs: [],
    anser:[],
    date: '2019-10-27',
  },
  
  onLoad:function(options){
    
  },
  onReady:function(){
    
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    // 页面初始化 options为页面跳转所带来的参数
    var logs = this.data.logs,result = this.data.result;
    var wrongBook = wx.getStorageSync('history') || [], logs = [], result = [];
    for (var n = 0; n < wrongBook.length; n++) {
      if (wrongBook[n][1] == this.data.date && wrongBook[n][5] == false) {
        logs.push(wrongBook[n][3]);
        result.push(wrongBook[n][4]);
      }
    }
    this.setData({
      "logs": logs,
      "result": result
    });
    //初始化下拉菜单
    var img = [], n, show = [], open = [];
    for (n = 0; n < logs.length; n++) {
      img.push("../../images/down.png");
      open.push(false);
      show.push(false);
    }
    this.setData({
      "imgUrlLogs": img,
      "ansopen": open,
      "ansshow": show,
    });
    //解析题目，将其过程放入anser数组中

    var anser = [];
    for (var i = 0; i < logs.length; i++) {
      anser.push(logs[i].split("=")[0].split(" "));
      console.log("anser"+anser[i])
    }
    var cal,opt1,opt2;
    var anserpro = [];
    var locate, tmp;
    var long = (anser[0].length - 2) /2;
    for (var i = 0; i < anser.length; i++) {
      anserpro.push([]);
      cal = this.data.result[i];
      console.log("cal=" + cal)
      console.log("long=" + long)
      if (long == 1) {
        console.log("result="+cal)
        anserpro[i].push(cal + "   =   " + cal);
      } else {
        opt1 = anser[i][1];
        opt2 = anser[i][3];
        if (anser[i].indexOf("/") != -1) {
          locate = anser[i].indexOf("/")
          tmp = (Number(anser[i][locate - 1]) / Number(anser[i][locate + 1])).toFixed(2) ;
          anser[i].splice(locate - 1, 3, tmp.toString());
          anserpro[i].push(anser[i].join(" ") + "  =   " + cal);
          anserpro[i].push( cal + "   =   " + cal);
        } else if (anser[i].indexOf("*") != -1){
          locate = anser[i].indexOf("*")
          tmp = (Number(anser[i][locate - 1]) * Number(anser[i][locate + 1])).toFixed(2);
          anser[i].splice(locate - 1, 3, tmp.toString());
          anserpro[i].push(anser[i].join(" ") + "  =   " + cal);
          anserpro[i].push(cal + "   =   " + cal);
        }else{
          if(opt1 == "+"){
            tmp = (Number(anser[i][0]) + Number(anser[i][2])).toFixed(2);
          }else{
            tmp = (Number(anser[i][0]) - Number(anser[i][2])).toFixed(2);
          }
          anser[i].splice(0, 3, tmp.toString());
          anserpro[i].push(anser[i].join(" ") + "  =   " + cal);
          anserpro[i].push(cal + "   =   " + cal);
        }
      }
    }
    this.setData({ "anscontent": anserpro });


    


    

  },

  //选择日期
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
    var wrongBook = wx.getStorageSync('history') || [], logs = [], result = [];
    for (var n = 0; n < wrongBook.length; n++) {
      if (wrongBook[n][1] == this.data.date && wrongBook[n][5] == false) {
        logs.push(wrongBook[n][3]);
        result.push(wrongBook[n][4]);
      }
    }
    this.setData({
      "logs": logs,
      "result": result
    });
  },


  //控制总的错题下拉显示函数
  listpx: function (e) {
    console.log(e)
    if (this.data.pxopen) {
      this.setData({
        pxopen: false,
        pxshow: false,
        imgUrl: "../../images/down.png"
      })
    } else {
      this.setData({
        content: this.data.logs,
        pxopen: true,
        pxshow: false,
        imgUrl: "../../images/up.png"
      })
    }
    console.log(e.target)
  },


  //控制每道错题的下拉显示函数
  listans: function (e) {
    console.log(e)   
    var index = e.target.dataset.index
    var ansop = "ansopen[" + index + "]"
    var ansurl = "imgUrlLogs[" + index + "]"
    if (this.data.ansopen[index]) {
      this.setData({
        [ansop] : false,
        [ansurl]: "../../images/down.png"
      })
    } else {
      this.setData({
        content: this.data.logs,
        [ansop]: true,
        [ansurl]: "../../images/up.png"
      })
    }
    console.log(e.target)
  },



})