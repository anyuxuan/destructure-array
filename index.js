const isType = (type) => (obj) => Object.prototype.toString.call(obj) === `[object ${type}]`;
const isString = isType('String');
const isArray = Array.isArray || isType('Array');

function destructuringArray(targetArray, formatter) {
  try {
    const REG = /\w+/g;

    if (isString(formatter)) {
      formatter = JSON.parse(formatter.replace(REG, '"$&"'));
    }

    if (targetArray == null || formatter == null || !isArray(targetArray) || !isArray(formatter)) {
      return {};
    }

    function loop(targetArray, formatter, defaultValue = {}) {
      return formatter.reduce((prev, curr, index) => {
        if (isArray(curr)) {
          return loop(targetArray[index], curr, prev);
        }
        prev[curr] = targetArray[index];
        return prev;
      }, defaultValue);
    }

    return loop(targetArray, formatter);

  } catch (err) {
    console.error(err);
  }
}

const targetArray = [1, [2, 4], 3];
const formatter = '[a,[b],c]';

const result = destructuringArray(targetArray, formatter);

console.log('result: ', result);
