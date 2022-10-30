import { getAjax } from '.';

/** 获取歌曲播放url */
export const getSongDetailUrl = (id: number) => {
  return getAjax(`/song/url?id=${id}`);
};

/** 获取歌曲歌词 */
export const getSongDetailLyric = (id: number) => {
  return getAjax(`/lyric?id=${id}`);
};