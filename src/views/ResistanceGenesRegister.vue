<template>
    <div class="container">
      <section class="mT-60">
        <h3 class="h3 title-section mB-30"><img src="../images/arg-database-ico-s.png" alt="항생제 내성 유전자 (ARG)">항생제 내성 유전자 (ARG)</h3>
        <h4 class="h4 mB-20">항생제 내성 유전자 신규 등록 </h4>
        <div class="mB-20">
          <table class="table-view table-thead">
            <thead>
              <tr>
                <th class="th-title">
                  <span class="required">출처</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="td-components">
                  <select class="form-control" v-model="arg.submitType">
                    <option value="USER">Local</option>
                    <option value="NCBI">NCBI</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mB-20">
          <table class="table-view table-thead">
            <thead>
              <tr>
                <th colspan="2" class="th-title">
                  <span class="required">항생제 내성 class</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="td-components">
                  <vSelect
                    v-model="selectedArc"
                    label="arcNm"
                    :options="comboArcList"
                    :reduce="option => option"
                    @input="onInput"
                  ></vSelect>
                </td>
                <td class="td-components">
                  <vSelect
                    v-model="arg.artpId"
                    label="artp"
                    :options="comboArtpList"
                    :reduce="option => option.artpId"
                    resetOnOptionsChange
                  ></vSelect>                  
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mB-20">
          <table class="table-view table-thead">
            <thead>
              <tr>
                <th class="th-title">항생제 내성 Class 상세 설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {{ selectedArc != null ? selectedArc.arcDesc : '' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-show="arg.submitType === 'USER'">
          <div class="mB-20">
            <table class="table-view table-thead">
              <thead>
                <tr>
                  <th class="th-title">
                    <span class="required">유전자명</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="td-components"><input type="text" class="form-control" v-model="arg.geneNm"></td>
                </tr>
              </tbody>
            </table>
          </div>   
          <div class="mB-20">
            <table class="table-view table-thead">
              <thead>
                <tr>
                  <th class="th-title">유전자 설명</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="td-components"><input type="text" class="form-control" v-model="arg.geneDesc"></td>
                </tr>
              </tbody>
            </table>
          </div>  
          <div class="mB-20">
            <table class="table-view table-thead">
              <thead>
                <tr>
                  <th class="th-title">
                    <span class="required">서열</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="td-components font-family-courier"><textarea class="form-control" v-model="arg.sequence"></textarea></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="mB-20">
            <modal-taxon-tree @taxontree:input="onTreeInput"></modal-taxon-tree>
            <table class="table-view table-thead">
              <colgroup>
                <col style="width: 180px">
                <col>
              </colgroup>
              <thead>
                <tr>
                  <th colspan="7" class="th-title">샘플정보 등록</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th class="th-title"><span class="required">종명</span> <button type="button" class="btn icon-btn" data-toggle="popover" data-placement="right" data-content="NCBI 에 등록된 종만 등록가능합니다."><i class="xi-help"></i></button></th>
                  <td colspan="6">
                    <div class="row">
                      <div class="col-xs-12">
                        <div class="form-inline">
                          <input type="text" class="form-control" style="min-width: 500px;" v-model="taxonNm" readonly>
                          <button type="button" class="btn btn-default mL-15" data-toggle="modal" data-target="#modalTaxonTree">종 선택</button>
                        </div>
                      </div>
                    </div>                  
                  </td>
                </tr>
                <tr>
                  <th class="th-title">수집기관</th>
                  <td colspan="6" class="td-components"><input type="text" class="form-control" v-model="arg.institute"></td>
                </tr>
                <tr>
                  <th class="th-title">숙주</th>
                  <td colspan="6" class="td-components"><input type="text" class="form-control" v-model="arg.host"></td>
                </tr>
                <tr>
                  <th class="th-title">조직</th>
                  <td colspan="6" class="td-components"><input type="text" class="form-control" v-model="arg.tissue"></td>
                </tr>
                <tr>
                  <th class="th-title">국가(지역)</th>
                  <td colspan="6" class="td-components"><input type="text" class="form-control" v-model="arg.country"></td>
                </tr>
                <tr>
                  <th class="th-title">시료 채취 출처</th>
                  <td colspan="6" class="td-components"><input type="text" class="form-control" v-model="arg.isolation"></td>
                </tr>
                <tr>
                  <th class="th-title">
                    CDS 영역
                    <button type="button" class="btn icon-btn" data-toggle="popover" data-placement="right" data-content="Start와 End 항목은 숫자만 입력해주십시오. 별도의 값이 등록되지 않은 경우 Start는 1, End는 서열 길이 값으로 등록됩니다. End 값이 최종 서열 길이보다 큰 경우에는 서열 길이로 자동 수정됩니다."><i class="xi-help"></i></button>
                  </th>
                  <td class="td-components td-title">시작위치</td>
                  <td class="td-components"><input type="text" class="form-control" v-model="arg.cdsStart"></td>
                  <td class="td-components td-title">종료위치</td>
                  <td class="td-components"><input type="text" class="form-control" v-model="arg.cdsEnd"></td>
                  <td class="td-components td-title">서열 방향성</td>
                  <td class="td-components">
                    <select class="form-control" v-model="arg.cdsStrand">
                      <option value="1">+ (정방향)</option>
                      <option value="-1">- (역방향)</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>           
        </div>
        <div v-show="arg.submitType === 'NCBI'">
          <div class="mB-20">
            <table class="table-view table-thead">
              <thead>
                <tr>
                  <th class="th-title">
                    <span class="required">Genbank</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="td-components">
                    <!--
                    <input type="file" class="form-control">
                    -->
                    <file-pond
                            name="genebank"
                            ref="pond"
                            class-name="my-pond"
                            label-idle="파일을 마우스로 끌어놓으세요. 또는  <a class='pointer'>찾아보기</a>"
                            allow-multiple="false"
                            max-files="1"
                            max-file-size="5MB"
                            v-model="genebankFileList"
                            :server="server"
                            allowRevert="true"
                            />                    
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!--
          <div class="mB-20">
            <table class="table-view table-thead">
              <thead>
                <tr>
                  <th class="th-title">
                    <span class="required">Protein accession</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="td-components">
                    <input type="text" class="form-control" v-model="arg.protAcc">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>          
          -->
        </div>
        
        <div class="mB-20">
          <table class="table-view table-thead">
            <colgroup>
              <col style="width: 60px">
              <col style="width: 310px">
              <col style="width: 180px">
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
        <div class="wrap-btn text-right mB-120">
          <button @click="$router.go(-1)" type="button" title="Cancel" class="btn btn-primary-border btn-radius mR-20">Cancel</button>
          <button @click="onSave" type="button" title="Save" class="btn btn-primary btn-radius">Save</button>
        </div>
      </section>
      <modal-alert :id="modalId" :message="message"></modal-alert>
    </div>
</template>
<script>
import { mapGetters} from 'vuex'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import ModalTaxonTree from '@/components/ModalTaxonTree.vue'

// Import FilePond
import vueFilePond, {setOptions} from 'vue-filepond';

// Import plugins
// import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js';
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size/dist/filepond-plugin-file-validate-size.esm.js';

// Import styles
import 'filepond/dist/filepond.min.css';
// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

import ModalAlert from '@/components/ModalAlert.vue'

export default {
  name: 'ResistanceGenesRegister',
  components: {
    vSelect,
    ModalTaxonTree,
    FilePond: vueFilePond(FilePondPluginFileValidateSize),
    ModalAlert,
  },
  data() {
    return {
      arg: {
        submitType: 'USER',
        geneNm: '',
        geneDesc: '',
        sequence: '',
        taxonId: '',
        institute: '',
        host: '',
        tissue: '',
        country: '',
        isolation: '',
        genebankFile: '',
        cdsStart: 1,
        cdsEnd: 1,
        cdsStrand: '1',
        protAcc: '',
      },
      modalId: '0',
      message: '',
      selectedArc: null,
      selectedArtp: null,
      argGoAnnotList: [],
      chkComment: [],
      commentsGoList: {},
      mfList: [], //유전자 기능 주석 Biological process
      ccList: [], //유전자 기능 주석 Molecular function
      bpList: [], //유전자 기능 주석 Cellular component
      taxonNm: '',
      genebankFileList: [],
      /**
       * file fond 처리
       * process: 업로드 할때
       * revert: 삭제 할때
       */
      server: {
        process: {
          url: `${process.env.VUE_APP_CONTEXT}/api/fileMng/gbk/uploadArgGenebank.do`,
          method: 'POST',
          timeout: 7000,
        },       
        revert: {
          url: `${process.env.VUE_APP_CONTEXT}/api/fileMng/deleteArgGenebank.do`,
          headers: {'Content-Type': 'application/json'},
          method: 'POST'
        }, 
      },      
    }
  },
  watch: {
    // goAnnotList값이 변경 되면
    goAnnotList(newGoAnnotList) {
      this.initGoAnnotList()
    },
    sequence() {
      this.arg.cdsEnd = this.sequenceLength
    }
  },  
  created() {
    // server="/argene/api/common/uploadArgGenebank.do"
    //항생제 내성 class 목록
    this.$store.dispatch('loadArcList')

    //유전자 기능 주석
    this.$store.dispatch('loadGoAnnotList')    
    this.initGoAnnotList()

  },

  mounted() {
    this.$nextTick(() => {
      $('[data-toggle="popover"]').popover();
    })
  },

  computed: {
    ...mapGetters(['comboArcList', 'comboArtpList', 'result', 'goAnnotList']),
    sequence() {
      return this.arg.sequence
    },   
    sequenceLength() {
      if (this.sequence.indexOf('>') >= 0)
        if (this.sequence.indexOf('\n') >= 0) {
          let sequence = this.sequence.substring(this.sequence.indexOf('\n'))
          return sequence.replace(/\n/g,'').length
        } else
          return 0
      else 
        return this.sequence.length
    },    
  },

  methods: {
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
    onInput(option) {
      if (option != null) {
        console.log('option', option)
        //항생제 내성 subclass 목록
        this.$store.dispatch('loadArtpList', {
          params: {
            arcId: option.arcId
          }
        })      
      }
    },   
    //종선택 후 발생 이벤트
    onTreeInput(option) {
      this.arg.taxonId = option.id
      this.taxonNm = option.label
    },

    //Save 버튼 클릭 이벤트
    onSave() {
      if (this.isValidator()) {
        this.arg.argGoAnnotList = this.argGoAnnotList.map(e => e.goId)
        this.arg.genebankFile = this.genebankFileList.map(e => e.serverId).join()
        this.$store.dispatch('updateOne', {
          url: '/api/database/insertArg.do',
          params: this.arg
        }).then(() => {
          this.message = '저장 되었습니다.'
          this.modalId = '100'
          $('#modal-alert').modal('toggle')
          $('#modal-alert').on('hidden.bs.modal', e => {
            if (e.target.dataset.id === '100')
              this.$router.go(-1)
          })
        }) 

      }
    },

    isValidator() {
      this.modalId = '0'

      if (!this.arg.submitType) {
        this.message = '등록 데이터 종류를 입력해 주세요.'
        $('#modal-alert').modal('toggle')
        return false
      }

      if (!this.arg.artpId) {
        this.message = '항생제 내성 class를 입력해 주세요.'
        $('#modal-alert').modal('toggle')
        return false
      }

      //사용자 데이터 등록
      if (this.arg.submitType == 'USER') {
        if (!this.arg.geneNm) {
          this.message = '유전자명을 입력해 주세요..'
          $('#modal-alert').modal('toggle')
          return false
        }      
  
        if (!this.arg.sequence) {
          this.message = '서열을 입력해 주세요..'
          $('#modal-alert').modal('toggle')
          return false
        }    
  
        if (!this.arg.taxonId) {
          this.message = '종을 선택해 주세요.'
          $('#modal-alert').modal('toggle')
          return false
        }

      //NCBI genbank
      } else if (this.arg.submitType == 'NCBI') {
        if (!this.genebankFileList.map(e => e.serverId).join()) {
          this.message = 'Genbank 파일을 첨부해 주세요.'
          $('#modal-alert').modal('toggle')
          return false
        }      
  
        // if (!this.arg.protAcc) {
        //   this.message = 'Protein accession을 입력해 주세요.'
        //   $('#modal-alert').modal('toggle')
        //   return false
        // }       
      }

      

      


      return true
    },
  }
}
</script>


<style>
.pointer {
  cursor: pointer;
}
</style>