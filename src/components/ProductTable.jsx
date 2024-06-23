import { ProductDetail } from "./ProductDetail"
import { PropTypes } from "prop-types"

export const ProductTable = ({handlerProductSelected, handlerRemove ,products = []}) =>{
    return(
        <table className="table table-hover table-striped">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Descripción</th>
                    <th>Update</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => {
                    return <ProductDetail handlerProductSelected={handlerProductSelected} handlerRemove={handlerRemove} product={product} key={product.id} />
                })}
            </tbody>
        </table>
    )
}

ProductTable.propTypes = {
    products: PropTypes.array.isRequired,
    handlerRemove: PropTypes.func.isRequired,
    handlerProductSelected: PropTypes.func.isRequired
}