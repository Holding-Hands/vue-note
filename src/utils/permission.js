let permission;
/**
 * 获取permission
 * @author yujie
 */
const getPermission = () => {
  permission = JSON.parse(sessionStorage.getItem('permission') || '[]');
  if (!permission.length) { throw new Error('当前用户权限被清除，请重新登录');}
}

/**
 * 根据权限列表获取列表的第一个非菜单权限的地址
 * @param {Array} childFunctions 权限列表
 * @returns {String}
 * @author yujie
 */
const getFirstUrlByPermission = (childFunctions) => {
  if (!childFunctions || !childFunctions.length) {
    throw new Error('权限配置有问题，菜单不可以作为叶子节点');
  }
  while (childFunctions[0] && childFunctions[0].functionCategoryName === '菜单') {
    childFunctions = childFunctions[0].childFunctions;
  }
  if (!childFunctions || !childFunctions.length || !childFunctions[0].functionUrl) {
    throw new Error('权限配置有问题，菜单下无功能，或者功能无地址');
  }
  return childFunctions[0].functionUrl;
}

/**
 * 获取权限根对象
 * @returns {Array}
 * @author yujie
 */
export function getRootMenu() {
  if (!permission) { getPermission();}
  return permission.map(item => {
    return {
      functionName: item.functionName,
      functionId: item.functionId,
      functionUrl: item.functionCategoryId === '1' ? getFirstUrlByPermission(item.childFunctions) : item.functionUrl
    };
  });
}

/**
 * 根据权限字符串获取对应的权限对象 递归函数
 * @param {String} str 权限字符串
 * @param {Array} childFunctions 权限列表
 * @returns {Object}
 * @author yujie
 */
const getMenu = (str, childFunctions) => {
  for (const item of childFunctions) {
    if (item.functionPermission === str) { return item;}
    const result = item.childFunctions && getMenu(str, item.childFunctions);
    if (result) { return result;}
  }
  return null;
}
/**
 * 根据权限字符串获取对应的权限对象
 * @param {String} str 权限字符串
 * @param {Boolean} child 是否返回childFunctions
 * @returns {Object | Array}
 * @author yujie
 */
export function getMenuByPermission(str, child = false) {
  if (typeof str !== 'string') { throw new Error('权限字符串类型错误，请传入正确的字符串类型');}
  if (!permission) { getPermission();}
  const result = getMenu(str, permission);
  return result && (child ? result.childFunctions : result);
}

/**
 * 判断是否有权限字符串的权限
 * @param {String} str 权限字符串
 * @returns {Boolean}
 * @author yujie
 */
export function getContainsMenuByPermission(str) {
  const result = getMenuByPermission(str);
  return !!result;
}