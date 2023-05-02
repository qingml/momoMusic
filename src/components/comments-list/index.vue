<template>
  <div class="comments-detail__container">
    <TopTitle :showLine="showLine" :title="title" />
    <div
      class="comments-detail__block"
      :class="hideScrollBar ? 'hide-scroll' : ''"
    >
      <div v-if="data.length == 0">暂无评论</div>
      <div
        v-else
        v-for="(item, index) in data"
        :key="index"
        class="comments-detail__block--item"
      >
        <ElImage
          :src="item.user.avatarUrl + '?param=100y100'"
          class="comments-detail__block--item-img"
          lazy
        />
        <div class="comments-detail__block--item-info-whole">
          <div class="comments-detail__block--item-info">
            <div class="mv-layout">
              <h2 class="comments-detail__block--item-info-commentor">
                {{ item.user.nickname }}
                <span>•{{ dateDifference(item.time) }}月前</span>
              </h2>
              <div v-if="isMv" class="mv-comment-count">
                <i class="iconfont icon-zan"></i>
                <span>({{ item.likedCount }})</span>|
                <i class="iconfont icon-pinglun"></i>
              </div>
            </div>
            <p class="comments-detail__block--item-info-content">
              {{ item.content }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import TopTitle from "@/components/top-title/index.vue";
import { ElImage } from "element-plus";
import { dateDifference } from "@/utils/number";

defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  isMv: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "精彩评论",
  },
  showLine: {
    type: Boolean,
    default: true,
  },
  hideScrollBar: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="less">
.comments-detail {
  &__container {
    background-color: #fff;
    max-width: 100%;
    border-radius: 10px;
    padding: 15px 10px 15px;
    overflow: hidden;
  }

  &__block {
    &.hide-scroll {
      max-height: 650px;

      &::-webkit-scrollbar {
        width: 5px;
      }

      &::-webkit-scrollbar-track-piece {
        background-color: #fff;
      } /* 滚动条的内层滑轨背景颜色 */

      &::-webkit-scrollbar-track {
        background-color: #fff;
      } /* 滚动条的外层滑轨背景颜色 */

      &::-webkit-scrollbar-thumb {
        background-color: #d4d8e2;
        border-radius: 2px;
      } /* 滚动条的内层滑块颜色 */

      &::-webkit-scrollbar-button {
        background-color: #fff;
        display: none;
      }
    }

    width: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;
    box-sizing: border-box;

    &--item {
      width: 100%;
      display: flex;
      flex-direction: row;
      margin-bottom: 20px;

      &-img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
      }
      &-info {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding-left: 15px;

        &-commentor {
          font-size: 15px;
          span {
            font-size: 12px;
            color: #a5a5c1;
          }
        }

        &-content {
          display: block;
          width: 100%;
          margin-top: 10px;
          background-color: #f5f5f5;
          padding: 5px 10px 5px 10px;

          font-size: 12px;
          border-radius: 5px;
          color: #666;
        }

        &-whole {
          flex: 1;
        }

        .mv-layout {
          display: flex;
          flex-direction: row;
          justify-content: space-between;

          .mv-comment-count {
            display: flex;
            flex-direction: row;
            justify-content: space-aroud;
            align-items: center;
            font-size: 12px;
            margin-top: 2px;
            color: #666;
            font-weight: 200;
            position: relative;

            .icon-pinglun {
              padding-left: 5px;
            }

            > * {
              padding-right: 8px;
            }
          }
        }
      }
    }
  }
}
</style>
