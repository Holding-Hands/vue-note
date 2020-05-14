import { plane_A, plane_B, plane_C, plane_D, plane_E, plane_F,
    car_wushui, car_laji, car_gongju, car_tongqin, car_pika, car_kongtiao, car_qigou, car_yunyingjianguan, car_qianyin,
    car_chuansongdai, car_mianbao, car_huweixunluo, car_gongzuo, car_zhongxingkeche, car_qingshui, car_xunchang, car_dianyuan,
    car_wuganqianyin, car_xiaoxinghuoche, car_qiyuan, car_hangkonglaji, car_xunluo, car_chubing, car_yindao, car_sanke, car_guibin,
    car_bench, car_other} from '@/utils/getImage.js';

// 地图图层默认配置
const element = (arr, depArr) => {
    return [
        {
    		key: 'PLANE',
    		label: '航班',
            level: 1,
            children: [
                { key: 'ArrFlight', label: '进港航班', type: 'plane' },
                { key: 'DepFlight', label: '出港航班', type: 'plane' },
                { key: 'DispIng', label: '正在保障', type: 'plane' },
                { key: 'DispEnd', label: '保障结束', type: 'plane' }
            ],
            image: [
                { label: 'A型', data: [{type: '正常',src: plane_A.plane},{type: '延误',src: plane_A.delay},{type: '重点保障',src: plane_A.planeKey}]},
                { label: 'B型', data: [{type: '正常',src: plane_B.plane},{type: '延误',src: plane_B.delay},{type: '重点保障',src: plane_B.planeKey}]},
                { label: 'C型', data: [{type: '正常',src: plane_C.plane},{type: '延误',src: plane_C.delay},{type: '重点保障',src: plane_C.planeKey}]},
                { label: 'D型', data: [{type: '正常',src: plane_D.plane},{type: '延误',src: plane_D.delay},{type: '重点保障',src: plane_D.planeKey}]},
                { label: 'E型', data: [{type: '正常',src: plane_E.plane},{type: '延误',src: plane_E.delay},{type: '重点保障',src: plane_E.planeKey}]},
                { label: 'F型', data: [{type: '正常',src: plane_F.plane},{type: '延误',src: plane_F.delay},{type: '重点保障',src: plane_F.planeKey}]}
            ],
            inOut: [
                { label: '进港', data: plane_A.plane},
                { label: '出港', data: plane_A.planeOut}
            ]
    	},
    	{
    		key: 'CAR',
    		label: '车辆',
    		level: 1,
            children: arr,
            image: [
                { label: '污水车', data: [{type: '正常',src: car_wushui.car},{type: '选中',src: car_wushui.select},{type: 'abn',src: car_wushui.abn}]},
                { label: '垃圾车', data: [{type: '正常',src: car_laji.car},{type: '选中',src: car_laji.select},{type: 'abn',src: car_laji.abn}]},
                { label: '工具车', data: [{type: '正常',src: car_gongju.car},{type: '选中',src: car_gongju.select},{type: 'abn',src: car_gongju.abn}]},
                { label: '通勤车', data: [{type: '正常',src: car_tongqin.car},{type: '选中',src: car_tongqin.select},{type: 'abn',src: car_tongqin.abn}]},
                { label: '五十铃皮卡', data: [{type: '正常',src: car_pika.car},{type: '选中',src: car_pika.select},{type: 'abn',src: car_pika.abn}]},
                { label: '空调车', data: [{type: '正常',src: car_kongtiao.car},{type: '选中',src: car_kongtiao.select},{type: 'abn',src: car_kongtiao.abn}]},
                { label: '汽垢车', data: [{type: '正常',src: car_qigou.car},{type: '选中',src: car_qigou.select},{type: 'abn',src: car_qigou.abn}]},
                { label: '运行监管', data: [{type: '正常',src: car_yunyingjianguan.car},{type: '选中',src: car_yunyingjianguan.select},{type: 'abn',src: car_yunyingjianguan.abn}]},
                { label: '牵引车', data: [{type: '正常',src: car_qianyin.car},{type: '选中',src: car_qianyin.select},{type: 'abn',src: car_qianyin.abn}]},
                { label: '传送带车', data: [{type: '正常',src: car_chuansongdai.car},{type: '选中',src: car_chuansongdai.select},{type: 'abn',src: car_chuansongdai.abn}]},
                { label: '面包车', data: [{type: '正常',src: car_mianbao.car},{type: '选中',src: car_mianbao.select},{type: 'abn',src: car_mianbao.abn}]},
                { label: '护卫巡逻车', data: [{type: '正常',src: car_huweixunluo.car},{type: '选中',src: car_huweixunluo.select},{type: 'abn',src: car_huweixunluo.abn}]},
                { label: '工作车', data: [{type: '正常',src: car_gongzuo.car},{type: '选中',src: car_gongzuo.select},{type: 'abn',src: car_gongzuo.abn}]},
                { label: '中型客车', data: [{type: '正常',src: car_zhongxingkeche.car},{type: '选中',src: car_zhongxingkeche.select},{type: 'abn',src: car_zhongxingkeche.abn}]},
                { label: '清水车', data: [{type: '正常',src: car_qingshui.car},{type: '选中',src: car_qingshui.select},{type: 'abn',src: car_qingshui.abn}]},
                { label: '巡场车', data: [{type: '正常',src: car_xunchang.car},{type: '选中',src: car_xunchang.select},{type: 'abn',src: car_xunchang.abn}]},
                { label: '电源车', data: [{type: '正常',src: car_dianyuan.car},{type: '选中',src: car_dianyuan.select},{type: 'abn',src: car_dianyuan.abn}]},
                { label: '无杆牵引车', data: [{type: '正常',src: car_wuganqianyin.car},{type: '选中',src: car_wuganqianyin.select},{type: 'abn',src: car_wuganqianyin.abn}]},
                { label: '小型货车', data: [{type: '正常',src: car_xiaoxinghuoche.car},{type: '选中',src: car_xiaoxinghuoche.select},{type: 'abn',src: car_xiaoxinghuoche.abn}]},
                { label: '气源车', data: [{type: '正常',src: car_qiyuan.car},{type: '选中',src: car_qiyuan.select},{type: 'abn',src: car_qiyuan.abn}]},
                { label: '航空垃圾车', data: [{type: '正常',src: car_hangkonglaji.car},{type: '选中',src: car_hangkonglaji.select},{type: 'abn',src: car_hangkonglaji.abn}]},
                { label: '巡逻车', data: [{type: '正常',src: car_xunluo.car},{type: '选中',src: car_xunluo.select},{type: 'abn',src: car_xunluo.abn}]},
                { label: '除冰车', data: [{type: '正常',src: car_chubing.car},{type: '选中',src: car_chubing.select},{type: 'abn',src: car_chubing.abn}]},
                { label: '引导车', data: [{type: '正常',src: car_yindao.car},{type: '选中',src: car_yindao.select},{type: 'abn',src: car_yindao.abn}]},
                { label: '散客车', data: [{type: '正常',src: car_sanke.car},{type: '选中',src: car_sanke.select},{type: 'abn',src: car_sanke.abn}]},
                { label: '贵宾车', data: [{type: '正常',src: car_guibin.car},{type: '选中',src: car_guibin.select},{type: 'abn',src: car_guibin.abn}]},
                { label: '奔驰', data: [{type: '正常',src: car_bench.car},{type: '选中',src: car_bench.select},{type: 'abn',src: car_bench.abn}]},
                { label: '其他', data: [{type: '正常',src: car_other.car},{type: '选中',src: car_other.select},{type: 'abn',src: car_other.abn}]}
            ]
        },
    	{
    		key: 'PERSON',
    		label: '人员',
            level: 1,
            children: depArr
    	},
    	{
    		key: 'ELEMENT',
    		label: '基础元素',
            level: 1,
            children: [
                { key: 'Area', label: '电子围栏', type: 'element' },
                { key: 'Bridge', label: '廊桥', type: 'element' },
                { key: 'Building', label: '建筑', type: 'element' },
                { key: 'Camera', label: '摄像头', type: 'element' },
                { key: 'Element', label: '元素', type: 'element' },
                { key: 'Gate', label: '登机口', type: 'element' },
                { key: 'Light', label: '灯', type: 'element' },
                { key: 'Parking', label: '停车位', type: 'element' },
                { key: 'Runway', label: '跑道', type: 'element' },
                { key: 'Stand', label: '机位', type: 'element' },
                { key: 'Terminal', label: '候机楼', type: 'element' }
            ]
    	}
    ];
};

// 'Area', 'Bridge', 'Building', 'Camera', 'Element', 'Gate', 'Light', 'Parking', 'Runway', 'Stand', 'Terminal'
// 默认选中展示的地图元素
const elementChecked = [];

// 默认选中展示的飞行器
const planeChecked = ['ArrFlight', 'DepFlight', 'DispIng', 'DispEnd'];

// 航班消息最大存储数量（客户端）
const messageMaxNum = 50;

// 轨迹回放一次查询的毫秒数 默认一分钟
const replayTime = 60000;

// 默认偏好设置配置
const SETTINGS_OPTIONS = {
    warnArea: true,
    messageType: ['change', 'against', 'department', 'nonroutine'],
    change: {
        use: true,
        url: './static/sound/change.mp3',
        type: 'change'
    },
    warn: {
        use: true,
        url: './static/sound/change.mp3',
        type: 'warn'
    },
    dept: {
        use: true,
        url: './static/sound/change.mp3',
        type: 'dept'
    },
    nonroutine: {
        use: true,
        url: './static/sound/change.mp3',
        type: 'nonroutine'
    },
    flightColor: true,
    color: '#95223f'
};

// 默认地图设置
const MAP_OPTIONS = {
    vehicle: {
        13: [],
        14: ['vehicleNo', 'driverName']
    },
    flight: {
        13: [],
        14: ['flightNo']
    },
    person: {
        13: [],
        14: ['personName']
    }
};

// 车辆地图设置全部选项
const VEHICLE_MAP_OPTIONS = {
    vehicleNo: '车牌号',
    driverName: '保障人员',
    vehicleType: '车辆类型',
    'dispatchInfo.dispatchStatus': '保障任务状态',
    'dispatchInfo.dispatchName': '保障环节',
    'dispatchInfo.flightNo': '服务航班号'
};

// 航班地图设置全部选项
const FLIGHT_MAP_OPTIONS = {
    flightNo: '进出港航班号',
    craftNo: '机号',
    craftModelNo: '机型',
    craftSeat: '机位',
    toCity: '目的地'
};

// 人员地图设置全部选项
const PERSON_MAP_OPTIONS = {
    personName: '保障人员',
    deptName: '所属部门',
    dispatchStatus: '保障任务状态'
};

export {
    messageMaxNum,
    element,
    elementChecked,
    replayTime,
    planeChecked,
    SETTINGS_OPTIONS,
    MAP_OPTIONS,
    VEHICLE_MAP_OPTIONS,
    FLIGHT_MAP_OPTIONS,
    PERSON_MAP_OPTIONS,
};
