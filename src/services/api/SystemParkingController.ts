// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** 此处后端没有提供注释 GET /api/v1/system/parking/detail/context */
export async function SystemParkingControllerGetDetailByContext(options?: { [key: string]: any }) {
  return request<API.BaseResponseParkingInfo>('/api/v1/system/parking/detail/context', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/v1/system/parking/upsert */
export async function SystemParkingControllerUpsertModel(
  body: API.ParkingInfo,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseParkingInfo>('/api/v1/system/parking/upsert', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
