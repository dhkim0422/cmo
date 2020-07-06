<template>
  <input @change="checkAll()" type="checkbox" name="checkAll" class="check-all" title="" v-model="isAll">
</template>

<script>
export default {
  props: {
    componentName: {
      type: String,
      default: 'PageUnit',
    },
  },
  name: 'PageUnit',
  created() {
      this.$store.getters.resultList
  },
  methods: {
    

    //체크 박스 모두 선택, 해제
    checkAll() {
      if (this.isAll) {
        if (this.resultList != null)
          this.argIdList = [...new Set(this.argIdList.concat(...this.resultList.map(element => element.argId)))]
          
      } else {  //id가 존재하면 제거 한다.
        this.argIdList = this.argIdList.filter(argId => {
          return !this.resultList.some(result => argId == result.argId)
        })
      }
    },    
  }
}
</script>
