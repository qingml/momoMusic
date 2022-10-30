import { getAjax } from ".";

export const querySearchHotTag = () => {
  return getAjax("/search/hot");
};
