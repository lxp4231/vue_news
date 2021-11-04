import request from "@/utils/request";
// 获取所有频道列表
export const getSearchSuggestions = q => {
  return request({
    method: "GET",
    url: `/v1_0/suggestion`,
    params: {
      q
    }
  });
};
// 获取搜索结果
export const getSearchReaults = params => {
  return request({
    method: "GET",
    url: `/v1_0/search`,
    params
  });
};
// 删除搜索历史
export const deleteHistory = () => {
  return request({
    method: "DELETE",
    url: `/v1_0/search/histories`
  });
};
