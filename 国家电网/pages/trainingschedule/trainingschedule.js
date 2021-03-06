// pages/trainingschedule/trainingschedule.js
//var qrcode = require('../../utils/weapp.qrcode.min.js')
var { getClassMes, getFilePath } = require('../../network/trainingclass')
var {getHeaderMag, getClassList, getExamList, getClassSignAll, getEvaluateList} = require("../../method/getClassList")
var {getSignIn, getClassEvaluate} = require('../../network/signIn')
var {toSign} = require("../../network/signIn")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    //切换项目
    btnselect: 0,
    showOneButtonDialog: false,
    showDownDialog: false,
    oneButton: [{text: '关闭'}],
    // state : 0 - 进行中/ 1 - 未开始/ 2 - 已结束
    // 考试信息------
    mes1: [],
    // 评估信息------ 
    mes2: [],
    // 课表信息------
    mes3 :[],
    // 签到信息--------
    mes4: [],
    // 标题部分
    headers: {},
    // 定义是否遮罩
    isMask: true,
    //下载文件列表
    downFileList: []
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 加载动画
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    // 获取与重定义header内数据
    let classId = options.classId;
    let mes = await getClassMes(classId)
    // 获取班级信息
    let classMes = getHeaderMag(mes)
    // 获取课表数据
    let classList = getClassList(mes)
    // 获取考试数据
    let examList = getExamList(mes)
    // 获取签到信息
    let signAll = await getSignIn(classId)
    let signMsg = getClassSignAll(signAll)
    // 获取评估信息
    let classEva = await getClassEvaluate(classId)
    let EvaluateMsg = getEvaluateList(classEva)
    
    this.setData({
      headers: classMes,
      mes3: classList,
      mes1: examList,
      mes4: signMsg,
      mes2: EvaluateMsg,
      isMask: false
    })
    // 关闭加载
    wx.hideLoading()
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

  //标签切换
  changeSelect: function (e) {
    const selectnum = e.currentTarget.dataset['index'];
    this.setData({ 
      btnselect: selectnum
    })
  },

  //二维码生成以及weui弹窗
  downQrcode: async function () {
    let classId = this.data.headers.classId;
    let obj=new Object();
    let key,value = '';
    wx.showLoading({
      title: '签到中',
    })
    wx.scanCode({
      onlyFromCamera: true,
      success: res => {
        let arrPara = res.result.split('?')[1].split('&')
        let arr = []
        for (let i in arrPara) {
          arr = arrPara[i].split("=");
          key = arr[0]
          value = arr[1]
          obj[key] = value;
        }
        // 获取我的培训班数据
        toSign(classId,obj.id).then(function (res) { 
          wx.hideLoading();
          if(res.data.ret == '0'){
            wx.showToast({
              title: '签到成功'
            })
          }else{
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
          }
        });
      },
      fail: res => {
        wx.showToast({
          title: '扫码失败',
          icon: 'none'
        })
      }
    })

    // qrcode({
    //   width: 200,
    //   height: 200,
    //   canvasId: 'myQrcode',
    //   text: 'https://b.51eln.com?m=saveClassSign&coopCode=chengde&accessToken=c3bb6a25f41c429f942777699f3a5107&frontUserId=23e75ef4d00a452cb52a2818c2b9f254&signId=aae09d2bd8054578a0a97b200feba3f4'
    // })
    // this.setData({
    //   showOneButtonDialog: true
    // })
  },

  tapDialogButton: function () {
    this.setData({
      showOneButtonDialog: false
    })
  },

  tapDialogDown: function () {
    this.setData({
      showDownDialog: false
    })
  },

  //防止滑动事件
  noneEnoughPeople: function () {

  },

  //列表展示切换
  listChange: function (e) {
    const selectnum = e.currentTarget.dataset['index'];
    const list = this.data.mes3
    if(list[selectnum].open === true){
      list[selectnum].open = !list[selectnum].open
    }else{
      list[selectnum].open = true
    }
    this.setData({
      mes3: list
    })
  },

  // 跳转考试详情
  examClick(e){
    let i = e.currentTarget.dataset.index;
    if(this.data.mes1[i].state === 1){
      wx.showToast({
        title: '考试未开始',
        mask: true,
        image: '/assets/img/error/woring.png'
      })
    }else if(this.data.mes1[i].state === 0){
      if(this.data.mes1[i].cuccess){
        wx.navigateTo({
          url: '/pages/common_pages/examination/examination?examId=' + this.data.mes1[i].examId,
        })
      }else{
        wx.showToast({
          title: '您已完成',
          mask: true
        })
      }
    }else{
      wx.showToast({
        title: '考试已结束',
        mask: true,
        image: '/assets/img/error/woring.png'
      })
    }
  },

  // 跳转评估详情
  assessClick(e){
    let i = e.currentTarget.dataset.index;
    if(this.data.mes2[i].state === 1){
      wx.showToast({
        title: '评估未开始',
        mask: true,
        image: '/assets/img/error/woring.png'
      })
    }else if(this.data.mes2[i].state === 0){
      if(this.data.mes2[i].cuccess){
        wx.navigateTo({
          url: '/pages/common_pages/demand/demand?evaluateId=' + this.data.mes2[i].evaluateId + "&projectId=" + this.data.mes2[i].projectId,
        })
      }else{
        wx.showToast({
          title: '您已完成',
          mask: true
        })
      }
    }else{
      wx.showToast({
        title: '评估已结束',
        mask: true,
        image: '/assets/img/error/woring.png'
      })
    }
  },

  //下载文件
  downFile: async function (res) {
    let resourceId = res.target.dataset.index;
    let mes = await getFilePath(resourceId);
    let downFileList = []
    // console.log(mes)
    if(mes.data.msg === "success"){
      //附件可能有多个
      for(let index in mes.data.data.commonAttachmentList){
        let filePath = 'https://file.51eln.com'+ mes.data.data.commonAttachmentList[index].filePath
        downFileList.push({fileOriginalName: mes.data.data.commonAttachmentList[index].fileOriginalName, filePath})
        //下载，通过微信
        // wx.showLoading({
        //   title: '下载中',
        // })
        // wx.downloadFile({
        //   url: 'http://file.51eln.com'+filePath,
        //   success: res => {
        //     wx.saveFile({
        //       tempFilePath: res.tempFilePath,
        //       success: res => {
        //         const savedFilePath = res.savedFilePath;
        //         wx.hideLoading()
        //         wx.openDocument({filePath: savedFilePath});
        //       }
        //     })
        //   }
        // })
      }
    }
    this.setData({
      downFileList,
      showDownDialog: true
    })
  },

  //下载，通过浏览器
  copyFilePath: function (res) {
    console.log(res.target.dataset.index)
    wx.showLoading({
      title: '打开中',
    })
    wx.downloadFile({
      url: res.target.dataset.index,
      success: function (res) {
        wx.hideLoading()
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      }
    })
    //wx.openDocument({filePath: res.target.dataset.index});
    // wx.setClipboardData({
    //   data: res.target.dataset.index
    // })
  }
})