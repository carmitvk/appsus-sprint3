
import { emailService } from '../services/email-service.js'
import emailFilter from '../cmps/email-filter.cmp.js'
import emailList from '../cmps/email-list.cmp.js'

export default {
    template: `
        <section class="email-app app-main">
            <div class="actions">
                <div>You have {{unreadCount}} unread emails</div>
                <button class="btn" @click="openCompose">+compose</button>
            </div>
            <div class="list-container">
                <email-filter @filtered="setFilter" @sorted="setSort"></email-filter>
                <email-list :emails="emailsToShow" @removeEmail="removeEmail" @updateStar="updateStar" @updateRead="updateRead"/>
                <!-- <router-link to="/email/edit">compose</router-link> -->
            </div>
        </section>
    `,
    data() {
        return {
            emails: [],
            filterBy: null,
            sortBy: 'date',
            unreadCount: 0,
        }
    },
    methods: {
        removeEmail(emailId) {
            emailService.remove(emailId)
                .then(() => this.loadEmails())
        },
        updateStar(emailId) {
            emailService.updateStar(emailId)
                .then(() => this.loadEmails())
        },
        updateRead(emailId) {
            emailService.updateRead(emailId)
                .then(() => this.loadEmails())
        },
        loadEmails() {
            emailService.query()
                .then(emails => this.emails = emails)
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        setSort(sortBy) {
            this.sortBy = sortBy;
        },
        openCompose() {
            this.$router.replace({ path: `/compose` })
        },

    },
    computed: {
        emailsToShow() {
            if (this.sortBy === 'date') {
                this.emails = this.emails.sort((email1, email2) => email2.sentAt - email1.sentAt)
            } else {//subject
                this.emails = this.emails.sort((email1, email2) => {
                    if (email1.subject < email2.subject) {
                        return -1
                    } else {
                        if (email1.subject > email2.subject) {
                            return 1
                        } else {
                            return 0
                        }
                    }
                })
            }

            if (!this.filterBy || !this.filterBy.searchTxt) return this.emails //because this case, we should sort first
            const lowerSearchTxt = this.filterBy.searchTxt.toLowerCase()
            const isRead = this.filterBy.readStatus === 'read' ? true : false

            const emailsToShow = this.emails.filter(email => {
                return (email.subject.toLowerCase().includes(lowerSearchTxt)
                    || email.body.toLowerCase().includes(lowerSearchTxt))
                    && (
                        (this.filterBy.readStatus !== 'all' && email.isRead === isRead) ||
                        (this.filterBy.readStatus === 'all' )
                    )
            })
            return emailsToShow;
        },

    },
    created() {
        this.loadEmails();
        this.unreadCount = emailService.getUnreadCount();
    },
    components: {
        emailFilter,
        emailList,
    }
}
