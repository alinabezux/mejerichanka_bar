import Button from 'react-bootstrap/Button';


const Category = ({category}) => {
    return (
        <Button variant="outline-dark" size="lg">{category.category}</Button>
    )
}

export {Category}