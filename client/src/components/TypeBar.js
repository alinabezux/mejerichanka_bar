import {useDispatch, useSelector} from "react-redux";
import {Button, Spinner} from "react-bootstrap";

import {typesActions} from "../redux";

const TypeBar = ({types}) => {
    const dispatch = useDispatch();
    const {selectedType, loading, error} = useSelector(state => state.typesReducer);

    // useEffect(() => {
    //     if (selectedType) {
    //         console.log(selectedType);
    //         const scroll = document.getElementById("scrollTo");
    //         if (scroll) {
    //             scroll.scrollIntoView({behavior: "smooth"});
    //         }
    //     }
    //
    // }, [dispatch, selectedType]);


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