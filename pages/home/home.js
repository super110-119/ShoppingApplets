// pages/home/home.js
import { getMultidata, getGoodsdata } from "../../network/home.js"
 
Page({
  data: {
    banner: [],
    recommend: [],
    lists: ['流行', '新款', '精选'],
    goods: {
      "pop": { page: 0, list: [] },
      "new": { page: 0, list: [] },
      "sell": { page: 0, list: [] }
    },
    currentType: 'pop',
    showTop: false,
    isTop: 0
  },
  onLoad(options) {
    wx.showLoading({
      title: '',
      mask: true
    })
    // 获取轮播图，热门推荐，搜索的数据
    this._getMultidata()
    // 请求商品数据
    this._getGoodsdata('pop')
    this._getGoodsdata('new')
    this._getGoodsdata('sell')
  },
  // 页面加载后渲染的
  onShow(){
    wx.createSelectorQuery()
      .select("#h-tab-control")
      .boundingClientRect(rect => {
        this.setData({
          isTop: rect.top
        })
      }).exec();
  },
  // 用户点击分享
  onShareAppMessage(){
    return{
      title: "首页分享",  
      path: "/pages/home/home"
    }
  },
  // 用户滚动到底部
  onReachBottom(){
    // 请求新的数据 
    this._getGoodsdata(this.data.currentType)
  },
  // 界面滚动
  onPageScroll(options){
    const demo = options.scrollTop >= this.data.isTop
    if(demo != this.data.showTop){
      this.setData({
        showTop: demo
      })
    }
  },
// 网络请求--------------------------------------------
  _getMultidata(){
    getMultidata().then(res => {
        const banner = res.data.data.banner.list;
        const recommend = res.data.data.recommend.list;
        this.setData({
          banner, recommend
        })
      }).catch(err => console.log(err))
  },
  _getGoodsdata(type){
    // 查看当前为那种类型下
    const isthis = this.data.goods[type]
    // 请求页码
    const page = isthis.page + 1;
    getGoodsdata(type, page)
      .then(res => {
        // 定义获取请求到的数据
        const list = res.data.data.list
        // 零时变量操作
        const oldList = isthis.list
        oldList.push(...list)
        // 将数据添加到 goods 之中
        const thisType = `goods.${type}.list`
        const thisPage = `goods.${type}.page`
        this.setData({
          [thisType]: oldList,
          [thisPage]: page
        })
        wx.hideLoading()
      }).catch(err => console.log(err))
  },
// 自定义函数/方法-------------------------------------------
  consrolChenge(e){
    const arr = ['pop', 'new', 'sell']
    const i = e.detail.index
    this.setData({
      currentType: arr[i]
    })
  },
  navSearchClick(){
    wx.navigateTo({
        url: '/pages/seek/seek'
    })
  }
})

