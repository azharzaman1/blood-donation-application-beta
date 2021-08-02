export const getFromLS = (key, item) => {
  item = JSON.parse(localStorage.getItem(key));
  return item;
};
