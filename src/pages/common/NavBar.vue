<template lang="pug">
.row.m-0
  .col.col-md-12
    .d-flex.justify-content-between.cus-nav
      .img-wrapper.d-flex.align-items-center
        .img
          img(
            src="/images/fuseLogo.png"
          )
        .beta.ml-2.pt-1 BETA
      .right-section
        ul
          li
            .txt
              | Farming
              i.fas.fa-external-link-alt.ml-1
          li
            .txt
              | Analytics
              i.fas.fa-external-link-alt.ml-1
          li
            .txt-sep
              | Fuse
          li
            button.esp
              | Connect to a wallet
          li
            button.btn.btn-dark
              i.fas.fa-cog
          li
            button.btn.btn-dark
              i.fas.fa-ellipsis-h

</template>

<style scoped lang="sass">
.cus-nav
  padding: 1rem 0 0
  .img-wrapper
    .img
      height: 35.5px
      width: 168px
      img
        height: 100%
        width: 100%
        object-fit: cover
    .beta
      font-weight: 700
      font-size: 12px
  .right-section
    ul
      list-style: none
      padding: 0
      margin: 0
      display: flex
      align-items: center
      li
        padding: 0 4px;

button .btn-dark
  background-color: #393d47
  &:hvoer
    background-color: #565a69
.txt
  font-weight: 400
  color: white
  cursor: pointer
  &:hover
    text-decoration: underline
  i
    font-size: 12px

.txt-sep
  box-sizing: border-box
  margin: 0px 10px 0px 0px
  min-width: 0px
  background-color: rgba(243, 132, 30, 0.05)
  color: rgb(243, 132, 30)
  font-weight: 500
  width: fit-content
  border-radius: 12px
  padding: 8px 12px

.esp
  text-align: center
  outline: none
  font-size: 16px
  padding: 0.5rem
  border-radius: 12px
  user-select: none
  font-weight: 500
  background-color: rgba(21, 61, 111, 0.44)
  border: 1px solid rgba(21, 61, 111, 0.44)
  color: rgb(109, 168, 255)
</style>

<script>
import Vue from "vue"
import Component from "vue-class-component"

@Component
export default class NavBar extends Vue {
  //
}
</script>