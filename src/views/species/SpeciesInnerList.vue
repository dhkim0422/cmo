<template>
  <div class="">
    <div class="filter-group">
      <div class="group-item">
        <total-record-count :result-list="resultList"/>
      </div>
      <div class="group-item">
        <input class="search-input" type="text" placeholder="검색어"
               v-model="params.keyword" @keydown.enter="selectList"/>
        <button class="search-btn" @click="this.selectList">
          <span class="sr-only">조회</span>
          <i class="xi-search"/>
        </button>

        <!-- 로우수를 넘겨주며 기본값을 10으로 설정 -->
        <page-unit :page-unit="resultList.data.numberOfRows"
                   @onChangePageUnit="this.onChangePageUnit"></page-unit>

      </div>
    </div>
    <b-table
        ref="selectableTable"
        selectable
        select-mode="single"
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
      <template v-slot:cell(speciesNm)="data">
        <div>(국문){{ data.item && data.item.speciesNmKr }}</div>
        <div>(영문){{ data.item && data.item.speciesNmEn }}</div>
      </template>
      <template v-slot:cell(kindNm)="data">
        <div>(국문){{ data.item && data.item.kindNmKr }}</div>
        <div>(영문){{ data.item && data.item.kindNmEn }}</div>
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
  name: "SpeciesInnerList",
  mounted() {
    //this.selectList();
  },
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
        {key: 'speciesNmKr', label: '종명(국문)'},
        {key: 'speciesNmEn', label: '종명(영문)'},
        {key: 'kindNmKr', label: '품종명(국문)'},
        {key: 'kindNmEn', label: '품종명(영문)'},



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
        },
      },
      filter: {
        fields: [
          {id: "", name: "전체"},
          {id: "speciesId", name: "종관리 번호"},
          {id: "speciesNm", name: "종명"},
          {id: "kindNm", name: "품종명"},
          {id: "regist", name: "사용자"},
        ]
      },
      params: {
        keyword:''
      },
    };
  },
  methods: {
    onChangePageUnit(unit) {
      this.resultList.data.numberOfRows = unit
      this.selectList()
    },
    onRowSelected(items) {
      this.selected = items
      console.log('item',items)
      this.$emit("speciesSelected",items[0])
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
      console.log("111111111")
      let url = "/isg-oreo/api/speciesList";
      const params = new URLSearchParams();
      if (this.params.keyword != '') {
        for (const row of this.filter.fields) {
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
  },
};
</script>
