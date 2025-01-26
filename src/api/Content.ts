import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const Content = {
    fetchContents: async () => {
        const response = await axios.get(`${API_URL}/content`);
        return response.data;
    },

    fetchContentById: async (id) => {
        const response = await axios.get(`${API_URL}/content/${id}`);
        return response.data;
    },

    createContent: async (contentData) => {
        const response = await axios.post(`${API_URL}/content`, contentData);
        return response.data;
    },

    updateContent: async (id, contentData) => {
        const response = await axios.patch(`${API_URL}/content/${id}`, contentData);
        return response.data;
    },

    deleteContent: async (id) => {
        await axios.delete(`${API_URL}/content/${id}`);
    },
};

export default Content;