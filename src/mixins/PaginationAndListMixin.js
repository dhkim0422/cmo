import { mapGetters } from 'vuex'
import eventBus from '@/utils/eventBus.js'

//페이징 처리에 필요한 기본 파라메터를 초기화 합니다.
export default {
    data() {
        return {
            isLoading: true,
            isSearch: true,
        }
    },
    created() {
        //목록을 조회 한다.
        if (this.params.pageIndex == null) {
            this.params.pageIndex = 1;
            this.params.pageUnit = 10;
        }

        if (this.isSearch) {
            this.paginationAndList(this.params.pageIndex)
        }

        eventBus.$on('paginationAndList', componentName => {
            if (this.$options.name == componentName) {
                console.log('this.paginationInfo', this.paginationInfo)            
                console.log('this.params', this.params)            
                this.paginationAndList(1)
            }
        })
    
    },

    computed: {
        ...mapGetters(['resultList', 'paginationInfo', 'totalRecordCount', 'params']),
    },

    methods: {
        startSpinner() {
            this.isLoading = true
        },
        endSpinner() {
            this.isLoading = false
        },
        //Pagination 컴포넌트의 change emit
        changePageIndex(pageIndex) {
            this.paginationAndList(pageIndex)
        },
    
        //목록을 조회 한다.
        paginationAndList(pageIndex) {
            if (this.paginationAndListValidation()) {
                this.startSpinner()
                this.params.pageIndex = pageIndex
                this.$store.dispatch('loadPaginationAndList', {
                    componentName: this.$options.name,
                    params: this.params
                })
                .catch(error => console.log('error', error))
                .finally(() => { 
                    this.endSpinner()
                    this.callbackPaginationAndList()
                })
                
            }
        },

        //callback
        callbackPaginationAndList() {

        },

        //validtion이 있을 경우 자식의 validation으로 오버라이딩 된다.
        paginationAndListValidation() {
            return true
        }        
    }
}