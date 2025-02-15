import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";  
export const decodeToken = () => {
    const token = Cookies.get('token');
    if (!token) return null;  
    try {
        return jwtDecode(token);  
    } catch (error) {
        console.error("Invalid Token:", error);
        return null;  
    }
};
