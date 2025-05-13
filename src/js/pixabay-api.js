import axios from "axios";

const API_KEY = "50192556-e4befb0963aba9fc8ac0fc72c";

export async function getImagesByQuery(query, page) {   
    const response = await axios.get('https://pixabay.com/api/', {
        params: {
            key: API_KEY,
            q: `${query}`,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: "true",
            per_page: 15,
            page
        }
    });
    return response.data;
}
