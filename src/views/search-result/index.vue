<template>
  <div class="search-result-detail">
    <div class="search-result-banner-container">
      <div class="search-area">
        <div class="search-box">
          <ElInput
            size="large"
            placeholder="搜索音乐/MV/歌单/歌手"
            :suffix-icon="Search"
            v-model="searchWord"
            @keyup="handleInput"
          />
        </div>
      </div>
    </div>
    <div class="main-container">
      <span class="span-wrapper">搜索结果</span>
      <div class="wrapper">
        <el-tabs
          v-model="activeName"
          class="search-detail-nav-title"
          @click="requestOtherData"
        >
          <el-tab-pane label="单曲" name="song">
            <Playlist :data="playListData" :hasCollect="false" />
          </el-tab-pane>
          <el-tab-pane label="歌手" name="singer">
            <SimSingers :data="singerData" />
          </el-tab-pane>
          <el-tab-pane label="专辑" name="ablum">
            <Album :data="ablumData" />
          </el-tab-pane>
          <el-tab-pane label="视频" name="vedio">
            <MVList :data="vedioData" />
          </el-tab-pane>
          <el-tab-pane label="歌单" name="songlist">
            <CuratePlaylist :data="songlistData" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter, onBeforeRouteUpdate } from "vue-router";

import { ElInput, ElTabPane, ElTabs } from "element-plus";
import { Search } from "@element-plus/icons-vue";

import { getSearchSongDetail } from "@/api/search-result";

import Playlist from "@/components/playlist/index.vue";
import SimSingers from "@/components/singers-list/index.vue";
import MVList from "@/components/mv-list/index.vue";
import Album from "@/components/album/index.vue";
import CuratePlaylist from "@/components/curate-playlist/index.vue";

import { formatSong } from "@/utils/song";
import { useSearchStore } from "@/stores/search";
import { formatMv } from "@/utils/mv";
import { getPlayList } from "@/api/playlist-detail";

const { currentRoute } = useRouter();
const router = useRouter();
const activeName = ref("song");
const playListData = ref([]);
const singerData = ref([]);
const ablumData = ref([]);
const vedioData = ref([]);
const songlistData = ref([]);
// const searchKey = currentRoute?.value?.params?.keyword as string;
const searchStore = useSearchStore();

const keyword = String(currentRoute?.value?.params?.keyword);
const searchWord = ref(keyword);

const querySearchResultData = async (keyword: any) => {
  const playListRes = await getSearchSongDetail(keyword, 1);
  const ids = new Array();
  playListRes?.result?.songs.map((it: any) => ids.push(it.id));
  const songPlaylistRes = await getPlayList(ids);
  playListData.value = songPlaylistRes?.songs.map(formatSong);
};

const handleInput = (e: any) => {
  if (e.code == "Enter") {
    if (searchWord.value.length) {
      searchStore?.setcurrentSearchHistoryTag(searchWord.value.trim());
      router.push(`/search-result/keyword=${searchWord.value}`);
      searchWord.value = "";
    }
  }
};

onMounted(() => querySearchResultData(keyword));

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.keywors !== from.params.keyword) {
    querySearchResultData(String(to.params.keyword));
    searchWord.value = String(to.params.keyword);
  }
});

const queryOtherData = async (keyword: any, type: string) => {
  switch (activeName.value) {
    case "singer":
      const singerRes = await getSearchSongDetail(keyword, 100);
      singerData.value = singerRes?.result?.artists;
      break;
    case "ablum":
      const ablumRes = await getSearchSongDetail(keyword, 10);
      ablumData.value = ablumRes?.result?.albums;
      break;
    case "vedio":
      const vedioRes = await getSearchSongDetail(keyword, 1014);
      vedioData.value = vedioRes?.result?.videos?.map(formatMv);
      break;
    case "songlist":
      const songlistRes = await getSearchSongDetail(keyword, 1000);
      songlistData.value = songlistRes?.result?.playlists?.map(formatSong);
      break;
  }
};

const requestOtherData = () => {
  queryOtherData(keyword,activeName.value)
}

</script>

<style lang="less" scoped>
:deep(.el-tabs__nav-wrap::after) {
  display: none;
}

:deep(.el-tabs__nav) {
  width: 100%;
  float: none;
  display: flex;

  .el-tabs__item.is-active {
    color: var(--color-text-red);
  }

  .el-tabs__item:hover {
    color: var(--color-text-red);
  }

  .el-tabs__active-bar {
    background-color: var(--color-text-red);
  }
}
.search-result-banner-container {
  height: 250px;
  background: url(@/assets/img/search-result-bg.jpg);
  background-size: cover;
  background-attachment: fixed;

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    background: #8a2387;
    background: linear-gradient(to left, #f27121, #e94057, #8a2387);
    opacity: 0.3;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
  }

  .search-area {
    height: 50px;
    width: 720px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .search-box {
      position: relative;
      z-index: 10;
      border-radius: 2px;
      background: #f5f5f5;

      .el-input--large .el-input__inner {
        height: 60px;
      }
    }
  }
}

.main-container {
  width: 100%;
  vertical-align: middle;
  align-items: center;
  margin-top: 30px;

  .span-wrapper {
    float: left;
    font-size: 22px;
    font-weight: 600;
    line-height: 30px;
    margin: 4px 4px;
    width: 100px;
  }

  .search-detail-nav-title {
  }
}
</style>
