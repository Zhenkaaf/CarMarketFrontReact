import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromLocalStorage } from "../helpers/localStorage.helper";
import { ICar } from "../types";

export const carsApi = createApi({
  reducerPath: "carsApi",
  tagTypes: ["Cars"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://carmarketbacknest.onrender.com/api/",
    /*  baseUrl: "https://excited-pantyhose-fox.cyclic.app/api/", */
    /*   baseUrl: "http://localhost:3000/api/", */
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
      /*   invalidatesTags: ["Cars"], */
      /* invalidatesTags: ["Cars"] указывает на тэг или группу тэгов, которые должны быть инвалидированы (помечены как устаревшие) после успешного выполнения мутации. В контексте Redux Toolkit Query это означает, что после удаления машины из списка, связанного с тэгом "Cars", данный список будет автоматически обновлен, так как тэг "Cars" будет помечен как устаревший. Это позволяет автоматически обновлять данные, зависящие от удаленной машины, без необходимости явно вызывать методы обновления или перезагрузки данных. Когда тэг помечается как устаревший, любые компоненты, которые используют данные, связанные с этим тэгом, будут автоматически обновлены при следующем запросе на эти данные. */
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

/* Если вы не указали providesTags, то при добавлении новой машины данные в кэше не будут обновлены, и запрос на получение ваших машин (useGetMyCarsQuery) не будет автоматически отправлен при добавлении новой машины.

Чтобы решить эту проблему, вы можете вручную вызвать функцию refetch из хука useGetMyCarsQuery после добавления новой машины. 

Процесс такой: при первом монтировании компонента хук useGetMyCarsQuery будет выполнен, что приведет к автоматической отправке запроса на сервер для получения данных о машинах пользователя.

Проблема возникает при добавлении новой машины. Поскольку вы не указали providesTags в определении вашего эндпоинта getMyCars, после добавления новой машины данные в кэше не будут обновлены. Поэтому для обновления списка машин после добавления новой машины требуется явный вызов refetch из хука useGetMyCarsQuery*/
