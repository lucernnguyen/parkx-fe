// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** 此处后端没有提供注释 GET /api/v1/system/permissions/list */
export async function SystemPermissionControllerGetInfoListWithFilter(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SystemPermissionControllerGetInfoListWithFilterParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListPermissionInfo>('/api/v1/system/permissions/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
