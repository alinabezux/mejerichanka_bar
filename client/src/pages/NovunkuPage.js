import fon from "../assets/news.jpg";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {newsActions} from "../redux";

const NovunkuPage = () => {
    const dispatch = useDispatch();

    const {news} = useSelector(state => state.newsReducer);

    useEffect(() => {
        dispatch(newsActions.getAllNews())
    }, [dispatch]);

    return (
        <div className="new-page">
            <img className="new-fon" src={fon} alt="фон"/>
            <div className="main">
                <div className="images">
                    {news.slice().reverse().map(item =>
                        <img src={item.image} alt={'new'}/>
                    )}
                </div>
            </div>
        </div>
    )
}

export {NovunkuPage}