import { getAjax, postAjax } from ".";

interface getArtistProps {
  type: number;
  area: number;
  initial: number | string;
  offset: number;
  limit: number;
}

export const getArtistList = ({
  type = -1,
  area = -1,
  initial = -1,
  offset = 0,
  limit = 50,
}: getArtistProps) => {
  return getAjax("/api/artist/list", {
    params: { type, area, initial, offset, limit },
  });
};
