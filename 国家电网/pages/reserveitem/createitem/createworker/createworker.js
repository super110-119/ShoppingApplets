// pages/reserveitem/createitem/createtraining/createtraining.js
let app = getApp()
let httpHead = app.globalData.httpHead2


Page({

  /**
   * 页面的初始数据
   */
  data: {
    getMaxLength: 200,
    //默认配置属性
    progressnum:25,
    question:0,
    rangkey: 'dicName',
    rangkey1: 'orgNameStr',
    multiArray: [['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'], ['1期','2期','3期','4期','5期','6期','7期','8期','9期','10期']],
    upsubimt: 0,
    //三级联动分类
    first_select: [],
    first_selectIndex: 0,
    second_select: [],
    second_selectIndex: 0,
    third_select: [],
    third_selectIndex: 0,
    //已下均为报表显示及回馈的数值
    traintime: '请选择(长按清除)',
    elnRequirementList: [],
    elnListIndex:0,
    cd_org_name: [],
    cd_org_nameIndex:0,
    cd_rang_org_name: [],
    cd_rang_org_nameIndex:0,
    cd_training_cat: [],
    cd_training_catIndex:0,
    cd_position_name: [],
    cd_position_nameIndex:0,
    cd_training_type: [],
    cd_training_typeIndex:0,
    cd_training_shape: [],
    cd_training_shapeIndex:0,
    cd_apply_org_name: [],
    cd_apply_org_nameIndex:0,
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
    uobject: '',
    umsg: '',
    ugrade: '',
    unumpeople: '',
    unumday: '',
    utrainplace: '',
    uliable: '',
    ucontacts: '',
    ucredit: '',
    uremarks: '',
    uscore: '',
    allpeople:0,
    allday:0,
    sourceTeacher:'',
    sourceMaterial:'',
    sourceSite:'',
    sourceTextbook:'',
    sourceOther:'',
    allsource:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSelectOption();
    this.getSelectThird();
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

  //培训时间多列下拉框
  bindMultiPickerChange: function (e) {
    let list = e.detail.value;
    let month = parseInt(list[0])+1;
    let time = parseInt(list[1])+1;
    if(month < 10){
      month = '0' + month
    }else{
      month = '' + month
    }
    let mp = ''
    if(this.data.traintime === '请选择(长按清除)'){
      mp = month + '(' + time + ')' 
    }else{
      mp = this.data.traintime + ',' +  month + '(' + time + ')'
    }
    
    this.setData({traintime: mp})
  },

  //长按清除培训时间
  clearTime: function () {
    this.setData({traintime: '请选择(长按清除)'})
  },

  //下一步按钮
  nextQuestion: function () {
    var num = parseInt(this.data.question);
    var progressnum = this.data.progressnum;
    if(num < 3){
      num++;
      progressnum = parseInt(progressnum) + 25;
    }
    this.setData({
      question: num,
      progressnum
    })
  },

  //上一步按钮
  lastQuestion: function () {
    var num = parseInt(this.data.question) 
    var progressnum = this.data.progressnum;
    if(num > 0){
      num--;
      progressnum = parseInt(progressnum) - 25;
    }
    this.setData({
      question: num,
      progressnum
    })
  },

  //接收下拉选择框参数
  getSelectOption: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let that = this;
    // let typelist = 'cd_org_name,cd_range_org_name,cd_training_cat,cd_position_name,cd_training_type,cd_training_shape,cd_apply_org_name,cd_master_org_name,cd_action_org_name,cd_money_source,cd_money_type';
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
        console.log(list)
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
          cd_training_cat: list.cd_training_cat,
          cd_position_name: list.cd_position_name,
          cd_training_type: list.cd_training_type,
          cd_training_shape: list.cd_training_shape,
          cd_apply_org_name: list.cd_apply_org_name,
          cd_master_org_name: list.cd_master_org_name,
          cd_action_org_name: list.cd_action_org_name,
          cd_money_source: list.cd_money_source,
          cd_money_type: list.cd_money_type
        })
        wx.hideLoading();
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

  //三级联动下拉框数据
  getSelectThird: function () {
    let that = this;
    wx.request({
      url: httpHead + 'api/sysType.action?m=getTypeTree&coopCode=chengde&type=eln_project_type',
      method: 'post',
      success: res => {
        let list = res.data.data.list || null;
        if(list == null || list.length <= 0){
          return;
        }
        //设置初始下拉值
        that.setData({
          first_select: list,
          second_select: list[0].subTypeList,
          third_select: list[0].subTypeList[0].subTypeList
        })
        that.upThirdSelect();
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

  //计算总人数、人天
  countSum: function () {
    let ugrade = parseFloat(this.data.ugrade) || 0;
    let unumday = parseFloat(this.data.unumday) || 0;
    let unumpeople = parseFloat(this.data.unumpeople) || 0;
    let allpeople = ugrade * unumpeople
    let allday = unumday * allpeople
    this.setData({allpeople,allday})
  },

  //计算总金额
  countSource: function () {
    let sourceTeacher = parseFloat(this.data.sourceTeacher) || 0;
    let sourceMaterial = parseFloat(this.data.sourceMaterial) || 0;
    let sourceSite = parseFloat(this.data.sourceSite) || 0;
    let sourceTextbook = parseFloat(this.data.sourceTextbook) || 0;
    let sourceOther = parseFloat(this.data.sourceOther) || 0;
    let allsource = sourceTeacher + sourceMaterial + sourceSite + sourceTextbook + sourceOther;
    this.setData({allsource})
  },

  //提交项目数值
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
    let msg9 = this.data.cd_training_cat[this.data.cd_training_catIndex];
    let msg10 = this.data.cd_position_name[this.data.cd_position_nameIndex];
    let msg11 = this.data.cd_training_type[this.data.cd_training_typeIndex];
    let msg12 = this.data.cd_training_shape[this.data.cd_training_shapeIndex];
    let msg13 = this.data.uobject || null;
    let msg14 = this.data.umsg || null;
    let msg15 = this.data.ugrade || null;
    let msg16 = this.data.unumpeople || null;
    let msg17 = this.data.unumday || null;
    let msg18 = this.data.allpeople || null;
    let msg19 = this.data.allday || null;
    let msg20 = this.data.traintime || null;
    let msg21 = this.data.cd_apply_org_name[this.data.cd_apply_org_nameIndex];
    let msg22 = this.data.cd_master_org_name[this.data.cd_master_org_nameIndex];
    let msg23 = this.data.cd_action_org_name[this.data.cd_action_org_nameIndex];
    let msg24 = this.data.sourceTeacher || 0;
    let msg25 = this.data.sourceMaterial || 0;
    let msg26 = this.data.sourceSite || 0;
    let msg27 = this.data.sourceTextbook || 0;
    let msg28 = this.data.sourceOther || 0;
    let msg29 = this.data.allsource;
    let msg30 = this.data.cd_money_source[this.data.cd_money_sourceIndex];
    let msg31 = this.data.cd_money_type[this.data.cd_money_typeIndex];
    let msg32 = this.data.utrainplace || null;
    let msg33 = this.data.uliable || null;
    let msg34 = this.data.ucontacts || null;
    let msg35 = this.data.ucredit || null;
    let msg36 = this.data.uremarks || null;
    let msg37 = this.data.uscore || null;

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
    if(msg13 === null){
      wx.showToast({
        title: '培训对象未填写',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if(msg14 === null){
      wx.showToast({
        title: '项目主要内容未填写',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if(msg15 === null){
      wx.showToast({
        title: '培训期数未填写',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if(msg16 === null){
      wx.showToast({
        title: '每期人数未填写',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if(msg17 === null){
      wx.showToast({
        title: '每期天数未填写',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if(msg20 === '请选择(长按清除)'){
      wx.showToast({
        title: '培训时间未选择',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if(msg29 === 0){
      wx.showToast({
        title: '请填写至少一项费用',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if(msg33 === null){
      wx.showToast({
        title: '责任人未填写',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if(msg35 === null){
      wx.showToast({
        title: '学分未填写',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if(msg37 === null){
      wx.showToast({
        title: '储备评分未填写',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    let data = {
      coopCode : 'chengde',
      projectCat: 'ZGPX',
      frontUserId : userMessage.frontUser.frontUserId, 
      nickname : userMessage.frontUser.realName || userMessage.frontUser.nickname, 
      orgId : userMessage.frontUser.orgId, 
      accessToken : userMessage.accessToken,
      requirementId: msg1.requirementId,
      orgName: msg2.dicName,
      belongOrgName: msg3,
      projectTitle: msg4,
      projectType: msg5.typeId,
      Leve2Id: msg6.typeId,
      Leve3Id: msg7,
      rangeOrgName: msg8.dicName,
      trainingCat: msg9.dicName,
      positionName: msg10.dicName,
      trainingType: msg11.dicName,
      trainingShape: msg12.dicName,
      trainingObject: msg13,
      projectSummary: msg14,
      projectPlanCount: msg15,
      planUserCountAvg: msg16,
      planDayCountAvg: msg17,
      planUserCountTotal: msg18,
      planDayCountTotal: msg19,
      planMonth: msg20,
      applyOrgName: msg21.organizeCode+'※'+msg21.orgNameStr,
      masterOrgName: msg21.organizeCode+'※'+msg22.orgNameStr,
      actionOrgName: msg21.organizeCode+'※'+msg23.orgNameStr,
      buggetMoneyItem1: msg24,
      buggetMoneyItem2: msg25,
      buggetMoneyItem3: msg26,
      buggetMoneyItem4: msg27,
      buggetMoneyItem5: msg28,
      budgetMoneyTotal: msg29,
      moneySource: msg30.dicName,
      moneyType: msg31.dicName,
      address: msg32,
      masterName: msg33,
      contactName: msg34,
      score: msg35,
      memo: msg36,
      selfEvaluateScore: msg37
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
              data,
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
                  wx.showToast({
                    title: '项目提交失败',
                    icon: 'none',
                    duration: 2000
                  })
                }
              }
            })
          }else {
            let userinfo = wx.getStorageSync('projectlist');
            wx.request({
              url: httpHead + 'api/elnProject.action?m=update&projectId='+userinfo.projectId,
              header: {
                'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
              },
              data,
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
        //console.log(res.data)
        this.setData({
          upsubimt: 1,
          elnListIndex: this.data.elnRequirementList.map(item => item.requirementId).indexOf(res.data.requirementId),
          cd_org_nameIndex: this.data.cd_org_name.map(item => item.dicName).indexOf(res.data.orgName),
          unit: res.data.belongOrgName,
          uname: res.data.projectTitle,
          cd_rang_org_nameIndex: this.data.cd_rang_org_name.map(item => item.dicName).indexOf(res.data.rangeOrgName),
          cd_training_catIndex: this.data.cd_training_cat.map(item => item.dicName).indexOf(res.data.trainingCat),
          cd_position_nameIndex: this.data.cd_position_name.map(item => item.dicName).indexOf(res.data.positionName),
          cd_training_typeIndex: this.data.cd_training_type.map(item => item.dicName).indexOf(res.data.trainingType),
          cd_training_shapeIndex: this.data.cd_training_shape.map(item => item.dicName).indexOf(res.data.trainingShape),
          uobject: res.data.trainingObject,
          umsg: res.data.projectSummary,
          ugrade: res.data.projectPlanCount,
          unumpeople: res.data.planUserCountAvg,
          unumday: res.data.planDayCountAvg,
          allpeople: res.data.planUserCountTotal,
          allday: res.data.planDayCountTotal,
          traintime: res.data.planMonth,
          cd_apply_org_nameIndex: this.data.cd_apply_org_name.map(item => item.orgNameStr).indexOf(res.data.applyOrgName),
          cd_master_org_nameIndex: this.data.cd_master_org_name.map(item => item.orgNameStr).indexOf(res.data.masterOrgName),
          cd_action_org_nameIndex: this.data.cd_action_org_name.map(item => item.orgNameStr).indexOf(res.data.actionOrgName),
          sourceTeacher: res.data.buggetMoneyItem1,
          sourceMaterial: res.data.buggetMoneyItem2,
          sourceSite: res.data.buggetMoneyItem3,
          sourceTextbook: res.data.buggetMoneyItem4,
          sourceOther: res.data.buggetMoneyItem5,
          allsource: res.data.budgetMoneyTotal,
          cd_money_sourceIndex: this.data.cd_money_source.map(item => item.dicName).indexOf(res.data.moneySource),
          cd_money_typeIndex: this.data.cd_money_type.map(item => item.dicName).indexOf(res.data.moneyType),
          utrainplace: res.data.address === 'null' ? '' : res.data.address,
          uliable: res.data.masterName,
          ucontacts: res.data.contactName === 'null' ? '' : res.data.contactName,
          ucredit: res.data.score,
          uremarks: res.data.memo === 'null' ? '' : res.data.memo,
          uscore: res.data.selfEvaluateScore
        })
      },
      fail: res => {
        console.log('未获取缓存')
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
                  console.log('hello')
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
        console.log('未获取缓存')
      }
    })
  },

})