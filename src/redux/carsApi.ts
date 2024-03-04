import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define our single API slice object
export const carsApi = createApi({
  reducerPath: "carsApi",
  tagTypes: ["Cars"],
  baseQuery: fetchBaseQuery({
    /*  baseUrl: "https://excited-pantyhose-fox.cyclic.app/api/", */
    baseUrl: "http://localhost:3000/api/",
    prepareHeaders: (headers, { getState }) => {
      //const token = (getState() as RootState).auth.token
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImVtYWlsIjoiYm9iQGdtYWlsLmNvbSIsImlhdCI6MTcwOTU1MjIxNCwiZXhwIjoxNzA5NjM4NjE0fQ.8ItaPFIvfZKjvAiEvrVdVwZd034J1ZN3qxEaQsZFSXk";
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getCars: builder.query({
      query: () => "car/list",
      providesTags: ["Cars"],
    }),

    addCar: builder.mutation({
      query: (body) => ({
        url: "car/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cars"],
    }),

    updateCar: builder.mutation({
      query: (data) => ({
        url: `car/update/${data.id}`,
        method: "PATCH",
        body: data.updatedCar,
      }),
      invalidatesTags: ["Cars"],
    }),

    deleteCar: builder.mutation({
      query: (id) => ({
        url: `car/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cars"],
    }),
  }),
});

export const {
  useGetCarsQuery,
  useAddCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
} = carsApi;
