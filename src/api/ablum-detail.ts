import { getAjax, postAjax } from ".";

/** 获取专辑详情信息 */
export const getAlbumDetail = (id: string) => {
  return getAjax("/api/album", { params: { id } });
};
/** 获取相关热门专辑 */
export const getHotAlbum = (id: string,
  limit=5,
  offset=0
  ) => {
  return getAjax("/api/artist/album", { params: { id,limit,offset } });
};
/** 获取相精彩评论 */
export const getHotComment = (id: string,
  limit=28,
  offset=0
  ) => {
  return getAjax("/api/comment/album", { params: { id,limit,offset } });
};
