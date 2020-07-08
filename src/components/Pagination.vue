<template>
  <div class="navbar-pagination text-center">
    <ul class="pagination mT-20">
      <li :class="disabledPrevClass">
        <a class="page-link" @click="first" aria-label="First">
          <span aria-hidden="true">
            <i class="xi-fast-backward"></i>
          </span>
          <span class="sr-only">First</span>
        </a>
      </li>
      <li :class="disabledPrevClass">
        <a class="page-link" @click="prev" aria-label="Previous">
          <span>
            <i class="xi-step-backward"></i>
          </span>
          <span class="sr-only">Previous</span>
        </a>
      </li>

      <li :class="pageActiveClass(pageNo)" v-for="pageNo in items" :key="pageNo">
        <a class="page-link" style="cursor:pointer" @click="goto(pageNo)">
          {{
          pageNo
          }}
        </a>
      </li>

      <li :class="disabledNextClass">
        <a class="page-link" @click="next" aria-label="Next">
          <span aria-hidden="true">
            <i class="xi-step-forward"></i>
          </span>
          <span class="sr-only">Next</span>
        </a>
      </li>
      <li :class="disabledNextClass">
        <a class="page-link" @click="last" aria-label="Last">
          <span aria-hidden="true">
            <i class="xi-fast-forward"></i>
          </span>
          <span class="sr-only">Last</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

/**
 * currentPageNo : 현재 페이지 번호
 * pageUnit : 한 페이지당 게시되는 게시물 건 수
 * pageSize : 페이지 리스트에 게시되는 페이지 건수,
 * totalRecordCount : 전체 게시물 건 수.
 *
 * totalPageCount: 페이지 개수
 * firstPageNoOnPageList : 페이지 리스트의 첫 페이지 번호
 * lastPageNoOnPageList : 페이지 리스트의 마지막 페이지 번호
 * firstRecordCount : 페이징 SQL의 조건절에 사용되는 시작 rownum.
 * lastRecordCount : 페이징 SQL의 조건절에 사용되는 마지막 rownum.
 */
export default {
  name: "Pagination",
  data() {
    return {
      totalPageCount: 0,
      firstPageNoOnPageList: 1,
      lastPageNoOnPageList: 1
    };
  },
  props: {
    currentPageNo: {
      type: Number,
      required: true
    },
    totalRecordCount: {
      type: Number,
      required: true
    },
    pageUnit: {
      type: Number,
      default: 10
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  computed: {
    items() {
      let pages = [];

      //전체 페이지 카운팅
      this.totalPageCount = (this.totalRecordCount - 1) / this.pageUnit + 1;

      //페이지 리스트의 시작 번호
      this.firstPageNoOnPageList =
        parseInt((this.currentPageNo - 1) / this.pageSize) * this.pageSize + 1;

      //페이지 리스트의 마지막 번호
      this.lastPageNoOnPageList =
        this.firstPageNoOnPageList + this.pageSize - 1;

      if (this.lastPageNoOnPageList > this.totalPageCount)
        this.lastPageNoOnPageList = this.totalPageCount;

      //페이지 리스트 생성
      let startIndex = this.firstPageNoOnPageList;
      for (startIndex; startIndex <= this.lastPageNoOnPageList; startIndex++) {
        pages.push(startIndex);
      }

      return pages;
    },

    disabledPrevClass() {
      return {
        disabled: this.isFirstPage(),
        pointer: !this.isFirstPage()
      };
    },
    disabledNextClass() {
      return {
        disabled: this.isLastPage(),
        pointer: !this.isLastPage()
      };
    }
  },
  methods: {
    chageEmit(pageNo) {
      this.$emit("changePageNo", pageNo);
    },
    //첫 페이지 리스트 여부
    isFirstPage() {
      return (
        this.currentPageNo / this.pageSize <= 1 || this.totalRecordCount === 0
      );
    },

    //마지막 페이지 리스트 여부
    isLastPage() {
      return (
        this.lastPageNoOnPageList === this.totalPageCount ||
        this.totalRecordCount === 0
      );
    },
    first() {
      if (!this.isFirstPage()) {
        this.chageEmit(1);
      }
    },
    prev() {
      if (!this.isFirstPage()) {
        this.chageEmit(this.firstPageNoOnPageList - 1);
      }
    },

    goto(pageNo) {
      this.chageEmit(pageNo);
    },

    next() {
      if (!this.isLastPage()) {
        this.chageEmit(this.lastPageNoOnPageList + 1);
      }
    },

    last() {
      if (!this.isLastPage()) {
        this.chageEmit(this.totalPageCount);
      }
    },

    pageActiveClass(pageNo) {
      return { active: pageNo === this.currentPageNo };
    }
  }
};
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>
