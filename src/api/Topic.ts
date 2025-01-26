import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const Topic = {
    fetchTopics : async () => {
        const response = await axios.get(`${API_URL}/topics`);
        return response.data;
    },

    fetchTopicById : async (id) => {
        const response = await axios.get(`${API_URL}/topics/${id}`);
        return response.data;
    },

    createTopic : async (topicData) => {
        const response = await axios.post(`${API_URL}/topics`, topicData);
        return response.data;
    },

    updateTopic : async (id, topicData) => {
        const response = await axios.put(`${API_URL}/topics/${id}`, topicData);
        return response.data;
    },

    deleteTopic : async (id) => {
        await axios.delete(`${API_URL}/topics/${id}`);
    },
    getTopicsByCourseId : async (courseId : string) => {
        const response = await axios.get(`${API_URL}/topics/course/${courseId}`);
        return response.data;
    }
}


export default Topic;