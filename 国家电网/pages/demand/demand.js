// pages/demand/demand.js
let {getNeedSurvey} = require("../../network/needSurvey")
let {timeFormat} = require("../../utils/getTime")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 自定义初始化页面数据
    messages: [
      /*{
        title: "2021年教育培训项目储备调查问卷1",
        outtime: "2020-7-31 24:00",
        doing: true,
        succeed: false
      }*/
    ],
    voteId: [],

    // 定义是否遮罩
    isMask: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    let mes = await getNeedSurvey()
    let arr = await mes.data.data.list
    let myNewArr = []
    let newArr = []
    arr.forEach((value, index) => {
      let obj = {}
      obj.title = value.voteTitle || '暂无'
      obj.outtime = timeFormat(value.endTime) || '暂无'
      obj.phase = value.phase || 'C'
      obj.succeed = value.isVoted === 'N' ? false : true

      myNewArr.push(value.voteId)
      newArr.push(obj)
    })
    this.setData({
      messages: newArr,
      voteId: myNewArr,
      isMask: false
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },



  /**
   * 自定义事件-----------------------------
   * 
   */
  listClick(e){
    const i = e.currentTarget.dataset.index
    let datas = this.data.messages[i]
    function showToast(content){
      wx.showModal({
        title: '提示',
        content,
        showCancel: false
      })
    }
   if(datas.phase === 'A'){
      showToast('调查未开始，请等待通知！')
    }else  if(datas.phase === 'B' && !datas.succeed){
      wx.navigateTo({
        url: './d-page/particulars/particulars?voteId=' + this.data.voteId[i]
      })
   }else{
      if(datas.succeed){
        showToast('您已参加，请勿重复作答！')
      }else{
        showToast('评卷时间已结束！')
      }
    }
  }
})