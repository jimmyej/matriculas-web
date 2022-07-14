import axios from "axios";

const instance = axios.create({
  baseURL: "/api/enroll-management",
  headers: {
    "Content-type": "application/json"
  }
});

export default instance;