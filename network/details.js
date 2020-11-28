import ajax from './index.js'
const baseURL = "/api/z8"
export function getGoodsItemData(iid){
  return ajax({
    url: baseURL + "/detail",
    data: {iid }
  })
}
export function recommendData(){
  return ajax({
    url: baseURL + "/recommend"
  })
}


// 使用函数导出标题等数据信息
export function titleData(data){
  const obj = {}
  obj.titles = data.itemInfo.title
  obj.dp = data.shopInfo.name
  obj.price = data.itemInfo.price
  obj.oldprice = data.itemInfo.oldPrice
  obj.discountDesc = data.itemInfo.discountDesc
  obj.columns = data.columns
  obj.desc = data.detailInfo.desc
  obj.services = data.shopInfo.services
  return obj
}
// 导出店铺信息
export function shopData(data){
  const obj = {}
  obj.name = data.shopInfo.name
  obj.logos = data.shopInfo.shopLogo
  obj.sell = data.shopInfo.cSells
  obj.gooods = data.shopInfo.cGoods
  obj.score = data.shopInfo.score
  obj.desc = data.detailInfo.desc
  return obj
}



