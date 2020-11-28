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
    userpermissions: 0,
    //切换项目
    btnselect: 0,
    //itemlist总数组，其余为分数组
    itemlist: [],
    itemlist1: [],
    itemlist2: [],
    //初始页面
    pageNo: 1,
    //最大页数
    pagemax: 1,
    //每页显示数量
    pagesum: 10,
    // 定义是否遮罩
    isMask: true,
    //创建按钮是否启动
    elnSetting: 'Y'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getReserveItem();
    this.getElnSetingType();
    //获取配置缓存 
    //this.setData({elnSetting: wx.getStorageSync('elnSetting')})
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
    this.showItemList();
    //获取配置缓存 
    this.getElnSetingType();
    //this.setData({elnSetting: wx.getStorageSync('elnSetting')})
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
    this.setData({
      pageNo:1,
      itemlist: [],
      itemlist1: [],
      itemlist2: []
    })
    this.onLoad()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // this.getMore();
    let isNum = this.data.pageNo
    if(isNum > isNums){
      return
    }
    if(this.data.userpermissions == 0){
      this.getReserveItem();
    }else{
      this.getReserveItemAudit();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 根据权限展示数据
  showItemList: function () {
    var pages = getCurrentPages()
    var currentPage = pages[pages.length - 1]
    var options = currentPage.options
    const userpermissions = options.role || 0
    if(userpermissions == 1){
      const itemlist = this.data.itemlist1
      this.setData({ 
        userpermissions: userpermissions,
        itemlist: itemlist,
        isMask: false
      })
    }
  },

  // 跳转至创建项目页面
  createItem: function () {
    wx.navigateTo({
      url: './createitem/selectitem/selectitem',
    })
  },

  cantClick: function () {
    wx.showModal({
      title: '提示',
      content: '暂无法创建项目，如有需求请和管理员联系',
      showCancel: false,
    })
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
    let i = this.data.itemlist[index].status;
    let projectId = this.data.itemlist[index].projectId;
    wx.setStorage({
      key:"projectlist",
      data:list
    })
    if(this.data.userpermissions === 0){
      wx.navigateTo({
        url: './details/details?Transition=' + i + '&projectId=' + projectId,
      })
    }else{
      if(this.data.btnselect == 0){
        wx.navigateTo({
          url: './users/consult/consult'
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
    var itemlist = null
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

  //加载储备项目数据(普通用户)
  getReserveItem: function () {
    let userMessage = app.globalData.userMessage
    let pageNo = this.data.pageNo
    let that = this
    if(pageNo > this.data.pagemax){
      return;
    }
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: httpHead + 'api/elnProject.action?m=getMyPage',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      data: {
        coopCode : 'chengde',
        frontUserId : userMessage.frontUser.frontUserId, 
        accessToken : userMessage.accessToken,
        pageNo : that.data.pageNo,
        pageSize : 5
      },
      method: 'post',
      success: res => {
        isNums = res.data.data.total
        if(res.data.msg === 'success'){
          let itemlist = res.data.data.list;
          pageNo++
          //处理时间戳,划分数据
          for(let i in itemlist){
            let arr = itemlist[i].createTime;
            let date = new Date(arr);
            itemlist[i].createTime = util.timeFormat(date)
          }
          //合并数组
          let itemlistcopy = that.data.itemlist.concat(itemlist)
          this.setData({
            itemlist: itemlistcopy,
            itemlist1: itemlistcopy,
            pageNo,
            pagemax:  res.data.data.total,
            isMask: false
          })
          wx.hideLoading();
        }
      }
    })
  },

  //加载储备项目数据(审核用户)
  getReserveItemAudit: function () {
    let userMessage = app.globalData.userMessage
    let pageNo = this.data.pageNo
    let that = this
    if(pageNo > this.data.pagemax){
      return;
    }
    if(pageNo == 1){
      //只有进入第一次有加载图标，后续改为静默加载
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
    }
    wx.request({
      url: httpHead + 'api/elnProject.action?m=getMyMgrProjectAll',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      data: {
        coopCode : 'chengde',
        frontUserId : userMessage.frontUser.frontUserId, 
        accessToken : userMessage.accessToken,
        pageNo : that.data.pageNo,
        pageSize : that.data.pagesum
      },
      method: 'post',
      success: res => {
        //console.log(res)
        isNums = res.data.data.total
        if(res.data.msg === 'success'){
          let itemlist = res.data.data.list;
          let itemlist1 = [];
          let itemlist2 = [];
          pageNo++
          console.log(itemlist)
          //处理时间戳,划分数据
          for(let i in itemlist){
            let arr = itemlist[i].createTime;
            let date = new Date(arr);
            itemlist[i].createTime = util.timeFormat(date)
            //通过字段划分为两组数据
            if(itemlist[i].isEvaluate === 'N'){
              itemlist1.push(itemlist[i])
            }else{
              itemlist2.push(itemlist[i])
            }
          }
          //合并数组
          let itemlistcopy = []
          let itemlistcopy1 = that.data.itemlist1.concat(itemlist1)
          let itemlistcopy2 = that.data.itemlist2.concat(itemlist2)
          // console.log(itemlist1)
          // console.log(itemlistcopy1)
          if(that.data.btnselect == 0){
            itemlistcopy = itemlistcopy1
          }else{
            itemlistcopy = itemlistcopy2
          }
          
          this.setData({
            itemlist: itemlistcopy,
            itemlist1: itemlistcopy1,
            itemlist2: itemlistcopy2,
            pageNo,
            pagemax:  res.data.data.total,
            isMask: false
          })
          wx.hideLoading();
        }
      }
    })

  },

  //获取创建按钮当前状态
  getElnSetingType: function() {
    wx.request({
      url: httpHead + 'api/elnSetting.action?m=getDetail',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      data: {
        coopCode : 'chengde',
      },
      success: res => {
        if(res.data.ret == '0'){
          this.setData({elnSetting: res.data.data.elnSetting.isAllowCreatProject})
        }
      }
    })
  }

})