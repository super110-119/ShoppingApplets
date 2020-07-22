// pages/details/dcpn/l-d-tab-bar/l-d-tab-bar.js

Component({
  properties: {

  },
  data: {
    isShow: false,
    titles: ''
  },
  methods: {
    scClick(){
      this.setData({
        isShow: !this.data.isShow
      })
      if(this.data.isShow){
        wx.showToast({
          title: "加入收藏成功",
          mask: true
        })
      }else{
        wx.showToast({
          title: "取消收藏成功",
          mask: true
        })
      }
    },
    shopClick(){
      this.triggerEvent("shopppingClick", {}, {})
    },
    byClick(){
      wx.showToast({
        title: '暂时无法购买',
        icon: 'success',
        image: '/assets/img/toast/warning.png',
        duration: 2000,
        mask: true
      })
    }
  }
})
