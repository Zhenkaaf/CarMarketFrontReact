import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromLocalStorage } from "../helpers/localStorage.helper";
import { GetMyCarsResponse, ICar } from "../types";

export const carsApi = createApi({
  reducerPath: "carsApi",
  tagTypes: ["Cars"],
  baseQuery: fetchBaseQuery({
    /* baseUrl: "https://carmarketbacknest.onrender.com/api/", */
    /*  baseUrl: "https://excited-pantyhose-fox.cyclic.app/api/", */
    baseUrl: "http://localhost:3000/api/",
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
      /* invalidatesTags: ["Cars"] указывает на тэг или группу тэгов, которые должны быть инвалидированы (помечены как устаревшие) после успешного выполнения мутации. В контексте Redux Toolkit Query это означает, что после удаления машины из списка, связанного с тэгом "Cars", данный список будет автоматически обновлен, так как тэг "Cars" будет помечен как устаревший. Это позволяет автоматически обновлять данные, зависящие от удаленной машины, без необходимости явно вызывать методы обновления или перезагрузки данных. Когда тэг помечается как устаревший, любые компоненты, которые используют данные, связанные с этим тэгом, будут автоматически обновлены при следующем запросе на эти данные. */
    }),

    /*  deletePhotos: builder.mutation({
      query: (id) => ({
        url: `car/delete-photos/${id}`,
        method: "DELETE",
      }),
    }), */
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

/* После выполнения мутации updateCar и инвалидации кэша для тега Cars, RTK Query автоматически перезапрашивает все данные, связанные с этим тегом, чтобы обеспечить актуальность данных в твоем приложении. Это происходит следующим образом:

Запросы, связанные с тегом Cars: Если в твоем приложении есть запросы, которые ассоциированы с тегом Cars (например, запрос на получение списка всех автомобилей с помощью useGetCarsQuery()), то после инвалидации кэша эти запросы будут автоматически выполнены заново.

Обновление данных в кэше: Когда запросы выполняются повторно, RTK Query получает новые данные с сервера и обновляет кэш этими данными.

Обновление компонентов: Все компоненты, которые используют данные, связанные с тегом Cars (например, через useGetCarsQuery()), автоматически обновятся с новыми данными, как только они будут получены.

Пример
Если у тебя на главной странице (HomePage) есть список автомобилей, который загружается через useGetCarsQuery(), этот запрос связан с тегом Cars. После того, как ты обновляешь автомобиль с помощью мутации updateCar, и RTK Query инвалидирует тег Cars, запрос useGetCarsQuery() будет выполнен снова, и список автомобилей на главной странице будет обновлен с учётом последних изменений.

Куда загружаются данные?
Данные загружаются в кэш RTK Query и автоматически передаются в соответствующие компоненты, которые их используют, через хуки (например, useGetCarsQuery()), обеспечивая их обновление без необходимости вручную управлять состоянием. */
