import { emailService } from "../services/email-service.js";
import { eventBus } from  "../../../services/event-bus-service.js";


export default {
    template: `
            <section class="email-compose">
            <form @submit.prevent="save">
                <input type="text" placeholder="Subject: " v-model="emailToAdd.subject">
                <input type="text" placeholder="To: " v-model="emailToAdd.to">
                <textarea name="email-body:    " rows="10" cols="500" v-model="emailToAdd.body"></textarea>
                <button class="btn">Send</button>
            </form>
            </section>
            `,

    data() {
        return {
            emailToAdd: {
                subject: '',
                body: 'Email body',
                isRead: false,
                isStar: false,
                sentAt: Date.now(),
                from: 'Me',
                to:'',
                isEmail:false
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