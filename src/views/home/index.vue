<template>
  <TopBanner :data="bannerData" />
  <RecommendPlayList :data="recommendData" />
  <div class="recommend-song__container">
    <TopTitle title="新歌推荐" />
    <SongList @click="handleSongClick" :data="songsData" />
  </div>
  <RecommendSingers :data="singersData" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  getBanner,
  getRecommendPlaylist,
  getNewSongs,
  getHotSingers,
} from "@/api/home";
import RecommendPlayList from "@/components/recommend-play-list/index.vue";
import TopBanner, { IBannerItem } from "@/components/top-banner/index.vue";
import RecommendSingers from "@/components/recommend-singers/index.vue";
import TopTitle from "@/components/base/top-title/index.vue";
import SongList from "@/components/base/song-list/index.vue";
import { formatSong } from "@/utils/song";

import { IRecommendSongItem } from "@/components/base/song-list/type";
import { IRecommendPlayItem } from "@/components/base/curate-playlist/type";
import { IRecommendSingersItem } from "@/components/base/singers/type";

import { usePlayerStore } from "@/stores/player";

const recommendData = ref<IRecommendPlayItem[]>([]);
const bannerData = ref<IBannerItem[]>([]);
const songsData = ref<any[]>([]);
const singersData = ref<IRecommendSingersItem[]>([]);

onMounted(async () => {
  const [bannerRes, playlistRes, newSongsRes, hotSingerRes] = await Promise.all(
    [getBanner(), getRecommendPlaylist(), getNewSongs(9), getHotSingers()]
  );

  bannerData.value = bannerRes.banners;

  recommendData.value = playlistRes.result;

  songsData.value = newSongsRes.result.map(formatSong);

  singersData.value = hotSingerRes.artists;
});

const playerStore = usePlayerStore();

const handleSongClick = (el: IRecommendSongItem) => {
  playerStore.setCurrentPlaySongList(el);
};
</script>

<style scoped lang="less"></style>
