import axios from "axios";
import authHeader from "./auth-header";

import { API_URL } from '../components/CONSTANTS';

const API_URL2 = `${API_URL}/api/test/`;

class UserService {
    // LOCAL CODE
    getPublicContent() {
        return axios.get("http://localhost:8080/api/test/all");
    }
    getUserBoard() {
        return axios.get("http://localhost:8080/api/test/user", { headers: authHeader() });
    }

    getModeratorBoard() {
        return axios.get("http://localhost:8080/api/test/mod", { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get("http://localhost:8080/api/test/admin", { headers: authHeader() });
    }
    // // HEROKU
    // getPublicContent() {
    //     return axios.get(API_URL2 + "all");
    // }

    // getUserBoard() {
    //     return axios.get(API_URL2 + "user", { headers: authHeader() });
    // }

    // getModeratorBoard() {
    //     return axios.get(API_URL2 + "mod", { headers: authHeader() });
    // }

    // getAdminBoard() {
    //     return axios.get(API_URL2 + "admin", { headers: authHeader() });
    // }
}

export default new UserService();
