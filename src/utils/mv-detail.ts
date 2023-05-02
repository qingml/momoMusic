import { formatDate } from './number';
/** 格式化 mv url */
export const formatMvInfoData = (mvData: any) => {
  return {
   url:mvData?.urls? mvData.urls[0].url : mvData?.data?.url
  };
};   
/** 格式化mv详情 信息*/
export const formatMvDescriData = (mvData: any) => {
  return {
  name:mvData?.data?.title? mvData?.data?.title:mvData?.data?.name,
  publishTime: typeof(mvData?.data?.publishTime) == "number"?formatDate(mvData?.data?.publishTime):mvData?.data?.publishTime,
  playCount:mvData?.data?.playCount || mvData?.data?.playTime,
  subCount:mvData?.data?.subCount || mvData?.data?.subscribeCount,
  shareCount:mvData?.data?.shareCount,
  commentCount:mvData?.data?.commentCount,
  description:mvData?.data?.desc ||mvData?.data?.description,
  creator:mvData?.data?.creator || null
  };
};   
/** 格式化mv推荐歌单详情*/
export const formatMvRecommendData = (mvData: any) => {
  return {
  cover:mvData?.cover || mvData?.coverUrl ,
  id:mvData?.id ||mvData?.vid,
  name:mvData?.name||mvData?.title,
  artistName:mvData?.artistName||mvData?.creator[0].userName
  };
}; 
