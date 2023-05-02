import { getAjax } from ".";

/** 获取mv详情和资源 */
export const getMVDetailInfo = (id: string) => {
  if (id.length === 32) {
    return getAjax("/api/video/url", { params: { id } });
  }
  return getAjax("/api/mv/url", { params: { id } });
};
/** 获取mv相关信息 */
export const getMVDetailDesc = (mvid: string) => {
  const params: any = {};
  if (mvid.length === 32) {
    params.id = mvid;
    return getAjax("/api/video/detail", { params });
  }
  params.mvid = mvid;
  return getAjax("/api/mv/detail", { params });
};
/** 获取mv收藏和播放次数 */
export const getMVDetailCount = (mvid: string) => {
  const params: any = {
    timestamp: new Date().getTime(),
  };
  if (mvid.length === 32) {
    params.vid = mvid;
    return getAjax("/api/video/detail/info", { params });
  }

  params.mvid = mvid;
  return getAjax("/api/mv/detail/info", { params });
};

/** 获取mv相关推荐 */
export const getMVRecommend = (mvid: string) => {
  const params: any = {};
  if (mvid.length === 32) {
    params.id = mvid;
    return getAjax("/api/related/allvideo", { params });
  }

  params.mvid = mvid;
  return getAjax("/api/simi/mv", { params });
};
/** 获取mv评论内容 */
export const getMVComment = (
  id: string,
  offset = 0,
  limit = 20,
  timestamp = new Date().getTime()
) => {
  if (id.length === 32) {
    return getAjax("/api/comment/video", {
      params: { id, offset, limit, timestamp },
    });
  }
  return getAjax("/api/comment/mv", { params: { id, offset, limit, timestamp } });
};
