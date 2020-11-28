function getInfo(event, array) {
  let msg = event.detail
  for(let item of array){
    if(item.index === msg.index){
      item.value = msg.value;
      item.index = msg.index;
      item.cursor = msg.cursor;
      item.types = msg.types;
      item.title = msg.title;
      return array
    }
  }
  array.push(msg)
  return array
}
module.exports = {
  getInfo
}