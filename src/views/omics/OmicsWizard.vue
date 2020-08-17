<template>
  <div class="container" id="content">
    <page-head-info :root-menu-nm="'내정보'" :menu-nm="'오믹스 데이터 등록'"/>
    <div class="wizard-header" id="omicsMergePopup">
      <ol class="wizard-nav">
        <li class="nav-item active" :class="cssStep(1)" @click="scrollTo(1)" tabindex="0">
          <div class="num">STEP 1</div>
          <div class="text">실험정보 등록</div>
        </li>
        <li class="nav-item" :class="cssStep(2)" @click="scrollTo(2)" tabindex="0">
          <div class="num">STEP 2</div>
          <div class="text">연구 과제 선택</div>
        </li>
        <li class="nav-item" :class="cssStep(3)" @click="scrollTo(3)" tabindex="0">
          <div class="num">STEP 3</div>
          <div class="text">오믹스 파일 등록</div>
        </li>
        <!--li class="nav-item" :class="cssStep(4)" @click="scrollTo(4)" tabindex="0">
          <div class="num">STEP 4</div>
          <div class="text">등록 동의서 업로드</div>
        </li-->
      </ol>
      <div class="wizard-content">
        <omics-data-step1 :omics="omics" v-if="currentStep==1"/>
        <omics-data-step2 :omics="omics" @onSaveOmicsData="onSaveOmicsData" v-if="currentStep==2"/>
        <omics-data-step3 :omics="omics" v-if="currentStep==3"/>
        <omics-data-step4 :omics="omics" v-if="currentStep==4"/>
      </div>
    </div>
    <!-- Wizard-footer -->
    <div class="wizard-footer">
      <b-button class="btn-primary" v-if="prevEnabled" @click="prev()">이전으로</b-button>
      <b-button class="btn-primary" v-if="nextEnabled" @click="next()">다음으로</b-button>
      <!--b-button class="btn-primary" v-if="submitEnabled" @click="submit()">저장하기</b-button-->
    </div>

  </div>
</template>

<script>
import OmicsDataStep1 from "./step/OmicsDataStep1";
import OmicsDataStep2 from "./step/OmicsDataStep2";
import OmicsDataStep3 from "./step/OmicsDataStep3";
import OmicsDataStep4 from "./step/OmicsDataStep4";
import DatePicker from "../../components/datePicker/datePicker";
import axios from "../../utils/axios";


export default {
  name: "OmicsWizard",
  components: {DatePicker, OmicsDataStep4, OmicsDataStep3, OmicsDataStep2, OmicsDataStep1},
  beforeCreate() {

  },
  data() {
    return {
      currentStep: 1,
      LAST_STEP: 4,
      omics: {
        id: (this.$route.params.id == undefined ? '' : this.$route.params.id),
        accession: '',
        name: '',
        design: '',
        omicsType: this.$route.params.omicsType,
        experType: {code: 'OEXPER_N01'},
        rawdataTypes: this.$store.state.fileTypeMap[this.$route.params.omicsType].rawdata,
        processedTypes: this.$store.state.fileTypeMap[this.$route.params.omicsType].processed,
        attributes: {
          sequencingOrgan: '',
          readLength: '',
          insertSize: '',
          replicateType: '',
          instrument: '',
          ionization: '',
          hybridization: '',
          library: '',
          adapterSequence: '',
          qcVersion: '',
          manufacturer: '',
          labeling: '',
          marker: '',
          baseCallingProgram: '',
          platform: 'Illuina-hiseq',
          replicate: 'None',
          readLayout: 'Single-end'

        },
        study: {
          irbConfirmStep: {},
          materials: {},
          name: '',
          accession: '',
          largeClass: {name: ''},
          smallClass: {name: ''},
          purpose: '',
          inclusionCriteria: '',
          exclusionCriteria: '',
          measures: '',
          irbConfirmDate: '',
          id: '',
          irbConfirmNo: '',
          uniqueNo: '',
          disease: {
            code: '',
            searchCondition: '',
            searchKeyword: '',
            searchUseYn: '',
            pageIndex: 1,
            pageUnit: 10,
            pageSize: 10,
            firstIndex: 1,
            lastIndex: 1,
            recordCountPerPage: 10,
            page: 1,
            rows: 10,
            sDate: '',
            startDate: '',
            eDate: '',
            endDate: '',
            id: "1",
            koreanName: '',
            englishName: ''
          },
        },

        submitState: {status: "READY", step: 1, date: null, worker: null, comment: ''},
        verifyState: {status: "READY", step: 1, date: null, worker: null, comment: ''},
        writingState: {status: "READY", step: 2, date: null, worker: null, comment: ''},
        project: {},
        publicYn: "N",
        registUser: {},
        reviewList: [],
        registDate: '',

        reviewState: {status: "READY", comment: ''},
        confirmState: {status: "READY", comment: ''},
        registStatus: "READY",
      },
    }
  },
  watch: {
    async currentStep(newValue, oldValue) {
      console.log(newValue + '/' + oldValue)
      if (oldValue == 1) { //1스텝에서 Omics id 가 있는경우  저장필요
        console.log(oldValue)
        if (this.omics.id != '') {
          await this.$confirm('변경하신 내역이 있으시면 꼭 저장을 해주세요.', '저장하시겠습니까?', '')
          axios.post('/isg-oreo/api/omics', this.omics).then((response) => {
            this.omics.id = response.data.id
            this.omics.accession = response.data.accession
            this.$alert(
                '',
                '저장 되었습니다.',
                'info'
            );

          })

        }
      }
    }
  },
  computed: {},
  methods: {
    isCreateForm() {
      return this.omics.id == '' ? true : false
    },
    prevEnabled() {
      return this.currentStep != 1
    },
    nextEnabled() {
      return this.currentStep < this.LAST_STEP
    },
    submitEnabled() {
      return this.currentStep == this.LAST_STEP
    },
    prev() {
      if (this.currentStep >= 1) {
        this.currentStep = 1
      } else {
        this.currentStep -= 1
      }

    },
    async next() {


      if (this.currentStep >= this.LAST_STEP) {
        this.currentStep = this.LAST_STEP
      } else {
        this.currentStep += 1
      }

    },
    submit() {
      //제출 이후엔 정보를 변경할 수 없습니다. 제출하시겠습니까?
    },
    cssStep(tapNo) {
      if (tapNo == this.currentStep) {
        return "active"
      } else if (this.currentStep < tapNo) {
        return ''
      }
      return "on pointer"
    },
    scrollTo(no) {

      this.currentStep = no
    },
    async save() {


    },
    async onSaveOmicsData(param) {
      this.omics.project = param


      let response = {}

      if (this.isCreateForm()) {
        //insert는 post 으로 정의 되어있음
        await axios.post('/isg-oreo/api/omics', this.omics).catch(function (error) {
          if (error.response) {
            this.$alert(
                error.response.data,
                '문제가 발생했습니다. ',
                'error'
            );
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
          console.log(error.config);

        }).then((response) => {
          this.omics.id = response.data.id
          this.omics.accession = response.data.accession

          this.$alert(
              '',
              '저장 되었습니다.',
              'info'
          );

        })

      } else {
        //update는  put 으로 정의 되어있음
        response = await axios.put('/isg-oreo/api/omics/' + this.omics.id, this.omics).catch(function (error) {
          if (error.response) {
            this.$alert(
                error.response.data,
                '문제가 발생했습니다. ',
                'error'
            );
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
          console.log(error.config);

        }).then((response) => {
          this.omics.id = response.data.id
          this.omics.accession = response.data.accession

          this.$alert(
              '',
              '저장 되었습니다.',
              'info'
          );

        })
      }


      console.log('omiscsave', this.omics)
    }

  }
}

</script>
