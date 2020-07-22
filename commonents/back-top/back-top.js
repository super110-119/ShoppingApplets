// commonents/back-top/back-top.js
Component({
  methods: {
    goTopClick(){
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  }
})
