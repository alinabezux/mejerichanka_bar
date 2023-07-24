import {Button, Card} from 'react-bootstrap';

const Product = ({product}) => {
    return (
        <Card className="m-2" style={{width: '18rem'}}>
            <Card.Img variant="top" src={product.image}/>
            <Card.Body className="my-2">
                <Card.Title><h5>{product.title}</h5></Card.Title>
                <Card.Subtitle className="my-3"><h4>{product.price} грн.</h4></Card.Subtitle>
                <Button className="btn" variant="dark">Добавити в корзину</Button>
            </Card.Body>
        </Card>
    );
}

export {Product}