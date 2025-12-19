import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000";

export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append("image", file);
  return axios.post(`${API_URL}/predict`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 120000
  });
};
