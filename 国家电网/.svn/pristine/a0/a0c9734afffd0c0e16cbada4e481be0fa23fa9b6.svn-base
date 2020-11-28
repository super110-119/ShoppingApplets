// method/exam/exam.js
function getMoreString(arr){
  let mes = '';
  arr.forEach((value, index) => mes += mes + value)
  return mes
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {}
    },
    index: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    examMsg(e){
      let value = e.detail.value
      let answer = typeof value !== 'object' ? value.trim() : getMoreString(value)
      let index = this.properties.index;
      let itemId = this.properties.data.itemId
      let itemType = this.properties.data.itemType
      let score = this.properties.data.score
      let obj = {
        answer, index, itemId, itemType, score
      }
      this.triggerEvent("examGetMes", obj, {})
    }
  }
})
