import api from "./api";

export const register = (
  username: string,
  email: string,
  password: string
) => {
  return api.post(
    "/auth/register",
    {
      username,
      email,
      password,
    }
  );
};

export const login = (
  email: string,
  password: string
) => {
  return api.post(
    "/auth/login",
    {
      email,
      password,
    }
  );
};