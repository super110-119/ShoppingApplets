//引入代码
import { timeFormat } from "../../../utils/getTime"
var call = require("../../../utils/request.js")

//引用参数
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: [],
    pageNo: 1,
    pageSize: 5,
    total: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = {
      teacherId: app.globalData.userInfo.frontUser.teacherId,
      pageSize: this.data.pageSize,
      pageNo: 1
    }
    call.request('elnTeacher.action?m=getMyCoursePage', true, data, this.getMyCoursePage)
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

  getMyCoursePage: function (data) {
    console.log(data)
    if(data.ret == '0' && data.data.records > 0){
      let list = data.data.list
      for(let i in list){
        list[i].coverImg = call.fileHead + list[i].coverImg
      }
      this.setData({courseList: list})
    }else{
      console.log('接口回执异常')
    }
  }
})