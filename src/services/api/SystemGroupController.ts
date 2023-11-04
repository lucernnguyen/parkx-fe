// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** 此处后端没有提供注释 PATCH /api/v1/system/groups/${param0}/default */
export async function SystemGroupControllerChangeDefaultGroup(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SystemGroupControllerChangeDefaultGroupParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseSuccessResponse>(`/api/v1/system/groups/${param0}/default`, {
    method: 'PATCH',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/v1/system/groups/${param0}/delete */
export async function SystemGroupControllerDeleteModelById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SystemGroupControllerDeleteModelByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseSuccessResponse>(`/api/v1/system/groups/${param0}/delete`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/v1/system/groups/${param0}/info */
export async function SystemGroupControllerGetInfoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SystemGroupControllerGetInfoByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseGroupInfo>(`/api/v1/system/groups/${param0}/info`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/v1/system/groups/create */
export async function SystemGroupControllerCreateModel(
  body: API.GroupDetailsCreate,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseGroupDetailsExtendedDetails>('/api/v1/system/groups/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/v1/system/groups/page */
export async function SystemGroupControllerGetInfoPageWithFilter(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SystemGroupControllerGetInfoPageWithFilterParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBasePagingResponseGroupInfo>('/api/v1/system/groups/page', {
    method: 'GET',
    params: {
      // size has a default value: 20
      size: '20',
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/v1/system/groups/update */
export async function SystemGroupControllerUpdateModel(
  body: API.GroupDetailsUpdate,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseGroupDetailsExtendedDetails>('/api/v1/system/groups/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
