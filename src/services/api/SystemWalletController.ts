// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** 此处后端没有提供注释 GET /api/v1/system/wallet/page */
export async function SystemWalletControllerGetInfoPageWithFilter(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SystemWalletControllerGetInfoPageWithFilterParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBasePagingResponseWalletInfo>('/api/v1/system/wallet/page', {
    method: 'GET',
    params: {
      // size has a default value: 20
      size: '20',
      ...params,
    },
    ...(options || {}),
  });
}
