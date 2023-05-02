import { getAjax } from "./index";

/** 获取推荐歌单 */
export const getRecommendPlaylist = (limit = 24) => {
  return getAjax("/api/personalized", { params: { limit } });
};

/** 获取banner轮播图 */
export const getBanner = () => {
  return getAjax("/api/banner");
};

/** 获取推荐新歌 */
export const getNewSongs = (limit = 10) => {
  return getAjax("/api/personalized/newsong", { params: { limit } });
};

/** 獲取熱門歌手 */
export const getHotSingers = (limit = 30, offset = 0) => {
  return getAjax('/api/top/artists', { params: { limit, offset } })
}

