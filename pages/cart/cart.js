// pages/cart/cart.js
import {
  getMessage
} from '../../local/index.js'
import {
  deteleCommodity,
  activeLength,
  setMes,
  checkedAll,
  isAlls,
  isprices
} from './tool/index.js'

Page({
  data: {
    userObj: {},
    shopList: [],

    isActive: false,
    prices: 0.00,
    isNum: 0
  },
  /**
   * 生命周期函数--监听页面显示
   * 利用缓存获取购物车数据
   */
  onShow: function () {
    const that = this
    getMessage()
      .then(res => {
        const obj = res.data
        that.setData({
          userObj: obj,
          shopList: obj.shopList
        })
      })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    setMes(this.data.userObj, this.data.shopList)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 自定义事件-------------------
  // 点击删除按钮
  deleteClick(){
    const data = this.data.shopList
    const that = this
    let i = activeLength(data)
    if(i === 0){
      wx.showToast({title: "暂无选中商品", image: "/assets/img/toast/warning.png"})
      return
    }
    wx.showModal({
      title: '删除操作',
      content: '请问您是否要删除这' + i + '件商品',
      // 回调函数
      success (res) {
        // 确认删除
        if (res.confirm) {
          // 获取操作后的数组
          let newArr = deteleCommodity(data)
          // 重新赋值
          that.setData({
            shopList: newArr
          }) 
          // 提示删除成功信息
          wx.showToast({title: "删除成功"})
          // 修改本地存储数据
          setMes(that.data.userObj, that.data.shopList)
        } 
      }
    })
    /* */
  },

  // 点击首页，页面跳转
  goHome(){
    wx.switchTab({
      url: '/pages/home/home'
    })
  },

  // 点击选择按钮
  iconClick(e){
    // 控制前面小按钮的
    const i = e.detail.index
    const arr = this.data.shopList
    arr[i].affirm = !arr[i].affirm
    this.setData({
      shopList: arr
    })
    // 检查是否所有按钮均为选中
    let all = isAlls(arr)
    if(all === -1){
      this.setData({
        isActive: true
      })
    }else{
      this.setData({
        isActive: false
      })
    }
    // 计算选中的价格 和 计算选中商品数量
    let num = isprices(arr)
    let index = activeLength(arr)
    this.setData({
      prices: num,
      isNum: index
    })
  },

  // 点击全选/全不选按钮
  clickALL(e){
    const data = this.data.shopList
    const isActive = e.detail.isActive
    let arr = checkedAll(isActive, data)
    this.setData({
      shopList: arr
    })
  }
  
})