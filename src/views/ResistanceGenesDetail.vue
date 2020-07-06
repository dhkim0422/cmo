<template>
    <div class="container">
      <section class="mT-60">
        <h3 class="h3 title-section mB-30"><img src="../images/arg-database-ico-s.png" alt="항생제 내성 유전자 (ARG)">항생제 내성 유전자 (ARG)</h3>
        <h4 class="h4 mB-20">{{ $route.params.protAcc }} 상세보기</h4>
        <div class="mB-20">
          <!-- D : 본 주석은 개발자를 위한 주석으로 개발 참고 후 삭제바랍니다.
                   배경색 있는 thead table 필요시 'table-thead' 클래스 추가
          -->

          <table class="table-view table-thead">
            <colgroup>
              <col style="width: 170px">
              <col>
            </colgroup>
            <thead>
              <tr>
                <th colspan="2" class="th-title">
                  <div class="row">
                    <div class="col-xs-12">
                      <span>항생제 내성 유전자 Class</span>
                      <button type="button" class="btn btn-default mL-15" data-toggle="modal" data-target="#modal-subclass">수정</button>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th class="th-title">Class</th>
                <td> {{ artp.arcNm }}</td>
              </tr>
              <tr>
                <th class="th-title">Subclass</th>
                <td> {{ artp.artp }}</td>
              </tr>
              <tr>
                <th class="th-title">Subclass 상세설명</th>
                <td>{{ artp.arcDesc }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mB-20">
          <table class="table-view table-thead">
            <thead>
              <tr>
                <th class="th-title">종명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td v-text="artp.taxonNm"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mB-20" v-if="artp.submitType === 'USER' && artp.userTaxonId != null">
          <table class="table-view table-thead">
            <colgroup>
              <col style="width: 170px">
              <col>
            </colgroup>
            <thead>
              <tr>
                <th colspan="2" class="th-title">
                  <div class="row">
                    <div class="col-xs-6">
                      <span>유전자 정보 제안</span>
                      <button @click="onUser" type="button" class="btn btn-default mL-15" title="확인">확인</button>
                    </div>
                    <!--
                    <div class="col-xs-6 text-right text-primary pT-5">
                      <i class="xi-info"><span class="sr-only">Customized</span></i>
                      <span>Customized</span>
                    </div>                   
                    -->   
                  </div>
                </th>
              </tr>
            </thead>
           
            <tbody>
              <tr>
                <th class="th-title">종명</th>
                <td>{{ artp.userTaxonNm }}</td>
              </tr>
              <tr>
                <th class="th-title">유전자 설명</th>
                <td>{{ artp.userGeneDesc }}</td>
              </tr>
              <tr>
                <th class="th-title">Subclass</th>
                <td>{{ artp.userArtp }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mB-20">
          <table class="table-view table-thead">
            <thead>
              <tr>
                <th class="th-title">내성 항생제</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ artp.ab }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mB-20">
          <table class="table-view table-thead">
            <thead>
              <tr>
                <th class="th-title">관련 질병</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ artp.dsName }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mB-20">
          <table class="table-view table-thead">
            <colgroup>
              <col style="width: 60px">
              <col style="width: 310px">
              <col style="width: 220px">
              <col>
            </colgroup>
            <thead>
              <tr>
                <th colspan="4" class="th-title">
                  <div class="row">
                    <div class="col-xs-6">
                      <span>유전자 기능 주석 (GO)</span>
                      <button @click="argGoAnnotList.push({})" type="button" class="btn btn-default mL-15" title="추가">추가</button>
                      <button @click="deleteArgGoAnnot" type="button" class="btn btn-default" title="추가">삭제</button>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(argGoAnnot, index) in argGoAnnotList" :key="argGoAnnot.goId">
                <th class="text-center"><input type="checkbox" v-model="chkComment" title="" :value="index"></th>
                <td class="td-components">
                  <select class="form-control" v-model="argGoAnnot.goType" @change="onChangeGoType(argGoAnnot, index)">
                    <option value="">선택</option>
                    <option value="bp">Biological process</option>
                    <option value="mf">Molecular function</option>
                    <option value="cc"> Cellular component</option>
                  </select>
                </td>
                <td colspan="2" class="td-components">
                  <vSelect
                    v-model="argGoAnnot.goId"
                    :getOptionLabel="getOptionLabel"
                    :options="initSelectedGoAnnotList(argGoAnnot.goType, index)"
                    :reduce="option => option.goId"
                  ></vSelect>                  
                </td>
                <!-- <td class="td-components"><input type="text" class="form-control" v-model="comment.goAnnot.goDesc" readonly></td> -->
              </tr>
            </tbody>
          </table>
        </div>

        <!-- D : 본 주석은 개발자를 위한 주석으로 개발 참고 후 삭제바랍니다.
                 td+th border-right 점선 아닌 실선으로 하는 방법 table에 'table-td-exept' class 추가
        -->
        <div class="mB-20">
          <table class="table-view table-thead table-td-exept">
            <colgroup>
              <col style="width: 180px;">
              <col>
              <col>
              <col>
              <col>
              <col>
            </colgroup>
            <thead>
              <tr>
                <th colspan="6" class="th-title">샘플정보</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th class="th-title">수집기관</th>
                <td>{{ argMeta.institute }}</td>
                <th class="th-title">숙주</th>
                <td>{{ argMeta.host }}</td>
                <th class="th-title">조직</th>
                <td>{{ argMeta.tissue }}</td>
              </tr>
              <tr>
                <th class="th-title">국가(지역)</th>
                <td>{{ argMeta.country }}</td>
                <th class="th-title">시료 채취 출처</th>
                <td colspan="3">{{ argMeta.isolation }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- D : 본 주석은 개발자를 위한 주석으로 개발 참고 후 삭제바랍니다.
                 서열정보 표기시 class="font-family-courier" 추거해주세요!
        -->
        <div class="mB-20">
          <table class="table-view table-thead table-td-exept">
            <colgroup>
              <col style="width: 180px;">
              <col>
              <col>
              <col>
              <col>
            </colgroup>
            <thead>
              <tr>
                <th colspan="5" class="th-title">서열정보</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th class="th-title">유전자 설명</th>
                <td colspan="4">{{ argSeqGeneDesc }}</td>
              </tr>
              <tr>
                <th class="th-title" rowspan="2">Nucleotide<br>서열 정보</th>
                <th>Accession</th>
                <td>{{ argSeqNuclAccession }}</td>
                <th>서열 길이 (bp)</th>
                <td>{{ nuclSeqLength }}</td>
              </tr>
              <!--       
              <tr>
                <th class="th-title" rowspan="3">Nucleotide<br>서열 정보 </th>
                <th>Accession</th>
                <td colspan="3">{{ argSeqNuclAccession }}</td>
              </tr>
              <tr>
                <th>서열 길이 (bp)</th>
                <td>{{ nuclSeqLength }}</td>
                <th>위치 정보</th>
                <td>{{ nuclPosition }}</td>
              </tr>
              -->
              <tr>
                <td colspan="4" class="font-family-courier" v-html="$options.filters.htmlSeqFormat(nuclSeq)"></td>
              </tr>

              <tr>
                <th class="th-title" rowspan="2">Protein<br>서열 정보</th>
                <th>Accession</th>
                <td>{{ argSeqProteinAccession }}</td>
                <th>서열 길이 (bp)</th>
                <td>{{ protSeqLength }}</td>
              </tr>
              <tr>
                <td colspan="4" class="font-family-courier" v-html="$options.filters.htmlSeqFormat(protSeq)"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="wrap-btn text-right mB-120">
          <button @click="$router.go(-1)" type="button" title="Cancel" class="btn btn-primary-border btn-radius mR-20">Cancel</button>
          <button @click="putResistanceGene" type="button" title="Save" class="btn btn-primary btn-radius">Save</button>
        </div>

      </section>
      <modal-subclass @modal-subclass:input="onSubclass"></modal-subclass>
      <modal-alert :message="message"></modal-alert>
      
    </div>
  
</template>

<script>
import { mapGetters} from 'vuex'
import ModalSubclass from '@/components/ModalSubclass.vue'
import vSelect from 'vue-select'
import ModalAlert from '@/components/ModalAlert.vue'
// import 'vue-select/dist/vue-select.css'

export default {
  name: 'ResistanceGenesDetail',
  components: {
    ModalSubclass,
    vSelect,
    ModalAlert,
  },
  data() {
    return {
      chkComment: [],
      commentsGoList: {},
      mfList: [], //유전자 기능 주석 Biological process
      ccList: [], //유전자 기능 주석 Molecular function
      bpList: [], //유전자 기능 주석 Cellular component
      detailParams: {},
      message: '',
    }
  },
  created() {
    
    this.$store.dispatch('loadOne', {
      url: '/api/database/selectArtp.do',
      params: {
        artpId: this.$route.params.artpId,
        argId: this.$route.params.argId,
      }
    })

    //유전자 기능 주석
    this.$store.dispatch('loadGoAnnotList')

    //유전자 기능 주석 목록 초기화
    this.initGoAnnotList()

    //항생제 내성 class 목록
    this.$store.dispatch('loadArcList')
    
  },
  watch: {
    // goAnnotList값이 변경 되면
    goAnnotList(newGoAnnotList) {
      this.initGoAnnotList()
    },
  },  
  computed: {
    ...mapGetters(['result', 'goAnnotList', 'comboArcList']),
    artp() {
      return this.result.artp == null ? {} : this.result.artp
    },
    argMeta() {
      return this.result.argMeta == null ? {} : this.result.argMeta
    },
    argSeq() {
      return this.result.argSeq == null ? [] : this.result.argSeq
    },
    argGoAnnotList() {
      return this.result.argGoAnnotList == null ? [] : this.result.argGoAnnotList
    },

    argSeqProteinAccession() {
      return this.isArgSeq() ? '' : this.result.argSeq[0].proteinAccession
    },
    argSeqNuclAccession() {
      return this.isArgSeq() ? '' : this.result.argSeq[0].nuclAccession
    },
    argSeqGeneDesc() {
      return this.isArgSeq() ? '' : this.result.argSeq[0].geneDesc
    },
    //Nucleotide 길이
    nuclSeqLength() {
      return this.isArgSeq() ? '' : this.result.argSeq.map(e => e.nuclSeq).join('').length
    },
    //Nucleotide 서열
    nuclSeq() {
      return this.isArgSeq() ? '' : this.result.argSeq.map(e => e.nuclSeq).join('')
    },
    //Nucleotide position
    nuclPosition() {
      return this.isArgSeq() ? '' :
      this.result.argSeq.map(e => {
        return `${e.nuclStart} .. ${e.nuclEnd} (${e.nuclStrand === 1 ? '+' : '-'})`    
      }).join(',')
    },
    //protain 길이
    protSeqLength() {
      return this.isArgSeq() ? '' : this.result.argSeq[0].protSeq.length
    },
    //protain 서열
    protSeq() {
      return this.isArgSeq() ? '' : this.result.argSeq[0].protSeq
    },    

  },
  mounted() {
  },
  
  methods: {
    isArgSeq() {
      return this.result.argSeq == null || this.result.argSeq.length === 0
    },
    deleteArgGoAnnot() {
      let result = this.chkComment.sort((a, b) => b - a)
      result.forEach((element) => {
        this.argGoAnnotList.splice(element, 1)
      });
      this.chkComment = []           
    },
    getOptionLabel(option) {
     return `${option.goAcc} ${option.goDesc}`
    },
    initSelectedGoAnnotList(goType, index) {
      if (goType === 'mf')
        this.commentsGoList[index] = this.mfList
      if (goType === 'cc')
        this.commentsGoList[index] = this.ccList
      if (goType === 'bp')
        this.commentsGoList[index] = this.bpList

      return this.commentsGoList[index]
    },
    onChangeGoType(comment, index) {
      if (comment.goType === 'mf')
        this.commentsGoList[index] = this.mfList
      if (comment.goType === 'cc')
        this.commentsGoList[index] = this.ccList
      if (comment.goType === 'bp')
        this.commentsGoList[index] = this.bpList

      comment.goId = null
      
    },
    initGoAnnotList() {
      this.mfList = this.goAnnotList.filter(goAnnot => goAnnot.goType === 'mf');
      this.ccList = this.goAnnotList.filter(goAnnot => goAnnot.goType === 'cc');
      this.bpList = this.goAnnotList.filter(goAnnot => goAnnot.goType === 'bp');
    },

    async putResistanceGene() {
      let params = {
        artpId: this.artp.artpId,
        argId: this.artp.argId,
        bioentryId: this.artp.bioentryId,
        geneDesc: this.artp.geneDesc,
        argGoAnnotList: this.argGoAnnotList.map(argGoAnnot => argGoAnnot.goId),

      }
      await this.$axios.post("/api/database/updateArg.do", params)
      this.message = '저장 되었습니다.'
      $('#modal-alert').modal('toggle')
    },

    onSubclass(selected) {
      this.result.artp.artpId = selected.artpId
      this.result.artp.artp = selected.artp
      this.result.artp.arcDesc = selected.arcDesc      
      this.result.artp.arcNm = selected.arcNm      
    },

    //사용자 정보 제안 클릭 시
    onUser() {
      this.artp.artpId = this.artp.userArtpId
      this.artp.artp = this.artp.userArtp
      this.artp.arcDesc = this.artp.userArcDesc
      this.artp.bioentryId = this.artp.userBioentryId
      this.artp.taxonNm = this.artp.userTaxonNm
      this.artp.dsName = this.artp.userDsName
      this.artp.geneDesc = this.artp.userGeneDesc

      if (this.result.argSeq[0])
        this.result.argSeq[0].geneDesc = this.artp.userGeneDesc
      
    }

  }
}
</script>

