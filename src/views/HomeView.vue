<template>
  <drawer v-if="cartOpen" :total-cost="totalCost" :vat-price="vatPrice" @create-order="createOrder"></drawer>
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header :total-cost="totalCost" @openDrawer="openDrawer"></Header>

    <div class="p-10">
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>

        <select class="py-2 px-3 border rounded-md outline-none" @change="sortItems($event)">
          <option value="title">По названию</option>
          <option value="priceAsc">По цене (от дешевых)</option>
          <option value="priceDesc">По цене (от дорогих)</option>
        </select>

        <div class="relative">
          <img class="absolute left-4 top-3" src="/search.svg" />
          <input
              v-model="searchQuery"
              placeholder="Поиск..." class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400" />
        </div>
      </div>

      <div class="mt-10">
        <card-list :items="filteredItems" @updateCart="updateCart"  @addToFavorite="addToFavorite"></card-list>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, inject, onMounted} from 'vue';
import Header from "@/components/Header.vue";
import CardList from "@/components/CardList.vue";
import Drawer from "@/components/Drawer.vue";
import {useCookies} from "vue3-cookies";

const cartActions = inject('cartActions');
const totalCost = cartActions.totalCost;
const vatPrice = cartActions.vatPrice;
const updateCart = cartActions.updateCart;
const addToFavorite = cartActions.addToFavorite;
const openDrawer = cartActions.openDrawer;
const createOrder = cartActions.createOrder;
const cartOpen = cartActions.cartOpen;
const updateTotalCost = cartActions.updateTotalCost;
const basket = cartActions.basket;
const items = ref([
  {
    id: 1,
    title: "Мужские Кроссовки Nike Blazer Mid Suede",
    price: 12999,
    imageUrl: "/sneakers/sneakers-1.jpg",
    isFavorite: false,
    isAdded: false
  },
  {
    id: 2,
    title: "Мужские Кроссовки Nike Air Max 270",
    price: 15600,
    imageUrl: "/sneakers/sneakers-2.jpg",
    isFavorite: false,
    isAdded: false
  },
  {
    id: 3,
    title: "Мужские Кроссовки Nike Blazer Mid Suede",
    price: 8499,
    imageUrl: "/sneakers/sneakers-3.jpg",
    isFavorite: false,
    isAdded: false
  },
  {
    id: 4,
    title: "Кроссовки Puma X Aka Boku Future Rider",
    price: 7800,
    imageUrl: "/sneakers/sneakers-4.jpg",
    isFavorite: false,
    isAdded: false
  },
  {
    id: 5,
    title: "Кроссовки Future Rider",
    price: 9550,
    imageUrl: "/sneakers/sneakers-5.jpg",
    isFavorite: false,
    isAdded: false
  },
  {
    id: 6,
    title: "Кроссовки Black Edition",
    price: 16999,
    imageUrl: "/sneakers/sneakers-6.jpg",
    isFavorite: false,
    isAdded: false
  },
  {
    id: 7,
    title: "Кроссовки Orange Boomb Edition",
    price: 7499,
    imageUrl: "/sneakers/sneakers-7.jpg",
    isFavorite: false,
    isAdded: false
  },
  {
    id: 8,
    title: "Кроссовки Nike Air Max 270",
    price: 15600,
    imageUrl: "/sneakers/sneakers-8.jpg",
    isFavorite: false,
    isAdded: false
  },
  {
    id: 9,
    title: "Кроссовки Nike Air Force 1",
    price: 5900,
    imageUrl: "/sneakers/sneakers-9.jpg",
    isFavorite: false,
    isAdded: false
  },
  {
    id: 10,
    title: "Кроссовки Adidas Ultraboost",
    price: 11500,
    imageUrl: "/sneakers/sneakers-10.jpg",
    isFavorite: false,
    isAdded: false
  },
  {
    id: 11,
    title: "Кроссовки Puma Clyde All-Pro",
    price: 7600,
    imageUrl: "/sneakers/sneakers-11.jpg",
    isFavorite: false,
    isAdded: false
  },
  {
    id: 12,
    title: "Кроссовки Converse Chuck Taylor All-Star",
    price: 13000,
    imageUrl: "/sneakers/sneakers-12.jpg",
    isFavorite: false,
    isAdded: false
  }
]);

const sortKey = ref('title');
const searchQuery = ref('');
const sortedItems = computed(() => {
  let sorted = [...items.value];
  if (sortKey.value === 'title') {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortKey.value === 'priceAsc') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortKey.value === 'priceDesc') {
    sorted.sort((a, b) => b.price - a.price);
  }
  return sorted;
});

const filteredItems = computed(() => {
  return sortedItems.value.filter(item => item.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

const sortItems = (event) => {
  sortKey.value = event.target.value;
};

const { cookies } = useCookies();
const loadFavoritesFromCookies = async () => {
  const favoritesStr = cookies.get('favorites');
  if (favoritesStr) {
    const favorites = JSON.parse(favoritesStr);
    items.value.forEach(item => {
      if (favorites.some(fav => fav.parentId === item.id)) {
        item.isFavorite = true;
      }
    });
  }
};
const loadCartFromCookies = async () => {
  const cartStr = cookies.get('cart');
  if (cartStr) {
    const cart = JSON.parse(cartStr);
    items.value.forEach(item => {
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
</script>
