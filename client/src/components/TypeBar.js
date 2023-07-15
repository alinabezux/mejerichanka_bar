import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {typesActions} from "../redux";
import {ListGroup} from "react-bootstrap";

const TypeBar = () => {
    const dispatch = useDispatch();
    const {types,selectedType} = useSelector(state => state.typesReducer);

    useEffect(() => {
        dispatch(typesActions.getAll())
    }, [dispatch]);

    return (
        <ListGroup>
            {
                types.map(type =>
                    <ListGroup.Item
                        key={type.id}
                        variant={selectedType === type ? "dark" : "light"}
                        style={{cursor: 'pointer'}}
                        onClick={() => dispatch(typesActions.setSelectedType(type))}
                    >
                        {type.type}
                    </ListGroup.Item>
                )
            }
        </ListGroup>
    );
}

export {TypeBar}