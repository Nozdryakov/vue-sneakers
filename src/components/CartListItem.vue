<template>
 <div v-auto-animate class="flex flex-col gap-4">
  <cart-item v-for="item in basket"
    :key="item.id"
    :title="item.title"
    :price="item.price"
    :image-url="item.imageUrl"
    @on-click-remove="() => removeItemFromCart(item)"


    >
  </cart-item>
 </div>
</template>
<script setup>
import CartItem from "@/components/CartItem.vue";
import {inject} from "vue";

const  { basket } = inject('cartActions');
const { removeItemFromCart } = inject('CartHomeActions');
console.log(basket.value);
</script>
