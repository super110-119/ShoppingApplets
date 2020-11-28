// pages/reserveitem/reserveitem.js
let app = getApp()
let httpHead = app.globalData.httpHead2
var util = require("../../utils/getTime.js");
let isNums = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用户角色权限 0：项目创建人员 1：项目审核人员
    userpermissions: 1,
    //切换项目
    btnselect: 0,
    //itemlist总数组，其余为分数组
    itemlist: [],
    itemlist1: [],
    itemlist2: [],
    //当前页面
    pageNo1: 1,
    pageNo2: 1,
    //最大页数
    pagemax1: 1,
    pagemax2: 1,
    //每页显示数量
    pagesum: 5,
    // 定义是否遮罩
    isMask: true,
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
    this.setData({
      pageNo1:1,
      itemlist1: [],
      pageNo2:1,
      itemlist2: []
    })
    this.getReserveItemAudit();
    this.getReserveItemChecked();
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
    if(this.data.btnselect == 0){
      this.setData({
        pageNo1:1,
        itemlist1: [],
      })
      this.getReserveItemAudit();
    }else{
      this.setData({
        pageNo2:1,
        itemlist2: []
      })
      this.getReserveItemChecked();
    }
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 先检测用户所在阶段，0为待审核，1为已审核
    if(this.data.btnselect == 0){
      if( this.data.pageNo1 > this.data.pagemax1){
        return
      }
      this.getReserveItemAudit();
    }else{
      if( this.data.pageNo2 > this.data.pagemax2){
        return
      }
      this.getReserveItemChecked();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 带参数跳转到详情页
   * 注意： 0 - 正在审核
   *       1 - 通过
   *        2- 未通过
   */
  productClick(e){
    let index = e.currentTarget.dataset.index
    let list = this.data.itemlist1[index]
    let i = this.data.itemlist1[index].status;
    let projectId = this.data.itemlist1[index].projectId;
    wx.setStorage({
      key:"projectlist",
      data:list
    })
    if(this.data.userpermissions === 0){
      wx.navigateTo({
        url: '../reserveitem/details/details?Transition=' + i + '&projectId=' + projectId,
      })
    }else{
      if(this.data.btnselect == 0){
        wx.navigateTo({
          url: '../reserveitem/users/consult/consult'
        })
      }else{
        wx.showToast({
          title: '该项目审批已结束',
          icon: 'none',
          duration: 2000
        })
      }
    }
  },

  //切换未审/已审项目标题
  changeSelect: function (e) {
    const selectnum = e.currentTarget.dataset['index']
    let itemlist = null
    let role = this.data.userpermissions
    if(role == 0){
      return;
    }
    //模拟数据切换
    if(selectnum == 0){
      itemlist = this.data.itemlist1
    }else{
      itemlist = this.data.itemlist2
    } 
    this.setData({ 
      btnselect: selectnum,
      itemlist: itemlist,
      isMask: false
    })
  },

  //加载待审核项目
  getReserveItemAudit: function () {
    let userMessage = app.globalData.userMessage
    let pageNo = this.data.pageNo1
    let that = this
    let data = {coopCode : 'chengde', frontUserId : userMessage.frontUser.frontUserId, orgId : userMessage.frontUser.orgId,  roleCode :  userMessage.frontUser.roleCode, 
    accessToken : userMessage.accessToken,  pageNo : that.data.pageNo1, pageSize : that.data.pagesum}
    if(pageNo == 1){
      //只有进入第一次有加载图标，后续改为静默加载
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
    }
    wx.request({
      url: httpHead + '/api/zodChengdeCheckElnProject.action?m=getMyUnCheckedProjecte',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      data,
      method: 'post',
      success: res => {
        //console.log(res)
        if(res.data.msg === 'success'){
          let itemlist = res.data.data.list;
          //处理时间戳,划分数据
          for(let i in itemlist){
            let arr = itemlist[i].createTime;
            let date = new Date(arr);
            itemlist[i].createTime = util.timeFormat(date)
          }
          let pageNo1 = pageNo+1
          //合并数组
          let itemlistAll = that.data.itemlist1.concat(itemlist)
          this.setData({
            itemlist1: itemlistAll,
            pageNo1,
            pagemax1:  res.data.data.total,
            isMask: false
          })
          wx.hideLoading();
        }
      }
    })
  },

    //加载已审核项目
  getReserveItemChecked: function () {
    let userMessage = app.globalData.userMessage
    let pageNo = this.data.pageNo2
    let that = this
    let data = {coopCode : 'chengde', frontUserId : userMessage.frontUser.frontUserId, orgId : userMessage.frontUser.orgId,  roleCode :  userMessage.frontUser.roleCode, 
    accessToken : userMessage.accessToken,  pageNo : that.data.pageNo2, pageSize : that.data.pagesum}
    if(pageNo == 1){
      //只有进入第一次有加载图标，后续改为静默加载
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
    }
    wx.request({
      url: httpHead + '/api/zodChengdeCheckElnProject.action?m=getMyCheckedProjecte',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      data,
      method: 'post',
      success: res => {
        if(res.data.msg === 'success'){
          let itemlist = res.data.data.elnProjectList;
          let commonCheckLogList = res.data.data.commonCheckLogList;
          //处理时间戳,划分数据，拼接数组
          for(let i in itemlist){
            let arr = itemlist[i].createTime;
            let date = new Date(arr);
            itemlist[i].createTime = util.timeFormat(date)
            if(commonCheckLogList.length > 0){
              let index = commonCheckLogList.find(item => item.objectId == itemlist[i].projectId)
              itemlist[i].checkStatus = index.checkStatus  
            }
          }
          let pageNo2 = pageNo+1
          //合并数组
          let itemlistAll = that.data.itemlist2.concat(itemlist)
          this.setData({
            itemlist2: itemlistAll,
            pageNo2,
            pagemax2:  res.data.data.total,
            isMask: false
          })
          wx.hideLoading();
        }
      }
    })
  },
})