import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoapiHeaders = {
  "X-RapidAPI-Key": "c2301b1f3bmsha4b48944d896a95p1b0f87jsn662cfd94e080",
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoapiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
  }),
});

export const { useGetCryptosQuery } = cryptoApi;
