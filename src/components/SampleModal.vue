<template>
  <b-modal id="sample-modal" size="xl" title="샘플">
    <b-container>
      <search-box :filters="filters" @searchClick="selectList"></search-box>
      <!-- 검색 목록 -->
      <div class="filter-group">
        <div class="group-item">
          <div class="info">
            전체 <span class="num">{{ this.resultList.data.total }}</span
            >개, 페이지
            <span class="num">{{ this.resultList.data.currentPage }}</span> /
            <span class="num">{{ this.resultList.data.numberOfRows }}</span>
          </div>
        </div>
        <div class="group-item">
          <select
            @change="selectList"
            v-model="resultList.data.numberOfRows"
            class="length"
            aria-invalid="false"
          >
            <option label="10개씩 보기" :value="10">10개씩 보기</option>
            <option label="25개씩 보기" :value="25">25개씩 보기</option>
            <option label="50개씩 보기" :value="50">50개씩 보기</option>
            <option label="100개씩 보기" :value="100">100개씩 보기</option>
          </select>
          <span
            data-toggle="tooltip"
            data-placement="top"
            title="연구대상자 등록"
          >
          </span>
        </div>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>등록번호</th>
            <th>연구대상자_등록번호</th>
            <th>성별</th>
            <th>샘플_고유번호</th>
            <th>샘플유래</th>
            <th>샘플명</th>
            <th>샘플구분</th>
            <th>질환명</th>
          </tr>
        </thead>
        <tbody>
          <tr v-show="resultList.data.list.length == 0">
            <td colspan="8" class="text-center">데이터가 없습니다.</td>
          </tr>
          <tr v-for="(item, index) in resultList.data.list" :key="index">
            <td>
              <a class="link-more" @click="onAccession(item)">{{
                item.accession
              }}</a>
            </td>
            <td>{{ item.target.accession }}</td>
            <td>{{ item.target.genderName }}</td>
            <td>{{ item.uniqueNo }}</td>
            <td>{{ item.origin.name }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.type.name }}</td>
            <td>{{ item.disease }}</td>
          </tr>
        </tbody>
      </table>
      <Pagination
        @changePageNo="changePageNo"
        :currentPageNo="currentPageNo"
        :totalRecordCount="resultList.data.total"
        :pageUnit="resultList.data.numberOfRows"
      ></Pagination>
    </b-container>
    <template v-slot:modal-footer>
      <b-button
        variant="secondary"
        class="float-right"
        @click="$bvModal.hide('sample-modal')"
      >
        닫기
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import axios from "@/utils/axios";

export default {
  name: "SampleModal",
  data() {
    return {
      params: {},
      currentPageNo: 1,
      resultList: {
        data: {
          total: 0,
          currentPage: 0,
          numberOfRows: 10,
          currentPageNo: 0,
          pageSize: 10,
          list: [],
          target: {},
          origin: {},
          collectLocal: {},
          type: {},
        },
      },
      filters: {
        //해당 내역을 서치박스의 셀렉트 리스트가 생성됩니다.
        fields: [
          { id: "", name: "전체" },
          { id: "sampleNo", name: "등록번호" },
          { id: "uniqueNo", name: "고유번호" },
          { id: "sampleName", name: "샘플명" },
          { id: "target", name: "연구대상자" },
          { id: "disease", name: "질환명" },
        ],
        params: {},
      },
    };
  },
  created() {},
  computed: {},
  methods: {
    changePageNo(pageNo) {
      this.currentPageNo = pageNo;
      this.selectList({});
    },
    async selectList(param) {
      let url = "/isg-oreo/api/clinic-samples";
      let params = param;

      params["rowSize"] = this.resultList.data.numberOfRows;
      params["firstIndex"] =
        (this.currentPageNo - 1) * this.resultList.data.numberOfRows;

      this.resultList = await axios.get(url, { params: params });
    },
    onAccession(item) {
      this.$emit("sample", item);
      this.$bvModal.hide("sample-modal");
    },
  },
};
</script>
