// pages/classify/classify.js
import {
  getClassifyData,
  getClassifyMessage
} from '../../network/classify.js'
 
Page({
  data: {
    maitKey: 3627,
    miniWallkey: 10062603,
    type: 'pop',
    mesList: [],
    isActive: 0,
    classifyGoods: [],
    isShow: false,
    lists: ['流行', '精选', '新款']
  },
  onLoad: function (options) {
    getClassifyData()
      .then(res => {
        const lists = res.data.data.category.list
        console.log(lists)
        this.setData({
          mesList: lists
        })
      })
    getClassifyMessage(
      this.data.maitKey,
      this.data.miniWallkey,
      this.data.type
    ).then(res => {
      console.log(res.data)
      this.setData({
        classifyGoods: res.data
      })
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 自定义事件-----------------------
  itemClick(e){
    const i = e.detail.i
    this.setData({
      isActive: i,
      maitKey: this.data.mesList[i].maitKey,
      miniWallkey: this.data.mesList[i].miniWallkey
    })
    wx.showToast({
      title: "已改为：" + this.data.mesList[this.data.isActive].title
    })
    getClassifyMessage(
      this.data.maitKey,
      this.data.miniWallkey,
      this.data.type
    ).then(res => {
      console.log(res.data)
      this.setData({
        classifyGoods: res.data
      })
    })
  },
  consrolChenge(e){
    const i = e.detail.index
    let demo = ''
    if(i === 0){
      demo = 'pop'
    }else if(i === 1){
      demo = 'new'
    }else{
      demo = 'sell'
    }
    this.setData({
      type: demo
    })
    getClassifyMessage(
      this.data.maitKey,
      this.data.miniWallkey,
      this.data.type
    ).then(res => {
      console.log(res.data)
      this.setData({
        classifyGoods: res.data
      })
    })
  }

})