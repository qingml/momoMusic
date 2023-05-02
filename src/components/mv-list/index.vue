<template>
  <div class="mv__block">
    <div class="mv__block--item" v-for="(item, index) in data" :key="index">
      <div class="mv__block--item-wrap">
        <img :src="item.imgurl16v9 " />
        <div class="mv__block--item-top">
          <span class="mv__block--item-count">
            <i class="iconfont icon-bofang"></i>
            <span> {{ formatNumber(item.playCount) }}</span>
          </span>
        </div>
        <div class="mv__block--item-middle">
          <i
            class="iconfont icon-bofang"
            @click="() => handleJumpDetail(item.id)"
          ></i>
        </div>
        <div class="mv__block--item-bottom">
          <span>{{ item.artistName }}</span>
          <span>{{ formatDurationMv(item.duration) }}</span>
        </div>
      </div>
      <div class="mv__block--item-title ellipsis">
        {{ item.name || item.title }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

import { formatNumber, formatDurationMv } from "@/utils/number";

const router = useRouter();
defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const handleJumpDetail = (id) => {

  router.push(`/mv-detail/${id}`);
};
</script>

<style lang="less">
.mv {
  &__block {
    height: 100%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &--item {
      padding: 20px 15px;
      width: 25%;

      img {
        width: 100%;
        height: 100%;
      }
      &-wrap {
        height: 160px;
        width: 100%;
        position: relative;
      }

      &-wrap:hover {
        .mv__block--item-middle {
          background: rgba(0, 0, 0, 0.5);
          i {
            font-size: 28px;
          }
        }
      }

      &-middle {
        display: flex;
        height: 0;
        overflow: hidden;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0);
        color: red;
        top: 0;
        left: 0;
        position: absolute;
        justify-content: center;
        align-items: center;
        i {
          font-size: 0px;
          cursor: pointer;
        }
        transition: all 0.5s;
      }

      &-title {
        padding-top: 10px;
        font-size: 14px;
        width: 90%;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
      }

      &-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 20%;
        position: absolute;
        bottom: 0;
        font-size: 14px;
        color: #fff;
        font-weight: 400;
        background: rgba(0, 0, 0, 0.6);
        width: 100%;

        span {
          padding: 0 10px;
        }
      }
      &-top {
        position: absolute;
        top: 5px;
        right: 0px;
        color: #fff;
        font-size: 12px;
        font-weight: 700;
        line-height: 24px;
        background: black;
        display: flex;
        align-items: center;
        padding: 0 10px;
      }
      &-count {
        display: flex;
        justify-content: space-between;

        span {
          padding-left: 3px;
        }
      }
    }
  }
}
</style>
