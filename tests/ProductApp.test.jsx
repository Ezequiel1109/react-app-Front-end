import { render } from '@testing-library/react';
import { ProductApp } from '../src/components/ProductApp';

describe("Pruebas con el <ProductApp />", () => {
    it("deberia de renderizar correctamente", () => {
      const { getByText } = render(<ProductApp title={"Productos!"} />);
      expect(getByText("Productos!")).toMatchSnapshot();
    });
  });