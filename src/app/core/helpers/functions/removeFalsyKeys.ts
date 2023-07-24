type keys = { [key: string]: any };

export const removeFalsyKeys = (obj: keys): keys => {
  if (typeof obj !== 'object' || obj === null)
    throw new Error('Input is not an object.');

  return Object.keys(obj).reduce((res, key) => {
    return obj[key] === undefined || obj[key] === null || obj[key] === '' ? res : { ...res, [key]: obj[key] };
  }, {});
};
