//用于操作本地存储模块
// 存
export const setItem = (key, value) => {
  //如果为数组或者对象,先转为JSON格式
  if (value instanceof Object) value = JSON.stringify(value);
  window.localStorage.setItem(key, value);
};
// 取
export const getItem = key => {
  //使用try catch 用来转换JSON格式
  const data = window.localStorage.getItem(key);
  try {
    return JSON.parse(data); //如果为非JSON格式，进行下一步
  } catch (error) {
    return data;
  }
};
// 删
export const removeItem = key => {
  window.localStorage.removeItem(key);
};
