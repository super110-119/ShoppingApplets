let {ajax, baseURL, httpHead2, fileHttp, setMustMsg } = require("./index");
// 获取签到信息
async function getSignIn(classId){
  return await ajax({
    url: `${httpHead2}api/elnSign.action?m=getClassSignAll`,
    data: { classId, ...setMustMsg() }
  })
}
// 获取培训班下面评估信息
async function getClassEvaluate(classId){
  return await ajax({
    // url: `http://192.168.1.7:8280/api/elnClass.action?m=getClassEvaluateAll`,
    url: `${httpHead2}api/elnClass.action?m=getClassEvaluateAll`,
    data: { classId, ...setMustMsg() }
  })
}
// 用户签到
async function toSign(classId, signId) {
  return await ajax({
    url: `${httpHead2}api/elnSignLog.action?m=saveClassSign`,
    data: { classId, signId, ...setMustMsg() }
  })
}

module.exports = {
  getSignIn, getClassEvaluate, toSign
}