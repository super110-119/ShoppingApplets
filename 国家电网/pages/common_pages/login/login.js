// pages/common_pages/login/login.js
let {ajax, httpHead2} = require("../../../network/index")
let {CusBASE64} = require("../../../utils/base64")

let {getUserMes} = require("../../../method/userMsg")

let app = getApp()
let code;
let msg = {}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: 0,
    userName: '',
    isBind: false,
    isNotClick: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.isError && app.globalData.isError.ret === "-1" && app.globalData.isError.err_code === "102"){
      this.setData({
        isNotClick: false
      })
    }
    wx.login({
      success(res){
        code = res.code
      },
      fail(err){
        console.log(err);
        wx.showModal({
          title: "提示",
          content: "获取用户code码失败、请联系管理员！！！",
          showCancel: false
        })
      }
    })
    let messs = app.globalData.userMessage
    if(messs){
      let msgss = messs.frontUser.isVisitor
      if(msgss === "Y"){
        this.setData({
          isBind: !this.data.isBind
        })
      }
    }
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
    wx.hideHomeButton()
    // this.onLoad()
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
   * 自定义方法
   */
  // 用户点击绑定按钮-----
  userClick: function(){
    
    // ----------------
    let that = this
    let datas = this.data
    // 点击绑定按钮查看是否登录------------
    // 非空监测
    if(!datas.userId && !datas.userName){
      // 没有全部写入，返回提示--------------
      wx.showModal({
        title: '提示',
        content: "请将内容填写完整！",
        showCancel: false,
        confirmText: "我知道了"
      })
      return
    }

    // 正则判断身份证格式是否正确
    let str = /(^\d{15}$)|(^\d{17}(\d|X|x)$)/
    // 如果格式不正确
    if(!str.test(datas.userId)){
      wx.showModal({
        title: '提示',
        content: "请输入正确的身份证号",
        showCancel: false,
        confirmText: "我知道了"
      })
      return
    }
   
    // 返回用户信息对象
    // let obj = msg.frontUser
    let obj = {}
    obj.username = that.data.userName
    obj.userid = that.data.userId
    const _this = this
    // 进行员工信息绑定
    ajax({
      /* // url: httpHead2 + 'api/frontUser.action?m=bindUserByWorkId', */
      // url: 'http://192.168.1.12:8280/api/frontUser.action?m=bindUserByIdCardNo',
      url: httpHead2 + 'api/frontUser.action?m=bindUserByIdCardNo',
      data: {
        coopCode: 'chengde',
        idCardNo: that.data.userId,
        realName: that.data.userName,
        openid: app.globalData.userMessage.frontUser.openid
      }
    }).then(res => {
      console.log(res);
      
      if(res.data.ret == '-1'){
        wx.showModal({
          title: '提示',
          content: res.data.msg,
          showCancel: false,
          confirmText: "我知道了"
        })
      }else{
        // app.globalData.userMessage = mes
        wx.showToast({
          title: '登录成功',
          mask: true,
          success: async function(){
            getUserMes(app, function(){
              wx.switchTab({
                url: '/pages/home/home'
              })  
            })
          }
        })
      }
    })
  },

  // 获取用户信息
  userInfo(e){
    let userMes = e.detail.userInfo
    if(userMes){
      let data = JSON.stringify(userMes)
        // console.log(data)
        ajax({
          url: httpHead2 + "api/weixinOauthWxapp.action?m=register",
          data: {
            coopCode: 'chengde',
            appCode: 'chengde',
            code,
            userinfoJson: CusBASE64.encoder(data)
          }
        }).then(res => {
          console.log(res);
          msg = res.data.data
          getUserMes(app)
          this.setData({
            isBind: true
          })
        }).catch(err => {
          console.log(err);
          wx.showModal({
            title: "提示",
            content: "用户绑定失败、请联系管理员！！！",
            showCancel: false
          })
        })
    }else{
      wx.showModal({
        title: '警告',
        content: '您已拒绝授权，将无法进行后续操作，请允许授权！',
        showCancel: false,
        confirmText: '我知道了'
      })
    }
  },

  // 获取用户编号-----
  userId(e){
    let value = e.detail.value
    value = value.trim()
    this.setData({
      userId: value
    })
  },
  // 获取用户姓名---- 
  userName(e){
    let value = e.detail.value
    value = value.trim()
    this.setData({
      userName: value
    })
  }
})