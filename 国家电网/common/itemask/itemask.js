// common/itemask/itemask.js
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
    askmsg: '',
    askscore: 0
  },

  lifetimes: {
    attached: function() {
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindAskInput: function(e) {
      this.setData({askmsg: e.detail.value})
    },

    bindKeyInput: function (e) {
      this.setData({askscore: e.detail.value})
    },

    sendMsg: function() {
      var myEventDetail = {itemIndex:this.properties.subjectIndex,itemMsg:this.data.askmsg,itemScore:this.data.askscore}
      this.triggerEvent('changeAsk',myEventDetail)
    }
  }
})
