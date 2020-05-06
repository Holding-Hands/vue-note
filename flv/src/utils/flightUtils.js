import { get } from './lang.js';

/**
 * 判断航班是否是完成航班
 * @param {Object} item 关联航班数据信息
 * @returns {Boolean} 是否完成
 * @author yujie
 */

const flightIsDone = (item) => {
	if (item.depStatus && item.depStatus.indexOf('起飞') > -1) {
		return true;
	} else if (item.arrStatus === '到达') {
		return true;
	} else if (item.arrAbnStatus === '取消' || item.depAbnStatus === '取消') {
		return true;
	}
	return false;
}


/**
 * 判断航班进港航段是否完成
 * @param {Object} item 关联航班数据信息
 * @returns {Boolean} 是否完成
 * @author yujie
 */

const arrIsDone = item => item.arrAbnStatus === '取消' || item.arrStatus === '到达';

/* 航班状态中英文对应关系 */
const statusMap = {
	VIP: 'VIP',
	值机开始: 'CKI',
	值机截止: 'CKO',
	催促登机: 'LBD',
	到达: 'ARR',
	前方起飞: 'ONR',
	取消: 'CAN',
	备降: 'ALT',
	延误: 'DLY',
	本站登机: 'BOR',
	登机截止: 'POK',
	起飞: 'DEP',
	过站登机: 'TBR',
	返航: 'RTN'
}

/**
 * 获取航线颜色
 * @param {Object} item 颜色配置对象
 * @returns {String} rgb颜色
 * @author yujie
 */

const getRGB = item => item ? `rgb(${ item.red }, ${ item.green }, ${ item.blue })` : '';

/**
 * 获取航线颜色
 * @param {Object} item 关联航班数据信息
 * @returns {Array} [rgb颜色, 当前生效的颜色状态]
 * @author yujie
 */
const colorMap = JSON.parse(sessionStorage.getItem('routeConfigColor') || '{}');

const getStatusColor = (item) => {
  
	if (flightIsDone(item)) {
		if (get(item.arrAbnStatus === '取消', item.depAbnStatus === '取消')) {
			return [getRGB(colorMap[statusMap['取消']]), '取消'];
		} else if (item.depStatus) {
			return [getRGB(colorMap[statusMap[item.depStatus]]), item.depStatus];
		} else if (item.arrStatus) {
			return [getRGB(colorMap[statusMap[item.arrStatus]]), item.arrStatus];
		}
	} else if (arrIsDone(item)) {
		if (item.depStatus && item.depStatus.indexOf('值机截止') === -1 && item.depStatus.indexOf('值机开始') === -1) {
			return [getRGB(colorMap[statusMap[item.depStatus]]), item.depStatus];
		} else if (item.depAbnStatus === '延误') {
			return [getRGB(colorMap[statusMap[item.depAbnStatus]]), item.depAbnStatus];
		}
		return [getRGB(colorMap[statusMap['到达']]), '到达'];
	}

	delay(item);

	return [];
}

// 延误或登机截止
function delay(item) {
	if (item.arrAbnStatus && item.arrAbnStatus !== '延误') {
		return [getRGB(colorMap[statusMap[item.arrAbnStatus]]), item.arrAbnStatus];
	} else if (item.arrStatus) {
		return [getRGB(colorMap[statusMap[item.arrStatus]]), item.arrStatus];
	} else if (item.arrAbnStatus === '延误') {
		return [getRGB(colorMap[statusMap[item.arrAbnStatus]]), item.arrAbnStatus];
	} else if (item.depStatus && item.depStatus.indexOf('值机截止') === -1 && item.depStatus.indexOf('值机开始') === -1) {
		return [getRGB(colorMap[statusMap[item.depStatus]]), item.depStatus];
	} else if (item.depAbnStatus) {
		return [getRGB(colorMap[statusMap[item.depAbnStatus]]), item.depAbnStatus];
	}
}

export {
	getStatusColor
};
