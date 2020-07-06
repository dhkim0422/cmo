<template>
    <div class="container">
      <section class="mT-60">
        <h3 class="h3 title-section mB-30"><img src="../images/arg-blast-ico-s.png" alt="Format DB 실행">Format DB</h3>
        <h4 class="h4 mB-20">Format DB 실행</h4>
        <div class="mB-20">
          <table class="table-view table-thead">
            <colgroup>
              <col>
            </colgroup>
            <thead>
              <tr>
                <th class="th-title">
                  <div class="row">
                    <div class="col-xs-6">
                      <span>서열 종류</span>
                    </div>
                  </div>
                </th>
              </tr>              
            </thead>
            <tbody>
              <tr>
                <td class="td-components">
                  <select class="form-control" v-model="seqType">
                    <option value="100">Nucleotide</option>
                    <option value="200">Protein</option>
                  </select>                
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="wrap-btn text-right mB-120">
          <button @click="$router.go(-1)" type="button" title="Cancel" class="btn btn-primary-border btn-radius mR-20">Cancel</button>
          <button @click="runFormatdb" type="button" title="Save" class="btn btn-primary btn-radius">실행</button>
        </div>

      </section>
      <modal-alert :id="modalId" :message="message"></modal-alert>
    </div>
  
</template>

<script>
import ModalAlert from '@/components/ModalAlert.vue'

export default {
  name: 'FormatdbRegister',
  components: {
    ModalAlert,
  },
  data() {
    return {
      seqType: '100',
      modalId: '0',
      message: '',
      isLoading: false,
    }
  },
  created() {
    // console.log('chkList', this.$route.params.chkList)
  },
 
  computed: {
  },
  mounted() {
  },
  
  methods: {
    runFormatdb() {
      let params = {
        seqType: this.seqType,
        frmtdbIdList: this.$route.params.chkList
      }
      this.isLoading = true
      this.$axios.post('/api/blast/runFormatdb.do', params).then((response) => {
        this.isLoading = false
        this.message = '실행 되었습니다.'
        this.modalId = '100'
        $('#modal-alert').modal('toggle')
        $('#modal-alert').on('hidden.bs.modal', e => {
          this.$store.dispatch('setParams', {})
          this.$router.go(-1)
        })        
      })
    },
  }
}
</script>

