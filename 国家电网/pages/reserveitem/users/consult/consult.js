// pages/reserveitem/users/consult/consult.js
let app = getApp()
let httpHead = app.globalData.httpHead2

Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: [],
    msgList: [],
    isFrist: false,
    // 定义是否遮罩
    isMask: true,
    //审核角色 0:省市检查员 1：专家评审
    checkrole: 0,
    isShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let userMessage = app.globalData.userMessage
    //检测用户是否为专家
    const roleCode = userMessage.frontUser.roleCode.split(',')
    const c = roleCode.indexOf('C')
    if(c != -1){
      this.setData({ checkrole: 1 })
    }
    wx.getStorage({
      key: 'projectlist',
      success (res){
        let a = res.data;
        console.log(a)
        wx.request({
          url: httpHead + 'api/sysType.action?m=getSubTypeList&typeId='+a.projectType,
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
          },
          data: {
            coopCode : 'chengde',
            frontUserId : userMessage.frontUser.frontUserId, 
            accessToken : userMessage.accessToken,
          },
          success: res => {
            a.typeName = res.data.data.sysType.typeName
            let details = [{title:'项目名称',value:a.projectTitle},{title:'单位名称',value:a.orgName,},{title:'所属单位',value:a.belongOrgName},{title:'项目分类',value:a.typeName},{title:'实施范围',value:a.rangeOrgName},{title:'项目必要性',value:a.trainingGoal || '暂无'},{title:'项目内容',value:a.projectSummary},{title:'主办部门',value:a.masterOrgName},{title: "承办单位",value: a.actionOrgName},{title: "总费用(预算)",value: a.budgetMoneyTotal},{title: "经费来源",value: a.moneySource},{title: "费用类型",value: a.moneyType || '暂无'},{title: "责任人",value: a.masterName},{title: "联系人",value: a.contactName=='null'?'暂无':a.contactName},{title: "备注",value: a.memo=='null'?'暂无':a.memo},{title: "自评分", value: a.selfEvaluateScore}]
            that.setData({details, isMask:false, msgList:a})
          }
        })

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
   * 自定义方法-------------------------
   */
  scoreFrist(){
    wx.navigateTo({
      url: '../scoreFrist/scoreFrist',
    })
  },
  scoreSecond(){
    wx.navigateTo({
      url: '../scoreSecond/scoreSecond',
    })
  },

  //通过审核
  itemPass: function(e){
    let that = this
    const userMessage = app.globalData.userMessage
    const verify = e.currentTarget.dataset.index
    let verifymsg = verify === 'pass' ? '通过':'不通过'
    let contentmsg = '确定该项目'+verifymsg+'审核?'
    wx.showModal({
      title: '提示',
      content: contentmsg,
      success (res) {
        if (res.confirm) {
          wx.request({
            url: httpHead + 'api/zodChengdeCheckElnProject.action?m=saveVerifyInfo',
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            data: {
              coopCode : 'chengde',
              accessToken : userMessage.accessToken,
              frontUserId : userMessage.frontUser.frontUserId, 
              roleCode : userMessage.frontUser.roleCode, 
              orgId : userMessage.frontUser.orgId, 
              realName : userMessage.frontUser.realName, 
              projectId : that.data.msgList.projectId,
              curCheckPhaseCode : that.data.msgList.curCheckPhaseCode,
              verify
            },
            success: res => {
              if(res.data.msg){
                let datas = res.data
                if(datas.ret === '-1'){
                  wx.showModal({
                    title: '提示',
                    content: datas.msg,
                    showCancel: false,
                    success(res){
                      if (res.confirm) {
                        wx.navigateBack({
                          delta: 1,
                        })
                      }
                    }
                  })
                }else{
                  that.setData({
                    isShow: !that.data.isShow
                  })
                }
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  btnsClick(){
    wx.navigateBack({
      delta: 1,
    })
  }
})