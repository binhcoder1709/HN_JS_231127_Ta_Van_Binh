import axios from "axios";

// config axios instance
const baseUrl = axios.create({
  baseURL: "http://localhost:3000/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default baseUrl;
