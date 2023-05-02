<template>
  <ul class="album__block">
    <li
      class="album__block--item"
      v-for="(item, index) in data"
      :key="index"
      @click="handleJumpDetail(item.id)"
    >
      <div class="album__block--item-wrap">
        <img :src="item.blurPicUrl + '?param=300y300'" />
        <div class="album__block--item-top">
          <i class="iconfont icon-bofang"></i>
          <span> {{ item.subType }}</span>
        </div>
        <div class="album__block--item-bottom">
          <span class="name ellipsis">
            {{ item.name }}
          </span>
          <span class="artist-name">
            {{ item.artist.name }}
          </span>
          <span class="publish-time">
            {{ formatDate(item.publishTime) }}
          </span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { useRouter } from "vue-router";
import { formatDate } from "@/utils/number";
const router = useRouter();

defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const handleJumpDetail = (id) => {
  router.push(`/album-detail/${id}`);
};
</script>

<style lang="less">
.album {
  &__block {
    height: 100%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 20px;
    position: relative;

    &--item {
      list-style-type: none;
      padding: 0px 15px 90px 15px;
      cursor: pointer;

      img {
        width: 160px;
        height: 160px;
      }

      &-wrap {
        z-index: 9;
        height: 160px;

        &::after {
          z-index: -1;
          top: 0px;
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: black;
          content: "";
          display: block;
          left: 8px;
          transition: left 0.4s;
        }

        &:hover {
          &::after {
            left: 12px;
          }
        }
      }

      &-bottom {
        width: 100%;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        position: absolute;
        bottom: -70px;
        //height: 40%;

        > span {
          margin-top: 3px;
          font-size: 12px;
          color: #999;
        }

        .name {
          font-size: 14px;
          color: #4a4a4a;
          font-weight: bolder;
        }
      }

      &-top {
        position: absolute;
        top: 5px;
        right: 14px;
        color: #fff;
        font-size: 12px;
        font-weight: 700;
        line-height: 24px;
        background: black;
        display: flex;
        align-items: center;
        padding: 0 10px;

        span {
          font-weight: bolder;
        }
      }
    }
  }
}
</style>
