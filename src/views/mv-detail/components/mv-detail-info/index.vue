<template>
  <div class="mv-detail-info__container">
    <div class="mv-detail-info-video">
      <video
        autoplay="autoplay"
        :src="infoData.url"
        controls="controls"
        controlslist="nodownload"
        class="video"
      ></video>
    </div>
    <div class="mv-detail-info-descri">
      <i class="iconfont icon-MV"></i>
      <h2 class="mv-detail-info-name">{{ descriData.name }}</h2>
    </div>
    <div class="mv-detail-info-other">
      <span class="publish">发布：{{ descriData.publishTime }}</span>
      <span>播放次数：{{ formatNumber(descriData.playCount) }}</span>
    </div>
    <div class="mv-detail-info-count">
      <div class="likeCount">
        <i class="iconfont icon-like"></i>
        <span>{{ countData.likedCount }}</span>
      </div>
      <div class="collectCount">
        <i class="iconfont icon-shoucang"></i>
        <span>{{ descriData.subCount }}</span>
      </div>
      <div class="shareCount">
        <i class="iconfont icon-share"></i>
        <span>{{ descriData.shareCount }}</span>
      </div>
    </div>
    <div class="mv-detail-info-foot">
      <i class="iconfont icon-pinglun1"></i>
      Comments |
      <span
        ><a href="">{{ descriData.commentCount }} 条评论</a></span
      >
    </div>
    <div class="user-comment" v-if="loginStore?.userInfo">
      <div class="user-name">
        <i class="iconfont icon-geren"></i>
        {{ loginStore?.userInfo.nickname }}，你好
      </div>
      <div class="comment-area">
        <img :src="loginStore.userInfo?.avatarUrl" />
        <el-input
          v-model="textarea"
          :rows="3"
          type="textarea"
          placeholder="你瞅啥！"
        />
      </div>
      <div class="comment-button">
        <ElButton color="#fa2800"  >
        评论
      </ElButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatNumber } from "@/utils/number.ts";
import { useLoginStore } from "@/stores/login";

const loginStore = useLoginStore();

defineProps({
  infoData: {
    type: Object,
    default: () => ({}),
  },
  descriData: {
    type: Object,
    default: () => ({}),
  },
  countData: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style lang="less">
.mv-detail-info {
  &__container {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    padding: 20px 15px;

    //flex-direction:clomun
    .user-comment {
      display: flex;
      flex-direction: column;
      padding: 6px 0 20px 0;
      .user-name {
        color: #4a4a4a;
        font-weight: 400;
        font-size: 14px;

        i {
          padding-right: 20px;
        }
      }

      .comment-area {
        display: flex;
        padding-top: 18px;

        img {
          width: 50px;
          height: 50px;
          border-radius: 4px;
          margin-right: 20px;
        }
        .el-textarea__inner {
          min-height: 32px;
          background-color: #f8f9ff;
        }
      }

      .comment-button{
        padding-top: 18px;
        display: flex;
        justify-content: end;
      }
    }
  }

  &-video {
    position: relative;
    height: 505px;
    width: 100%;

    .video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #000;
      object-fit: contain;
    }
  }

  &-descri {
    display: flex;
    padding: 10px 0;
    flex-direction: row;
    align-items: center;

    i {
      padding-right: 5px;
      color: var(--vt-c-text-light-2);
    }

    h2 {
      font-size: 16px;
      font-weight: 500;
    }
  }

  &-other {
    display: flex;
    flex-direction: row;

    span {
      font-size: 12px;
      color: #999;
      font-weight: 400;
    }

    .publish {
      padding-right: 30px;
    }
  }

  &-count {
    display: flex;
    flex-direction: row;
    padding-top: 10px;

    div {
      border-radius: 15px;
      width: auto;
      padding: 0 15px 0 20px;
      background: #f2f2f2;
      margin-right: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #161e27;
      cursor: pointer;
      height: 40px;
    }

    span {
      padding-left: 3px;
      font-size: 14px;
      font-weight: 400;
      color: #161e27;
    }
  }

  &-foot {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 30px 0 10px 0;
    margin-bottom: 10px;
    font-size: 14px;
    border-radius: 3px;
    color: #4a4a4a;
    border-bottom: 1px solid #f1f1f1;

    i {
      padding-right: 13px;
    }

    span {
      padding-left: 4px;
    }
  }
}
</style>
