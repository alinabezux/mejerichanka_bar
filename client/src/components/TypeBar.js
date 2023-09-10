import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Button, Spinner} from "react-bootstrap";

import {typesActions} from "../redux";

const TypeBar = () => {
    const dispatch = useDispatch();
    const {types, selectedType, loading, error} = useSelector(state => state.typesReducer);

    useEffect(() => {
        dispatch(typesActions.getAll())
    }, [dispatch]);

    return (
        <div className="types" id="scrollTo">
            {
                types.map(type =>
                    <Button className=" m-3"
                            variant={selectedType === type ? "dark" : "outline-dark"}
                            size="lg"
                            key={type._id}
                            onClick={() => dispatch(typesActions.setSelectedType(type))}
                    >
                        {type.type}
                    </Button>
                )
            }
            {loading && <Spinner/>}
            {error && <h1>Error:(</h1>}
        </div>
    );
}

export {TypeBar}