// 监管调度
const FLIGHTDISPATCH = 'flight_dispatch';
const BATCHDISPATCH = 'batch_dispatch';
const CREWREQUIREMENT = 'crew_requirement';
const FLIGHTDRAGGABLE = 'flight_draggable';
const PERSONDRAGGABLE = 'person_draggable';
const GUARATEE = 'set_guaratee';
const DISPATCH = 'dispatch';
const SAVEGUARATEE = 'save_guaratee';
const CANCLEGUARATEE = 'cancle_guaratee';
const TAGCANCLE = 'tag_cancle';
const PERSONCANCLEDISPATCH = 'person_cancle_dispatch';
const TASKDRAGGABLE = 'task_draggable';
const FLIGHTLOCATION = 'flight_location';
// 非例行任务
const NONROUTINEDISPATCH = 'nonroutine_dispatch';
// FOD机位巡检
const FODADDUSER = 'fod_add_user';
const FODEDITUSER = 'fod_edit_user';
const FODDELETEUSER = 'fod_delete_user';
const FODRESETPASSWORD = 'fod_reset_password';
const FODDISPATCH = 'fod_dispatch';
const FODDISPATCHFINISH = 'fod_dispatch_finish';

//用户权限模块

//菜单编辑
const ADDPARENTFUNCTION = 'add_parentFunction';//添加主菜单按钮
const ADDCHILDFUNCTION = 'add_childFunction';//添加子菜单按钮
const EDITFUNCTION = 'edit_function';//编辑菜单
const DELETEFUNCTION = 'delete_function';//删除菜单

//部门
const ADDDEPT = 'add_dept';//添加部门
const EDITDEPT = 'edit_dept';//编辑部门
const DELETEDEPT = 'delete_dept';//删除部门

//用户
const EDITUSER = 'edit_user';
const DELETEUSER = 'delete_user';
const LOCKUSER = 'lock_user';
const UNLOCKUSER = 'unlock_user';
const RESETPASSWORD = 'reset_password';
const EXPORTUSER="export_user";

//用户与角色
const SAVEUSERROLE = 'save_userRole';

//角色和权限
const ADDROLE = 'add_role';
const EDITROLE = 'edit_role';
const DELETEROLE = 'delete_role';
const SAVEROLEFUNCTION = 'save_roleFunction';

//角色与车辆
const SAVEROLEPURP = 'save_rolePurp';

//角色与部门
const SAVEROLEDEPT = 'save_roleDept';

//持业证书
const ADDCERTIFICATEINDUSTRY = 'add_certificate';
const EDITCERTIFICATEINDUSTRY = 'edit_certificate';
const DELETECERTIFICATEINDUSTRY = 'delete_certificate';

//工种
const ADDWORKTYPE = 'add_workType';
const EDITWORKTYPE = 'edit_workType';
const DELETEWORKTYPE = 'delete_workType';

//人员证件管理
const ADDUSERDOC = 'add_userDoc';
const EDITUSERDOC = 'edit_userDoc';
const DELETEUSERDOC = 'delete_userDoc';
const EXPORTUSERDOC="export_userDoc";

//系统字典
const ADDDICT = 'add_dict';
const EDITDICT = 'edit_dict';
const DELETEDICT = 'delete_dict';

//系统参数
const ADDSYST = 'add_syst';
const EDITSYST = 'edit_syst';
const DELETESYST = 'delete_syst';

//省份
const ADDPROV = 'add_prov';
const EDITPROV = 'edit_prov';
const DELETEPROV = 'delete_prov';

//国家
const ADDCOUN = 'add_coun';
const EDITCOUN = 'edit_coun';
const DELETECOUN = 'delete_coun';

//城市
const ADDCITY = 'add_city';
const EDITCITY = 'edit_city';
const DELETECITY = 'delete_city';

//机场
const ADDAIRP = 'add_airp';
const EDITAIRP = 'edit_airp';
const DELETEAIRP = 'delete_airp';

//航空公司
const ADDAIRL = 'add_airl';
const EDITAIRL = 'edit_airl';
const DELETEAIRL = 'delete_airl';

//航空分公司
const ADDAISU = 'add_aisu';
const EDITAISU = 'edit_aisu';
const DELETEAISU = 'delete_aisu';

//机型
const ADDAITY = 'add_aity';
const EDITAITY = 'edit_aity';
const DELETEAITY = 'delete_aity';

//飞机
const ADDAIRC = 'add_airc';
const EDITAIRC = 'edit_airc';
const DELETEAIRC = 'delete_airc';

//区域
const ADDAREA = 'add_area';
const EDITAREA = 'edit_area';
const DELETEAREA = 'delete_area';

//廊桥
const ADDBRIDGE = 'add_bridge';
const EDITBRIDGE = 'edit_bridge';
const DELETEBRIDGE = 'delete_bridge';

//建筑
const ADDBUILDING = 'add_building';
const EDITBUILDING = 'edit_building';
const DELETEBUILDING = 'delete_building';

//摄像头
const ADDCAMERA = 'add_camera';
const EDITCAMERA = 'edit_camera';
const DELETECAMERA = 'delete_camera';

//场面元素
const ADDELEMENT = 'add_element';
const EDITELEMENT = 'edit_element';
const DELETEELEMENT = 'delete_element';

//元素类型
const ADDELEMENTTYPE = 'add_elementType';
const EDITELEMENTTYPE = 'edit_elementType';
const DELETEELEMENTTYPE = 'delete_elementType';

// 登机口
const ADDGATE = 'add_gate';
const EDITGATE = 'edit_gate';
const DELETEGATE = 'delete_gate';

//灯光
const ADDLIGHT = 'add_light';
const EDITLIGHT = 'edit_light';
const DELETELIGHT = 'delete_light';

//停车位
const ADDPARKING = 'add_parking';
const EDITPARKING = 'edit_parking';
const DELETEPARKING = 'delete_parking';

// 跑道
const ADDRUNWAY = 'add_runway';
const EDITRUNWAY = 'edit_runway';
const DELETERUNWAY = 'delete_runway';

//机位
const ADDSTAND = 'add_stand';
const EDITSTAND = 'edit_stand';
const DELETESTAND = 'delete_stand';

//候机楼
const ADDTERMINAL = 'add_terminal';
const EDITTERMINAL = 'edit_terminal';
const DELETETERMINAL = 'delete_terminal';

//指廊
const ADDCORRIDOR = 'add_corridor';
const EDITCORRIDOR = 'edit_corridor';
const DELETECORRIDOR = 'delete_corridor';

// 车辆停放区域
const ADDCARPARKING = 'add_carParking';
const EDITCARPARKING = 'edit_carParking';
const DELETECARPARKING = 'delete_carParking';

// 车辆到位区域
const ADDVEHLOCATION = 'add_vehLocation';
const EDITVEHLOCATION = 'edit_vehLocation';
const DELETEVEHLOCATION = 'delete_vehLocation';

//管理----数据同步
const SYNCHRONOUSDEPT = 'synchronous_dept';
const SYNCHRONOUSUSER = 'synchronous_user';
const SYNCHRONOUSCOUN = 'synchronous_coun';
const SYNCHRONOUSAIRL = 'synchronous_airl';
const SYNCHRONOUSAISU = 'synchronous_aisu';
const SYNCHRONOUSPROV = 'synchronous_prov';
const SYNCHRONOUSCITY = 'synchronous_city';
const SYNCHRONOUSAIRP = 'synchronous_airp';
const SYNCHRONOUSAITY = 'synchronous_aity';
const SYNCHRONOUSAIRC = 'synchronous_airc';
const SYNCHRONOUSSTAND = 'synchronous_stand';
const PUSHVEHVEHI = 'push_vehVehi';


//车辆数据
//车辆品牌
const ADDBRAN = 'add_bran';
const EDITBRAN = 'edit_bran';
const DELETEBRAN = 'delete_bran';

//车辆分类
const ADDCATE = 'add_cate';
const EDITCATE = 'edit_cate';
const DELETECATE = 'delete_cate';

//车辆终端类型
const ADDDETY = 'add_dety';
const EDITDETY = 'edit_dety';
const DELETEDETY = 'delete_dety';

//车辆终端设备
const ADDDEVC = 'add_devc';
const EDITDEVC = 'edit_devc';
const DELETEDEVC = 'delete_devc';
const EXPORTDEVC="export_devc";

//车辆用途分类
const ADDPURP = 'add_purp';
const EDITPURP = 'edit_purp';
const DELETEPURP = 'delete_purp';

//sim卡
const ADDSIM = 'add_sim';
const EDITSIM = 'edit_sim';
const DELETESIM = 'delete_sim';

//车辆与车载设备
const ADDVEDE = 'add_vede';
const EDITVEDE = 'edit_vede';
const DELETEVEDE = 'delete_vede';

//车辆
const ADDVEHI = 'add_vehi';
const EDITVEHI = 'edit_vehi';
const DELETEVEHI = 'delete_vehi';
const EXPORTVEHI="export_vehi";

//车辆使用情况
const ADDVEHIUSAGE = 'add_vehiUsage';
const EDITVEHIUSAGE = 'edit_vehiUsage';
const DELETEVEHIUSAGE = 'delete_vehiUsage';

// 车辆证件管理
const ADDVEHIDOC = 'add_vehiDoc';
const EDITVEHIDOC = 'edit_vehiDoc';
const DELETEVEHIDOC = 'delete_vehiDoc';
const EXPORTVEHIDOC="export_vehiDoc";

//预警
//特定区域车辆限速
const ADDARPU = 'add_arpu';
const EDITARPU = 'edit_arpu';
const BATCHARPU = 'batch_arpu';
const DELETEARPU = 'delete_arpu';

//特定区域车辆越界
const ADDBOUN = 'add_boun';
const EDITBOUN = 'edit_boun';
const BATCHBOUN = 'batch_boun';
const DELETEBOUN = 'delete_boun';
//预警级别
const ADDLEVE = 'add_leve';
const EDITLEVE = 'edit_leve';
const DELETELEVE = 'delete_leve';
//预警类别
const ADDTYPE = 'add_type';
const EDITTYPE = 'edit_type';
const DELETETYPE = 'delete_type';
//特种车辆危险预警
const ADDDANGER = 'add_danger';
const EDITDANGER = 'edit_danger';
const DELETEDANGER = 'delete_danger';
//预警声音
const ADDVOICE = 'add_voice';
const DELETEVOICE = 'delete_voice';

//回传频率
//人员回传频率
const ADDPERRATE = 'add_perRate';
const EDITPERRATE = 'edit_perRate';
const DELETEPERRATE = 'delete_perRate';

//车辆回传频率
const ADDVEHRATE = 'add_vehRate';
const EDITVEHRATE = 'edit_vehRate';
const DELETEVEHRATE = 'delete_vehRate';

//组织管理
const ADDMAINORGAN = 'add_mainOrgan';
const ADDCHILDORGAN = 'add_childOrgan';
const EDITORGAN = 'edit_organ';
const DELETEORGAN = 'delete_organ';

//查询统计
//违章报警统计
const CARPECSTATEXPORT = 'carPecStat_export';//导出功能
const CARPECSTATEXPORTSETTING = 'carPecStat_exportSetting';//导出设置

//保障按时完成率统计
const FLIGHTDISPATCHTIMEEXPORT = 'flightDispatchTime_export';//导出功能
const FLIGHTDISPATCHTIMEEXPORTSETTING = 'flightDispatchTime_exportSetting';//导出设置

//车辆行驶里程统计
const CARTOTALMILESEXPORT = 'carTotalMiles_export';//导出功能
const CARTOTALMILESEXPORTSETTING = 'carTotalMiles_exportSetting';//导出设置

//人车任务量统计
const PERSIONCARTASKINDEXEXPORT = 'persionCarTaskIndex_export';//导出功能
const PERSIONCARTASKINDEXEXPORTSETTING = 'persionCarTaskIndex_exportSetting';//导出设置

//人车上线率统计
const PERVEHONLINERATEINDEXEXPORT = 'perVehOnlineRateIndex_export';//导出功能
const PERVEHONLINERATEINDEXEXPORTSETTING = 'perVehOnlineRateIndex_exportSetting';//导出设置

//人员效能分析
const USEREFFICIENCYEXPORT = 'userEfficiency_export';//导出功能
const USEREFFICIENCYEXPORTSETTING = 'userEfficiency_exportSetting';//导出设置

//车辆效能分析
const CAREFFICIENCYINDEXEXPORT = 'carEfficiencyIndex_export';//导出功能
const CAREFFICIENCYINDEXEXPORTSETTING = 'carEfficiencyIndex_exportSetting';//导出设置

//航班任务完成情况统计
const FLIGHTDISPATCHFINISHINDEXEXPORT = 'flightDispatchFinishIndex_export';//导出功能
const FLIGHTDISPATCHFINISHINDEXEXPORTSETTING = 'flightDispatchFinishIndex_exportSetting';//导出设置

//航班历史信息
const FLIGHTSEARCHTOTALEXPORT = 'flightSearchTotal_export';//导出功能
const FLIGHTSEARCHTOTALEXPORTSETTING = 'flightSearchTotal_exportSetting';//导出设置

//航班动态
const FLIGHTDYNAMICEXPORT = 'flightDynamic_export';//导出功能
const FLIGHTDYNAMICEXPORTSETTING = 'flightDynamic_exportSetting';//导出设置

//审计查询
const LOGAUDITEXPORT = 'logAudit_export';//导出功能
const LOGAUDITEXPORTSETTING = 'logAudit_exportSetting';//导出设置

//操作日志
const USEROPLOGSAUDITEXPORT = 'userOpLogsAudit_export';//导出功能
const USEROPLOGSAUDITEXPORTSETTING = 'userOpLogsAudit_exportSetting';//导出设置

//区域与机位
const SAVEAREAWITHSTANDS = 'save_areaWithStands';// 保存机位区域与机位信息
const EDITSTANDAREA = 'edit_standArea';//修改机位区域
const DELSTANDAREA = 'del_standArea';//删除机位区域
const ADDSTANDAREA = 'add_standArea';//新增机位区域

//定时任务
const EDITJOB = 'edit_job';//修改定时任务
const DELJOB = 'del_job';//删除定时任务
const ADDJOB = 'add_job';//新增定时任务



export {	FLIGHTDISPATCH,
	BATCHDISPATCH,
	CREWREQUIREMENT,
	FLIGHTDRAGGABLE,
	PERSONDRAGGABLE,
	GUARATEE,
	DISPATCH,
	SAVEGUARATEE,
	CANCLEGUARATEE,
	TAGCANCLE,
	PERSONCANCLEDISPATCH,
	TASKDRAGGABLE,
	FLIGHTLOCATION,
	NONROUTINEDISPATCH,
	FODADDUSER,
	FODEDITUSER,
	FODDELETEUSER,
	FODRESETPASSWORD,
	EXPORTUSER,
	FODDISPATCH,
	FODDISPATCHFINISH,
	ADDPARENTFUNCTION,
	ADDCHILDFUNCTION,
	EDITFUNCTION,
	DELETEFUNCTION,
	ADDDEPT,
	EDITDEPT,
	DELETEDEPT,
	EDITUSER,
	DELETEUSER,
	LOCKUSER,
	UNLOCKUSER,
	RESETPASSWORD,
	SAVEUSERROLE,
	ADDROLE,
	EDITROLE,
	DELETEROLE,
	SAVEROLEFUNCTION,
	SAVEROLEPURP,
	SAVEROLEDEPT,
	ADDCERTIFICATEINDUSTRY,
	EDITCERTIFICATEINDUSTRY,
	DELETECERTIFICATEINDUSTRY,
	ADDWORKTYPE,
	EDITWORKTYPE,
	DELETEWORKTYPE,
	ADDUSERDOC,
	EDITUSERDOC,
	DELETEUSERDOC,
	EXPORTUSERDOC,
	ADDDICT,
	EDITDICT,
	DELETEDICT,
	ADDSYST,
	EDITSYST,
	DELETESYST,
	ADDPROV,
	EDITPROV,
	DELETEPROV,
	ADDCOUN,
	EDITCOUN,
	DELETECOUN,
	ADDCITY,
	EDITCITY,
	DELETECITY,
	ADDAIRP,
	EDITAIRP,
	DELETEAIRP,
	ADDAIRL,
	EDITAIRL,
	DELETEAIRL,
	ADDAISU,
	EDITAISU,
	DELETEAISU,
	ADDAITY,
	EDITAITY,
	DELETEAITY,
	ADDAIRC,
	EDITAIRC,
	DELETEAIRC,
	ADDAREA,
	EDITAREA,
	DELETEAREA,
	ADDBRIDGE,
	EDITBRIDGE,
	DELETEBRIDGE,
	ADDBUILDING,
	EDITBUILDING,
	DELETEBUILDING,
	ADDCAMERA,
	EDITCAMERA,
	DELETECAMERA,
	ADDELEMENT,
	EDITELEMENT,
	DELETEELEMENT,
	ADDELEMENTTYPE,
	EDITELEMENTTYPE,
	DELETEELEMENTTYPE,
	ADDGATE,
	EDITGATE,
	DELETEGATE,
	ADDLIGHT,
	EDITLIGHT,
	DELETELIGHT,
	ADDPARKING,
	EDITPARKING,
	DELETEPARKING,
	ADDRUNWAY,
	EDITRUNWAY,
	DELETERUNWAY,
	ADDSTAND,
	EDITSTAND,
	DELETESTAND,
	ADDTERMINAL,
	EDITTERMINAL,
	DELETETERMINAL,
	ADDCORRIDOR,
	EDITCORRIDOR,
	DELETECORRIDOR,
	SYNCHRONOUSDEPT,
	SYNCHRONOUSUSER,
	SYNCHRONOUSCOUN,
	SYNCHRONOUSAIRL,
	SYNCHRONOUSAISU,
	SYNCHRONOUSPROV,
	SYNCHRONOUSCITY,
	SYNCHRONOUSAIRP,
	SYNCHRONOUSAITY,
	SYNCHRONOUSAIRC,
	SYNCHRONOUSSTAND,
	PUSHVEHVEHI,
	ADDBRAN,
	EDITBRAN,
	DELETEBRAN,
	ADDCATE,
	EDITCATE,
	DELETECATE,
	ADDDETY,
	EDITDETY,
	DELETEDETY,
	ADDDEVC,
	EDITDEVC,
	DELETEDEVC,
	EXPORTDEVC,
	ADDPURP,
	EDITPURP,
	DELETEPURP,
	ADDSIM,
	EDITSIM,
	DELETESIM,
	ADDVEDE,
	EDITVEDE,
	DELETEVEDE,
	ADDVEHI,
	EDITVEHI,
	DELETEVEHI,
	EXPORTVEHI,
	ADDVEHIUSAGE,
	EDITVEHIUSAGE,
	DELETEVEHIUSAGE,
	ADDVEHIDOC,
	EDITVEHIDOC,
	DELETEVEHIDOC,
	EXPORTVEHIDOC,
	ADDARPU,
	EDITARPU,
	DELETEARPU,
	ADDBOUN,
	EDITBOUN,
	DELETEBOUN,
	ADDLEVE,
	EDITLEVE,
	DELETELEVE,
	ADDTYPE,
	EDITTYPE,
	DELETETYPE,
	ADDDANGER,
	EDITDANGER,
	DELETEDANGER,
	ADDPERRATE,
	EDITPERRATE,
	DELETEPERRATE,
	ADDVEHRATE,
	EDITVEHRATE,
	DELETEVEHRATE,
	ADDMAINORGAN,
	ADDCHILDORGAN,
	EDITORGAN,
	DELETEORGAN,
	CARPECSTATEXPORT,
	CARPECSTATEXPORTSETTING,
	FLIGHTDISPATCHTIMEEXPORT,
	FLIGHTDISPATCHTIMEEXPORTSETTING,
	CARTOTALMILESEXPORT,
	CARTOTALMILESEXPORTSETTING,
	PERSIONCARTASKINDEXEXPORT,
	PERSIONCARTASKINDEXEXPORTSETTING,
	PERVEHONLINERATEINDEXEXPORT,
	PERVEHONLINERATEINDEXEXPORTSETTING,
	USEREFFICIENCYEXPORT,
	USEREFFICIENCYEXPORTSETTING,
	CAREFFICIENCYINDEXEXPORT,
	CAREFFICIENCYINDEXEXPORTSETTING,
	FLIGHTDISPATCHFINISHINDEXEXPORT,
	FLIGHTDISPATCHFINISHINDEXEXPORTSETTING,
	FLIGHTSEARCHTOTALEXPORT,
	FLIGHTSEARCHTOTALEXPORTSETTING,
	FLIGHTDYNAMICEXPORT,
	FLIGHTDYNAMICEXPORTSETTING,
	LOGAUDITEXPORT,
	LOGAUDITEXPORTSETTING,
	USEROPLOGSAUDITEXPORT,
	USEROPLOGSAUDITEXPORTSETTING,
	ADDSTANDAREA,
	DELSTANDAREA,
	EDITSTANDAREA,
	SAVEAREAWITHSTANDS,
	ADDVOICE,
	DELETEVOICE,
	BATCHARPU,
	BATCHBOUN,
	ADDCARPARKING,
	EDITCARPARKING,
	DELETECARPARKING,
	EDITJOB,
	DELJOB,
	ADDJOB,
	ADDVEHLOCATION,
	EDITVEHLOCATION,
	DELETEVEHLOCATION
};
