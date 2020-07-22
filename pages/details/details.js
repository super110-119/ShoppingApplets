// pages/details/details.js
import {  
  getGoodsItemData,
  recommendData,
  titleData,
  shopData
} from "../../network/details.js"

import {
  getMessage,
  setMessage
} from '../../local/index.js'

Page({
  data: {
    iid: '',
    banners: [],
    thisTitles: {},
    shoppings: {},
    imageData: {},
    InfiParams: {},
    rateItem: {},
    recommendData: [],
    isShopping: [],

    showTop: false,
    shopShow: true,
    isClick: false
  },
  onLoad: function (options) {
    // 请求数据开始加载
    wx.showLoading({
      title: '',
      mask: true
    })
    const iid = options.iid || "1lyp2vg"
    getGoodsItemData(iid)
      .then(res => {
        const data = res.data
        this.setData({
          // 修改 iid 的值
          iid: iid,
          // 获取轮播图数据
          banners: data.result.itemInfo.topImages,
          // 获取标题数据
          thisTitles: titleData(data.result),
          // 获取店铺信息
          shoppings: shopData(data.result),
          // 获取真实图片数据
          imageData: data.result.detailInfo.detailImage[0],
          // 获取商品参数
          InfiParams: data.result.itemParams,
          // 获取精选评论
          rateItem: data.result.rate.list[0],
          // 获取购物车数据
          isShoppping: data.result.skuInfo.skus
        })
      });
    recommendData()
      .then(res => {
        this.setData({
          recommendData: res.data.data.list
        })
        // 成功后取消加载
        wx.hideLoading()
      })

    // 定时器修改值
    setTimeout(() => {
      this.setData({
        isClick: true
      })
    }, 4500)
  },
    // 界面滚动
    onPageScroll(options){
      const demo = options.scrollTop >= 888
      if(demo != this.data.showTop){
        this.setData({
          showTop: demo
        })
      }
    },
    // 自定义事件--------------------------------
    // 购物车按钮被点击
    shopppingClick(){
      if(!this.data.isClick)
        return
      this.setData({
        shopShow: !this.data.shopShow
      })
    },
    // 确认加入购物车
    shopOkClick(e){
      // 存储提示函数
      function isToast(title){
        return wx.showToast({
          title: title,
          image: '/assets/img/toast/warning.png',
          mask: true
        })
      }
      // 获取需要添加的数据
      const obj = e.detail
      obj.iid = this.data.iid
      obj.affirm = false
      obj.title = this.data.thisTitles.titles
      // 获取缓存数据
      getMessage()
        .then(res => {
          const mes = res.data
          // 检查是否登录
          /* if(!res.data.login){
            isToast("请先登录！")
            return 
          } */
          // 添加数据
          mes.shopList.push(obj)
          // 重新赋值
          setMessage(mes)
          // 全局提示成功
          wx.showToast({
            title: '加入购物车成功',
            mask: true
          })
        })
        .catch(() => {
          isToast("加入购物车失败！")
        })
      // 隐藏该页面
      this.shopppingClick()
    }
})

