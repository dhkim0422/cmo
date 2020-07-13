<template>
  <div class="info">
    전체<span class="num">{{resultList.data.total}}</span>개 현재 페이지
    <span class="num">{{resultList.data.currentPage}}</span> /
    <span class="num">{{resultList.data.currentPage}}</span>
  </div>
</template>

<script>

export default {
  name: 'TotalRecordCount',
  props:['resultList']
}
</script>
