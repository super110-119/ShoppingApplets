import {setMessage} from '../../../local/index.js'
// 删除选中商品
export let deteleCommodity = list => {
  let i = list.findIndex((valve, index) => valve.affirm)
  if(i >= 0){
    list.splice(i, 1)
    deteleCommodity(list)
  }
  return list
}
// 获取选中商品个数
export let activeLength = list => {
  let i = 0
  for(let value of list){
    if(value.affirm){
      i++
    }
  }
  return i
}
// 导出修改数据函数
export let setMes = (obj, arr) => {
  obj.shopList = arr
  setMessage(obj)
}
// 导出全选/全不选
export let checkedAll = (isRight, list) => {
  if(isRight){
    for(let i of list){
      i.affirm = true
    }
  }else{
    for(let i of list){
      i.affirm = false
    }
  }
  return list
}
// 查看是否全部被勾选
export let isAlls = (data) => {
  let i = data.findIndex((valve, index) => !valve.affirm)
  return i
}
// 计算所有选中的价格
export let isprices = data => {
  let num = 0;
  for(let i of data){
    if(i.affirm){
      num += i.price * i.num
    }
  }
  num = num.toFixed(2)
  return num
}

