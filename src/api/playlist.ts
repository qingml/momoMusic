import { getAjax } from ".";

export const getHotTag = () => {
  return getAjax("/api/playlist/hot");
};

export const getTagCatgoryList = () => {
  return getAjax("/api/playlist/catlist");
};

interface getPlaylistProps {
  cat: string;
  offset: number;
  order: string;
  limit: number;
}

export const getPlaylist = ({
  cat = "全部",
  offset = 0,
  order = "hot",
  limit = 40,
}: getPlaylistProps) => {
  return getAjax("/api/top/playlist", { params: { cat, offset, order, limit } });
};
