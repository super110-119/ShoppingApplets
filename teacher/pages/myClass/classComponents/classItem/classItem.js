// pages/myClass/classComponents/classItem/classItem.js
let {timeFormat} = require("../../../../utils/getTime")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    message: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isTimes: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    infoClick(e){
      let index = e.currentTarget.dataset.index
      wx.navigateTo({
        url: '/pages/myClass/info/info?courseId='+index,
      })
    },
    successClick(){
      console.log('点击了笔记按钮');
    },
    warningClick(){
      let mes = this.properties.message
      let courseId = mes.courseId
      let teacherId = mes.teacherId
      wx.navigateTo({
        url: '/pages/myClass/question/question?courseId=' + courseId+ '&teacherId=' + teacherId,
      })
    }
  },

    /*组件生命周期*/ 
    lifetimes: {
      ready(){
        let t = this.properties.message.createTime;
        let times = timeFormat(t, 'yyyy年mm月dd日');
        this.setData({isTimes: times});
      }
    }
})
