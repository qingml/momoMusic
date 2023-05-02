<template>
  <div class="playlist__container">
    <div class="playlist__operate-btns">
      <ElButton color="#fa2800" round @click="handlePlayAll">
        <i class="iconfont icon-bofang"></i>
        播放全部
      </ElButton>
      <ElButton v-if="hasCollect" round>
        <i class="iconfont icon-aixin"></i>
        收藏
      </ElButton>
    </div>
    <div class="playlist-content">
      <div class="playlist-content__item playlist-content__header">
        <span class="playlist-content__item-index">序号</span>
        <span class="playlist-content__item-song">歌曲</span>
        <span class="playlist-content__item-singer">歌手</span>
        <span class="playlist-content__item-album">专辑</span>
        <span class="playlist-content__item-time">时长</span>
      </div>
      <div class="playlist-content__body" @scroll="handleScroll">
        <div
          class="playlist-content__body-inner"
          :style="`height: ${playListBodyHeight}px`"
        >
          <div ref="listInnerRef">
            <div
              v-for="item in currentData"
              class="playlist-content__item"
              :class="[
                !(getCurrentIndex(item.id) % 2)
                  ? 'playlist-content__item-even'
                  : '',
              ]"
              :key="item.id"
              @click="() => handlePlayCurrent(item.id)"
            >
              <span class="playlist-content__item-index">
                <i class="iconfont icon-bofang"></i>
                <span>
                  {{ paddingZero(getCurrentIndex(item.id) + 1, 2) }}
                </span>
              </span>
              <span class="playlist-content__item-song">
                <ElImage :src="item.picUrl + '?param=80y80'" />
                <span class="ellipsis" :title="item.name">{{ item.name }}</span>
              </span>
              <span class="playlist-content__item-singer ellipsis">{{
                item.singer
              }}</span>
              <span
                class="playlist-content__item-album ellipsis"
                :title="item.album"
              >
                {{ item.album }}
              </span>
              <span class="playlist-content__item-time">
                {{ formatDurationPlay(item.duration) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs, ref, PropType, onMounted, computed, watch } from "vue";
import { ElButton, ElImage } from "element-plus";
import { throttle } from "lodash";

import { formatDurationPlay, paddingZero } from "@/utils/number";
import { usePlayerStore } from "@/stores/player";
import { IRecommendSongItem } from "../song-list/type";

const playerStore = usePlayerStore();

const props = defineProps({
  data: {
    type: Array as PropType<IRecommendSongItem[]>,
    default: () => [],
  },
  hasCollect: {
    type: Boolean,
    default: true,
  },
  pageSize: {
    type: Number,
    default: 20,
  },
});

const { data, hasCollect, pageSize } = toRefs(props);
const currentData = ref<IRecommendSongItem[]>([]);
const listInnerRef = ref<HTMLDivElement>();
const scrollTopItemCount = ref(0);

const playListBodyHeight = computed(() => data.value.length * 50);

const handlePlayAll = () => {
  playerStore.setCurrentPlaySongList(data.value);
};

const handlePlayCurrent = (currentId: number) => {
  playerStore.setCurrentPlaySongList(data.value, getCurrentIndex(currentId));
};

watch(data, (newData) => {
  console.log("newData", newData);
  if (newData.length) {
    currentData.value = newData.slice(0, pageSize.value);
  }
});
onMounted(() => {
  currentData.value = data.value.slice(0, pageSize.value);
  listInnerRef.value!.style.transform = `translateY(${0}px)`;
});

const scrollFn = (e: any) => {
  const { scrollTop } = e.target;
  const scrollItemCount = Math.floor(scrollTop / 50);
  scrollTopItemCount.value = scrollItemCount;
  const startIndex = Math.max(scrollItemCount - 5, 0);
  const endIndex = Math.min(
    scrollItemCount + pageSize.value,
    data.value.length
  );
  listInnerRef.value!.style.transform = `translateY(${startIndex * 50}px)`;
  currentData.value = data.value.slice(startIndex, endIndex + 5);
};

const handleScroll = throttle(scrollFn, 100);

const getCurrentIndex = (currentId: number) => {
  return data.value.findIndex((it) => it.id === currentId);
};
</script>

<style lang="less" scoped>
.playlist {
  &__container {
    background-color: #fff;
    padding: 20px 15px;
  }

  &__operate-btns {
    float: right;
    i {
      padding-right: 5px;
    }

    button.el-button.el-button {
      &:hover {
        background-color: inherit;
        border-color: inherit;
        color: inherit;
      }
    }
  }

  &-content {
    width: 100%;
    padding-top: 20px;
    overflow: hidden;

    &__item-even {
      background-color: #f7f7f7;
    }

    &__item:hover {
      background-color: #ffe8e9;

      .playlist-content__item-index {
        .icon-bofang {
          display: inline-block;
        }
        span {
          display: none;
        }
      }
    }

    &__item {
      display: flex;
      height: 50px;
      align-items: center;
      cursor: pointer;

      .icon-bofang {
        display: none;
      }

      > span {
        padding: 0 16px;
      }

      &-index {
        width: 10%;
        text-align: center;
      }

      &-song {
        width: 40%;
        display: flex;
        align-items: center;
        span {
          flex: 1;
        }

        .el-image {
          width: 35px;
          height: 35px;
          border-radius: 5px;
          margin-right: 16px;
        }
      }

      &-singer {
        width: 25%;
      }

      &-album {
        width: 15%;
      }

      &-time {
        width: 10%;
      }
    }

    &__header {
      color: #999;

      span {
        font-weight: 300;
      }
    }

    &__body {
      height: 1000px;
      overflow-y: auto;
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
  }
}
</style>
