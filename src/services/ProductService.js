import apiUser from "../config/axiosConfig";

export const findAll = async () => {
  try {
    const response = await apiUser.get(`api/products`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const create = async (product) => {
  try {
    const response = await apiUser.post(`api/products`, product);
    return response.data;
  } catch (error) {
    throw error;
  }
  //return undefined;
};

export const update = async ({ id, product }) => {
  try {
    const response = await apiUser.put(`api/products/${id}`, product);
    return response.data;
  } catch (error) {
    throw error;
  }
  //return undefined;
};

export const remove = async (id) => {
  try {
    await apiUser.delete(`api/products/${id}`);
    return true;
  } catch (error) {
    throw error;
  }
};
