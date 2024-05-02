import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromLocalStorage } from "../helpers/localStorage.helper";
import { ICar } from "../types";

export const carsApi = createApi({
  reducerPath: "carsApi",
  tagTypes: ["Cars"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://excited-pantyhose-fox.cyclic.app/api/",
    /*  baseUrl: "http://localhost:3000/api/", */
    prepareHeaders: (headers) => {
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

    getCar: builder.query<ICar, string>({
      query: (id) => `car/${id}`,
      providesTags: ["Cars"],
    }),

    getMyCars: builder.query<ICar[], string>({
      query: (userId) => `car/my-cars/${userId}`,
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

    addPhotosToCar: builder.mutation({
      query: ({ carId, formData }) => ({
        url: `car/add-photos/${carId}`,
        method: "POST",
        body: formData,
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
  useGetMyCarsQuery,
  useAddCarMutation,
  useAddPhotosToCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
} = carsApi;
