import { apiClient } from './ApiClient';

export const executeBasicAuthenticationService = () => apiClient.get(`/basicauth`);

export const executeJWTAuthenticationService = (username, password) => apiClient.post(`/authenticate`, {username, password});
