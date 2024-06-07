import { User } from "@/types/User";
import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsersData = async () => {
  const response: { data: User[] } = await axios.get(`${API_BASE_URL}`);
  return response.data;
};

export const fetchUserData = async (userId: number) => {
  const response: { data: User } = await axios.get(`${API_BASE_URL}/${userId}`);
  return response.data;
};

export const updateUserData = async (userId: number, params: User) => {
  const response: { data: User } = await axios.put(
    `${API_BASE_URL}/${userId}`,
    params
  );
  return response.data;
};
