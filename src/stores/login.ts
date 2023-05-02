import { getUserInfo, loginCellphone } from "@/api/login";
import { ElMessage } from "element-plus";
import { defineStore } from "pinia";

interface IUserInfo {
  userId: number;
  userType: number;
  nickname: string;
  avatarUrl: string;
  backgroundUrl: string;
  signature: string;
  createTime: string;
  accountType: number;
}

interface LoginState {
  /** 登录状态 */
  loginStatus: boolean;
  token: string;
  /** 用户信息 */
  userInfo: IUserInfo | null;
}

export const useLoginStore = defineStore("login", {
  state: (): LoginState => ({
    loginStatus: false,
    token: "",
    userInfo: null,
  }),

  actions: {
    setLoginStatus(status: boolean) {
      this.loginStatus = status;
    },

    setLoginToken(token: string) {
      this.token = token;
    },

    async setLogin(phone: string, password: string, callback: () => void) {
      const res = await loginCellphone({
        phone: phone,
        password: password,
      });
      if (res.code !== 200) {
        ElMessage({
          type: "error",
          message: res.message,
        });
      } else {
        this.token = res.token;
        this.queryUserInfo();
        callback();
      }
    },

    async queryUserInfo() {
      try {
        const res = await getUserInfo();
        if (res.profile) {
          this.loginStatus = true;
          this.userInfo = res.profile;
        }
      } catch (error) {
        ElMessage({
          type: "error",
          message: "获取用户信息失败",
        });
      }
    },
  },
});
