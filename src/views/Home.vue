<template>
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header :total-cost="cartActions.totalCost" @openDrawer="openDrawer"></Header>

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
        <card-list :items="filteredItems" @updateCart="updateCart" @addToFavorite="addToFavorite"></card-list>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted, inject, provide} from 'vue';
import Header from '@/components/Header.vue';
import CardList from '@/components/CardList.vue';
import { useCookies } from 'vue3-cookies';

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
  // ... остальные товары
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
  }
};

const cartActions = inject('cartActions');

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const favoritesStr = cookies.get('favorites');
      let favorites = [];

      if (favoritesStr) {
        favorites = JSON.parse(favoritesStr);
      }

      favorites.push({
        parentId: item.id,
        title: item.title,
        price: item.price,
        imageUrl: item.imageUrl
      });
      cookies.set('favorites', JSON.stringify(favorites));
      item.isFavorite = true;
    } else {
      const favoritesStr = cookies.get('favorites');
      if (favoritesStr) {
        const favorites = JSON.parse(favoritesStr);

        const index = favorites.findIndex(fav => fav.parentId === item.id);

        if (index !== -1) {
          favorites.splice(index, 1);
          cookies.set('favorites', JSON.stringify(favorites));
          item.isFavorite = false;
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const addItemToCart = async (item) => {
  const cartStr = cookies.get('cart');
  let cart = cartStr ? JSON.parse(cartStr) : [];
  if (!cart.some(cartItem => cartItem.id === item.id)) {
    cart.push({
      id: item.id,
      title: item.title,
      price: item.price,
      imageUrl: item.imageUrl
    });
    cookies.set('cart', JSON.stringify(cart));
    cartActions.basket.value.push(item);
    item.isAdded = true;
  }
};

const removeItemFromCart = async (item) => {
  const cartStr = cookies.get('cart');
  if (cartStr) {
    let cart = JSON.parse(cartStr);
    cart = cart.filter(cartItem => cartItem.id !== item.id);
    cookies.set('cart', JSON.stringify(cart));
    cartActions.basket.value = cartActions.basket.value.filter(basketItem => basketItem.id !== item.id);
    item.isAdded = false;
  }
};

const updateCart = async (item) => {
  try {
    if (!item.isAdded) {
      await addItemToCart(item);
    } else {
      await removeItemFromCart(item);
    }
  } catch (err) {
    console.log(err);
  }
};
const openDrawer = cartActions.openDrawer;
provide('CartHomeActions', {
  addToFavorite,
  removeItemFromCart
});
onMounted(() => {
  loadFavoritesFromCookies();
  loadCartFromCookies();
});
</script>
