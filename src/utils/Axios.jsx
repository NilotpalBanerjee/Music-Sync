import axios from "axios";

export const principalApi = axios.create({
  baseURL: "https://jac-teacher-profile.cludocloud.com/api/",
});

export const deoApi = axios.create({
  baseURL: "https://jac-teacher-profile.cludocloud.com/api/",
});

export const accountsApi = axios.create({
  baseURL: "https://jac-teacher-profile.cludocloud.com/api/",
});

export const adminApi = axios.create({
  baseURL: "https://jac-teacher-profile.cludocloud.com/api/",
});