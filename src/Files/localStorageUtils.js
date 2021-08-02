<<<<<<< Updated upstream
export const getFromLS = (key, item) => {
  item = JSON.parse(localStorage.getItem(key));
  return item;
=======
export const getFromLS = (key, data) => {
  data = JSON.parse(localStorage.getItem(key));
  return data;
};

export const setToLS = (key, item) => {
  localStorage.setItem(key, JSON.stringify(item));
>>>>>>> Stashed changes
};
