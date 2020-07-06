<template>
  <div class="col-xs-6 text-left"><p class="mT-20 mB-0">전체: {{ totalRecordCount | money }}</p></div>
</template>

<script>
import { mapGetters} from 'vuex'

export default {
  name: 'TotalRecordCount',
  computed: {
      ...mapGetters(['totalRecordCount']),
  },  
}
</script>
