<template>
  <div class="container">
    <page-head-info :root-menu-nm="'내정보'" :menu-nm="'과제목록'" />
    <!-- 검색폼 -->

    <search-box :filters="filters" @searchClick="changeParams"></search-box>
    <!-- 검색 목록 -->
    <div class="filter-group">
      <div class="group-item">
        <div>

          <b-form-checkbox
              v-model="allSelected"
              :indeterminate="indeterminate"
              @change="toggleAll"
          >
            <label for="chkPrjAll">
              <span class="sr-only">전체선택</span>
            </label>
          </b-form-checkbox>

        </div>
        <total-record-count :result-list="resultList"/>
      </div>
      <div class="group-item">
        <b-button class="btn-primary-sm"
                  title="삭제"
                  :disabled="selected.length == 0 "
                  @click="remove()">
          <i class="xi-trash"></i><span class="sr-only">삭제</span>
        </b-button>
        <span data-toggle="tooltip" data-placement="top" title="객체 등록">
                    <!--등록은 id=registPopup 로연결되어 있음 -->
                    <b-button class="btn-primary-sm" v-b-modal.projectPopup variant="primary">
                        <i class="xi-file-add"></i><span class="sr-only">등록</span>
                    </b-button>
          <!--등록을 위한 페잊 컴포넌트-->
                    <project-regist @saveOK="selectList"/>


                </span>

        <page-unit :page-unit="resultList.data.numberOfRows" @onChangePageUnit="onChangePageUnit"></page-unit>
      </div>
    </div>

    <b-form-checkbox-group id="checkbox-group" v-model="selected" name="itemId">
      <div
          v-for="(result, index) in resultList.data.list"
          class="data-card"
          :key="`result-${index}`"
      >
        <div class="card-header">
          <div class="block-group">
            <div class="block">
              <div style="width: 270px">

                <b-form-checkbox :value="result" size="lg">
                  <i class="xi-receipt"></i>
                  {{ result.accession }}
                </b-form-checkbox>

              </div>
            </div>
            <div class="block" style="width: 800px; margin-left: 55px">
              <a
                  role="button"
                  class="link-text ng-binding"
                  @click="onClickDetailLink(result)"
                  title="상세보기"
              >
                {{ result.name }}
                <i class="xi-angle-right"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="card-body">
          <table class="view-table">
            <caption class="sr-only">
              상세정보
            </caption>
            <tbody>
            <tr>
              <th scope="row">ATIS 고유번호</th>
              <td>{{ result.uniqueNo }}</td>

              <!--<th scope="row">연구상태</th>
              <td>{{ result.projectStatus == undefined ? "상태값 이상" : result.projectStatus.name }}</td>-->
            </tr>
            <tr>
              <th scope="row">대분야</th>
              <td>{{ result.unitProgram | projectType }}</td>
              <th scope="row">중분야</th>
              <td>{{ result.middleRealm | projectType}}</td>
            </tr>
            <!--<tr>
              <th scope="row">과제명</th>
              <td colspan="3">{{ result.program }}</td>
            </tr>-->
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

      <div
          v-show="resultList.data.list.length === 0"
          class="data-card"
          aria-hidden="true"
          style
      >
        <div class="card-body text-center">검색 결과가 없습니다</div>
      </div>

      <b-pagination v-model="resultList.data.currentPage"
                    :per-page="resultList.data.numberOfRows"
                    :total-rows="resultList.data.total"
                    size="sm"
                    align="center"
                    @change="changePageNo"
      />
    </b-form-checkbox-group>
  </div>
</template>

<script>
import axios from "../../utils/axios";
import ProjectRegist from "./ProjectMerge";
import PageUnit from "../../components/PageUnit";
import PageHeadInfo from "@/components/PageHeadInfo";

export default {
  name: "ProjectList",
  components: {PageHeadInfo, PageUnit, ProjectRegist},
  watch: {
    selected(newVal, oldVal) {
      // Handle changes in individual flavour checkboxes
      if (newVal.length === 0) {
        this.indeterminate = false
        this.allSelected = false
      } else if (newVal.length === this.resultList.data.list.length) {
        this.indeterminate = false
        this.allSelected = true
      } else {
        this.indeterminate = true
        this.allSelected = false
      }
    }
  },
  data() {
    return {
      selected: [],
      allSelected: false,
      indeterminate: false,
      isRegist: false,
      currentPageNo: 1,
      filter: {
        keyword: "",
      },
      resultList: {
        data: {
          total: 0,
          currentPage: 1,
          numberOfRows: 10,
          list: [],
        },
      },
      filters: {
        fields: [
          {id: "", name: "전체"},
          {id: "projectNo", name: "일련번호"},
          {id: "projectName", name: "과제명"},
          {id: "uniqueNo", name: "ATIS 고유번호"},
          {id: "program", name: "사업명"},
          {id: "unitProgram", name: "대분야"},
          {id: "middleRealm", name: "과제중분류"},
          {id: "status", name: "연구상태"},
          {id: "institute", name: "주관기관"},
          {id: "charger", name: "주관책임자"},
          {id: "participants", name: "참여기업"},
          {id: "purpose", name: "연구개발 목표"},
          {id: "contents", name: "연구개발 내용"},
          {id: "objective", name: "최종목표"},
          {id: "conclusion", name: "연구내용"},
          {id: "features", name: "개발기술 특징"},
          {id: "expectation", name: "기대효과"},
          {id: "appliedTo", name: "적용분야"},
          {id: "keywords", name: "키워드"},
        ],
        params: {},
      },
    };
  },
  methods: {
    onChangePageUnit(pageUnit) {
      this.resultList.data.numberOfRows = pageUnit
      this.selectList()
    },
    toggleAll(checked) {
      this.selected = checked ? this.resultList.data.list.slice() : []
    },
    //Pagination 컴포넌트의 change emit
    changePageNo(pageNo) {
      this.currentPageNo = pageNo;
      this.selectList();
    },
    changeParams(params) {
      this.params = params;
      this.selectList();
    },
    async selectList(page = 1) {
      this.isRegist = false
      let url = "/isg-oreo/api/projects";
      const params = new URLSearchParams();
      if (this.params.keyword != '') {
        for (const row of this.params.fields) {
          if (row.id !== '') params.append('fields', row.id)
        }
        params.append('keyword', this.params.keyword)
      }
      params.append('ownerId', 7)
      params.append('firstIndex', (this.resultList.data.currentPage - 1) * this.resultList.data.numberOfRows)
      params.append('rowSize', this.resultList.data.numberOfRows)
      params.append('currentPage', page)
      this.resultList = await axios.get(url, {params: params});

    },
    onClickDetailLink(project) {
      this.$router.push({path: "/project/projectsDetail/" + project.id});
    },
    onClickCreateLink() {
      this.isRegist = true
    },
    async remove() {

      await this.$confirm('삭제된 데이터는 복구가 불가 합니다.', '삭제 하시겠습니까?', 'question')

      const removeData = await axios.put('/isg-oreo/api/projects?action=REMOVE', this.selected);
      if (removeData.data.errorList.total == 0) {
        this.$alert(
            removeData.data.successList.total + '건 삭제\n'
            , '요청이 완료 되었습니다.', 'info')
      } else {
        this.$alert(
            removeData.data.successList.total + '건 삭제\n' +
            removeData.data.errorList.total + '건 에러\n'

            , '요청이 완료 되었습니다.', 'info')
      }
      this.selected = []
      this.selectList()
    }

  },
};
</script>
