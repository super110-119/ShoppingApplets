import ajax from "./index.js"

export function getMultidata(){
  return ajax({
    url: "/home/multidata"
  })
}

const baseURL = "/api/z8"
export function getGoodsdata(type, page){
  return ajax({
    url: baseURL + "/home/data",
    data: {
      type, page
    }
  })
}