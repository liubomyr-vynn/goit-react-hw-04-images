const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34845172-53e67b2f5b8cb8ccf3124ff1b';

const fetchImages = async (query, page) => {
  const response = await fetch(
    `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12
  `
  );
  const images = await response.json();
  return images;
};

const api = {
  fetchImages,
};

export default api;
