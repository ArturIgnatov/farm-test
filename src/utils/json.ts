export const convertJsonToObject = <T>(json: string): T => {
  try {
    const obj = JSON.parse(json);
    console.log('obj', obj)
    const convert = (item: { [key: string]: unknown }) => {
      Object.entries(item).forEach(([key, value]) => {
        if (typeof value === 'string' && value.startsWith('{"')) {
          item[key] = convertJsonToObject(value);
        }
      });
    };

    if (Array.isArray(obj)) {
      obj.forEach(el => {
        convert(el);
      });
    } else {
      convert(obj);
    }

    return obj;
  } catch (e) {
    throw e;
  }
};
