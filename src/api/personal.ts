import { getAjax } from ".";

// 获取个人播放列表
export const getPersonalPlaylist = (uid: string, type: number) => {
  return getAjax("/api/user/record", { params: { uid, type } });
};

export const getPersonalInfo = (uid: string) => {
  return getAjax("/api/user/detail", { params: { uid } });
};

export const getPersonalSonglist = (uid: string) => {
  return getAjax("/api/user/playlist", { params: { uid } });
};
/** 获取关注列表 */
export const getFollow = (uid: string) => {
  return getAjax(`/api/user/follows?uid=${uid}`);
};

/** 获取粉丝列表 */
export const getFollower = (uid: string) => {
  return getAjax(`/api/user/followeds?uid=${uid}`);
};