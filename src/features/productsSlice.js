import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { findAll, create, update, remove } from "../services/ProductService";

// --- THUNK PARA OBTENER TODOS LOS PRODUCTOS ---
export const fetchProducts = createAsyncThunk(
  "api/products/fetchProducts",
  async (_,{rejectWithValue}) => {
    try{
      const response = await findAll();
      return response;
    }catch(error){
      const errorMsg = error?.response?.data || error?.message || "Error desconocido";
      console.error("Error en fetchProducts:", errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

export const addProduct = createAsyncThunk(
  "api/products/addProduct",
  async (productData) => {
    const response = await create(productData);
    return response;
  }
);

export const updateProduct = createAsyncThunk(
  "api/products/updateProduct",
  async (productData) => {
    const response = await update(productData);
    return response;
  }
);

export const deleteProduct = createAsyncThunk(
  "api/products/deleteProduct",
  async (id) => {
    await remove(id);
    return id;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      });
  },
});
export default productsSlice.reducer;
