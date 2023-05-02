export function formatNumber(num: number, point = 2) {
  if(!num) return
  const numStr = num.toString();
  // 十万以内直接返回
  if (numStr.length < 6) {
    return numStr;
  } else if (numStr.length > 8) {
    //大于8位数是亿
    const decimal = numStr.substring(
      numStr.length - 8,
      numStr.length - 8 + point
    );
    return parseFloat(parseInt(`${num / 100000000}`) + "." + decimal) + "亿";
  } else if (numStr.length > 5) {
    //大于6位数是十万 (以10W分割 10W以下全部显示)
    const decimal = numStr.substring(
      numStr.length - 4,
      numStr.length - 4 + point
    );
    return parseFloat(parseInt(`${num / 10000}`) + "." + decimal) + "万";
  }
}

/**
 * 补零
 * @param num format number
 * @param len
 */
export const paddingZero = (num: number, len: number) => {
  if (String(num).length > len) return num;

  const restLen = len - String(num).length;

  return `${"0".repeat(restLen)}${num}`;
};

export const formatSecond = (time: number) => {
  // 取整
  time = ~~time;

  var m = ~~parseInt(`${(time % (1000 * 60 * 60)) / (1000 * 60)}`);
  var s = ~~parseInt(`${(time % (1000 * 60)) / 1000}`);
  return Number(m * 60 + s);
};

/**
 * 格式化播放列表的时间
 * @param time
 * @returns
 */
export const formatDurationPlay = (time: number) => {
  const m = ((time | 0) / 60) | 0;

  const s = (time | 0) % 60 | 0;

  return `${paddingZero(m, 2)}:${paddingZero(s, 2)}`;
};

/**
 * 计算时间差
 *
 */
export const dateDifference = (time: number) => {
  const currDate = new Date().getTime();
  return Math.ceil((currDate - time) / (1000 * 3600 * 24 * 30));
};
/**
 * 格式化MV里的时间
 * @param time
 * @returns
 */
 export const formatDurationMv = (time: number) => {
  const time1 = time/1000
  const m = ((time1 | 0) / 60) | 0;

  const s = (time1 | 0) % 60 | 0;

  return `${paddingZero(m, 2)}:${paddingZero(s, 2)}`;
};
/**
 * 格式化日期
 * @param time
 * @returns
 */
 export const formatDate = (timestamp:number) => {
  const date = new Date(timestamp)
  const Y = date.getFullYear() + '-';
  const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  const D = (date.getDate()+1 < 10 ? '0'+(date.getDate()+1) : date.getDate()+1) + '';
  return Y+M+D;
};
