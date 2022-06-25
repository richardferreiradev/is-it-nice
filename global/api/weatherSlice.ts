import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEYS = {
  WEATHER_API_KEY_VALUE: "368334870e46486e85613919222506",
};

const URLS = {
  BASE_URL: `http://api.weatherapi.com/v1`,
  GET_CURRENT_WEATHER: `current.json?key=${API_KEYS.WEATHER_API_KEY_VALUE}`,
};

export const weatherApiSlice = createApi({
  reducerPath: "api", //this is default,
  baseQuery: fetchBaseQuery({ baseUrl: URLS.BASE_URL }),
  endpoints: (builder) => ({
    getCurrentWeather: builder.query({
      query: (zipCode: string | number) =>
        `${URLS.GET_CURRENT_WEATHER}&q=${zipCode}`,
    }),
  }),
});

export const { useGetCurrentWeatherQuery }: any = weatherApiSlice;
