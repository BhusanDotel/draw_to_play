import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { hostURL } from "../utils/apiRoutes";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${hostURL}/api`,
  }),

  // Define the endpoints for the service
  endpoints: () => ({}),
});
