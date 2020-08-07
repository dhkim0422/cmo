<template>
  <div class="container" id="content">
    <page-head-info :root-menu-nm="omics.accession" :menu-nm="omics.name"/>
    <!-- 요약 -->
    <ul class="summary">
      <li class="summary-item">
        <div class="summary-title">
          <i class="xi-users"></i>객체
        </div>
        <div class="summary-num">{{ summary.target }}</div>
      </li>
      <li class="summary-item">
        <div class="summary-title">
          <i class="xi-opacity"></i>연구샘플
        </div>
        <div class="summary-num">{{ summary.sample }}</div>
      </li>
      <li class="summary-item">
        <div class="summary-title">
          <i class="xi-file"></i>오믹스 파일
        </div>
        <div class="summary-num">{{ summary.omicsFile }}</div>
      </li>
      <li class="summary-item">
        <div class="summary-title">
          <i class="xi-sdcard"></i>데이터 용량
        </div>
        <div class="summary-num">{{ summary.omicsSize | byte }}</div>
      </li>
    </ul>


    <ul class="tab-menu">
      <li class="menu-item"><a class="menu-link" :class="css(1)" @click="click(1)">실험정보</a></li>
      <li class="menu-item"><a class="menu-link" :class="css(2)" @click="click(2)">파일 목록</a></li>
    </ul>

    <div class="tab-content">
      <div title="실험 정보" v-show="currentTab == 1">
        <span class="sr-only">실험 정보 </span>
        <omics-data-exper :id="this.$route.params.id" @experDataLoad="experDataLoad"/>
      </div>
      <div title="파일 목록" v-show="currentTab == 2">
        <span class="sr-only">파일 목록</span>
        <omics-data-file-list :id="this.$route.params.id"/>
      </div>
    </div>
  </div>

</template>

<script>
import axios from "../../utils/axios";
import OmicsDataExper from "./OmicsDataExper";
import OmicsDataFileList from "./OmicsDataFileList";

export default {
  name: "OmicsDetail",
  components: {OmicsDataFileList, OmicsDataExper},
  created() {
    let id = this.$route.params.id;
    console.log('log', id)
    this.initData(id)
  },
  data() {
    return {
      currentTab: 1,
      omics:{
        accession:'',
        name:''
      },
      summary: {
        target: 0,
        sample: 0,
        omicsFile: 0,
        omicsSize: 0
      }
    }
  },
  methods: {
    async initData(id) {
      console.log('log2', id)
      let summayrData = await axios.get(
          "/isg-oreo/statistics/summary/omics/" + id,
          {}
      );
      this.summary = summayrData.data;
    },
    css(tapNo) {
      if (tapNo == this.currentTab) {
        return "active"
      } else {
        return ''
      }
    },

    click(tabNo) {
      this.currentTab = tabNo
    },
    experDataLoad(omics) {
      this.omics = omics.data

    }


  }
}

</script>

