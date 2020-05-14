import Vue from 'vue';
import { vIf, vAnd } from './lang.js';

/**
 * 调用的是时候第一个参数是我们定义的数据列，第二个参数是我们查询参数
 * 但是查询参数一定要包括server的beanid（即@Service(beanId)）和method的名字（即我们具体在server调用那个）
 */

//参数格式化
function getParam(obj) {
	var temp = '';
	for (var key of Object.keys(obj)) {
		temp += key + '=' + encodeURIComponent(obj[key]) + '&';
	}
	return temp.substr(0, temp.length - 1);
}

//表头
function getAllColsStr(allCols) {
	return JSON.stringify(allCols);
}

//导出Excel
const exportExcel = (allCols, queryParams) => {
	var param = 'tableHeaderInfo=' + encodeURIComponent(getAllColsStr(allCols)) + '&' + getParam(queryParams) + '&exportFileType=EXCEL';
	var url = Vue.prototype.$base_report_exp_url + '/report/exportFile?' + param;
	window.location.href = url;
}

//导出PDF
const exportPDF = (allCols, queryParams) => {
	var param = 'tableHeaderInfo=' + encodeURIComponent(getAllColsStr(allCols)) + '&' + getParam(queryParams) + '&exportFileType=PDF';
	var param = param + '&pageSize=A4'
	var url = Vue.prototype.$base_report_exp_url + '/report/exportFile?' + param;
	window.location.href = url;
}

//导出Word
const exportWord = (allCols, queryParams) => {
	var param = 'tableHeaderInfo=' + encodeURIComponent(getAllColsStr(allCols)) + '&' + getParam(queryParams) + '&exportFileType=WORD';
	var url = Vue.prototype.$base_report_exp_url + '/report/exportFile?' + param;
	window.location.href = url;
}

//导出CSV
const exportCSV = (allCols, queryParams) => {
	var param = 'tableHeaderInfo=' + encodeURIComponent(getAllColsStr(allCols)) + '&' + getParam(queryParams) + '&exportFileType=CSV';
	var url = Vue.prototype.$base_report_exp_url + '/report/exportFile?' + param;
	window.location.href = url;
}

//带第三方地址接口的导出Excel
const exportExcelWithUrl = (allCols, queryParams, urlSearch) => {
	var param = 'tableHeaderInfo=' + encodeURIComponent(getAllColsStr(allCols)) + '&' + getParam(urlSearch) + '&exportFileType=EXCEL';
	var url = Vue.prototype.$base_report_exp_url + '/report/exportFile?' + param;
	url = url + '&urlSearchParams=' + encodeURIComponent(JSON.stringify(queryParams));
	window.location.href = url;
}

//带第三方地址接口的导出PDF
const exportPDFWithUrl = (allCols, queryParams, urlSearch) => {
	var param = 'tableHeaderInfo=' + encodeURIComponent(getAllColsStr(allCols)) + '&' + getParam(urlSearch) + '&exportFileType=PDF';
	var param = param + '&pageSize=A4'
	var url = Vue.prototype.$base_report_exp_url + '/report/exportFile?' + param;
	url = url + '&urlSearchParams=' + encodeURIComponent(JSON.stringify(queryParams));
	window.location.href = url;
}

//带第三方地址接口的导出Word
const exportWordWithUrl = (allCols, queryParams, urlSearch) => {
	var param = 'tableHeaderInfo=' + encodeURIComponent(getAllColsStr(allCols)) + '&' + getParam(urlSearch) + '&exportFileType=WORD';
	var url = Vue.prototype.$base_report_exp_url + '/report/exportFile?' + param;
	url = url + '&urlSearchParams=' + encodeURIComponent(JSON.stringify(queryParams));
	window.location.href = url;
}

//带第三方地址接口的导出CSV
const exportCSVWithUrl = (allCols, queryParams, urlSearch) => {
	var param = 'tableHeaderInfo=' + encodeURIComponent(getAllColsStr(allCols)) + '&' + getParam(urlSearch) + '&exportFileType=CSV';
	var url = Vue.prototype.$base_report_exp_url + '/report/exportFile?' + param;
	url = url + '&urlSearchParams=' + encodeURIComponent(JSON.stringify(queryParams));
	window.location.href = url;
}
const  checkStartAndEndPage=(data,startPage,endPage,pagesize)=>{
	var reg = /^[0-9]*[1-9][0-9]*$/;
	vIf(vAnd(startPage==="", endPage===""), () => {
		return null;
	})
	if(!reg.test(startPage)){
		return "开始页必须是大于0的整数";
	}else if(Number(startPage)>Math.ceil(data.length/Number(pagesize))){
		return "开始页不能大于总页数";
	}else if(endPage!=="" && Number(endPage)<Number(startPage)){
		return "开始页不能大于结束页";
	}

	if(!reg.test(endPage)){
		return "结束页必须是大于0的整数";
	}else if(Number(endPage)>Math.ceil(data.length/Number(pagesize))){
		return "结束页不能大于总页数";
	} else if(vAnd(endPage!=="", Number(endPage)<Number(startPage))){
		return "结束页不能小于开始页";
	}
	return null;
}

export {
	exportExcel,
	exportPDF,
	exportWord,
	exportCSV,
	exportExcelWithUrl,
	exportPDFWithUrl,
	exportWordWithUrl,
	exportCSVWithUrl,
	checkStartAndEndPage
}
