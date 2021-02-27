import { eventBus } from '../services/event-bus-service.js'

export default {
    template: `
    <section class="about app-main">
        <!-- <h1 ref="header">This application will enable the use of email options
            wrote by:
        </h1> -->



          <!-- Me -->
        <div class="col-spaces flex-align-center">
            <p>
                This application will enable the use of email options wrote by
            </p>
            <img class="mx-auto rounded-circle" src="../../../img/img1.jpeg" alt="">
            <h4 >Carmit Vaknin</h4>
            <p class="about-description">Lives in center of the country. </p>
            <p class="about-description">like to paint and to learn new things. </p>
            <p class="about-description">last learned to be a full stack developer. </p>    
        </div>


        <!-- <button @click="callBus">Call the bus!</button> -->
    </section>
    `,
    methods: {
        // callBus() {
        //     console.log('emitting bbb!');
        //     eventBus.$emit('bbb','abc')
        //     eventBus.$emit('bbb2')
        // }
    },
}