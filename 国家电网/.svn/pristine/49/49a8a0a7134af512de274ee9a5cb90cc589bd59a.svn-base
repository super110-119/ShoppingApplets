// pages/reserveitem/createitem/copyitem/copyitem.js
let app = getApp()
let httpHead = app.globalData.httpHead2
var util = require("../../../../utils/getTime.js");

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
    this.getReserveItem();
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

  //获取储备项目数据
  getReserveItem: function () {
    let userMessage = app.globalData.userMessage
    wx.request({
      url: httpHead + 'api/elnProject.action?m=getMyPage',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      data: {
        coopCode : 'chengde',
        frontUserId : userMessage.frontUser.frontUserId, 
        accessToken : userMessage.accessToken,
        pageNo : 1,
        pageSize : 5
      },
      method: 'post',
      success: res => {
        if(res.data.msg === 'success'){
          let itemlist = res.data.data.list;
          //处理时间戳,划分数据
          for(let i in itemlist){
            let arr = itemlist[i].createTime;
            let date = new Date(arr);
            itemlist[i].createTime = util.timeFormat(date)
          }
          console.log(itemlist)
          this.setData({itemlist})
        }
      }
    })
  },

  //复制
  copyItem: function (e) {
    console.log(e.target.dataset.index)
    let userMessage = app.globalData.userMessage
    wx.showModal({
      title: "确定复制该项目？",
      success: res => {
        if(res.confirm){
          wx.request({
            url: httpHead + 'api/elnProject.action?m=saveCopy&projectId='+e.target.dataset.index,
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            data: {
              coopCode : 'chengde',
              frontUserId : userMessage.frontUser.frontUserId, 
              accessToken : userMessage.accessToken,
            },
            success: res => {
              console.log(res)
              if(res.data.msg === "success"){
                wx.showToast({
                  title: '项目已复制',
                  icon: 'success',
                  duration: 4000
                })
                wx.reLaunch({
                  url: '../../../../pages/reserveitem/reserveitem',
                })
              }else{
                wx.showToast({
                  title: '项目复制失败',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
        }
      }
    })
  }
})