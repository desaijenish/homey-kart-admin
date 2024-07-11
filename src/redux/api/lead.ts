import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const leadApi = createApi({
  reducerPath: "leadApi",
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
  tagTypes: ["lead", "stage"],
  endpoints: (builder) => ({
    getLead: builder.query<
      any,
      {
        search: string | undefined;
        status: string[] | undefined;
        location: string | undefined;
      }
    >({
      query: ({ search, status, location }) => {
        const params = new URLSearchParams();
        if (search != undefined && search.length > 0) {
          params.set("search", search);
        }
        if (status != undefined && status.length > 0) {
          for (let s of status) {
            params.append("status", s);
          }
        }
        if (location != undefined && location.length > 0) {
          params.set("location", location);
        }
        return `lead/search?skip=0&limit=100&${params.toString()}`;
      },
      providesTags: ["lead"],
    }),
    getLeadsById: builder.query<any, string>({
      query: (id) => `/lead/${id}`,
      providesTags: ["lead"],
    }),
    createLead: builder.mutation<void, any>({
      query: (input) => ({
        url: `/lead/add`,
        method: "POST",
        body: input,
      }),
      invalidatesTags: ["lead"],
    }),
    leadDump: builder.mutation({
      query: (input) => ({
        url: `/lead/dump`,
        method: "POST",
        body: input,
      }),
      invalidatesTags: ["lead"],
    }),
    createStage: builder.mutation<void, any>({
      query: (input) => ({
        url: `/stage`,
        method: "POST",
        body: input,
      }),
      invalidatesTags: ["stage", "lead"],
    }),
  }),
});

export const {
  useGetLeadQuery,
  useGetLeadsByIdQuery,
  useCreateLeadMutation,
  useLeadDumpMutation,
  useCreateStageMutation,
} = leadApi;
