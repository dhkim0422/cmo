<template>
    <div class="container">
      <section class="section-search mT-60">
        <h3 class="h3 title-section mB-30"><img src="../images/arg-database-ico-s.png" alt="BLAST">항생제 내성 유전자 class (ARC)</h3>
        <table class="table-view">
          <colgroup>
            <col style="width: 167px;">
            <col>
            <col style="width: 167px;">
            <col>
          </colgroup>
          <tbody>
            <tr>
              <th class="th-title">Class</th>
              <td class="td-components"><input type="text" v-model="params.searchArcNm" class="form-control" placeholder="e.g. vana"></td>
              <th class="th-title">Subclass</th>
              <!--<td class="text-red">vana</td>-->
              <td class="td-components"><input type="text" v-model="params.searchArtp" class="form-control" placeholder="e.g. vana"></td>
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
              <col style="width: 150px;">
              <col>
              <col style="width: 100px;">
            </colgroup>          
            <thead>
              <tr>
                <th><input type="checkbox" title=""></th>
                <th scope="col">Class</th>
                <th scope="col">Subclass</th>
                <th scope="col">Description</th>
                <th class="text-center" scope="col">#. ARGs</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in resultList" :key="row.argAcc">
                <td class="text-center"><input type="checkbox" title=""></td>
                <td> {{ row.arcNm }}</td>
                <td><a @click="gotoDetail(row)" class="a-link pointer">{{ row.artp }}</a></td>
                <td>{{ row.arcDesc }}</td>
                <td class="text-right">{{ row.argCount | money }}</td>
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
  name: 'ResistanceClass',
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
    console.log('created', this.params)
  },

  mounted() {
    
  },
  methods: {
    //상세화면으로 이동한다.
    gotoDetail(row) {
      //목록으로 돌아 왔을때 상태값 유지를 위해 store에 저장
      this.$store.dispatch('setParams', this.params)
      this.$router.push({name: 'resistanceClassDetail',
        params: {
          arcId: row.arcId,
          artpId: row.artpId,
        }
      })
    },

    gotoRegister() {
      this.$router.push({name: 'resistanceClassRegister'})
    },
  }
}
</script>


<style>
.pointer {
  cursor: pointer;
}
</style>