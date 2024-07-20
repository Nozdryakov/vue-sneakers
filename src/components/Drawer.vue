<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-50"></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <drawer-head></drawer-head>
    <div v-if="orders.length > 0 && !totalCost" class="flex h-full items-center">
      <InfoBlock

          title="Заказ оформлен!"
          :description="`Ваш заказ скоро будет передан курьерской доставке`"
          image-url="/order-success-icon.png"
      />
    </div>
      <div v-else-if="!totalCost" class="flex h-full items-center">
      <info-block
                  title="Корзина пуста"
                  description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
                  image-url="/package-icon.png">
      </info-block>
      </div>
    <div v-else>
      <cart-list-item/>
      <div class="flex flex-col gap-4 my-7">
        <div class="flex gap-2">
          <span>Итого:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{totalCost}} грн.</b>
        </div>
        <div class="flex gap-2">
          <span>Налог 5%:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{vatPrice}} грн.</b>
        </div>
        <button
            :disabled="cartButtonDisabled"
            @click="()=>emit('createOrder')"
            class="transition bg-lime-500 w-full rounded-xl py-3 text-white disabled:bg-slate-400 hover:bg-lime-600 active:bg-lime-700">
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import DrawerHead from "@/components/DrawerHead.vue";
import CartListItem from "@/components/CartListItem.vue";
import InfoBlock from "@/components/InfoBlock.vue";
import { useCookies } from "vue3-cookies";
import { ref } from "vue";

defineProps({
  totalCost: Number,
  vatPrice: Number,
  cartButtonDisabled: Boolean
});

const { cookies } = useCookies();
const orders = ref([]);
const ordersStr = cookies.get('orders');
if (ordersStr) {
  orders.value = JSON.parse(ordersStr);
}
const emit = defineEmits(['createOrder']);
</script>
