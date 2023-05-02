<template>
  <div class="personal-container">
    <FollowList
      v-model:visible="followListVisible"
      :data="followDetailData"
      :title="followListTitle"
    />
    <ElSkeleton v-if="userLoading" :rows="6" animated>
      <template #template>
        <div style="display: flex">
          <ElSkeletonItem
            variant="circle"
            style="width: 150px; height: 150px"
          />
          <div>
            <ElSkeletonItem variant="text" />
            <ElSkeletonItem variant="text" />
          </div>
        </div>
      </template>
    </ElSkeleton>
    <div class="personal-info" v-else>
      <div class="user-ava">
        <img :src="userInfoData?.profile?.avatarUrl" />
      </div>
      <div class="user-info">
        <h2>{{ userInfoData?.profile?.nickname }}</h2>
        <div class="info-specifi">
          <div class="info-level">Lv{{ userInfoData.level }}</div>
          <div
            :class="[
              userInfoData?.profile?.gender == GenderEnum.MALE
                ? 'male'
                : 'female',
            ]"
            class="info-gender"
          >
            <i
              v-if="userInfoData?.profile?.gender == GenderEnum.MALE"
              class="iconfont icon-nansheng"
            />
            <i v-else class="iconfont icon-nvsheng" />
          </div>
        </div>
        <div class="info-dynamic">
          <div>
            <span>{{ userInfoData?.profile?.eventCount }}</span>
            <span>动态</span>
          </div>
          <div class="fenge" />
          <div>
            <span
              @click="() => handleOpenFollowList(FollowListTypeEnum.ATTENTION)"
            >
              {{ userInfoData?.profile?.follows }}
            </span>
            <span>关注</span>
          </div>
          <div class="fenge" />
          <div>
            <span @click="() => handleOpenFollowList(FollowListTypeEnum.FAN)">
              {{ userInfoData?.profile?.followeds }}
            </span>
            <span>粉丝</span>
          </div>
        </div>
        <div class="signature">
          <span>个人介绍：</span> {{ userInfoData?.profile?.signature }}
        </div>
      </div>
    </div>
    <div class="user-playlist">
      <ElTabs v-model="activeName" class="search-detail-nav-title">
        <ElTabPane label="听歌排行" :name="PersonTabInfoEnum.PLAYLIST">
          <div class="playlist-top-banner">
            <div class="playlist-title">
              累计听歌 <span> {{ userInfoData?.listenSongs }} </span>首
            </div>
            <ElTabs class="playlist-tab" v-model="currentSongTab">
              <ElTabPane label="最近一周" :name="SongListTabEnum.LAST_WEEK" />
              <ElTabPane label="所有时间" :name="SongListTabEnum.ALL_TIME" />
            </ElTabs>
          </div>
          <ElSkeleton v-if="playlistLoading" :rows="8" animated />
          <Playlist
            v-if="!playlistLoading"
            :data="personSongData[currentSongTab]"
            :hasCollect="false"
          />
        </ElTabPane>
        <ElTabPane label="创建的歌单" :name="PersonTabInfoEnum.CREATLIST">
          <SongList :data="creatListData" />
        </ElTabPane>
        <ElTabPane label="收藏的歌单" :name="PersonTabInfoEnum.COLLECTLIST">
          <SongList :data="collectListData" />
        </ElTabPane>
      </ElTabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, reactive } from "vue";
import { onBeforeRouteUpdate, useRouter } from "vue-router";
import { ElTabs, ElTabPane, ElSkeleton, ElSkeletonItem } from "element-plus";
import Playlist from "@/components/playlist/index.vue";
import SongList from "@/components/curate-playlist/index.vue";
import FollowList from "./components/follower-list/index.vue";
import {
  getFollow,
  getFollower,
  getPersonalInfo,
  getPersonalPlaylist,
  getPersonalSonglist,
} from "@/api/personal";
import { formatSong } from "@/utils/song";
import {
  PersonTabInfoEnum,
  SongListTabEnum,
  FollowListTypeEnum,
  GenderEnum,
} from "./type";

const { currentRoute } = useRouter();
const activeName = ref<PersonTabInfoEnum>(PersonTabInfoEnum.PLAYLIST);
const currentSongTab = ref<SongListTabEnum.LAST_WEEK>(
  SongListTabEnum.LAST_WEEK
);
const userInfoData = ref<any>({});
const creatListData = ref([]);
const collectListData = ref([]);
const playlistLoading = ref(false);
const userLoading = ref(false);
const personSongData = reactive({
  [SongListTabEnum.LAST_WEEK]: [],
  [SongListTabEnum.ALL_TIME]: [],
});
const followListVisible = ref(false);
const followListTitle = ref("");
const followDetailData = ref([]);

const currentUserId = computed((): string => {
  return currentRoute?.value?.params.id as string;
});

const queryUserInfoData = async (uid: string) => {
  userLoading.value = true;
  try {
    const userInfoRes = await getPersonalInfo(uid);
    userInfoData.value = userInfoRes;
  } finally {
    userLoading.value = false;
  }
};

const queryPersonalPlaylist = async (uid: string) => {
  playlistLoading.value = true;
  personSongData[SongListTabEnum.LAST_WEEK] = [];
  personSongData[SongListTabEnum.ALL_TIME] = [];
  try {
    const [lastWeekRes, allTimeRes] = await Promise.all([
      getPersonalPlaylist(uid, SongListTabEnum.LAST_WEEK),
      getPersonalPlaylist(uid, SongListTabEnum.ALL_TIME),
    ]);
    personSongData[SongListTabEnum.LAST_WEEK] =
      lastWeekRes?.weekData?.map(formatSong);
    personSongData[SongListTabEnum.ALL_TIME] =
      allTimeRes?.allData?.map(formatSong);
  } finally {
    playlistLoading.value = false;
  }
};

const querySonglistData = async (uid: string) => {
  if (creatListData.value.length > 0) return;
  try {
    const userSonglistRes = await getPersonalSonglist(uid);
    const creatListNumber = userInfoData?.value?.profile?.playlistCount;
    creatListData.value = userSonglistRes?.playlist
      ?.slice(0, creatListNumber)
      .map(formatSong);
    collectListData.value = userSonglistRes?.playlist
      ?.slice(creatListNumber)
      .map(formatSong);
  } finally {
  }
};

const queryFollowListData = async (uid: string) => {
  const followListRes = await getFollow(uid);
  followDetailData.value = followListRes.follow;
};

const queryFollowerListData = async (uid: string) => {
  const followerListRes = await getFollower(uid);
  followDetailData.value = followerListRes.followeds;
};

onMounted(() => {
  queryUserInfoData(currentUserId.value);
  queryPersonalPlaylist(currentUserId.value);
  querySonglistData(currentUserId.value);
});

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.id !== from.params.id) {
    const uid = String(to.params.id);
    queryUserInfoData(uid);
    queryPersonalPlaylist(uid);
    activeName.value = PersonTabInfoEnum.PLAYLIST;
    followListVisible.value = false;
  }
});

const handleOpenFollowList = (type: FollowListTypeEnum) => {
  followListVisible.value = true;
  if (type === FollowListTypeEnum.ATTENTION) {
    followListTitle.value = userInfoData?.value?.profile?.nickname + "的关注";
    queryFollowListData(currentUserId.value);
  } else {
    followListTitle.value = userInfoData?.value?.profile?.nickname + "的粉丝";
    queryFollowerListData(currentUserId.value);
  }
};
</script>

<style scoped lang="less">
.personal-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 0;

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
  .personal-info {
    display: flex;
    flex-direction: row;
    width: 100%;

    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 1px dotted #666;
    }

    .user-info {
      padding-left: 40px;
      width: 100%;

      h2 {
        font-weight: bolder;
      }
      .info-specifi {
        width: 100%;
        padding: 10px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom: 2px solid #f1f1f1;
        .info-level {
          font-size: 12px;
          width: 40px;
          height: 20px;
          background-color: RGB(240, 240, 240);
          line-height: 20px;
          text-align: center;
          border-radius: 10px;
        }

        .info-gender {
          margin-left: 10px;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          text-align: center;
          vertical-align: center;
          &.male {
            background-color: RGB(191, 243, 255);
          }
          &.female {
            background-color: RGB(255, 204, 231);
          }

          .icon-nvsheng {
            color: RGB(250, 175, 210);
          }
          .icon-nansheng {
            color: RGB(113, 194, 248);
          }
        }
      }

      .info-dynamic {
        width: 270px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        div {
          display: flex;
          flex-direction: column;
          cursor: pointer;

          span {
            text-align: center;

            &:first-child {
              font-weight: 500;
              font-size: 22px;
            }

            &:last-child {
              font-size: 12px;
            }
          }
        }
        .fenge {
          height: 40px;
          width: 2px;
          background-color: #f1f1f1;
          margin-top: 10px;
        }
      }

      .signature {
        padding-top: 10px;
        font-size: 14px;
        font-weight: lighter;

        span {
          font-weight: 500;
        }
      }
    }
  }

  .user-playlist {
    padding-top: 30px;

    .playlist-top-banner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      color: #666;

      padding: 6px 15px;

      :deep(.el-tabs__header) {
        margin: 0;
      }
    }
  }
}
</style>
