<template>
  <div class="container" id="content">
    <page-head-info :root-menu-nm="model.accession" :menu-nm="'객체 상세정보'"/>
    <!-- 요약 -->
    <ul class="summary offset-t">
      <li class="summary-item">
        <div class="summary-title">
          <i class="xi-opacity"></i>연구샘플
        </div>
        <div class="summary-num">{{ summary.sample }}</div>
      </li>
      <li class="summary-item">
        <div class="summary-title">
          <i class="xi-sdcard"></i>
          오믹스 데이터
        </div>
        <div class="summary-num">{{ summary.omics }}</div>
      </li>
    </ul>

    <!-- 아티클 제목 -->
    <div class="filter-group" style="margin-bottom: 0px;">
      <div class="group-item">
        <h2 class="h2">
          객체 정보
        </h2>
      </div>
      <div class="group-item">
                <span data-toggle="tooltip" data-placement="top" title="객체 삭제">
                <button class="btn-outline-secondary-sm" type="button"
                        ng-disabled="!removable()" @click="remove()"
                        ng-confirm-click="정보를 삭제합니다. 삭제된 정보는 복구할 수 없습니다.">
                <i class="xi-trash"></i><span class="sr-only">삭제</span>
                </button>
                </span>
        <span data-toggle="tooltip" data-placement="top" title="객체 수정">
                    <b-button class="btn-primary-sm" v-b-modal.registPopup variant="primary">
                        <i class="xi-file-add"></i><span class="sr-only">수정</span>
                    </b-button>
          <!--크리에이티드에 로드를 하도록 설정되어있어 v-if 로 처리 -->
                    <targets-merge :target-info="model" @saveOK="insertOK"/>
                </span>
      </div>
    </div>
    <br>
    <div>
      <table class="view-table">
        <caption class="sr-only">
          기본정보
        </caption>
        <tbody>
        <tr>
          <th>
            등록번호
          </th>
          <td>{{ model.accession }}</td>
          <th>
            객체 고유번호
          </th>
          <td>{{ model.uniqueNo }}</td>
        </tr>
        <tr>
          <th scope="row">
            나이
          </th>
          <td>{{ (model.unknownAge == true) ? '나이불명' : model.age }}
          </td>
          <th scope="row">
            성별
          </th>
          <td>{{ model.genderName }}</td>
        </tr>
        <tr>
          <th scope="row">
            축종
          </th>
          <td colspan="3">
            {{ model.species && model.species.speciesNmKr }}({{ model.species && model.species.speciesNmEn }}) >
            {{ model.species && model.species.kindNmKr }} ({{ model.species && model.species.kindNmEn }})

          </td>
        </tr>
        <!--<tr>
          <th scope="row">객체 제공 동의서</th>
          <td colspan="3">{{ model.agreeProvide ? "있음" : "없음" }}</td>
        </tr>-->
        </tbody>
      </table>
    </div>
    <b-table
        ref="selectableTable"
        selectable
        select-mode="multi"
        class="data-table"
        :items="items"
        :fields="fields"
        :busy="this.items.length == 0"
        @row-selected="onRowSelected"

    >
      <template v-slot:table-busy>
        <div class="text-center  my-2">
          <!--<b-spinner class="align-middle"></b-spinner>-->
          검색된 항목이 없습니다.
        </div>
      </template>
      <template v-slot:cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&check;</span>
          <span class="sr-only">Selected</span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Not selected</span>
        </template>
      </template>
      <template v-slot:cell(accession)="data">
        <a :href="'targetsDetail/' + data.item.id">{{data.value}}</a>
      </template>
      <template v-slot:cell(agreeProvide)="data">
        {{data.value == true ? '있음' : '없음'}}
      </template>
      <template v-slot:cell(age)="data">
        {{data.item.unknownAge == true ? '나이불명' : data.value}}
      </template>
    </b-table>

  </div>
</template>

<script>
import axios from "../../utils/axios";
import TargetsMerge from "./TargetsMerge";

export default {
  name: "TargetsDetail",
  components: {TargetsMerge},
  data() {
    return {
      isUpdate: false,
      model: {},
      summary: {
        study: 0,
        target: 0,
        sample: 0,
        omics: 0
      },
      fields: [
        {
          key: 'selected',
          label: '선택'
        },
        {key: 'accession'},
        {
          key: 'uniqueNo',
          label: '고유대상 번호'
        },
        {
          key: 'age',
          label: '나이'
        },
        {
          key: 'agreeProvide',
          label: '동의여부'

        },
        {
          key: 'genderName',
          label: '성별'
        }
      ],
      items: [],

    }
  },
  async created() {

    await this.initData()
  },
  methods: {
    async initData() {
      let id = this.$route.params.id
      let projectData = await axios.get('/isg-oreo/api/clinic-targets/' + id, {});
      let summayrData = await axios.get('/isg-oreo/statistics/summary/targets/' + id, {});
      this.model = projectData.data
      this.summary = summayrData.data
    },
    onClickChangeLink() {

    },
    async remove() {
      await this.$confirm('', "현 내역을 삭제 하시겠습니까?", 'error');
      let id = this.$route.params.id
      axios.delete('/isg-oreo/api/clinic-targets/' + id, {}).catch((error) => {
        if (error.response) {
          // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
          this.$alert('', error.response.data, 'error');
          return;
        }
      }).then((response) => {
        this.$alert('', response.data.accession + '가 삭제 되었습니다.', 'info');
        this.$router.go(-1)
      })
    },

    insertOK() {
      this.initData()

    },
    onRowSelected(items) {
      this.selected = items
    },
  },
  computed: {},
}
</script>
