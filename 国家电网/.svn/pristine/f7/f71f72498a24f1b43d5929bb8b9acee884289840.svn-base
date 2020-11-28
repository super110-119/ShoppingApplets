// common/list-bar/list-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mes: {
      type: Array,
      value: []
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
    itemClick(e){
      let i = e.currentTarget.dataset.index;
      this.triggerEvent("listBarClick", {
        index: i,
        title: this.properties.mes[i].title
      }, {})
    }
  }
})
