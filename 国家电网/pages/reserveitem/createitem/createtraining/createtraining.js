// pages/reserveitem/createitem/createtraining/createtraining.js
let app = getApp()
let httpHead = app.globalData.httpHead2

Page({

  /**
   * 页面的初始数据
   */
  data: {
    getMaxLength: 200,

    question:0,
    progressnum:33,
    rangkey: 'dicName',
    rangkey1: 'orgNameStr',
    upsubimt: 0,
    //三级联动分类
    first_select: [],
    first_selectIndex: 0,
    second_select: [],
    second_selectIndex: 0,
    third_select: [],
    third_selectIndex: 0,
    //下拉框数据源
    elnRequirementList: [],
    elnListIndex:0,
    cd_org_name: [],
    cd_org_nameIndex:0,
    cd_rang_org_name: [],
    cd_rang_org_nameIndex:0,
    cd_master_org_name: [],
    cd_master_org_nameIndex:0,
    cd_action_org_name: [],
    cd_action_org_nameIndex:0,
    cd_money_source: [],
    cd_money_sourceIndex:0,
    cd_money_type: [],
    cd_money_typeIndex:1,
    unit: '',
    uname: '',
    unecessity: '',
    umsg: '',
    uliable: '',
    ucontacts: '',
    uremarks: '',
    uscore: '',
    sourceAll: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSelectOption();
    this.getSelectThird();
    //let userMessage = app.globalData.userMessage;
    //console.log(userMessage)
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

  //选择下拉框选项
  bindPickerChange: function (e) {
    let val = e.detail.value;
    let cha = e.target.dataset.index  + 'Index';
    this.setData({
      [cha]: val
    })
  },

  //三级联动下拉框数据
  getSelectThird: function () {
    let that = this;
    wx.request({
      url: httpHead + 'api/sysType.action?m=getTypeTree&coopCode=chengde&type=PXKF',
      method: 'post',
      success: res => {
        let list = res.data.data.list || null;
        if(list == null || list.length <= 0){
          return;
        }
        that.setData({
          first_select: list,
          second_select: list[0].subTypeList,
          third_select: list[0].subTypeList[0].subTypeList
        })
        that.upThirdSelect();
      }
    })
  },

  //联动下拉框
  bindPickerChange1: function (e) {
    let list = this.data.first_select;
    let val = e.detail.value;
    this.setData({
      first_selectIndex: val,
      second_selectIndex: 0,
      third_selectIndex: 0,
      second_select: list[val].subTypeList,
      third_select: []
    })
  },

  bindPickerChange2: function (e) {
    let list = this.data.second_select;
    let val = e.detail.value;
    this.setData({
      second_selectIndex: val,
      third_selectIndex: 0,
      third_select: list[val].subTypeList
    })
  },

  bindPickerChange3: function (e) {
    let val = e.detail.value;
    this.setData({
      third_selectIndex: val,
    })
  },

  //下一步按钮
  nextQuestion: function () {
    var num = parseInt(this.data.question);
    num++;
    var demos = num === 1 ? 66 : 100;
    this.setData({
      question: num,
      progressnum: demos
    })
  },

  lastQuestion: function () {
    var num = parseInt(this.data.question) 
    var demos = num === 2 ? 66 : 33;
    num--;
    this.setData({
      question: num,
      progressnum: demos
    })
  },

  //接收下拉选择框参数
  getSelectOption: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let that = this;
    let typelist = 'cd_org_name,cd_range_org_name,cd_training_cat,cd_position_name,cd_training_type,cd_training_shape,cd_money_source,cd_money_type';
    wx.request({
      url: httpHead + 'api/elnProject.action?m=getSelectParamByChengde',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      data:{
        coopCode : 'chengde',
        dicTypes : typelist
      },
      method: 'post',
      success: res => {
        let list = res.data.data || null;
        if(list == null || list.length <= 0){
          wx.showToast({
            title: '接口数据异常',
            image: '/assets/img/error/woring.png',
            duration: 2000
          })
          return;
        }
        that.setData({
          elnRequirementList: list.elnRequirementList,
          cd_org_name: list.cd_org_name,
          cd_rang_org_name: list.cd_rang_org_name,
          cd_master_org_name: list.cd_master_org_name,
          cd_action_org_name: list.cd_action_org_name,
          cd_money_source: list.cd_money_source,
          cd_money_type: list.cd_money_type
        })
        wx.hideLoading()
        that.upObj();
      },
      fail: res => {
        wx.showToast({
          title: '连接异常',
          image: '/assets/img/error/woring.png',
          duration: 2000
        })
      }
    })
  },

  //获取input输入框内容
  getSource: function (e) {
    let source = e.detail.value;
    let cha = e.target.dataset.index;
    this.setData({
      [cha]:source
    })
  },

  //提交项目数值(添加或修改)
  submitForm: function () {
    let that = this;
    let upsubimt = this.data.upsubimt;
    let userMessage = app.globalData.userMessage;
    //验证必填选项是否为空
    let msg1 = this.data.elnRequirementList[this.data.elnListIndex];
    let msg2 = this.data.cd_org_name[this.data.cd_org_nameIndex];
    let msg3 = this.data.unit || null;
    let msg4 = this.data.uname || null;
    let msg5 = this.data.first_select[this.data.first_selectIndex];
    let msg6 = this.data.second_select[this.data.second_selectIndex] || null;
    let msg7 = this.data.third_select[this.data.third_selectIndex] || null;
    let msg8 = this.data.cd_rang_org_name[this.data.cd_rang_org_nameIndex];
    let msg9 = this.data.unecessity || null;
    let msg10 = this.data.umsg || null;
    let msg11 = this.data.cd_master_org_name[this.data.cd_master_org_nameIndex];
    let msg12 = this.data.cd_action_org_name[this.data.cd_action_org_nameIndex];
    let msg13 = this.data.sourceAll || 0;
    let msg14 = this.data.cd_money_source[this.data.cd_money_sourceIndex];
    let msg15 = this.data.uliable || null;
    let msg16 = this.data.ucontacts || null;
    let msg17 = this.data.uremarks || null;
    let msg18 = this.data.uscore || null;
    let msg19 = this.data.cd_money_type[this.data.cd_money_typeIndex];

    if(msg3 === null){
      wx.showToast({
        title: '项目所属单位未填写',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if(msg4 === null){
      wx.showToast({
        title: '项目名称未填写',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if(msg6 === null){
      wx.showToast({
        title: '多级分类未选择',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if(msg7 !== null){
      msg7 = msg7.typeId;
    }
    if(msg9 === null){
      wx.showToast({
        title: '项目必要性未填写',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if(msg10 === null){
      wx.showToast({
        title: '项目主要内容未填写',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if(msg13 === 0){
      wx.showToast({
        title: '总费用未填写',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if(msg15 === null){
      wx.showToast({
        title: '责任人未填写',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if(msg18 === null){
      wx.showToast({
        title: '储备评分未填写',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    let jsondata = {
      coopCode : 'chengde',
      projectCat: 'PXKF',
      frontUserId : userMessage.frontUser.frontUserId, 
      nickname : userMessage.frontUser.realName || userMessage.frontUser.nickname, 
      accessToken : userMessage.accessToken,
      orgId : userMessage.frontUser.orgId, 
      requirementId: msg1.requirementId,
      orgName: msg2.dicName,
      belongOrgName: msg3,
      projectTitle: msg4,
      projectType: msg5.typeId,
      Leve2Id: msg6.typeId,
      Leve3Id: msg7,
      rangeOrgName: msg8.dicName,
      trainingGoal: msg9,
      projectSummary: msg10,
      masterOrgName: msg11.organizeCode+'※'+msg11.orgNameStr,
      actionOrgName: msg12.organizeCode+'※'+msg12.orgNameStr,
      budgetMoneyTotal: msg13,
      moneySource: msg14.dicName,
      masterName: msg15,
      contactName: msg16,
      memo: msg17,
      selfEvaluateScore: msg18,
      moneyType: msg19.dicName,
    }

    wx.showModal({
      title: upsubimt == 0 ? '确认提交？' : '确认修改？',
      success (res){
        wx.showLoading({
          title: '提交中…',
        })
        if(res.confirm){
          if(upsubimt == 0){
            wx.request({
              url: httpHead + 'api/elnProject.action?m=insert',
              header: {
                'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
              },
              data: jsondata,
              method: 'post',
              success: res => {
                if(res.data.msg === "success"){
                  wx.showToast({
                    title: '项目已提交',
                    icon: 'success',
                    duration: 2000
                  })
                  setTimeout(() => {
                    wx.reLaunch({
                      url: '../../../../pages/reserveitem/reserveitem',
                    })
                  }, 2000);
                }else{
                  console.log(res)
                  wx.showToast({
                    title: '项目提交失败',
                    icon: 'none',
                    duration: 2000
                  })
                }
              }
            })
          }else{
            let userinfo = wx.getStorageSync('projectlist');
            wx.request({
              url: httpHead + 'api/elnProject.action?m=update&projectId='+userinfo.projectId,
              header: {
                'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
              },
              data: jsondata,
              success: res => {
                if(res.data.msg === 'success'){
                  wx.showToast({
                    title: '项目已修改',
                    icon: 'success',
                    duration: 4000
                  })
                  wx.reLaunch({
                    url: '../../../../pages/reserveitem/reserveitem',
                  })
                }
              }
            })
          }

        }else if(res.cancel){
          console.log('用户点击取消')
          wx.hideLoading();
          return;
        }
      }
    })
  },

  //获取存储的数据，若存在则为修改，不存在则为添加
  upObj: function () {
    //检查Storage
    wx.getStorage({
      key: 'projectlist',
      success: res => {
        this.setData({
          upsubimt: 1,
          elnListIndex: this.data.elnRequirementList.map(item => item.requirementId).indexOf(res.data.requirementId),
          cd_org_nameIndex: this.data.cd_org_name.map(item => item.dicName).indexOf(res.data.orgName),
          unit: res.data.belongOrgName,
          uname: res.data.projectTitle,
          cd_rang_org_nameIndex: this.data.cd_rang_org_name.map(item => item.dicName).indexOf(res.data.rangeOrgName),
          unecessity: res.data.trainingGoal,
          umsg: res.data.projectSummary,
          cd_master_org_nameIndex: this.data.cd_master_org_name.map(item => item.orgNameStr).indexOf(res.data.masterOrgName),
          cd_action_org_nameIndex: this.data.cd_action_org_name.map(item => item.orgNameStr).indexOf(res.data.actionOrgName),
          sourceAll: res.data.budgetMoneyTotal,
          cd_money_sourceIndex: this.data.cd_money_source.map(item => item.dicName).indexOf(res.data.moneySource),
          uliable: res.data.masterName,
          ucontacts: res.data.contactName === 'null' ? '' : res.data.contactName,
          uremarks: res.data.memo === 'null' ? '' : res.data.memo,
          uscore: res.data.selfEvaluateScore,
          cd_money_typeIndex: this.data.cd_money_type.map(item => item.dicName).indexOf(res.data.moneyType),
        })
      },
      fail: res => {
        //console.log('未获取缓存')
      }
    })
  },

  //单独获取三级分类参数方法
  upThirdSelect: function () {
    wx.getStorage({
      key: 'projectlist',
      success: res => {
        let projectType = res.data.projectType;
        if(projectType === 'null'){
          console.log('分类Id为空')
        }else{
          let first_selectlist = this.data.first_select
          let firstIndex = 0
          let secondIndex = 0
          let thirdIndex = 0
          Tag_1:
          for(const first in first_selectlist){
            firstIndex = first
            secondIndex = first_selectlist[first].subTypeList.map(item => item.typeId).indexOf(projectType)
            if(secondIndex >= 0){
              thirdIndex = -1
              break
            }else{
              for(const second in first_selectlist[first].subTypeList){
                secondIndex = second
                thirdIndex = first_selectlist[first].subTypeList[second].subTypeList.map(item => item.typeId).indexOf(projectType)
                if(thirdIndex >= 0){
                  break Tag_1;
                }
              }
            }
          }

          this.setData({
            first_selectIndex: firstIndex,
            second_select: first_selectlist[firstIndex].subTypeList,
            second_selectIndex: secondIndex,
            third_select: first_selectlist[firstIndex].subTypeList[secondIndex].subTypeList,
            third_selectIndex: thirdIndex
          })
        }
      },
      fail: res => {
        //console.log('未获取缓存')
      }
    })
  },
})