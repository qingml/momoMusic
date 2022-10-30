import { getAjax } from ".";

// 获取个人播放列表
export const getPersonalPlaylist = (uid: string, type: number) => {
  return getAjax("/user/record", { params: { uid, type } });
};

export const getPersonalInfo = (uid: string) => {
  return getAjax("/user/detail", { params: { uid } });
};

export const getPersonalSonglist = (uid: string) => {
  return getAjax("/user/playlist", { params: { uid } });
};
