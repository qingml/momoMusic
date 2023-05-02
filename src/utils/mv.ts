
import { formatSecond } from "./number";


/** 格式化mv */
export const formatMv = (mvData: any) => {
  return {
    id: mvData.id||mvData.vid,
    name: mvData.name || mvData.title,
    // singer: formatSinger(mvData?.song?.artists || mvData?.ar||mvData?.artists),
    singer:mvData?.song?.artists || mvData?.ar||mvData?.artists||'',
    album:  mvData?.song ? mvData?.song?.album?.name : mvData?.al?.name ||mvData?.album?.name  ,
    duration:mvData?.durationms|| formatSecond(mvData?.song?.duration || mvData?.dt||mvData?.duration),
    imgurl16v9: mvData?.coverUrl+"?param=325y197",
    playCount: mvData?.playTime || "",
    score: mvData?.score || "",
  };
};              
