// pages/common_pages/demand/demand.js
let { getEvaluateInfo, getEvaluateProject } = require("../../../network/class")
let { getGrade } = require("../../../method/getEvaluate")
let projectId = ''
let mesArr = []
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 自定义信息
    message:{
      data:  [{
          title: "理论知识水平",
          problem: [
            "非常满意",
            "满意",
            "基本满意",
            "不满意"
          ]
        }],
      titles: "课程评估"
    },
    // 所做题目数量
    num: 0,
    // 所选择的答案
    userAnswer: [],
    // 是否已经完成
    isShow: false,
    // evaluateId
    evaluateId: '',
    // projectId
    projectId: '',
    // 定义是否遮罩
    isMask: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    // 获取评估 id
    let evaluateId = options.evaluateId
    // 获取 projectId
    let projectId = options.projectId
    // 获取试题信息
    let mes = await getEvaluateInfo(evaluateId)
    // 获取试题标题
    let titles = mes.data.data.evaluateInfo.evaluateTitle
    // 获取试题数据
    let data = mes.data.data.evaluateSubjectList
    // 存至对象
    let obj = {titles, data}
    // 修改数据
    this.setData({
      message: obj,
      evaluateId,
      projectId,
      isMask: false
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
    mesArr = []
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
  // 用户传输答案的
  questionMessage(e){
    mesArr = e.detail.mes;
    
  },
  // 点击提交按钮
  btnClick:async function(){
    let projectId = this.data.projectId
    // 获取用户已做题数
    let n1 = mesArr.length;
    // 获取总题数
    let n2 = this.data.message.data.length;
    // 格式化数字
    n1 = parseInt(n1)
    n2 = parseInt(n2)
    // 获取用户题目 itemList 与 voteSubjectList
    let userAnswerJson = {}
    userAnswerJson.itemList = mesArr
    userAnswerJson.evaluateSubjectList = mesArr
    
    // 如果做完
    if(n1 === n2){
      let demo = this.data.isShow;
      let message = await getEvaluateProject(projectId, userAnswerJson);
      console.log(message);
      if(message.data.ret === '0'){
        this.setData({
          isShow: !demo
        }) 
      }else{
        wx.showModal({
          title: '提示',
          content: message.data.msg,
          showCancel: false
        })
      }
    }else{
      // 如果没有做完就提示用户昨晚
      let n = n2 - n1;
      wx.showModal({
        title: "您还有" + n + "题没有答完",
        content: "答完才能交卷！！！",
        showCancel: false
      })
    }
  },
  // 点击返回按钮
  btnsClick(){
    wx.navigateBack({
      delta: 2,
    })
  }
})