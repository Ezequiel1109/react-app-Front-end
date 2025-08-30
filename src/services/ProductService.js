import axios from "axios";
import apiUser from "../config/axiosConfig";

/* const getToken = () => localStorage.getItem("token"); */

export const findAll = async () => {
  try {
    console.log("ProductService: llamando a findAll en la API...");
    return await apiUser.get(`/products`);
  } catch (error) {
    console.error("Error getting products:", error);
    throw error;
  }
};

export const create = async (product) => {
  try {
    console.log("=== CREATE PRODUCT SERVICE ===");
    console.log("productData recibido:", product);

    //validar y limpiar datos
    const cleanedDataProduct = {
      name: String(product.name || "").trim(),
      price: Number(product.price) || 0,
      quantity: Number(product.quantity) || 0,
      description: String(product.description || "").trim(),
    };
    console.log("Cleaned productData:", cleanedData);

    //validaciones
    if (!cleanedDataProduct.name) {
      throw new Error("El nombre del producto es obligatorio");
    }
    if (cleanedDataProduct.price <= 0) {
      throw new Error("El precio del producto debe ser mayor que cero");
    }
    if (cleanedDataProduct.quantity < 0) {
      throw new Error("La cantidad del producto no puede ser negativa");
    }
    if (!cleanedDataProduct.description) {
      throw new Error("La descripción del producto es obligatoria");
    }
    const token = getToken();

    const response = await apiUser.post(`/products`, cleanedDataProduct, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Producto creado exitosamente:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
  //return undefined;
};

export const update = async ({ id, product }) => {
  try {
    console.log("=== UPDATE PRODUCT SERVICE ===");
    console.log("ID:", id);
    console.log("productData recibido:", productData);

    // Validar y limpiar datos
    const cleanedDataProduct = {
      name: String(product.name || "").trim(),
      price: Number(product.price) || 0,
      quantity: Number(product.quantity) || 0,
      description: String(product.description || "").trim(),
    };
    console.log("Cleaned productData:", cleanedDataProduct);

    //validaciones
    if (!cleanedDataProduct.name) {
      throw new Error("El nombre del producto es obligatorio");
    }
    if (cleanedDataProduct.price <= 0) {
      throw new Error("El precio del producto debe ser mayor que cero");
    }
    if (cleanedDataProduct.quantity < 0) {
      throw new Error("La cantidad del producto no puede ser negativa");
    }
    if (!cleanedDataProduct.description) {
      throw new Error("La descripción del producto es obligatoria");
    }
    const token = getToken();
    const response = await apiUser.put(`/products/${id}`, cleanedDataProduct, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
  //return undefined;
};

export const remove = async (id) => {
  try {
    const token = getToken();
    await apiUser.delete(`/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Producto eliminado exitosamente:", id);
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
