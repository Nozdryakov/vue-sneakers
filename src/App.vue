<template>
<!--  <drawer></drawer>-->
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
  <Header></Header>

    <div class="p-10">
      <div class="flex justify-between">
        <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>
        <div class="relative">
          <img
              class="absolute left-4 top-3"
              src="/search.svg"/>
          <input
          placeholder="Поиск..."
          class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
          />
        </div>
      </div>

      <card-list></card-list>
    </div>
  </div>
</template>
<script setup>
import Header from "@/components/Header.vue";
import Card from "@/components/Card.vue";
import CardList from "@/components/CardList.vue";
import Drawer from "@/components/Drawer.vue";
</script>
