import { ElMessage } from "element-plus";
import { defineStore } from "pinia";
import { getSongDetailUrl, getSongDetailLyric } from "@/api/player";
import { IRecommendSongItem } from "@/components/song-list/type";

enum ModeEnum {
  /** 顺序 */
  ORDER = 1,
  /** 随机 */
  RANDOM = 2,
  /** 单曲 */
  SINGLE = 3,
}

const modeIconValues = {
  [ModeEnum.ORDER]: "icon-xunhuanbofang",
  [ModeEnum.RANDOM]: "icon-suijibofang",
  [ModeEnum.SINGLE]: "icon-danquxunhuan",
};

interface IPlayerState {
  /** 播放列表 */
  playSongList: any[];
  /** 当前播放歌曲下标 */
  currentPlayIndex: number;
  /** 模式 */
  mode: ModeEnum;
  /** 播放状态 */
  isPlaying: boolean;
  /** 播放歌曲歌词 */
  lyric: string;
  /** 歌词页面状态 */
  openLyric: boolean;
}

export const usePlayerStore = defineStore({
  id: "palyer",

  state: (): IPlayerState => ({
    playSongList: [],
    currentPlayIndex: 0,
    isPlaying: false,
    mode: ModeEnum.ORDER,
    lyric: "",
    openLyric: false,
  }),

  getters: {
    currentSongData: (state) => state.playSongList,
    currentSong: (state): IRecommendSongItem =>
      state.playSongList[state.currentPlayIndex],
    iconValue: (state) => modeIconValues[state.mode],
    playingIndex: (state) => state.currentPlayIndex,
  },

  actions: {
    async getSongDetailUrl(id: number) {
      try {
        const { data } = await getSongDetailUrl(id);
        this.playSongList = this.currentSongData.map((it) => ({
          ...it,
          playUrl: it.id === id ? data?.[0].url : null,
        }));

        if (!data?.[0]?.url) {
          ElMessage.error("歌曲信息获取失败，请稍后重试");
          this.toNext(true);
        }

        window.localStorage.setItem(
          "playList",
          JSON.stringify(this.playSongList)
        );

        this.isPlaying = true;
      } catch (error) {
        console.log("error", error);
      }
    },

    getPlayList() {
      if (window.localStorage.playList) {
        this.playSongList = JSON.parse(window.localStorage.playList);
      }
    },

    async getSongDetailLyric(id: number) {
      try {
        const response = await getSongDetailLyric(id);
        this.lyric = response?.lrc;
      } catch (error) {
        console.log("error", error);
      }
    },

    async setCurrentPlaySongList(
      el: IRecommendSongItem | IRecommendSongItem[],
      index = 0
    ) {
      if (Array.isArray(el)) {
        this.playSongList = el;

        this.setCurrentPlayIndex(index);
      } else if (el) {
        if (this.playSongList.length > 0) {
          let clonePlaySongList = this.playSongList;
          clonePlaySongList.splice(this.currentPlayIndex + 1, 0, el);
          this.playSongList = clonePlaySongList;
          this.setCurrentPlayIndex(this.currentPlayIndex + 1);
        } else {
          this.playSongList = [el];
          this.setCurrentPlayIndex(index);
        }
      }
    },

    setCurrentPlayIndex(index: number) {
      if (this.currentPlayIndex !== 0 && index === this.currentPlayIndex) {
        this.isPlaying = true;
        return;
      }

      this.currentPlayIndex = index;

      if (!this.currentSong) return;

      if (this.currentSong.playUrl) {
        this.isPlaying = true;
        return;
      }

      if (this.currentSongData.length > index) {
        this.getSongDetailUrl(this.currentSongData[index].id);
      }

      if (this.openLyric) {
        this.getSongDetailLyric(this.currentSongData[index].id);
      }
    },

    setPlayStatus() {
      if (this.isPlaying) {
        this.isPlaying = false;
      } else {
        this.setCurrentPlayIndex(this.currentPlayIndex || 0);
      }
    },

    toNext(isAutoNext?: boolean) {
      if (isAutoNext && this.mode == ModeEnum.SINGLE) {
        this.setCurrentPlayIndex(this.currentPlayIndex);
      }
      const nextIndex = this.currentPlayIndex + 1;
      if (nextIndex < this.currentSongData.length) {
        this.setCurrentPlayIndex(nextIndex);
      } else {
        this.setCurrentPlayIndex(0);
      }
    },

    toLast() {
      const lastIndex = this.currentPlayIndex - 1;
      if (lastIndex > -1) {
        this.setCurrentPlayIndex(lastIndex);
      }
    },

    setModeVaule() {
      switch (this.mode) {
        case ModeEnum.ORDER:
          this.mode = ModeEnum.RANDOM;
          break;
        case ModeEnum.RANDOM:
          this.mode = ModeEnum.SINGLE;
          break;
        case ModeEnum.SINGLE:
          this.mode = ModeEnum.ORDER;
          break;
      }
    },
  },
});
