import { createContext, useContext, useState } from 'react';
import { apiClient } from '../api/ApiClient';
import { executeBasicAuthenticationService, executeJWTAuthenticationService } from '../api/AuthenticationApiService';

// 1.Create a context
export const AuthContext = createContext();

// 2. Share the created context with other components
export const useAuth = () => useContext(AuthContext);
export default function AuthProvider({children}) {
    // 3.Put some state in context
    const [isAuthenticated, setAuthenticated] = useState(false);

    const [username, setUsername] = useState(null);

    const [token, setToken] = useState(null);

    const shared = {isAuthenticated, login, logout, username, token};

    // function login(username, password) {
    //     if (username === 'diamorph' && password === 'test') {
    //         setAuthenticated(true);
    //         setUsername(username);
    //         return true;
    //     } else {
    //         setAuthenticated(false);
    //         return false;
    //     }
    // }

    // async function login(username, password) {
    //     try {
    //         const baToken = 'Basic ' + window.btoa(username + ':' + password);
    //         return await executeBasicAuthenticationService(baToken)
    //             .then(() => {
    //                 console.log('success');
    //                 setAuthorization(username, baToken);
    //                 apiClient.interceptors.request.use(
    //                     (config) => {
    //                         console.log('intercepting and adding a token');
    //                         config.headers.Authorization = baToken;
    //                         return config;
    //                     }
    //                 );
    //                 return true;
    //             })
    //             .catch(err => {
    //                 console.log('Auth error: ', err);
    //                 logout();
    //                 return false;
    //             });
    //     } catch (e) {
    //         console.log(e);
    //         logout();
    //         return false;
    //     }
    //
    // }
    async function login(username, password) {
        try {
            return await executeJWTAuthenticationService(username, password)
                .then((response) => {
                    console.log('success');
                    setAuthorization(username, response.data.token);
                    apiClient.interceptors.request.use(
                        (config) => {
                            console.log('intercepting and adding a token');
                            config.headers.Authorization = `Bearer ${response.data.token}`;
                            return config;
                        }
                    );
                    return true;
                })
                .catch(err => {
                    console.log('Auth error: ', err);
                    logout();
                    return false;
                });
        } catch (e) {
            console.log(e);
            logout();
            return false;
        }

    }

    function setAuthorization(username, token) {
        setToken(token);
        setAuthenticated(true);
        setUsername(username);
    }

    function logout() {
        setToken(null);
        setUsername(null);
        setAuthenticated(false);
    }


    return (
        <AuthContext.Provider value={ shared }>
            {children}
        </AuthContext.Provider>
    )
}

// Share the created context with other components
