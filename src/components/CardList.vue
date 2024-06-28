<template>
  <div class="grid grid-cols-4 gap-5">
    <card
        image-url="/sneakers/sneakers-1.jpg"
        title="Hello"
        :price="5000"
        :is-favorite="true"
        :on-click-add="onClickAdd"
    ></card>
    <card image-url="/sneakers/sneakers-2.jpg"></card>
    <card image-url="/sneakers/sneakers-3.jpg"></card>
    <card></card>
    <card></card>
    <card></card>
  </div>
</template>
<script setup>
import Card from "@/components/Card.vue";

const onClickAdd = () => {
    alert('add');
}
</script>
