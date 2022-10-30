<template>
  <div class="recommend-play-list__block">
    <div
      class="recommend-play-list__block--item"
      v-for="(item, index) in data"
      :key="index"
    >
      <div
        class="recommend-play-list__block--item-wrap"
        @click="() => handleJumpDetail(item.id)"
      >
        <ElImage :src="item.picUrl + '?param=200y200'" />
        <div class="recommend-play-list__block--item-bottom">
          <span class="recommend-play-list__block--item-count">
            <i class="iconfont icon-erji"></i>
            <span>{{ formatNumber(item.playCount) }}</span>
          </span>
          <i class="iconfont icon-bofang"></i>
        </div>
      </div>
      <div class="recommend-play-list__block--item-title" :title="item.name">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { useRouter } from "vue-router";
import { ElImage } from "element-plus";

import { formatNumber } from "@/utils/number";
import { IRecommendPlayItem } from "./type";

const router = useRouter();

defineProps({
  data: {
    type: Array as PropType<IRecommendPlayItem[]>,
    default: () => [],
  },
});

const handleJumpDetail = (id: number | string) => {
  router.push(`/playlist-detail/${id}`);
};
</script>

<style lang="less" scoped>
@import "@/assets/base.css";

.recommend-play-list {
  &__block {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    &--item {
      padding: 0 12px 24px 0;
      width: 12.5%;
      cursor: pointer;

      .el-image {
        border-radius: 8px;
        height: 136px;
      }

      &-wrap {
        height: 136px;
        width: 100%;
        position: relative;
      }

      &-title {
        padding-top: 6px;
        font-size: 14px;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        cursor: pointer;
        width: 136px;
        &:hover {
          color: var(--color-text-red);
        }
      }

      &-bottom {
        background-color: rgb(16 22 26 / 35%);
        display: flex;
        justify-content: space-between;
        position: absolute;
        bottom: 0;
        color: #fff;
        width: 136px;
        font-size: 12px;
        border-radius: 8px;
        padding: 0 4px;
      }
    }
  }
}
</style>
