import { getAjax } from ".";

export const querySearchHotTag = () => {
  return getAjax("/api/search/hot");
};
