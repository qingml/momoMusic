<template>
  <div class="playlist-related-recommend__container" v-if="data.length">
    <TopTitle v-if="isHotAlbum" :showLine="true" title="热门专辑" />
    <TopTitle v-else :showLine="true" title="相关推荐" />

    <div class="playlist-related-recommend__block">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="playlist-related-recommend__block--item"
        @click="() => handleJumpDetail(item.id)"
      >
        <ElImage
          :src="item.coverImgUrl + '?param=100y100'"
          class="playlist-related-recommend__block--item-img"
          lazy
        />
        <div class="playlist-related-recommend__block--item-content">
          <div
            class="playlist-related-recommend__block--item-content-name ellipsis"
          >
            {{ item.name }}
          </div>
          <span class="playlist-related-recommend__block--item-content-creator">
            By. {{ item.creator.nickname }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import TopTitle from "@/components/top-title/index.vue";
import { ElImage } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  isHotAlbum: {
    type: Boolean,
    default: false,
  },
  isMv: {
    type: Boolean,
    default: false,
  },
});

const handleJumpDetail = (id) => {
  if (props.isHotAlbum) {
    router.push(`/album-detail/${id}`);
  } else {
    router.push(`/playlist-detail/${id}`);
  }
};
</script>

<style lang="less" scoped>
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
    width: 300px;
    max-height: 300px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;
    box-sizing: border-box;

    &--item {
      width: 100%;
      height: 50px;
      margin-bottom: 16px;
      display: flex;
      flex-direction: row;
      align-items: center;
      &-img {
        width: 50px;
        height: 50px;
        border-radius: 5px;
        cursor: pointer;
      }
      &-content {
        padding-left: 15px;
        height: 50px;
        width: 240px;
        &-name {
          font-size: 14px;
          cursor: pointer;
          &:hover {
            color: var(--color-text-red);
          }
        }
        &-creator {
          font-size: 12px;
          color: #a5a5c1;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
