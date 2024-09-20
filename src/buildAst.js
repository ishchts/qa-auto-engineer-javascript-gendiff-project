import lodash from 'lodash';
import { DIFF_TYPES } from './constants.js';

const {
  isObject,
  has,
  get,
  keys,
  union,
} = lodash;
/**
 * Возвращает объект с описанием свойств
 * @param {string} name
 * @param {string} type
 * @param {*} beforeValue
 * @param {*} afterValue
 * @param {Array} children
 */
const makeNode = (name, type, beforeValue, afterValue, children) => ({
  name,
  type,
  beforeValue,
  afterValue,
  children,
});

const getBuildAst = (object1, object2) => {
  const commonKeys = union(keys(object1), keys(object2));
  return commonKeys.sort().map((name) => {
    const beforeValue = object1[name];
    const afterValue = object2[name];

    if (!has(object2, name)) {
      return makeNode(name, DIFF_TYPES.REMOVED, beforeValue, afterValue, null);
    }

    if (!has(object1, name)) {
      return makeNode(name, DIFF_TYPES.ADDED, beforeValue, afterValue, null);
    }

    if (get(object1, name) === get(object2, name)) {
      return makeNode(name, DIFF_TYPES.UNCHANGED, beforeValue, afterValue, null);
    }

    if (isObject(beforeValue) && isObject(afterValue)) {
      return makeNode(name, DIFF_TYPES.NESTED, null, null, getBuildAst(beforeValue, afterValue));
    }

    return makeNode(name, DIFF_TYPES.UPDATED, beforeValue, afterValue, null);
  });
};

export default getBuildAst;
