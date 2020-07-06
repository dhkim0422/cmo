<template>
    <div class="container">
      <h3>오믹스 데이터 공개/비공개 현황 통계정보</h3>
      <div class="pB-20">
        <table class="table-view table-thead">
          <caption class="sr-only"></caption>
          <col style="width: 50%">
          <col style="width: 25%">
          <col style="width: 25%">
          <thead>
          <th>오믹스 유형</th>
          <th>전체데이터 수</th>
          <th>공개데이터 수</th>
          </thead>
          <tr v-for="item in analysisList">
            <td class="left">{{item.name}}</td>
            <td class="right">{{item.totalCount}}</td>
            <td class="right">{{item.publicCount}}</td>
          </tr>
        </table>
      </div>
      <div class="pB-20">
        <bar-chart :data="chartDatas" ></bar-chart>

      </div>

    </div>
</template>

<script>

import { mapGetters} from 'vuex'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
import Spinner from '@/components/Spinner.vue'
import BarChart from "./chart/BarChart";
import { Bar } from 'vue-chartjs'
export default {

  name: 'Analysis',
  components: {
    Spinner,
    BarChart
  },
  data:() => ({
    loaded: false,
    chartDatas: null
  }),
  created() {
    this.$store.dispatch('initAnalysisList', {
      url: '/isg-oreo/statistics/graphstat-data-1'
    })
  },
  computed: {
    ...mapGetters(['analysisList']),
  },
  watch: {
    analysisList(newList) {
      let dataSet = {
        labels: [],
        datasets: [
          {
            label:  '전체데이터',
            data: [0]
          },
          {
            label: '공개데이터',
            data: [0]
          }
        ]
      }

      newList.forEach((item, index) => {
        dataSet.labels[index] = item.name;
        dataSet.datasets[0].data[index] = item.totalCount;
        dataSet.datasets[1].data[index] = item.publicCount;
      });
      console.log('this.chartDatas', this.chartDatas)
      this.chartDatas = dataSet;
      console.log('this.chartDatas', this.chartDatas)

    }
  },
  mounted() {

  }

}
</script>


<style>
.pointer {
  cursor: pointer;
}
</style>
