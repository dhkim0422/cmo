<template>
  <div class="container" id="content">
    <form>
      <!-- 요약 -->
      <ul class="summary offset-t">
        <li class="summary-item">
          <div class="summary-title">
            <i class="xi-business"></i>
            환경_유해성_연구
          </div>
          <div class="summary-num">{{ this.summary.study }}</div>
        </li>
        <li class="summary-item">
          <div class="summary-title">
            <i class="xi-users"></i>
            연구대상자
          </div>
          <div class="summary-num">{{ this.summary.target }}</div>
        </li>
        <li class="summary-item">
          <div class="summary-title">
            <i class="xi-opacity"></i>
            연구샘플
          </div>
          <div class="summary-num">{{ this.summary.sample }}</div>
        </li>
        <li class="summary-item">
          <div class="summary-title">
            <i class="xi-sdcard"></i>
            오믹스 데이터
          </div>
          <div class="summary-num">{{ this.summary.omics }}</div>
        </li>
      </ul>

      <ul class="nav nav-tabs">
        <li class="active">
          <a data-toggle="tab" href="#tab1">연구과제_정보</a>
        </li>
        <li><a data-toggle="tab" href="#tab2">Menu 1</a></li>
        <li><a data-toggle="tab" href="#tab3">Menu 2</a></li>
      </ul>

      <div class="tab-content">
        <div id="tab1" class="tab-pane active">
          <div class="filter-group" style="margin-bottom: 0px;">
            <div class="group-item">
              <h2 class="h2">연구과제_정보</h2>
            </div>
            <div class="group-item">
              <span
                data-toggle="tooltip"
                data-placement="top"
                title=" 연구과제_삭제 "
              >
                <button
                  class="btn-outline-secondary-sm"
                  type="button"
                  ng-disabled="!removable()"
                  ng-click="remove()"
                  ng-confirm-click=" confirmDel "
                >
                  <i class="xi-trash"></i><span class="sr-only"> del </span>
                </button>
              </span>
              <span
                data-toggle="tooltip"
                data-placement="top"
                title=" 연구과제_수정 "
              >
                <button
                  class="btn-primary-sm"
                  type="button"
                  ng-click="onClickChangeLink()"
                >
                  <i class="xi-pen"></i><span class="sr-only"> edit </span>
                </button>
              </span>
            </div>
          </div>

          <table class="view-table">
            <caption class="sr-only">
              basicinfo
            </caption>
            <tbody>
              <tr>
                <th scope="row">등록번호</th>
                <td>{{ model.accession }}</td>
                <th scope="row">KEITI_고유번호</th>
                <td>{{ model.uniqueNo }}</td>
              </tr>
              <tr>
                <th scope="row">사업명</th>
                <td colspan="3">{{ model.program }}</td>
              </tr>
              <tr>
                <th scope="row">단위사업</th>
                <td colspan="3">{{ model.unitProgram }}</td>
              </tr>
              <tr>
                <th scope="row">중분야</th>
                <td>{{ model.middleRealm }}</td>
                <th scope="row">연구상태</th>
                <td>{{ model.projectStatus.name }}</td>
              </tr>
              <tr>
                <th scope="row">과제명</th>
                <td colspan="3">{{ model.name }}</td>
              </tr>
              <tr>
                <th scope="row">주관기관</th>
                <td>{{ model.institute }}</td>
                <th scope="row">주관책임자</th>
                <td>{{ model.charger }}</td>
              </tr>
              <tr>
                <th scope="row">참여기업</th>
                <td>{{ model.participants }}</td>
                <th scope="row">총_연구기간</th>
                <td>{{ model.begin | date }} ~ {{ model.end | date }}</td>
              </tr>
              <tr>
                <th scope="row">연구개발_목표</th>
                <td colspan="3" class="pre">{{ model.purpose }}</td>
              </tr>
              <tr>
                <th scope="row">연구개발_내용</th>
                <td colspan="3" class="pre">{{ model.contents }}</td>
              </tr>
            </tbody>
          </table>

          <h2 class="h2">연구개발_결과</h2>
          <table class="view-table">
            <caption class="sr-only">
              연구개발_결과
            </caption>
            <tbody>
              <tr>
                <th scope="row">개발내용_및_결과</th>
                <td class="pre">{{ model.conclusion }}</td>
              </tr>
              <tr>
                <th scope="row">키워드</th>
                <td>{{ model.keywords }}</td>
              </tr>
              <tr>
                <th scope="row">개발기술의_특징,_장점</th>
                <td class="pre">{{ model.features }}</td>
              </tr>
              <tr>
                <th scope="row">기대효과</th>
                <td class="pre">{{ model.expectation }}</td>
              </tr>
              <tr>
                <th scope="row">적용분야</th>
                <td class="pre">{{ model.appliedTo }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="tab2" class="tab-pane">
          <h3>Menu 1</h3>
          <p>Some content in menu 1.</p>
        </div>
        <div id="tab3" class="tab-pane">
          <h3>Menu 2</h3>
          <p>Some content in menu 2.</p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "../../utils/axios";

export default {
  name: "projects-detail",
  data() {
    return {
      model: {},
      summary: {
        study: 0,
        target: 0,
        sample: 0,
        omics: 0,
      },
    };
  },
  async created() {
    let id = this.$route.params.id;
    await this.initData(id);
  },
  methods: {
    async initData(id) {
      let projectData = await axios.get("/isg-oreo/api/projects/" + id, {});
      let summayrData = await axios.get(
        "/isg-oreo/statistics/summary/projects/" + id,
        {}
      );
      this.model = projectData.data;
      this.summary = summayrData.data;
    },
  },
  computed: {},
};
</script>
