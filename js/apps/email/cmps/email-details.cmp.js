import { emailService } from "../services/email-service.js";

export default {
    template: `
            <section v-if="email" class="email-details" >
                <div>Subject: {{email.subject}}</div>
                <div>From: {{email.from}}</div>
                <div>To: {{email.to}}</div>
                <div>Sent At: {{sentData}}</div>
                <div><pre>Email body: {{email.body}}</pre></div>
                
                <router-link to="/email">Back To Emails</router-link>
            </section>
            `,

    data() {
        return {
            email: null,
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