import { getAjax } from ".";

/** 获取搜索结果 */
export const getSearchSongDetail = (
  keywords: string,
  type: number,
  offset = 0,
  limit = 30
) => {
  return getAjax("/search", { params: { keywords, type, offset, limit } });
};
