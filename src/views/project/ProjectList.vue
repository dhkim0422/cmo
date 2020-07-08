<template>
  <div class="container">
    <!-- 검색폼 -->

    <search-box :filters="filters" @keywordSelected="setKeywork" @searchClick="selectList"></search-box>
    <!-- 검색 목록 -->
    <div class="filter-group">
      <div class="group-item">
        <div class="custom-checkbox custom-checkbox-all">
          <input
            type="checkbox"
            id="chkPrjAll"
            class="custom-control-input"
            ng-model="modelHandler.checkedAll"
            ng-change="modelHandler.selectAll(modelHandler.checkedAll)"
            aria-invalid="false"
          />
          <label class="custom-control-label" for="chkPrjAll">
            <span class="sr-only">전체선택</span>
          </label>
        </div>
        <div class="info">
          전체
          <span class="num ng-binding">{{ this.resultList.data.total }}</span>개, 현재 페이지
          <span class="num ng-binding">1</span> /
          <span class="num ng-binding">1</span>
        </div>
      </div>
      <div class="group-item">
        <!--                <button class="btn-outline-secondary-sm" type="button" data-toggle="tooltip" data-placement="top"-->
        <!--                        title="" ng-click="remove()" ng-disabled="!modelHandler.hasSelectedItems()"-->
        <!--                        ng-confirm-click="정보를 삭제합니다. 삭제된 정보는 복구할 수 없습니다." disabled="disabled"-->
        <!--                        data-original-title="삭제삭제">-->
        <!--                    <i class="xi-trash"></i><span class="sr-only">삭제</span>-->
        <!--                </button>-->

        <select v-model="resultList.data.numberOfRows" class="length" aria-invalid="false">
          <option label="10개씩 보기" :value="10">10개씩 보기</option>
          <option label="25개씩 보기" :value="25">25개씩 보기</option>
          <option label="50개씩 보기" :value="50">50개씩 보기</option>
          <option label="100개씩 보기" :value="100">100개씩 보기</option>
        </select>
        <span data-toggle="tooltip" data-placement="top" title data-original-title="연구과제 등록">
          <button class="btn-primary-sm" type="button" ng-click="onClickCreateLink()">
            <i class="xi-file-add"></i>
            <span class="sr-only">등록</span>
          </button>
        </span>
      </div>
    </div>

    <div v-for="(result, index) in resultList.data.list" class="data-card" :key="`result-${index}`">
      <div class="card-header">
        <div class="block-group">
          <div class="block">
            <div class="custom-checkbox" style="width: 270px">
              <input
                type="checkbox"
                name="chkPrj"
                class="custom-control-input"
                aria-invalid="false"
              />
              <label class="custom-control-label" for="chkPrj2">
                <i class="xi-receipt"></i>
                {{ result.accession }}
              </label>
            </div>
          </div>
          <div class="block" style="width: 800px; margin-left: 55px">
            <a
              role="button"
              class="link-text ng-binding"
              @click="onClickDetailLink(result)"
              title="상세보기"
            >
              {{ result.program }}
              <i class="xi-angle-right"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="card-body">
        <table class="view-table">
          <caption class="sr-only">상세정보</caption>
          <tbody>
            <tr>
              <th scope="row">단위사업</th>
              <td>{{ result.unitProgram }}</td>
              <th scope="row">KEITI 고유번호</th>
              <td>{{ result.uniqueNo }}</td>
            </tr>
            <tr>
              <th scope="row">과제명</th>
              <td colspan="3">{{ result.name }}</td>
            </tr>
            <tr>
              <th scope="row">중분야</th>
              <td>{{ result.middleRealm }}</td>
              <th scope="row">연구상태</th>
              <td>{{ result.projectStatus.name }}</td>
            </tr>
            <tr>
              <th scope="row">주관기관</th>
              <td>{{ result.institute }}</td>
              <th scope="row">주관책임자</th>
              <td>{{ result.charger }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-show="resultList.data.list.length !== 0" class="text-center"></div>
    <div></div>

    <div v-show="resultList.data.list.length === 0" class="data-card" aria-hidden="true" style>
      <div class="card-body text-center">검색 결과가 없습니다</div>
    </div>

    <Pagination
      @changePageNo="changePageNo"
      :currentPageNo="resultList.data.currentPage"
      :totalRecordCount="resultList.data.total"
      :pageUnit="resultList.data.numberOfRows"
    ></Pagination>
  </div>
</template>

<script>
import searchBox from "../../components/SearchBox";
import axios from "../../utils/axios";

export default {
  name: "ProjectList",
  components: {
    searchBox
  },
  data() {
    return {
      currentPageNo: 1,
      filter: {
        keyword: ""
      },
      resultList: {
        data: {
          total: 0,
          currentPage: 1,
          numberOfRows: 10,
          list: []
        }
      },
      filters: {
        fields: [
          { id: "", name: "전체" },
          { id: "projectNo", name: "일련번호" },
          { id: "projectName", name: "과제명" },
          { id: "uniqueNo", name: "KEITI 고유번호" },
          { id: "program", name: "사업명" },
          { id: "unitProgram", name: "단위사업명" },
          { id: "middleRealm", name: "과제중분류" },
          { id: "status", name: "연구상태" },
          { id: "institute", name: "주관기관" },
          { id: "charger", name: "주관책임자" },
          { id: "participants", name: "참여기업" },
          { id: "purpose", name: "연구개발 목표" },
          { id: "contents", name: "연구개발 내용" },
          { id: "objective", name: "최종목표" },
          { id: "conclusion", name: "연구내용" },
          { id: "features", name: "개발기술 특징" },
          { id: "expectation", name: "기대효과" },
          { id: "appliedTo", name: "적용분야" },
          { id: "keywords", name: "키워드" }
        ]
      }
    };
  },
  started() {},
  mounted() {
    // this.currentPageNo = 1;
    // this.totalRecordCount = 228;
  },
  methods: {
    //Pagination 컴포넌트의 change emit
    changePageNo(pageNo) {
      this.currentPageNo = pageNo;
    },

    setKeywork(data) {
      console.log("keyworddata", data);
    },
    async selectList() {
      let url = "/isg-oreo/api/projects";
      let params = {};
      params["rowSize"] = this.resultList.data.numberOfRows;
      params["firstIndex"] =
        (this.currentPageNo - 1) * this.resultList.data.numberOfRows;
      console.log("params11", params);
      this.resultList = await axios.get(url, { params: params });
      console.log("this.resultList", this.resultList);
    },
    onClickDetailLink(project) {
      this.$router.push({ path: "/project/projects-detail/" + project.id });
    }
  }
};
</script>
