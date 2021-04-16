import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import * as Yup from "yup";
import { AuthResponse, User } from "../../Interface/type";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import http from "../../Service/api";
import { useAppDispatch } from "../../store";
import { saveToken, setAuthState } from "../../Features/Auth/authSlice";
import { setUser } from "../../Features/Auth/userSlice";

const schema = Yup.object().shape({
  username: Yup.string()
    .required("Please enter username")
    .max(16, "username must not be greater than 16 characters"),
  password: Yup.string().required("Please enter password to continue"),
  email: Yup.string().email("Please enter a valid email"),
});

const Login = () => {
  const dispatch = useAppDispatch();
  const { handleSubmit, register, errors } = useForm<User>({
    resolver: yupResolver(schema),
  });

  const [isLogin, setIsLogin] = useState<boolean>(true);

  const submitForm = (data: User) => {
    const path = isLogin ? "/auth/login" : "/auth/signup";

    http
      .post<User, AuthResponse>(path, data)
      .then((res) => {
        if (res) {
          const { token, user } = res;
          dispatch(saveToken(token));
          dispatch(setUser(user));
          dispatch(setAuthState(true));
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Form onSubmit={handleSubmit(submitForm)}>
        <Form.Group controlId="formBasicText">
          <Form.Label>Username</Form.Label>
          <Form.Control
            ref={register}
            name="username"
            required={true}
            type="text"
            placeholder="Enter Username"
          />
          {errors && errors.username && (
            <Alert variant={"danger"}>{errors.username.message}</Alert>
          )}
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            ref={register}
            name="password"
            required={true}
            type="password"
            placeholder="Enter password"
          />
          {errors && errors.password && (
            <Alert variant={"danger"}>{errors.password.message}</Alert>
          )}
        </Form.Group>
        {!isLogin && (
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address (optional)</Form.Label>
            <Form.Control
              ref={register}
              name="email"
              type="email"
              placeholder="Enter email"
            />
            {errors && errors.email && (
              <Alert variant={"danger"}>{errors.email.message}</Alert>
            )}
          </Form.Group>
        )}
        {isLogin ? (
          <Button variant="primary" type="submit">
            Login
          </Button>
        ) : (
          <Button variant="primary" type="submit">
            Signup
          </Button>
        )}
        <Form.Text
          style={{ cursor: "pointer" }}
          onClick={() => setIsLogin(!isLogin)}
          className="text-muted"
        >
          {isLogin
            ? "Need an account? Signup"
            : "Already have an account? Login"}
        </Form.Text>
      </Form>
    </div>
  );
};

export default Login;
