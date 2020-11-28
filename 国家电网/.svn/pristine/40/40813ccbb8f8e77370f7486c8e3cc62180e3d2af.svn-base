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
      // 表示题目值
      let value = e.detail.value;
      // 获取 value 信息
      value = typeof value === 'string' ? value.trim() : value
      // 获取当前题目下标
      let index = that.index;
      let obj = {};
      // 获取用户选择选项的 id
      obj.itemId = that.info.subjectType === 'ask' ? '' : value;
      // 获取用户输入内容（在问答题有用）
      obj.answerContent = that.info.subjectType === 'ask' ? value : '';
      // 获取题目 id
      obj.subjectId = that.info.listId;
      // 获取下标
      obj.index = index;
      // 修改当前题目为已做
      obj.isAnswered = "Y"
      // 返回题目标题
      obj.title = that.info.titles;
      // 返回题目类型
      obj.subjectType = that.info.subjectType;
      // 返回到外面
      this.triggerEvent('userChangeInfo', obj, {})
    }
  }
})
