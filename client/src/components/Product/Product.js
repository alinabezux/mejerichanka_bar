const Product = ({product}) => {
    return (
        <div>
            <h3>{product.title} -- {product.price}</h3>
            <button>Add to cart</button>
        </div>
    );
}

export {Product}