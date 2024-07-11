import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Candidate, Candidates } from "../../types/candidate";

export const candidateApi = createApi({
  reducerPath: "candidateApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BaseURL,
    prepareHeaders: (headers, { getState }: any) => {
      const state = getState();
      const token = state.auth.token;

      headers.set("Access-Control-Allow-Origin", "*");
      headers.set("Content-Type", "application/json");
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["candidates"],
  endpoints: (builder) => ({
    getCandidate: builder.query<
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
        return `candidate/search?skip=0&limit=100&${params.toString()}`;
      },
      providesTags: ["candidates"],
    }),

    getCandidateById: builder.query<Candidates, string>({
      query: (id) => `/candidate/${id}`,
      providesTags: ["candidates"],
    }),
    createCandidate: builder.mutation<void, Candidates>({
      query: (input) => ({
        url: `/candidate`,
        method: "POST",
        body: input,
      }),
      invalidatesTags: ["candidates"],
    }),
  }),
});

export const {
  useGetCandidateQuery,
  useGetCandidateByIdQuery,
  useCreateCandidateMutation,
} = candidateApi;
