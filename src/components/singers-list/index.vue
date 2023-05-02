<template>
  <div class="recommend-singers__block">
    <div
      v-for="(item, index) in data"
      :key="index"
      class="recommend-singers__block--item"
      @click="() => handleJumpSingerDeatil(item.id)"
    >
      <ElImage
        class="recommend-singers__block--item-img"
        :src="item.img1v1Url + '?param=100y100'"
        lazy
      />
      <div class="recommend-singers__block--item-info">
        <div
          class="recommend-singers__block--item-name ellipsis"
          :title="item.name"
        >
          {{ item.name }}
        </div>
        <div class="recommend-singers__block--item-count" v-if="item.musicSize">
          单曲数
          {{ item.musicSize }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PropType, ref } from "vue";
import { IRecommendSingersItem } from "./type";
import { useRouter } from "vue-router";
import { ElImage } from "element-plus";

const router = useRouter();

defineProps({
  data: {
    type: Array as PropType<IRecommendSingersItem[]>,
    default: () => [],
  },
});

const handleJumpSingerDeatil = (id: number | string) => {
  console.log("jump");
  router.push(`/singerlist-detail/${id}`);
};
</script>

<style lang="less">
.recommend-singers {
  &__block {
    overflow: hidden;

    &--item {
      float: left;

      padding: 16px 0;
      margin-right: 31.1px;
      text-align: center;
      cursor: pointer;

      &:nth-child(10n) {
        margin-right: 0;
      }

      &-info {
        padding-top: 12px;
        width: 100px;
        overflow: hidden;
      }

      &-img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }

      &-name {
        font-size: 14px;

        font-weight: bold;
      }

      &-count {
        padding-top: 8px;
        color: #fa2800;
        font-size: 12px;
      }
    }
  }
}
</style>
