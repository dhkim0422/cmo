<template>
  <div class="container">
    <page-head-info :root-menu-nm="'내정보'" :menu-nm="'종관리 목록'"/>
    <!-- 검색폼 -->

    <search-box :filters="filter" @searchClick="changeParams"></search-box>
    <!-- 검색 목록 -->
    <div class="filter-group">
      <div class="group-item">
        <total-record-count :result-list="resultList"/>
      </div>
      <div class="group-item">
        <b-button lass="btn-outline-secondary-sm" title="삭제" @click="remove">
          <i class="xi-trash"></i><span class="sr-only">삭제</span>
        </b-button>
        <!-- 로우수를 넘겨주며 기본값을 10으로 설정 -->
        <page-unit :page-unit="resultList.data.numberOfRows"
                   @onChangePageUnit="onChangePageUnit"></page-unit>
        <span data-toggle="tooltip" data-placement="top" title="연구샘플_등록">
                    <!--등록은 id=registPopup 로연결되어 있음 -->
                    <b-button class="btn-primary-sm" v-b-modal.SpeciesMerge variant="primary"
                              @click="onClickCreateLink">
                        <i class="xi-file-add"></i><span class="sr-only">등록</span>
                    </b-button>
          <!--등록을 위한 페잊 컴포넌트-->
                <div>
                  <species-merge @saveOK="selectList"/>
                </div>
        </span>
      </div>
    </div>

    <b-table
        ref="selectableTable"
        selectable
        select-mode="multi"
        class="data-table"
        :items="items"
        :fields="fields"
        :busy="this.items.length == 0"
        @row-selected="onRowSelected"

    >
      <template v-slot:table-busy>
        <div class="text-center  my-2">
          <!--<b-spinner class="align-middle"></b-spinner>-->
          검색된 항목이 없습니다.
        </div>
      </template>
      <template v-slot:cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&check;</span>
          <span class="sr-only">Selected</span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Not selected</span>
        </template>
      </template>
      <template v-slot:cell(id)="data">
        <a :href="'species/' + data.item.id">{{ data.value }}</a>
      </template>
      <template v-slot:cell(scientificNm)="data">
        <a :href="'species/' + data.item.id">{{ data.value }}</a>
      </template>
      <template v-slot:cell(speciesNm)="data">
        <div>(국문){{data.item.speciesNmKr}}</div>
        <div>(영문){{data.item.speciesNmEn}}</div>
      </template>
      <template v-slot:cell(kindNm)="data">
        <div>(국문){{data.item.kindNmKr}}</div>
        <div>(영문){{data.item.kindNmEn}}</div>
      </template>

    </b-table>

    <b-pagination v-model="resultList.data.currentPage" :per-page="resultList.data.numberOfRows"
                  :total-rows="resultList.data.total"
                  size="sm"
                  align="center"
                  @change="changePageNo"
    />
  </div>
</template>

<script>

import axios from "../../utils/axios";
import SpeciesMerge from "@/views/species/SpeciesMerge";


export default {
  name: "GenogramList",
  components: {SpeciesMerge},
  data() {
    return {
      isRegist: false,
      fields: [
        {
          key: 'selected',
          label: '선택'
        },
        {key: 'id', label: '종 번호'},
        {key: 'scientificNm', label: '학명'},
        {key: 'speciesNm', label: '종명'},
        {key: 'kindNm', label: '품종명'},


      ],
      items: [],
      selected: '',
      resultList: {
        data: {
          total: 0,
          currentPage: 1,
          numberOfRows: 10,

          pageSize: 10,
          list: [],
          target: {},
          origin: {},
          collectLocal: {},
          type: {},
        },
      },
      filter: {
        fields: [
          {id: "", name: "전체"},
          {id: "speciesId", name: "종관리 번호"},
          {id: "speciesNm", name: "종명"},
          {id: "kndNm", name: "품종명"},
          {id: "regist", name: "사용자"},
        ]
      },
      params: {},
    };
  },
  methods: {
    onChangePageUnit(unit) {
      this.resultList.data.numberOfRows = unit
      this.selectList()
    },
    onRowSelected(items) {
      this.selected = items
    },
    //Pagination 컴포넌트의 change emit
    changePageNo(pageNo) {
      this.currentPage = pageNo;
      this.selectList(pageNo);
    },
    changeParams(params) {
      this.params = params;
      console.log('??', params)
      this.selectList()
    },
    async selectList(page = 1) {
      this.isRegist = false
      let url = "/isg-oreo/api/speciesList";
      const params = new URLSearchParams();
      if (this.params.keyword != '') {
        for (const row of this.params.fields) {
          if (row.id !== '') params.append('fields', row.id)
        }
        params.append('keyword', this.params.keyword)
      }
      params.append('firstIndex', (this.resultList.data.currentPage - 1) * this.resultList.data.numberOfRows)
      params.append('rowSize', this.resultList.data.numberOfRows)
      params.append('currentPage', page)
      this.resultList = await axios.get(url, {params: params});
      this.items = this.resultList.data.list
    },
    onClickDetailLink(target) {
      this.$router.push({path: "/samples/SamplesDetail/" + target.id});
    },
    onClickCreateLink() {
      this.isRegist = true
    },
    async remove() {
      if (this.selected.length == 0) {
        this.$alert('', "선태된 내역이 없습니다.", 'error');
        return;
      }

      await this.$confirm('', "선태된 삭제 하시겠습니까?", 'error');
      let url = '/isg-oreo/api/species'
      let response = await axios.put(url, this.selected);

      let msg = "";
      if (response.data.errorList.total != 0) {
        this.$alert('다시 시도해 주세요.', '문제가 발생했습니다.', 'error');
        return
      }
      if (response.data.failList.total != 0) {

        let aceession = new Array()
        for (const row of response.data.failList.list) {
          aceession.push(row.accession)
        }
        this.$alert(aceession, '이미 참조된 내역이 있습니다.', 'info');
      } else {
        this.$alert('', response.data.successList.total + '건 삭제 처리 되었습니다', 'info');
      }

      this.selectList()
    },

  },
};
</script>
