import { emailService } from "../services/email-service.js";
import { utilService } from "../../../services/util-service.js";
import { eventBus } from  "../../../services/event-bus-service.js";


export default {
    template: `
            <section class="email-compose">
            <form @submit.prevent="save">
                <input type="text" placeholder="Subject: " v-model="emailToEdit.subject">
                <input type="text" placeholder="To: " v-model="emailToEdit.to">
                <textarea name="email-body:    " rows="10" cols="500" v-model="emailToEdit.body"></textarea>
                <button>Save</button>
            </form>
            </section>
            `,

    data() {
        return {
            emailToEdit: {
                // id: utilService.makeId(),
                subject: 'subject',
                body: 'Email body',
                isRead: false,
                isStar: false,
                sentAt: Date.now(),
                from: 'Me'
            }
        }
    },
    methods:{
        loadEmails() {
            emailService.query()
                .then(emails => this.emails = emails)
        },
        save() {
            emailService.save(this.emailToEdit)
                .then(email => {
                    const msg = {
                        txt: 'email saved succesfully',
                        type: 'success'
                    }
                    eventBus.$emit('show-msg', msg)
                    this.$router.push('/email');
                    this.loadEmails();
                })
                .catch(err =>{
                    console.log(err);
                    const msg = {
                        txt: 'Error, please try again later',
                        type: 'error'
                    }
                    eventBus.$emit('show-msg', msg)
                })
        },
    },  
    created() {
        // const id = this.$route.params.emailId;
        // emailService.getById(id)
        //     .then((email) => {
        //         this.email = email;
        //     })
    }

}