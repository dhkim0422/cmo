<template>
  <div class="container" id="content">
    <page-head-info :root-menu-nm="'저장고'" :menu-nm="'저장고 등록'"/>
    <br>
    <div class="filter-group" style="margin-bottom: 0px;">
      <div class="group-item">
        <h2 class="h2">저장고 일반정보</h2>
      </div>
    </div>

    <validation-observer ref="observer" v-slot="{ handleSubmit }">
      <table class="view-table">
        <caption class="sr-only">저장고 일반정보</caption>
        <tbody>
          <tr>
            <th class="form-group required control-label">
              <label class="ng-binding">구분</label>
            </th>
            <td>
              <validation-provider
                name="구분"
                :rules="{ required: true }"
                v-slot="validationContext"
                v-if="editable"
              >
                <b-form-select
                  v-model="model.type"
                  :options="codeTypeList"
                  :state="getValidationState(validationContext)"
                ></b-form-select>

                <b-form-invalid-feedback>
                  {{
                  validationContext.errors[0]
                  }}
                </b-form-invalid-feedback>
              </validation-provider>

              <template v-else>
                {{
                model.type === "100" ? "질소탱크" : "초저온냉동고"
                }}
              </template>
            </td>
          </tr>
          <tr>
            <th class="form-group required control-label">
              <label class="ng-binding">저장고명</label>
            </th>
            <td>
              <validation-provider
                name="저장고명"
                :rules="{ required: true }"
                v-slot="validationContext"
                v-if="editable"
              >
                <b-form-input
                  v-model="model.name"
                  placeholder="작성하여 주세요."
                  :state="getValidationState(validationContext)"
                ></b-form-input>

                <b-form-invalid-feedback>
                  {{
                  validationContext.errors[0]
                  }}
                </b-form-invalid-feedback>
              </validation-provider>

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
        <caption class="sr-only">저장고 정보</caption>
        <tbody>
          <tr>
            <th class="form-group required control-label">
              <label class="ng-binding">랙(X축)</label>
            </th>
            <td>
              <validation-provider
                name="랙(X축)"
                :rules="{ required: true, max: 1, integer: true }"
                v-slot="validationContext"
                v-if="editable"
              >
                <b-form-input
                  v-model="model.rack"
                  placeholder="작성하여 주세요."
                  :state="getValidationState(validationContext)"
                ></b-form-input>

                <b-form-invalid-feedback>
                  {{
                  validationContext.errors[0]
                  }}
                </b-form-invalid-feedback>
              </validation-provider>
              <template v-else>{{ model.rack }}</template>
            </td>
            <th class="form-group required control-label">
              <label class="ng-binding">섹터(Y축)</label>
            </th>
            <td>
              <validation-provider
                name="섹터(Y축)"
                :rules="{ required: true, max: 2, integer: true }"
                v-slot="validationContext"
                v-if="editable"
              >
                <b-form-input
                  v-model="model.sector"
                  placeholder="작성하여 주세요."
                  :state="getValidationState(validationContext)"
                ></b-form-input>

                <b-form-invalid-feedback>
                  {{
                  validationContext.errors[0]
                  }}
                </b-form-invalid-feedback>
              </validation-provider>
              <template v-else>{{ model.sector }}</template>
            </td>
          </tr>
          <tr>
            <th class="form-group required control-label">
              <label class="ng-binding">박스(Z축)</label>
            </th>
            <td>
              <validation-provider
                name="박스(Z축)"
                :rules="{ required: true, max: 1, integer: true }"
                v-slot="validationContext"
                v-if="editable"
              >
                <b-form-input
                  v-model="model.box"
                  placeholder="작성하여 주세요."
                  :state="getValidationState(validationContext)"
                ></b-form-input>

                <b-form-invalid-feedback>
                  {{
                  validationContext.errors[0]
                  }}
                </b-form-invalid-feedback>
              </validation-provider>
              <template v-else>{{ model.box }}</template>
            </td>
            <th class="form-group required control-label">
              <label class="ng-binding">박스 타입 (n X n)</label>
            </th>
            <td>
              <validation-provider
                name="박스 타입 (n X n)"
                :rules="{ required: true }"
                v-slot="validationContext"
                v-if="editable"
              >
                <b-form-select
                  v-model="model.tube"
                  :options="codeBoxTypeList"
                  :state="getValidationState(validationContext)"
                ></b-form-select>

                <b-form-invalid-feedback>
                  {{
                  validationContext.errors[0]
                  }}
                </b-form-invalid-feedback>
              </validation-provider>
              <template v-else>
                {{
                model.tube == "9" ? "9 X 9" : "5 X 5"
                }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
      <b-button type="button" class="secondary" @click="$router.push({ name: 'storageList' })">목록</b-button>
      <b-button v-if="!editable" type="button" class="btn-primary" @click="onUpdate">수정</b-button>
      <b-button v-else type="button" variant="primary" @click="handleSubmit(onSubmit)">저장</b-button>
    </validation-observer>
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
        { value: "", text: "선택" },
        { value: "100", text: "질소탱크" },
        { value: "200", text: "초저온냉동고" },
      ],
      codeBoxTypeList: [
        { value: "", text: "선택" },
        { value: "9", text: "9 X 9" },
        { value: "5", text: "5 X 5" },
      ],
      model: {},
    };
  },
  async created() {
    this.editable = this.$route.params.id ? false : true;
    if (this.$route.params.id) await this.initData();
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    async initData() {
      const response = await axios.get(
        `/isg-oreo/api/storages/${this.$route.params.id}`
      );
      this.model = response.data;
    },
    async onSubmit() {
      const response = await axios.post("/isg-oreo/api/storages", {
        ...this.model,
        no: this.$route.params.id,
      });
      await this.$alert("", "저장 되었습니다.", "info");
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
