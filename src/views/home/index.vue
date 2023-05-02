<template>
  <ElSkeleton v-if="loading" :rows="10" animated />
  <template v-else>
    <TopBanner :data="bannerData" />
    <div class="recommend-play-list__container mt-24">
      <TopTitle title="歌单推荐" />
      <CuratePlaylist :data="recommendData" />
    </div>
    <div class="recommend-song__container mt-24">
      <TopTitle title="新歌推荐" />
      <SongList @click="handleSongClick" :data="songsData" />
    </div>
    <div class="recommend-singers__container mt-24">
      <TopTitle title="推荐歌手" />
      <SingerList :data="singersData" />
    </div>
  </template>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  getBanner,
  getRecommendPlaylist,
  getNewSongs,
  getHotSingers,
} from "@/api/home";
import TopBanner, { IBannerItem } from "./components/top-banner/index.vue";
import TopTitle from "@/components/top-title/index.vue";
import SongList from "@/components/song-list/index.vue";
import SingerList from "@/components/singers-list/index.vue";
import CuratePlaylist from "@/components/curate-playlist/index.vue";
import { ElSkeleton } from "element-plus";

import { formatSong } from "@/utils/song";

import { IRecommendSongItem } from "@/components/song-list/type";
import { IRecommendPlayItem } from "@/components/curate-playlist/type";
import { IRecommendSingersItem } from "@/components/singers-list/type";

import { usePlayerStore } from "@/stores/player";

const recommendData = ref<IRecommendPlayItem[]>([]);
const bannerData = ref<IBannerItem[]>([]);
const songsData = ref<any[]>([]);
const singersData = ref<IRecommendSingersItem[]>([]);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    const [bannerRes, playlistRes, newSongsRes, hotSingerRes] =
      await Promise.all([
        getBanner(),
        getRecommendPlaylist(),
        getNewSongs(9),
        getHotSingers(),
      ]);
    bannerData.value = bannerRes.banners;

    recommendData.value = playlistRes.result;

    songsData.value = newSongsRes.result.map(formatSong);

    singersData.value = hotSingerRes.artists;
  } finally {
    loading.value = false;
  }
});

const playerStore = usePlayerStore();

const handleSongClick = (el: IRecommendSongItem) => {
  playerStore.setCurrentPlaySongList(el);
};
</script>

<style scoped lang="less">
.mt-24 {
  margin-top: 24px;
}
</style>
