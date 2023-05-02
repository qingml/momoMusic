<template>
  <div class="mv">
    <MVTagBar
      :areaData="mvAreaMenusList"
      :typeData="mvTypeMenusList"
      :initialData="mvOrderMenusList"
      @changeData="changeData"
      :isMV="true"
    />
    <div class="mv-main">
      <MVList v-if="mvListData.length" :data="mvListData" />
      <div v-if="!mvListData.length && !loading">视频上架中...</div>

      <div class="loading-area" v-if="mvListData.length && loading">
        <i class="iconfont icon-jiazai"></i>
        <p>数据加载中，请稍等...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { mvAreaMenus, mvTypeMenus, mvOrderMenus } from "@/constants/mvMenus";
import { onMounted, reactive, ref, watch } from "vue";

import MVTagBar from "@/components/tag-bar-list/index.vue";
import MVList from "@/components/mv-list/index.vue";
import useScrollUpdate from "@/hooks/useScrollUpdate";

import { getMvList } from "@/api/mv";

const mvAreaMenusList = ref(mvAreaMenus);
const mvTypeMenusList = ref(mvTypeMenus);
const mvOrderMenusList = ref(mvOrderMenus);
const loading = ref(false);

const tagInfo = reactive({
  area: "全部",
  type: "全部",
  order: "全部",
});

const currentPage = ref(1);

const mvListData = ref([]);

watch([tagInfo, currentPage], () => {
  queryMvListData();
});

const queryMvListData = async () => {
  const offset = (currentPage.value - 1) * 12;

  loading.value = true;
  try {
    const mvListRes = await getMvList({ ...tagInfo, offset });

    mvListData.value = [
      ...mvListData.value,
      ...mvListRes?.data?.map((item) => ({
        ...item,
        imgurl16v9: item.cover,
      })),
    ];
  } catch (error) {
    mvListData.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  queryMvListData();
});

useScrollUpdate({
  handleScollUpdate: () => {
    currentPage.value += 1;
  },
});

const changeData = (type, val, data) => {
  mvListData.value = [];
  currentPage.value = 1;
  if (type === "area") {
    mvAreaMenusList.value = data;
    tagInfo.area = val;
  } else if (type === "type") {
    mvTypeMenusList.value = data;
    tagInfo.type = val;
  } else {
    mvOrderMenusList.value = data;
    tagInfo.order = val;
  }
};
</script>

<style lang="less">
.mv {
  overflow-y: auto;
  &-main {
    width: 100%;
  }

  .loading-area {
    height: 100px;
    display: flex;
    justify-content: center;
    p {
      margin-left: 12px;
    }
  }
}
</style>
