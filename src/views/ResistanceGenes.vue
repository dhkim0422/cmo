<template>
    <div class="container">
      <section class="section-search mT-60">
        <h3 class="h3 title-section mB-30"><img src="../images/arg-database-ico-s.png" alt="항생제 내성 유전자 (ARG)">항생제 내성 유전자 (ARG)</h3>
        <table class="table-view">
          <colgroup>
            <col style="width: 120px;">
            <col>
            <col style="width: 120px;">
            <col>
            <col style="width: 120px;">
            <col>
          </colgroup>
          <tbody>
            <tr>
              <th class="th-title">Accession</th>
              <td class="td-components"><input type="text" v-model="params.searchProtAcc" class="form-control" placeholder="e.g. CAP12348"></td>
              <th class="th-title">종명</th>
              <td class="td-components"><input type="text" v-model="params.searchTaxonNm" class="form-control" placeholder="Mycobacterium sp. MCS"></td>
              <th class="th-title">유전자 설명</th>
              <td class="td-components"><input type="text" v-model="params.searchGeneDesc" class="form-control" placeholder="TSBIG_294"></td>
            </tr>
            <tr>
              <th class="th-title">Class</th>
              <td class="td-components"><input type="text" v-model="params.searchArcNm" class="form-control" placeholder="e.g. vana"></td>              
              <th class="th-title">Subclass</th>
              <td class="td-components"><input type="text" v-model="params.searchArtp" class="form-control" placeholder="e.g. vana"></td>
              <th class="th-title">출처</th>
              <td class="td-components">
                <select class="form-control" v-model="params.searchSubmitType">
                  <option value="">All</option>
                  <option value="USER">Local</option>
                  <option value="NCBI">NCBI</option>
                </select>                
              </td>
            </tr>
            <!--
            <tr>
              <th class="th-title">등록일자</th>
              <td colspan="3" class="td-components">
                <VueCtkDateTimePicker v-model="datepicker.value" 
                  :range="datepicker.range" 
                  :no-shortcuts="datepicker.noShortcuts" 
                  :auto-close="datepicker.autoClose"
                  :formatted="datepicker.formatted"
                  :label="datepicker.label"
                  :noLabel="datepicker.noLabel"
                  @input="datePickerInput"
                  
                  >
                  <input type="text" class="form-control">
                </VueCtkDateTimePicker>                
              </td>
            </tr>
            -->
          </tbody>
        </table>
        <div class="wrap-btn text-right mT-30">
          <button @click="paginationAndList(1)" type="button" title="search" class="btn btn-primary btn-radius">Search</button>
        </div>
      </section>

      <section class="section-result mT-60  pB-120">
        <h3 class="sr-only">검색결과</h3>
        <div class="tool-bar mB-15">
          <div class="row">
            <TotalRecordCount></TotalRecordCount>
            <div class="col-xs-6 text-right form-inline">
              <button type="button" @click="gotoRegister" class="btn btn-default" data-toggle="tooltip" data-placement="top" title="등록"><i class="xi-pen"><span class="sr-only">등록</span></i></button>
              <button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="top" title="삭제"><i class="xi-trash"><span class="sr-only">삭제</span></i></button>
              <div class="form-group dt-length">
                <PageUnit :componentName="this.$options.name"></PageUnit>
              </div>
            </div>
          </div>
        </div>
        <div class="vld-parent">
          <table class="table-list">
          <colgroup>
            <col style="width: 50px;">
            <col style="width: 150px;">
            <col style="width: 200px;">
            <col style="width: 300px;">
            <col style="width: 100px;">
            <col style="width: 100px;">
            <col style="width: 100px;">
          </colgroup>            
            <thead>
              <tr>
                <th><input type="checkbox" title=""></th>
                <th scope="col">Accession</th>
                <th scope="col">종명</th>
                <th scope="col">유전자 설명</th>
                <th scope="col">Class</th>
                <th scope="col">Subclass</th>
                <th scope="col">출처</th>
              </tr>
            </thead>
            <tbody>
              
              <tr v-for="row in resultList" :key="row.argAcc">
                <td class="text-center"><input type="checkbox" title=""></td>
                <td><a @click="gotoDetail(row)" class="a-link pointer">{{ row.protAcc }}</a></td>
                <td>{{ row.taxonNm }}</td>
                <td>{{ row.geneDesc }}</td>
                <td> {{ row.arcNm }}</td>
                <td> {{ row.artp }}</td>
                <td class="text-center">{{ row.submitType == 'USER' ? 'Local' : row.submitType }}</td>
              </tr>
            </tbody>

          </table>

          <Pagination @changePageIndex="changePageIndex"></Pagination>
          <spinner :isLoading="isLoading"></spinner>
        </div>
      </section>
      
    </div>

</template>

<script>
import Pagination from '@/components/Pagination.vue'
import PageUnit from '@/components/PageUnit.vue'

import { mapGetters} from 'vuex'

import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

import Spinner from '@/components/Spinner.vue'
import PaginationAndListMixin from '@/mixins/PaginationAndListMixin.js'

export default {
  name: 'ResistanceGenes',
  components: {
    Pagination,
    PageUnit,
    VueCtkDateTimePicker,
    Spinner,
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
      }
    }
  },

  mixins: [PaginationAndListMixin],

  created() {
    this.params.searchSubmitType = ''
  },

  mounted() {
    this.$nextTick(() => {
      $('[data-toggle="tooltip"]').tooltip();
    })
  },



  methods: {
    //상세화면으로 이동한다.
    gotoDetail(row) {
      //목록으로 돌아 왔을때 상태값 유지를 위해 store에 저장
      this.$store.dispatch('setParams', this.params)
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

    gotoRegister() {
      this.$router.push({name: 'resistanceGenesRegister'})      
    },

    datePickerInput(value) {
      console.log(value)
    }
  }
}
</script>


<style>
.pointer {
  cursor: pointer;
}
</style>