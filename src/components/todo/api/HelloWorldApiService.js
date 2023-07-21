import { apiClient } from './ApiClient';

export const getHelloWorld = () => apiClient.get('/hello-world');

export const getHelloWorldBean = () => apiClient.get('/hello-world-bean');

export const getHelloWorldBeanPathVariable = (name) => apiClient.get(`/hello-world/path-variable/${name}`);
