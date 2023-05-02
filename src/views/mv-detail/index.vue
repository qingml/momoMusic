<template>
  <div class="mv-detail-whole">
    <div class="mv-detail-left">
      <MvDetailInfo
        :infoData="mvDetailData"
        :descriData="mvDescriData"
        :countData="mvRelatedCountData"
      />
      <div class="comment">
        <CommentsList
          v-if="hasHotCom"
          :isMv="true"
          :data="mvHotCommentData"
          :showLine="false"
        />
        <CommentsList
          title="最新评论"
          :isMv="true"
          :data="mvLatestCommentData"
          :showLine="false"
        />
      </div>

      <div class="mv-comment-pagination-block">
        <div class="mv-comment-pagination-block-wrap">
          <span class="el-page-total">共{{ commentCount }}条</span>
          <el-pagination
            v-model:currentPage="currentPage1"
            :page-size="20"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="prev, pager, next"
            :total="commentCount"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
    <div class="mv-detail-right">
      <div class="mv-description">
        <TopTitle :showLine="true" title="视频简介" />
        <div class="mv-description-user" v-if="mvDescriData?.creator">
          <img :src="mvDescriData?.creator.avatarUrl" />
          <span>{{ mvDescriData?.creator.nickname }}</span>
        </div>
        <p v-if="mvDescriData?.description?.length">
          {{ mvDescriData.description }}
        </p>
        <p v-else>该视频暂无简介</p>
      </div>
      <RecommendMVList :data="mvRecommendData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter, onBeforeRouteUpdate } from "vue-router";

import {
  getMVComment,
  getMVDetailCount,
  getMVDetailDesc,
  getMVDetailInfo,
  getMVRecommend,
} from "@/api/mv-detail";

import MvDetailInfo from "./components/mv-detail-info/index.vue";
import RecommendMVList from "./components/recommend-mv-list/index.vue";
import CommentsList from "@/components/comments-list/index.vue";
import TopTitle from "@/components/top-title/index.vue";
import {
  formatMvDescriData,
  formatMvInfoData,
  formatMvRecommendData,
} from "@/utils/mv-detail";
import { ElPagination } from "element-plus";

const currentPage1 = ref(1);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);

const { currentRoute } = useRouter();
const mvId = currentRoute?.value?.params?.id as string;
const hasHotCom = ref(true);
const commentCount = ref(0);
const mvDetailData = ref({});
const mvDescriData = ref<any>({});
const mvRelatedCountData = ref({});
const mvRecommendData = ref([]);
const mvHotCommentData = ref([]);
const mvLatestCommentData = ref([]);

const queryMVDetailData = async (mvId: string) => {
  const [mvDetailDataRes, mvDescriRes, mvRelatedCountRes, mvRecommendRes] =
    await Promise.all([
      getMVDetailInfo(mvId),
      getMVDetailDesc(mvId),
      getMVDetailCount(mvId),
      getMVRecommend(mvId),
    ]);

  mvDetailData.value = formatMvInfoData(mvDetailDataRes);
  if (mvDescriRes?.data?.shareCount == 0) {
    mvDescriRes.data.shareCount = mvRelatedCountRes?.shareCount;
  }
  mvDescriData.value = formatMvDescriData(mvDescriRes);
  mvRelatedCountData.value = mvRelatedCountRes;
  mvRecommendData.value =
    mvRecommendRes?.mvs || mvRecommendRes?.data.map(formatMvRecommendData);
};

const queryCommentData = async (mvId: string, offset: number = 0) => {
  const mvCommentRes = await getMVComment(mvId, offset);
  commentCount.value = mvCommentRes?.total;
  mvHotCommentData.value = mvCommentRes?.hotComments;
  mvLatestCommentData.value = mvCommentRes?.comments;
  if (mvCommentRes?.hotComments && mvCommentRes?.hotComments.length > 0) {
    hasHotCom.value = true;
  } else {
    hasHotCom.value = false;
  }
};
const handleCurrentChange = (val: number) => {
  queryCommentData(mvId, (val - 1) * 20);
};

onMounted(() => {
  queryMVDetailData(mvId);
  queryCommentData(mvId);
});

onBeforeRouteUpdate(async (to, from) => {
  // only fetch the user if the id changed as maybe only the query or the hash changed
  if (to.params.id !== from.params.id) {
    queryMVDetailData(to.params.id as string);
  }
});
</script>

<style lang="less" scoped>
.mv-detail {
  &-whole {
    display: flex;
  }

  &-left {
    width: 960px;
    padding-right: 32px;

    .comment {
      margin-top: -30px;
      padding-left: 5px;
    }

    .mv-comment-pagination-block {
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      &-wrap {
        padding-bottom: 15px;
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .el-page-total {
        font-size: 13px;
      }
      .el-pager li,
      .el-pagination .btn-next,
      .el-pagination .btn-prev {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        min-width: 30px;
        border-radius: 2px;
      }

      .el-pager li {
        font-weight: 500;
        font-size: 12px;

        &:hover {
          color: var(--vt-c-text-light-2);
        }
      }
      .el-pager li.is-active {
        background-color: var(--vt-c-text-light-2);
        color: #fff;
      }
    }
  }
  &-right {
    width: 320px;
    display: flex;
    flex-direction: column;

    .mv-description {
      padding: 20px 0 4px 10px;
      margin-bottom: 20px;

      p {
        padding: 4px 4px 0 0;
        color: #4a4a4a;
        font-size: 14px;
      }

      &-user {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        span {
          color: #4a4a4a;
          font-size: 14px;
          padding-left: 20px;
        }
      }
    }
  }
}
</style>
