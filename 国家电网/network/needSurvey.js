let {ajax, baseURL, httpHead2, fileHttp, setMustMsg } = require("./index");
// 获取需求调查列表
async function getNeedSurvey(){
  return await ajax({
    // url: "http://192.168.1.12:8280/api/voteInfo.action?m=getPage",
    url: httpHead2 + "api/voteInfo.action?m=getPage",
    data: { ...setMustMsg() }
  })
}
// 获取需求详情
async function getNeedDetail(voteId){
  return await ajax({
    url: httpHead2 + "api/voteInfo.action?m=getDetail",
    data: { voteId, ...setMustMsg() }
  })
}
// 提交用户答案
async function setMesOut(voteId, userAnswerJson){
  return await ajax({
    // url: "http:192.168.1.12:8280/api/voteInfo.action?m=saveUserAnswer",
    url: httpHead2 + "api/voteInfo.action?m=saveUserAnswer",
    data: { voteId, userAnswerJson: JSON.stringify(userAnswerJson), ...setMustMsg() }
  })
}
module.exports = {
  getNeedSurvey, getNeedDetail, setMesOut
}