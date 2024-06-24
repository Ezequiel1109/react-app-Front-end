import { useEffect, useState } from "react";

const initialDataForm = {
  id: 0,
  name: "",
  price: "",
  quantity: "",
  description: ""
};
// eslint-disable-next-line react/prop-types
export const ProductForm = ({ productSelected, handlerAdd }) => {
  const [form, setForm] = useState(initialDataForm);
  const {id, name, price, quantity, description } = form;

  useEffect(() => {
    setForm(productSelected);
  }, [productSelected]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!name || !price || !quantity || !description) {
          alert("debe completar los campos");
          return;
        }
        handlerAdd(form);
        setForm(initialDataForm);
      }}
    >
      <div>
        <input
          type="text"
          className="form-control my-3 w-75"
          name="Name"
          placeholder="name"
          value={name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
        />
      </div>
      <div>
        <input
          type="text"
          className="form-control my-3 w-75"
          name="Price"
          placeholder="price"
          value={price}
          onChange={(event) => setForm({ ...form, price: event.target.value })}
        />
      </div>
      <div>
        <input
          type="text"
          className="form-control my-3 w-75"
          name="Quantity"
          placeholder="quantity"
          value={quantity}
          onChange={(event) =>
            setForm({ ...form, quantity: event.target.value })
          }
        />
      </div>
      <div>
        <input
          type="text"
          className="form-control my-3 w-75"
          name="Descripcion"
          placeholder="description"
          value={description}
          onChange={(event) =>
            setForm({ ...form, description: event.target.value })
          }
        />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          {id > 0 ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};
