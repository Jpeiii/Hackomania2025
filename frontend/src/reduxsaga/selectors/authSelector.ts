import { AuthState } from '../types';

export const selectIsLoading = (state: AuthState) => state.isLoading;
export const selectToken = (state: AuthState) => state.token;
export const selectStatus = (state: AuthState) => state.status;
export const selectUser = (state: AuthState) => state.user;
