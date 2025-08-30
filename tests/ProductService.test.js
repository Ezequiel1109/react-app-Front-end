import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { listProduct, findAll, create, update, remove } from "../src/services/ProductService";

const mock = new MockAdapter(axios);
const initProducts = [
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

afterEach(() => {
  mock.reset();
});

describe("listar productos", () => {
  it("deberia retornar una lista de productos por defecto", async () => {
    mock.onGet("http://localhost:8080/products").reply(200, initProducts);
    const response = await listProduct();
    expect(response).toEqual(initProducts);
  });

  it("no deberia retornar nada estatus No content", async () => {
    mock.onGet("http://localhost:8080/products").reply(204);
    const response = await listProduct();
    expect(response).toBeUndefined();
  });
});

describe("Promesa findAll", () => {
  it("deberia retornar una respuesta con status 200", async () => {
    mock
      .onGet("http://localhost:8080/products")
      .reply(200, { data: ["product1", "product2"] });
    const response = await findAll();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ data: ["product1", "product2"] });
  });

  it("deberia retornar un error 404", async () => {
    mock.onGet("http://localhost:8080/products").reply(404);
    const response = await findAll();
    expect(response).toBeNull();
  });

  it("retornar un error 500", async () => {
    mock.onGet("http://localhost:8080/products").reply(500);
    const response = await findAll();
    expect(response).toBeNull();
  });
});

describe("Promesa create", () => {
  it("deberia crear un producto y retornar una respuesta con status 201", async () => {
    mock.onPost("http://localhost:8080/products").reply(201, initProducts);
    const response = await create(initProducts);
    expect(response.status).toBe(201);
    expect(response.data).toEqual(initProducts);
  });

  it("deberia retornar un error al crear un producto", async () => {
    const newProduct = {
      name: "Nuevo Producto",
      price: 100,
      quantity: 10,
      description: "Descripcion del nuevo producto",
    };
    mock.onPost("http://localhost:8080/products", newProduct).reply(500);
    const response = await create({ product: newProduct });
    expect(response).toBeUndefined();
  });

  it("deberia retornar un error 400", async () => {
    const newProduct = {
      name: "Nuevo Producto",
      price: 100,
      quantity: 10,
      description: "Descripcion del nuevo producto",
    };
    mock.onPost("http://localhost:8080/products", newProduct).reply(400);
    const response = await create({ product: newProduct });
    expect(response).toBeUndefined();
  });
});

describe("Promesa update", () => {
  it("deberia actualizar un producto y retornar una respuesta con status 200", async () => {
    const updatedProduct = {
      id: 1,
      name: "Producto Actualizado",
      price: 200,
      quantity: 15,
      description: "Descripcion del producto actualizado",
    };
    mock.onPut("http://localhost:8080/products/1").reply(200, updatedProduct);
    const response = await update(updatedProduct);
    expect(response.status).toBe(200);
    expect(response.data).toEqual(updatedProduct);
  });

  it("deberia retornar un error al actualizar un producto", async () => {
    const updatedProduct = {
      id: 1,
      name: "Producto Actualizado",
      price: 200,
      quantity: 15,
      description: "Descripcion del producto actualizado",
    };
    mock.onPut("http://localhost:8080/products/1").reply(500);
    const response = await update(updatedProduct);
    expect(response).toBeUndefined();
  });

  it("deberia retornar un error 400 al actualizar un producto", async () => {
    const updatedProduct = {
      id: 1,
      name: "Producto Actualizado",
      price: 200,
      quantity: 15,
      description: "Descripcion del producto actualizado",
    };
    mock.onPut("http://localhost:8080/products/1").reply(400);
    const response = await update(updatedProduct);
    expect(response).toBeUndefined();
  });
});

describe("Promesa remove", () => {
  it("deberia eliminar un producto y retornar una respuesta con status 200", async () => {
    mock.onDelete("http://localhost:8080/products/1").reply(200);
    await remove(1);
    expect(mock.history.delete.length).toBe(1);
    expect(mock.history.delete[0].url).toBe("http://localhost:8080/products/1");
  });

  it("debria eliminar un producto y retornar una respuesta con status 204", async () => {
    mock.onDelete("http://localhost:8080/products/1").reply(204);
    await remove(1);
    expect(mock.history.delete.length).toBe(1);
    expect(mock.history.delete[0].url).toBe("http://localhost:8080/products/1");
  });

  it("deberia retornar un error al eliminar un producto", async () => {
    mock.onDelete("http://localhost:8080/products/1").reply(500);
    await remove(1);
    expect(mock.history.delete.length).toBe(1);
  });
});


