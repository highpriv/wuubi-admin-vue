import axios from "axios";

const baseURL = "http://localhost:3000";
const authSession = sessionStorage.getItem("auth");
const auth = JSON.parse(authSession || "{}");

const api = axios.create({
  baseURL,

  headers: {
    "Content-Type": "application/json",

    Authorization: `Bearer ${auth.token}`,
  },
});

export default api;
