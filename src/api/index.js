import request from "@/utils/request";

/** 
 * 获取区域列表
 * @returns 
 */
export const getRegionList = () => {
  return request(`/api/Region/list`, {
    method: "get",
  });
};

/**
 * 获取六大圈层树（left）和十大行动树（right）+底部设施分类（bottom）
 * @param {字典code} code
 * @returns 
 */
export const getDictionaryTreeList = (code) => {
  return request(`/api/Dictionary/${code}`, {
    method: "get",
  });
};

/**
 * 首页中间数据和Echarts页面中间数据
 * Echarts中间数据要取一下第几个第几个
 * @param { 区域Id }  regionId
 * @returns 
 */
export const getChartsMiddle = (regionId) => {
  return request(`/api/KeyValue/middle/${regionId}`, {
    method: "get",
  });
};


/**
 * 获取饼状图数据和（charts-left-1 charts-left-2 charts-right-1）分组数据
 * @param { 区域Id } regionId 
 * @param { 字典code } code
 * @returns 
 */
export const getPie = ( regionId, code) => {
  return request(`/api/KyeValue/pie/${regionId}/${code}`, {
    method: "get",
  });
};

/**
 * 获取柱状图数据
 * @param {区域Id} regionId
 * @param {字典code} code
 * @returns 
 */
export const getBar = ( regionId, code) => {
  return request(`/api/KyeValue/bar/${regionId}/${code}`, {
    method: "get",
  });
};

/**
 * 获取富文本文章
 * @param {*} code 
 * @returns 
 */
export const getArticle = (code) => {
  return request(`/api/Article/${code}`, {
    method: "get",
  });
} 

/**
 * 获取设施分类下的地图坐标列表
 * @param {*} code 
 * @returns 
 */
export const getGeoList = (code) => {
  return request(`/api/Geo/${code}`, {
    method: "get",
  });
} 
