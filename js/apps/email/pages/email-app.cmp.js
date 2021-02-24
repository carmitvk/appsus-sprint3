
import { emailService } from '../services/email-service.js'
// import emailFilter from '../cmps/email-filter.cmp.js'
import emailList from '../cmps/email-list.cmp.js'

export default {
    template: `
        <section class="email-app app-main">
            <div class="actions">
                <button @click="openCompose">+compose</button>
            </div>
            <div class="list-container">
                <!-- <email-filter @filtered="setFilter" @searchInEmail="searchInEmail"></email-filter> -->
                <email-list :emails="emailsToShow" @removeEmail="removeEmail" @updateStar="updateStar" @updateRead="updateRead"/>
                <!-- <router-link to="/email/edit">compose</router-link> -->
            </div>
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
            emailService.remove(emailId)
                .then(()=>this.loadEmails())
        },
        updateStar(emailId){
            emailService.updateStar(emailId)
            .then(()=>this.loadEmails())
        },
        updateRead(emailId){
            emailService.updateRead(emailId)
            .then(()=>this.loadEmails())
        },
        loadEmails() {
            emailService.query()
                .then(emails => this.emails = emails)
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        openCompose(){
            this.$router.replace({ path: `/compose` })
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
