import { put, takeLatest, call } from "redux-saga/effects";
// import * as SecureStore from 'expo-secure-store';
import { SIGN_UP, AUTH_STATUS, SIGN_UP_SUCCESS, SIGN_UP_FAIL, RESTORE_TOKEN, SIGN_IN, SIGN_IN_SUCCESS,SIGN_IN_FAIL} from "../actions/authAction";
import { ISignUp, ISignIn } from "../../constants/types";
import { auth } from "../../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {setData, getData} from "../../firebase/databaseAPI";
import {asyncStorageAPI} from '../../firebase/asyncStorageAPI';

function* restoreTokenAsync(): Generator<any, void, any> {
  const token = yield call(asyncStorageAPI, "get", "token")
  if (token) {
    const userData = yield call(getData, 'users', token);
    yield put({ type: SIGN_IN_SUCCESS, status: "sign in success", token: token, user: {
      id: token,
      email: userData.email,
      username: userData.username,
    } });
  } else {
    yield put({ type: SIGN_IN_FAIL, status: "token not restored" });
  }
}

function* signInAsync({
  type,
  login,
}: {
  type: string;
  login: ISignIn;
}): Generator<any, void, any> {
  yield put({ type: AUTH_STATUS, isLoading: true });
  try {
    const userCredential = yield call(signInWithEmailAndPassword, auth, login.email, login.password);
    const user = userCredential.user;
    if (user.uid){
      const userData = yield call(getData, 'users', user.uid);
      if (userData) {
        asyncStorageAPI("store", "token", user.uid);
        yield put({ type: SIGN_IN_SUCCESS, status: "sign in success", token: user.uid });
      }
    }
  } catch (e) {
    console.log(e, "error");
    yield put({ type: SIGN_IN_FAIL, status:e });
  }
}

function* signUpAsync({
  type,
  registration,
}: {
  type: string;
  registration: ISignUp;
}): Generator<any, void, any> {
  yield put({ type: AUTH_STATUS, isLoading: true });
  try {
    const userCredential = yield call(createUserWithEmailAndPassword, auth, registration.email, registration.password);
    const user = userCredential.user;
    if (user) {
      let uid = user.uid;
      let data = {
        username: registration.username,
        email: registration.email,
        password: registration.password,
        registrationDate: new Date().toISOString(),
      }
      const status = yield call(setData, 'users', uid, data);
      if (status) {
        yield put({ type: SIGN_UP_SUCCESS, status: "sign up success" });

      }
    }
  } catch (e) {
    console.log("Error:", e);
    yield put({ type: SIGN_UP_FAIL, status:e });
  }
}

function* authSaga() {
  yield takeLatest(SIGN_UP, signUpAsync);
  yield takeLatest(RESTORE_TOKEN, restoreTokenAsync);
  yield takeLatest(SIGN_IN, signInAsync);

}

export default authSaga;
