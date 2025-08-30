import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export const ProductForm = ({ productSelected, handlerAdd }) => {
  const [form, setForm] = useState(productSelected || {
      id: 0,
      name: "",
      price: "", 
      quantity: "",
      description: "",
    });
  const [ errors, setErrors ] = useState({});

  const validation = () => {
    const newErrors = {};
    if (!form.name || form.name.trim().length < 3) {
      newErrors.name = "El nombre debe tener al menos 3 caracteres.";
    }
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) {
      newErrors.price = "El precio debe ser un número mayor a 0.";
    }
    if (
      !form.quantity ||
      isNaN(Number(form.quantity)) ||
      Number(form.quantity) < 1
    ) {
      newErrors.quantity = "La cantidad debe ser mayor o igual a 1.";
    }
    if (!form.description || form.description.trim().length < 10) {
      newErrors.description =
        "La descripción debe tener al menos 10 caracteres.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // sincorniza el formulario con el producto selecionado
  useEffect(() => {
    setForm(productSelected);
  }, [productSelected]);
  
  const handleSubmit = (event) => {
    event.preventDefault(); 
    if (validation()) {
      handlerAdd(form);
      setForm({
        id: 0,
        name: "",
        price: "",
        quantity: "",
        description: "",
      });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-inline">
      <div>
        <input
          type="text"
          className="form-control my-3 w-75"
          name="Name"
          placeholder="name"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
        />
        {errors.name && <div className="alert alert-danger">{errors.name}</div>}
      </div>
      <div>
        <input
          type="text"
          className="form-control my-3 w-75"
          name="Price"
          placeholder="price"
          value={form.price}
          onChange={(event) => setForm({ ...form, price: event.target.value })}
        />
        {errors.price && (
          <div className="alert alert-danger">{errors.price}</div>
        )}
      </div>
      <div>
        <input
          type="text"
          className="form-control my-3 w-75"
          name="Quantity"
          placeholder="quantity"
          value={form.quantity}
          onChange={(event) =>
            setForm({ ...form, quantity: event.target.value })
          }
        />
        {errors.quantity && (
          <div className="alert alert-danger">{errors.quantity}</div>
        )}
      </div>
      <div>
        <input
          type="text"
          className="form-control my-3 w-75"
          name="Descripcion"
          placeholder="description"
          value={form.description}
          onChange={(event) =>
            setForm({ ...form, description: event.target.value })
          }
        />
        {errors.description && (
          <div className="alert alert-danger">{errors.description}</div>
        )}
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          {form.id > 0 ? "Actualizar Producto" : "Agregar Producto"}
        </button>
      </div>
    </form>
  );
};
ProductForm.propTypes = {
  productSelected: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
  }).isRequired,
  handlerAdd: PropTypes.func.isRequired,
};
