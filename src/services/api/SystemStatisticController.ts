// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** 此处后端没有提供注释 GET /api/v1/system/statistic/parkingSession/card/todayAndCurrentMonth */
export async function SystemStatisticControllerParkingSessionByTodayAndCurrentMonthCard(options?: {
  [key: string]: any;
}) {
  return request<API.BaseResponseParkingSessionByTodayAndCurrentMonth>(
    '/api/v1/system/statistic/parkingSession/card/todayAndCurrentMonth',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /api/v1/system/statistic/revenue/card/todayAndCurrentMonth */
export async function SystemStatisticControllerRevenueByTodayAndCurrentMonthCard(options?: {
  [key: string]: any;
}) {
  return request<API.BaseResponseRevenueByTodayAndCurrentMonth>(
    '/api/v1/system/statistic/revenue/card/todayAndCurrentMonth',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /api/v1/system/statistic/revenue/chart/byDate */
export async function SystemStatisticControllerRevenueByDateChart(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SystemStatisticControllerRevenueByDateChartParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListRevenueChart>(
    '/api/v1/system/statistic/revenue/chart/byDate',
    {
      method: 'GET',
      params: {
        ...params,
        request: undefined,
        ...params['request'],
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /api/v1/system/statistic/vehicle/chart/amountByType */
export async function SystemStatisticControllerVehicleAmountByTypeChart(options?: {
  [key: string]: any;
}) {
  return request<API.BaseResponseListVehicleChart>(
    '/api/v1/system/statistic/vehicle/chart/amountByType',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}
