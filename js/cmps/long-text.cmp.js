export default {
    props: ['txt'],
    template: `
            <section class="ong-text">
                <p v-if="!isAllDescShown">Description: {{getDescription}}</p>
                <p v-else>Description: {{txt}}</p>
                <button v-if="txt.length>100" class="btn" @click="toggleDesc">Read <span>{{moreOrLess}}</span>...</button>
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
            const strToShow = this.txt.length <= 100 ? this.txt : `${this.txt.substr(0, 99)}...`
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