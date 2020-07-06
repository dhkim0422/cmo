<template>
  <loading :active.sync="isLoading" color="#28a745" loader="bars" :is-full-page="isFullPage"></loading>          
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'Spinner',
  components: {
    Loading,
  },  
  props: {
    isLoading: {
      type: Boolean,
      default: true
    },    
    isFullPage: {
      type: Boolean,
      default: false
    },        
  }
}
</script>
