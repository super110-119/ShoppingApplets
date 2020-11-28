/*
 * JS 时间格式化
 * type 时间格式（yyyy-mm-dd hh:ii:ss / mm-dd / hh:ii / yyyy-mm）可自定义
 * date 毫秒时间戳（1554954127000）
 * 使用：timeFormat('yyyy-mm-dd hh:ii:ss',1554954127000)
 * 说明：紧支持毫秒级时间戳，传统秒级 Unix 时间戳需要乘以 1000 转换为毫秒
 */
function timeFormat(date, type){
	//type = type || 'yyyy/mm/dd hh:ii:ss'
	type = type || 'yyyy-mm-dd hh:ii'	
	var date = new Date(date);
	var o = {   
		"m+" : date.getMonth()+1,	//月份   
		"d+" : date.getDate(),		//日   
		"h+" : date.getHours(),		//小时   
		"i+" : date.getMinutes(),	//分   
		"s+" : date.getSeconds(),	//秒   
	};   
	if(/(y+)/.test(type)){
		type=type.replace(RegExp.$1,(date.getFullYear()+"").substr(4-RegExp.$1.length)); 
	};    
	for(var k in o){
		if(new RegExp("("+ k +")").test(type)){
			type=type.replace(RegExp.$1,(RegExp.$1.length==1)?(o[k]):(("00"+ o[k]).substr((""+o[k]).length))); 
		}; 
	}
	return type; 
}

module.exports = {
  timeFormat
}
