// method/questions/questions.js
// 使用数组包裹每一题
let answerArr = []

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    message: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    questionsMsg(e){
      // 获取子元素传输的值
      let sonMsg = e.detail
      // 循环遍历数组，用于存储与修改
      for(let item of answerArr){
        if(sonMsg.index === item.index){
          item.itemList = sonMsg.itemList;
          item.subject = sonMsg.subject;
          this.triggerEvent("questionMessage", {mes: answerArr}, {})
          return
        }
      }
      answerArr.push(sonMsg)
      this.triggerEvent("questionMessage", {mes: answerArr}, {})
    }
  }
})
