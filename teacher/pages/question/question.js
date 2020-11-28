//引入代码
var call = require("../../utils/request.js")
var getTime = require("../../utils/getTime.js");

//引用参数
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    queList: [],
    defaultImg: '/images/userIcon.png',
    pageNo: 1,
    pageSize: 5,
    total: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //查询问答列表
    let data = {
      teacherId: app.globalData.userInfo.frontUser.teacherId,
      pageSize: this.data.pageSize,
      pageNo: 1
    }
    call.request('askInfo.action?m=getPageByTeacherId', true, data, this.qaList)
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
    this.setData({queList: []})
    this.onLoad()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let pageNoAdd =  this.data.pageNo + 1
    if(this.data.pageNo < this.data.total){
      let data = {
        teacherId: app.globalData.userInfo.frontUser.teacherId,
        pageSize: this.data.pageSize,
        pageNo: pageNoAdd
      }
      call.request('askInfo.action?m=getPageByTeacherId', true, data, this.qaList)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  clickToAnswer: function (e) {
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../answer/answer?askId='+index,
    })
  },

  //查询问答列表
  qaList: function (data) {
    if(data.ret === '0'){
      for(let i in data.data.list){
        let arr = data.data.list[i].createTime;
        let date = new Date(arr);
        data.data.list[i].createTime = getTime.timeFormat(date)
      }
      //合并数组
      let stringList = this.data.queList.concat(data.data.list)
      this.setData({queList : stringList, pageNo : data.data.page, total : data.data.total})
    }else{
      console.log('接口回执异常')
    }
  },
})