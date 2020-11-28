//引入代码
var call = require("../../../utils/request.js")

//引用参数
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: {
      studentNum: 0,
      questionNum: 0,
      noteNum: 0,
      repliedNum: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let data = {
      courseId: options.courseId
    }
    call.request('elnTeacher.action?m=getDetailByCourseId', true, data, this.getDetailByCourseId)
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

  getDetailByCourseId: function (data) {
    console.log(data)
    if(data.ret == '0'){
      this.setData({
        msg: {
          studentNum: data.data.studyCount,
          questionNum: data.data.askCount,
          noteNum: data.data.noteCount,
          repliedNum: data.data.replyCount
        }
      })
    }else{
      console.log('接口回执异常')
    }
  }
})