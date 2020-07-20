<template>
  <div class="container" id="content">
    <div class="filter-group" style="margin-bottom: 0px;">
      <div class="group-item">
        <h2 class="h2">{{ model.name }}</h2>
      </div>
    </div>

    <div class="row">
      <div class="col-2"></div>
      <div v-if="model.type === '100'" class="col-1"></div>

      <div :class="model.type === '100' ? 'col-6' : 'col-8'">
        <div
          style="padding-bottom: 30px; display: flex; justify-content: center;"
        >
          <template v-for="(item, index) in headerSteps">
            <div
              :class="stepActive(index + 1)"
              class="step-container"
              :key="`header${index}`"
              @click="onStep(index + 1)"
            >
              <div class="step">{{ index + 1 }}</div>
              <div class="label">{{ item }}</div>
            </div>
            <hr
              v-if="index + 1 < headerSteps.length"
              class="divider"
              :key="`divider${index}`"
            />
          </template>
        </div>
      </div>
      <div v-if="model.type === '100'" class="col-2"></div>
      <div class="col-2"></div>
    </div>

    <template v-for="(bodyStep, bodyIndex) in bodySteps">
      <div v-if="step === bodyStep.step" :key="`bodyStep${bodyIndex}`">
        <div class="row">
          <div class="col-12">
            <div
              style="padding-bottom: 15px; display: flex; justify-content: center;"
            >
              <div
                style="text-align: center; width: 15px; margin-right: 15px;"
              ></div>
              <div
                :class="colClass"
                v-for="(item, index) in genericeNumber(bodyStep.x)"
                :key="`rack1${index}`"
              >
                {{ numberToAlphabet(item) }}
              </div>
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
            <div
              style="display: flex; justify-content: center; align-items: center;"
            >
              <div style="text-align: center; width: 15px; margin-right: 15px;">
                {{ item }}
              </div>
              <div
                style="display: flex; justify-content: center; align-items: center;"
                v-for="(item, childIndex) in genericeNumber(bodyStep.x)"
                :key="`col${bodyIndex}${index}${childIndex}`"
                :class="selectedClass(`col${bodyIndex}${index}${childIndex}`)"
                @click="
                  onStorageBox(`col${bodyIndex}${index}${childIndex}`, {
                    x: childIndex + 1,
                    y: index + 1,
                  })
                "
              >
                {{ tubeText[`col${bodyIndex}${index}${childIndex}`] }}
              </div>
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
        >
          이전
        </button>
        <button
          v-if="step < headerSteps.length"
          type="button"
          class="btn-outline-secondary"
          style="margin-right: 10px;"
          @click="step += 1"
        >
          다음
        </button>
        <button
          v-else
          type="button"
          class="btn-outline-secondary"
          style="margin-right: 10px;"
          @click="onSave"
        >
          저장
        </button>
      </div>
    </div>
    <SampleModal @sample="onSample" />
  </div>
</template>
<script>
import axios from "../../utils/axios";

export default {
  name: "StoragePosition",

  data() {
    return {
      tubeKey: "",
      headerSteps: [],
      bodySteps: [],
      step: 1,
      selectedKey: [],
      model: {},
      storagePosition: {},
      tubeText: {},
    };
  },
  computed: {
    selectedClass() {
      return (key) => {
        return {
          "box-selected": this.selectedKey[this.step - 1] === key,
          tube: this.step === this.headerSteps.length,
          box: this.step !== this.headerSteps.length,
        };
      };
    },
    colClass() {
      return {
        "col-tube": this.step === this.headerSteps.length,
        "col-box": this.step !== this.headerSteps.length,
      };
    },
  },

  created() {
    this.editable = this.$route.params.id ? false : true;
    if (this.$route.params.id) this.initData();
  },
  methods: {
    onSample(item) {
      this.tubeText[this.tubeKey] = item.accession;
      this.tubeText = { ...this.tubeText };
    },
    onSave() {
      console.log("this.storagePosition", this.storagePosition);
    },
    numberToAlphabet(value) {
      return (value + 9).toString(36).toUpperCase();
    },
    onStep(step) {
      this.step = step;
    },
    stepActive(step) {
      return { active: this.step === step };
    },
    onStorageBox(key, coord) {
      //selected style
      this.selectedKey[this.step - 1] = key;
      this.selectedKey = [...this.selectedKey];

      //선택한 좌표 step에 따라 설정해야 될 컬럼이 다르다.
      if (this.step === 1) {
        this.storagePosition["rack"] = coord.x;
        this.storagePosition["sector"] = coord.y;
      }

      if (this.step === 2 && this.model.type === "100") {
        this.storagePosition["box"] = 1;
        this.storagePosition["tubeX"] = coord.x;
        this.storagePosition["tubeY"] = coord.y;
      }

      if (this.step === 2 && this.model.type === "200") {
        this.storagePosition["box"] = coord.y;
      }

      if (this.step === 3) {
        this.storagePosition["tubeX"] = coord.x;
        this.storagePosition["tubeY"] = coord.y;
      }

      //박스를 선택
      if (this.step === this.headerSteps.length) {
        this.tubeKey = key;
        this.$bvModal.show("sample-modal");
      }
    },
    genericeNumber(value) {
      return value ? parseInt(value) : 0;
    },

    async initData() {
      const response = await axios.get(
        `/isg-oreo/api/storages/${this.$route.params.id}`
      );
      this.model = response.data;

      //질소탱크
      if (this.model.type === "100") {
        this.headerSteps = ["랙(X축), 섹터(Y축)", "박스"];
        this.bodySteps = [
          { step: 1, x: this.model.rack, y: this.model.sector },
          { step: 2, x: this.model.tube, y: this.model.tube },
        ];

        //초저온냉동고
      } else if (this.model.type === "200") {
        this.headerSteps = ["랙(X축), 섹터(Y축)", "컨테이너(Z축)", "박스"];
        this.bodySteps = [
          { step: 1, x: this.model.rack, y: this.model.sector },
          { step: 2, x: 1, y: this.model.box },
          { step: 3, x: this.model.tube, y: this.model.tube },
        ];
      }
    },
  },
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
  margin-right: 10px;
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

.col-tube {
  width: 80px;
  margin-right: 10px;
  text-align: center;
}
.col-box {
  width: 50px;
  margin-right: 10px;
  text-align: center;
}

.tube {
  background-color: #e1e1e1;
  border: 1px solid #000;
  height: 50px;
  width: 80px;
  margin-right: 10px;
}
.tube:hover {
  background-color: #a1a1a1;
  cursor: pointer;
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
