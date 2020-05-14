import { getStorage, setStorage } from '@/utils/storage';
import { vIf } from './lang';

//获取视频的缩略图
const getVideoImg = (messageInfo, videoUrl, callback, resolve) => {
    if(!videoUrl){
        return;
    } 

    let video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    let canvas = document.createElement('canvas');

    video.src = videoUrl;
    video.addEventListener('loadeddata', function () {//加载完成事件，调用函数
        let context = canvas.getContext('2d');

        //暂时取200*400
        const imgHeight = 200;
        const imgWidth =  400;
        context.drawImage(video, 0, 0, imgWidth, imgHeight);

        if(typeof callback === 'function'){
            callback(messageInfo, canvas.toDataURL('image/png'), resolve);
        } 
    });
};

//即时通讯上传文件
const uploadFile = (uploadUrl, uploadedFile, progressCallback, successCallback, failureCallback, uploadServer, gid, toUid, toUname, broadType, mediaType) => {
    if(!uploadUrl || !uploadServer){
        return;
    }

    var form = new FormData();
    form.append('file', uploadedFile);

    var config = {
     	onUploadProgress: progressEvent => {
            if(progressCallback){
                progressCallback(progressEvent.loaded, progressEvent.total, gid);
            }
        },
        headers: {
         	'Content-Type': 'multipart/form-data'
        }
    }

    uploadServer.post(uploadUrl, form, config).then((res) => {
        if(successCallback){
            successCallback(res, mediaType, gid, toUid, toUname, broadType);
        }
    }).catch (err => {
        if(failureCallback){
            failureCallback(err, gid);
        }
    });
};

//生成http地址
const makeFileUrl = (fileName, fileType, token, chatServerUrl) => {
    if (!fileName || !fileType || !token || !chatServerUrl) {
        return '';
    }

    return chatServerUrl + `/api/file/exportFile?fileName=${fileName}&fileType=${fileType}&token=${token}`;
};

//生成唯一id 有一定概率错 但是即时通讯场景够用
const generateId = () => {
    return (+new Date() + '' + (Math.random() + '').replace(/\./, '')).substr(0,15);
};

//复制对象方法
const objectCopy = (srcObj) => {
	if (!srcObj) {
		return null;
	}

	let newObj = {};
	for (let key in srcObj) {
		newObj[key] = srcObj[key];
	}

	return newObj;
};

//返回带有token的用户信息
const getUserInfoWithToken = () => {
    let userInfo;
    try {
        userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    } catch (err) {
        userInfo = null;
    }

    if (!userInfo) {
        return null;
    }


    let generateToken = function(userInfos){
    	if (!userInfos) {
    		return '';
    	}

    	return btoa(userInfos.userId + '@' + encodeURI(userInfos.userName));
    };

    //生成即时通讯后台所需的token信息
    userInfo.token = generateToken(userInfo);

    return userInfo;
};

//获取接收的最大消息id 用于获取历史消息使用
const getMaxReceiveMsgInfo = (userId) => {
    const receiveMsgInfoMap = getStorage('imchat_receiveId') || {};
    return receiveMsgInfoMap[userId] || null;
};

const saveMaxReceiveMsgInfo = (userId, msgId) => {
    const receiveMsgInfoMap = getStorage('imchat_receiveId') || {};
    receiveMsgInfoMap[userId] = msgId;
    setStorage('imchat_receiveId', receiveMsgInfoMap);
};


//获取接收的最大组消息id 用于获取历史消息使用
const getMaxReceiveGroupMsgInfo = (userId) => {
	let receiveMsgInfoMap = getStorage('imchat_group_receiveId') || {};
	return receiveMsgInfoMap[userId] || null;
};

//存储最大组消息id
const saveMaxReceiveGroupMsgInfo = (userId, groupMsgMap) => {
	const receiveMsgInfoMap = getStorage('imchat_group_receiveId') || {};
	receiveMsgInfoMap[userId] = groupMsgMap;

	setStorage('imchat_group_receiveId', receiveMsgInfoMap);
};

//获取群或者用户的id
const getMessageMapKeyId = (userInfo) => {
    if(!userInfo){
        return '';
    }

    let keyId;
    if (userInfo.type === 'group') {
        keyId = 'Group_' + userInfo.id;
    } else {
        keyId = userInfo.id;
    }

    return keyId;
};

//将图片文件压缩一下再传输
const getCompressedFile = (file, picData, cb) => {
    if(!file || !picData){
        return;
    }

    //小于100KB的图片不需要压缩 直接返回
    if (file.size <= 102400){
        if(cb){
            cb(picData);
        }

        return;
    }

    const img = new Image();
    img.src = picData;
    img.onload = function(){
        //生成canvas
        let canvas    = document.createElement('canvas');
        canvas.width  = this.width;
        canvas.height = this.height;

        let ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, this.width, this.height);
        // quality值越小，所绘制出的图像越模糊
        let base64 = canvas.toDataURL('image/jpeg', 0.5);
        cb(base64);
    }
};

const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
};

//修改messageMap中消息的状态
const modifyMessageState = (userId, ensureId, messageMap, state, messageStore, ifSatisfy, that) => {
    if(!userId || !ensureId){
        return;
    }

    if(messageMap[userId]){
        let messageList = messageMap[userId];
        const message = messageList.filter(item => item.ensureId === ensureId);
        vIf(messageStore, () => {
            let cb = (results) => {
                for (let result of results) {
                    vIf(!ifSatisfy || ifSatisfy(result.state, () => {
                        let newObj = objectCopy(messageList[i]);
                        newObj.state = state;
                        that.changeMessageMap({
                            userId : userId,
                            pos    : i,
                            newObj : newObj
                        });
                        result.state = state;
                        messageStore.saveData('message_map', result);
                    }))
                }
            }
            messageStore.getDataByIndex('message_map', 'ensureId', ensureId, cb);
        })//end of for
    }
};

//根据messageInfo获得keyId
const getToDestKeyId = (messageInfo) => {
    if(!messageInfo){
        return;
    }

    if (messageInfo.broadType === 'P2P'){
        if(messageInfo.direction === 'receive'){
            return messageInfo.toUid;
        } else if (messageInfo.direction === 'send'){
            return messageInfo.fromUid;
        }
    } else if (messageInfo.broadType === 'P2G'){
        return 'Group_' + messageInfo.toUid;
    }
};

export {
    getVideoImg,
    uploadFile,
    makeFileUrl,
    generateId,
    objectCopy,
    getUserInfoWithToken,
    getMaxReceiveMsgInfo,
    getMaxReceiveGroupMsgInfo,
    saveMaxReceiveMsgInfo,
    saveMaxReceiveGroupMsgInfo,
    getMessageMapKeyId,
    getCompressedFile,
    dataURLtoFile,
    modifyMessageState,
    getToDestKeyId
}