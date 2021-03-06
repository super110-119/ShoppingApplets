//引入代码
var call = require("../../utils/request.js")

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    frontUser : null,
    defaultimgurl: 'http://file.51eln.com/uploads/gongjiang/resource/elnTeacher/c4bf03eed7024630b02dedd7f1b4e30f.jpg',
    teacherInfo : null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //加载初始数据
    var userinfo = app.globalData.userInfo;
    //查询问答列表
    let data = {
      teacherId: userinfo.frontUser.teacherId,
    }
    //console.log(userinfo.frontUser.teacherId)
    call.request('mycenter.action?m=getByCloud', true, data, this.getByCloud)
    this.setData({frontUser : userinfo.frontUser})
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

  /* --- 自定义方法 --- */
  // 点击我的收益
  myEarnings(){
    wx.navigateTo({
      url: "/pages/earnings/earnings"
    })
  },
  // 点击我的课程
  myClass(){
    wx.navigateTo({
      url: '/pages/myClass/index/index',
    })
  },
  // 点击登录
  clickToLogin: function () {
    /* wx.showModal({
      title: '提示',
      content: '是否解除绑定？',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          call.request('frontUser.action?m=unbindWeixin', true, {}, res => {
            console.log("解除绑定成功！");
            console.log(res);
            
          })
        }
      }
    }) */
    wx.navigateTo({
      url: '../login/login',
    })
  },

  mySetting: function () {
    wx.navigateTo({
      url: '../setting/setting',
    })  
  },

  getByCloud: function (data) {
    console.log(data)
    if(data.ret == '0'){
      this.setData({teacherInfo: data.data})
    }else{
      console.log('接口回执异常')
    }
  }
})