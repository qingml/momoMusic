<template>
  <ElDialog v-model="visible" fullscreen class="follow__dialog">
    <div class="follow-detail-container">
      <h2 class="follow-title">
        {{ title }}
      </h2>
      <div class="list-block">
        <div class="list-item" v-for="(item, index) in data" :key="index">
          <div class="user-img">
            <ElImage
              :src="item.avatarUrl + '?param=100y100'"
              @click="handleClick(item.userId)"
            />
          </div>
          <div class="user-description">
            <span class="nickname">{{ item.nickname }}</span>
            <p class="user-signature ellipsis">{{ item.signature }}</p>
            <div class="user-playlist">
              <span class="playlist">歌单：{{ item.playlistCount }}</span>
              <span class="fenge">|</span>
              <span class="follow">粉丝：{{ item.followeds }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ElDialog>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import { useRouter } from "vue-router";
import { ElDialog } from "element-plus";
import { IFollowItem } from "../../type";

const router = useRouter();

defineProps({
  data: {
    type: Array as PropType<IFollowItem[]>,
    default: () => [],
  },
  title: {
    type: String,
    default: "",
  },
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:visible"]);

const handleClick = (id: string) => {
  emit("update:visible", false);

  router.push(`/personal-info/${id}`);
};
</script>

<style lang="less" scoped>
.follow-detail-container {
  width: 1280px;
  display: flex;
  flex-direction: column;
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;

  .follow-title {
    display: inline-block;
    font-family: fantasy;
    font-weight: 600;
    font-size: 24px;
  }
  .list {
    &-block {
      width: 100%;
      margin-top: 40px;
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 30px;
    }

    &-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 330px;
      margin: 20px 145px 20px 0;

      &:nth-child(3n) {
        margin-right: 0;
      }

      .el-image {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        border: 1px dotted;

        cursor: pointer;
      }
      .user-description {
        display: flex;
        flex-direction: column;
        text-align: left;
        padding-left: 10px;
        .nickname {
          font-weight: 500;
        }

        p {
          width: 200px;
          height: 40px;
          padding-top: 20px;
          font-size: 12px;
          font-weight: 300;
        }

        .user-playlist {
          width: 200px;
          vertical-align: middle;
          line-height: 14px;
          text-align: center;

          span {
            font-size: 12px;
            font-weight: 300;
            display: inline-block;
          }
          .playlist {
            float: left;
          }
          .follow {
            float: right;
          }
        }
      }
    }

    // width: ;
  }
}
</style>
