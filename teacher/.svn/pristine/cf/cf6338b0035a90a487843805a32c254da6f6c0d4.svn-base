// pages/earnings/earnings.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 定义用户零钱
    num: '199.99'
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
   * 自定义方法---------------------------
   */
  moneyOut(){
    let msg = parseFloat(this.data.num);
    if(msg >= 200){
      // console.log('金额大于提现收益！！');
      wx.showToast({
        title: '提现成功！',
        mask: true
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '金额满200.00元才能提现！',
        showCancel: false,
        confirmText: '我知道了'
      })
    }
  },
  moneyIn(){
    wx.navigateTo({
      url: '/pages/mDetail/mDetail',
    })
  }
})