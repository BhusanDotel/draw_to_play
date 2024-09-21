import { baseApi } from "./baseApi";

const ROOM_BASE_URL = "/room";

export const RoomApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createRoom: build.mutation({
      query: (body) => ({
        url: ROOM_BASE_URL,
        method: "POST",
        body,
      }),
    }),

    getTutorialDetail: build.query({
      query: (id) => `${ROOM_BASE_URL}/${id}`,
    }),
  }),
  overrideExisting: false,
});

export const { useCreateRoomMutation, useGetTutorialDetailQuery } = RoomApi;
