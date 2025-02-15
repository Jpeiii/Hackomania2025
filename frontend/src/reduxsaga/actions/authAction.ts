import { ISignIn, ISignUp } from "../../constants/types";

// export const SIGN_OUT = "SIGN_OUT";
export const SIGN_UP = "SIGN_UP";
export const AUTH_STATUS = "AUTH_STATUS";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAIL = "SIGN_UP_FAIL";
export const RESTORE_TOKEN = "RESTORE_TOKEN"
export const SIGN_IN = "SIGN_IN";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_FAIL = "SIGN_IN_FAIL";

export const signUp = () => ({
  type: SIGN_UP,
  registration: {
    username: "",
    email: "",
    password: "",
  } as ISignUp,
});

export const authStatus = () => ({
  type: AUTH_STATUS,
});

export const signUpSuccess = (token: string) => ({
  type: SIGN_UP_SUCCESS,
  status: "success",
  token
});

export const signUpFail = () => ({
  type: SIGN_UP_SUCCESS,
  status: "fail",
})

export const restoreToken = () => ({
  type: RESTORE_TOKEN,
  token: null,
});

export const signIn = () => ({
  type: SIGN_IN,
  registration: {
    email: "",
    password: "",
  } as ISignIn,
});

export const signInSuccess = (token: string) => ({
  type: SIGN_IN_SUCCESS,
  status: "success",
  token
});

export const signInFail = () => ({
  type: SIGN_IN_FAIL,
  status: "fail",
})
