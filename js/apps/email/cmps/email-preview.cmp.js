

export default {
    props: ['email'],
    template: `
        <section class="email-preview grid" @click="openEmail">
            <span v-if="email.isStar" @click="toggleStar">★</span>
            <span v-if="!email.isStar" @click="toggleStar">✰</span>
            <span @click="removeEmail">🗑</span>
            <span v-if="email.isRead" @click="toggleRead">💌</span>
            <span v-if="!email.isRead" @click="toggleRead">📧</span>
            <p>{{email.subject}}</p>
        </section>
        
        `,
        data(){
            return {
                
            }
        },

    computed:{

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
        removeEmail(email){
            //if sure , emit
            // this.$emit('removeEmail', email)
        },
        openEmail(email){
            //rout details here???
        },


    }

}