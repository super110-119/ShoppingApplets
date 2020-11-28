// pages/mDetail/mDetail.js
let yy, mm;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    detailArr: [
      {
        title: '张三的礼物',
        time: new Date().getTime(),
        money: '123.00',
        state: 'A',
        balance: '5201314.00'
      },{
        title: '李四的礼物',
        time: new Date().getTime(),
        money: '456.00',
        state: 'A',
        balance: '5201191.00'
      },{
        title: '张三的提现',
        time: new Date().getTime(),
        money: '456.00',
        state: 'A',
        balance: '5201191.00'
      },{
        title: '张三的提现',
        time: new Date().getTime(),
        money: '456.00',
        state: 'A',
        balance: '5201191.00'
      },{
        title: '张三的提现',
        time: new Date().getTime(),
        money: '456.00',
        state: 'B',
        balance: '5201191.00'
      },{
        title: '张三的提现',
        time: new Date().getTime(),
        money: '456.00',
        state: 'B',
        balance: '5201191.00'
      },{
        title: '李四的礼物',
        time: new Date().getTime(),
        money: '456.00',
        state: 'B',
        balance: '5201191.00'
      },{
        title: '张三的提现',
        time: new Date().getTime(),
        money: '456.00',
        state: 'B',
        balance: '5201191.00'
      },{
        title: '张三的提现',
        time: new Date().getTime(),
        money: '456.00',
        state: 'B',
        balance: '5201191.00'
      },{
        title: '张三的提现',
        time: new Date().getTime(),
        money: '456.00',
        state: 'B',
        balance: '5201191.00'
      },{
        title: '张三的提现',
        time: new Date().getTime(),
        money: '456.00',
        state: 'B',
        balance: '5201191.00'
      }
    ],
    thisDate: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var obj = new Date();
    var y = obj.getFullYear();
    var m = obj.getMonth() + 1;
    m = m >= 10 ? m : '0' + m;
    yy = y;
    mm = m;
    var nowDate = `${y}-${m}`;
    this.setData({
      thisDate: nowDate
    })
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
  // **** 自定义方法 ***********
  valueChange(e){
    // console.log(e);
    var dates = e.detail.value;
    let arrs = dates.split('-');
    let y1 = parseInt(arrs[0])
    let m1 = parseInt(arrs[1])
        mm = parseInt(mm);
    if(y1 > yy){
      this.modalShow('年份未到、无法获取！')
      return  
    }else if(y1 === yy){
      if(m1 > mm){
        this.modalShow('月份未到、无法获取！')
        return
      }
    }
    this.setData({
      thisDate: dates
    })
  },
  modalShow(title = "暂无"){
    wx.showModal({
      title: '提示',
      content: title,
      showCancel: false
    })
  }
})