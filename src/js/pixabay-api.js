
import axios from 'axios';

const API_KEY = '44764686-39d1ce2fa505d935edd12a03d';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page: page,
                per_page: 15
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
}
