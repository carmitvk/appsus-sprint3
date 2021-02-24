

const routes = [
    {
        path: '/',
        component: homePage,
    },
    // {
    //     path: '/book',
    //     component: bookApp
    // },
    // {
    //     path: '/about',
    //     component: about
    // },
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