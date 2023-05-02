<template>
  <div class="playlist-detail-subscribers__container">
    <TopTitle :showLine="true" title="喜欢这个歌单的人" />
    <div v-if="isMvDescri" class="mv-descri">
      <p v-if="mvDescriData.length == 0">暂无喜欢该歌单的人</p>
      <p v-else>{{ mvDescriData }}</p>
    </div>
    <div v-else class="playlist-detail-subscribers__block">
      <div class="prompt" v-if="data.length == 0">暂无喜欢该歌单的人</div>
      <div
        v-else
        v-for="(item, index) in data"
        :key="index"
        class="playlist-detail-subscribers__block--item"
        @click="handleJumpPesonal(item.userId)"
      >
        <div
          class="playlist-detail-subscribers__block--item-img"
          :title="item.nickname"
        >
          <ElImage :src="item.avatarUrl + '?param=100y100'" lazy />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import TopTitle from "@/components/top-title/index.vue";
import { useRouter } from "vue-router";
import { ElImage } from "element-plus";

const router = useRouter();

defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  isMvDescri: {
    type: Boolean,
    default: false,
  },
  mvDescriData: {
    type: String,
    default: () => "",
  },
});

const handleJumpPesonal = (id) => {
  router.push(`/personal-info/${id}`);
};
</script>
<style lang="less">
.playlist-detail-subscribers {
  &__container {
    background-color: #fff;
    width: 320px;
    height: auto;
    padding: 15px 10px 15px;
    padding-bottom: 5px;
    margin-bottom: 20px;
    border-radius: 10px;

    .mv-descri {
      p {
        font-size: 14px;
        color: #4a4a4a;
        padding-bottom: 5px;
      }
    }
  }

  &__block {
    width: 300px;
    height: 170px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  

    .prompt {
      font-weight: 400;
    }

    &--item {
      width: 42px;
      height: 42px;
      overflow: hidden;
      cursor: pointer;

      &-img {
        img {
          width: 38px;
          height: 38px;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
