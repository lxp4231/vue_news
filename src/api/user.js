// 每个请求封装成函数
import request from "@/utils/request";
// 用户请求相关模块
export const login = data => {
  // 传入具体请求配置
  return request({
    method: "POST",
    url: "/v1_0/authorizations",
    data
  });
};
// 发送验证码
export const sentSms = mobile => {
  // 传入具体请求配置
  return request({
    method: "GET",
    url: `/v1_0/sms/codes/${mobile}`
  });
};
// 获取用户信息
export const getUserInfo = () => {
  return request({
    method: "GET",
    url: `/v1_0/user`
    // 放请求拦截器中，因为都要使用
    // headers: {
    //   // 格式 从store中获取token
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  });
};
// 获取用户频道列表
export const getUserChannels = () => {
  return request({
    method: "GET",
    url: `/v1_0/user/channels`
  });
};
// 关注用户
export const addFollow = userId => {
  return request({
    method: "POST",
    url: "/v1_0/user/followings",
    data: {
      target: userId
    }
  });
};
//取消关注
export const deleteFollow = userId => {
  return request({
    method: "DELETE",
    url: `/v1_0/user/followings/${userId}`
  });
};
//获取用户信息
export const getUserProfile = () => {
  return request({
    method: "GET",
    url: `/v1_0/user/profile`
  });
};
//编辑用户个人信息
export const updateUserProfile = data => {
  return request({
    method: "PATCH",
    url: `/v1_0/user/profile`,
    data
  });
};
// 编辑用户头像
export function updateUserPhoto(data) {
  return request({
    method: "PATCH",
    url: "/v1_0/user/photo",
    data
  });
}
