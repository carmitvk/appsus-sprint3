
import { emailService } from '../services/email-service.js'
import emailFilter from '../cmps/email-filter.cmp.js'
import emailList from '../cmps/email-list.cmp.js'
// import { eventBus } from '../services/event-bus-service.js'

export default {
    template: `
        <section class="email-app app-main">
            <div class="actions">
                <div class="unread-show bold">{{unreadCount}} unread emails</div>
                <button class="btn compose-btn" @click="openCompose">+compose</button>
                <div class="folders-container bold">
                    <div v-bind:class="{ active: filterBy.folder ==='inbox' }"  class="folder" @click="chooseFolder('inbox')">Inbox</div>
                    <div v-bind:class="{ active: filterBy.folder ==='sentItems' }" class="folder" @click="chooseFolder('sentItems')">Sent Items</div>
                    <div v-bind:class="{ active: 
                        filterBy.folder ==='star' }" class="folder" @click="chooseFolder('star')">Star</div>
                </div>
                <!-- <email-status :percent="computePercent" /> -->
            </div>
            <div class="list-container">
                <email-filter :filterValues="filterBy" :sortValue="sortBy" @filtered="setFilter" @sorted="setSort"></email-filter>
                <email-list :emails="emailsToShow" @removeEmail="removeEmail" @updateStar="updateStar" @updateRead="updateRead"/>
            </div>
        </section>
    `,
    data() {
        return {
            emails: [],
            filterBy: {
                searchTxt: '',
                readStatus: 'all',
                folder: 'inbox',
            },
            sortBy: 'date',
            unreadCount: 0,
            emailsToShow: [],
        }
    },
    methods: {
        chooseFolder(selectedFolder) {
            console.log('inside chooseFolder')
            this.filterBy.folder = selectedFolder;
            this.filterBy.searchTxt='';
            this.filterBy.readStatus='all';
            this.sortBy= 'date';
            this.filterEmailsToShow();
        },
        removeEmail(emailId) {
            emailService.remove(emailId)
                .then(() => {
                    this.loadEmails();
                })
        },
        updateStar(emailId) {
            emailService.updateStar(emailId)
                .then(() => this.loadEmails())
        },
        updateRead(emailId) {
            emailService.updateRead(emailId)
                .then(() => {
                    this.loadEmails();
                })
        },
        loadEmails() {
            emailService.query()
                .then(emails => this.emails = emails)
                .then(() => this.initEmailsToShow())
        },
        setFilter(filterBy) {
            this.filterBy.searchTxt = filterBy.searchTxt;
            this.filterBy.readStatus = filterBy.readStatus;
            this.sortBy= 'date';
            this.filterEmailsToShow();
        },
        setSort(sortBy) {
            this.sortBy = sortBy;
            this.sortEmailsToShow();
        },
        openCompose() {
            this.$router.replace({ path: `/compose` })
        },

        initEmailsToShow() {
            console.log('inside initEmailsToShow')
            this.filterEmailsToShow();
            this.sortEmailsToShow();
        },

        sortEmailsToShow() {
            if (this.sortBy === 'date') {
                this.emailsToShow = this.emailsToShow.sort((email1, email2) => email2.sentAt - email1.sentAt)
            } else {//subject
                this.emailsToShow = this.emailsToShow.sort((email1, email2) => {
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
        },

        filterEmailsToShow() {
            const lowerSearchTxt = this.filterBy.searchTxt.toLowerCase()

            this.emailsToShow = this.emails.filter((email) => {
                 var result = (lowerSearchTxt.length === 0 ||
                    email.subject.toLowerCase().includes(lowerSearchTxt) ||
                    email.body.toLowerCase().includes(lowerSearchTxt))
                    && (
                        (this.filterBy.readStatus !== 'all' && 
                            (email.isRead === true && this.filterBy.readStatus==='read')||
                            (email.isRead === false && this.filterBy.readStatus==='unread')) ||
                        (this.filterBy.readStatus === 'all' )
                    )&&(
                        (this.filterBy.folder === 'inbox' && email.isInbox === true)||
                        (this.filterBy.folder === 'sentItems' && email.isInbox === false)||
                        (this.filterBy.folder === 'star' && email.isStar === true)
                    )
                    return result;
            })
            this.unreadCount = this.emailsToShow.reduce((acc,email)=>{
                if (!email.isRead){
                    acc++;
                }
                return acc;
            },0)
        }
    },
    created() {
        this.loadEmails();
        // this.updateUnreadCount();
        // eventBus.$on('unread-changed', this.updateUnreadCount)

    },
    // destroyed() {
    //     // eventBus.$off('unread-changed', this.updateUnreadCount)
    // },
    // computed: {
    //     percent(){
    //         return (this.emails.length - unreadCount)*100/this.emailsToShow.length
    //     }
    // },
    components: {
        emailFilter,
        emailList,
    }
}
