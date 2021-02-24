

export default {
    props: ['email'],
    template: `
        <section class="email-preview grid">
            <span v-if="email.isStar" @click="toggleStar($event,email.id)">★</span>
            <span v-if="!email.isStar" @click="toggleStar($event,email.id)">✰</span>
            <span @click="removeEmail($event,email.id)">🗑</span>
            <span v-if="email.isRead" @click="toggleRead($event,email.id)">💌</span>
            <span v-if="!email.isRead" @click="toggleRead($event,email.id)">📧</span>
            <div class="preview-txt" @click="openEmail">
                <p>{{email.from}}</p>
                <p>{{email.subject}}</p>
                <p>{{sentData}}</p>
            </div>
        </section>
        
        `,
        data(){
            return {
                
            }
        },

    computed:{
        sentData(){
            return new  Date(this.email.sentAt).toLocaleString();
        },
        // ☆  ✰ ⭐ ✉ 📨 ✉️ 💌 📧
        
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
            //if sure , emit
            this.$emit('removeEmail', emailId);
        },
        openEmail(){
            this.$router.replace({ path: `/email/${this.email.id}` })
        }

    }

}