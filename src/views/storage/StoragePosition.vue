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
        <div style="padding-bottom: 30px; display: flex; justify-content: center;">
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
            <hr v-if="index + 1 < headerSteps.length" class="divider" :key="`divider${index}`" />
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
            <div style="padding-bottom: 15px; display: flex; justify-content: center;">
              <div style="text-align: center; width: 15px; margin-right: 15px;"></div>
              <div
                :class="colClass"
                v-for="(item, index) in genericeNumber(bodyStep.x)"
                :key="`rack1${index}`"
              >{{ numberToAlphabet(item) }}</div>
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
                style="display: flex; justify-content: center; align-items: center;"
                v-for="(item, childIndex) in genericeNumber(bodyStep.x)"
                :key="`col-${bodyIndex}-${index}-${childIndex}`"
                :class="selectedClass(`col-${bodyIndex}-${index}-${childIndex}`)"
                @click="
                  onStorageBox(`col-${bodyIndex}-${index}-${childIndex}`, {
                    x: childIndex + 1,
                    y: index + 1,
                  })
                "
              >{{ tubeText[`col-${bodyIndex}-${index}-${childIndex}`] }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div class="row m-3">
      <div class="col-12 mt-3" style="text-align: center">
        <b-button
          style="margin-right: 10px;"
          variant="secondary"
          v-if="step > 1"
          @click="onStep(step-1)"
        >이전</b-button>
        <b-button
          style="margin-right: 10px;"
          variant="secondary"
          v-if="step < headerSteps.length"
          @click="onStep(step+1)"
        >다음</b-button>
        <b-button v-else style="margin-right: 10px;" variant="primary" @click="onSave">저장</b-button>
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
      tubeKey: "", //tube id
      headerSteps: [], //step별 명칭
      bodySteps: [], //step별 좌표
      step: 1, //현재 step
      stateStep: [], //step별 선택 여부
      selectedKey: [], //selected 스타일 적용
      model: {}, //조회 데이터
      storagePosition: {}, //step별 선택된 좌표 및 샘플 정보
      tubeText: {} //tube의 샘플정보
    };
  },
  computed: {
    //selected style 적용
    selectedClass() {
      return key => {
        return {
          "box-selected": this.selectedKey[this.step - 1] === key,
          tube: this.step === this.headerSteps.length,
          box: this.step !== this.headerSteps.length
        };
      };
    },

    //tube 및 box style
    colClass() {
      return {
        "col-tube": this.step === this.headerSteps.length,
        "col-box": this.step !== this.headerSteps.length
      };
    }
  },
  watch: {
    //마지막 step 일 경우 sample 데이터를 조회하고 출력한다.
    step: async function(newValue, oldValue) {
      if (newValue === this.headerSteps.length) {
        const response = await axios.get(`/isg-oreo/api/storagePosition`, {
          params: {
            storageNo: this.$route.params.id,
            rack: this.storagePosition.rack,
            sector: this.storagePosition.sector,
            box: this.storagePosition.box
          }
        });

        console.log("response.data", response.data);

        const tube = response.data.map(item => {
          this.tubeText[
            `col-${newValue - 1}-${item.tubeY - 1}-${item.tubeX - 1}`
          ] = item.accession;
          return {
            sampleId: item.clincSmpleId,
            tubeX: item.tubeX,
            tubeY: item.tubeY
          };
        });
        this.tubeText = { ...this.tubeText };
        this.storagePosition.tube = tube;
      }
    }
  },

  created() {
    if (this.$route.params.id) this.initData();
  },
  methods: {
    onSample(item) {
      this.tubeText[this.tubeKey] = item.accession;
      this.tubeText = { ...this.tubeText };
      let tube = this.storagePosition["tube"] || [];
      tube = [
        ...tube,
        {
          sampleId: item.id,
          tubeX: this.storagePosition.tubeX,
          tubeY: this.storagePosition.tubeY
        }
      ];
      this.storagePosition.tube = tube;
    },

    //샘플의 위치 정보를 저장한다.
    async onSave() {
      const response = await axios.post("/isg-oreo/api/storagePosition", {
        ...this.storagePosition,
        storageNo: this.$route.params.id
      });
      await this.$alert("", "저장 되었습니다.", "info");
    },
    numberToAlphabet(value) {
      return (value + 9).toString(36).toUpperCase();
    },
    onStep(step) {
      this.initTubeText(step);
      this.step = step;
    },

    initTubeText(step) {
      if (step === this.headerSteps.length) {
        this.tubeText = {};
      }
    },

    stepActive(step) {
      return { active: this.step === step };
    },
    onStorageBox(key, coord) {
      //selected style
      this.selectedKey[this.step - 1] = key;
      this.selectedKey = [...this.selectedKey];

      //선택한 좌표 step에 따라 설정해야 될 컬럼이 다르다.
      if (this.step === 1 && this.model.type === "100") {
        this.storagePosition = {
          ...this.storagePosition,
          rack: coord.x,
          sector: coord.y,
          box: 1
        };
      }

      if (this.step === 1 && this.model.type === "200") {
        this.storagePosition = {
          ...this.storagePosition,
          rack: coord.x,
          sector: coord.y
        };
      }

      //질소탱크
      if (this.step === 2 && this.model.type === "100") {
        this.storagePosition = {
          ...this.storagePosition,
          tubeX: coord.x,
          tubeY: coord.y
        };
      }

      //초저온냉동고
      if (this.step === 2 && this.model.type === "200") {
        this.storagePosition = { ...this.storagePosition, box: coord.y };
      }

      if (this.step === 3) {
        this.storagePosition = {
          ...this.storagePosition,
          tubeX: coord.x,
          tubeY: coord.y
        };
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

    //초기화
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
          { step: 2, x: this.model.tube, y: this.model.tube }
        ];

        //초저온냉동고
      } else if (this.model.type === "200") {
        this.headerSteps = ["랙(X축), 섹터(Y축)", "컨테이너(Z축)", "박스"];
        this.bodySteps = [
          { step: 1, x: this.model.rack, y: this.model.sector },
          { step: 2, x: 1, y: this.model.box },
          { step: 3, x: this.model.tube, y: this.model.tube }
        ];
      }
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
