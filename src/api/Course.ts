import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const Course = {
    fetchCourses: async () => {
        const response = await axios.get(`${API_URL}/courses`);
        return response.data;
    },

    fetchCourseById: async (id) => {
        const response = await axios.get(`${API_URL}/courses/${id}`);
        return response.data;
    },

    createCourse: async (courseData) => {
        const response = await axios.post(`${API_URL}/courses`, courseData);
        return response.data;
    },

    deleteCourse: async (id) => {
        await axios.delete(`${API_URL}/courses/${id}`);
    },
    getCoursesByUserId: async (userId: number) => {
        const response = await axios.get(`${API_URL}/courses/user/${userId}`);
        return response.data;
    }
};

export default Course;