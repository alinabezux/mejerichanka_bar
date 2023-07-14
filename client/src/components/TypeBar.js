import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {typesActions} from "../redux";
import {ListGroup} from "react-bootstrap";

const TypeBar = () => {
    const dispatch = useDispatch();
    const {types} = useSelector(state => state.typesReducer);
    useEffect(() => {
        dispatch(typesActions.getAll())
    }, [dispatch]);

    return (
        <ListGroup>
            {
                types.map(type =>
                    <ListGroup.Item
                        style={{cursor: 'pointer'}}
                        // active={type.id === device.selectedType.id}
                        // onClick={() => device.setSelectedType(type)}
                        key={type.id}
                    >
                        {type.type}
                    </ListGroup.Item>
                )
            }
        </ListGroup>
    );
}

export {TypeBar}