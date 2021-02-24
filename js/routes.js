import homePage from './pages/home-page.cmp.js'
import emailApp from './apps/email/pages/email-app.cmp.js'
import about from './pages/about.cmp.js'

const routes = [
    {
        path: '/',
        component: homePage,
    },
    // {
    //     path: '/book',
    //     component: bookApp
    // },
    {
        path: '/about',
        component: about
    },
    // {
    //     path: '/book/edit/:bookId?',
    //     component: bookEdit
    // },
    // {
    //     path: '/book/:bookId',
    //     component: bookDetails
    // },



    {
        path: '/email',
        component: emailApp
    },
]

export const myRouter = new VueRouter({ routes })