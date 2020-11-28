// pages/home/h-compontent/class-list/class-item/class-item.js
let {timeFormat} = require("../../../../../utils/getTime")

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mes: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isBeing: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  
  /*组件生命周期*/ 
  lifetimes: {
    ready() {
      let mes = this.properties.mes.classPhase
      // console.log(this.properties.mes.classPhase);
      this.setData({
        isBeing: mes
      })
    }
  }
})
