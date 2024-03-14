import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromLocalStorage } from "../helpers/localStorage.helper";
import { ICar, ISingleCar } from "../types";

export const carsApi = createApi({
  reducerPath: "carsApi",
  tagTypes: ["Cars"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://excited-pantyhose-fox.cyclic.app/api/",
    /*  baseUrl: "http://localhost:3000/api/", */
    prepareHeaders: (headers, { getState }) => {
      const token = getTokenFromLocalStorage();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getCars: builder.query<ICar[], void>({
      query: () => "car/list",
      providesTags: ["Cars"],
    }),

    getCar: builder.query<ISingleCar, string>({
      query: (id) => `car/${id}`,
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
  useGetCarQuery,
  useAddCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
} = carsApi;
