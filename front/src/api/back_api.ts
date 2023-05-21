import axios, { AxiosResponse } from "axios";
import { config } from "./config";
import { LoginFormInputs } from "../conponent/Login";

// axios instance

export const backAPI = {
  login: async (data: LoginFormInputs) => {
    return axios.post(
      `https://${config.FRONT_IP}:${config.FRONT_PORT}/api/user/login`,
      {
        email: data.email,
        password: data.password,
      },
      {
        withCredentials: true, 
      }
    );
  },
  auth: async (res: AxiosResponse<any, any>) => {
    return axios.get(
      `https://${config.FRONT_IP}:${config.FRONT_PORT}/api/auth/get_token`,
      {
        withCredentials: true,
        headers: {
          Authorization: res.data.token,
        },
      }
    );
  },
  singup: async (user: Object) => {
    return axios.post(
      `https://${config.FRONT_IP}:${config.FRONT_PORT}/api/user/signup`,
      user,
      {
        withCredentials: true, 
      }
    );
  },

  getEmails: async (token: string) => {
    return axios.get(
      `https://${config.FRONT_IP}:${config.FRONT_PORT}/api/mail/`,
      {
        withCredentials: true,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
  },

  deleteMail: async (token: string, mailId: string) => {
    return axios.delete(
      `https://${config.FRONT_IP}:${config.FRONT_PORT}/api/mail/delete/${mailId}`,
      {
        withCredentials: true,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
  },

  createMail: async (token: string, post: object) => {
    return axios.post(
      `https://${config.FRONT_IP}:${config.FRONT_PORT}/api/mail/create`,
      post,
      {
        withCredentials: true,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
  },

  getRecipients: async (token: string) => {
    return axios.get("https://127.0.0.1:8000/api/user/", {
      withCredentials: true,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
};
