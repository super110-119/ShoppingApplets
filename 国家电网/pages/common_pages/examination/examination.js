// pages/common_pages/examination/examination.js
let { getExamUserDetaiL, getExamUserDetails } = require("../../../network/class")
// 存储用户答案信息
let examMes = []

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 自定义信息
    message:{
      data:  [
/*         {
          title: "您所在的单位是？",
          problem: [
            "机关部室",
            "直属单位",
            "县公司"
          ]
        },{
          title: "请写下您对培训工作的建议或需求。"
        } */
      ],
      titles: "党建考试",
      outTime: 1
    },
    // 分秒
    mm: 0,
    ss: "59",
    // 所做题目数量
    num: 0,
    // 是否已经完成
    isShow: false,
    // 考试题目 id
    examId: '',
    // id
    detailId: '',
    // 定义是否遮罩
    isMask: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    // 加载动画
    wx.showLoading({
      title: '加载中...',
      mask: true
    }) 

    // 获取考试 id
    let examId = options.examId
    // 通过考试 id 获取考试信息
    let examMes = await getExamUserDetaiL(examId)
    let datas = examMes.data.data;
    
    let detailId = datas.examUserDetail.detailId
    let titles = datas.examInfo.examTitle || "暂无"
    let outTime = datas.examInfo.duration || 60
    let data = datas.examItemList
    let message = { titles, outTime, data }
    this.setData({ 
      message, examId, detailId
    })
    
// 考试倒计时-------------------
    let toFext = mes => mes > 9 ? mes : '0' + mes
    let that = this
    // 1、获取时间
    let mm = this.data.message.outTime
    // 2、修改时间
    this.setData({
      mm: toFext(mm),
      ss: '00',
      isMask: false
    })
    // 3、设置计时器开始倒计时(分钟)
    let timerM = setTimeout(() => {
      // 获取当前分钟时间
      let m = this.data.mm
      m = parseInt(m)
      m -= 1
      // 如果还有时间
      if(m > -1){
        this.setData({
          mm: toFext(m)
        })
      }else{
        // 没有时间了
        noTime()
      }
    }, 60000)
    // 3.1、 设置倒计时(秒钟)
    let timer = setInterval(() => {
      // 进入计时器
      let s = this.data.ss;
      s = parseInt(s);
      s -= 1;
      s = s < 0 ? 59 : toFext(s)
      this.setData({
        ss: s
      })
    }, 1000)
    // 3.2、设置倒计时(分)
    setTimeout(() => {
      let mm = this.data.mm
      mm -= 1
      mm > -1 ? mm : noTime()
      this.setData({
        mm: toFext(mm)
      })
    }, 1000)
    // 4、设置时间结束执行的函数
    function noTime(){
      clearInterval(timer);
      clearTimeout(timerM);
      that.setData({
        mm: '00',
        ss: '00'
      })
      console.log(11111);
    }
// 考试倒计时-------------------

    // 关闭加载
    wx.hideLoading()
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
   * 自定义方法----------------------------------
   * 
   */
  examGetMes(e){
    let obj = e.detail;
    for(let item of examMes){
      if(item.index === obj.index){
        item.answer = obj.answer;
        return
      }
    }
    examMes.push(obj)
    this.setData({
      num: examMes.length
    })
    
  },


  btnClick: async function(){
    let that = this.data
    let n1 = this.data.num;
    let n2 = this.data.message.data.length;
    n1 = parseInt(n1)
    n2 = parseInt(n2)
    if(n1 === n2){
      let userAnswerJson = {
        examItemList: examMes
      }
      let mes = await getExamUserDetails(that.examId, that.detailId, userAnswerJson);
      console.log(mes);
      if(mes.data.ret === '0'){
        let demo = this.data.isShow;
        this.setData({
          isShow: !demo
        }) 
      }else{
        wx.showToast({
          title: '操作异常！！！',
          image: '/assets/img/error/woring.png',
          mask: true
        })
      }
    }else{
      let n = n2 - n1;
      wx.showModal({
        title: "您还有" + n + "题没有答完",
        content: "答完才能交卷！！！",
        showCancel: false
      })
    }
  },
  btnsClick(){
    wx.navigateBack({
      delta: 2,
    })
  }
})