import { LoginType, MutationLoginType } from "@/features/auth/models";
import { api } from "./api";
import { setToken, setUser } from "@/features/auth/slice";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<MutationLoginType, LoginType>({
      query(body) {
        return {
          url: "login",
          method: "POST",
          body,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          if (data.token !== null) dispatch(setToken(data.token));

          dispatch(setUser(data.user));
        } catch (error) {
          console.log(error, "MY ERROR");
          throw error;
        }
      },
    }),
    getUser: build.query({
      query: () => "login",
    }),
    // getConfirmEmail: build.query({
    //   query: () => "login",
    // }),
    // postConfirmEmail: build.query({
    //   query: () => "login",
    // }),
    // resetPassword: build.query({
    //   query: () => "login",
    // }),
    // confirmResetPasswordToken: build.query({
    //   query: () => "login",
    // }),
  }),
  overrideExisting: true,
});

export const { useLoginMutation } = extendedApi;
