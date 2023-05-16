import axios from "axios";
import { config } from "./config";

console.info(config)

export const backAPI = {
  login: async (data: any) => {
    return axios.post(`http://${config.FRONT_IP}:${config.FRONT_PORT}/user/login`, {
      email: data.email,
      password: data.password,
    });
  },
  auth: async (res: any) => {
    return axios.get(`http://${config.FRONT_IP}:${config.FRONT_PORT}/auth/get_token`, {
      withCredentials: true,
      headers: {
        Authorization: res.data.token,
      },
    });
  },
  singup: async (user: any) => {
    return axios.post(`http://${config.FRONT_IP}:${config.FRONT_PORT}/user/signup`, user);
  },

  getEmails: async (token: any) => {
    return axios.get(`http://${config.FRONT_IP}:${config.FRONT_PORT}/mail/`, {
      withCredentials: true,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },

  deleteMail: async (token: string, mailId: string) => {
    return axios.delete(
      `http://${config.FRONT_IP}:${config.FRONT_PORT}/mail/delete/${mailId}`,
      {
        withCredentials: true,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
  },

  createMail: async (token: string, post: object) => {
    return axios.post(`http://${config.FRONT_IP}:${config.FRONT_PORT}/mail/create`, post, {
      withCredentials: true,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },

  getRecipients: async (token: string) => {
    return axios.get("http://127.0.0.1:8000/user/", {
      withCredentials: true,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  // delete: async (groupID: string) => { await axios.delete(`http://${config.IP}:${config.PORT}/group/delete/${groupID}`) },
};
