import { emailService } from "../services/email-service.js";

export default {
    template: `
            <section v-if="email" class="email-details" >
                <div>Subject: {{email.subject}}</div>
                <div>From:{{email.from}}</div>
                <div>Sent At:{{email.sentAt}}</div>
                <div>Email: {{email.body}}</div>
            

            </section>
            `,

    data() {
        return {
            email: null,
        }
    },
    created() {
        const id = this.$route.params.emailId;
        emailService.getById(id)
        .then((email)=>{
            this.email = email;
            console.log('details created. curr email=>', this.email);
        })
    }

}