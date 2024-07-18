<template>
  <div class="grid grid-cols-4 gap-5">
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
import {defineProps, defineEmits, inject} from 'vue';
import Card from "@/components/Card.vue";

defineProps({
  items: Array
});

const emit = defineEmits(['updateCart', 'addToFavorite']);
</script>
