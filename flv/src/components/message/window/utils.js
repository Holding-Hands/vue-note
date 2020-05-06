/**
 * 返回元素的位置信息
 *
 * @param {HTMLElement} ele 要获取位置信息的元素
 * @returns {{offsetLeft: number, offsetTop: number, top: number, left: number, outerHeight: *, outerWidth: *}}
 */
export function getRelativeElementPosition(ele) {
  const {
    top: offsetTop, left: offsetLeft, height: outerHeight, width: outerWidth,
  } = ele.getBoundingClientRect();
  const top = parseInt(ele.style.top || 0, 10); // 元素自身的top
  const left = parseInt(ele.style.left || 0, 10); // 元素自身的left
  return {
    offsetLeft,
    offsetTop,
    top,
    left,
    outerHeight,
    outerWidth
  };
}
