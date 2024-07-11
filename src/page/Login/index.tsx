import React, { useState } from "react";
import {
  ErrorMessage,
  Field,
  FieldProps,
  Form,
  FormikValues,
  Formik,
} from "formik";
import * as Yup from "yup";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Cookies from "universal-cookie";

import { useLoginUserMutation } from "../../redux/api/login";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

const RootContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  left: "50%",
  top: "50%",
  position: "fixed",
  transform: "translate(-50%, -50%)",
  border: "1px solid #64748B",
  padding: 30,
  borderRadius: 20,
  boxShadow: "20px 20px 50px grey",
});

const Text = styled.div({
  textAlign: "center",
  fontSize: "20px",
  paddingBottom: 30,
});

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 25,
});

const SignupSchema = Yup.object().shape({
  email: Yup.string().email().required("Email Required"),
  password: Yup.string().required("Password Required"),
});

const FieldContainer = styled.div({
  display: "flex",
  gap: 10,
  flexDirection: "column",
});

const Error = styled.div(() => ({
  color: "red",
}));

const Login = () => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const router = useNavigate();
  const [loginUser] = useLoginUserMutation();
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <RootContainer>
        <Text>Login</Text>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={async (inputData) => {
            console.log(inputData);

            const result = await loginUser(inputData);
            console.log(result);
            if ("data" in result) {
              const tokenValue = String(result.data.token);
              cookies.set("token", tokenValue);
              console.log(tokenValue);
              dispatch(setToken(tokenValue));
              router("/");
            } else {
              console.error("Error occurred:", result.error);
              const error = String(result.error);
              console.log(error);
            }
          }}
        >
          {/* {({ errors }) => ( */}
          <Form>
            <Container>
              <FieldContainer>
                <Field name="email">
                  {({ field }: FieldProps<FormikValues>) => (
                    <TextField
                      {...field}
                      label="email"
                      type="email"
                      sx={{ width: 300 }}
                    />
                  )}
                </Field>
                <Error>
                  <ErrorMessage name="email" />
                </Error>
              </FieldContainer>
              <FieldContainer>
                <Field name="password">
                  {({ field }: FieldProps<FormikValues>) => (
                    <TextField
                      {...field}
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      sx={{ width: 300 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword((show) => !show)}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                </Field>
                <Error>
                  <ErrorMessage name="password" />
                </Error>
              </FieldContainer>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Container>
          </Form>
          {/* )} */}
        </Formik>
        <Button
          variant="contained"
          style={{ marginTop: 10 }}
          onClick={() => router("/register")}
        >
          Register
        </Button>
      </RootContainer>
    </>
  );
};

export default Login;
