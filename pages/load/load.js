// pages/load/load.js
const { $Toast } = require('../../commonents/dist/base/index');
import {
  setMessage,
  getMessage
} from '../../local/index.js'

Page({
  data: {
    text: '',
    pas1: true,
    pas2: true,

    uname: '',
    pas: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  pasClick1(){
    this.setData({
      pas1: !this.data.pas1
    })
  },
  pasClick2(){
    this.setData({
      pas2: !this.data.pas2
    })
  },
  loginForm(data){
    // 获取用户输入内容
    let uname = data.detail.value.username
    let pas1 = data.detail.value.pas1
    let pas2 = data.detail.value.pas2
    // 区除两边空格
    uname = uname.trim()
    pas1 = pas1.trim()
    pas2 = pas2.trim()
    // 用户名检查（赋值）
    if(uname){
      this.setData({
        uname: uname
      })
    }else{
      $Toast({
        content: '请输入用户名',
        type: 'warning'
     });
     return
    }
    // 密码检查（赋值）
    if(pas1 && pas2){
      if(pas1.length >= 6 && pas1.length <= 18){
        if(pas1 === pas2){
          this.setData({
            pas: pas1
          })
        }else{
          $Toast({
            content: '两次密码不一致',
            type: 'warning'
          });
          return
        }
      }else{
        $Toast({
          content: '密码在 6-18 位之间',
          type: 'warning'
        });
        return
      }
    }else{
      $Toast({
        content: '密码不能为空',
        type: 'warning'
      });
      return
    }
    // 读取数据
    getMessage()
      .then(res => {
        let obj = {}
        obj = res.data
        obj.username = this.data.uname
        obj.passworld = this.data.pas
        obj.load = true
        setMessage(obj)
          .then(() => {
            $Toast({
              content: '登录成功',
              type: 'success'
          });
            wx.switchTab({
              url: '/pages/profile/profile'
            })
          })
      })
  }
  
})
