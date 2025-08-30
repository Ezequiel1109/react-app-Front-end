import apiUser from "../config/axiosConfig";

export const findAll = async () => {
  try {
    return await apiUser.get(`api/products`);
  } catch (error) {
    throw error;
  }
};

export const create = async (product) => {
  try {
    const token = getToken();

    const response = await apiUser.post(`api/products`, product, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
  //return undefined;
};

export const update = async ({ id, product }) => {
  try {
    const token = getToken();
    const response = await apiUser.put(`api/products/${id}`, product, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
  //return undefined;
};

export const remove = async (id) => {
  try {
    const token = getToken();
    await apiUser.delete(`api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return true;
  } catch (error) {
    throw error;
  }
};
