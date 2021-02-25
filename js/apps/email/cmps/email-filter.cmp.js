

export default {
    template: `
    <section class="email-filter">
        <label> Search an email: </label>    
        <input type="text"  placeholder="Search...." v-model="filterBy.name">
        <label> min price: </label>
        <input type="number"  placeholder="min...." v-model.number="filterBy.minPrice">
        <label> max price: </label>
        <input type="number"  placeholder="max...." v-model.number="filterBy.maxPrice">
        <button class="btn" @click="setFilter">search</button>
    </section>
    `,
    data() {
        return {
            filterBy: {
                name: '',
                maxPrice:Infinity,
                minPrice:0
            }
        }
    },
    methods:{
        setFilter(){
            // this.$emit('filtered',this.filterBy); //this pass pointer, every change will change oninput immediately
            this.$emit('filtered',{...this.filterBy})
            // this.filterBy.name=''
        },
    },

}

