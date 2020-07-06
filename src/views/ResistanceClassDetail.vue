<template>
    <div class="container">
      <section class="mT-60">
        <h3 class="h3 title-section mB-30"><img src="../images/arg-database-ico-s.png" alt="항생제 내성 유전자 class (ARC)">항생제 내성 유전자 class (ARC)</h3>
        <h4 class="h4 mB-20">{{ arc.arcNm }} 상세보기</h4>
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
                      <!-- <button data-toggle="modal" data-target="#modal-subclass" type="button" class="btn btn-default mL-15" title="수정">수정</button> -->
                    </div>
                  </div>
                </th>
              </tr>              
            </thead>
            <tbody>
              <tr>
                <th class="th-title">Class</th>
                <td> {{ arc.arcNm }} </td>
              </tr>
              <tr>
                <th class="th-title">Subclass</th>
                <td class="td-components">
                  <input type="text" class="form-control" v-model="arc.artp">
                </td>
              </tr>              
              <tr>
                <th class="th-title">상세설명</th>
                <td class="td-components">
                  <input type="text" class="form-control" v-model="arc.arcDesc">
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
                <td><a @click="gotoAntiBiotic(antiBiotic)" class="a-link pointer">{{ antiBiotic.ab }}</a></td>
                <td>{{ antiBiotic.abDesc }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mB-20">
          <table class="table-view table-thead">
            <colgroup>
              <col style="width: 160px">
              <col>
            </colgroup>
            <thead>
              <tr>
                <th colspan="2" class="th-title">
                  <div class="row">
                    <div class="col-xs-12">
                      <span>연관된 항생제 내성 유전자 (ARGs)</span>
                      <button @click="isArtp=!isArtp" type="button" class="btn btn-default mL-15">{{ isArtp ? '숨기기' : '보이기' }}</button>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-show="isArtp" v-for="row in resistanceClassGeneList" :key="row.argId">
                <td><a @click="gotoArtpDetail(row)" class="a-link pointer">{{ row.protAcc }}</a></td>
                <td>{{ row.geneDesc }}</td>
              </tr>
            </tbody>
          </table>
        </div>        

        <div class="wrap-btn text-right mB-120">
          <button @click="$router.go(-1)" type="button" title="Cancel" class="btn btn-primary-border btn-radius mR-20">Cancel</button>
          <button @click="onSave" type="button" title="Save" class="btn btn-primary btn-radius">Save</button>
        </div>

      </section>
      <modal-antibiotic @modal-antibiotic:input="onAntibiotic"></modal-antibiotic>
      <modal-alert :id="modalId" :message="message"></modal-alert>
    </div>
  
</template>

<script>
import { mapGetters} from 'vuex'
import ModalAntibiotic from '@/components/ModalAntibiotic.vue'
import ModalAlert from '@/components/ModalAlert.vue'

export default {
  name: 'ResistanceClassDetail',
  components: {
    ModalAntibiotic,
    ModalAlert,
  },
  data() {
    return {
      antiBiotics: [],
      chkAntBiotic: [],
      isArtp: true,
      modalId: '0',
      message: '',
    }
  },
  created() {
    this.$store.dispatch('loadOne', {
      url: '/api/database/selectResistanceClass.do',
      params: {
        arcId: this.$route.params.arcId,
        artpId: this.$route.params.artpId
      }
    })

    //항생제 내성 class 목록
    this.$store.dispatch('loadArcList')

    //연관된 항생제 내성 유전자 (ARGs)
    this.$store.dispatch('loadResistanceClassGeneList', {
      params: {
        artpId: this.$route.params.artpId
      }
    })
  },
 
  computed: {
    ...mapGetters(['result', 'comboArcList', 'comboArtpList', 'resistanceClassGeneList']),
    arc() {
      return this.result.arc == null ? {} : this.result.arc
    },
    arcAbList() {
      return this.result.arcAbList == null ? [] : this.result.arcAbList
    }
  },
  mounted() {
  },
  
  methods: {
    deleteAntiBiotic() {
      let result = this.chkAntBiotic.sort((a, b) => b - a)
      result.forEach((element) => {
        this.arcAbList.splice(element, 1)
      });
      this.chkAntBiotic = []      
    },

    onAntibiotic(antiBiotics) {
      antiBiotics.forEach(element => {
      if (!this.arcAbList.some(item => item.abId === element.abId))
        this.arcAbList.push(element)
      })
    },

    gotoArtpDetail(row) {
      //목록으로 돌아 왔을때 상태값 유지를 위해 store에 저장
      // this.$store.dispatch('setParams', this.params)
      this.$router.push({name: 'resistanceGenesDetail',
        params: {
          argId: row.argId,
          protAcc: row.protAcc,
          artpId: row.artpId,
          artp: row.artp,
          taxonNm: row.taxonNm
        }
      })
    }, 

    //항생제
    gotoAntiBiotic(row) {
      this.$router.push({name: 'antiBioticDetail',
        params: {
          abId: row.abId,
        }
      })
    },     

    onSave() {
      if (this.isValidator()) {
        let params = {
          arcId: this.arc.arcId,
          artpId: this.arc.artpId,
          artp: this.arc.artp,
          arcDesc: this.arc.arcDesc,
          arcAbList: this.arcAbList,
        }

        this.$store.dispatch('updateOne', {
          url: '/api/database/updateArc.do',
          params: params
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

      if (!this.arc.artp) {
        this.message = 'Subclass를 입력해 주세요.'
        $('#modal-alert').modal('toggle')
        return false
      }

      if (!this.arc.arcDesc) {
        this.message = '상세설명을 입력해 주세요.'
        $('#modal-alert').modal('toggle')
        return false
      }

      return true
    }
  }
}
</script>

