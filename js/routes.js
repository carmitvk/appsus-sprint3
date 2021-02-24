import homePage from './pages/home-page.cmp.js'
import emailApp from './apps/email/pages/email-app.cmp.js'
import about from './pages/about.cmp.js'
import emailDetails from '../js/apps/email/cmps/email-details.cmp.js'

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
    {
        path: '/email',
        component: emailApp
    },
    {
        path: '/email/:emailId',
        component: emailDetails
    },
]

export const myRouter = new VueRouter({ routes })