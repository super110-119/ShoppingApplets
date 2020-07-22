// pages/cart/cacpn/ca-nav-bar/ca-nav-bar.js
Component({
  properties: {
    num: {
      type: Number,
      value: 0
    }
  },
  methods: {
    deleteClick(){
      this.triggerEvent('deleteClick', {}, {})
    }
  }
})
