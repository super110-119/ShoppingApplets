// pages/classify/clcpn/cl-nav-bar/cl-nav-bar.js
Component({
  data: {
    isShow: false
  },
  properties: {
    mesList: {
      type: Array,
      value: []
    },
    isActive: {
      type: Number,
      value: 0
    }
  },
  methods: {
    clickMore(){
      this.setData({
        isShow: !this.data.isShow
      })
    },
    itemClick(e){
      const i = e.currentTarget.dataset.index
      this.triggerEvent('itemClick', {i}, {})
      this.clickMore()
    }
  }
})
