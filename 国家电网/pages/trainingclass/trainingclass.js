// pages/trainingclass/trainingclass.js
let { getMyClass } = require("../../network/home")
let {timeFormat} = require("../../utils/getTime")

// 培训班详情
let arrs = []
let pageNum = 1
let totals = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //trainstate:课程进行状态 0进行中 1已结束  trainre：用户进行状态 0进行中 1可回看
    traininglist: [],
    isMask: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    // 加载动画
    wx.showLoading({
      title: '加载中...',
      mask: true
    }) 
    // 获取我的培训班数据
    let datas = await getMyClass(pageNum);
    if(pageNum === 1){
      totals = datas.data.data.total
    }
    let list = datas.data.data.list;
    arrs.push(...list)
    let arr = []
    // 重新定义数据
    for(let i of arrs){
      let obj = {}
      let trainstate;
      if(i.classPhase === 'A'){
        // 待开始
        trainstate = 2
      }else if(i.classPhase === 'B'){
        // 进行中
        trainstate = 0
      }else{
        // 已结束
        trainstate = 1
      }
      obj.trainstate = trainstate
      obj.trainyear = timeFormat(i.createTime, 'yyyy') || '暂无'
      obj.trainmonth = timeFormat(i.createTime, 'mm') || '暂无'
      obj.traintitle = i.className || '暂无'
      obj.trainteacher = i.masterTeacherName || '暂无'
      obj.trainpartment = i.orgName || '暂无'
      obj.trainnum = i.curNum || '暂无'
      obj.trainstartime = timeFormat(i.beginTime, 'yyyy/mm/dd') || '暂无'
      obj.trainendtime = timeFormat(i.endTime, 'yyyy/mm/dd') || '暂无'
      obj.traintime = timeFormat(i.beginTime, 'hh:ii:ss') + '~' + timeFormat(i.endTime, 'hh:ii:ss') || '暂无'
      obj.trainplace = i.address  || '暂无'
      arr.push(obj)
    }
    // 重新赋值
    this.setData({
      traininglist: arr,
      classList: list,
      isMask: false
    })
    // 关闭加载
    wx.hideLoading()
    // 关闭下拉
    wx.stopPullDownRefresh()
    console.clear()
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
    pageNum++;
    if(pageNum > totals){
      return
    }
    this.onLoad()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 用户点击下拉刷新
   */
   onPullDownRefresh(){
    arrs = []
    pageNum = 1;
    this.onLoad()
  },

  // 点击详情
  trainSchedule: function (e) {
    let i = e.currentTarget.dataset.index
    if(this.data.traininglist[i].trainstate !== 0){
      if(this.data.traininglist[i].trainstate !== 2)
        wx.showModal({
          title: '提示',
          content: '课程已结束！',
          showCancel: false
        })
      else
        wx.showModal({
          title: '提示',
          content: '课程未开始！',
          showCancel: false
        })
      return
    }
    wx.navigateTo({
      url: '../trainingschedule/trainingschedule?classId='+arrs[i].classId
    }) 
  },
  // 点击切换按钮
  cutClass(e){
    wx.navigateTo({
      url: '/pages/outClass/outClass'
    })
  }
})