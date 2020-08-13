<template>
  <div class="container" id="content">

    <page-head-info :root-menu-nm="model.name" :menu-nm="model.accession"/>
    <!-- 요약 -->
    <ul class="summary offset-t">

      <li class="summary-item">
        <div class="summary-title">
          <i class="xi-sdcard"></i>오믹스 데이터
        </div>
        <div class="summary-num">{{ summary.omics }}</div>
      </li>
      <li class="summary-item">
        <div class="summary-title">
          <i class="xi-file"></i>오믹스 파일
        </div>
        <div class="summary-num">{{ summary.omicsFile }}</div>
      </li>
    </ul>


    <div class="filter-group" style="margin-bottom: 0px;">
      <div class="group-item">
        <h2 class="h2">연구샘플 정보</h2>
      </div>
      <div class="group-item">
                <span data-toggle="tooltip" data-placement="top" title="연구샘플 삭제">
                <button class="btn-outline-secondary-sm" type="button" @click="remove()">
                    <i class="xi-trash"></i>
                    <span class="sr-only">삭제</span>
                </button>
                </span>
        <!--<span data-toggle="tooltip" data-placement="top" title="연구샘플 수정">
        <button class="btn-primary-sm" type="button" @click="onClickChangeLink()">
            <i class="xi-pen"></i>
            <span class="sr-only">수정</span>
        </button>
        </span>-->
        <span data-toggle="tooltip" data-placement="top" title="연구샘플 수정">
                    <b-button class="btn-primary-sm" v-b-modal.sampleSavePopup variant="primary">
                        <i class="xi-pen"></i><span class="sr-only">수정</span>
                    </b-button>
                    <samples-merge :samples-info="model" @saveOK="updateOK"/>
                </span>
      </div>
    </div>

    <table class="view-table">
      <caption class="sr-only">연구샘플_기본정보</caption>
      <tbody>
      <tr>
        <th>등록번호</th>
        <td>{{ model.accession }}</td>
        <th>연구샘플 고유번호</th>
        <td>{{ model.uniqueNo }}</td>
      </tr>
      <tr>
        <th>샘플명</th>
        <td>{{ model.name }}</td>
        <th>샘플유래</th>
        <td>{{ model.origin === undefined ? '' : model.origin.name }}</td>
      </tr>
      <tr>
        <th>샘플구분</th>
        <td>{{ model.type == undefined ? '' : model.type.name }}</td>
        <th>질환명</th>
        <td>{{ model.disease }}</td>
      </tr>
      <tr>
        <th>샘플_설명</th>
        <td colspan="3">{{ model.description }}</td>
      </tr>
      </tbody>
    </table>

    <div class="group-item">
      <h2 class="h2">저장소 정보</h2>
    </div>
    <b-table
        ref="selectableTable"
        class="data-table"
        :items="model.sampleStorage"
        :fields="fields"
        :busy="model.sampleStorage.length == 0"
    >
      <template v-slot:table-busy>
        <div class="text-center  my-2">
          <!--<b-spinner class="align-middle"></b-spinner>-->
          검색된 항목이 없습니다.
        </div>
      </template>
      <template v-slot:cell(type)="data">
        {{ data.value | type }}
      </template>
    </b-table>


    <div v-show="model.target != null">
      <h2 class="h2">객체 정보</h2>
      <table class="view-table">
        <caption class="sr-only">객체 기본정보</caption>
        <tbody>
        <tr>
          <th>등록번호</th>
          <td>{{ model.target.accession }}</td>
          <th>객체고유번호</th>
          <td>{{ model.target.uniqueNo }}</td>
        </tr>
        <tr>
          <th scope="row">나이</th>
          <td>{{ (model.target.unknownAge) ? '나이불명' : model.target.age }}</td>
          <th scope="row">상별</th>
          <td>{{ model.target.genderName }}</td>
        </tr>
        <!--<tr>
            <th scope="row">객체 제공 동의서</th>
            <td colspan="3">{{ model.target.agreeProvide? "제공" : "없음" }}</td>
        </tr>-->
        </tbody>
      </table>
    </div>

  </div>
</template>
<script>
import axios from "../../utils/axios";
import SamplesMerge from "./SamplesMerge";

export default {
  name: "SamplesDetail",
  components: {SamplesMerge},
  async created() {

    await this.initData()
  },
  data() {
    return {
      isUpdate: false,
      summary: {
        study: 0,
        omics: 0,
        omicsFile: 0
      },
      fields: [
        {key: 'type', label: '저장고 구분'},
        {key: 'name', label: '냉동고 명'},
        {
          key: 'place', label: '저장고 위치'
        },
        {
          key: 'rack',
        },
        {
          key: 'sector',
        },
        {key: 'box'},
        {
          key: 'tubeX',
        },
        {
          key: 'tubeY',
        },

      ],
      model: {
        accession: '',
        collectAddress: '',
        collectLocal: '',
        description: '',
        disease: '',
        id: '',
        name: '',
        origin: {code: 'S01', name: ''},
        provider: '',
        registDate: '',
        registUser: {id: '', name: '', username: '', roles: []},
        specimen: '',
        target: {
          accession: '',
          age: '',
          agreeProvide: '',
          birthday: '',
          gender: '',
          genderName: '',
          id: '',
          uniqueNo: '',
          unknownAge: ''
        },
        type: {name: ''},
        uniqueNo: '',
        sampleStorage: []
      }
    }
  },
  filters: {
    type(value) {
      if (!value) return "";
      return value === "100" ? "질소탱크" : "초저온냉동고";
    }
  },
  methods: {
    onClickChangeLink() {

    },
    remove() {

    },
    updateOK() {
      this.initData();//수정된 내역을 다시 리로드
      this.isUpdate = false//업데이트 팝업을 제거
    },

    async initData() {
      this.isUpdate = false
      let id = this.$route.params.id
      let modelData = await axios.get('/isg-oreo/api/clinic-samples/' + id, {});
      let summayrData = await axios.get('/isg-oreo/statistics/summary/samples/' + id, {});
      let sampleStorage = await axios.get('/isg-oreo/api/sampleStorage', {params: {clincSmpleId: id}});

      this.model = modelData.data
      this.summary = summayrData.data
      this.model.sampleStorage = sampleStorage.data
      console.log('summayrData', summayrData.data)
    }

  },

}
</script>

