let {ajax, baseURL, httpHead2, fileHttp, setMustMsg } = require("./index");
// 设置用户报名培训班
async function getClassApply(classId){
  return await ajax({
    // url: "http://192.168.1.10:8280/api/elnClassUser.action?m=insert",
    url: httpHead2 + "api/elnClassUser.action?m=insert",
    data: { classId, ...setMustMsg() }
  })
}
// 设置查看考试详情
async function getExamUserDetaiL(examId){
  return await ajax({
    url: httpHead2 + "api/examUserDetail.action?m=beginExam",
    data: { examId, ...setMustMsg() }
  })
}
// 设置请求评估详情
async function getEvaluateInfo(evaluateId){
  return await ajax({
    url: httpHead2 + "api/evaluateInfo.action?m=getDetail",
    data: { evaluateId, ...setMustMsg() }
  })
}
// 提交考试答案
async function getExamUserDetails(examId, detailId, userAnswerJson){
  return await ajax({
    // url: "http:192.168.1.12:8280/api/examUserDetail.action?m=submitExamPaper",
    url: httpHead2 + "api/examUserDetail.action?m=submitExamPaper",
    data: { examId, detailId, userAnswerJson: JSON.stringify(userAnswerJson), ...setMustMsg() },
    header: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    method: "post"
  })
}
// 提交评估答案
async function getEvaluateProject(projectId, userAnswerJson){
  return await ajax({
    url: httpHead2 + "api/evaluateProject.action?m=saveUserAnswer",
    data: { projectId, userAnswerJson: JSON.stringify(userAnswerJson), ...setMustMsg() },
    header: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    method: "post"
  })
}
module.exports = {
  getClassApply, getEvaluateInfo, getExamUserDetaiL, getExamUserDetails, getEvaluateProject
}