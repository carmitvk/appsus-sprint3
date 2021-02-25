

export default {
    template: `
    <section class="email-filter">
        <form @submit.prevent="setFilter">
            <label> Search an email: </label>    
            <input type="text" placeholder="Search text in body...." v-model="filterBy.searchTxt">
            <select name="readStatus" id="readStatus" v-model="filterBy.readStatus">
                <option selected="selected" value="all">All</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
            </select> 
            <button class="btn">🔍</button>
        </form>


        <div class="email-sort">
        <label> Sort by: </label>
            <select @change="setSort" name="sortBy" v-model="sortBy">
                <option selected="selected" value="date">Date</option>
                <option value="title">Subject</option>
            </select>
        </div>

    </section>
    `,
    data() {
        return {
            filterBy: {
                searchTxt: '',
                readStatus:'all'
            },
            sortBy:'',
        }
    },
    methods:{
        setFilter(){
            // this.$emit('filtered',this.filterBy); //this pass pointer, every change will change oninput immediately
            this.$emit('filtered',{...this.filterBy})
        },
        setSort(){
            this.$emit('sorted', this.sortBy)
        }
    },

}

