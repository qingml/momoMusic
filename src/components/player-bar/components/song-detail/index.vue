<template>
  <ElDialog
    v-model="openLyric"
    fullscreen
    :show-close="false"
    class="song-detail__dialog"
  >
    <div class="wrapper">
      <div class="page-left">
        <div :class="[isPlaying ? 'playing' : 'stop', 'img-wrapper']"></div>
        <img :src="currentSong?.picUrl" />
      </div>
      <div class="page-right">
        <h3>
          {{ currentSong?.name }}
          <i class="iconfont icon-jiantouxia" @click="openLyric = false"></i>
        </h3>
        <p>{{ currentSong?.singer }} - {{ currentSong?.name }}</p>
        <div
          class="lyrics-wrapper"
          :style="{ maxHeight: maxH + 'px' }"
          ref="lyricDomRef"
        >
          <div class="lyrics-main">
            <div class="lyrics" ref="lyrics" v-if="lyricInfo?.lyricObj?.length">
              <!-- :style="transform" -->
              <p
                :class="[isCurLyric(index)]"
                v-for="(item, index) in lyricInfo.lyricObj"
                :key="index"
              >
                {{ item.txt }}
              </p>
            </div>
            <div v-else class="lyric-empty">
              <p v-if="!lyric">纯音乐，无歌词</p>
              <p v-else>歌词加载中......</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ElDialog>
</template>

<script setup lang="ts">
import { computed, reactive, watch, ref } from "vue";
import { ElDialog } from "element-plus";
import { storeToRefs } from "pinia";
import { usePlayerStore } from "@/stores/player";

interface LyricInfo {
  lyric: string | null;
  curIndex: number;
  lyricObj: Array<{ txt: string; time: number }>;
}

const playerStore = usePlayerStore();

const { openLyric, currentSong, lyric, isPlaying } = storeToRefs(playerStore);
const lyricDomRef = ref<HTMLDivElement>();

const props = defineProps({
  currentTime: {
    type: Number,
    default: 0,
  },
  maxH: {
    type: [Number, String],
    default: 580,
  },
});

const lyricInfo = reactive<LyricInfo>({
  lyric: null,
  lyricObj: [],
  curIndex: 0,
});

const isCurLyric = computed(() => {
  return (index: number) => {
    return index === lyricInfo["curIndex"] && props["currentTime"]
      ? "active"
      : "";
  };
});

// 歌词实时滚动
watch(lyricInfo, (newVal) => {
  if (newVal["curIndex"] >= 0) {
    lyricDomRef.value!.scrollTop = 30 * (newVal["curIndex"] - 6);
  }
});

watch([openLyric, lyric], ([newOpenStatus, newLyric]) => {
  if (newOpenStatus && newLyric) {
    formartLyric(newLyric);
  }
});

const resetLayric = () => {
  lyricInfo.curIndex = 0;
  lyricInfo.lyric = "";
  lyricInfo.lyricObj = [];
};

const formartLyric = (lrc: any) => {
  resetLayric();
  const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g;

  if (!lrc.lyric) {
    lyricInfo["lyric"] = null;
    return;
  }
  const lyricLines = lrc.lyric.split("\n") as any;

  lyricInfo["lyric"] = lrc.lyric;

  lyricLines.forEach((el: any) => {
    const result = timeExp.exec(el) as any;

    if (!result) {
      return;
    }
    const txt = el.replace(timeExp, "").trim();

    lyricInfo["lyricObj"].push({
      time: result?.[1] * 60 * 1 + result?.[2] * 1,
      txt,
    });
  });

  // 根据时间轴重排顺序
  lyricInfo["lyricObj"].sort((a, b) => {
    return a.time - b.time;
  });
};

const findCurIndex = (time: number) => {
  for (let i = 0; i < lyricInfo["lyricObj"].length; i++) {
    if (time <= lyricInfo["lyricObj"][i].time) {
      return i;
    }
  }
  return lyricInfo["lyricObj"].length;
};

watch(
  () => props.currentTime,
  (newVal) => {
    // 无歌词的时候 不做动画滚动
    if (!lyricInfo["lyricObj"].length) {
      return;
    }
    lyricInfo["curIndex"] = findCurIndex(newVal) - 1;
  }
);
</script>

<style lang="less" scoped>
@import "@/assets/base.css";

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.wrapper {
  width: 80%;
  margin: auto;
  display: flex;
  align-items: center;
}

.page-left {
  width: 50%;

  img {
    width: 400px;
    height: 400px;
    border-radius: 10px;
    position: relative;
    z-index: 2;
  }

  .img-wrapper {
    &::after {
      content: "";
      border-radius: 50%;
      left: 80px;
      z-index: 1;
      top: 0px;
      position: absolute;
      width: 400px;
      height: 400px;
      display: block;
      box-shadow: 5px 0 10px -5px #141414;
      animation: spin 2s linear 1s infinite;
      background: transparent url(@/assets/img/bo-fang.png) center no-repeat;
      transition: all cubic-bezier(0.4, 0, 0.2, 1) 0.8s 0.5s;
    }

    &.stop {
      &::after {
        animation: none;
      }
    }
  }
}

.page-right {
  width: 50%;
  h3 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;

    i {
      float: right;
      font-size: x-large;
    }
  }

  p {
    font-size: 14px;
    margin-bottom: 30px;
  }

  .lyrics-wrapper {
    overflow-y: auto;
    height: 80%;
  }

  .lyrics-main {
    width: 100%;

    padding: 30px;
    border-radius: 4px;
    background: #f8f9ff;
    overflow-y: auto;
    transition: all 1.5s ease-in-out;
  }

  ::-webkit-scrollbar {
    display: none;
  }
  .lyrics {
    font-size: 0;
    transform: translateY(0);
    transition: transform 1.5s ease-in-out;

    :deep(p) {
      margin: 0;
      line-height: 30px;
      font-size: 14px;
      font-weight: 300;

      &.active {
        color: var(--color-text-red);
      }
    }
  }
  .lyric-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 100px;
    font-size: 14px;
    color: var(--color-text-red);

    ~ .more-lyric {
      display: none;
    }
  }
  .page-lyrics {
    color: #666;
    overflow: hidden;

    .lyric-empty {
      justify-content: left;
    }

    &.fullLyrics {
      max-height: none;
    }
  }

  .lyric-more span {
    display: inline-block;
    line-height: 30px;
    cursor: pointer;
    color: var(--color-text-red);
  }

  .song-detail__dialog {
    .el-dialog__body.el-dialog__body {
      height: 100%;
    }
  }
}
</style>
