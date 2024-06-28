import axios from "axios"

axios.defaults.baseURL = "https://api.unsplash.com/";

export const getGallery = async (value, page) => {
    const response = await axios.get("/search/photos", {
        params: {
            client_id: "jB2ydWfewkIggjp7D7C7izBXYdxrdopjBOWATE47Qy8",
            query: value,
            per_page: 12,
            page,
            orientation: "landscape",
        }
    });
    return response.data.results;
}