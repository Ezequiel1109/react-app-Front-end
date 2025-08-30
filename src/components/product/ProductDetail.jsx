import { PropTypes } from "prop-types"

export const ProductDetail = ({handlerProductSelected, handlerRemove, product = {} }) => {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>{product.quantity}</td>
      <td>{product.description}</td>
      <td><button className="btn btn-secondary btn-sm" onClick={() => handlerProductSelected(product)}>Update</button></td>
      <td><button className="btn btn-danger btn-sm" onClick={() => handlerRemove(product.id)}>Remove</button></td>
    </tr>
  )
}

ProductDetail.propTypes = {
    product: PropTypes.object.isRequired,
    handlerRemove: PropTypes.func.isRequired,
    handlerProductSelected: PropTypes.func.isRequired
}
