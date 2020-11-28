// 获取/修改我的班级的班级课表信息
let {timeFormat} = require("../utils/getTime")
// 标题信息
function getHeaderMag(mes){
  mes = mes.data.data.elnClass
  let obj = {}
  obj.titles = mes.className || '暂无'
  obj.beginTime = timeFormat(mes.beginTime, 'yyyy/mm/dd')
  obj.endTime = timeFormat(mes.endTime, 'yyyy/mm/dd')
  obj.address = mes.address || '待定'
  obj.classId = mes.classId
  obj.classPhase = mes.classPhase
  return obj
}
// 课表信息
function getClassList(data){
  data = data.data.data;
  let arr = []
  for(let i=0; i<data.elnCourseList.length; i++){
    let obj = {};
    obj.time = timeFormat(data.elnClassUser.createTime, 'yyyy年mm月dd日');
    obj.titles = data.elnCourseList[i].courseTitle || '暂无'
    obj.open = true
    obj.msglist = []
    let obj_s = {}
    obj_s.titles = data.elnCourseList[i].courseTitle || '暂无'
    obj_s.name = data.elnCourseList[i] && data.elnCourseList[i].teacherName || '暂无'
    obj_s.courseId = data.elnCourseList[i].courseId || '暂无'
    obj_s.addresss = data.elnCourseList[i].address || '暂无'
    obj_s.isTime = timeFormat(data.elnCourseList[i].beginTime, 'yyyy/mm/dd') + " ~ " + timeFormat(data.elnCourseList[i].endTime, 'yyyy/mm/dd')
    obj.msglist.push(obj_s)
    arr.push(obj)
  }
  return arr
}
// 考试信息
function getExamList(data){
  data = data.data.data.examInfoList;
  let arr = []
  for(let item of data){
    let obj = {}
    obj.titles = item.examTitle
    obj.examId = item.examId
    obj.onTime = timeFormat(item.startTime)
    obj.outTime = timeFormat(item.endTime)
    let state;
    if(item.phase === 'A'){
      state = 1
    }else if(item.phase === 'B'){
      state = 0
    }else if(item.phase === 'C'){
      state = 2
    }
    obj.state = state
    obj.cuccess = item.isCompleted === 'N' ? true : false
    obj.btnText = '开始考试'
    arr.push(obj)
  }
  return arr
}
// 签到信息
function getClassSignAll(data){
  data = data.data.data.list;
  let arr = []
  for(let item of data){
    let obj = {}
    obj.timer = timeFormat(item.signDate || item.createTime)
    obj.where = item.address
    obj.isOk = item.signDate > item.endTime ? false : true
    arr.push(obj)
  }
  return arr
}
// 评估信息
function getEvaluateList(data){
  data = data.data.data.list;
  let arr = []
  for(let item of data){
    let obj = {}
    obj.titles = item.projectTitle
    obj.evaluateId = item.evaluateId
    obj.projectId = item.projectId
    obj.onTime = timeFormat(item.beginTime)
    obj.outTime = timeFormat(item.endTime)
    let state;
    if(item.phase == 'C'){
      state = 2
    }else if(item.phase == 'B'){
      state = 0
    }else{
      state = 1
    }
    obj.state = state
    obj.cuccess = item.isEvaluated === 'N' ? true : false
    obj.btnText = '开始评估'
    arr.push(obj)
  }
  return arr
}
module.exports = {
  getHeaderMag, getClassList, getExamList, getClassSignAll, getEvaluateList
}