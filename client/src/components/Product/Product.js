import {Button, Card} from 'react-bootstrap';

const Product = ({product}) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src= {product.image}/>
            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Subtitle>{product.price}</Card.Subtitle>
                <Button variant="primary">Добавити в корзину</Button>
            </Card.Body>
        </Card>
    );
}

export {Product}