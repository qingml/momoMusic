<template>
  <div class="playlist-related-recommend__container">
    <TopTitle :showLine="true" :title="title" />
    <div class="mv-related-recommend__block">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="playlist-related-recommend__block--item"
      >
        <div class="paly">
          <!-- + '?param=150y150' -->
          <img
            v-if="isSearch"
            :src="item.cover"
            class="playlist-related-recommend__block--item-img"
          />
          <img
            v-else
            :src="item.cover"
            class="playlist-related-recommend__block--item-img"
          />
          <div class="middle">
            <i
              class="iconfont icon-bofang"
              @click="() => handleJumpMvDetail(item.id)"
            ></i>
          </div>
        </div>

        <div class="playlist-related-recommend__block--item-content">
          <div class="mv-name">
            <i class="iconfont icon-MV"></i>
            <div
              class="playlist-related-recommend__block--item-content-name ellipsis"
            >
              {{ item.name }}
            </div>
          </div>

          <span class="playlist-related-recommend__block--item-content-creator">
            By. {{ item.artistName }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import TopTitle from "@/components/top-title/index.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: "相关推荐",
  },
  isSearch: {
    type: Boolean,
    default: false,
  },
});

const handleJumpMvDetail = (id) => {
  router.push(`/mv-detail/${id}`);
};
</script>

<style lang="less" scoped>
.play {
  position: relative;
}
.middle {
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
  }
  transition: all 0.5s;
}
.playlist-related-recommend {
  &__container {
    background-color: #fff;
    margin-bottom: 20px;
    width: 320px;
    padding: 15px 10px 15px;
    padding-bottom: 25px;
    border-radius: 10px;
  }

  &__block {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    &--item {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      &-img {
        width: 100%;
        height: 100%;
      }
      &-content {
        padding-top: 10px;
        height: 50px;
        width: 240px;
        margin-bottom: 20px;
        .mv-name {
          display: flex;
          flex-direction: row;
          align-items: center;
          i {
            color: var(--vt-c-text-light-2);
          }
        }
        &-name {
          font-size: 14px;
          padding-left: 8px;
        }
        &-creator {
          font-size: 12px;
          color: #a5a5c1;
        }
      }
    }

    &--item:hover {
      .middle {
        background: rgba(0, 0, 0, 0.5);
        i {
          font-size: 28px;
        }
      }
    }
  }
}
</style>
