export function numToFlex(mes, num = 2){
  const value = parseFloat(mes)
  const zz = / + \. + /
  if(zz.test(value)){
    return value.toFixed(num)
  }else{
    return (value / 100).toFixed(num)
  }

}