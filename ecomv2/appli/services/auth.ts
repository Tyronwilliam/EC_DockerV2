import {
  LoginType,
  MutationLoginType,
  MutationRegisterType,
  QueryUserType,
  RegisterType,
  TokenType,
} from "@/features/auth/models";
import { api } from "./api";
import {  setToken, setUser } from "@/features/auth/slice";

const extendedApi = api
  .enhanceEndpoints({
    addTagTypes: ["Logged"],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getUser: build.query<QueryUserType, number>({
        query: (id) => `user/${id}`,
        providesTags: ["Logged"],
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            dispatch(setUser(data.user));
          } catch (error) {}
        },
      }),
      login: build.mutation<MutationLoginType, LoginType>({
        query(body) {
          return {
            url: "login",
            method: "POST",
            body,
          };
        },
        invalidatesTags: ["Logged"],
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            if (data.token !== null) {
              dispatch(setToken(data.token));
              dispatch(setUser(data.user));
            }
          } catch (error) {}
        },
      }),
      register: build.mutation<MutationLoginType, RegisterType>({
        query(body) {
          return {
            url: "register",
            method: "POST",
            body,
          };
        },
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            console.log(data);
            dispatch(setUser(data.user));
          } catch (error) {}
        },
      }),
    }),
    overrideExisting: true,
  });
// export const selectLogged = api.endpoints.getUser;

export const { useLoginMutation, useGetUserQuery, useRegisterMutation } =
  extendedApi;
