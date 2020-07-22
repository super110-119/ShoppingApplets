// 导出存储数据函数
export function setMessage(data, key = 'userMessage'){
  return new Promise((resolve, reject) => {
    wx.setStorage({
      data: data,
      key: key,
      success: resolve,
      fail: reject
    })
  })
}
// 导出读取数据函数
export function getMessage(key = 'userMessage'){
  return new Promise((resovle, reject) => {
    wx.getStorage({
      key: key,
      success: resovle,
      fail: reject
    })
  })
}
// 导出初始化数据
export function userMessage(){
  const obj = {}
  obj.username = ''
  obj.passworld = ''
  obj.login = false
  obj.shopList = []
  return obj
}

