// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** 此处后端没有提供注释 DELETE /api/v1/system/users/${param0}/delete */
export async function SystemUserControllerDeleteModelById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SystemUserControllerDeleteModelByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseSuccessResponse>(`/api/v1/system/users/${param0}/delete`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/v1/system/users/${param0}/detail */
export async function SystemUserControllerGetDetailById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SystemUserControllerGetDetailByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseUserDetails>(`/api/v1/system/users/${param0}/detail`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/v1/system/users/admin/create */
export async function SystemUserControllerCreateAdmin(
  body: API.UserDetails,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserDetails>('/api/v1/system/users/admin/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/v1/system/users/create */
export async function SystemUserControllerCreateModel(
  body: API.UserDetailsCreate,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserDetailsExtendedDetails>('/api/v1/system/users/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/v1/system/users/details */
export async function SystemUserControllerUserDetails(options?: { [key: string]: any }) {
  return request<API.BaseResponseUserDetails>('/api/v1/system/users/details', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/v1/system/users/page */
export async function SystemUserControllerGetInfoPageWithFilter(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SystemUserControllerGetInfoPageWithFilterParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBasePagingResponseUserInfo>('/api/v1/system/users/page', {
    method: 'GET',
    params: {
      // size has a default value: 20
      size: '20',
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/v1/system/users/update */
export async function SystemUserControllerUpdateModel(
  body: API.UserDetailsUpdate,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserDetailsExtendedDetails>('/api/v1/system/users/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
