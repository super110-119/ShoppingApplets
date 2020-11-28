let {ajax, baseURL, httpHead2, setMustMsg} = require("./index")
// 获取全部培训班
async function getHomeMes(pageNo, pageSize = 5){
  return await ajax({
    // url: `http://192.168.1.10:8280/api/elnClass.action?m=getPage`,
    url: `${httpHead2}api/elnClass.action?m=getPage`,
    data: { pageSize, pageNo, ...setMustMsg() }
  })
}
// 获取培训班详情- -课程
async function getClassMes(classId){
  return await ajax({
    // url: `http://192.168.1.7:8280/api/elnClass.action?m=getDetailEx`,
    url: `${httpHead2}api/elnClass.action?m=getDetailEx`,
    data: { classId, ...setMustMsg() }
  })
}

//获取培训班下载文件
async function getFilePath(resourceId){
  return await ajax({
    url: `${httpHead2}api/resResource.action?m=download`,    
    data: {resourceId, ...setMustMsg()}
  })
}

//获取培训班下载文件
async function getSignObject(classId){
  return await ajax({
    url: `${httpHead2}api/elnSign.action?m=getClassSignAll`,    
    data: {classId, ...setMustMsg()}
  })
}

module.exports = {
  getHomeMes, getClassMes, getFilePath, getSignObject
}
