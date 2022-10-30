import { getAjax, postAjax } from ".";

/** 获取歌手详情信息 */
export const getSingerDetailInfo = (id: string) => {
  return getAjax("/artists",{params:{id}})
};
/** 获取相似歌手信息 */
export const getSimSingerDetail = (id: string) => {
  return getAjax("/simi/artist",{params:{id}})
};
/** 获取歌手完整介绍 */
export const getSingerIntroduction = (id: string) => {
  return getAjax("/artist/desc",{params:{id}})
};
/** 获取歌手的MV作品 */
export const getSingerMV = (id: string,
  limit=17,
  offset=0
  ) => {
  return getAjax("/artist/mv",{params:{id,limit,offset}})
};
/** 获取歌手的专辑详情 */
export const getSingerAlbum = (id: string,
  limit=133,
  offset=0
  ) => {
  return getAjax("/artist/album",{params:{id,limit,offset}})
};