import _ from "lodash";
/**
 * 根据 condition 作为判断条件，执行函数 fn
 *
 * @public
 *
 * @param {Boolean} condition
 * @param {Function} fn
 * @param {Object} context (可选参) 函数的上下文
 * @param  {...any} args (可选参) 函数参数
 *
 * @returns {* || Boolean} 返回 fn 的结果值；若 fn 无返回值，则 true 表示函数被执行, 反之
 */
export function vIf(condition, fn, context = null, ...args) {
  if (condition) {
    return _.isFunction(fn) ? fn.apply(context, args) || true : false;
  }
  return false;
}

/**
 * 根据 condition 作为判断条件:
 * condition 为 true 时，执行函数 ifFn
 * condition 为 false 时，执行函数 elseFn
 * @param {Boolean} condition
 * @param {Function} ifFn
 * @param {Function} elseFn
 * @param {Object} context (可选参) 函数的上下文
 * @param  {...any} args (可选参) 函数参数
 *
 * @returns {*} 函数未被执行返回 false；若函数执行，返回函数的返回值；若函数无返回值，则返回 undefined
 */
export function vIfElse(condition, ifFn, elseFn, context = null, ...args) {
  return condition
    ? _.isFunction(ifFn) && ifFn.apply(context, args)
    : _.isFunction(elseFn) && elseFn.apply(context, args);
}

/**
 * 替代三目运算符
 *
 * @eg d.isEnabled ? '<span style="color:#008000">是</span>' : '<span style="color:#FF0000">否</span>'
 *  -> vOr(d.isEnabled, '<span style="color:#008000">是</span>', '<span style="color:#FF0000">否</span>')
 * @param {Boolean} condition
 * @param {*} p1
 * @param {*} p2
 
 * @public
 */
export function vOr(condition, p1, p2) {
  return condition ? p1 : p2;
}

/**
 * @eg _.get(opt.color, 'rgba(131, 45, 72,1)')    替换->   opt.color ? opt.color : 'rgba(131, 45, 72,1)'

 * @public
 *
 * @param {*} p1
 * @param {*} p2
 * @returns {*}
 */
export function get(p1, p2) {
  return p1 || p2;
}

/**
 * && 语法
 * @param {*} p1
 * @param {*} p2
 */
export function vAnd(p1, p2) {
  return p1 && p2;
}

/**
 * 解析 JSON 字符串
 * 但解析失败会以 字符串形式报错，从而避免终止后面代码的执行
 *
 * @param {*} str 需要被解析的 JSON 字符串
 * @returns {*} 被解析的JSON对象，或字符串形式的报错
 */
export function vJSONParse(str) {
  return _.attempt(JSON.parse.bind(null, str));
}

export default {
  vIf,
  vIfElse,
  get,
  vOr,
  vAnd,
  vJSONParse,
};
