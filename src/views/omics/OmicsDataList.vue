<template>
  <div>
    <b-form-checkbox-group id="checkbox-group" v-model="selected" name="itemId">
      <div class="data-card" v-for="item in this.resultList.data.list">

        <div class="card-header">
          <div class="block-group">
            <div class="block">
              <div class="" style="width: 270px">
                <b-form-checkbox :value="item" size="lg">
                  <i :class="symbol(item)"></i>
                  {{ item.accession }}
                </b-form-checkbox>
              </div>
            </div>
            <div class="block">
              <a class="link-text" @click="onClickDetailLink(item)" title="상세보기">
                {{ item.name }}
              </a>
            </div>

            <div class="block" v-show="!isPublicScope(item)">
                        <span class="data-status" v-show="isRegistScope(item)">
                            <i :class="icon(item)"></i>
                            <span>{{ label(item) }}</span>
                        </span>
              <span class="data-status">
					        <span>{{ label(item) }}</span>
				        </span>
            </div>
          </div>
        </div>
        <div class="card-body">
          <!-- NGS 정보 테이블 -->
          <table class="view-table" v-show="isNgs(item)">
            <caption class="sr-only">기본정보</caption>
            <tbody>
            <tr>
              <th scope="row">과제정보</th>
              <td colspan="3">({{ item.project && item.project.accession }}) {{
                  item.project &&
                  item.project.name
                }}
              </td>
            </tr>
            <!--tr>
                <th scope="row">환경 유해성 연구</th>
                <td colspan="3">({{ item.study.accession }}) {{ item.study.name }}</td>
            </tr>
            <tr>
                <th scope="row">연구대상 표현형/질환</th>
                <td colspan="3">(국문) {{ item.disease.koreanName }}, (영문) {{ item.disease.englishName }}</td>
            </tr-->
            <tr>
              <th scope="row">오믹스 종류</th>
              <td>{{ item.omicsType }}</td>
              <th scope="row">데이터 유형</th>
              <td>{{ item.experType && item.experType.name }}</td>
            </tr>
            <tr>
              <th scope="row">시퀸스 플랫폼</th>
              <td>{{ item.attributes.platform }}</td>
              <th scope="row">반복실험 유형</th>
              <td>{{ item.attributes.replicate }}</td>
            </tr>
            <tr>
              <th scope="row">파일 종류</th>
              <td>
                <div>
                  <span v-for="fileType in item.rawdataTypes">
                      {{fileType.selected ? fileType.name:''}}
                  </span>
                </div>
                <div>
                  <span v-for="fileType in item.processedTypes">
                      {{fileType.selected ? fileType.name:''}}
                  </span>
                </div>

              </td>
              <th scope="row">파일 용량</th>
              <td>{{ item.fileTotal }}</td>
            </tr>
            </tbody>
          </table>

          <!-- end NGS 정보 테이블 -->

          <!-- Microarray 정보 테이블 -->

          <table class="view-table" v-show="isMicroarray(item)">
            <caption class="sr-only">기본정보</caption>
            <tbody>
            <tr>
              <th scope="row">과제정보</th>
              <td colspan="3">
                ({{ item.project && item.project.accession }})
                {{ item.project && item.project.name }}
              </td>
            </tr>
            <!--                        <tr>
                                        <th scope="row">환경 유해성 연구</th>
                                        <td colspan="3">({{ item.study.accession }}) {{ item.study.name }}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">연구대상 표현형/질환</th>
                                        <td colspan="3">
                                            (국문) {{ item.disease.koreanName }},
                                            (영문) {{ item.disease.englishName }}
                                        </td>
                                    </tr>-->
            <tr>
              <th scope="row">오믹스 종류</th>
              <td>{{ item.omicsType }}</td>
              <th scope="row">데이터 유형</th>
              <td>{{ item.experType && item.experType.name }}</td>
            </tr>
            <tr>
              <th scope="row">시퀸스 플랫폼</th>
              <td colspan="3">{{ item.attributes.platform }} / {{ item.attributes.manufacturer }}</td>
            </tr>
            <tr>
              <th scope="row">표지자</th>
              <td colspan="3">{{ item.attributes.marker }}</td>
            </tr>
            <tr>
              <th scope="row">파일 종류</th>
              <td>
                <div>
                  <span v-for="fileType in item.rawdataTypes">
                      {{fileType.selected ? fileType.name:''}}
                  </span>
                </div>

                <div>
                  <span v-for="fileType in item.processedTypes">
                      {{fileType.selected ? fileType.name:''}}
                  </span>
                </div>

              </td>
              <th scope="row">파일 용량</th>
              <td>{{ item.fileTotal }}</td>
            </tr>
            </tbody>
          </table>
          <!-- end Microarray 정보 테이블 -->

          <!-- Metabolome 정보 테이블 -->
          <table class="view-table" v-show="isMetabolome(item)">
            <caption class="sr-only">기본정보</caption>
            <tbody>
            <tr>
              <th scope="row">과제정보</th>
              <td colspan="3">({{ item.project && item.project.accession }}) {{
                  item.project &&
                  item.project.name
                }}
              </td>
            </tr>
            <!--tr>
                <th scope="row">환경 유해성 연구</th>
                <td colspan="3">({{ item.study && item.study.accession }}) {{ item.study &&
                    item.study.name}}
                </td>
            </tr>
            <tr>
                <th scope="row">연구대상 표현형/질환</th>
                <td colspan="3">(국문) {{ item.disease && item.disease.koreanName }}, (영문) {{ item.disease &&
                    item.disease.englishName }}
                </td>
            </tr-->
            <tr>
              <th scope="row">오믹스 종류</th>
              <td>{{ item.omicsType }}</td>
              <th scope="row">Instrument model</th>
              <td>{{ item.attributes && item.attributes.instrument }}</td>
            </tr>
            <tr>
              <th scope="row">Mass spectrometry</th>
              <td colspan="3">{{ item.attributes && item.attributes.spectrometry }}</td>
            </tr>
            <tr>
              <th scope="row">Ionization source</th>
              <td>{{ item.attributes && item.attributes.ionization }}</td>
              <th scope="row">Analyzer</th>
              <td>{{ item.attributes && item.attributes.analyzer }}</td>
            </tr>
            <tr>
              <th scope="row">파일 종류</th>
              <td>
                <div>
                  <span v-for="fileType in item.rawdataTypes">
                      {{fileType.selected ? fileType.name:''}}
                  </span>
                </div>
                <div>
                  <span v-for="fileType in item.processedTypes">
                      {{fileType.selected ? fileType.name:''}}
                  </span>
                </div>
              </td>
              <th scope="row">파일 용량</th>
              <td>{{ item.fileTotal }}</td>
            </tr>
            </tbody>
          </table>
          <!-- end Metabolome 정보 테이블 -->
        </div>

        <div class="data-card" v-show="resultList.data.list.length === 0">
          <div class="card-body text-center">검색 결과가 없습니다</div>
        </div>


      </div>
    </b-form-checkbox-group>
    <br/>
    <div>
      <b-pagination v-model="resultList.data.currentPage"
                    :per-page="resultList.data.numberOfRows"
                    :total-rows="resultList.data.total"
                    size="sm"
                    align="center"
                    @change="changePageNo"
      />
    </div>
  </div>
</template>
<script>


export default {
  name: "OmicsDataList",
  created() {
  },
  props: ['resultList', 'omicsType'],
  data() {
    return {
      selected: [],
      LABEL: 1,
      ICON: 2,
      HIGHLIGHT: 3
    }
  },
  watch: {
    resultList(newVal) {
      this.selected = []
    },
    selected(newVal) {
      this.$emit('checkSelected', newVal)
    }
  },
  methods: {
    //Pagination 컴포넌트의 change emit
    changePageNo(pageNo) {
      this.currentPageNo = pageNo;
      this.$emit('currentPageNo', pageNo)

    },

    isPublicScope(omics) {

      return true
    },
    isRegistScope(omics) {
      return true
    },
    onClickDetailLink(item) {
      console.log('12323', item)
      this.$router.push({path: "/omics/omicsDetail/" + item.id})
    },

    isOpend(omics) {
      if (omics.s)
        return true
    },
    label: function (omics) {
      return this.isOpend(omics) ? "공개" : "비공개"
    },
    icon: function (omics) {
      return this.isOpend(omics) ? "xi-eye" : "xi-eye-off";
    },
    highlight: function (omics) {
      return this.isOpend(omics) ? "data-step-3" : "data-step-1";
    },
    symbol: function (omics) {
      if (this.isNgs(omics)) {
        return "xi-chip";
      } else if (this.isMicroarray(omics)) {
        return "xi-spa";
      } else {
        return "xi-chart-pie";
      }
    },

    isNgs(omics) {
      return (omics.omicsType == 'NGS');
    },

    isMicroarray(omics) {
      return (omics.omicsType == 'Microarray');
    },

    isMetabolome(omics) {
      return (omics.omicsType == 'Metabolome');
    },


  }
}
</script>
