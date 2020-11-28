//定义常量
const httpHead2 = "https://api.pomesoft.com/sems-api/";
const httpHead = "http://192.168.1.12:8280/";
// const httpHead2 = "http://192.168.1.12:8280/";
const appId = "wxd4b642d1daf94b09";
var userMessage = null;

var isError = null;

let demo = function(){}
let {getUserMes} = require("./method/userMsg")

//app.js
App({
  onLaunch: function () {
    // 检查小程序版本
    wx.getUpdateManager();
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    getUserMes(this)
  },
  // 修改用户信息
  changeMes(obj){
    userMessage = obj
  },
  globalData: {
    userInfo: null,
    httpHead,
    httpHead2,
    isError,
    appId,
    // openId : openId,
    userMessage
  }
})