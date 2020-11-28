// pages/profile/p-compontent/user/user.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mes: {
      type: Object,
      value: {}
    },
    load: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    jumppage: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    userIconClick(){
      if(this.properties.load){
        wx.showToast({
          title: '您已登录',
        })
        return
      }
      wx.navigateTo({
        url: '/pages/common_pages/login/login',
      })
    },

    // onBindMsg() {
    //   console.log('开启消息通知')
    //   wx.navigateTo({
    //     url: '/pages/jumpcommon/jumpcommon',
    //   })
    // }
  }
})
