const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '38692594-46caa16db684ae3e3990f61b0';

export const getImg = async (img, page) => {
  const searchParams = new URLSearchParams({
    page: page,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });
  const resApi = await fetch(
    `${BASE_URL}/?q=${img}&key=${API_KEY}&${searchParams}`
  );
  return resApi;
};
