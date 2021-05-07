<template lang="pug">
.container-fluid.p-0
  nav-bar
  .row.m-0
    .col.col-md-12
      .content-wrapper
        .content
          .tabs-wrapper
            .tabs
              ul
                li(
                  v-for="{ value, label } of tabs"
                  :class="value == activeTab ? 'active' : ''"
                )
                  | {{ label }}
          .tab
            .from.f-wrapper
              label From
              .input-wrapper
                input(
                  type="text"
                  placeholder="0.0"
                  inputmode="decimal"
                  autocomplete="off"
                  autocorrect="off"
                  pattern="^[0-9]*[.,]?[0-9]*$"
                  minlength="1"
                  maxlength="79"
                  spellcheck="false"
                )
                button.has-token
                  span
                    img(
                      src="/favicon.png"
                    )
                    span FUSE
                    i.fas.fa-chevron-down

            .b-arrow.text-center
              i.fas.fa-arrow-down
            .to.f-wrapper
              label To
              .input-wrapper
                input(
                  type="text"
                  placeholder="0.0"
                  inputmode="decimal"
                  autocomplete="off"
                  autocorrect="off"
                  pattern="^[0-9]*[.,]?[0-9]*$"
                  minlength="1"
                  maxlength="79"
                  spellcheck="false"
                )
                button
                  span
                    span Select a token
                    i.fas.fa-chevron-down
            .con-result
              .result

            .action
              button.inner-btn 
                | Connect Wallet

        .footer-result-wrapper
          .result-wrapper
            ul
              li
                span.title-cus
                  p Minimum Received
                  i.far.fa-question-circle.ml-2
                span
                  p 404.9 FUSE
              li
                span.title-cus
                  p Price Impact
                  i.far.fa-question-circle.ml-2
                span
                  p.warn 30.30%
              li
                span.title-cus
                  p Liquidity Provider Fee
                  i.far.fa-question-circle.ml-2
                span
                  p 0.50 DAI
</template>

<script>
import Vue from "vue"
import Component from "vue-class-component"
import NavBar from "../common/NavBar.vue"
import './Home.scss'

@Component({
  components: {
    NavBar,
  },
})
export default class Home extends Vue {
  activeTab = 0
  tabs = [
    {
      value: 0,
      label: "Swap",
    },
    {
      value: 1,
      label: "Pool",
    },
    {
      value: 2,
      label: "Bridge",
    },
  ]

  mounted() {
    fetch('https://raw.githubusercontent.com/fuseio/default-token-list/master/build/fuseswap-default.tokenlist.json')
      .then(res => res.json())
      .then(res => console.log(res, 'here'))
  }
}
</script>