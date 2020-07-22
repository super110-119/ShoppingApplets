// pages/details/dcpn/l-d-is-shop/l-d-is-shop.js
import {
  numToFlex
} from "../../../../tool/index.js"

Component({
  properties: {
    message: {
      type: Array,
      value: []
    }
  },
  data: {
    isShow: 0,
    num: 1,
    price: 0
  },
  ready(){
    setTimeout(() => {
      this.setData({
        price: numToFlex(this.properties.message[this.data.isShow].nowprice)
      })
    }, 4500)
  },
  methods: {
    numUp(){
      this.setData({
        num: this.data.num + 1
      })
    },
    numDown(){
      const num = this.data.num
      if(num <= 1)
        return
      this.setData({
        num: num - 1
      })
    },
    imgItemClick(e){
      const i = e.currentTarget.dataset.index
      this.setData({
        num: 1,
        isShow: i
      })
    },
    isOk(){
      const isThis = this.properties.message[this.data.isShow]
      const obj = {}
      obj.price = this.data.price
      obj.size = isThis.size
      obj.color = isThis.style
      obj.num = this.data.num
      obj.img = isThis.img
      this.triggerEvent("shopOkClick", obj, {})
    },
    isNo(){
      this.triggerEvent("userClickNo", {}, {})
    }
  }
})
