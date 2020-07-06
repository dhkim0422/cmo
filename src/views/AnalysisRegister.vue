<template>
    <div class="container">
      <section class="section-search mT-60">
        <h3 class="h3 title-section mB-30"><img src="../images/arg-search-ico-sm.png" alt="분석">분석</h3>
        <table class="table-view">
          <colgroup>
            <col style="width: 167px;">
            <col style="width: 180px;">
            <col style="width: 100px;">
            <col>
            <col style="width: 100px;">
            <col>
          </colgroup>
          <tbody>
            <tr>
              <th class="th-title required">분석명</th>
              <td colspan="3" class="td-components"><input v-model="params.analNm" type="text" class="form-control" placeholder="e.g. vanaA 보존영역 탐색분석 1"></td>
              <th class="th-title required">출처</th>
              <td class="td-components">
                  <select class="form-control" v-model="params.submitType">
                    <option value="">All</option>
                    <option value="USER">Local</option>
                    <option value="NCBI">NCBI</option>
                  </select>                
              </td>
            </tr>
            <tr>
              <th rowspan="3" class="th-title" style="vertical-align: top;">서열 검색조건</th>
              <th class="required">내성 항생제</th>
              <th class="required">항생제명</th>
              <td colspan="3" class="td-components">
                  <vSelect
                    v-model="params.searchAbId"
                    label="ab"
                    :options="comboAbList"
                    :reduce="option => option.abId"
                    @input="onInputAb"
                  ></vSelect>                                                  
              </td>
            </tr>
            <tr>
              <th class="required">항생제 내성 유전자 Class</th>
              <th class="required">Class</th>
              <td class="td-components">
                  <vSelect
                    v-model="params.searchArcId"
                    label="arcNm"
                    :options="comboAnalysisArcList"
                    :reduce="option => option.arcId"
                    @input="onInputArc"
                  ></vSelect>                                  
              </td>
              <th class="required">Subclass</th>
              <td class="td-components">
                  <vSelect
                    v-model="params.searchArtpId"
                    label="artp"
                    :options="comboArtpList"
                    :reduce="option => option.artpId"
                    resetOnOptionsChange
                  ></vSelect>                   
              </td>
            </tr>
            <tr>
              <th class="required">종 명 <button type="button" class="td-search-btn pull-right" data-toggle="modal" data-target="#modalTaxonTree"><i class="xi-search"><span class="sr-only">검색</span></i></button></th>
              <td colspan="4" class="td-text-area text-gray">
                <div><textarea readonly="true" rows="3" class="form-control" v-model="taxonList"></textarea></div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="wrap-btn text-right mT-30">
          <div class="alert alert-danger mR-20" role="alert" v-show="isInValid">
            <i class="xi-error"><span class="sr-only">경고</span></i> {{ message }}
          </div>
          <button @click="paginationAndList(1)" type="button" title="Search" class="btn btn-primary btn-radius">Search</button>
        </div>
      </section>

      <section class="section-result mT-50 pB-120">
        <h3 class="sr-only">검색결과</h3>
        <div class="tool-bar mB-15">
          <div class="row">
            <div class="col-xs-6 text-left"><p class="mT-20 mB-0">선택된 서열 수 : {{ argIdList.length }}/{{ totalRecordCount }}</p></div>
            <div class="col-xs-6 text-right form-inline">
              <div class="form-group dt-length">
                <button @click="btnAll()" type="button" title="재분석" class="btn btn-default mR-15">전체선택</button>
                <PageUnit :componentName="this.$options.name"></PageUnit>
              </div>
            </div>            
          </div>
        </div>
        <!-- <div class="table-responsive mB-50 vld-parent" style="height: 302px;"> -->
        <div class="vld-parent">
          <table class="table-list">
            <colgroup>
              <col style="width: 30px;">
              <col style="width: 180px;">
              <col style="width: 180px;">
              <col style="width: 200px;">
              <col>
              <col style="width: 50px;">
              <col style="width: 100px;">
            </colgroup>
            <thead>
              <tr>
                <th><input @change="checkAll()" type="checkbox" name="checkAll" class="check-all" title="" v-model="isAll"></th>
                <th>Nucleotide Accession</th>
                <th>Protein Accession</th>
                <th>종명</th>
                <th>유전자 설명</th>
                <th>서열</th>
                <th>서열 길이</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in resultList" :key="row.argId">
                <td><input type="checkbox" v-model="argIdList" class="check-select" :value="row.argId"  ></td>
                <td>{{ row.accession }}</td>
                <td>{{ row.protAcc }}</td>
                <td>{{ row.name }}</td>
                <td>{{ row.geneDesc }}</td>
                <td><a @click="gotoSeq(row.seq)" class="a-link pointer">서열</a></td>
                <td class="text-right">{{ row.length | money}}</td>
              </tr>
            </tbody>
          </table>
          <Pagination @changePageIndex="changePageIndex"></Pagination>
          <spinner :isLoading="isLoading" :isFullPage="isFullPage"></spinner>                  
        </div>

        <table class="table-view">
          <colgroup>
            <col style="width: 167px;">
            <col>
            <col>
            <col>
            <col>
          </colgroup>
          <tbody>
            <tr>
              <th rowspan="2" class="th-title">서열 클러스터링<br>옵션</th>
              <th>서열간 최소 identity (%)</th>
              <td class="td-components"><input v-model="params.clMinIdnty" type="text" title="" class="form-control text-right"></td>
              <th>클러스터별 최소 coverage</th>
              <td class="td-components"><input v-model="params.clMinCvrg" type="text" title="" class="form-control text-right"></td>
            </tr>
            <tr>
              <th>클러스터별 최소 서열 수</th>
              <td class="td-components"><input v-model="params.clMinSqc" type="text" title="" class="form-control text-right"></td>
              <th>최소 서열 길이 (bp)</th>
              <td class="td-components"><input v-model="params.clMinSlen" type="text" title="" class="form-control text-right"></td>
            </tr>
            <tr>
              <th class="th-title">보존영역 탐색 옵션</th>
              <th>보존 영역 최소 서열 길이 (bp)</th>
              <td class="td-components"><input v-model="params.csMinSlen" type="text" title="" class="form-control text-right"></td>
              <th>보존 영역 내 최소 identity(%)</th>
              <td class="td-components"><input v-model="params.csMinIdnty" type="text" title="" class="form-control text-right"></td>
            </tr>
          </tbody>
        </table>
        <div class="wrap-btn text-right mT-30">
          <button @click="onRun" title="Gene Search" class="btn btn-primary btn-radius btn-status deactivate" data-target="#sampleModal-notice" id="btnRun">Run</button>
        </div>
      </section>
      <modal-taxon-tree @taxontree:input="onTreeInput" :isMultiple="true"></modal-taxon-tree>
      <modal-alert :id="modalId" :message="message"></modal-alert>
      <modal-sequence :seq="seq"></modal-sequence>
    </div>
  
</template>

<script>
import { mapGetters} from 'vuex'
import Pagination from '@/components/Pagination.vue'
import PageUnit from '@/components/PageUnit.vue'
import Spinner from '@/components/Spinner.vue'
import PaginationAndListMixin from '@/mixins/PaginationAndListMixin.js'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import ModalTaxonTree from '@/components/ModalTaxonTree.vue'
import ModalAlert from '@/components/ModalAlert.vue'

export default {
  name: 'AnalysisRegister',
  components: {
    Pagination,
    PageUnit,
    Spinner,  
    vSelect,
    ModalTaxonTree,
    ModalAlert,
  },
  data() {
    return {
      isInValid: false,
      modalId: '0',
      message: '',
      isSearch: false,
      isLoading: false,
      taxonList: [],
      argIdList: [],
      isAll: false,
      isFullPage: false,
      seq: '',
      isAllSelect: false,  //전체선택 버튼
      searchAbId: ''

    }
  },

  mixins: [PaginationAndListMixin],

  created() {
    //페이징 및 결과 리스트를 초기화 한다.
    let data = {
      resultList:[],
      paginationInfo:{totalRecordCount:0}
    }
    this.$store.commit('updatePaginationAndList', data)

    // //항생제 계열
    // this.$store.dispatch('loadAbcList')

    //항생제명
    this.params.submitType = ''

    this.params.clMinIdnty = 70
    this.params.clMinCvrg = 60
    this.params.clMinSqc = 3
    this.params.clMinSlen = 100
    this.params.csMinSlen = 100
    this.params.csMinIdnty = 97

  },
 
  computed: {
    ...mapGetters(['comboAbList', 'comboAnalysisArcList', 'comboArtpList', 'genericList']),
  },
  mounted() {

  },
  watch: {
    comboAbList() {
      console.log('comboAbList', comboAbList)
    }
  },
  methods: {
    callbackPaginationAndList() {
        this.$store.dispatch('loadGenericList', {
            url: '/api/analysis/selectAnalysisSeqArgIdList.do',
            params: this.params,
            method: 'post'
        });      
    },

    //밸리데이션 펑션
    paginationAndListValidation() {
      this.message = ''
      this.isInValid = false

      if (!this.params.analNm) {
        this.message = "분석명을 입력해 주세요."
        this.isInValid = true
        return false
      }      

      if (!this.params.searchAbId) {
        this.message = "항생제명 선택해 주세요."
        this.isInValid = true
        return false
      }
      
      if (!this.params.searchArcId) {
        this.message = "Class를 선택해 주세요."
        this.isInValid = true
        return false
      }
      
      if (!this.params.searchArtpId) {
        this.message = "Subclass를 선택해 주세요."
        this.isInValid = true
        return false
      }
      
      if (this.params.taxonIdList.length == 0) {
        this.message = "종명을 선택해 주세요."
        this.isInValid = true
        return false
      }

      return true
    },

/*
    //항생제계열 값이 선택 되었을때 이벤트
    onInput(abcId) {
      if (abcId != null) {
        //항생제 내성 subclass 목록
        this.$store.dispatch('loadAbList', {
          params: {
            abcId: abcId
          }
        })      
      }
    },
*/

    //class 값이 선택 되었을때 이벤트
    onInputArc(arcId) {
      if (arcId != null) {
        //항생제 내성 subclass 목록
        this.$store.dispatch('loadArtpList', {
          params: {
            arcId: arcId
          }
        })      
      }
    },    

    //종선택 후 발생 이벤트
    onTreeInput(options) {
      this.taxonList = options.map(element => element.label).join(',')
      this.params.taxonIdList = options.map(element => element.id)
    },

    onRun() {
      if (this.argIdList.length <= 0) {
        this.message = '서열을 선택해 주세요.'
        $('#modal-alert').modal('toggle')
        return
      }

      this.params.nsqc = this.totalRecordCount
      this.params.argIdList = this.argIdList
      
      this.isFullPage = true
      this.isLoading = true
      this.$store.dispatch('updateOne', {
        url: '/api/analysis/runAnalysis.do',
        params: this.params
      }).then(() => {
        this.message = '분석이 요청 되었습니다.'
        this.modalId = '100'
        $('#modal-alert').modal('toggle')
        $('#modal-alert').on('hidden.bs.modal', e => {
          if (e.target.dataset.id === '100') {
            this.$store.dispatch('setParams', {})
            this.$router.go(-1)
          }
        })
      }).finally(() => this.isLoading = false) 
    },

    //체크 박스 모두 선택, 해제
    checkAll() {
      if (this.isAll) {
        if (this.resultList != null)
          this.argIdList = [...new Set(this.argIdList.concat(...this.resultList.map(element => element.argId)))]
          
      } else {  //id가 존재하면 제거 한다.
        this.argIdList = this.argIdList.filter(argId => {
          return !this.resultList.some(result => argId == result.argId)
        })
      }
    },


    //버튼 전체선택
    btnAll() {
      this.isAllSelect = !this.isAllSelect
      if (this.isAllSelect) {
        if (this.genericList)
          this.argIdList = this.genericList
          
      } else {  //id전체 제거
        this.argIdList = []
      }
    },

    onInputAb(abId) {
      console.log(abId)
      if (abId != null) {
        //항생제 내성 class 목록
        this.$store.dispatch('loadAnalysisArcList', {
          params: {
            abId: abId
          }
        })      
      }      
    },

    gotoSeq(seq) {
      this.seq = seq
      $('#modal-sequence').modal('toggle')

    }

  }
}
</script>
<style>
.pointer {
  cursor:pointer;
}
</style>
