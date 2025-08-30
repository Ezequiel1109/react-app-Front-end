import apiUser from "../config/axiosConfig";

export const register = async (userData) => {
  try {
    console.log("=== REGISTER USER ===");
    console.log("UserData received:", userData);

    //validar y limpiar los datos
    const cleanedData = {
      username: String(userData.username || "").trim(),
      password: String(userData.password || "").trim(),
      email: String(userData.email || "").trim(),
    };
    console.log("Cleaned UserData:", cleanedData);

    //validaciones
    if (!cleanedData.username) {
      throw new Error("El nombre de usuario es obligatorio");
    }
    if (!cleanedData.password) {
      throw new Error("La contraseña es obligatoria");
    }
    if (!cleanedData.email) {
      throw new Error("El correo electrónico es obligatorio");
    }
    if (!cleanedData.email.includes("@")) {
      throw new Error("El correo electrónico debe ser válido");
    }

    const response = await apiUser.post(`/register`, cleanedData);
    console.log("User registered successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("error en register: ", error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    console.log("=== LOGIN USER SERVICE ===");
    console.log("credentials recibido:", credentials);

    // Validar y limpiar datos
    const cleanCredentials = {
      username: String(credentials.username || "").trim(),
      password: String(credentials.password || "").trim(),
    };

    console.log('cleanCredentials:', cleanCredentials);

    //validaciones
    if (!cleanCredentials.username) {
      throw new Error("El nombre de usuario es obligatorio");
    }
    if (!cleanCredentials.password) {
      throw new Error("La contraseña es obligatoria");
    }
    const response = await apiUser.post(`/user/login`, cleanCredentials); 
    console.log('Login exitoso:', response.data);
    return response.data;
  } catch (error) {
    console.error("Error en login ",error);
    throw error;
  }
};

export const getUserProfile = async (userId) =>{
  try{
    const response = await apiUser.get(`/users/${userId}`);
    return response.data;
  }catch(error){
    console.error("Error en getUserProfile: ", error);
    throw error;
  }
}

export const logout = () => {
  localStorage.removeItem("token");
};
