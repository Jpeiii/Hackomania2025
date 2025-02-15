import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';
export const asyncStorageAPI = async (action: string, key: string, value?: string) => {
    if (action === "store") {
        if (value) {
            if (isWeb || typeof window !== 'undefined' && window.localStorage) {
                await window.localStorage.setItem(key, value);
            } else {
                await SecureStore.setItemAsync(key, value);
            }
        } else {
            throw new Error("Value is required for 'store' action");
        }
    } else if (action === "get") {
        if ( isWeb || typeof window !== 'undefined' && window.localStorage) {
            return await window.localStorage.getItem(key);
        } else {
            return await SecureStore.getItemAsync(key);
        }
    } else if (action === "delete") {
        if (isWeb || typeof window !== 'undefined' && window.localStorage) {
            await window.localStorage.removeItem(key);
        } else {
            await SecureStore.deleteItemAsync(key);
        }
    }
};