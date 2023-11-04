// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** 此处后端没有提供注释 DELETE /api/v1/system/vehicleTypes/${param0}/delete */
export async function SystemVehicleTypeControllerDeleteModelById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SystemVehicleTypeControllerDeleteModelByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseSuccessResponse>(`/api/v1/system/vehicleTypes/${param0}/delete`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/v1/system/vehicleTypes/${param0}/detail */
export async function SystemVehicleTypeControllerGetDetailById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SystemVehicleTypeControllerGetDetailByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseVehicleTypeInfo>(`/api/v1/system/vehicleTypes/${param0}/detail`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/v1/system/vehicleTypes/create */
export async function SystemVehicleTypeControllerCreateModel(
  body: API.VehicleTypeInfoCreate,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseVehicleTypeInfoExtendedDetails>(
    '/api/v1/system/vehicleTypes/create',
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

/** 此处后端没有提供注释 GET /api/v1/system/vehicleTypes/list */
export async function SystemVehicleTypeControllerGetInfoList(options?: { [key: string]: any }) {
  return request<API.BaseResponseListVehicleTypeInfo>('/api/v1/system/vehicleTypes/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/v1/system/vehicleTypes/update */
export async function SystemVehicleTypeControllerUpdateModel(
  body: API.VehicleTypeInfoUpdate,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseVehicleTypeInfoExtendedDetails>(
    '/api/v1/system/vehicleTypes/update',
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
