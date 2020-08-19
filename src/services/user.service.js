import axios from "axios";
import authHeader from "./auth-header";

import { API_URL } from './CONSTANTS';

const API_URL2 = `${API_URL}/api/test/`;

class UserService {
    getPublicContent() {
        return axios.get(API_URL2 + "all");
    }

    getUserBoard() {
        return axios.get(API_URL2 + "user", { headers: authHeader() });
    }

    getModeratorBoard() {
        return axios.get(API_URL2 + "mod", { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL2 + "admin", { headers: authHeader() });
    }
}

export default new UserService();
