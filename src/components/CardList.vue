<template>
  <div v-auto-animate class="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <card
        v-for="item in items"
        :key="item.id"
        :image-url="item.imageUrl"
        :title="item.title"
        :price="item.price"
        :is-favorite="item.isFavorite"
        :is-added="item.isAdded"
        @click-add="() => emit('updateCart', item)"
        @click-favorite="() => emit('addToFavorite', item)"
    ></card>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import Card from "@/components/Card.vue";

defineProps({
  items: Array
});

const emit = defineEmits(['updateCart', 'addToFavorite']);
</script>
