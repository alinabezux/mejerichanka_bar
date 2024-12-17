const devURL = 'http://localhost:5001/api'
const prodURL = 'https://bar-api-97868bc1f59e.herokuapp.com/api'

const urls = {
    products: '/products',
    categories: '/categories',
    types: '/types',
    users: '/users',
    auth: {
        registration: '/account/registration',
        logIn: '/account/logIn',
        refresh: '/account/refresh',
        logOut: '/account/logOut'
    },
    basket: '/basket',
    order: '/order',
    news: '/news'
}

export {
    devURL, prodURL, urls
}