import { createSelector } from '@reduxjs/toolkit';

// Selectores base
const selectAuth = (state) => state.auth;
const selectProductsState = (state) => state.products;

// Selectores memoizados para auth
export const selectIsAuth = createSelector(
  [selectAuth],
  (auth) => !!auth?.isAuth 
);

export const selectUser = createSelector(
  [selectAuth],
  (auth) => auth?.user || null
);

export const selectUsername = createSelector(
  [selectUser],
  (user) => user?.username || 'Usuario'
);

export const selectAuthLoading = createSelector(
  [selectAuth],
  (auth) => !!auth?.loading
);

export const selectAuthError = createSelector(
  [selectAuth],
  (auth) => auth?.error || null
);

export const selectToken = createSelector(
  [selectAuth],
  (auth) => auth?.token || null
);

// Selectores memoizados para products
export const selectProducts = createSelector(
  [selectProductsState],
  (products) => products?.products || []
);

export const selectProductsLoading = createSelector(
  [selectProductsState],
  (products) => !!products?.loading
);

export const selectProductsError = createSelector(
  [selectProductsState],
  (products) => products?.error || null
);

export const selectSelectedProduct = createSelector(
  [selectProductsState],
  (products) => products?.selectedProduct || null
);

// Selector compuesto para verificar si hay productos
export const selectHasProducts = createSelector(
  [selectProducts],
  (products) => Array.isArray(products) && products.length > 0
);