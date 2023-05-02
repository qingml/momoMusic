<template>
  <div class="playlist-detail-info__container">
    <div class="playlist-detail-info__img mr-32">
      <ElImage :src="data.coverImgUrl + '?param=260y260'" lazy />
    </div>
    <div class="playlist-detail-info__content">
      <div class="playlist-detail-info__content-title">{{ data.name }}</div>
      <div class="playlist-detail-info__content-creater">
        <ElImage
          class="playlist-detail-info__content-avator mr-16"
          :src="data?.creator?.avatarUrl + '?param=100y100'"
          lazy
        />
        <span v-if="isRed" class="mr-32" style="color: red">
          {{ data?.creator?.nickname }}
        </span>
        <span v-else class="mr-32">{{ data?.creator?.nickname }}</span>

        <span class="playlist-detail-info__content-createtime">
          {{ dayjs(data.createTime).format("YYYY-MM-DD") }} 创建
        </span>
      </div>
      <div v-if="hasPublishCompany" class="publish-company mr-32">
        发行公司：{{ data.company }}
      </div>
      <div v-if="hasTag" class="playlist-detail-info__tags">
        <span class="mr-16">标签</span>
        <span class="playlist-detail-info__tags-item" v-for="tag in data?.tags">
          {{ tag }}
        </span>
      </div>
      <div
        class="playlist-detail-info__desc ellipsis-three"
        :title="data.description"
      >
        {{ data.description }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import dayjs from "dayjs";
import { ElImage } from "element-plus";

defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  hasTag: {
    type: Boolean,
    default: true,
  },
  hasPublishCompany: {
    type: Boolean,
    default: false,
  },
  isRed: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="less">
.isRed {
  color: red;
}
.publish-company {
  color: #4a4a4a;
  font-size: 14px;
  font-weight: 400;
  padding-bottom: 15px;
}
.playlist-detail-info {
  &__container {
    background-color: #fff;
    display: flex;
    padding: 0 15px;
  }

  &__img {
    width: 212px;
    height: 212px;
    box-shadow: 8px 10px 6px rgb(0 0 0 / 30%);

    img {
      border-radius: 10px;
      width: 100%;
      height: 100%;
    }
  }

  &__content {
    flex: 1;

    &-title {
      width: 100%;
      font-size: 24px;
      font-weight: bolder;
      line-height: 24px;
      margin-bottom: 20px;
      margin-top: 10px;
      overflow: hidden;
    }

    &-avator {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }

    &-creater {
      font-size: 14px;
      display: flex;
      align-items: center;
      padding-bottom: 16px;
    }

    &-createtime {
      color: #808080;
    }
  }

  &__tags {
    padding-bottom: 16px;

    &-item {
      color: #fff;
      background: #fa2800;
      margin-right: 16px;
      font-size: 12px;
      cursor: pointer;
      padding: 4px 12px;
      border-radius: 16px;
    }
  }
}
</style>
