<template>
    <div class="container">
      <section class="mT-60">
        <h3 class="h3 title-section mB-30"><img src="../images/arg-database-ico-s.png" alt="BLAST">질병</h3>
        <h4 class="h4 mB-20">{{diseaseDetail.dsName}} 상세보기</h4>
        <div class="mB-20">
          <table class="table-view table-thead">
            <thead>
              <tr>
                <th class="th-title">
                  <div class="row">
                    <div class="col-xs-12">
                      <span>상세설명</span>
                    </div>
                  </div>
                </th>
              </tr>              
            </thead>
            <tbody>
              <tr>
                <td class="td-components"> <textarea type="text" class="form-control" v-model="diseaseDetail.dsDesc" style="height: 200px;"></textarea></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mB-20">
          <modal-taxon-tree  @taxontree:input="onTreeInput"></modal-taxon-tree>
          <table class="table-view table-thead">
            <colgroup>
              <col style="width: 60px">
              <col style="width: 310px">
              <col>
            </colgroup>
            <thead>
            <tr>
              <th colspan="3" class="th-title">
                <div class="row">
                  <div class="col-xs-6">
                    <span>병원균</span>
                    <button type="button" class="btn btn-default mL-15" data-toggle="modal" data-target="#modalTaxonTree">추가</button>
                    <button @click="diseaseDeleteDblink" type="button" class="btn btn-default" title="삭제">삭제</button>
                  </div>
                </div>
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(dblink, index) in diseaseDblinks " :key="index">
              <th class="text-center"><input type="checkbox" v-model="diseaseChkDblink" title="" :value="index"></th>
              <td class="td-components">
                <input type="hidden" class="form-control" style="min-width: 500px;" v-model="dblink.id" readonly>
                <a :href="'https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?mode=Info&id='+dblink.ncbiTaxonId" class="a-link pointer" v-text="dblink.label">Clostridium perfringens</a>
              </td>
            <td class="td-components"><span v-text="dblink.nodeRank"></span></td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="mB-20">
          <table class="table-view table-thead">
            <colgroup>
              <col style="width: 60px">
              <col style="width: 310px">
              <col>
            </colgroup>
            <thead>
            <tr>
              <th colspan="3" class="th-title">
                <div class="row">
                  <div class="col-xs-6">
                    <span>치료 항생제</span>
                    <button data-toggle="modal" data-target="#modal-antibiotic" type="button" class="btn btn-default mL-15" title="추가">추가</button>
                    <button @click="antibioticsDeleteDblink" type="button" class="btn btn-default" title="삭제">삭제</button>
                  </div>
                </div>
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(dblink, index) in antibioticsDblinks " :key="index">
              <th class="text-center"><input type="checkbox" v-model="antibioticsChkDblink" title="" :value="index"></th>
              <td class="td-components">
                <input type="hidden" class="form-control" v-model="dblink.abId">
                <a @click="gotoAntiboiticsDetail(dblink)" class="a-link pointer" v-text="dblink.ab">Clostridium perfringens</a>
              </td>
              <td class="td-components"><span v-text="dblink.abDesc"></span></td>
            </tr>
            </tbody>
          </table>
          <modal-antibiotic @modal-antibiotic:input="onAntibiotic"></modal-antibiotic>
        </div>
        <div class="mB-20">
          <table class="table-view table-thead">
            <thead>
            <tr>
              <th class="th-title">
                <div class="row">
                  <div class="col-xs-12">
                    <span>KEGG Disease</span>
                    <button @click="KEGGUpdate()" type="button" class="btn btn-default mL-15" title="수정">수정</button>
                  </div>
                </div>
              </th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td class="td-components">
                <a v-if="!updateFlag" :href="'https://www.kegg.jp/dbget-bin/www_bget?ds:'+diseaseDetail.dsKeggId"class="a-link pointer" v-text="diseaseDetail.dsKeggId">H00335</a>
                <input v-if="updateFlag" type="text" class="form-control" v-model="diseaseDetail.dsKeggId">
              </td>
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
import ModalTaxonTree from '@/components/ModalTaxonTree.vue';
import ModalAntibiotic from '@/components/ModalAntibiotic.vue';
import ModalAlert from '@/components/ModalAlert.vue';

export default {
  name: 'DiseaseDetail',
  components: {
      ModalTaxonTree,
      ModalAntibiotic,
      ModalAlert,
  },
  data() {
    return {
      diseaseChkDblink: [],
      antibioticsChkDblink: [],
      updateFlag: false,
      arg: {
          atIds: [],
          taxonIds: []
      },
        modalId: '0',
        message:'',
    }
  },
  created() {
      this.$store.dispatch('loadOne', {
          url: '/api/database/selectDiseaseDetail.do',
          params: {
              dsId: this.$route.params.dsId
          }
      })
  },
 
  computed: {
    ...mapGetters(['result']),
      diseaseDetail() {
        return this.result.diseaseDetail == null ? {} : this.result.diseaseDetail
      },
      diseaseDblinks() {
          if(this.result.dsTaxon == null){
              return {};
          }
          return this.result.dsTaxon;
      },
      antibioticsDblinks() {
          if(this.result.dsAntiBiotics == null){
              return {};
          }
        return this.result.dsAntiBiotics;
      },
  },
  mounted() {
  },
  
  methods: {
      onTreeInput(dieses) {
          if(dieses === null){
              return;
          }
          dieses.forEach(element => {
              if (!this.diseaseDblinks.some(item => item.id === element.id))
                  this.diseaseDblinks.push(element)
          })

      },
    diseaseDeleteDblink() {
      let result = this.diseaseChkDblink.sort((a, b) => b - a)
      result.forEach((element) => {
          this.diseaseDblinks.splice(element, 1)
      });
        //this.diseaseDblinks = []
    },
    onAntibiotic(antiBiotics) {
        if(antiBiotics === null){
            return;
        }
        antiBiotics.forEach(element => {
            if (!this.antibioticsDblinks.some(item => item.abId === element.abId))
                this.antibioticsDblinks.push(element)
        })
    },
      antibioticsDeleteDblink() {
      let result = this.antibioticsChkDblink.sort((a, b) => b - a)
      result.forEach((element) => {
        this.antibioticsDblinks.splice(element, 1)
      });
      //this.antibioticsChkDblink = []
    },
      KEGGUpdate(){
        this.updateFlag = true;
      },
      gotoAntiboiticsDetail(row) {
          //목록으로 돌아 왔을때 상태값 유지를 위해 store에 저장
          this.$store.dispatch('setParams', this.params)
          this.$router.push({name: 'antiBioticDetail',
              params: {
                  ab: row.ab,
                  abId: row.abId,
                  abClass: row.abClass,
                  abSubclass: row.abSubclass,
                  abDesc: row.abDesc,
                  abcId: row.abcId,
              }
          })
      },
      onSave() {
          this.arg.taxonIds = this.diseaseDblinks.map(e => e.ncbiTaxonId)
          this.arg.atIds = this.antibioticsDblinks.map(e => e.abId)
            let params = {
                dsKeggId: this.diseaseDetail.dsKeggId,
                dsId: this.diseaseDetail.dsId,
                dsDesc : this.diseaseDetail.dsDesc,
                taxonIds: this.arg.taxonIds,
                atIds: this.arg.atIds,
            }
             this.$store.dispatch('updateOne', {
                  url: '/api/database/updateDisease.do',
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
      },

  }
}
</script>

