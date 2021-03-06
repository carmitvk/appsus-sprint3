import emailPreview from './email-preview.cmp.js'

export default {
    props:['emails'],
    template: `
                <ul class="email-list " >
                    <li v-for="email in emails" :key="email.id" class="email-preview-container ">
                        <email-preview :email="email" @removeEmail="remove" @updateStar="updateStar" @updateRead="updateRead"  />
                        <div class="btns-container">
                        </div>
                    </li>
                </ul>
            `, 
            methods: {
                remove(emailId) {
                    this.$emit('removeEmail', emailId)
                },
                updateStar(emailId){
                    this.$emit('updateStar', emailId)
                },
                updateRead(emailId){
                    this.$emit('updateRead', emailId)
                },
            },
            components:{
                emailPreview 
            }
}