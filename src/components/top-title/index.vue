<template>
  <h2 class="top-title">
    <span v-if="showLine" class="top-line" />
    <span>{{ title }}</span>
  </h2>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: "",
  },
  showLine: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="less">
.top-title {
  padding-bottom: 16px;
  display: flex;
  align-items: center;

  span {
    font-weight: bold;
    font-size: 14px;
  }
}

.top-line {
  width: 3px;
  background-color: var(--color-text-red);
  height: 20px;
  display: inline-block;
  margin-right: 12px;
}
</style>
