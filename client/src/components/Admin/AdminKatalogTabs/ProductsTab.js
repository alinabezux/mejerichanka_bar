import {Button, Tab, Table} from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useState} from "react";

import {productsActions} from "../../../redux";
import generatePagination from "../../Pagination";
import {CreateProduct, EditProduct, UploadPhotoProduct} from "../modals";


const ProductsTab = () => {
    const dispatch = useDispatch();

    const {products, totalPagesProducts, currentPageProducts} = useSelector(state => state.productsReducer);
    const [productVisible, setProductVisible] = useState(false);
    const [editProductVisible, setEditProductVisible] = useState(false);
    const [uploadPhotoProductVisible, setUploadPhotoProductVisible] = useState(false);

    const handleSetCurrentPageProducts = async (pageNumber) => {
        dispatch(productsActions.setCurrentPageProducts(pageNumber));
    }

    const paginationItemsProducts = generatePagination(totalPagesProducts, currentPageProducts, handleSetCurrentPageProducts);

    const handleEditProduct = useCallback(
        (product) => {
            dispatch(productsActions.setSelectedProduct(product));
            setEditProductVisible(true);
        }, [dispatch]);

    const handleUploadPhotoProduct = useCallback(
        (product) => {
            dispatch(productsActions.setSelectedProduct(product));
            setUploadPhotoProductVisible(true);
        }, [dispatch]);


    const handleDeleteProduct = useCallback(
        async (product) => {
            await dispatch(productsActions.deleteById({productId: product._id}));
            dispatch(
                productsActions.getAll({page: currentPageProducts, isGettingAll: false})
            );
        }, [dispatch, currentPageProducts]);

    useEffect(() => {
        dispatch(productsActions.getAll({page: currentPageProducts, isGettingAll: false}))
    }, [dispatch, currentPageProducts]);

    return (
        <Tab.Pane eventKey="products">
            <Button
                onClick={() => setProductVisible(true)}
                variant={'success'}>+ Cтворити</Button>

            <CreateProduct show={productVisible}
                           onHide={() => setProductVisible(false)}/>

            <Table className="adminTable">
                <thead>
                <tr>
                    <th>Фото</th>
                    <th>Назва</th>
                    <th>Ціна</th>
                </tr>
                </thead>
                <tbody>
                {products.map(product =>
                    <tr key={product._id}>
                        <td>
                            <img src={product.image} alt={product.title}/>
                            <div>
                                <Button onClick={() => handleEditProduct(product)}>Редагувати</Button>

                                <EditProduct show={editProductVisible}
                                             onHide={() => setEditProductVisible(false)}/>
                                <Button
                                    variant={'secondary'}
                                    onClick={() => handleUploadPhotoProduct(product)}>+ Фото</Button>

                                <UploadPhotoProduct show={uploadPhotoProductVisible}
                                                    onHide={() => setUploadPhotoProductVisible(false)}/>
                                <Button
                                    onClick={() => handleDeleteProduct(product)}
                                    variant={'outline-danger'}>Видалити
                                </Button>
                            </div>
                        </td>
                        <td>{product.title}
                            <hr/>
                            <p>{product.info}</p>
                        </td>
                        <td>{product.price} грн.
                        </td>
                    </tr>)
                }
                </tbody>
            </Table>
            <Pagination style={{display: "flex", justifyContent: "center"}}>{paginationItemsProducts}</Pagination>
        </Tab.Pane>
    );
}

export {
    ProductsTab
}