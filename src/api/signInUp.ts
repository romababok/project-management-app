import axios from "axios";

export const baseApiUrl =
  "https://final-task-backend-production-e57b.up.railway.app";

export interface SignInRequest {
  name: string;
  password: string;
}

export interface SignUpRequest extends SignInRequest {
  login: string;
}

export const signIn = async (request: SignInRequest) =>
  await axios.post(baseApiUrl + "/auth/signin", request);

export const signUp = async (request: SignUpRequest) => {
  return await axios.post(baseApiUrl + "/auth/signup", request);
};
