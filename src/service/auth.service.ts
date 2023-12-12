import api from "./api.service";
import { PostLoginRequest, PostLoginResponse } from "@/http";
import { AxiosResponse } from "axios";

export const postLogin = async (body: PostLoginRequest): Promise<PostLoginResponse> => {
  const uri = `/login`;
  const res: AxiosResponse = await api.post(uri, body);

  return res.data;
};
