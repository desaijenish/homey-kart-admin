import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Candidate, Candidates } from "../../types/candidate";

export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BaseURL,
    prepareHeaders: (headers, { getState }: any) => {
      const state = getState();
      const token = state.auth.token;
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["employee", "training", "salary"],
  endpoints: (builder) => ({
    getEmployee: builder.query<
      any,
      {
        search: string | undefined;
      }
    >({
      query: ({ search }) => {
        const params = new URLSearchParams();
        if (search != undefined && search.length > 0) {
          params.set("search", search);
        }
        return `employee/search?skip=0&limit=100&${params.toString()}`;
      },
      providesTags: ["employee"],
    }),

    getEmployeeById: builder.query<any, string>({
      query: (id) => `/employee/${id}`,
      providesTags: ["employee"],
    }),

    createEmployee: builder.mutation<void, any>({
      query: (input) => ({
        url: `/employee`,
        method: "POST",
        body: input,
      }),
      invalidatesTags: ["employee"],
    }),
    createTraining: builder.mutation<void, any>({
      query: (input) => ({
        url: `/training`,
        method: "POST",
        body: input,
      }),
      invalidatesTags: ["training", "employee"],
    }),
    getTrainingById: builder.query<any, string>({
      query: (id) => `/training/${id}`,
      providesTags: ["employee"],
    }),
    updateTraining: builder.mutation<void, any>({
      query: ({ id, input }) => ({
        url: `/training/${id}`,
        method: "PUT",
        body: input,
      }),
      invalidatesTags: ["training", "employee"],
    }),
    createSalary: builder.mutation<void, any>({
      query: (input) => ({
        url: `/salary`,
        method: "POST",
        body: input,
      }),
      invalidatesTags: ["salary", "employee"],
    }),
  }),
});

export const {
  useGetEmployeeQuery,
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useCreateTrainingMutation,
  useCreateSalaryMutation,
  useGetTrainingByIdQuery,
  useUpdateTrainingMutation,
} = employeeApi;
