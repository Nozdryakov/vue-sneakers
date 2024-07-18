<template>

  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header :total-cost="totalCost" @openDrawer="openDrawer"></Header>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
<script setup>
import Header from "@/components/Header.vue";
import {inject} from "vue";
const cartActions = inject('cartActions');
console.log(cartActions);
const openDrawer = cartActions.openDrawer;
const totalCost = cartActions.totalCost;
</script>
