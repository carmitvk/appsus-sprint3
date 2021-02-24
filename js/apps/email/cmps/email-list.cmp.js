import emailPreview from './email-preview.cmp.js'

export default {
    props:['emails'],
    template: `
                <ul class="email-list " >
                    <li v-for="email in emails" :key="email.id" class="email-preview-container ">
                        <email-preview :email="email" @click.native="select(email)"/>
                        <div class="btns-container">
                            <!-- <button @click="remove(email.id)">🗑</button> -->
                            <!-- <router-link :to="'/email/'+email.id">Details</router-link> -->
                        </div>

                    </li>
                </ul>
            `,
            methods: {
                remove(emailId) {
                    console.log('del emailId:', emailId)
                    this.$emit('removeEmail', emailId)
                },
                select(email) {
                    this.$emit('selected', email)
                },
            },
            components:{
                emailPreview 
            }
}