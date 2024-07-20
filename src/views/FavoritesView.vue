<template>
  <drawer v-if="cartOpen" :total-cost="totalCost" :vat-price="vatPrice" @create-order="createOrder"></drawer>
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header :total-cost="totalCost" @openDrawer="openDrawer"></Header>
    <div class="p-10">
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-8">Закладки</h2>
      </div>
      <div class="mt-10">
        <card-list :items="favorites" @updateCart="updateCart" @addToFavorite="addToFavorite"></card-list>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import CardList from "@/components/CardList.vue";
import { useCookies } from "vue3-cookies";
import {inject, onMounted, ref, watchEffect} from "vue";
import Drawer from "@/components/Drawer.vue";

const cartActions = inject('cartActions');
const createOrder = cartActions.createOrder;
const vatPrice = cartActions.vatPrice;
const cartOpen = cartActions.cartOpen;
const { cookies } = useCookies();
const favorites = ref([]);
const basket = cartActions.basket;

const loadFavoritesFromCookies = () => {
  const favoritesStr = cookies.get('favorites');
  if (favoritesStr) {
    favorites.value = JSON.parse(favoritesStr);
    favorites.value.forEach(item => {
      if (favorites.value.some(fav => fav.id === item.id)) {
        item.isFavorite = true;
      }
    });
  }
};

const loadCartFromCookies = () => {
  const cartStr = cookies.get('cart');
  if (cartStr) {
    const cart = JSON.parse(cartStr);
    favorites.value.forEach(item => {
      if (cart.some(obj => obj.id === item.id)) {
        item.isAdded = true;
      }
    });
    basket.value = cart;
  }
};

onMounted(() => {
  loadFavoritesFromCookies();
  loadCartFromCookies();
});

watchEffect(() => {
  const favoritesStr = cookies.get('favorites');
  if (favoritesStr) {
    loadFavoritesFromCookies();
  }
  console.log('fav watch');
});

const openDrawer = cartActions.openDrawer;
const totalCost = cartActions.totalCost;
const updateCart = cartActions.updateCart;
const addToFavorite = cartActions.addToFavorite;
</script>
