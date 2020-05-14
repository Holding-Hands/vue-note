/**
 * 获取元素到document左边和顶部的距离
 * @param {HTMLElement} element
 */

const getTopAndLeft = (element) => {
  let l = element.offsetLeft;
  let t = element.offsetTop;
  while (element === element.offsetParent) {
    l += element.offsetLeft;
    t += element.offsetTop;
  }
  return {
    l,
    t
  };
};
// 获取当前元素样式
const getStyle = (obj, attr) => {
  if (obj.currentStyle) {
    return obj.currentStyle[attr];
  }
  return getComputedStyle(obj, '伪类')[attr];
};

export {
  getTopAndLeft,
  getStyle,
};
