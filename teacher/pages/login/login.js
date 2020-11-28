//引入代码
var call = require("../../utils/request.js")
var base64 = require("../../utils/base64.js")

//引用参数
const app = getApp()

// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: null,
    registerStep: 1,
    phoneNum: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断用户需要注册还是绑定
    if(app.globalData.userInfo){
      this.setData({ registerStep: 2})
    }else{
      // 通过微信获取code码，用于后台绑定操作
      wx.login({
        success: res => {
          if(res.code){
            this.setData({code:res.code})
          }
        }
      })
    }
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //授权获取用户信息。进行用户注册
  bindGetUserInfo: function (e) {
    console.log(e)
    //判断用户是否同意授权操作
    if(e.detail.userInfo){
      let data = {
        coopCode: 'cloud',
        appCode: 'baiwanmingshi',
        code: this.data.code,
        userinfoJson: base64.CusBASE64.encoder(JSON.stringify(e.detail.userInfo)),
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv
      }
      wx.showLoading({
        title: '登陆中…',
        mask: true
      })
      call.request('weixinOauthWxapp.action?m=register', false, data, this.registerSuc)
    }else{
      //用户拒绝授权
      wx.showModal({
        title: '提示',
        content: '您已拒绝授权，无法后续操作',
        showCancel: false
      })
    }
  },

  //获取用户电话号码，验证用户信息
  bindgetphonenumber: function (e) {
    //console.log(e)
    // if(e){
    //   let data = {
    //     mobile: e
    //   }
    // }else{
    //   //用户拒绝授权
    //   wx.showModal({
    //     title: '提示',
    //     content: '您已拒绝授权，将无法进行后续操作',
    //     showCancel: false
    //   })
    // }
    let str = /^1[34578]\d{9}$/
    let nums = this.data.phoneNum
    if(!str.test(nums)){
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号码',
        showCancel: false,
        confirmText: '我知道了'
      });
      return
    }
    let data = {
      mobile: nums
    }
    wx.showLoading({
      title: '绑定中…',
      mask: true
    })
    call.request('elnTeacher.action?m=registerOrBindByMobile', true, data, this.bindSuc)
  },

  //用户信息注册成功
  registerSuc: function (data) {
    wx.hideLoading();
    console.log(data)
    if(data.ret == '0'){
      app.globalData.userInfo = data.data
      this.setData({registerStep: 2})
    }else{
      wx.showToast({
        title: res.err_msg,
        icon: 'none'
      })
    }
  },

  //用户绑定成功
  bindSuc: function (res) {
    wx.hideLoading();
    console.log(res)
    if(res.ret == '0'){
      app.onLaunch();
      wx.switchTab({
        url: '../index/index',
      })
    }else{
      wx.showToast({
        title: res.err_msg,
        icon: 'none'
      })
    }
  },

  formInputChange: function (e) {
    this.setData({
      phoneNum: e.detail.value
    })
  },

  getCode: function () {
    wx.showToast({
      title: '暂不需验证',
      icon: 'none',
      duration: 1000
    })
  }
})