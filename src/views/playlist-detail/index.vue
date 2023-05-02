<template>
  <div class="playlist-detail-whole">
    <div class="playlist-detail-left">
      <ElSkeleton v-if="loading" :rows="15" animated />
      <template v-else>
        <PlayListIntroduction :data="playlistdetailData" />
        <Playlist :data="playListData" />
      </template>
    </div>
    <div class="playlist-detail-right">
      <ElSkeleton v-if="loading" :rows="12" animated />
      <template v-else>
        <PlaylistDetailSubscribers :data="PlayListSubscriberData" />
        <PlaylistRelatedRecommend :data="playlistRelatedRecommendData" />
        <PlaylistDetailComments
          :data="playlistDetailCommentsData"
          :hideScrollBar="true"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter, onBeforeRouteUpdate } from "vue-router";
import { ElSkeleton } from "element-plus";

import PlayListIntroduction from "@/components/playlist-introduction/index.vue";
import Playlist from "@/components/playlist/index.vue";
import PlaylistDetailSubscribers from "./components/subscribers/index.vue";
import PlaylistRelatedRecommend from "@/components/related-recommend-playlist/index.vue";
import PlaylistDetailComments from "@/components/comments-list/index.vue";

import {
  getPlaylistDetail,
  getPlayList,
  getPlayListSubscribers,
  getPlayListRelatedrecommend,
  getPlayListComments,
} from "@/api/playlist-detail";
import { formatSong } from "@/utils/song";

const { currentRoute } = useRouter();

const playListId = currentRoute?.value?.params?.id as string;

const playlistdetailData = ref({});
const playListData = ref([]);
const PlayListSubscriberData = ref([]);
const playlistRelatedRecommendData = ref([]);
const playlistDetailCommentsData = ref([]);
const loading = ref(false);

const queryPlayListData = async (playId: string) => {
  loading.value = true;
  try {
    const [
      playListDetailRes,
      PlayListSubscriberRes,
      playlistRelatedRecommendRes,
      playlistDetailCommentsRes,
    ] = await Promise.all([
      getPlaylistDetail(playId),
      getPlayListSubscribers(playId),
      getPlayListRelatedrecommend(playId),
      getPlayListComments(playId),
    ]);

    playlistdetailData.value = playListDetailRes.playlist;
    PlayListSubscriberData.value = PlayListSubscriberRes.subscribers;
    playlistRelatedRecommendData.value =
      playlistRelatedRecommendRes?.playlists || [];
    playlistDetailCommentsData.value =
      playlistDetailCommentsRes?.hotComments || [];

    const ids = playListDetailRes.playlist.trackIds.map(
      (it: any) => it.id
    ) as string[];

    const playListRes = await getPlayList(ids);
    playListData.value = playListRes?.songs?.map(formatSong) || [];
  } finally {
    loading.value = false;
  }
};

onMounted(() => queryPlayListData(playListId));

onBeforeRouteUpdate(async (to, from) => {
  // only fetch the user if the id changed as maybe only the query or the hash changed
  if (to.params.id !== from.params.id) {
    queryPlayListData(to.params.id as string);
  }
});
</script>

<style lang="less">
.left-wrap {
  margin-right: 16px;
}
.playlist-detail {
  &-whole {
    display: flex;
  }

  &-left {
    width: 960px;
    padding-right: 32px;
  }
  &-right {
    width: 320px;

    flex-direction: column;
  }
}
</style>
