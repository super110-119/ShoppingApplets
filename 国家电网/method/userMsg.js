function getUserMes(app, fn, httpHead = 'https://api.pomesoft.com/sems-api/'){
  fn = fn || function(){}
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      const code = res.code
      wx.request({
        // url: 'http://192.168.1.12:8280/api/weixinOauthWxapp.action',
        url: httpHead + 'api/weixinOauthWxapp.action',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        data: {
          coopCode : 'chengde',
          appCode : 'chengde',
          code : code
        },
        method: 'post',
        success: res => {
          console.log('login=>',res)
          if(res.data == "" ||res.data.ret == '-1'){
            app.globalData.isError = res.data;
            wx.reLaunch({
              url: '../common_pages/login/login',
            })
          }else{
            app.globalData.userMessage = res.data.data;
            if(res.data.data.frontUser.isVisitor === 'Y'){
              wx.reLaunch({
                url: '../common_pages/login/login',
              })
            }else{
              fn()
            }
          }
        },
        fail: res => {
          console.log('登录接口访问失败')
          wx.showModal({
            title: '提示',
            content: '后台异常，请稍后操作或联系管理员',
            showCancel: false
          })
        }
      })
    }
  })
} 

module.exports = {
  getUserMes
}
