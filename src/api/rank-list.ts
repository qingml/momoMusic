import { getAjax } from "./index";

/** 获取云音乐特色榜 */
export const getRankTopList = () => {
  return getAjax("/toplist/detail");
};
