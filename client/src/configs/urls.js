const baseURL = 'http://localhost:5000/'

const urls = {
    products: '/api/products',
    categories: '/api/categories',
    types: '/api/types',
    users: '/api/users',
    auth: {
        registration: '/account/registration',
        logIn: '/account/logIn',
        refresh: '/account/refresh',
        logOut: '/account/logOut'
    },
    basket: '/basket'
}

export {
    baseURL, urls
}