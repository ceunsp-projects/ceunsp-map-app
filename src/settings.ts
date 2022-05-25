import Constants from 'expo-constants';

const env = Constants?.manifest?.extra ?? {};

export const IS_DEV = __DEV__ ? true : false;
export const BASE_ENDPOINT = env.ENV_BASE_ENDPOINT ?? 'http://localhost:3333';
