import { IRecommendSongItem } from "@/components/song-list/type";
import { formatSecond } from "./number";

/** 格式化歌手 */
export const formatSinger = (singers: any) => {
  if (singers) {
    return singers.map((item: any) => item.name).join(" / ");
  }
};

/** 格式化歌曲 */
export const formatSong = (musicData: any) => {
  return {
    id: musicData.id || musicData?.song?.id,
    name: musicData.name|| musicData?.song?.name,
    singer: formatSinger(
      musicData?.song?.artists || musicData?.ar || musicData?.artists || musicData?.song?.ar
    ),
    album: musicData?.song
      ? musicData?.song.album?musicData?.song.album?.name:musicData?.song.al.name
      : musicData?.al?.name || musicData?.album?.name,
    duration: formatSecond(
      musicData?.song?.duration || musicData?.dt || musicData?.duration||musicData?.song?.dt 
    ),
    picUrl: musicData.coverImgUrl || musicData?.al?.picUrl || musicData?.picUrl||musicData?.song?.picUrl || musicData?.song?.al?.picUrl,    
    playCount: musicData?.playCount || "",
    score: musicData?.score || "",
  };
};
