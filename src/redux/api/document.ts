import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  DocumentId,
  Documents,
  DocumentsResponse,
} from "../../types/Documents";

export const documentApi = createApi({
  reducerPath: "documentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BaseURL,
    prepareHeaders: (headers, { getState }: any) => {
      const state = getState();
      const token = state.auth.token;
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["document"],
  endpoints: (builder) => ({
    getUploadDocument: builder.query({
      query: (id) => `/document/${id}`,
      providesTags: ["document"],
    }),

    uploadDocument: builder.mutation({
      query: (formData) => ({
        url: "/document/pdf",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["document"],
    }),
    uploadDocumentPng: builder.mutation({
      query: (formData) => ({
        url: "/document/png",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["document"],
    }),

    deleteDocument: builder.mutation<DocumentsResponse, number>({
      query: (id) => ({
        url: `/document/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["document"],
    }),
  }),
});

export const {
  useGetUploadDocumentQuery,
  useUploadDocumentMutation,
  useDeleteDocumentMutation,
  useUploadDocumentPngMutation,
} = documentApi;
