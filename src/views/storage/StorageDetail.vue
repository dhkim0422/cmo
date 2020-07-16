<template>
  <div class="container" id="content">
    <div class="filter-group" style="margin-bottom: 0px;">
      <div class="group-item">
        <h2 class="h2">저장고 일반정보</h2>
      </div>
    </div>

    <table class="view-table">
      <caption class="sr-only">
        저장고 일반정보
      </caption>
      <tbody>
        <tr>
          <th class="form-group required control-label">
            <label class="ng-binding">구분</label>
          </th>
          <td>
            <select v-if="editable" class="form-control" v-model="model.type">
              <option
                v-for="(codeType, index) in codeTypeList"
                :value="codeType.value"
                :key="`codeType${index}`"
                >{{ codeType.text }}</option
              >
            </select>
            <template v-else>{{
              model.type === "100" ? "질소탱크" : "초저온냉동고"
            }}</template>
          </td>
        </tr>
        <tr>
          <th class="form-group required control-label">
            <label class="ng-binding">저장고명</label>
          </th>
          <td>
            <input
              type="text"
              class="form-control"
              placeholder="작성하여 주세요."
              title="냉동고명"
              v-model="model.name"
              v-if="editable"
            />
            <template v-else>{{ model.name }}</template>
          </td>
        </tr>
        <tr>
          <th class="form-group control-label">
            <label class="ng-binding">냉동고위치</label>
          </th>
          <td>
            <input
              type="text"
              class="form-control"
              placeholder="작성하여 주세요."
              title="냉동고위치"
              v-model="model.place"
              v-if="editable"
            />
            <template v-else>{{ model.place }}</template>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="filter-group" style="margin-bottom: 0px;">
      <div class="group-item">
        <h2 class="h2">저장고 정보</h2>
      </div>
    </div>

    <table class="view-table">
      <caption class="sr-only">
        저장고 정보
      </caption>
      <tbody>
        <tr>
          <th class="form-group required control-label">
            <label class="ng-binding">랙(X축)</label>
          </th>
          <td>
            <input
              type="text"
              class="form-control"
              placeholder="작성하여 주세요."
              title="랙(X축)"
              v-model="model.rack"
              v-if="editable"
            />
            <template v-else>{{ model.rack }}</template>
          </td>
          <th class="form-group required control-label">
            <label class="ng-binding">섹터(Y축)</label>
          </th>
          <td>
            <input
              type="text"
              class="form-control"
              placeholder="작성하여 주세요."
              title="섹터(Y축)"
              v-model="model.sector"
              v-if="editable"
            />
            <template v-else>{{ model.sector }}</template>
          </td>
        </tr>
        <tr>
          <th class="form-group required control-label">
            <label class="ng-binding">박스(Z축)</label>
          </th>
          <td>
            <input
              type="text"
              class="form-control"
              placeholder="작성하여 주세요."
              title="박스(Z축)"
              v-model="model.box"
              v-if="editable"
            />
            <template v-else>{{ model.box }}</template>
          </td>
          <th class="form-group required control-label">
            <label class="ng-binding">박스 타입 (n X n)</label>
          </th>
          <td>
            <select v-if="editable" class="form-control" v-model="model.tube">
              <option value="9">9 X 9</option>
              <option value="5">5 X 5</option>
            </select>
            <template v-else>{{
              model.tube == "9" ? "9 X 9" : "5 X 5"
            }}</template>
          </td>
        </tr>
      </tbody>
    </table>
    <button
      type="button"
      class="btn-outline-secondary"
      @click="$router.push({ name: 'storageList' })"
    >
      목록
    </button>
    <button
      v-if="!editable"
      type="button"
      class="btn-primary"
      @click="onUpdate"
    >
      수정
    </button>
    <button v-else type="button" class="btn-primary" @click="submit">
      저장
    </button>
  </div>
</template>
<script>
import axios from "../../utils/axios";

export default {
  name: "StorageDetail",

  data() {
    return {
      editable: false,
      codeTypeList: [
        { value: "100", text: "질소탱크" },
        { value: "200", text: "초저온냉동고" },
      ],
      model: {},
    };
  },
  async created() {
    this.editable = this.$route.params.id ? false : true;
    if (this.$route.params.id) await this.initData();
  },
  methods: {
    async initData() {
      const response = await axios.get(
        `/isg-oreo/api/storages/${this.$route.params.id}`
      );
      this.model = response.data;
    },
    async submit() {
      const response = await axios.post("/isg-oreo/api/storages", {
        ...this.model,
        no: this.$route.params.id,
      });
    },

    onUpdate() {
      this.editable = true;
    },
  },
};
</script>
<style scoped>
select,
input {
  box-shadow: 0px 0px 0px 0px;
}
</style>
