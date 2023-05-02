<template>
  <div class="recommend-song__block">
    <div
      v-for="(item, key) in data"
      :key="key"
      class="recommend-song__block--item"
    >
      <div
        class="recommend-song__block--item-box"
        @click="() => handleClick(item)"
      >
        <ElImage
          :src="item.picUrl + '?param=200y200'"
          class="recommend-song__block--item-pic"
          lazy
        />
        <div class="recommend-song__block--item-content">
          <div class="recommend-song__block--item-info">
            <div class="recommend-song__block--item-title ellipsis-two">
              {{ item.name }}
            </div>
            <div
              class="recommend-song__block--item-name ellipsis-two"
              :title="item.singer"
            >
              {{ item.singer }}
            </div>
          </div>
          <div class="recommend-song__block--item-time">
            {{ formatDurationPlay(item.duration) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { ElImage } from "element-plus";

import { formatDurationPlay } from "@/utils/number";

defineProps({
  data: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
});

const emit = defineEmits(["click"]);

const handleClick = (item: any) => {
  emit("click", item);
};
</script>

<style lang="less">
.recommend-song {
  &__block {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-between;
    cursor: pointer;

    &--item {
      width: 30%;

      &-box {
        border-top: 1px solid #f2f2f2;
        display: flex;
        padding: 12px 0;
      }

      &-pic {
        width: 86px;
        height: 86px;
        margin-right: 16px;
      }

      &-content {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      &-info {
        font-size: 14px;
        font-weight: 600;
        min-width: 100px;
      }

      &-name {
        font-weight: 500;
        color: #999;
      }

      &-title {
        font-weight: 600;
        width: 90%;
        color: #333;
      }
    }
  }
}
</style>
