// method/questions/only/only.js
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
    itemChange(e){
      let mes = this.properties.data;
      let value = e.detail.value;
      mes.subject.isAnswered = "Y";
      mes.index = this.properties.index;
      for(let item of mes.itemList){
        item.isSelected = value === item.itemId ? "Y" : "N";
      }
      this.triggerEvent("questionsMsg", mes, {})
    }
  }
})
