<template>
<div class="flex flex-col items-center text-center w-72 mx-auto">
  <img :src="imageUrl" height="80" width="80" alt="info image">
  <h2 class="mt-4 text-2xl font-medium">{{title}}</h2>
  <p class="text-gray-400 mt-3.5">{{description}}</p>
</div>
</template>
<script setup>
defineProps({
  title: String,
  description: String,
  imageUrl: String
})
</script>
