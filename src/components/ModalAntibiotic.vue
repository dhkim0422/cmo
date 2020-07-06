<template>
  <div class="modal fade" id="modal-antibiotic" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn close" data-dismiss="modal" aria-label="Close"><i class="xi-close"></i><span class="sr-only">Close</span></button>
          <h4 class="modal-title">Antibiotic Resistance</h4>
        </div>
        <div class="modal-body">
          <section class="section-search mT-10">
            <table class="table-view">
              <colgroup>
                <col style="width: 100px;"> 
                <col>
                <col style="width: 100px;">
                <col>
              </colgroup>
              <tbody>
                <tr>
                  <th class="th-title">항생제</th>
                  <td class="td-components"><input type="text" v-model="params.searchAb" class="form-control" placeholder="5-episisomicin"></td>
                  <th class="th-title">항생제 계열</th>
                  <!--<td class="text-red">vana</td>-->
                  <td class="td-components"><input type="text" v-model="params.searchAbClass" class="form-control" placeholder="aminoglycoside"></td> 
                </tr>
              </tbody>
            </table>
            <div class="wrap-btn text-right mT-30">
              <button @click="antiBioticList(1)" type="button" title="search" class="btn btn-primary btn-radius">Search</button>
            </div>
          </section>

          <section class="section-result mT-60  pB-10">          
            <h3 class="sr-only">검색결과</h3>
            <div class="tool-bar mB-15">
              <div class="row">
                <TotalRecordCount></TotalRecordCount>
                <div class="col-xs-6 text-right form-inline">
                  <div class="form-group dt-length">
                    <PageUnit :componentName="this.$options.name"></PageUnit>
                  </div>
                </div>
              </div>
            </div>          
              <table class="table-list">
                <colgroup>
                  <col>
                  <col>
                  <col>
                </colgroup>          
                <thead>
                  <tr>
                    <th><input type="checkbox" title=""></th>
                    <th scope="col">항생제 계열</th>
                    <th scope="col">항생제</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in resultList" :key="row.abId">
                    <td class="text-center"><input type="checkbox" v-model="chkRows" title="" :value="row"></td>
                    <td> {{ row.abClass }}</td>
                    <td>{{ row.ab }}</td>
                  </tr>
                </tbody>
              </table>
              <Pagination @changePageIndex="changePageIndex"></Pagination>    
          </section>                       
        </div>
          
        <div class="modal-footer text-center">
          <button type="button" title="Cancel" data-dismiss="modal" class="btn btn-primary-border btn-radius">Cancel</button>
          <button @click="saveAntiBiotic" type="button" title="Save" class="btn btn-primary btn-radius mL-20">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import PageUnit from '@/components/PageUnit.vue'

import { mapGetters} from 'vuex'


export default {
  name: 'ModalAntibiotic',
  components: {
    Pagination,
    PageUnit,
  },
  data() {
    return {
      chkRows: [],
      params: {}
    }
  },
  created() {
    //목록을 조회 한다.
    this.params.pageIndex = 1;
    this.params.pageUnit = 10;
    this.antiBioticList(this.params.pageIndex)
  },  
  computed: {
    ...mapGetters(['resultList', 'paginationInfo', 'totalRecordCount']),
  },  
  methods: {
    //Pagination 컴포넌트의 change emit
    changePageIndex(pageIndex) {
      this.antiBioticList(pageIndex)
    },

    //목록을 조회 한다.
    antiBioticList(pageIndex) {
      this.params.pageIndex = pageIndex
      this.$store.dispatch('loadPaginationAndList', {
        componentName: this.$options.name,
        params: this.params
      })
    },
    saveAntiBiotic() {
      this.$emit('modal-antibiotic:input', this.chkRows)
      this.chkRows = []
      $('#modal-antibiotic').modal('hide')
    }
  }
}
</script>
