<template>
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header :total-cost="cartActions.totalCost" @openDrawer="openDrawer"></Header>
    <div class="p-10">
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-8">Закладки</h2>
      </div>
      <div class="mt-10">
        <CardList :items="items" @addToFavorite="favoriteActions.addToFavorite" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from 'vue';
import Header from "@/components/Header.vue";
import CardList from "@/components/CardList.vue";
import { useCookies } from "vue3-cookies";

const cartActions = inject('cartActions');
const favoriteActions = inject('favoriteActions');

const { cookies } = useCookies();
const favoritesStr = cookies.get('favorites');
const items = ref([]);
if (favoritesStr) {
  items.value = JSON.parse(favoritesStr);
}

const openDrawer = cartActions.openDrawer;
</script>
