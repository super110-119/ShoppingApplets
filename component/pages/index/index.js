//index.js
//获取应用实例
const app = getApp()
let {getInfo} = require("../../components/question/getInfo")

let userMes = []

Page({
  data: {
    question: [
      {
        state: 0,
        titles: '1+1的值是多少？',
        questions: [
          '1',
          '2',
          '3',
          '4'
        ]
      },{
        state: 1,
        titles: '你喜欢吃什么？',
        questions: [
          '香蕉',
          '苹果',
          '雪梨',
          '葡萄',
          '西瓜',
          '草莓'
        ]
      },{
        state: 0,
        titles: '你最喜欢的编程语音是？',
        questions: [
          'JavaScript',
          'python',
          'Java',
          'PHP'
        ]
      },{
        state: 2,
        titles: '请输入你的看法！'
      }
    ]
  },
  userChangeInfo(e){ 
    let mes = getInfo(e, userMes);
    userMes = mes
    console.log(userMes);
  }

  /* data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  } */
})
