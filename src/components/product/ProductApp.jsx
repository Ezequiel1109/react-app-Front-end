import { useEffect, useState } from "react";
import { ProductTable } from "./ProductTable";
import { PropTypes } from "prop-types";
import { ProductForm } from "./ProductForm";
import { useSelector, useDispatch } from "react-redux";
import {
  addProduct,
  fetchProducts,
  updateProduct,
  deleteProduct,
} from "../../features/productsSlice";
import {
  selectIsAuth,
  selectProducts,
  selectProductsLoading,
} from "../../features/selectors";
import { Link } from "react-router-dom";

export const ProductApp = ({ title }) => {
  const dispatch = useDispatch();
  //usamos los selectores memoizados
  const products = useSelector(selectProducts);
  const isLoading = useSelector(selectProductsLoading);
  const isAuth = useSelector(selectIsAuth);

  const [message, setMessage] = useState(null);
  const [productSelected, setProductSelected] = useState({
    id: 0,
    name: "",
    price: "",
    quantity: "",
    description: "",
  });

  useEffect(() => {
    if (!isAuth) {
      dispatch(fetchProducts());
    }
    
  }, [dispatch, isAuth]);

  if (isAuth) {
    return (
      <div className="alert alert-warning text-center mt-5">
        <h4>Acceso Restringido</h4>
        <p>Por favor, <Link to="/login">inicia sesión</Link> para ver y gestionar los productos.</p>
      </div>
    )
  }

  const handlerAddProduct = async (product) => {
    if (
      !product.name ||
      !product.price ||
      !product.quantity ||
      !product.description ||
      isNaN(Number(product.price)) ||
      isNaN(Number(product.quantity))
    ) {
      setMessage({
        type: "danger",
        text: "Debe completar todos los campos correctamente",
      });
      return;
    }

    const productSend = {
      ...product,
      price: Number(product.price),
      quantity: Number(product.quantity),
    };
    try {
      if (product.id > 0) {
        await dispatch(updateProduct(productSend)).unwrap();
        setMessage({
          type: "success",
          text: "Producto actualizado correctamente",
        });
      } else {
        await dispatch(addProduct(productSend)).unwrap();
        setMessage({
          type: "success",
          text: "Producto agregado correctamente",
        });
      }
      setProductSelected({
        id: 0,
        name: "",
        price: "",
        quantity: "",
        description: "",
      });
    } catch (error) {
      setMessage({ type: "danger", text: error?.message || "Error al agregar el producto" });
    }
  };

  const handlerRemoveProduct = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      setMessage({
        type: "success",
        text: "Producto eliminado correctamente",
      });
    } catch (error) {
      setMessage({ type: "danger", text: "Error al eliminar el producto" });
    }
  };

  const handlerProductSelected = (product) => {
    setProductSelected({ ...product });
  };

  return (
    <div className="container my-4">
      <h1>{title}</h1>
      {message && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setMessage(null)}
          ></button>
        </div>
      )}
      <div className="row">
        <div className="col">
          <ProductForm
            handlerAdd={handlerAddProduct}
            productSelected={productSelected}
          />
        </div>
        <div className="col">
          {isLoading ? (
            <div className="d-flex justify-content-center mt-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          ) : products.length > 0 ? (
            <ProductTable
              /* products={products}
              handlerRemove={handlerRemoveProduct}
              handlerProductSelected={handlerProductSelected} */
            />
          ) : (
            <div className="alert alert-warning">
              No hay productos en el sistema!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ProductApp.propTypes = {
  title: PropTypes.string.isRequired,
};
//export { ProductApp };
