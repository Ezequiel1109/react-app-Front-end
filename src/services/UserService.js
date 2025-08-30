import apiUser from "../config/axiosConfig";

export const register = async (userData) => {
  try {
    console.log("=== REGISTER USER ===");
    console.log("UserData received:", userData);

    const response = await apiUser.post(`/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    console.log("=== LOGIN USER SERVICE ===");
    console.log("credentials recibido:", credentials);

    const response = await apiUser.post(`/user/login`, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async (userId) =>{
  try{
    const response = await apiUser.get(`/users/${userId}`);
    return response.data;
  }catch(error){
    throw error;
  }
}

export const logout = () => {
  localStorage.removeItem("token");
};
