//引入代码
var call = require("../../utils/request.js")

//引用参数
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoSrc: '',
    videoTime: '',
    videoSzie: 0,
    videoTitle: '',
    videoMsg: ''
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

  //将视频加载至本地服务器
  chooseVideo: function () {
    var that = this
    wx.showLoading({
      title: '正在开启相机',
    })
    wx.chooseVideo({
      success: res => {
        if(res.duration > 60){
          wx.showToast({
            title: '视频时长超过规定！',
            icon: 'none',
          })
          return
        }
        that.setData({videoSrc: res.tempFilePath, videoTime: res.duration, videoSzie: res.size})
      },
      complete: res => {
        wx.hideLoading()
      }
    })
  },

  //上传视频
  uploadvideo: function () {
    wx.showLoading({
      title: '视频上传中',
      mask: true
    })
    let that = this
    let videoSrc = this.data.videoSrc;
    let accessToken = app.globalData.userInfo.accessToken;
    let userinfo = app.globalData.userInfo.frontUser;
    let url = call.httpHead + `upload.action?m=uploadFile`
    wx.uploadFile({
      filePath: videoSrc,
      name: 'files',
      url: url,
      formData: {
        frontUserId: userinfo.frontUserId,
        coopCode: userinfo.coopCode,
        accessToken,
        headimgurl: userinfo.headimgurl
      },
      success: res => {
        if(res.statusCode == '200'){
          wx.hideLoading()
          that.saveVideoMsg(res.data)
        }else{
          wx.hideLoading()
          console.log('视频上传至服务器失败')
        }
      },
      fail: res => {
        wx.hideLoading()
        console.log('uploadFile失败')
      }
    })
  },

  //将保存的视频数据和标题描述转存入数据库
  saveVideoMsg: function (res){
    let jsonObj = JSON.parse(res);
    let fileOriginalName = jsonObj.data.fileUrl.split('/').pop()
    let data = {
      topicTitle: this.data.videoTitle,
      content: this.data.videoMsg,
      contentType: 'video',
      filePath: [jsonObj.data.fileUrl],
      fileOriginalName: [fileOriginalName],
      fileSize: [this.data.videoSzie],
      fileType: ['video'],
    }
    call.request('forumTopic.action?m=insert', true, data, this.forumTopic)
  },

  //视屏全屏预览
  bindVideoScreenChange: function (e) {
    var status = e.detail.fullScreen;
  },

  //微课标题
  inputTitle: function (e) {
    this.setData({
      videoTitle: e.detail.value
    })
  },

  //微课内容
  inputMsg: function (e) {
    this.setData({
      videoMsg: e.detail.value
    })
  },

  forumTopic: function (data) {
    if(data.ret == '0'){
      wx.showToast({
        title: '微课上传成功'
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 1500);
    }else{
      console.log('接口回执异常')
    }
  }
})