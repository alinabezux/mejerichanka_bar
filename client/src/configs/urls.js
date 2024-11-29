const devURL = 'http://localhost:5001/api'
const prodURL = 'https://mejerichanka-bar-api.vercel.app'

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