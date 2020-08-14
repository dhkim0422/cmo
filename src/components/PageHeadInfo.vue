<template>
  <div class="bg-container bg-sm">
    <div class="container">
      <!-- 제목 -->
      <ol class="path">
        <li class="path-item">{{ rootMenuNm }}</li>
        <li class="path-item">
          <h1 class="h1">{{ menuNm }}</h1>
        </li>
      </ol>
      <a role="button" class="btn-back" @click="moveToBack()" v-if="showBack">
        <i class="xi-long-arrow-left"></i><span class="sr-only">이전페이지로</span>
      </a>
    </div>
  </div>
</template>



<script>
export default {
  name: "PageHeadInfo",
  props:['menuNm','rootMenuNm'],
  data() {
    return {
      showBack: true
    }
  },
  created() {

  },
  methods:{
    moveToBack(){
      this.$router.go(-1)
    }

  }
}
</script>
