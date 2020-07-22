<template>
    <div class="search">
        <form @submit.prevent="searchBoxClick()">
            <div class="dropdown">
                <b-dropdown id="dropdown-1" :text="searchCallback.name" class="dropdown-toggle">
                    <b-dropdown-item v-for="field in filters.fields" @click="filter_select(field)">
                        {{field.name}}
                    </b-dropdown-item>
                </b-dropdown>
            </div>
            <div class="search-input-group">
                <input class="search-input" type="text" placeholder="검색어" v-model="keyword"
                       aria-invalid="false">
                <button class="search-btn" type="button" @click="searchBoxClick">
                    <span class="sr-only">조회</span><i class="xi-search"></i>
                </button>
            </div>
        </form>
    </div>
</template>
<script>
    export default {
        name: 'SearchBox',
        props: ['filters'],
        mounted() {
            this.searchBoxClick()
        },
        data() {
            return {
                keyword: '',
                searchCallback: {id: '', name: '전체'}
            }
        },
        computed: {},
        methods: {
            filter_select(fields) {
                this.searchCallback = fields                //선택한 내역을 화면에 변환 시켜 준다.
            },
            searchBoxClick() {
                let params = {keyword: this.keyword}
                if (this.searchCallback.id != '') {
                    console.log('1',this.searchCallback.id)
                    params ['fields'] =  [this.searchCallback]
                } else {
                    console.log('2',this.searchCallback.id)
                    params ['fields'] =  this.filters.fields
                }

                console.log('params',params)



                this.$emit("searchClick", params) //부모에 이벤트로 값을 전달해야 문제가 안된다.
            }
        },
    }
</script>

