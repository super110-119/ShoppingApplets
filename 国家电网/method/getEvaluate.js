// 用于获取评估页面分数
function getGrade(arr){
  let num = 0;
  for(let list of arr){
    for(let item of list.itemList){
      if(item.isSelected === "Y"){
        num += item.itemScore
      }
    }
  }
  return num
}
module.exports = {
  getGrade
}