import {
  setMessage,
  getMessage,
  userMessage
} from './local/index.js'
App({
  onLaunch(){
    let value = wx.getStorageSync('userMessage')
    if(!value){
      let obj = userMessage()
      wx.setStorageSync('userMessage', obj)
    }
  }
})
