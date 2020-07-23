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
    wx.navigateTo({
      url: "/pages/load/load"
    })
  }
})