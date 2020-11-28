// pages/reserveitem/users/scoreFrist/scoreFrist.js
let app = getApp()
let httpHead = app.globalData.httpHead2

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow1: false,
    isShow2: true,
    details: [],
    subject: [],
    questionList: [],
    textareamsg: null,
    // 定义是否遮罩
    isMask: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getEvaluating();
    let that = this;

    wx.getStorage({
      key: 'projectlist',
      success (res){
        let a = res.data;
        console.log(a)
        let details = [{title:'项目名称',value:a.projectTitle},{title:'单位名称',value:a.orgName,},{title:'项目所属单位',value:a.belongOrgName},{title:'项目分类',value: a.typeName || '暂无'},{title:'实施范围',value:a.rangeOrgName},{title:'项目必要性',value:a.trainingGoal || '暂无'},{title:'项目主要内容',value:a.projectSummary},{title:'主办部门',value:a.masterOrgName},{title: "承办单位",value: a.actionOrgName},{title: "总费用(预算)",value: a.budgetMoneyTotal},{title: "经费来源",value: a.moneySource},{title: "费用类型",value: a.moneyType || '暂无'},{title: "责任人",value: a.masterName},{title: "联系人",value: a.contactName=='null'?'暂无':a.contactName},{title: "备注",value: a.memo=='null'?'暂无':a.memo},{title: "自评分", value: a.selfEvaluateScore} ]
        that.setData({details, isMask:false})
      }
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
  
  /**
   * 
   * 自定义方法--------------------------
   */
  xmxqClick(){
    let newShow = !this.data.isShow1
    this.setData({
      isShow1: newShow,
      isShow2: false
    })
  },
  xmpfClick(){
    let newShow = !this.data.isShow2
    this.setData({
      isShow2: newShow,
      isShow1: false
    })
  },

  // 拿取评测项
  getEvaluating: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let userMessage = app.globalData.userMessage
    wx.getStorage({
      key: 'projectlist',
      success: res => {
        wx.request({
          url: httpHead + 'api/elnProject.action?m=getEvaluateByProjectId&projectId='+ res.data.projectId,
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
          },
          data: {
            coopCode : 'chengde',
            frontUserId : userMessage.frontUser.frontUserId, 
            accessToken : userMessage.accessToken,
          },
          success: res => {
            console.log(res)
            if(res.data.msg === 'success'){
              this.setData({
                questionList: res.data.data.evaluateSubjectList,
                evaluateInfo: res.data.data.evaluateInfo
              })
            }else if(res.data.msg === '项目评价已经完成'){
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 2000
              })
            }else{
              wx.showToast({
                title: "接口异常",
                icon: 'none',
                duration: 2000
              })
            }
          },
          complete: res => {
            wx.hideLoading();
          }
        })
      },
      fail: res => {
        //console.log('参数拿去失败')
        wx.showToast({
          title: '参数拿去失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  //修改参数
  changeList: function (e) {
    const question = this.data.questionList[e.detail.itemIndex];
    question.subject.isAnswered = 'Y';
    for(const obj in question.itemList){
      question.itemList[obj].isSelected =  question.itemList[obj].itemId ===  e.detail.itemId ? 'Y':'N'
    }
    const item = 'questionList['+e.detail.itemIndex+']'
    this.setData({
      item : question,
    })
  },

  //修改参数2
  changeAsk: function(e) {
    //console.log(e.detail)
    const question = this.data.questionList[e.detail.itemIndex];
    question.subject.isAnswered = 'Y';
    question.subject.answerContent = e.detail.itemMsg;
    question.subject.askScore = e.detail.itemScore;
    const item = 'questionList['+e.detail.itemIndex+']'
    //console.log(question)
    this.setData({
      item : question,
    })
  },

  //提交
  submitAnswer: function () {
    const userMessage = app.globalData.userMessage
    const project = wx.getStorageSync('projectlist')
    const a = {evaluateSubjectList: this.data.questionList}
    const that = this

    //判断空值
    for(let i in a.evaluateSubjectList){
      if(a.evaluateSubjectList[i].subject.isAnswered === 'N'){
        let wartext = '第'+(parseInt(i)+1)+'项未进行评定'
        wx.showToast({
          title: wartext,
          icon: 'none',
          duration: 2000
        })
        return;
      }
    }

    wx.request({
      url: httpHead + 'api/elnProject.action?m=saveEvaluateUserDetail&projectId='+ project.projectId,
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      method: 'POST',
      data: {
        coopCode : 'chengde',
        // checkPhaseCode : project.checkPhaseCode,
        frontUserId : userMessage.frontUser.frontUserId, 
        accessToken : userMessage.accessToken,
        evaluateId : that.data.evaluateInfo.evaluateId,
        summary : that.data.textareamsg,
        userAnswerJson : JSON.stringify(a)
      },
      success: res => {
        console.log(res)
        if(res.data.msg === 'success'){
          wx.showToast({
            title: '审批完成',
            icon: 'success',
            duration: 2000,
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 2
            })
          }, 2000);
        }else{
          wx.showToast({
            title: '审批失败',
            icon: 'none',
            duration: 4000
          })
        }
      }
    })
  },

  bindFormInput: function (e) {
    this.setData({textareamsg: e.detail.value})
  }
})