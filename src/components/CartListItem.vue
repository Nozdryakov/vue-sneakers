<template>
 <div class="flex flex-col gap-4">
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

const  { basket, removeItemFromCart } = inject('cartActions');
</script>
