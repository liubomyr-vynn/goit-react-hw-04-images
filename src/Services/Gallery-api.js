const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34845172-53e67b2f5b8cb8ccf3124ff1b';

const fetchImages = (query, page) => {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12

`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`Oops... there are no images matching your search... `)
    );
  });
};

const api = {
  fetchImages,
};

export default api;
