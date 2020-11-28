// pages/home/home.jsjs
let {  getMyClass, getHomeMes, fileHttp } = require("../../network/home")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 定义轮播图数据
    bannerImg: [],
    // 定义小圆点颜色
    indicator: "#fff",
    // 定义小圆点激活颜色
    indicatorActive: "#00BE95",
    // 定义四个图标与文字内容
    listBarMes: [
      {
        img: "../../../assets/img/list-bar-icon/xqdc.png",
        title: "需求调查"
      },{
        img: "../../../assets/img/list-bar-icon/tjxm.png",
        title: "创建项目"
      },{
        img: "../../../assets/img/list-bar-icon/pxbm.png",
        title: "培训报名"
      },{
        img: "../../../assets/img/list-bar-icon/wdpxb.png",
        title: "我的培训班"
      }
    ],
    /**
     * 定义我的项目板块数据
     *  title: 为名称
     *  synopsis 为数据
     *  mesTitle： 为数据标题
     *  status: 为当前状态
     *   0 为审核已经通过
     *   1 为审核未通过
     *   2 为审核正在进行
     */
    project: {
      title: "我的项目",
      synopsis: []
    },
    training: {
      title: "我的培训班",
      synopsis: []
    },
    // 定义是否遮罩
    isMask: true,
    // 我的培训班个数
    totalCount: 0,
    // 我的项目个数
    totalCountP: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    let that = this
    // 重复调用、已达到接口有数据
    let timers = await setInterval(async () => {
      let app = getApp()
      let usermessage = app.globalData.userMessage
      if(usermessage === null){
        return
      }else{
        // 如果有数据
        clearInterval(timers)
        //判断用户是否绑定注册
        if(usermessage.frontUser.isVisitor === 'Y'){
          wx.reLaunch({
            url: '../common_pages/login/login',
          })
          return;
        }
        // 获取首页数据
        let homeMes = await getHomeMes()
        if(homeMes.data.ret === '-1'){
          wx.showToast({
            title: '操作有误',
            image: '/assets/img/error/woring.png'
          })
          return
        }
        // 将配置信息存储于缓存中
        console.log(homeMes)
        wx.setStorageSync('elnSetting', homeMes.data.data.elnSetting)
        // 查看我的培训班
        
        // 获取我的培训班
        // let  mes = await getMyClass(usermessage)
        // 轮播图数据
        let bannerList = []
        for(let i of homeMes.data.data.adAdvertList){
          bannerList.push(fileHttp + i.advertUrl)
        }

        // 处理我的培训班
        let obj = this.data.training
        obj.synopsis = homeMes.data.data.elnClassUserList

        // 处理我的项目
        let myObj = this.data.project
        myObj.synopsis = homeMes.data.data.elnProjectList

        this.setData({
          training: obj,
          project: myObj,
          bannerImg: bannerList,
          isMask: false,
          totalCount: homeMes.data.data.totalCount,
          totalCountP: homeMes.data.data.totalCountP
        })
        // 关闭加载
        wx.hideLoading()
        // 关闭下拉
        wx.stopPullDownRefresh()
        //console.clear()
      }
    }, 120) 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {

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
   * 用户点击下拉刷新
   */
   onPullDownRefresh(){
     this.onLoad()
  },



  // 自定义方法----------------------------
  // 获取用户点击的是哪一个按钮
  listBarClick(e){
    const mes = e.detail
    let i = mes.index
    let t = mes.title
    if(i === 0){
      wx.navigateTo({
        url: '/pages/demand/demand',
      })
    }else if(i === 1){
      // wx.navigateTo({
      //   url: '/pages/reserveitem/createitem/selectitem/selectitem',
      // })      
      wx.switchTab({
        url: '/pages/reserveitem/reserveitem',
      })     
    }else if(i === 2){
      wx.navigateTo({
        url: '/pages/trainingregister/trainingregister',
      })      
    }else if(i === 3){
      wx.switchTab({
        url: '/pages/trainingclass/trainingclass',
      })      
    }
  },
  // 用户点击了我的项目的更多选项
  projectClick(){
    wx.switchTab({
      url: "/pages/reserveitem/reserveitem"
    })
  },
  // 用户点击我的培训班的更多选项
  trainingClick(){
    wx.switchTab({
      url: "/pages/trainingclass/trainingclass"
    })
  }
})