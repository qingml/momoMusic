<template>
  <div class="player-container">
    <ElSlider
      class="player-progress"
      size="small"
      input-size="small"
      :show-tooltip="false"
      v-model="playProgressValue"
      @change="handleChangePlayTime"
      @input="handleInputPlayTime"
    />
    <PlaySongDetail :currentTime="currentPlayTime" />
    <div class="player-block">
      <div class="player-song-info" @click="handleLyric">
        <ElImage :src="`${currentSong?.picUrl}?param=300y300`" />
        <div>
          <div class="song-detail">
            <div class="player-song-name ellipsis">
              {{ currentSong?.name }}
            </div>
            <div>-</div>
            <div class="player-song-singer">
              {{ currentSong?.singer }}
            </div>
          </div>
          <div class="song-time">
            <span>
              {{ formatDurationPlay(currentPlayTime) }}
            </span>
            <span>/</span>
            <span>
              {{ formatDurationPlay(currentSong?.duration!) }}
            </span>
          </div>
        </div>
      </div>
      <div class="play-song-control">
        <div class="play-song-operator">
          <div class="play-song-operator-wrapper">
            <span @click="playerStore.setModeVaule">
              <i :class="['iconfont', playerStore.iconValue]"></i>
            </span>
            <span @click="playerStore.toLast">
              <i class="iconfont icon-shangyishouge"></i>
            </span>
            <span @click="handlePlay" class="bofang">
              <i v-if="isPlaying" class="iconfont icon-zanting"></i>
              <i v-else class="iconfont icon-bofang1"></i>
            </span>
            <span @click="() => playerStore.toNext">
              <i class="iconfont icon-xiayishou"></i>
            </span>
            <span @click="handleLyric">
              <i class="iconfont icon-geci"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="play-other-control">
        <div class="volume-control">
          <div @click="changeMuted" div="volume-wrapper">
            <i v-if="muted" class="iconfont icon-jingyin"></i>
            <i v-else class="iconfont icon-yinliang"></i>
          </div>
          <ElSlider
            :model-value="playVolumeValue"
            size="small"
            input-size="small"
            @input="handleVolumeChange"
          />
        </div>
        <ElPopover
          placement="top"
          trigger="click"
          :teleported="false"
          :width="400"
          popperClass="play-history-list"
        >
          <template #reference>
            <i class="iconfont icon-playlistMusic" @click="showPopover"></i>
          </template>
          <div class="playlist">
            <div class="playlist-popover">
              <div class="playlist-title">
                播放列表
                <i
                  class="iconfont icon-qingkong"
                  @click="handleResetPlayList"
                ></i>
              </div>
              <div class="playlist-content">
                <el-scrollbar>
                  <div
                    v-for="(item, index) in currentSongData"
                    :key="index"
                    :class="[
                      'playlist-item',
                      index == playingIndex ? 'highlight' : '',
                    ]"
                    @click="() => playerStore.setCurrentPlayIndex(index)"
                  >
                    <span class="item-index">
                      <i class="iconfont icon-bofang"></i>
                      <span class="index">{{ paddingZero(index + 1, 2) }}</span>
                    </span>
                    <span class="item-name ellipsis">{{ item.name }}</span>
                    <span class="item-singer ellipsis">{{ item.singer }}</span>
                  </div>
                </el-scrollbar>
              </div>
            </div>
          </div>
        </ElPopover>
      </div>

      <div v-if="currentSong">
        <audio
          id="myAudio"
          class="player-audio"
          ref="audioRef"
          @timeupdate="handleUpdateTime"
          @play="handleAudioPlay"
          autoplay
          controls
          :src="currentSong?.playUrl"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { ElSlider, ElImage, ElPopover } from "element-plus";
import { Arrayable } from "element-plus/es/utils";

import PlaySongDetail from "./components/song-detail/index.vue";

import { usePlayerStore } from "@/stores/player";
import { formatDurationPlay, paddingZero } from "@/utils/number";

const audioRef = ref<HTMLAudioElement>();
const currentPlayTime = ref(0);
const playProgressValue = ref(0);
const playVolumeValue = ref(0);
const muted = ref(false);
const showPlaylistPopover = ref(false);
const manualControl = ref(false);

const playerStore = usePlayerStore();

const { isPlaying, openLyric, currentSong, currentSongData, playingIndex } =
  storeToRefs(playerStore);

watch([isPlaying, currentSong], ([newStaus, newSong]) => {
  if (!newStaus) {
    audioRef?.value?.pause();
  } else {
    audioRef?.value?.play();
  }

  if ((newSong || newStaus) && audioRef.value && !playVolumeValue.value) {
    audioRef.value.volume = 0.36;
    playVolumeValue.value = 40;
  }
});

const handlePlay = () => {
  playerStore.setPlayStatus();
  currentPlayTime.value = audioRef.value?.currentTime || 0;
};

const handleUpdateTime = () => {
  currentPlayTime.value = audioRef.value?.currentTime || 0;
  if (!manualControl.value) {
    playProgressValue.value = Math.floor(
      (audioRef.value?.currentTime! / currentSong.value?.duration!) * 100
    );

    if (playProgressValue.value === 100) {
      playerStore.toNext(true);
    }
  }
};

const handleChangePlayTime = (value: Arrayable<number>) => {
  playProgressValue.value = value as number;
  const currentTime = currentSong.value?.duration! * ((value as number) / 100);
  audioRef.value!.currentTime = currentTime;
  manualControl.value = false;
};

const handleInputPlayTime = (value: Arrayable<number>) => {
  manualControl.value = true;
  const currentTime = currentSong.value?.duration! * ((value as number) / 100);
  currentPlayTime.value = currentTime;
};

const handleVolumeChange = (value: Arrayable<number>) => {
  playVolumeValue.value = value as number;
  audioRef.value!.volume = (value as number) / 100;
  if (value == 0) {
    muted.value = true;
  } else {
    muted.value = false;
  }
};

const handleLyric = () => {
  openLyric.value = !openLyric.value;
  if (openLyric.value) {
    playerStore.getSongDetailLyric(currentSong.value?.id);
  }
};

const changeMuted = () => {
  muted.value = !muted.value;
  if (muted.value) {
    audioRef.value!.muted = true;
    playVolumeValue.value = 0;
  } else {
    audioRef.value!.muted = false;
    playVolumeValue.value = audioRef.value!.volume * 100;
  }
};

const showPopover = () => {
  showPlaylistPopover.value = !showPlaylistPopover.value;
};

onMounted(() => {
  playerStore?.getPlayList();
});

const handleResetPlayList = () => {
  playerStore?.setCurrentPlaySongList([]);
  showPlaylistPopover.value = false;
};

const handleAudioPlay = () => {
  if (!isPlaying.value) {
    audioRef.value?.pause();
  }
};
</script>

<style lang="less" scoped>
.iconfont {
  user-select: none;
}
.player-container {
  width: 100%;
  position: fixed;
  bottom: 0;

  .player-progress {
    position: absolute;
    top: -14px;
    z-index: 9999;
    :deep(.el-slider__runway.el-slider__runway) {
      background-color: #fff;
    }
  }

  .el-slider {
    --el-slider-main-bg-color: var(--vt-c-text-light-2);
    --el-slider-height: 4px;
    --el-slider-button-size: 12px;
    padding: 0 5px;

    .el-slider__button-wrapper {
      display: none;
    }

    &:hover {
      .el-slider__button-wrapper {
        display: block;
      }
    }
  }
}

i {
  cursor: pointer;
}
.player-block {
  background-color: #ddd;
  height: 60px;
  width: 100%;
  padding: 10px 32px;
  box-shadow: 12px 10px 8px 6px rgb(0 0 0 / 30%);
  z-index: 9997;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  i {
    font-size: larger;
  }

  .song-time {
    span {
      width: 45px;
      display: inline-block;
      text-align: center;
    }

    span:nth-child(2) {
      width: 15px;
    }
  }
}

.player-song-info {
  display: flex;
  align-items: center;
  padding-top: 4px;
  cursor: pointer;
  max-width: 760px;

  .el-image {
    width: 42px;
    margin-right: 10px;
  }

  .song-detail {
    display: flex;
    align-items: center;

    font-size: 14px;

    div {
      margin-right: 8px;
    }

    .player-song-singer {
      font-size: 12px;
      color: #888;
      font-weight: 200;
    }
  }
}

.play-song-control {
  flex: 1;

  .play-song-operator {
    position: fixed;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);

    &-wrapper {
      display: flex;
      align-items: center;

      span {
        margin-left: 16px;
      }

      i {
        cursor: pointer;
      }

      .bofang {
        font-size: x-large;
      }
    }
  }
}

.play-other-control {
  display: flex;
  flex-direction: row;

  :deep(.play-history-list) {
    padding: 0 !important;
    margin: 0 !important;
    z-index: 99999;
  }

  .volume-control {
    display: flex;
    flex-direction: row;
    align-items: center;

    .el-slider {
      margin-left: 8px;
      width: 100px;
    }
  }

  .playlist {
    i {
      margin-left: 8px;
    }

    &-popover {
      height: 560px;
      width: 400px;
      background-color: white;
      right: 0px;
      box-shadow: 5px 0 12px -6px #141414;
      padding: 10px 10px;
      overflow: hidden;
      user-select: none;

      .playlist-title {
        padding: 0 0 20px 10px;
        user-select: none;
        font-weight: 500;
        font-size: 16px;

        i {
          float: right;
          margin-right: 10px;
        }
      }

      .playlist-content {
        display: flex;
        flex-direction: column;
        height: 480px;

        .playlist-item {
          font-size: 14px;
          color: #4a4a4a;
          display: flex;
          cursor: pointer;
          line-height: 40px;
          height: 40px;
          justify-content: space-between;

          &:hover {
            .item-index {
              .icon-bofang {
                display: inline-block;
                margin: 0;
              }

              span {
                display: none;
              }
            }
          }

          &.highlight {
            color: var(--vt-c-text-light-2);
          }

          .item-name {
            flex: 1;
            padding-left: 15px;
          }

          .item-singer {
            width: 30%;
          }

          .item-index {
            width: 10%;
            text-align: center;

            .icon-bofang {
              display: none;
            }
          }
        }
      }
    }
  }
}

.player-audio {
  display: none;
}
</style>
