let app = getApp()
module.exports = {
  // 导出封装的网络请求
  ajax(obj){
    return new Promise((resolve, reject) => {
      wx.request({
        url: obj.url,
        data: obj.data || {},
        timeout: obj.timeout || 6000,
        // method: obj.method || 'get',
        method: obj.method || 'post',
        // header: obj.header || {"content-type": "application/json"},
        header: obj.header || {"content-type": "application/x-www-form-urlencoded;charset=UTF-8"},
        dataType: obj.dataType || "json",
        success: resolve,
        fail: reject
      })
    })
  },
  // 导出必传数据
  setMustMsg(){
    let datas = app.globalData.userMessage;
    let users = datas.frontUser
    let obj = {
      coopCode: 'chengde',
      frontUserId: users.frontUserId,
      accessToken: datas.accessToken,
      nickname: users.nickname,
      headimgurl: users.headimgurl,
      orgId: users.orgId
    }
    return obj
  },
  // 导出 url
  // baseURL: "http://api.pomesoft.com/sems-api/",
  // httpHead2 : "http://192.168.1.12:8280/",
  httpHead2: "https://api.pomesoft.com/sems-api/",
  baseURL : "http://192.168.1.10:8280/",
  fileHttp: 'http://file.51eln.com'
}