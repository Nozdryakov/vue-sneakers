<template>
  <div class="grid grid-cols-4 gap-5">
    <card
        v-for="item in items"
        :key="item.id"
        :image-url="item.imageUrl"
        :title="item.title"
        :price="item.price"
        :is-favorite="true"
        :on-click-add="onClickAdd"
    ></card>
  </div>
</template>
<script setup>
import Card from "@/components/Card.vue";

defineProps({
  items: Array
})
const onClickAdd = () => {
    alert('add');
}
</script>
