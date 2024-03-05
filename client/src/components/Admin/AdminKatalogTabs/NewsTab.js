import {Button, Card, Tab} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useState} from "react";

import {newsActions} from "../../../redux";
import {CreateNew} from "../modals";


const NewsTab = () => {
    const dispatch = useDispatch();
    const [newVisible, setNewVisible] = useState(false);

    const {news} = useSelector(state => state.newsReducer);

    useEffect(() => {
        dispatch(newsActions.getAllNews())
    }, [dispatch]);


    const handleDeleteNew = useCallback(
        async (item) => {
            await dispatch(newsActions.deleteNew({newId: item._id}));
            dispatch(newsActions.getAllNews());
        }, [dispatch]);


    return (
        <Tab.Pane eventKey="news">
            <Button className="mb-3"
                    onClick={() => setNewVisible(true)}
                    variant={'success'}>+ Cтворити</Button>
            <CreateNew show={newVisible} onHide={() => setNewVisible(false)}/>
            <div className="newsTab">
                {news.slice().reverse().map(item =>
                    <Card style={{width: '15rem'}}>
                        <Card.Img variant="top" src={item.image} alt={'new'}/>
                        <Card.Body>
                            <Button
                                onClick={() => handleDeleteNew(item)}
                                variant={'outline-danger'}>Видалити
                            </Button>
                        </Card.Body>
                    </Card>
                )}
            </div>
        </Tab.Pane>
    );
}

export {
    NewsTab
}