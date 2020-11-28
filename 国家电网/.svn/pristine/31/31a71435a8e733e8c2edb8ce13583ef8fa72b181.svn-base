// method/questions/text/text.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {}
    },
    index: {
      type: Number,
      value: 0
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
    textareaChange(e){
      let value = e.detail.value.trim()
      let mes = this.properties.data;
      mes.value = value
      mes.subject.isAnswered = "Y";
      mes.index = this.properties.index;
      this.triggerEvent("questionsMsg", mes, {})
    }
  }
})
