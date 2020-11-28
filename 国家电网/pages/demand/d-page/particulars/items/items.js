// pages/demand/d-page/particulars/items/items.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mes: {
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
    itemChagnge(e){
      let value  = e.detail.value;
      let index  = this.properties.index;
      this.triggerEvent("itemsChanges", {
        value, index
      }, {})
    },
    textChange(e){
      let obj = e.detail
      let value = obj.value.trim()
      let length = value.length
      obj.value = value;
      obj.cursor = length;
      obj.index = this.properties.index
      if(obj.cursor > 0){
        this.triggerEvent("textChange", obj, {})
      }
    }
  }
})
