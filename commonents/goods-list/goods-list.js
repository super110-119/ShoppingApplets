// commonents/goods-list/goods-list.js
Component({
  properties: {
    goods: {
      type: Object,
      value: {}
    },
    types: {
      type: String,
      value: ''
    }
  },
  methods: {
    goodsClick(e){
      const iid = e.currentTarget.dataset.iid
      wx.navigateTo({
        url: '/pages/details/details?iid=' + iid
      })
    }
  }
})
