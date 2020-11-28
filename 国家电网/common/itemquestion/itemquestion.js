// common/itemquestion/itemquestion.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    subjectT: Object,
    subjectIndex: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    someData: {}
  },
  
  lifetimes: {
    attached: function() {
      //console.log(this.properties.subjectT)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    radioChange: function(e) {
      //console.log('radio发生change事件，携带id值为：', e.detail.value)
      //携带参数触发父组件事件
      var myEventDetail = {itemIndex:this.properties.subjectIndex,itemId:e.detail.value}
      this.triggerEvent('changeList',myEventDetail)
    }
  }
})
