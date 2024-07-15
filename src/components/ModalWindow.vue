<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">

    <div class="modal-content" @click.stop>
      <close-modal-icon class="close-button" @click="closeModal"></close-modal-icon>
      <div class="modal__msgs">
        <slot></slot>
      </div>
      <true-order-icon></true-order-icon>
    </div>
  </div>
</template>

<script setup>
import CloseModalIcon from "@/components/CloseModalIcon.vue";
import TrueOrderIcon from "@/components/TrueOrderIcon.vue";


defineProps({
  isVisible: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['update:isVisible']);

const closeModal = () => {
  emit('update:isVisible', false);
};
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Raleway-400", serif;
  z-index: 100;
}

.modal-content {
  background: white;
  min-width: 300px;
  padding: 35px;
  border-radius: 28px;
  z-index: 100;
  position: relative;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
.modal__msgs {
  margin-top: 30px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  top: 50%;
}
</style>
