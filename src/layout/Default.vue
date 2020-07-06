<template>
  <div class="page-wrap">
    <header-bar />

    <main id="contents">
      <slot />
    </main>

    <footer-bar />
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld'
import FooterBar from '../components/FooterBar'
import HeaderBar from '../components/HeaderBar'

export default {
  components: {
    //HelloWorld,
    HeaderBar,
    FooterBar
  },

  mounted: function() {
    console.log('default')
  }
}
</script>


