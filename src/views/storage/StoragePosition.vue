<template>
  <div class="container" id="content">
    <div class="filter-group" style="margin-bottom: 0px;">
      <div class="group-item">
        <h2 class="h2">{{ model.name }}</h2>
      </div>
    </div>

    <div class="row">
      <div class="col-1"></div>
      <div class="col-10">
        <div style="padding-bottom: 30px; display: flex; justify-content: center;">
          <template v-for="(item, index) in headerSteps">
            <div
              :class="stepActive(index+1)"
              class="step-container"
              :key="`header${index}`"
              @click="onStep(index+1)"
            >
              <div class="step">{{index+1}}</div>
              <div class="label h6">{{item}}</div>
            </div>
            <hr v-if="index+1 < headerSteps.length" class="divider" :key="`divider${index}`" />
          </template>
        </div>
      </div>
      <div class="col-1"></div>
    </div>

    <template v-for="(bodyStep, index) in bodySteps">
      <div v-if="step === bodyStep.step" :key="`bodyStep${index}`">
        <div class="row">
          <div class="col-12">
            <div style="padding-bottom: 15px; display: flex; justify-content: center;">
              <div style="text-align: center; width: 15px; margin-right: 15px;"></div>
              <div
                class="col-box"
                v-for="(item, index) in genericeNumber(bodyStep.x)"
                :key="`rack1${index}`"
              >{{ item }}</div>
            </div>
          </div>
        </div>

        <div
          class="row"
          v-for="(item, index) in genericeNumber(bodyStep.y)"
          :key="`sector1${index}`"
          style="margin-bottom: 10px;"
        >
          <div class="col-12">
            <div style="display: flex; justify-content: center; align-items: center;">
              <div style="text-align: center; width: 15px; margin-right: 15px;">{{ item }}</div>
              <div
                class="box"
                v-for="(item, childIndex) in genericeNumber(bodyStep.x)"
                :key="`col1${index}${childIndex}`"
                :class="selectedClass(`col1${index}${childIndex}`)"
                @click="onSelectedKey(`col1${index}${childIndex}`)"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div class="row" style="margin: 10px;">
      <div class="col-12">
        <button
          v-if="step > 1"
          type="button"
          class="btn-outline-secondary"
          style="margin-right: 10px;"
          @click="step -= 1"
        >이전</button>
        <button
          v-if="step > 0 && step < 3"
          type="button"
          class="btn-outline-secondary"
          style="margin-right: 10px;"
          @click="step += 1"
        >다음</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "../../utils/axios";

export default {
  name: "StoragePosition",

  data() {
    return {
      headerSteps: ["랙(X축), 섹터(Y축)", "박스", "튜브"],
      bodySteps: [],
      step: 1,
      selectedKey: "",
      model: {}
    };
  },
  computed: {
    selectedClass() {
      return key => {
        return { "box-selected": this.selectedKey === key };
      };
    }
  },
  created() {
    this.editable = this.$route.params.id ? false : true;
    if (this.$route.params.id) this.initData();
  },
  methods: {
    onStep(step) {
      this.step = step;
    },
    stepActive(step) {
      return { active: this.step === step };
    },
    onSelectedKey(key) {
      this.selectedKey = key;
    },
    genericeNumber(value) {
      console.log("value", value);
      return value ? parseInt(value) : 0;
    },

    async initData() {
      const response = await axios.get(
        `/isg-oreo/api/storages/${this.$route.params.id}`
      );
      this.model = response.data;
      this.bodySteps = [
        { step: 1, x: this.model.rack, y: this.model.sector },
        { step: 2, x: 1, y: this.model.box },
        { step: 3, x: this.model.tube, y: this.model.tube }
      ];
    }
  }
};
</script>
<style scoped>
.step-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}
.active .step {
  background-color: #39bfc4;
}

.active .label {
  color: #556889;
}

.step {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  line-height: 20px; /*세로 정렬*/
  background-color: #a1a1a1;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.label {
  color: #556889a3;
}
.divider {
  display: block;
  flex: 1 1 0px;
  max-width: 100%;
  height: 0;
  max-height: 0;
  border: solid;
  border-width: thin 0 0;
  transition: inherit;
  border-color: #0000003d;
  margin-left: 15px;
  margin-right: 15px;
  align-self: center;
}

.box-selected {
  background-color: #a1a1a1 !important;
}
.col-box {
  width: 50px;
  margin-right: 10px;
  text-align: center;
}
.box {
  background-color: #e1e1e1;
  border: 1px solid #000;
  height: 30px;
  width: 50px;
  margin-right: 10px;
}
.box:hover {
  background-color: #a1a1a1;
  cursor: pointer;
}

select,
input {
  box-shadow: 0px 0px 0px 0px;
}
</style>
