// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** 此处后端没有提供注释 GET /api/v1/system/transactions/${param0}/detail */
export async function SystemTransactionControllerGetDetailById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SystemTransactionControllerGetDetailByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseTransactionDetails>(
    `/api/v1/system/transactions/${param0}/detail`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /api/v1/system/transactions/page */
export async function SystemTransactionControllerGetInfoPageWithFilter(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SystemTransactionControllerGetInfoPageWithFilterParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBasePagingResponseTransactionInfo>(
    '/api/v1/system/transactions/page',
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
