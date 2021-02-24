

export default {
    props: ['email'],
    template: `
        <section class="email-preview grid" @click="openEmail">
            <span v-if="email.isStar" @click="toggleStar">★</span>
            <span v-if="!email.isStar" @click="toggleStar">✰</span>
            <span @click="removeEmail($event,email.id)">🗑</span>
            <span v-if="email.isRead" @click="toggleRead">💌</span>
            <span v-if="!email.isRead" @click="toggleRead">📧</span>
            <p>{{email.subject}}</p>
            <p>{{sentData}}</p>

        </section>
        
        `,
        data(){
            return {
                
            }
        },

    computed:{
        sentData(){
            return new  Date(this.email.sentAt).toLocaleString()
        },
        // ☆  ✰ ⭐ ✉ 📨 ✉️ 💌 📧
        
    },
    methods:{
        toggleStar(email){
            //emit father to change. refresh show
            // this.$emit('updateStar', email)
        },
        toggleRead(email){
            // this.$emit('updateStar', email)
        },
        removeEmail($event,emailId){
            //if sure , emit
            this.$emit('removeEmail', emailId)
        },
        openEmail(email){
            //rout details here???
        },


    }

}