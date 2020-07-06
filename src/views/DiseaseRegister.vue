<template>
  <div class="container">
    <section class="mT-60">
      <h3 class="h3 title-section mB-30"><img src="../images/arg-database-ico-s.png" alt="BLAST">질병</h3>
      <h4 class="h4 mB-20">질병등록</h4>
      <div class="mB-20">
        <table class="table-view table-thead">
          <thead>
          <tr>
            <th class="th-title required">
                  <span>질병명</span>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td class="td-components">
              <input type="text" class="form-control" v-model="dsName" placeholder="e.g. Anaerobic infection">
            </td>
          </tr>
          </tbody>
        </table>
      </div>
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
            <td class="td-components">
              <textarea type="text" class="form-control" v-model="dsDesc" style="height: 200px;"> </textarea>
            </td>
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
              <span v-text="dblink.label">Clostridium perfringens</span>
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
              <span v-text="dblink.ab">Clostridium perfringens</span>
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
                </div>
              </div>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td class="td-components">
              <input type="text" class="form-control" v-model="dsKeggId" placeholder="e.g. H01410">
              <span>* H00001 과 같이 H+숫자 5자리 데이터만 등록가능합니다.</span>
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
                diseaseDblinks : [],
                antibioticsDblinks : [],
                dsKeggId : '',
                dsDesc : '',
                dsName : '',
                modalId: '0',
                message:'',
            }
        },
        created() {
        },

        computed: {
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
            onSave() {
                if (this.isValidator()) {
                    let params = {
                        dsName: this.dsName,
                        dsKeggId: this.dsKeggId,
                        dsDesc: this.dsDesc,
                        taxonIds: this.diseaseDblinks.map(e => e.ncbiTaxonId),
                        atIds: this.antibioticsDblinks.map(e => e.abId),
                    }
                    this.$store.dispatch('updateOne', {
                        url: '/api/database/insertDisease.do',
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

                if (!this.dsName) {
                    this.message = '질병명을 입력해 주세요.'
                    $('#modal-alert').modal('toggle')
                    return false
                }

                return true
            }
        }
    }
</script>

