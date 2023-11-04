// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** 此处后端没有提供注释 DELETE /api/v1/system/parkingSlots/${param0}/delete */
export async function SystemParkingSlotControllerDeleteModelById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SystemParkingSlotControllerDeleteModelByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseSuccessResponse>(`/api/v1/system/parkingSlots/${param0}/delete`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/v1/system/parkingSlots/${param0}/detail */
export async function SystemParkingSlotControllerGetDetailById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SystemParkingSlotControllerGetDetailByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseParkingSlotInfo>(`/api/v1/system/parkingSlots/${param0}/detail`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/v1/system/parkingSlots/create */
export async function SystemParkingSlotControllerCreateModel(
  body: API.ParkingSlotInfoCreate,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseParkingSlotInfoExtendedDetails>(
    '/api/v1/system/parkingSlots/create',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /api/v1/system/parkingSlots/page */
export async function SystemParkingSlotControllerGetInfoPageWithFilter(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SystemParkingSlotControllerGetInfoPageWithFilterParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBasePagingResponseParkingSlotInfo>(
    '/api/v1/system/parkingSlots/page',
    {
      method: 'GET',
      params: {
        // size has a default value: 20
        size: '20',
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 PUT /api/v1/system/parkingSlots/update */
export async function SystemParkingSlotControllerUpdateModel(
  body: API.ParkingSlotInfoUpdate,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseParkingSlotInfoExtendedDetails>(
    '/api/v1/system/parkingSlots/update',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}
