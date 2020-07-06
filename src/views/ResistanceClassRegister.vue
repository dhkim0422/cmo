<template>
    <div class="container">
      <section class="mT-60">
        <h3 class="h3 title-section mB-30"><img src="../images/arg-database-ico-s.png" alt="항생제 내성 유전자 class (ARC)">항생제 내성 유전자 class (ARC)</h3>
        <h4 class="h4 mB-20">항생제 내성 Subclass 등록 </h4>
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
                    <div class="col-xs-6">
                      <span>항생제 내성 유전자 class</span>
                      <button data-toggle="modal" data-target="#modal-class" type="button" class="btn btn-default mL-15" title="추가">추가</button>
                      <button @click="deleteArc" type="button" class="btn btn-default" title="삭제">삭제</button>
                    </div>
                  </div>
                </th>
              </tr>              
            </thead>
            <tbody>
              <tr>
                <th class="th-title required">Class</th>
                <td class="td-components">
                  <input type="text" class="form-control" v-model="arc.arcNm" :readonly="arcReadonly">
                </td>
              </tr>
              <tr>
                <th class="th-title required">Subclass</th>
                <td class="td-components">
                  <input type="text" class="form-control" v-model="arc.artp">
                </td>
              </tr>              
              <tr>
                <th class="th-title">상세설명</th>
                <td class="td-components">
                  <input type="text" class="form-control" v-model="arc.arcDesc" :readonly="arcReadonly">
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mB-20">
          <table class="table-view table-thead">
            <colgroup>
              <col style="width: 60px">
              <col style="width: 200px">
              <col>
            </colgroup>
            <thead>
              <tr>
                <th colspan="3" class="th-title">
                  <div class="row">
                    <div class="col-xs-6">
                      <span>내성 항생제</span>
                      <button data-toggle="modal" data-target="#modal-antibiotic" type="button" class="btn btn-default mL-15" title="추가">추가</button>
                      <button @click="deleteAntiBiotic" type="button" class="btn btn-default" title="추가">삭제</button>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(antiBiotic, index) in arcAbList" :key="antiBiotic.abId">
                <th class="text-center"><input type="checkbox" v-model="chkAntBiotic" title="" :value="index"></th>
                <td>{{ antiBiotic.ab }}</td>
                <td>{{ antiBiotic.abDesc }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="wrap-btn text-right mB-120">
          <button @click="$router.go(-1)" type="button" title="Cancel" class="btn btn-primary-border btn-radius mR-20">Cancel</button>
          <button @click="onSave" type="button" title="Save" class="btn btn-primary btn-radius">Save</button>
        </div>

      </section>
      <modal-class @modal-class:input="onClass"></modal-class>
      <modal-antibiotic @modal-antibiotic:input="onAntibiotic"></modal-antibiotic>
      <modal-alert :id="modalId" :message="message"></modal-alert>
    </div>
  
</template>

<script>
import { mapGetters} from 'vuex'
import ModalAntibiotic from '@/components/ModalAntibiotic.vue'
import ModalClass from '@/components/ModalClass.vue'
import ModalAlert from '@/components/ModalAlert.vue'

export default {
  name: 'ResistanceClassRegister',
  components: {
    ModalAntibiotic,
    ModalClass,
    ModalAlert,
  },
  data() {
    return {
      arc: {
        arcId: '',
        arcNm: '',
        artp: '',
        arcDesc: ''
      },
      arcReadonly: false,
      arcAbList: [],
      chkAntBiotic: [],
      modalId: '0',
      message: '',      
    }
  },
  created() {
    //항생제 내성 class 목록
    this.$store.dispatch('loadArcList')
  },
 
  computed: {
    ...mapGetters(['comboArcList', 'comboArtpList']),
  },
  mounted() {
  },
  
  methods: {
    deleteAntiBiotic() {
      let result = this.chkAntBiotic.sort((a, b) => b - a)
      result.forEach((element) => {
        this.antiBiotics.splice(element, 1)
      });
      this.chkAntBiotic = []    
    },

    onAntibiotic(antiBiotics) {
      antiBiotics.forEach(element => {
      if (!this.arcAbList.some(item => item.abId === element.abId))
        this.arcAbList.push(element)
      })
    },

    onClass(selectedClass) {
      this.arc.arcId = selectedClass.arcId
      this.arc.arcNm = selectedClass.arcNm
      this.arc.arcDesc = selectedClass.arcDesc

      //모달에서 class를 선택한 경우 수정 불가
      this.arcReadonly = true
    },

    deleteArc() {
      this.arc = {
        arcId: '',
        arcNm: '',
        artp: '',
        arcDesc: ''        
      }

      //삭제 버튼 클릭시 수정 가능
      this.arcReadonly = false
    },

    onSave() {
      if (this.isValidator()) {
        let params = {
          arcId: String(this.arc.arcId),
          arcNm: this.arc.arcNm,
          artp: this.arc.artp,
          arcDesc: this.arc.arcDesc,
          arcAbList: this.arcAbList,
        }

        this.$store.dispatch('updateOne', {
          url: '/api/database/insertArc.do',
          params: params
        }).then(() => {
          this.message = '저장 되었습니다.'
          this.modalId = '100'
          $('#modal-alert').modal('toggle')
          $('#modal-alert').on('hidden.bs.modal', e => {
            if (e.target.dataset.id === '100') {
              this.$store.dispatch('setParams', {})
              this.$router.go(-1)
            }
          })
        }) 
      }
    },

    isValidator() {
      this.modalId = '0'

      if (!this.arc.arcNm) {
        this.message = 'Class를 입력해 주세요.'
        $('#modal-alert').modal('toggle')
        return false
      }

      if (!this.arc.artp) {
        this.message = 'Subclass를 입력해 주세요.'
        $('#modal-alert').modal('toggle')
        return false
      }

      return true
    }    
  }
}
</script>

