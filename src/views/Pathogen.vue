<template>
    <div class="container">
      <section class="section-search mT-60">
        <h3 class="h3 title-section mB-30"><img src="../images/arg-database-ico-s.png" alt="BLAST">병원균</h3>
        <table class="table-view">
          <colgroup>
            <col style="width: 167px;">
            <col>
          </colgroup>
          <tbody>
            <tr>
              <th class="th-title">Genus</th>
              <td class="td-components"><input type="text" @keyup.enter="paginationAndList(1)" v-model="params.searchGenusNm" class="form-control" placeholder="Enterococcus"></td>
              <th class="th-title">Species</th>
              <td class="td-components"><input type="text" @keyup.enter="paginationAndList(1)" v-model="params.searchSpeciesNm" class="form-control" placeholder="Shewanella putrefaciens"></td>
              <th class="th-title">NCBI Taxon ID</th>
              <td class="td-components"><input type="text" @keyup.enter="paginationAndList(1)" v-model="params.searchNcbiTaxonId" class="form-control" placeholder="195"></td>
            </tr>
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
              <col style="width: 225px">
              <col style="width: 300px">
              <col style="width: 150px;">
              <col style="width: 100px;">
              <col style="width: 100px;">
            </colgroup>          
            <thead>
              <tr>
                <th><input type="checkbox" title=""></th>
                <th scope="col">속명</th>
                <th scope="col">종명</th>
                <th class="text-center" scope="col">항생제 내성 유전자 수</th>
                <th class="text-center" scope="col">관련 질병</th>
                <th class="text-center" scope="col">내성항생제</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in resultList" :key="row.dsId">
                <td class="text-center"><input type="checkbox" title=""></td>
                <td>{{ row.genusTaxonNm }}</td>
                <td>{{ row.name }}</td>
                <td class="ta-r"><a @click="gotoArg(row)" class="a-link pointer">{{ row.argCount }}</a></td>
                <td class="ta-r">{{ row.countDs }}</td>
                <td class="ta-r">{{ row.countArtp }}</td>
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

import Spinner from '@/components/Spinner.vue'
import PaginationAndListMixin from '@/mixins/PaginationAndListMixin.js'

export default {
  name: 'Pathogen',
  components: {
    Pagination,
    PageUnit,
    Spinner,
  },
  data() {
    return {
    }
  },

  mixins: [PaginationAndListMixin],

  created() {
    //목록을 조회 한다.
    console.log('created', this.params)
  },

  mounted() {
    
  },
  computed: {
  },
  methods: {
      gotoArg(row) {
          //목록으로 돌아 왔을때 상태값 유지를 위해 store에 저장
          this.$store.dispatch('setParams', {searchTaxonNm: row.name})
          this.$router.push({name: 'resistanceGenes'})
      },
  }
}
</script>


<style>
.pointer {
  cursor: pointer;
}
</style>