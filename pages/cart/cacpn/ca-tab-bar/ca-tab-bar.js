// pages/cart/cacpn/ca-tab-bar/ca-tab-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isActive: {
      type: Boolean,
      value: false
    },
    prices: {
      type: Number,
      value: 0
    },
    isNum: {
      type:Number,
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
    allClick(){
      this.setData({
        isActive: !this.properties.isActive
      })
      this.triggerEvent("clickALL", {
        isActive: this.properties.isActive
      }, {})
    },
    isnums(){
      if(this.properties.isNum > 0)
        wx.showToast({title: "购买成功！！!"})
      else
        wx.showToast({title: "请选择商品", image: "/assets/img/toast/warning.png"})
    }
  }
})
