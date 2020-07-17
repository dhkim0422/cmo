<template>
  <div class="container">
    <!-- 검색폼 -->
    <search-box :filters="filters" @searchClick="selectList"></search-box>

    <!-- 검색 목록 -->
    <div class="filter-group">
      <div class="group-item">
        <div class="info">
          전체
          <span class="num">{{ this.response.data.total }}</span
          >개, 페이지
          <span class="num">{{ this.response.data.currentPage }}</span> /
          <span class="num">{{ this.response.data.numberOfRows }}</span>
        </div>
      </div>
      <div class="group-item">
        <button
          class="btn-outline-secondary-sm"
          type="button"
          @click="onDelete"
        >
          <i class="xi-trash"></i>
          <span class="sr-only">삭제</span>
        </button>
        <select
          @change="selectList"
          v-model="response.data.numberOfRows"
          class="length"
          aria-invalid="false"
        >
          <option label="10개씩 보기" value="10">10개씩 보기</option>
          <option label="25개씩 보기" value="25">25개씩 보기</option>
          <option label="50개씩 보기" value="50">50개씩 보기</option>
          <option label="100개씩 보기" value="100">100개씩 보기</option>
        </select>
        <span title="저장고 등록">
          <button class="btn-primary-sm" type="button" @click="onAdd">
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
          <th>랙(X축)</th>
          <th>섹터(Y축)</th>
          <th>박스(Z축)</th>
          <th>튜브크기</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="response.data.list.length == 0">
          <td colspan="8" class="text-center">데이터가 없습니다.</td>
        </tr>
        <tr
          v-else
          v-for="(item, index) in response.data.list"
          :key="`result${index}`"
        >
          <td class="custom-checkbox" style="min-width: 65px;">
            <input
              type="checkbox"
              :id="`chkBody${index}`"
              :value="item.no"
              v-model="checkedValues"
              class="custom-control-input"
            />
            <label class="custom-control-label" :for="`chkBody${index}`">
              <span class="sr-only">선택</span>
            </label>
          </td>
          <td>
            <a class="link-more" @click="onDetail(item)">
              {{ item.no }}
            </a>
          </td>
          <td class="text-left">
            <a class="link-more" @click="onPosition(item)">
              {{ item.type | type }}
            </a>
          </td>
          <td class="text-left">{{ item.name }}</td>
          <td>{{ item.rack }}</td>
          <td>{{ item.sector }}</td>
          <td>{{ item.box }}</td>
          <td>{{ item.tube == "9" ? "9 X 9" : "5 X 5" }}</td>
        </tr>
      </tbody>
    </table>
    <b-pagination v-model="resultList.data.currentPage"
                  :per-page="resultList.data.numberOfRows"
                  :total-rows="resultList.data.total"
                  size="sm"
                  align="center"
                  @change="changePageNo"
    />

  </div>
</template>

<script>
import searchBox from "../../components/SearchBox";
import axios from "../../utils/axios";

export default {
  name: "StorageList",
  components: {
    searchBox,
  },
  data() {
    return {
      currentPageNo: 1,
      checkedValues: [],
      response: {
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
          { id: "name", name: "저장고명" },
        ],
        params: {},
      },
    };
  },
  filters: {
    type(value) {
      if (!value) return "";
      return value === "100" ? "질소탱크" : "초저온냉동고";
    },
  },
  created() {
    this.selectList({});
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

      params["currentPage"] = this.currentPageNo;
      params["rowSize"] = this.response.data.numberOfRows;
      params["firstIndex"] =
        (this.currentPageNo - 1) * this.response.data.numberOfRows;

      this.response = await axios.get(url, { params });
    },
    onPosition(item) {
      this.$router.push({ path: `/storage/storagePosition/${item.no}` });
    },
    async onDelete() {
      if (this.checkedValues.length > 0) {
        for (const item of this.checkedValues) {
          await axios.delete(`/isg-oreo/api/storages/${item}`);
        }
        this.currentPageNo = 1;
        await this.selectList({});
      }
    },
    onAdd() {
      this.$router.push({ path: `/storage/storageDetail` });
    },
    onDetail(item) {
      this.$router.push({ path: `/storage/storageDetail/${item.no}` });
    },
  },
};
</script>
