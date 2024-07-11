import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const timetableApi = createApi({
  reducerPath: "timetableApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BaseURL,
    prepareHeaders: (headers, { getState }: any) => {
      const state = getState();
      const token = state.auth.token;
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["timetable"],
  endpoints: (builder) => ({
    getTimeTable: builder.query<any, { selectDate: string }>({
      query: ({ selectDate }) => `/timetable/list/${selectDate}`,
      providesTags: ['timetable'],
    }),
    getByEmployeeId: builder.query<any, any>({
      query: (id) => `/timetable/${id}`,
      providesTags: ["timetable"],
    }),
    createTimeTable: builder.mutation({
      query: (employeeId) => ({
        url: `/timetable?employee_id=${employeeId}`,
        method: "POST",
      }),
      invalidatesTags: ["timetable"],
    }),
    createStartBreak: builder.mutation({
      query: (id) => ({
        url: `/timetable/start_break/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["timetable"],
    }),
    createEndBreak: builder.mutation({
      query: (id) => ({
        url: `/timetable/end_break/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["timetable"],
    }),
    createEndTime: builder.mutation({
      query: (id) => ({
        url: `/timetable/end_time/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["timetable"],
    }),
  }),
});

export const {
  useGetTimeTableQuery,
  useCreateTimeTableMutation,
  useCreateStartBreakMutation,
  useGetByEmployeeIdQuery,
  useCreateEndBreakMutation,
  useCreateEndTimeMutation
} = timetableApi;
