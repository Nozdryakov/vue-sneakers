<template>
  <router-view></router-view>
</template>

<script setup>
import {provide, ref, computed, onMounted} from 'vue';
import { useCookies } from 'vue3-cookies';

const cartOpen = ref(false);
const basket = ref([]);
const totalCost = ref(0);
const updateTotalCost = () => {
  totalCost.value = basket.value.reduce((acc, item) => acc + item.price, 0);
  cookies.set('totalCost', JSON.stringify(totalCost.value));
};
const vatPrice = computed(() => Math.round((totalCost.value * 5) / 100));
const closeDrawer = () => {
  cartOpen.value = false;
}
const openDrawer = () => {
  cartOpen.value = true;
  console.log(cartOpen.value);
}

const { cookies } = useCookies();

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

onMounted( ()=> {
  const totalCostStr = cookies.get('totalCost');
  if (totalCostStr) {
    totalCost.value = parseFloat(totalCostStr);
  }
});

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const favoritesStr = cookies.get('favorites');
      let favorites = [];
      if (favoritesStr) {
        favorites = JSON.parse(favoritesStr);
      }
      favorites.push({
        FavId: item.id,
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
    basket.value.push(item);
    updateTotalCost();
    item.isAdded = true;
  }
};

const removeItemFromCart = async (item) => {
  let cart = JSON.parse(cookies.get('cart'));
  cart = cart.filter(cartItem => cartItem.id !== item.id);
  cookies.set('cart', JSON.stringify(cart));
  basket.value = basket.value.filter(basketItem => basketItem.id !== item.id);
  item.isAdded = false;
  updateTotalCost();
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



const cartActions = {
  basket,
  totalCost,
  vatPrice,
  cartOpen,
  closeDrawer,
  openDrawer,
  addToFavorite,
  updateCart,
  createOrder,
  removeItemFromCart,
  updateTotalCost
};

provide('cartActions', cartActions);
</script>
