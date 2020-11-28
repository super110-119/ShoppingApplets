function getInfo(event, array) {
  // 对题目数据进行处理
  let msg = event.detail
  for(let item of array){
    // 如果用户是修改那么重新赋值
    if(item.index === msg.index){
      item.itemId = msg.itemId;
      item.answerContent = msg.answerContent;
      item.subjectId = msg.subjectId;
      item.index = msg.index;
      item.title = msg.title;
      item.subjectType = msg.subjectType
      item.isAnswered = msg.isAnswered
      return array
    }
  }
  // 否则直接添加
  array.push(msg)
  return array
}
module.exports = {
  getInfo
}