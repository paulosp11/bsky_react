import { Response, Request } from "miragejs";
import { User, AuthResponse } from "../../Interface/type";
import { randomBytes } from "crypto";
import { handleErrors } from "../server";

const generateToken = () => randomBytes(8).toString("hex");

export const login = (schema: any, req: Request): AuthResponse | Response => {
  const { username, password } = JSON.parse(req.requestBody);
  const user = schema.users.findBy({ username });

  if (!user) {
    return handleErrors(null, "No user with this username");
  }

  if (password !== user.password) {
    return handleErrors(null, "Password is incorrect");
  }

  const token = generateToken();
  return {
    user: user.attrs as User,
    token,
  };
};

export const signup = (schema: any, req: Request): AuthResponse | Response => {
  const data = JSON.parse(req.requestBody);
  const exUser = schema.users.findBy({ username: data.username });

  if (exUser) {
    return handleErrors(null, "A user with this username already exists");
  }

  const token = generateToken();
  const user = schema.users.create(data);

  return {
    user: user.attrs as User,
    token,
  };
};
