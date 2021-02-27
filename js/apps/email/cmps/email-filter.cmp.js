

export default {
    props:['filterValues', 'sortValue'],
    template: `
    <section class="email-filter">
        <div class="criteria-container">
        <form @submit.prevent="setFilter" class="filter-container">
            <label class="criteria-lable"> Search: </label>    
            <input class="search-txt" type="text" placeholder="Search text in body/subject...." v-model="filterValues.searchTxt">
            <select class="read-sts" name="readStatus" id="readStatus" v-model="filterValues.readStatus">
                <option selected="selected" value="all">All</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
            </select> 
            <button class="search-btn btn">🔍</button>
        </form>


        <div class="email-sort">
        <label> Sort by: </label>
            <select class="sort" @change="setSort" name="sortValue" v-model="sortValue">
                <option selected="selected" value="date">Date</option>
                <option value="title">Subject</option>
            </select>
        </div>
    </div>
    </section>
    `,
    methods:{
        setFilter(){
            this.$emit('filtered',{...this.filterValues})
        },
        setSort(){
            this.$emit('sorted', this.sortValue)
        }
    },

}

