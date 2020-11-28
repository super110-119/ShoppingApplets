// common/subject/subject.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mes: {
      type: Object,
      value: {}
    },
    i: {
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
    radioChange(e){
      let value = e.detail.value;
      value = value.trim()
      let index = this.properties.i;
      if(value){
        this.triggerEvent("radioChange", {
          value, index
        }, {})
      }
    }
  }
})
