<template>
  <div class="singerlist-detail-whole">
    <div class="singerlist-detail-top">
      <SingerInfo :data="singerInfoData" />
    </div>
    <div class="singerlist-detail-bottom">
      <el-tabs
        v-model="activeName"
        class="singer-detail-nav-title"
        @click="requestData"
      >
        <el-tab-pane label="作品" name="work">
          <Playlist :data="singerPlaylistData" :hasCollect="false" />
        </el-tab-pane>
        <el-tab-pane label="专辑" name="album">
          <Album :data="singerAlbumData" />
        </el-tab-pane>
        <el-tab-pane label="MV" name="mv">
          <MVList :data="singerMvData" />
        </el-tab-pane>
        <el-tab-pane label="歌手详情" name="singerDetail">
          <SingerIntro :data="singerIntroductionData" />
        </el-tab-pane>
        <el-tab-pane label="相似歌手" name="simSinger">
          <SimSingers :data="simSingerData" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter, onBeforeRouteUpdate } from "vue-router";

import {
  getSingerDetailInfo,
  getSingerIntroduction,
  getSimSingerDetail,
  getSingerMV,
  getSingerAlbum,
} from "@/api/singerlist-detail";
import { formatSong } from "@/utils/song";

import Playlist from "@/components/playlist/index.vue";
import SimSingers from "@/components/singers-list/index.vue";
import MVList from "@/components/mv-list/index.vue";
import Album from "@/components/album/index.vue";
import SingerInfo from "./components/info/index.vue";
import SingerIntro from "./components/introduction/index.vue";


const { currentRoute } = useRouter();
const singerId = currentRoute?.value?.params?.id as string;
const activeName = ref("work");

const singerInfoData = ref({});
const singerPlaylistData = ref([]);
const simSingerData = ref([]);
const singerIntroductionData = ref({});
const singerMvData = ref([]);
const singerAlbumData = ref([]);

const queryPlayListData = async (singerId: string) => {
  const singerInfoRes = await getSingerDetailInfo(singerId);
  singerInfoData.value = singerInfoRes.artist;
  singerPlaylistData.value = singerInfoRes.hotSongs.map(formatSong);
};

onMounted(() => queryPlayListData(singerId));

const queryotherData = async (singerId: string, type: string) => {
  if (type == "simSinger") {
    const simSingerRes = await getSimSingerDetail(singerId);
    simSingerData.value = simSingerRes?.artists;
  } else if (type == "album") {
    const singerAlbumRes = await getSingerAlbum(singerId);
    singerAlbumData.value = singerAlbumRes.hotAlbums.flat(2);
  } else if (type == "mv") {
    const singerMVRes = await getSingerMV(singerId);
    singerMvData.value = singerMVRes.mvs;
  } else if (type == "singerDetail") {
    const singerIntroductionRes = await getSingerIntroduction(singerId);
    singerIntroductionData.value = singerIntroductionRes;
  } else {
    queryPlayListData(singerId)
  }
};

const requestData = () => {
  queryotherData(singerId, activeName.value);
};

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.id !== from.params.id) {
    queryPlayListData(to.params.id as string);
  }
});
</script>

<style lang="less">
.singerlist-detail {
  &-top {
    width: 1280px;
    height: 550px;
    background: url(@/assets/img/top-bg.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }
  &-top::after {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    border-top: 90px solid transparent;
    border-right: 640px solid #fff;
    border-left: 640px solid #fff;
    bottom: 0;
  }
  &-bottom {
    margin-bottom: 50px;
    .singer-detail-nav-title {
      padding-top: 20px;

      .el-tabs__nav-wrap::after {
        display: none;
      }
      .el-tabs__item {
        font-weight: bold;
      }

      .el-tabs__nav {
        width: 560px;
        float: none;
        display: flex;
        justify-content: space-around;
        margin: auto;

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
    }
  }
}
</style>
