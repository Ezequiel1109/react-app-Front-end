import { useEffect, useState } from "react";
import { listProduct } from "../services/ProductService";
import { ProductTable } from "./ProductTable";
import { PropTypes } from "prop-types";
import { ProductForm } from "./ProductForm";

export const ProductApp = ({ title }) => {
  const [products, setProducts] = useState([]);

  const [productSelected, setProductSelected] = useState({
    id: 0,
    name: '',
    price: '',
    quantity: '',
    description: ''
  })

  useEffect(() => {
    const result = listProduct();
    setProducts(result);
  }, []);

  const handlerAddProduct = (product) => {
    if (product.id > 0) {
      setProducts(products.map((prod) => {
          if (prod.id == product.id) {
            return { ...product };
          }
          return prod;
        })
      );
    } else {
      setProducts([...products, { ...product, id: new Date().getTime() }]);
    }
  };
  const handlerRemoveProduct = (id) => {
    console.log(id);
    setProducts(products.filter((product) => product.id != id));
  };

  const handlerProductSelected = (product) => {
    setProductSelected({ ...product });
  };

  return (
    <div className="container my-4">
      <h1>{title}</h1>
      <div className="row">
        <div className="col">
          <ProductForm
            handlerAdd={handlerAddProduct}
            productSelected={productSelected}
          />
        </div>
        <div className="col">{
            products.length > 0 ?
          <ProductTable
            products={products}
            handlerRemove={handlerRemoveProduct}
            handlerProductSelected={handlerProductSelected}
            />: <div className="alert alert-warning">No hay productos en el sistema!</div>
          }
        </div>
      </div>
    </div>
  );
};

ProductApp.propTypes = {
  title: PropTypes.string.isRequired,
}
