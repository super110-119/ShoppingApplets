//接口前端部分URL，方便修改地址域名
var httpHead = 'http://192.168.1.12:8280/api/'
var fileHead = 'https://file.51eln.com'
//var httpHead = 'https://api.pomesoft.com/sems-api/'

// 调用必传数据
function setMustMsg(){
  let datas = getApp().globalData.userInfo;
  let users = datas.frontUser;
  let obj = {
    coopCode: 'cloud',
    frontUserId: users.frontUserId,
    accessToken: datas.accessToken,
    nickname: users.nickname,
    headimgurl: users.headimgurl,
    orgId: users.orgId
  }
  return obj
}

/**
 * POST请求，
 * URL：接口,
 * mustMsg: 是否传递必要参数， bool类型
 * postData：参数，json类型
 * doSuccess：成功的回调函数
 * doFail：失败的回调函数
 */
function request(url, mustMsg, postData, doSuccess, doFail) {
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  if(mustMsg){
    postData = { ...postData, ...setMustMsg()}
  }
  console.log('传递的数据为=>', postData)
  wx.request({
    //项目的真正接口，通过字符串拼接方式实现
    url: httpHead + url,
    header: {
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    data: postData,
    method: 'POST',
    success: function (res) {
      //参数值为res.data,直接将返回的数据传入
      wx.hideLoading()
      doSuccess(res.data);
    },
    fail: function (res) {
      wx.hideLoading()
      console.log('接口异常')
      doFail(res);
    },
  })
}

//GET请求，不需传参，直接URL调用，
function getData(url, doSuccess, doFail) {
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  wx.request({
    url: host + url,
    header: {
      "content-type": "application/json;charset=UTF-8"
    },
    method: 'GET',
    success: function (res) {
      wx.hideLoading()
      doSuccess(res.data);
    },
    fail: function () {
      wx.hideLoading()
      doFail();
    },
  })
}

/**
 * module.exports用来导出代码
 * js文件中通过var call = require("../util/request.js")  加载
 */
module.exports = {
  httpHead: httpHead,
  request: request,
  getData: getData,
  fileHead: fileHead
}