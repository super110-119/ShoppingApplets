// pages/profile/profile.js
import {
  getMessage
} from "../../local/index.js"

Page({
  data: {
    getMes: {}
  },
  onLoad: function (options) {
    getMessage()
      .then(res => {
        this.setData({
          getMes: res.data
        })
      })
  },
  onShareAppMessage: function () {

  },
  userClick(){
    if(this.data.getMes.load){
      wx.showToast({
        title: '你已经登录成功！',
      })
      return
    }
    wx.navigateTo({
      url: "/pages/load/load"
    })
  }
})