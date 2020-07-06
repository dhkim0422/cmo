<template>
  <div class="navbar-pagination text-center">
    <ul class="pagination mT-20">
      <li class="page-item" :class="disabledPrevClass">
        <a class="page-link" @click="first" aria-label="First">
          <span aria-hidden="true"><i class="xi-fast-backward"></i></span>
          <span class="sr-only">Last</span>
        </a>
      </li>
      <li class="page-item" :class="disabledPrevClass">
        <a class="page-link" @click="prev" aria-label="Previous">
          <span><i class="xi-step-backward"></i></span>
          <span class="sr-only">Previous</span>
        </a>
      </li>

      <li :class="pageActiveClass(pageIndex)" v-for="pageIndex in items" :key="pageIndex">
        <a class="page-link" style="cursor:pointer" @click="goto(pageIndex)">{{ pageIndex }}</a>
      </li>


      <li class="page-item" :class="disabledNextClass">
        <a class="page-link" @click="next" aria-label="Next">
          <span aria-hidden="true"><i class="xi-step-forward"></i></span>
          <span class="sr-only">Next</span>
        </a>
      </li>
      <li class="page-item" :class="disabledNextClass">
        <a class="page-link" @click="last" aria-label="Last">
          <span aria-hidden="true"><i class="xi-fast-forward"></i></span>
          <span class="sr-only">Last</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters} from 'vuex'

	/**
	 * currentPageNo : 현재 페이지 번호
	 * recordCountPerPage : 한 페이지당 게시되는 게시물 건 수
	 * pageSize : 페이지 리스트에 게시되는 페이지 건수,
	 * totalRecordCount : 전체 게시물 건 수.
   *
	 * totalPageCount: 페이지 개수
	 * firstPageNoOnPageList : 페이지 리스트의 첫 페이지 번호
	 * lastPageNoOnPageList : 페이지 리스트의 마지막 페이지 번호
	 * firstRecordIndex : 페이징 SQL의 조건절에 사용되는 시작 rownum.
	 * lastRecordIndex : 페이징 SQL의 조건절에 사용되는 마지막 rownum.
	 */
export default {
  name: 'Pagination',
  // props: {

  //   paginationInfo: {
  //     currentPageNo: {
  //       type: Number,
  //       required: true
  //     },
  //     recordCountPerPage: {
  //       type: Number,
  //       default: 10
  //     },
  //     pageSize: {
  //       type: Number,
  //       default: 10
  //     },
  //     totalRecordCount: {
  //       type: Number,
  //       required: true
  //     },
  //     totalPageCount: {
  //       type: Number,
  //       required: true
  //     },
  //     firstPageNoOnPageList: {
  //       type: Number,
  //       required: true
  //     },
  //     lastPageNoOnPageList: {
  //       type: Number,
  //       required: true
  //     },
  //     firstRecordIndex: {
  //       type: Number,
  //       required: true
  //     },
  //     lastRecordIndex: {
  //       type: Number,
  //       required: true
  //     },
  //   }
  // },

  mounted() {

  },
  computed: {
    ...mapGetters(['paginationInfo']),

    items() {

      let pages = []
      let startIndex = this.paginationInfo.firstPageNoOnPageList
      for (startIndex; startIndex <= this.paginationInfo.lastPageNoOnPageList; startIndex++) {
        pages.push(startIndex)
      }
      return pages
    },

    disabledPrevClass() {
      return {
        'disabled': this.isFirstPage(),
        'pointer': !this.isFirstPage(),
        }
    },
    disabledNextClass() {
      return {
        'disabled': this.isLastPage(),
        'pointer': !this.isLastPage(),
        }
    },
  },
  methods: {
    chageEmit(pageIndex) {
      this.$emit('changePageIndex', pageIndex)
    },
    isFirstPage() {
      return this.paginationInfo.currentPageNo / this.paginationInfo.pageSize <= 1 || this.paginationInfo.totalRecordCount === 0 || Object.keys(this.paginationInfo).length === 0
    },
    isLastPage() {
      return this.paginationInfo.lastPageNoOnPageList === this.paginationInfo.totalPageCount || this.paginationInfo.totalRecordCount === 0 || Object.keys(this.paginationInfo).length === 0
    },
    first() {
      if (!this.isFirstPage()) {
        this.chageEmit(1)
      }
    },
    prev() {
      if (!this.isFirstPage()) {
        this.chageEmit(this.paginationInfo.firstPageNoOnPageList - 1)
      }
    },

    goto(pageIndex) {
      this.chageEmit(pageIndex)
    },

    next() {
      if (!this.hasLast) {
        this.chageEmit(this.paginationInfo.lastPageNoOnPageList + 1)
      }
    },

    last() {
      if (!this.hasLast) {
        this.chageEmit(this.paginationInfo.totalPageCount)
      }
    },

    pageActiveClass(pageIndex) {
      return {'active': pageIndex === this.paginationInfo.currentPageNo}
    },

  }
}
</script>

<style>
.pointer {
  cursor:pointer
}
</style>

