import { getAjax, postAjax } from ".";

interface getMvProps {
  type:string;
  area:string;
  order:string;
  offset: number;
  limit: number;
}

export const getMvList = ({
  type = '全部',
  area = "全部",
  order = "全部",
  offset = 0,
  limit = 12,
}: getMvProps) => {
  console.log("type", type);
  return getAjax("/mv/all", { params: { type,area,order, offset, limit } });
};