function toJson(mes){
  let arr = []
  mes.forEach((value, index) => {
    let obj = {}
    obj.itemId = value.itemId
    obj.ansuerContent = value.ansuerContent
    obj.subjectId = value.subjectId
    obj.subjectType = value.subjectType
    arr.push(obj)
  })
  return arr
}
module.exports = {
  toJson
}