import axios from "axios";

import { API_URL } from '../components/CONSTANTS';

const API_URL2 = `${API_URL}/api/auth/`;

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL2 + "signin", {
                username,
                password,
            })
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        console.log(username, email, password);
        return axios.post(API_URL2 + "signup", {
            username,
            email,
            password,
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();
