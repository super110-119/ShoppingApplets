// pages/profile/p-compontent/option/option.js
let app = getApp()
let httpHead = app.globalData.httpHead2

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mes: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    switchChecked: false
  },

  // 监听数据绑定变化
  observers: {
    'mes': function(){
      //查询用户是否被绑定
      this.setData({switchChecked: this.properties.mes.isOpenWxmsg === 'Y' ? true : false})
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemClick(){
      this.triggerEvent("optionItemClick", {}, {})
    },
    switchChange(){
      let a = this.data.switchChecked
      wx.showModal({
        content: this.data.switchChecked ? '关闭通知后，将无法在公众号上接收消息':'开启消息通知后，每次消息都将会在公众号中通知',
        success: res => {
          if(res.confirm){
            console.log('用户点击确定')
            if(!a){
              wx.navigateTo({
                url: '/pages/jumpcommon/jumpcommon',
              })
              this.setData({switchChecked: !a})
            }else{
              //调用取消绑定接口
              wx.showLoading({
                title: '解绑中…',
                mask: true
              })
              let userinfo = app.globalData.userMessage
              wx.request({
                url: httpHead + '/api/frontUser.action?m=closeNotifyWeixin',
                header: {
                  'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
                data: {
                  coopCode: userinfo.frontUser.coopCode,
                  accessToken: userinfo.accessToken,
                  frontUserId: userinfo.frontUser.frontUserId
                },
                success: res => {
                  console.log(res)
                  if(res.data.ret == '0'){
                    this.setData({switchChecked: !a})
                    wx.showToast({
                      title: '解绑成功',
                      icon: 'none'
                    })
                  }else{
                    wx.hideLoading()
                    wx.showModal({
                      title: '提示',
                      content: res.data.msg,
                      showCancel: false
                    })
                  }
                }
              })
            }
          }else if(res.cancel) {
            console.log('用户点击取消')
            this.setData({switchChecked: a})
          }
        }
      })

    }
  }
})
