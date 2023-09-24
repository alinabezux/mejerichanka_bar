import {Button, Tab, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Pagination from "react-bootstrap/Pagination";
import {useEffect, useState} from "react";

import {categoriesActions} from "../../../redux";
import generatePagination from "../../Pagination";
import {CreateCategory, UploadPhotoCategory} from "../modals";


const CategoriesTab = () => {
    const dispatch = useDispatch();

    const {categories, totalPagesCategories, currentPageCategories} = useSelector(state => state.categoriesReducer);
    const [uploadPhotoCategoryVisible, setUploadPhotoCategoryVisible] = useState(false);
    const [categoryVisible, setCategoryVisible] = useState(false);

    const handleSetCurrentPageCategories = async (pageNumber) => {
        dispatch(categoriesActions.setCurrentPageCategories(pageNumber));
    }

    const paginationItemsCategories = generatePagination(totalPagesCategories, currentPageCategories, handleSetCurrentPageCategories);

    const handleUploadPhotoCategory = (category) => {
        dispatch(categoriesActions.setSelectedCategory(category))
        setUploadPhotoCategoryVisible(true)
    };

    const handleDeleteCategory = async (category) => {
        await dispatch(categoriesActions.deleteById({categoryId: category._id}));
        dispatch(categoriesActions.getAll({page: currentPageCategories, isGettingAll: false}))
    };


    useEffect(() => {
        dispatch(categoriesActions.getAll({page: currentPageCategories, isGettingAll: false}))
    }, [dispatch, currentPageCategories]);


    return (
        <Tab.Pane eventKey="categories">

            <Button onClick={() => setCategoryVisible(true)}
                    variant={'success'}>+ Cтворити</Button>

            <CreateCategory show={categoryVisible}
                            onHide={() => setCategoryVisible(false)}/>

            <Table style={{
                fontFamily: '\'Nunito\', sans-serif',
                fontWeight: "normal",
                fontSize: "25px"
            }}>
                <thead>
                <tr>
                    <th>Фото</th>
                    <th>Категорія</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {categories.map(category =>
                    <tr key={category._id}>
                        <td>
                            <img style={{width: '100px'}} src={category.image}
                                 alt={category.category}/>
                        </td>
                        <td>{category.category}</td>
                        <td>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '5px'
                            }}>
                                <Button style={{marginBottom: '10px'}}
                                        variant={'secondary'}
                                        onClick={() => handleUploadPhotoCategory(category)}
                                >+ Фото</Button>

                                <UploadPhotoCategory show={uploadPhotoCategoryVisible}
                                                     onHide={() => setUploadPhotoCategoryVisible(false)}
                                />

                                <Button
                                    onClick={() => handleDeleteCategory(category)}
                                    variant={'outline-danger'}>Видалити</Button>
                            </div>
                        </td>
                    </tr>
                )
                }
                </tbody>
            </Table>
            <Pagination style={{display: "flex", justifyContent: "center"}}>{paginationItemsCategories}</Pagination>
        </Tab.Pane>

    );
}

export {CategoriesTab}