import { getAjax, postAjax } from "./index";

interface LoginCellphone {
  phone: string;
  password: string;
}

/** 手机密码登陆 */
export const loginCellphone = (params: LoginCellphone) => {
  return postAjax("/login/cellphone", {
    data: { ...params },
  });
};

export const getUserInfo = () => {
  return getAjax("/user/account", {
    params: {
      timestamp: new Date().getTime(),
    },
  });
};

export const logout = () => {
  return postAjax("/logout");
};
