const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
}


const timeCompare = (date,type) => {
  type = type || false
	var setdate = new Date(date);
	var nowdate = new Date();
	if(setdate.getFullYear()==nowdate.getFullYear() && (setdate.getMonth()+1)==(nowdate.getMonth()+1) && setdate.getDate()==nowdate.getDate()){
    var timer = '今天 '+[setdate.getHours(), setdate.getMinutes()].map(formatNumber).join(':')
		return timer
	}else if(type){
    return [setdate.getFullYear(), setdate.getMonth()+1, setdate.getDate()].map(formatNumber).join('-') + ' ' + [setdate.getHours(), setdate.getMinutes()].map(formatNumber).join(':')
  }else{
    return [setdate.getHours(), setdate.getMinutes()].map(formatNumber).join(':')
  }
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  timeCompare: timeCompare
}
