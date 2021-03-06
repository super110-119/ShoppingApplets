// pages/mDetail/MDComponent/MDComponent.js
import { timeFormat } from '../../../utils/getTime'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    message: {
      type: Object,
      value: {},
      observer: function(newValue){
        newValue.time = timeFormat(newValue.time, 'mm-dd hh:ii')
        this.setData({
          msg: newValue
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    msg: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
