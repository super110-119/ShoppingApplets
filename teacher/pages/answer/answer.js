//引入代码
var call = require("../../utils/request.js")
var getTime = require("../../utils/getTime.js");
var util = require("../../utils/util.js");

//引用参数
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bottom: 0,
    askDetail: null,
    answer: null,
    askId: null,
    defaultImg: '/images/userIcon.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = {
      askId: options.askId
    }
    this.setData(data) 
    call.request('askInfo.action?m=getDetail', true, data, this.getDetail)
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

  //输入聚焦
  foucus: function (e) {
    console.log(e)
    var that = this;
    that.setData({
      bottom: e.detail.height
    })
  },
  
  //失去聚焦
  blur: function (e) {
    var that = this;
    that.setData({
      bottom: 0
    })
  },

  //获取问题详细信息
  getDetail: function (data) {
    console.log(data)
    if(data.ret === '0'){
      let askObj = data.data.askInfo
      let date = new Date(askObj.createTime);
      askObj.createTime = getTime.timeFormat(date,'yyyy-mm-dd')
      askObj.compareTime = util.timeCompare(date)
      if(askObj.myAnswerList.length > 0){
        for(let i in askObj.myAnswerList){
          askObj.myAnswerList[i].createTime = util.timeCompare(askObj.myAnswerList[i].createTime, true)
        }
      }
      this.setData({askDetail:data.data.askInfo})
    }else{
      console.log('接口返回异常')
    }
  },

  //回答问题
  inputAnswer: function (e) {
    this.setData({
      answer: e.detail.value
    })
  },

  //发送回答
  sendAnswer: function () {
    let mes = this.data.answer;
    if(!mes){
      wx.showModal({
        title: '提示',
        content: '请输入您的回答',
        showCancel: false
      })
      return
    }
    let msg = mes.trim()
    if(!msg){
      wx.showModal({
        title: '提示',
        content: '请输入您的回答',
        showCancel: false
      })
      return
    }
    let data = {
      askId: this.data.askId,
      answerContent: msg,
      teacherId: app.globalData.userInfo.frontUser.teacherId
    }
    call.request('askAnswer.action?m=insert', true, data, this.answerSuccess)
  },

  answerSuccess: function (data) {
    if(data.ret == '0'){
      wx.showToast({
        title: '发送成功'
      })
      setTimeout(() => {
        let data = {askId: this.data.askId}
        this.setData({answer: '',bottom: 0})
        call.request('askInfo.action?m=getDetail', true, data, this.getDetail)
      }, 1500);
    }else{
      console.log('接口回执异常')
    }
  }
})