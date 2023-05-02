import { getAjax, postAjax } from ".";

/** 获取歌单详情信息 */
export const getPlaylistDetail = (id: string, s = 100) => {
  return getAjax("/api/playlist/detail", { params: { id, s } });
};

/** 获取歌单详情列表 */
export const getPlayList = (ids: string[]) => {
  return postAjax(`/api/song/detail?timestamp=${new Date().getTime()}`, {
    data: { ids: ids.join(",") },
  });
};
/** 获取歌单详订阅者 */
export const getPlayListSubscribers = (id: string, limit = 28, offset = 0) => {
  return getAjax("/api/playlist/subscribers", { params: { id, limit, offset } });
};
/** 获取歌单相关推荐*/
export const getPlayListRelatedrecommend = (id: string) => {
  return getAjax("/api/related/playlist", { params: { id } });
};
/** 获取歌单评论*/
export const getPlayListComments = (id: string, limit = 28, offset = 0) => {
  return getAjax("/api/comment/playlist", { params: { id, limit, offset } });
};
