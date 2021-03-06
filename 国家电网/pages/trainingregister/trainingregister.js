// pages/trainingregister/trainingregister.js
let {getHomeMes, demo} = require("../../network/trainingclass")
let {timeFormat} = require("../../utils/getTime")

let pages = 1
let totals = 0
let arrs = []

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    array2: ["人力资源部","工程技术部"],
    dateyear: '年',
    datemonth: '月',
    department: '举办部门' ,
    //trainstate:课程报名状态 0报名中 1报名截止  trainre：用户报名状态 1已报名 0未报名
    traininglist: [],
    // 存储课程ｉｄ
    classId: [],
    // 定义是否遮罩
    isMask: true,
    arrList: []
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
      
    // 获取培训班全部数据
    let datas = await getHomeMes(pages);

    let list = datas.data.data.list;
    totals = datas.data.data.total || totals
    //arrs.push(...list)
    this.data.arrList.push(...list)
    let timestamp = (new Date()).getTime();
    
    let arr = []
    let classIdList = []
    // 重新定义数据
    for(let i of this.data.arrList){
      // 获取课程id
      classIdList.push(i.classId)
      let obj = {}
      // 现在状态报名中或已截止
      obj.trainstate = i.endTime > timestamp ? 0 : 1
      // 报名时间
      obj.trainre = i.classPhase || '暂无'
      // 最大人数
      obj.trainnum = i.maxNum || '暂无'
      // 创造的年份/月份
      obj.trainyear = timeFormat(i.beginTime, 'yyyy') || '暂无'
      obj.trainmonth = timeFormat(i.beginTime, 'mm') || '暂无'
      // 培训班名称
      obj.traintitle = i.className || '暂无'
      // 教师名称
      obj.trainteacher = i.masterTeacherName || '暂无'
      // 部门名称
      obj.trainpartment = i.orgName || '暂无'
      // 现在人数
      obj.trainrenum = i.curNum || '0'
      // 开始时间
      obj.trainstartime = timeFormat(i.beginTime, 'yyyy/mm/dd') || '暂无'
      // 结束时间
      obj.trainendtime = timeFormat(i.endTime, 'yyyy/mm/dd') || '暂无'
      // obj.traintime = timeFormat(i.beginTime, 'hh:ii:ss') + '~' + timeFormat(i.endTime, 'hh:ii:ss') || '暂无'
      obj.traintime = timeFormat(i.beginTime, 'yyyy/mm/dd') + '~' + timeFormat(i.endTime, 'yyyy/mm/dd') || '暂无'
      // 地点
      obj.trainplace = i.address  || '暂无'
      arr.push(obj)
    }
    // 重新赋值
    this.setData({
      traininglist: arr,
      classList: list,
      classId: classIdList,
      isMask: false
    })
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
    pages = 1
    totals = 0
    //arrs = []
    this.data.arrList = [];
    this.onLoad();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    pages++
    if(pages > totals){
      return
    }
    this.onLoad()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //年选择器
  bindYearChange: function(e) {
    this.setData({
      dateyear: e.detail.value + '年'
    })
  },

  //月选择器
  bindMonthChange: function(e) {
    const month = parseInt(e.detail.value) + 1
    this.setData({
      datemonth: month + '月'
    })
  },

  //部门选择器
  bindDepartmentChange: function(e) {
    const departmentnum = parseInt(e.detail.value);
    const list = this.data.array2;
    this.setData({
      department: list[departmentnum]
    })
  },

  // 跳转至详情页
  trainingDetails: function (e) {
    let i = e.currentTarget.dataset.index;
    if(this.data.traininglist[i].trainstate){
      wx.showToast({
        title: '报名已截止',
        image: '/assets/img/error/woring.png',
        mask: true
      })
    }else{
      wx.navigateTo({
        url: './trainingdetails/trainingdetails?classid='+ this.data.classId[i],
      }) 
    }
  },

  //简易搜索
  clickSearch: function () {
    let list = this.data.traininglist2
    let year = this.data.dateyear.substring(0,this.data.dateyear.length-1) || 0
    let month = this.data.datemonth.substring(0,this.data.datemonth.length-1) || 0

    //临时列表
    let arr = []
    let arr2 = []

    if(year !== 0){
      for (let i in list) {
        if (list[i].trainyear == year) {
          arr.push(list[i])
        }
      }
    }else{
      arr = list
    }

    if(month !== 0){
      for (let j in arr) {
        if (arr[j].trainmonth == month) {
          arr2.push(list[j])
        }
      }
    }else{
      arr2 = arr
    }

    this.setData({ traininglist: arr2 })
  }
})