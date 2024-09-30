import axios from 'axios';
import { refreshToken } from 'aws-auth-lib';
//import { refreshToken } from 'aws-auth-cardioid';

const api = axios.create();

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        // eslint-disable-next-line no-underscore-dangle
        if (error?.response.status === 401 && !originalRequest._retry) {
            // eslint-disable-next-line no-underscore-dangle
            originalRequest._retry = true;
            try {
                const token = await refreshToken();
                api.defaults.headers.common['AUTH-TOKEN-AWS'] = token;
                originalRequest.headers['AUTH-TOKEN-AWS'] = token;
                // store the token in session attributes
                sessionStorage.setItem('token', JSON.stringify(token));
            } catch (e) {
                console.log('axios get token', e);
            }
            return api(originalRequest);
        }
        return Promise.reject(error);
    }
);

const validateToken = () => {
    api.get(`https://api-test.cardio-id.com/panel/token-test`)
        .then((res) => {
            console.log('ok', res);
        })
        .catch((error) => {
            console.log('error', error);
        });
};

export { api, validateToken };
