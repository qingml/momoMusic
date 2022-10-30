import { getAjax } from ".";

export const getHotTag = () => {
  return getAjax("/playlist/hot");
};

export const getTagCatgoryList = () => {
  return getAjax("/playlist/catlist");
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
  console.log("cat", cat);
  return getAjax("/top/playlist", { params: { cat, offset, order, limit } });
};
