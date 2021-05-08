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
                  v-model="from"
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
                button.has-token(
                  v-if="tokenFrom"
                  @click.stop="openSelector('from')"
                )
                  span
                    img(
                      v-if="tokenFrom && tokenFrom.logoURI"
                      :src="tokenFrom.logoURI"
                      @error="e => e.target.src = '/favicon.png'"
                    )
                    span {{ tokenFrom && tokenFrom.symbol }}
                    i.fas.fa-chevron-down
                button(
                  v-else
                  @click.stop="openSelector('from')"
                )
                  span
                    span Select a token
                    i.fas.fa-chevron-down

            .b-arrow.text-center
              i.fas.fa-arrow-down(
                @click.stop="swap"
              )
            .to.f-wrapper
              label To
              .input-wrapper
                input(
                  v-model="to"
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
                button.has-token(
                  v-if="tokenTo"
                  @click.stop="openSelector('to')"
                )
                  span
                    img(
                      v-if="tokenTo && tokenTo.logoURI"
                      :src="tokenTo.logoURI"
                      @error="e => e.target.src = '/favicon.png'"
                    )
                    span {{ tokenTo && tokenTo.symbol }}
                    i.fas.fa-chevron-down
                button(
                  v-else
                  @click.stop="openSelector('to')"
                )
                  span
                    span Select a token
                    i.fas.fa-chevron-down
            .con-result
              .result

            .action
              button.inner-btn 
                | Connect Wallet

        //- .footer-result-wrapper
        //-   .result-wrapper
        //-     ul
        //-       li
        //-         span.title-cus
        //-           p Minimum Received
        //-           i.far.fa-question-circle.ml-2
        //-         span
        //-           p 404.9 FUSE
        //-       li
        //-         span.title-cus
        //-           p Price Impact
        //-           i.far.fa-question-circle.ml-2
        //-         span
        //-           p.warn 30.30%
        //-       li
        //-         span.title-cus
        //-           p Liquidity Provider Fee
        //-           i.far.fa-question-circle.ml-2
        //-         span
        //-           p 0.50 DAI

  b-modal#tokenSelector(
    v-model="tokenSelector"
  )
    .row
      .col.col-md-12.m-header
        .d-flex.justify-content-between.align-items-center
          label.m-0
            | Select a token
            i.far.fa-question-circle.ml-2
          .px-1.pt(
            @click.stop="tokenSelector = false"
          )
            i.fas.fa-times
        .search-input-wrapper
          input.search-token(
            placeholder="Search name or paste address"
            v-model="search"
          )
        .search-below.d-flex.justify-content-between.align-items-center.mb-3
          label.m-0
            | Token Name
          .arrow-down.px-1
            i.fas.fa-arrow-down


      .col.col-md-12.m-body.p-0
        .d-flex.token-item.align-items-center.px-4(
          v-for="token of tokens.filter(i => i.symbol.toLowerCase().includes(search.toLowerCase()))"
          @click.stop="onSelect(token)"
          :class="getDisabled(token)"
        )
          .token-img
            img(
              :src="token.logoURI"
              @error="e => e.target.src = '/favicon.png'"
            )
          p.m-0.p-0.ml-3
            | {{ token.symbol }}
      .col.col-md-12.m-footer
        .f-img
          img(
            src="/images/fuseLogo.png"
          )

</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { Watch } from "vue-property-decorator"
import NavBar from "../common/NavBar.vue"
import './Home.scss'
import { getData } from '../../apis/home'
import { getIntersection } from '../../utils'
import { symbolsToDisplay } from '../../constants'
import { Token } from './types'

@Component({
  components: {
    NavBar,
  },
})
export default class Home extends Vue {
  activeTab = 0
  search = ''
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

  tokens: Token[] = []
  tokenFrom: Token | null = null
  tokenTo: Token | null = null
  to = null
  from = null
  tokenSelector = false
  target = 'from'

  mounted() {
    getData()
      .then((res: any) => {
        const tempTokens = getIntersection(res.tokens, symbolsToDisplay, 'symbol')
        /**
         * Filtering out entries with same name
         */
        tempTokens.forEach((item: Token) => {
          if(!this.tokens.map((item: Token) => item.symbol).includes(item.symbol)) {
            this.tokens.push(item)
          }
        })

        /**
         * Reorganising list to put fuse to top of the list
         */
        const fuseIndex = this.tokens.findIndex((i: Token) => i.symbol.toLowerCase() === 'fuse')
        if(fuseIndex != -1) {
          let temp = this.tokens[0]
          this.tokens[0] = this.tokens[fuseIndex]
          this.tokens[fuseIndex] = temp
        }

        this.tokenFrom = this.tokens.find(item => item.symbol === 'FUSE') || null
      })
      .catch(err => {
        console.log(err, 'err')
      })
  }

  swap() {
    let test = this.tokenFrom
    this.tokenFrom = this.tokenTo
    this.tokenTo = test

    let t = this.to
    this.to = this.from
    this.from = t
  }

  openSelector(target: string) {
    this.target = target
    this.search = ''
    this.tokenSelector = true
  }

  onSelect(token: Token) {
    if(token.address === this.tokenFrom?.address || token.address === this.tokenTo?.address) return;

    if(this.target == 'from') {
      this.tokenFrom = token
    } else {
      this.tokenTo = token
    }
    this.tokenSelector = false
  }

  getDisabled(token: Token): string {
    if(token.address == this.tokenFrom?.address || token.address == this.tokenTo?.address) {
      return 'disabled'
    }
    return ''
  }

  @Watch('tokenFrom')
  onChangeTokenFrom(token: Token | null) {
    console.log(token, 'tokenFrom')
  }

  @Watch('tokenTo')
  onChangeTokenTo(token: Token | null) {
    console.log(token, 'tokenTo')
  }
}

const temp = {
    "fUSD": 0.24586,
    "DAI": 0.253864,
    "G$": 1116.43,
    "GRT": 0.165347,
    "KNC": 0.0707313,
    "LINK": 0.00499116,
    "OM": 0.641388,
    "USDC": 0.239153,
    "USDT": 0.245659,
    "WBTC": 0.00000429,
    "WETH": 0.0000683444,
    "WFUSE": 1,
    
}
</script>