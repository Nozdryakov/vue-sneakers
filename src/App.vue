<template>
  <router-view></router-view>
  <drawer v-if="cartOpen" :total-cost="totalCost" :vat-price="vatPrice" @create-order="createOrder" :cart-button-disabled="cartButtonDisabled"></drawer>
  <modal-window :is-visible="isVisibleModalWindow" @update:isVisible="isVisibleModalWindow = $event">Ожидайте, ваш заказ принят!</modal-window>
</template>

<script setup>
import { ref, computed, provide, onMounted } from 'vue';
import { useCookies } from 'vue3-cookies';
import Drawer from '@/components/Drawer.vue';
import ModalWindow from '@/components/ModalWindow.vue';

const cartOpen = ref(false);
const basket = ref([]);
const isCreatingOrder = ref(false);
const isVisibleModalWindow = ref(false);

const basketIsEmpty = computed(() => basket.value.length === 0);
const cartButtonDisabled = computed(() => isCreatingOrder.value || basketIsEmpty.value);

const totalCost = computed(() => basket.value.reduce((acc, item) => acc + item.price, 0));
const vatPrice = computed(() => Math.round((totalCost.value * 5) / 100));

const closeDrawer = () => {
  cartOpen.value = false;
};
const openDrawer = () => {
  cartOpen.value = true;
};

const { cookies } = useCookies();

const loadCartFromCookies = async () => {
  const cartStr = cookies.get('cart');
  if (cartStr) {
    const cart = JSON.parse(cartStr);
    basket.value = cart;
  }
};

const createOrder = async () => {
  try {
    isCreatingOrder.value = true;
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
    isVisibleModalWindow.value = true;
    closeDrawer();
  } catch (error) {
    console.error('Ошибка при создании заказа:', error);
  } finally {
    isCreatingOrder.value = false;
  }
};

onMounted(() => {
  loadCartFromCookies();
});

provide('cartActions', {
  basket,
  totalCost,
  closeDrawer,
  openDrawer,
});
</script>
