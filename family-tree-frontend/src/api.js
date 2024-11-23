// src/api.js
import axios from 'axios';

const API_BASE = "http://localhost:3005/api/person"; // Replace with your backend URL if hosted

export const fetchRootMembers = () => axios.get(`${API_BASE}/`);
export const fetchPersonDetails = (id) => axios.get(`${API_BASE}/view/${id}`);
export const addPerson = (data) => axios.post(`${API_BASE}/add`, data, {
    headers: { "Content-Type": "multipart/form-data" }
});
export const deletePerson = (id) => axios.post(`${API_BASE}/delete`, { id });