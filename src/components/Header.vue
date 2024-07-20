<template>
  <header class="flex justify-between border-b border-slate-300 px-8 py-4">
    <router-link to="/">
    <div class="flex items-center gap-4">
        <img src = "/logo.png" alt="Logo" class="w-10"/>
        <div>
          <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
          <p class="text-slate-400">Магазин лучших кроссовок</p>
        </div>

    </div>
    </router-link>

    <ul class="flex items-center gap-10">
      <li @click="() => emit('openDrawer')" class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
        <img src="/cart.svg" alt="cart"/>
        <b>{{totalCost}} грн.</b>
      </li>
      <router-link to="/favorites">
        <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
          <img src="/heart.svg" alt="heart"/>
          <span>Закладки</span>
        </li>
      </router-link>
    </ul>
  </header>
</template>
<script setup>
defineProps({
  totalCost: Number
})
const  emit = defineEmits(['openDrawer']);
</script>
