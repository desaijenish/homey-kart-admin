import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  ErrorMessage,
  Field,
  FieldProps,
  Form,
  Formik,
  FormikValues,
} from "formik";
import * as Yup from "yup";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRegisterUserMutation } from "../../redux/api/login";

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
  boxShadow: "20px 20px 10px grey",
});

const Text = styled.div({
  textAlign: "center",
  fontSize: "20px",
  paddingBottom: 30,
});

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 15,
});

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
  password: Yup.string().required("Required"),
});

const FieldContainer = styled.div({
  display: "flex",
  gap: 10,
  flexDirection: "column",
});
const Error = styled.div({
  color: "red",
});

const Register = () => {
  const [register] = useRegisterUserMutation();
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <RootContainer>
      <Text>Register</Text>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          register(values);
        }}
      >
        {({ errors }) => (
          <Form>
            <Container>
              <FieldContainer>
                <Field name="name">
                  {({ field }: FieldProps<FormikValues>) => (
                    <TextField
                      {...field}
                      label="Name"
                      type="text"
                      autoComplete="name"
                    />
                  )}
                </Field>
                <Error>
                  <ErrorMessage name="name" />
                </Error>
              </FieldContainer>
              <FieldContainer>
                <Field name="email">
                  {({ field }: FieldProps<FormikValues>) => (
                    <TextField
                      {...field}
                      label="Email"
                      type="email"
                      autoComplete="email"
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
                      autoComplete="password"
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
        )}
      </Formik>
    </RootContainer>
  );
};

export default Register;
