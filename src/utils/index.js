import { vIf, vOr, vAnd} from './lang.js';

// 时间格式化
const formatTime = (date, type, isReturnNull) => {
	//如果未传递过来的日期数据并且设置了允许返回为空那么就返回空字符串
	vIf(vAnd(!date, isReturnNull), () =>{
		return '';
	})
	const time = vOr(date, (vOr(date instanceof Date, date, new Date(date))), new Date());
	const o = {
		y: time.getFullYear(),
		M: vOr(time.getMonth() + 1 < 10, '0' + (time.getMonth() + 1), time.getMonth() + 1),
		d: vOr(time.getDate() < 10, '0' + time.getDate(), time.getDate()),
		h: vOr(time.getHours() < 10, '0' + time.getHours(), time.getHours()),
		m: vOr(time.getMinutes() < 10, '0' + time.getMinutes(), time.getMinutes()),
		s: vOr(time.getSeconds() < 10, '0' + time.getSeconds(), time.getSeconds())
	}
	switch (type) {
		case 'dateTime':
			return o.y + '-' + o.M + '-' + o.d + ' ' + o.h + ':' + o.m + ':' + o.s;
		case 'datehhmm':
			return o.y + '-' + o.M + '-' + o.d + ' ' + o.h + ':' + o.m ;
		case 'dTime':
			return o.M + '-' + o.d + ' ' + o.h + ':' + o.m;
		case 'date':
			return o.y + '-' + o.M + '-' + o.d;
		case "yyyyMM":
			return o.y + '-' + o.M;
		case 'time':
			return o.h + ':' + o.m + ':' + o.s;
		case 'hhmm':
			return o.h + ':' + o.m;
		case 'replay':
			return o.h + ':' + o.m + '(' + o.d + ')';
		case 'dateZero':
			return o.y + '-' + o.M + '-' + o.d +' 00:00:00';
		default:
			return o.y + '-' + o.M + '-' + o.d + ' ' + o.h + ':' + o.m + ':' + o.s;
	}
}

// 得到当天四点
const getFourClock = (date, type) => {
	return type === 1 ? new Date(formatTime(date).split(' ')[0] + ' 04:00:00').getTime() : new Date(formatTime(date).split(' ')[0] + ' 04:00:00');
}
//获得本月的第一天
const getFirstDayOfMonth = (date) => {
	return new Date(formatTime(date, 'yyyyMM') + '-01');
};

// 角度转化为弧度
const getRadian = deg => deg / 180 * Math.PI;

// 弧度转化为角度
const getDeg = radian => radian / Math.PI * 180;

// 解压gzip
const unzip = b64Data => {
	try {
		let strData = window.atob(b64Data);
		const charData = strData.split('').map(x => {
			return x.charCodeAt(0);
		});
		const binData = new Uint8Array(charData);
		const data = window.pako.inflate(binData);
		const length = data.length;
		if (length > 50000) {
			let result = '';
			let num = 0;
			while (num < length / 10000) {
				const temp = data.slice(10000 * num, 10000 * (num + 1));
				result += String.fromCharCode.apply(null, new Uint16Array(temp));
				num++;
			}
			strData = result;
		} else {
			strData = String.fromCharCode.apply(null, new Uint16Array(data));
		}
		return JSON.parse(decodeURIComponent(strData));
	} catch (error) {
		return JSON.parse(b64Data);
	}
}

// 求交集
const intersect = (arr, arr1) => {
	return arr1.filter(item => {
		for (let i of arr) {
			if (i.id === item.id) {
				return true;
			}
		}
		return false;
	})
}

// 求差集
const difference = (arr, arr1) => {
	return arr.filter(item => {
		for (let i of arr1) {
			if (i.id === item.id) {
				return false;
			}
		}
		return true;
	})
}

// 格式化地址
const formatUrl = (url, obj) => {
	let param = [];
	for (let key of Object.keys(obj)) {
		param.push(`${ key }=${ obj[key] }`);
	}
	return param.length > 0 ? `${ url }?${ param.join('&') }` : url;
}

function S4() {
	return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

// 生成唯一id
const uuid = () => {
	return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
}

//检验输入的数字是否合法
const chargeNumbers = (number,type) => {
	switch (type) {
		//非零正整数
		case 'PNUMBER':
			var reg = /^\+?[1-9][0-9]*$/;
			return reg.test(number);
		case 'NNUMBER':
			var reg = /^\-[1-9][0-9]*$/;
			return reg.test(number);
		//正浮点数
		case 'PFLOAT':
			var reg = /^(([0]+\.[0-9]*[1-9][0-9]*)|([1-9]+\.[0-9]*[1-9][0-9]*)|([1-9][0-9]*\.[0-9]+)|([1-9][0-9]*))$/;
			return reg.test(number);
		//负浮点数
		case 'NFLOAT':
			var reg = /^(-(([0]+\.[0-9]*[1-9][0-9]*)|([1-9]+\.[0-9]*[1-9][0-9]*)|([1-9][0-9]*\.[0-9]+)|([1-9][0-9]*)))$/;
			return reg.test(number);
		//非负数
		case 'NNEGATIVE':
			var reg = /^(0\.?\d{0,2}|[1-9]\d*\.?\d{0,10})$/;
			return reg.test(number);
		default:
			return true;
	}
}

//非零小数和空格
const chargeNumberAndNull = (rule, value, callback) => {
	if (isNaN(value) && value!=null && value.trim()!=="" && !chargeNumbers(value.replace(/\s/ig,""), 'PNUMBER')) {
		callback(new Error('请输入非零整数'));
	} else {
		callback();
	}
};
//判断输入的数是否超过了整数的最大范围
const chargeMaxNumber = (rule, value, callback) => {
	if (value>2147483647) {
		callback(new Error('数值不能超过2147483647'));
	} else {
		callback();
	}
};

//小数位不能超过4位
var chargeFourFloat = (rule,value,callback) => {
	if (!value) {
		callback();
	} else if (chargeNumbers(value, 'PFLOAT')) {
		const valueStr = value.toString();
		if (valueStr.indexOf(".") > -1) {
			let s = valueStr.substring(valueStr.indexOf(".")+1, valueStr.length);
			if (s.length > 4) {
				callback(new Error('小数位不能超过4位'));
			} else {
				callback();
			}
		} else {
			callback();
		}
	} else {
		callback();
	}
};

const chargeMaxNumberSmallThan100 = (rule, value, callback) => {
	if (value>100) {
		callback(new Error('数值不能超过100'));
	} else {
		callback();
	}
};

export {
	formatTime,
	getFourClock,
	getRadian,
	getDeg,
	unzip,
	intersect,
	difference,
	formatUrl,
	uuid,
	chargeNumbers,
	chargeNumberAndNull,
	chargeMaxNumber,
	chargeMaxNumberSmallThan100,
	chargeFourFloat,
	getFirstDayOfMonth
};
