import axios from "axios";
import authHeader from "./auth-header";

import { API_URL } from '../components/CONSTANTS';

const API_URL2 = `${API_URL}/api/test/`;

class UserService {
    getPublicContent() {
        return axios.get(API_URL2 + "all");
    }

    getUserBoard() {
        return axios.get("https://backend-springboot-capstone.herokuapp.com/api/test/user", { headers: authHeader() });
    }

    getModeratorBoard() {
        return axios.get("https://backend-springboot-capstone.herokuapp.com/api/test/mod", { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get("https://backend-springboot-capstone.herokuapp.com/api/test/admin", { headers: authHeader() });
    }
}

export default new UserService();
