import ajax from "./index.js"
const baseURL = "/api/z8"

export function getClassifyData(){
  return ajax({
    url: baseURL + "/category"
  })
}

export function getClassifyMessage(maitKey, miniWallkey, type){
  return ajax({
    url: baseURL + "/subcategory/detail",
    data: {
      maitKey, miniWallkey, type
    }
  })
}