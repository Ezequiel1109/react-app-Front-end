import axios from "axios";

const initProdcts = [
  {
    id: 1,
    name: "Monitor Samsung 56",
    price: 1500,
    quantity: 5,
    description: "el monitor es increible!",
  },
  {
    id: 2,
    name: "Monitor lg 56",
    price: 12100,
    quantity: 5,
    description: "el monitor es increible!",
  },
];

const baseUrl = "http://localhost:8080/products";

export const listProduct = () => {
  return initProdcts;
};

export const findAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const create = async ({ name, price, quantity, description }) => {
  try {
    const response = await axios.post(baseUrl, {
      name: name,
      price: price,
      quantity: quantity,
      description: description,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
  return undefined;
};

export const update = async ({ id, name, price, quantity, description }) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, {
      name,
      price,
      quantity,
      description,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
  return undefined;
};

export const remove = async (id) =>{
    try {
        await axios.delete(`${baseUrl}/${id}`);
    }catch(error){
        console.error(error);
    }
}
