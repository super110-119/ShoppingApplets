import {
  setMessage,
  getMessage,
  userMessage
} from './local/index.js'
App({
  onLaunch(){
    getMessage()
      .catch(() => {
        console.log("即将准备存储数据中...")
        setMessage(userMessage())
      })
  }
})
