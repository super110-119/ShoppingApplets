function getNewList(arr1, arr2){
  let arr = []
  // 比较用户的答案与题目进行修改
  for(let i=0; i<arr2.length; i++){
    let objs = {}
    // 获取用户选择的答案、分为单选/多选
    let arr1ItemId = arr1[i].itemId;
    let itemList1 = []
    let voteSubject1 = {}
    // 如果不为多选
    if(arr2[i].voteSubject.subjectType === "signle" || arr2[i].voteSubject.subjectType === "ask"){
      for(let value of arr2[i].itemList){
        let obj = {};
        obj.isCustomerItem = value.isCustomerItem;
        obj.isSelected = value.itemId === arr1ItemId ? "Y" : "N";
        obj.itemId = value.itemId
        obj.subjectId = value.subjectId
        itemList1.push(obj)
      }
    // 表示为多选
    }else{
      let arr123 = arr2[i].itemList
      for(let value of arr123){
        let abc = arr1ItemId.indexOf(value.itemId)
        if(abc >= 0){
          arr123[abc].isSelected = "Y"
        }
        itemList1 = arr123
      }
    }
    // 修改标题部分的 answerContent/subjectType/subjectId 与用户已做的状态 - isAnswered
    voteSubject1.answerContent = arr1[i].answerContent
    voteSubject1.subjectType = arr1[i].subjectType
    voteSubject1.subjectId = arr1[i].subjectId
    voteSubject1.isAnswered = "Y"
    // 加入到 objs 对象中
    objs.itemList = itemList1
    objs.voteSubject = voteSubject1
    // 将对象加入数组中
    arr.push(objs)
  }
  return arr
}

module.exports = {
  getNewList
}
