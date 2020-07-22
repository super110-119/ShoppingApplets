// pages/cart/cacpn/ca-goods-list/ca-goods-list.js
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
    iconClick(e){
      const i = e.currentTarget.dataset.index
      this.triggerEvent("iconClick", {
        index: i
      }, {})
    },
    goddsItemClick(e){
       wx.navigateTo({
        url: "/pages/details/details?iid=" + e.currentTarget.dataset.iid
      })
    }
  }
})
