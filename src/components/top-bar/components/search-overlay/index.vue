<template>
  <div v-if="visible" class="music-overlay__wrapper">
    <div class="music-overlay__block">
      <div class="search-area__container">
        <div class="search-area__block">
          <ElInput
            size="large"
            placeholder="请输入歌手、歌曲、专辑名搜索"
            :suffix-icon="Search"
            v-model="searchWord"
            @keyup="handleInput"
          />
        </div>
        <div class="search-area__tags">
          <div
            class="history-tags"
            v-if="searchStore?.currentSearchHistoryTagData.length"
          >
            <div class="tagName">
              <i class="iconfont icon-lishisousuo"></i>
              <p>历史搜索</p>
              <span @click="emptyHistory">清空</span>
            </div>

            <div class="tag-wrapper">
              <ElTag
                v-if="hotTags?.length"
                v-for="(
                  item, index
                ) in searchStore?.currentSearchHistoryTagData"
                :key="index"
                :label="item"
                type="info"
                effect="light"
                round
                @click="handleJump(item)"
              >
                {{ item }}
              </ElTag>
            </div>
          </div>
          <div class="hot-tags">
            <div class="tagName">
              <i class="iconfont icon-remensousuo"></i>
              <p>热门搜索</p>
            </div>

            <div class="tag-wrapper">
              <ElTag
                v-if="hotTags?.length"
                v-for="(item, key) in hotTags"
                :key="key"
                :label="item.first"
                type="info"
                effect="light"
                round
                @click="handleJump(item.first)"
              >
                {{ item.first }}
              </ElTag>
            </div>
          </div>
        </div>
      </div>
      <div class="esc">
        <i class="iconfont icon-guanbi" @click="closeSearch"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" scoped>
import { onMounted, onUnmounted, ref, toRefs } from "vue";
import { ElInput, ElTag } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import { querySearchHotTag } from "@/api/search";

import { useRouter } from "vue-router";
import { useSearchStore } from "@/stores/search";

const searchStore = useSearchStore();

const router = useRouter();

interface HotTagItem {
  first: string;
  iconType: number;
  second: number;
}

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const hotTags = ref<HotTagItem[]>();
const searchWord = ref("");

const emit = defineEmits(["update:visible", "close"]);

const { visible } = toRefs(props);

const openOverlay = (e: any) => {
  if (e.code === "Escape") {
    emit("update:visible", false);
  }
};

const getHotSearchTags = async () => {
  try {
    const resp = await querySearchHotTag();
    if (resp.code === 200) {
      hotTags.value = resp.result?.hots;
    }
  } catch (error) {
    console.log("error");
  }
};

onMounted(async () => {
  document.addEventListener("keyup", openOverlay);

  getHotSearchTags();
  searchStore?.getcurrentSearchHistoryTag();
});

onUnmounted(() => {
  document.removeEventListener("keyup", openOverlay);
});

const handleInput = (e: any) => {
  if (e.code == "Enter") {
    if (searchWord.value.length) {
      searchStore?.setcurrentSearchHistoryTag(searchWord.value.trim());
      handleJump(searchWord.value);
      searchWord.value = "";
    }
  }
};

const emptyHistory = () => {
  searchStore?.clearSearchHistoryTag();
};

const handleJump = (keyword: string) => {
  searchStore?.setcurrentSearchHistoryTag(keyword);
  emit("update:visible", false);
  router.push(`/search-result/keyword=${keyword}`);
};

const closeSearch = () => {
  emit("update:visible", false);
};
</script>

<style lang="less" scoped>
.music-overlay {
  &__block {
    display: flex;
    flex-direction: column;

    .esc {
      text-align: center;
      margin-top: 20px;

      i {
        font-size: xx-large;
        cursor: pointer;
      }
    }
  }

  &__wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    backdrop-filter: blur(20px);
    .search-area {
      &__container {
        width: 780px;
        background-color: #fff;
      }
      &__block {
        height: 180px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent url(@/assets/img/search-backgroud.jpg) center
          no-repeat;

        .el-input.el-input {
          width: 700px;
        }
      }

      &__tags {
        margin: 20px 50px;

        .tagName {
          display: flex;
          flex-direction: row;
          i {
            color: var(--vt-c-text-light-2);
            font-size: larger;
          }

          p {
            margin-left: 8px;
          }

          span {
            padding-left: 540px;
            color: var(--vt-c-text-light-2);
            cursor: pointer;
          }
        }

        .tag-wrapper {
          margin-top: 20px;
        }
        .el-tag {
          margin: 0 20px 20px 0;
          cursor: pointer;
        }
      }
    }
  }
  .esc {
    text-align: center;
  }
}
</style>
