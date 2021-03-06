import { emailService } from "../services/email-service.js";

export default {
    template: `
            <section v-if="email" class="email-details" >
                <div class="email-details-container">
                <button class="btn" title="Reply" @click="reply">↷</button>
                <div>Subject: {{email.subject}}</div>
                <div>From: {{email.from}}</div>
                <div>To: {{email.to}}</div>
                <div>Sent At: {{sentData}}</div>
                <div class="details-body">{{email.body}}</div>
                <router-link to="/email">Back To Emails</router-link>
                </div>
            </section>
            `,

    data() {
        return {
            email: null,
        }
    },
    methods:{
        reply(){
            this.$router.replace({ path: `/email/reply/${this.email.id}` })
        }
    },
    computed:{
        sentData(){
            return new  Date(this.email.sentAt).toLocaleString();
        },        
    },
    created() {
        const id = this.$route.params.emailId;
        emailService.getById(id)
        .then((email)=>{
            this.email = email;
        })
    }

}