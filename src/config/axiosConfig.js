import axios from "axios";

//configuracion axios
const apiUser = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 10000, // tiempo de espera de 10 segundos
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }, 
  maxContentLength: Infinity,   // desactiva límite en navegador
  maxBodyLength: Infinity,   // desactiva límite en navegador     
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
    console.log("=== AXIOS REQUEST ===");
    console.log("URL:", config.url);
    console.log("Method:", config.method);
    console.log("Data antes de limpiar:", config.data);

    //limpia los datos del objeto anidados
    if (config.data && typeof config.data === "object") {
      const cleanData = {};
      Object.keys(config.data).forEach((key) => {
        const keyValue = config.data[key];
        if (keyValue !== null && keyValue !== undefined) {
          //convertir todo a tipos primitivos
          if (keyValue && typeof keyValue === "object") {
            cleanData[key] = JSON.stringify(keyValue);
          } else {
            cleanData[key] = keyValue;
          }
        }
      });
      config.data = cleanData;
    }

    console.log("data despues de ser purificada: ", config.data);
    console.log("JSON.stringify(data): ", JSON.stringify(config.data));
    console.log("=== FIN AXIOS REQUEST ===");
    return config;
  },
  (error) => {
    console.error("=== Error en Request interceptor: ===", error);
    return Promise.reject(error);
  }
);

//creacion del interceptor response - manejar errores
apiUser.interceptors.response.use(
  (response) => {
    console.log("=== AXIOS RESPONSE ===");
    console.log("Status:", response.status);
    console.log("Data:", response.data);
    console.log("======================");
    return response;
  },
  (error) => {
    console.error("=== AXIOS ERROR ===");
    console.error("Status:", error.response?.status);
    console.error("Data:", error.response?.data);
    console.error("Message:", error.message);
    console.error("===================");

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
