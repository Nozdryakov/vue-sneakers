<template>
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
  <Header></Header>

    <div class="p-10">
      <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>
      <card-list></card-list>
    </div>
  </div>
</template>
<script setup>
import Header from "@/components/Header.vue";
import Card from "@/components/Card.vue";
import CardList from "@/components/CardList.vue";
</script>
