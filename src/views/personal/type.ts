export interface IFollowItem {
  avatarUrl: string;
  userId: string;
  nickname: string;
  playlistCount: number;
  followeds: number;
  signature: string;
}

export enum PersonTabInfoEnum {
  /** 听歌排行 */
  PLAYLIST,
  /** 创建的歌单 */
  CREATLIST,
  /** 收藏的歌单 */
  COLLECTLIST,
}

export enum SongListTabEnum {
  /** 所有时间 */
  ALL_TIME,
  /** 最近一周 */
  LAST_WEEK,
}

export enum FollowListTypeEnum {
  /** 关注 */
  ATTENTION,
  /** 粉丝 */
  FAN,
}

export enum GenderEnum {
  MALE = 1,
  FEMALE = 2,
}
