export interface Artists {
  name: string;
  id: number;
  picId: number;
  picUrl: string;
  albumSize: number;
  alias: any[];
  trans: string;
  musicSize: number;
  topicPerson: number;
}

export interface Song {
  name: string;
  id: number;
  position: number;
  alias: any[];
  status: number;
  fee: number;
  disc: string;
  no: number;
  artists: Artists[];
  score: number;
  duration: number;
}

export interface IRecommendSongItem {
  duration: any;
  id: number;
  type: number;
  name: string;
  picUrl: string;
  song: Song;
  playUrl?: string;
  dt?: number;
  singer: string;
  album?: string;
}
