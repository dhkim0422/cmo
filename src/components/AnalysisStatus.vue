<template>
  <select class="form-control" v-model="$store.getters.params.searchAnalysisStatus">
    <option value="">전체</option>
    <option v-for="analysisStatus in comboAnalysisStatusList" :key="analysisStatus.code" :value="analysisStatus.code">{{ analysisStatus.codeNm }}</option>
  </select>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AnalysisStatus',
  created() {
    if (this.$store.getters.params.searchAnalysisStatus == null)
      this.$store.getters.params.searchAnalysisStatus = ''

    this.$store.dispatch('loadAnalysisStatusList')
  },

  computed: {
      ...mapGetters(['comboAnalysisStatusList']),
  },  
}
</script>
