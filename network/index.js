const baseUrl = "http://152.136.185.210:8000"

export default function(options){
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + options.url,
      data: options.data || {},
      method: options.method || "get",
      timeout: options.timeout || 5000,
      success: resolve,
      fail: reject
    })
  })
}