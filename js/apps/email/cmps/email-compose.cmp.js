import { emailService } from "../services/email-service.js";
import { eventBus } from  "../../../services/event-bus-service.js";


export default {
    template: `
            <section class="email-compose">
            <form class="compose-container" @submit.prevent="save">
                <input class="composed-sub" type="text" placeholder="Subject: " v-model="emailToAdd.subject">
                <input class="composed-to" type="text" placeholder="To: " v-model="emailToAdd.to">
                <textarea class="composed-txt" name="email-body:    " rows="26" cols="100" v-model="emailToAdd.body"></textarea>
                <button class="btn composed-btn">Send</button>
            </form>
            </section>
            `,

    data() {
        return {
            emailToAdd: {
                subject: '',
                body: 'Email body',
                isRead: true,
                isStar: false,
                sentAt: Date.now(),
                from: 'Me',
                to:'',
                isInbox:false
            }
        }
    },
    methods:{
        loadEmails() {
            emailService.query()
                .then(emails => this.emails = emails)
        },
        save() {
            emailService.save(this.emailToAdd)
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
}