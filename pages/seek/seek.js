// pages/seek/seek.js
import { getMultidata } from "../../network/home.js"
const { $Message } = require('../../commonents/dist/base/index');

Page({
  data: {
    message: [],
    iconShow: false,
    inputValue: ''
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '',
      mask: true
    })
    getMultidata()
      .then(res => {
        const mes = res.data.data.keywords.list
        this.setData({
          message: mes
        })
        wx.hideLoading()
      })
  },
  inputChenge(e){
    const value = e.detail.value
    this.setData({
      inputValue: value
    })
    if(this.data.inputValue){
      this.setData({
        iconShow: true
      })
    }else{
      this.setData({
        iconShow: false
      })
    }
  },
  iconClick(){
    this.setData({
      inputValue: ''
    })
  },
  handleClick(){
    $Message({
      content: '暂无开放搜索功能！！!'
    });
  }
})