import axios from "axios";

//configuracion axios
const apiUser = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 10000, // tiempo de espera de 10 segundos
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

//interceptor para ejecutar el token antes de enviar
/* apiUser.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
); */

//interceptor para limpiar los datos antes de enviar
apiUser.interceptors.request.use(
  (config) => {
    console.log("=== AXIOS REQUEST URL===", config.url);
    console.log("Method:", config.method);

    //limpia los datos del objeto anidados,elimina la serealizacion innecesaria de objetos
    if (config.data && typeof config.data === "object") {
      Object.keys(config.data).forEach((key) => {
        if (config.data[key] === null || config.data[key] === undefined) {
          delete config.data[key];
        }
      });
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

//creacion del interceptor response - manejar errores
apiUser.interceptors.response.use(
  (response) => {
    console.log("=== AXIOS RESPONSE ===");
    console.log("Data:", response.data);
    return response;
  },
  (error) => {
    console.error("=== AXIOS ERROR ===");
    console.error("Data:", error.response?.data);
    // Mejorar mensajes de error
    if (error.response?.data) {
      const errorMessage =
        typeof error.response.data === "string"
          ? error.response.data
          : error.response.data.message ||
            error.response.data.error ||
            "An error occurred";
      throw new Error(errorMessage);
    }
    throw new Error(error.message || "error de conexión");
  }
);
export default apiUser;
