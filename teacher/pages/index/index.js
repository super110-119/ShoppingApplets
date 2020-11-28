//引入代码
var call = require("../../utils/request.js")
var getTime = require("../../utils/getTime.js");

const app = getApp()

Page({
  data: {
    forumList: [],
    pageNo: 1,
    pageSize: 5,
    total: 1,

    isLoad: true,
  },
  onLoad: function () {
    let that=this
    //未获取到信息将进行回调操作，迫使onLaunch执行完成再拿去用户信息
    if(!app.globalData.userInfo){
      app.callback = () => {
        if(app.globalData.userInfo!=''){
          let data = {
            frontUserId: app.globalData.userInfo.frontUser.frontUserId,
            pageSize: that.data.pageSize,
            pageNo: 1
          }
          call.request('forumTopic.action?m=getPage', true, data, that.forumTopic)
        }
      };
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({forumList: []})
    let that=this
    let data = {
      frontUserId: app.globalData.userInfo.frontUser.frontUserId,
      pageSize: that.data.pageSize,
      pageNo: 1
    }
    call.request('forumTopic.action?m=getPage', true, data, that.forumTopic)
    wx.stopPullDownRefresh()
  },

  // 页面触底下拉
  onReachBottom: function () {
    let pageNoAdd =  this.data.pageNo + 1
    if(this.data.pageNo < this.data.total){
      let data = {
        frontUserId: app.globalData.userInfo.frontUser.frontUserId,
        pageSize: this.data.pageSize,
        pageNo: pageNoAdd
      }
      call.request('forumTopic.action?m=getPage', true, data, this.forumTopic)
    }
  },

  createItem: function () {
    wx.navigateTo({
      url: '../uploadcourse/uploadcourse',
    })
  },

  //微课动态列表
  forumTopic: function (data) {
    if(data.ret == '0'){
      let forumList = data.data.list
      for(let i in forumList){
        forumList[i].topicImg = call.fileHead + forumList[i].topicImg
      }
      //合并数组
      forumList = this.data.forumList.concat(forumList)
      this.setData({forumList, pageNo : data.data.page, total : data.data.total})
    }else{
      console.log('接口回执异常')
    }
    this.setData({
      isLoad: false
    })
  },

  
  //视屏全屏预览
  bindVideoScreenChange: function (e) {
    var status = e.detail.fullScreen;
  },
})
