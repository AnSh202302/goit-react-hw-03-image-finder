const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '38692594-46caa16db684ae3e3990f61b0';
const searchParams = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
});

export const getImg = img => {
  return fetch(`${BASE_URL}/?q=${img}&page=1&key=${API_KEY}&${searchParams}`);
};

// const api = {
//   fetchImg,
// };
// export default api;
