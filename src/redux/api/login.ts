import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BaseURL,
  }),
  tagTypes: ["login"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (input) => ({
        url: `/auth/login`,
        method: "POST",
        body: input,
      }),
      invalidatesTags: ["login"],
    }),
    registerUser: builder.mutation<void, any>({
      query: (input) => ({
        url: `/auth/register`,
        method: "POST",
        body: input,
      }),
      invalidatesTags: ["login"],
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = loginApi;
