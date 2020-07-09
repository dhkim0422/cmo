<template>
    <div class="search">
        <form @submit.prevent = "searchBoxClick()">
        <div class="dropdown">
            <button class="dropdown-toggle" type="button" data-toggle="dropdown">{{searchCallback.name}}
            </button>
            <ul  class="dropdown-menu">
                <li v-for="field in filters.fields" role="button" class="dropdown-item" @click="filter_select(field)">
                    {{field.name}}
                </li>
            </ul>
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
        created() {
            this.searchBoxClick()
        },

        data() {
            return {
                keyword: '',
                searchCallback: {id:'',name:'전체'}
            }
        },
        computed: {},
        methods: {
            filter_select(fileld) {
                this.searchCallback = fileld                //선택한 내역을 화면에 변환 시켜 준다.
            },
            searchBoxClick() {
                let params  = {keyword:this.keyword , fileld:[]}
                if(this.searchCallback['id'] === ''){
                    this.filters.fields.map((row,index) =>{
                        params ['fileld'][index] = row.id
                    })

                }else{
                    params ['fileld'] = this.searchCallback.id
                }
                console.log('params',params)
                this.$emit("searchClick", params) //부모에 이벤트로 값을 전달해야 문제가 안된다.
            }
        },
    }
</script>

