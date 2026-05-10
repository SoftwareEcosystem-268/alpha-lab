import api from './api';

export const gradeService = {
  saveGradeHistory: async (gradeData) => {
    const response = await api.post('/grades', gradeData);
    return response.data;
  },

  getGradeHistory: async () => {
    const response = await api.get('/grades/history');
    return response.data;
  },

  getGradeStats: async () => {
    const response = await api.get('/grades/stats');
    return response.data;
  },

  deleteGradeHistory: async (id) => {
    const response = await api.delete(`/grades/${id}`);
    return response.data;
  }
};
