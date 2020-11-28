// pages/profile/profile.js
var app = getApp()
let { getMyMsg, outLogin } = require("../../network/home")
let { getUserMes } = require("../../method/userMsg")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 员工信息数据
    userMes: {
      img: "../../../../assets/img/profile/user.jpg",
      name: "未登录",
      company: "国网承德供电公司",
      userId: 0
    },
    isLoad: false,
    myNums: {},
    isMask: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    let msg = await getMyMsg();
    let datas = msg.data.data
    let obj = {}
    obj.classTotalCount = datas.classTotalCount
    obj.projectTotalCount = datas.projectTotalCount
    obj.mgrProjectCount = datas.mgrProjectCount
    obj.isOpenWxmsg = datas.frontUser.isOpenWxmsg
    this.setData({myNums: obj, isMask:false})
    // 关闭加载
    wx.hideLoading()
    // 关闭下拉
    wx.stopPullDownRefresh()
    // 清空打印台
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
    this.checkUserMsg()
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
   * 用户点击下拉刷新
   */
   onPullDownRefresh(){
     //this.checkUserMsg()
     this.onLoad()
  },

  //查询用户信息
  checkUserMsg: function() {
    let mes = app.globalData.userMessage
    if(mes === null ){
        return
    } 
    //let data = app.globalData
    let obj = this.data.userMes
    obj.img = mes.frontUser.headimgurl
    obj.name = mes.frontUser.realName || '加载中...'
    obj.userId = mes.frontUser.workId || '000'

    if(mes.frontUser.roleCode !== undefined && mes.frontUser.roleCode.length > 0){
      // console.log(mes.frontUser)
      const roleCode = mes.frontUser.roleCode.split(',')
      //A为县级审核员，B为市级审核员，c为专家
      const a = roleCode.indexOf('A')
      const b = roleCode.indexOf('B')
      const c = roleCode.indexOf('C')
      if(a+b+c != -3){
        obj.role = 1
      }else{
        obj.role = 0
      }
    }else{
      obj.role = 0
    }

    this.setData({
      userMes: obj,
      isLoad: true
    })
    // 关闭下拉
    wx.stopPullDownRefresh()
  },

  // 退出登录
  outLogin(){
    wx.showModal({
      title: "提示",
      content: "您确定要退出登录吗？",
      success: async function(res) {
        if (res.confirm) {
          let mes = await outLogin();
          if(mes.data.ret === "0"){
            wx.showToast({
              title: '退出成功！',
            }) 
            getUserMes(app)
            /* wx.reLaunch({
              url: '../common_pages/login/login',
            }) */
          }else{ 
            wx.showModal({
              title: "提示",
              content: "退出登录失败，请联系管理员！",
              showCancel: false,
              confirmText:　"我知道了"
            })
          }
        }
      }
    })
  }
})