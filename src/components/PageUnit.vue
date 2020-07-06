<template>
  <select @change="paginationAndList(1)" class="form-control" v-model="$store.getters.params.pageUnit">
    <option value="10">10개씩 보기</option>
    <option value="30">30개씩 보기</option>
    <option value="50">50개씩 보기</option>
    <option value="100">100개씩 보기</option>
  </select>
</template>

<script>
import eventBus from '@/utils/eventBus.js'
export default {
  props: {
    componentName: {
      type: String,
      default: 'PageUnit',
    },
  },
  name: 'PageUnit',
  created() {
    if (this.$store.getters.params.pageUnit == null)
      this.$store.getters.params.pageUnit = 10
  },
  methods: {
    paginationAndList() {
      eventBus.$emit('paginationAndList', this.componentName);
    }
  }
}
</script>
