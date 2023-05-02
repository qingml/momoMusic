<template>
  <div class="introduction__container">
    <div class="introduction__container-brefdescription">
      <div class="introduction__container-brefdescription-title">简介</div>
      <div class="introduction__container-brefdescription-content">
        {{ data.briefDesc }}
      </div>
    </div>
    <div class="introduction__container-introduction">
      <div
        class="introduction__container-introduction--item"
        v-for="(item, index) in data.introduction"
        :key="index"
      >
        <div class="introduction__container-introduction--item-title">
          {{ item.ti }}
        </div>
        <p class="introduction__container-introduction--item-introdetail">
          {{ item.txt }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  data: {
    type: Object,
    default: "",
  },
});
</script>

<style lang="less" scoped>
.introduction {
  &__container {
    &-brefdescription {
      margin-top: 30px;
      text-align: center;
      padding: 15px;

      &-title {
        font-weight: 500px;
        margin-bottom: 30px;
        font-weight: bold;
      }

      &-content {
        line-height: 1.7;
        margin-bottom: 20px;
        font-size: 14px;
        line-height: 2em;
      }
    }

    &-introduction {
      padding: 15px;

      &--item {
        &-title {
          font-weight: bold;
          padding: 8px 0;
        }

        &-introdetail {
          white-space: pre-wrap;
          font-size: 14px;
          line-height: 2em;
        }
      }
    }
  }
}
</style>
