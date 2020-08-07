<template>
  <b-modal id="SpeciesPopupList" size="xl" :title="title()" hide-footer>

    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content">
      </div>
    </div>
  </b-modal>

</template>

<script>
export default {
  name: "SpeciesMerge",
  methods:{
    title(){
      return ""
    }
  }
}
</script>

<style scoped>

</style>
