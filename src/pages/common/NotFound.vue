<template lang="pug">
.container
  .row
    .col(cols="12")
      .center
        .content
          h1
            | FuseSwap
            sup BETA
          h6 The page you are looking for is not available
          .go-back.mt-6
            button.btn.btn-primary(
              @click.stop="$router.push('/')"
            ) 
              | Home
</template>

<style scoped lang="sass">
.center
  display: flex
  justify-content: center
  align-items: center
  height: 100vh
  .content
    text-align: center

</style>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

@Component
export default class NotFound extends Vue {
  //
}
</script>