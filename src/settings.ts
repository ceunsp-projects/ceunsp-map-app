import { ENV_BASE_ENDPOINT } from '@env';

export const IS_DEV = __DEV__ ? true : false;
export const BASE_ENDPOINT = ENV_BASE_ENDPOINT ?? 'http://localhost:3333';
