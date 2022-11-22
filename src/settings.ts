import Constants from 'expo-constants';

const env = Constants?.manifest?.extra ?? {};

export const IS_DEV = __DEV__ ? true : false;
export const BASE_ENDPOINT = env.ENV_BASE_ENDPOINT ?? 'https://ceunsp-map-api.herokuapp.com'; // ou 'http://seu-ip:3333
