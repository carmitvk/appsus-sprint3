import { emailService } from "../services/email-service.js";
import { eventBus } from  "../../../services/event-bus-service.js";


export default {
    template: `
            <section v-if="origEmail" class="email-reply">
            <form @submit.prevent="save">
                <div>To: {{replyEmail.to}}</div>
                <div>Subject: {{replyEmail.subject}}</div>
                <textarea name="email-body:    " rows="10" cols="100" v-model="replyEmail.body"></textarea>
                <button class="btn">Send</button>
            </form>
            </section>
            `,

    data() {
        return {
            origEmail:null,
            replyEmail: {
                subject: 'subject',
                body: 'Email body',
                isRead: false,
                isStar: false,
                sentAt: Date.now(),
                from: 'Me',
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
            
            console.log('this.replyEmail.body',this.replyEmail.body)
            emailService.save(this.replyEmail)
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
    computed:{

    },
    created() {
        const id = this.$route.params.emailId;
        emailService.getById(id)
            .then((email) => {
                this.origEmail = email;
                this.replyEmail.subject = 'Re: '+this.origEmail.subject
                this.replyEmail.to = this.origEmail.from
                this.replyEmail.body =  '\n\n\n\n\n\n\n'+'Orig Message was: '+this.origEmail.body;
            })
    }

}