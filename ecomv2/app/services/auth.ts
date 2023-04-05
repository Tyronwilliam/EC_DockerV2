import {
  LoggedUserType,
  LoginType,
  MutationLoginType,
} from "@/features/auth/models";
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
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data, "HELLO ");
          if (data.token !== null) dispatch(setToken(data.token));

          dispatch(setUser(data.user));
        } catch (error) {
          console.log(error, "MY ERROR");
          throw error;
        }
      },
    }),
    register: build.query({
      query: () => "login",
    }),
    getConfirmEmail: build.query({
      query: () => "login",
    }),
    postConfirmEmail: build.query({
      query: () => "login",
    }),
    resetPassword: build.query({
      query: () => "login",
    }),
    confirmResetPasswordToken: build.query({
      query: () => "login",
    }),
  }),
  overrideExisting: true,
});

export const { useLoginMutation } = extendedApi;
// endpoints: (build) => ({
//     login: build.mutation<User, LoginType>({
//       query: async (body) => {
//         try {
//           const response = await axios.post('/login', body);
//           return {
//             url: '/login',
//             method: 'POST',
//             body: JSON.stringify(body),
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           };
//         } catch (error) {
//           throw error;
//         }
//       },
//       transformResponse: (response: AxiosResponse) => response.data,
//       onQueryStarted: (payload, { dispatch }) => {
//         dispatch(authActions.loadingStarted());
//       },
//       onQueryFinished: (result, { dispatch }) => {
//         dispatch(authActions.loadingSucceeded());
//         dispatch(authActions.setUser(result));
//       },
//       onQueryError: (error, { dispatch }) => {
//         dispatch(authActions.loadingFailed(error.message));
//       },
//     }),
//   }),
