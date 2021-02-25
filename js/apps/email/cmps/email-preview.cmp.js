         
import longText from '../../../cmps/long-text.cmp.js'
import { emailService } from '../services/email-service.js';

export default {
    props: ['email'],
    template: `
        <section class="email-preview grid">
            <span v-if="email.isStar" @click="toggleStar($event,email.id)">★</span>
            <span v-if="!email.isStar" @click="toggleStar($event,email.id)">✰</span>
            <span @click="removeEmail($event,email.id)">🗑</span>
            <span v-if="email.isRead"  @click="toggleRead($event,email.id)">💌</span>
            <span v-if="!email.isRead" @click="toggleRead($event,email.id)">📧</span>
            <div class="preview-txt" v-bind:class="{ bold: !email.isRead }" @click="openEmail">
                <p >{{email.from}}</p>
                <p>{{email.subject}}</p>
                <long-text :txt="email.body" :title="email.body"/>
                <p>{{sentDate}}</p>
            </div>
        </section>
      
        `,
        data(){
            return {
                
            }
        },

    computed:{
        sentDate(){
            return new  Date(this.email.sentAt).toLocaleString();
        },  
        fontBold(){
            return (!this.email.isRead)?'bold':' ';
        },   
    },
    methods:{
        toggleStar($event,emailId){
            //emit father to change. refresh show
            this.$emit('updateStar', emailId);
        },
        toggleRead($event,emailId){
            this.$emit('updateRead', emailId);
        },
        removeEmail($event,emailId){
            //if sure , emit -TODO
            this.$emit('removeEmail', emailId);
        },
        openEmail(){
            this.$router.replace({ path: `/email/${this.email.id}` });
            emailService.updateReadFullMode(this.email.id)
            .then(()=>{ })
        }
    },
    components:{
         longText
    }
}