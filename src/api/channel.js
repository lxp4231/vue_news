import request from "@/utils/request";
// 获取所有频道列表
export const getAllChannels = () => {
  return request({
    method: "GET",
    url: `/v1_0/channels`
  });
};
// 更新频道列表
export const addUserChannel = channel => {
  return request({
    method: "PATCH",
    url: "/v1_0/user/channels",
    data: {
      channels: [channel]
    }
  });
};
// 删除频道列表
export const deleteUserChannel = id => {
  return request({
    method: "DELETE",
    url: `v1_0/user/channels/${id}`
  });
};
