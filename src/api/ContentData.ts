import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const ContentData = {
    fetchContentData: async () => {
        const response = await axios.get(`${API_URL}/content-data`);
        return response.data;
    },

    fetchContentDataById: async (id) => {
        const response = await axios.get(`${API_URL}/content-data/${id}`);
        return response.data;
    },

    createContentData: async (contentData) => {
        const response = await axios.post(`${API_URL}/content-data`, contentData);
        return response.data;
    },

    updateContentData: async (id, contentData) => {
        const response = await axios.patch(`${API_URL}/content-data/${id}`, contentData);
        return response.data;
    },

    deleteContentData: async (id) => {
        await axios.delete(`${API_URL}/content-data/${id}`);
    },
};

export default ContentData;