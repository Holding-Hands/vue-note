/**
 * 事件生成器
 * @param {Object} handler 事件对象
 * @returns {Object} 处理后的事件对象
 * @author yujie
 */

export const createEvent = handler => ({ on: handler });
