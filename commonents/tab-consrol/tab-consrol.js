// commonents/tab-consrol/tab-consrol.js
Component({
  properties: {
    lists: {
      type: Array,
      value: []
    }
  },
  data: {
    isActive: 0
  },
  methods: {
    isChenge(e){
      const index = e.currentTarget.dataset.index
      this.setData({
        isActive: index
      })
      this.triggerEvent("consrolChenge", {
        index,
        titles: this.properties.lists[index]
      }, {})
    }
  }
})
