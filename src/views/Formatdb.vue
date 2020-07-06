<template>
    <div class="container">
      <section class="section-search mT-60">
        <h3 class="h3 title-section mB-30"><img src="../images/arg-blast-ico-s.png" alt="Format DB">Format DB</h3>
        <!--
        <table class="table-view">
          <colgroup>
            <col style="width: 167px;">
            <col>
          </colgroup>
          <tbody>
            <tr>
              <th class="th-title">실행일자</th>
              <td class="td-components">
                <VueCtkDateTimePicker v-model="datepicker.searchSbmtDt" 
                  :range="datepicker.range" 
                  :no-shortcuts="datepicker.noShortcuts" 
                  :auto-close="datepicker.autoClose"
                  :formatted="datepicker.formatted"
                  :format="datepicker.format"
                  :label="datepicker.label"
                  :noLabel="datepicker.noLabel"
                  @input="datePickerInput"
                  
                  >
                  <input type="text" class="form-control">
                </VueCtkDateTimePicker>                                
              </td>
              <th class="th-title">분석상태</th>
              <td class="td-components">
                <analysis-status></analysis-status>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="wrap-btn text-right mT-30">
          <button @click="paginationAndList(1)" type="button" title="search" class="btn btn-primary btn-radius">Search</button>
        </div>
        -->
      </section>

      <section class="section-result mT-60  pB-120">
        <h3 class="sr-only">검색결과</h3>
        <div class="tool-bar mB-15">
          <div class="row">
            <TotalRecordCount></TotalRecordCount>
            <div class="col-xs-6 text-right form-inline">
              <div class="form-group dt-length">
                <button  @click="runFormatdb" type="button" class="btn btn-default" title="Formatdb">Formatdb</button>
              </div>
            </div>
          </div>
        </div>
        <div class="vld-parent">
          <table class="table-list">
            <colgroup>
              <col style="width: 50px;">
              <col>
              <col>
              <col>
              <col>
            </colgroup>          
            <thead>
              <tr>
                <th scope="col"><input @change="checkAll()" type="checkbox" title="" v-model="isAll"></th>
                <th scope="col">실행일자</th>
                <th scope="col">서열타입</th>
                <th class="text-center" scope="col">유전자서열수</th>
                <th class="text-center" scope="col">현재서열수</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in resultList" :key="row.frmtdbId">
                <td class="text-center"><input type="checkbox" v-model="chkList" title="" :value="row.sqcTp"></td>
                <td class="text-center">{{ row.sbmtDt }}</td>
                <td>{{ row.sqcTp == 'nucl' ? 'Nucleotide' : 'Protein'}}</td>
                <td class="text-right">{{ row.nSqc | money }}</td>
                <td class="text-right">{{ row.argCount | money }}</td>
              </tr>
            </tbody>
          </table>

            <spinner :isLoading="isLoading"></spinner>
        </div>        
      </section>
      <modal-alert :message="message"></modal-alert>
    </div>

</template>

<script>
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

import { mapGetters} from 'vuex'

import PaginationAndListMixin from '@/mixins/PaginationAndListMixin.js'

export default {
  name: 'Formatdb',
  components: {
  },
  data() {
    return {
      datepicker: {
        range: true,
        format: 'YYYY-MM-DD',
        noShortcuts: true,
        autoClose: true,
        formatted: 'll',
        label: 'YYYY-MM-DD ~ YYYY-MM-DD',
        noLabel: true,
      },
      chkList: [],
      message: '',      
      isAll: false
    }
  },

  mixins: [PaginationAndListMixin],

  created() {
  },

  mounted() {
    
  },
  computed: {
  },
  methods: {
    datePickerInput(value) {
      this.params.startDt = value.start
      this.params.endDt = value.end
    },
    gotoRegister() {
      this.$store.dispatch('setParams', this.params)
      this.$router.push({name: 'formatdbRegister',
        params: {
          chkList: this.chkList
        }
      })      
    },

    checkToggle(event) {
      this.chkList = event.currentTarget.checked ? this.resultList.map(e => e.frmtdbId) : []
    },

    checkAll() {
      if (this.isAll)
        this.chkList = [...this.resultList.map(element => element.sqcTp)]
      else 
        this.chkList = []
    },

    runFormatdb() {
      if (this.chkList.length == 0) {
        this.message = 'Format DB할 항목을 선택해 주세요.'
        $('#modal-alert').modal('toggle')        
        return
      }

      let params = {
        seqTypeList: this.chkList,
      }
      this.isLoading = true
      this.$axios.post('/api/blast/runFormatdb.do', params).then((response) => {
        this.isLoading = false
        this.message = '실행 되었습니다.'
        $('#modal-alert').modal('toggle')
      })
    },    
  }
}
</script>


<style>
.pointer {
  cursor: pointer;
}
</style>