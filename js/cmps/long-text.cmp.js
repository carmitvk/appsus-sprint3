export default {
    props: ['txt'],
    template: `
            <section class="ong-text">
                <p v-if="!isAllDescShown">{{getDescription}}</p>
                <p v-else>{{txt}}</p>
                <!-- <button v-if="txt.length>10" class="btn" @click="toggleDesc">Read <span>{{moreOrLess}}</span>...</button> -->
            </section>
    `,
    data() {
        return {
            isAllDescShown: false,
        }
    },
    methods:{
        toggleDesc() {
            this.isAllDescShown = !this.isAllDescShown
        }
    },
    computed: {
        getDescription() {
            const strToShow = this.txt.length <= 20 ? this.txt : `${this.txt.substr(0, 19)}...`
            return strToShow
        },
        moreOrLess() {
            if (this.isAllDescShown) return 'Less'
            return 'More'
        }

    }
}

// to use:
// <long-text :txt="book.description" />
// add import and put down in the page in the component area