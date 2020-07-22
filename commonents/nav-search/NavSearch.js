// commonents/nav-search/NavSearch.js
Component({
  properties: {
    path: {
      type: String,
      value: "/pages/home/home"
    }
  },
  onShareAppMessage: () => {
    return {
      title: "首页分享",
      path: this.properties.path
    }
  },
  methods: {
    navSearchClick(){
      this.triggerEvent('navSearchClick', {}, {})
    }
  }
})
