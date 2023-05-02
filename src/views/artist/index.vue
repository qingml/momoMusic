<template>
  <div class="aritst">
    <ArtistTagBar
      :areaData="artistAreaMenusList"
      :typeData="artistTypeMenusList"
      :initialData="artistInitialMenusList"
      @changeData="changeData"
    />
    <div class="artistList-main">
      <Singers :data="artistListData" />
    </div>
    <div class="loading-area">
      <i class="iconfont icon-jiazai"></i>
      <p>数据加载中，请稍等...</p>
    </div>
  </div>
</template>

<script setup>
import {
  artistAreaMenus,
  artistTypeMenus,
  artistInitialMenus,
} from "@/constants/artistMenus";
import { onMounted, ref, watch } from "vue";

import ArtistTagBar from "@/components/tag-bar-list/index.vue";
import Singers from "@/components/singers-list/index.vue";

import useScrollUpdate from "@/hooks/useScrollUpdate";
import { getArtistList } from "@/api/artists";

const artistAreaMenusList = ref(artistAreaMenus);
const artistTypeMenusList = ref(artistTypeMenus);
const artistInitialMenusList = ref(artistInitialMenus);
const currentArea = ref(-1);
const currentType = ref(-1);
const currentInitial = ref(-1);
const currentPage = ref(1);

const artistListData = ref([]);

watch(
  [currentArea, currentType, currentInitial, currentPage],
  ([newArea, newType, newInitial], []) => {
    queryArtistListData(newArea, newType, newInitial);
  }
);

const queryArtistListData = async (area, type, initial) => {
  const offset = (currentPage.value - 1) * 50;
  const artistRes = await getArtistList({ area, type, initial, offset });
  artistListData.value = [...artistListData.value, ...artistRes?.artists];
};

onMounted(() => {
  queryArtistListData(
    currentArea.value,
    currentType.value,
    currentInitial.value
  );
});

useScrollUpdate({
  handleScollUpdate: () => {
    currentPage.value += 1;
  },
});

const changeData = (type, val, data) => {
  artistListData.value = [];
  currentPage.value = 1;
  if (type === "area") {
    artistAreaMenusList.value = data;
    currentArea.value = val;
  } else if (type === "type") {
    artistTypeMenusList.value = data;
    currentType.value = val;
  } else {
    artistInitialMenusList.value = data;
    currentInitial.value = val;
  }
};
</script>

<style scoped lang="less">
.artistList-main {
  width: 100%;
}

.loading-area {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    margin-left: 12px;
  }
}
</style>
