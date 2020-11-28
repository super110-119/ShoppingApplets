// components/question/question.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    info: {
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
    itemChange(e){
      let that = this.properties
      let types = ''
      switch(that.info.state){
        case 0:
          types = '单选题';
          break;
        case 1:
          types = '多选题';
          break;
        case 2:
          types = '填空题';
          break;
      }
      let value = e.detail.value;
      value = typeof value === 'string' ? value.trim() : value
      let index = that.index;
      let obj = {};
      obj.value = value;
      obj.index = index;
      obj.cursor = e.detail.cursor || '';
      obj.title = that.info.titles;
      obj.types = types
      // console.log(obj); 
      this.triggerEvent('userChangeInfo', obj, {})
    }
  }
})
