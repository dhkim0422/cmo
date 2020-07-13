<template>
  <div class="container">
    <!-- 검색폼 -->
    <search-box :filters="filters" @searchClick="selectList"></search-box>

    <!-- 검색 목록 -->
    <div class="filter-group">
      <div class="group-item">
        <div class="info">
          전체
          <span class="num">{{ this.resultList.data.total }}</span>개, 페이지
          <span class="num">{{ this.resultList.data.currentPage }}</span> /
          <span class="num">{{ this.resultList.data.numberOfRows }}</span>
        </div>
      </div>
      <div class="group-item">
        <button class="btn-outline-secondary-sm" type="button">
          <i class="xi-trash"></i>
          <span class="sr-only">삭제</span>
        </button>
        <select
          @change="selectList"
          v-model="resultList.data.numberOfRows"
          class="length"
          aria-invalid="false"
        >
          <option label="10개씩 보기" value="10">10개씩 보기</option>
          <option label="25개씩 보기" value="25">25개씩 보기</option>
          <option label="50개씩 보기" value="50">50개씩 보기</option>
          <option label="100개씩 보기" value="100">100개씩 보기</option>
        </select>
        <span data-toggle="tooltip" data-placement="top" title="연구대상자 등록">
          <button class="btn-primary-sm" type="button" ng-click="onClickCreateLink()">
            <i class="xi-file-add"></i>
            <span class="sr-only">등록</span>
          </button>
        </span>
      </div>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th class="custom-checkbox">
            <input type="checkbox" id="chkHead" class="custom-control-input" />
            <label class="custom-control-label" for="chkHead">
              <span class="sr-only">선택</span>
            </label>
          </th>
          <th>번호</th>
          <th>저장고구분</th>
          <th>저장고명</th>
          <th>랙</th>
          <th>섹터</th>
          <th>박스</th>
          <th>튜브크기</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="resultList.data.list.length == 0">
          <td colspan="8" class="text-center">데이터가 없습니다.</td>
        </tr>
        <tr v-else v-for="(item, index) in resultList.data.list" :key="`result${index}`">
          <td class="custom-checkbox" style="min-width: 65px;">
            <input type="checkbox" :id="`chkBody${index}`" class="custom-control-input" />
            <label class="custom-control-label" :for="`chkBody${index}`">
              <span class="sr-only">선택</span>
            </label>
          </td>
          <td>
            <a class="link-more" @click="onClickDetailLink(item)">
              {{
              item.accession
              }}
            </a>
          </td>
          <td>{{ item.target.accession }}</td>
          <td>{{ item.target.genderName }}</td>
          <td>{{ item.uniqueNo }}</td>
          <td>{{ item.origin.name }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.type.name }}</td>
        </tr>
      </tbody>
    </table>
    <Pagination
      @changePageNo="changePageNo"
      :currentPageNo="currentPageNo"
      :totalRecordCount="resultList.data.total"
      :pageUnit="resultList.data.numberOfRows"
    ></Pagination>
  </div>
</template>

<script>
import searchBox from "../../components/SearchBox";
import axios from "../../utils/axios";

export default {
  name: "StorageList",
  components: {
    searchBox
  },
  data() {
    return {
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
          type: {}
        }
      },
      filters: {
        //해당 내역을 서치박스의 셀렉트 리스트가 생성됩니다.
        fields: [
          { id: "", name: "전체" },
          { id: "name", name: "저장고명" }
        ],
        params: {}
      }
    };
  },
  methods: {
    //Pagination 컴포넌트의 change emit
    changePageNo(pageNo) {
      this.currentPageNo = pageNo;
      this.selectList({});
    },
    async selectList(param) {
      let url = "/isg-oreo/api/storages";
      let params = param;

      params["rowSize"] = this.resultList.data.numberOfRows;
      params["firstIndex"] =
        (this.currentPageNo - 1) * this.resultList.data.numberOfRows;

      this.resultList = await axios.get(url, { params: params });
    },
    onClickDetailLink(target) {
      this.$router.push({ path: "/samples/SamplesDetail/" + target.id });
    }
  }
};
</script>
