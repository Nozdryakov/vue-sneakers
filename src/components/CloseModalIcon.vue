<template>
  <svg
      width="33"
      height="33"
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="delete-icon"
  >
    <circle cx="16.0484" cy="16.0484" r="15.5635" :stroke="strokeColor" stroke-width="0.969786" />
    <path
        d="M21.0547 21.0554L16.5182 16.519M16.5182 16.519L11.9818 11.9825M16.5182 16.519L21.0547 11.9825M16.5182 16.519L11.9818 21.0554"
        :stroke="strokeColor"
        stroke-width="1.60388"
        stroke-linecap="round"
    />
  </svg>
</template>

<script setup>
let strokeColor = '#D3D3D3';
</script>

<style scoped>
.delete-icon:hover {
  cursor: pointer;
}

.delete-icon:hover circle,
.delete-icon:hover path {
  stroke: #121010;
}
</style>
