import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CurrentWeatherRoot } from "../interfaces/getCurrentWeather";
import { ForecastResult } from "../interfaces/getForecast";

const API_KEYS = {
  WEATHER_API_KEY_VALUE: "368334870e46486e85613919222506",
};

const URLS = {
  BASE_URL: `http://api.weatherapi.com/v1`,
  GET_CURRENT_WEATHER: `current.json?key=${API_KEYS.WEATHER_API_KEY_VALUE}`,
  GET_FORECAST: `forecast.json?key=${API_KEYS.WEATHER_API_KEY_VALUE}`,
};

export const weatherApi = createApi({
  reducerPath: "api", //this is default,
  baseQuery: fetchBaseQuery({ baseUrl: URLS.BASE_URL }),
  endpoints: (builder) => ({
    getCurrentWeather: builder.query<CurrentWeatherRoot, string>({
      query: (param) => `${URLS.GET_CURRENT_WEATHER}&q=${param}`,
    }),
    getForecast: builder.query<ForecastResult, string>({
      query: (param) => `${URLS.GET_FORECAST}&q=${param}&days=10`,
    }),
  }),
});

export const { useGetCurrentWeatherQuery, useGetForecastQuery } = weatherApi;
