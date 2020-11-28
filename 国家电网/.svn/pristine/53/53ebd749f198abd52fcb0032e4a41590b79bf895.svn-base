var { toSign } = require("../../network/signIn")


// pages/sign/sign.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signResult: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.classSign();
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

  //用户报名签到
  classSign: async function () {
    let signId = wx.getStorageSync('signId') || null;
    let classId = wx.getStorageSync('classId') || null;
    // 获取我的培训班数据
    let obj = await toSign(classId,signId);
    if(obj.data.ret == '0'){
      this.setData({signResult: 'success'})
    }else{
      wx.showToast({
        title: obj.data.err_msg,
        icon: 'none',
        duration: 2000
      })
      setTimeout(() =>{
        wx.switchTab({
          url: '../home/home',
        })
      }, 2000)
    }
  },

  btnsClick: function () {
    wx.switchTab({
      url: '../home/home',
    })
  }

})