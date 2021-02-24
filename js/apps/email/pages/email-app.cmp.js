
import { emailService } from '../services/email-service.js'
// import emailFilter from '../cmps/email-filter.cmp.js'
import emailList from '../cmps/email-list.cmp.js'

export default {
    template: `
        <section class="email-app app-main">
            <!-- <email-filter @filtered="setFilter" @searchInEmail="searchInEmail"></email-filter> -->
            <email-list :emails="emailsToShow" @remove="removeEmail"/>
            <!-- <router-link to="/email/edit">compose</router-link> -->
        </section>
    `,
    data() {
        return {
            emails: [],
            filterBy: null,
        }
    },
    methods: {
        removeEmail(emailId) {
            bookService.remove(emailId)
                .then(this.loadEmails())
        },

        loadEmails() {
            emailService.query()
                .then(emails => this.emails = emails)
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },

    },
    computed: {
        emailsToShow() {
            // if (!this.filterBy || !this.filterBy.name) return this.books
            // const searchStr = this.filterBy.name.toLowerCase()
            // const booksToShow = this.books.filter(book => {
            //     return book.title.toLowerCase().includes(searchStr) &&
            //         book.listPrice.amount <= this.filterBy.maxPrice &&
            //         book.listPrice.amount >= this.filterBy.minPrice;
            // })
            // return booksToShow;
            return this.emails; //TODO: sort+filter
        },

    },
    created() {
        console.log('email created');
        this.loadEmails();
    },
    components: {
        // emailFilter,
        emailList,
    }
}
