import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {typesActions} from "../redux";
import {Button} from "react-bootstrap";

const TypeBar = () => {
    const dispatch = useDispatch();
    const {types, selectedType, loading, error} = useSelector(state => state.typesReducer);

    useEffect(() => {
        dispatch(typesActions.getAll())
    }, [dispatch]);

    return (
        <div className="types">
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
            {loading && <h1>Loading...........</h1>}
            {error && <h1>Error:(</h1>}
        </div>
    );
}

export {TypeBar}