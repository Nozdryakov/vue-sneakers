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
import {ref, computed, provide, onMounted } from 'vue';
import Header from "@/components/Header.vue";
import CardList from "@/components/CardList.vue";
import { useCookies } from "vue3-cookies";
import Drawer from "@/components/Drawer.vue";

const cartOpen = ref(false);
const basket = ref([]);
const totalCost = computed(
    ()=> basket.value.reduce((acc, item) => acc + item.price, 0)
);
const vatPrice = computed(
    ()=> Math.round((totalCost.value * 5 ) / 100));
const closeDrawer = () => {
  cartOpen.value = false;
}
const openDrawer = () => {
  cartOpen.value = true;
  console.log(cartOpen.value);
}
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
  }
};

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      // Get the current 'favorites' cookie value
      const favoritesStr = cookies.get('favorites');
      let favorites = [];

      // If the cookie exists, parse the existing favorites
      if (favoritesStr) {
        favorites = JSON.parse(favoritesStr);
      }

      // Add the new item to the favorites array
      favorites.push({ parentId: item.id });

      // Update the 'favorites' cookie with the new array
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
    basket.value.push(item);
    item.isAdded = true;
  }
};

const removeItemFromCart = async (item) => {
  const cartStr = cookies.get('cart');
  if (cartStr) {
    let cart = JSON.parse(cartStr);
    cart = cart.filter(cartItem => cartItem.id !== item.id);
    cookies.set('cart', JSON.stringify(cart));
    basket.value = basket.value.filter(basketItem => basketItem.id !== item.id);
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
const createOrder = async () => {
  try {
    const newOrder = {
      items: basket.value,
      totalCost: totalCost.value,
      vatPrice: vatPrice.value,
      date: new Date().toISOString()
    };

    const ordersStr = cookies.get('orders');
    let orders = ordersStr ? JSON.parse(ordersStr) : [];

    orders.push(newOrder);

    cookies.set('orders', JSON.stringify(orders));

    basket.value = [];
    cookies.set('cart', JSON.stringify(basket.value));
    items.value.forEach(item => {
      item.isAdded = false;
    })
    closeDrawer();
  } catch (error) {
    console.error('Ошибка при создании заказа:', error);
  }
};

onMounted(() => {
  loadFavoritesFromCookies();
  loadCartFromCookies();
});

provide('cartActions', {
  basket,
  removeItemFromCart,
  closeDrawer,
  openDrawer
});
</script>
