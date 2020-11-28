// pages/router/router.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '页面加载中...',
      // mask: true
    })
    let that = this
    //qrCodeUrl为整个二维码的内容，你要取参数就要从这个URL获取
    let qrCodeUrl = decodeURIComponent(options.q);
    //解析路径
    if(qrCodeUrl){
      // 查询用户信息是否拿到
      let timeCheck = setInterval(function(){
        console.log(app.globalData.userMessage)
        if(app.globalData.userMessage !== null){
          clearInterval(timeCheck)
          that.analysisRouter(qrCodeUrl);
        }
      }, 1000)
    }else{
      console.log('未获取信息')
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

  //解析路径，跳转至对应页面
  analysisRouter: function (url) {
    let arrPara = url.split('?')[1].split('&')
    let arr = []
    for (let i in arrPara) {
      arr = arrPara[i].split("=");
      wx.setStorageSync(arr[0],arr[1]);
    }
    let mode = wx.getStorageSync('m')
    // 关闭加载
    wx.hideLoading()
    //根据mode决定跳转路径
    switch(mode){
      case 'saveClassSign':
        wx.redirectTo({
          url: '../sign/sign',
        })
        break;
      case 'saveCourseSign':
        console.log('暂无页面')
        break;
      default:
        console.log('未找到对应路径')
    }
  }
})